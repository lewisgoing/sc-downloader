// ID3 Writer for metadata
const ID3Writer = {
    encoders: {
      string: (str) => new TextEncoder().encode(str),
      uint32: (num) => {
        const arr = new Uint8Array(4);
        arr[0] = (num >> 24) & 0xff;
        arr[1] = (num >> 16) & 0xff;
        arr[2] = (num >> 8) & 0xff;
        arr[3] = num & 0xff;
        return arr;
      }
    },
  
    createTextFrame: function(id, text) {
      const encoded = this.encoders.string(text);
      const buffer = new Uint8Array(10 + 1 + encoded.length);
      
      // Frame ID
      buffer.set(this.encoders.string(id), 0);
      
      // Frame size (excluding header)
      buffer.set(this.encoders.uint32(1 + encoded.length), 4);
      
      // Frame flags
      buffer.set([0, 0], 8);
      
      // Text encoding (UTF-8)
      buffer[10] = 3;
      
      // Text content
      buffer.set(encoded, 11);
      
      return buffer;
    },
  
    createAPICFrame: function(imageData) {
      // Fixed strings
      const mimeType = this.encoders.string('image/jpeg\0');
      const description = this.encoders.string('\0');
      
      // Calculate size
      const frameSize = 1 + mimeType.length + 1 + description.length + imageData.byteLength;
      const buffer = new Uint8Array(10 + frameSize);
      
      // Frame header
      buffer.set(this.encoders.string('APIC'), 0);
      buffer.set(this.encoders.uint32(frameSize), 4);
      buffer.set([0, 0], 8);
      
      let offset = 10;
      
      // Encoding
      buffer[offset++] = 3;
      
      // MIME type
      buffer.set(mimeType, offset);
      offset += mimeType.length;
      
      // Picture type (3 = cover front)
      buffer[offset++] = 3;
      
      // Description
      buffer.set(description, offset);
      offset += description.length;
      
      // Image data
      buffer.set(new Uint8Array(imageData), offset);
      
      return buffer;
    },
  
    write: function(data, metadata, imageData = null) {
      const frames = [];
      
      // Add metadata frames in order
      if (metadata.title) {
        frames.push(this.createTextFrame('TIT2', metadata.title));
      }
      if (metadata.artist) {
        frames.push(this.createTextFrame('TPE1', metadata.artist));
      }
      if (metadata.album) {
        frames.push(this.createTextFrame('TALB', metadata.album));
      }
      if (metadata.year) {
        frames.push(this.createTextFrame('TYER', metadata.year));
      }
      
      // Add artwork if provided
      if (imageData) {
        frames.push(this.createAPICFrame(imageData));
      }
      
      // Calculate total frame size
      const totalFrameSize = frames.reduce((sum, frame) => sum + frame.length, 0);
      
      // Create final buffer
      const tagSize = 10 + totalFrameSize;  // 10 bytes for ID3 header
      const finalBuffer = new Uint8Array(tagSize + data.byteLength);
      
      // Write ID3v2 header
      finalBuffer[0] = 0x49; // 'I'
      finalBuffer[1] = 0x44; // 'D'
      finalBuffer[2] = 0x33; // '3'
      finalBuffer[3] = 3;    // version 2.3
      finalBuffer[4] = 0;    // flags

      function encodeSynchsafe(size) {
        const bytes = new Uint8Array(4);
        bytes[0] = (size >> 21) & 0x7F;
        bytes[1] = (size >> 14) & 0x7F;
        bytes[2] = (size >> 7) & 0x7F;
        bytes[3] = size & 0x7F;
        return bytes;
      }
    
      // Size (excluding header, synchsafe)
      const synchsafeSize = encodeSynchsafe(totalFrameSize);
      finalBuffer[6] = synchsafeSize[0];
      finalBuffer[7] = synchsafeSize[1];
      finalBuffer[8] = synchsafeSize[2];
      finalBuffer[9] = synchsafeSize[3];
      
      // Write frames
      let offset = 10;
      frames.forEach(frame => {
        finalBuffer.set(frame, offset);
        offset += frame.length;
      });
      
      // Write MP3 data
      finalBuffer.set(new Uint8Array(data), tagSize);
      
      return finalBuffer.buffer;
    }
};

// Client ID management
let clientIdCache = null;

async function getClientId() {
  if (clientIdCache) return clientIdCache;

  try {
    const response = await fetch('https://soundcloud.com/');
    const text = await response.text();
    
    const matches = text.match(/src="(https:\/\/a-v2\.sndcdn\.com\/assets\/[^"]+)/g);
    if (!matches) {
      throw new Error('Could not find app script URL');
    }

    for (const match of matches) {
      const scriptUrl = match.slice(5).replace('"', '');
      console.log('Checking script:', scriptUrl);
      
      const scriptResponse = await fetch(scriptUrl);
      const scriptText = await scriptResponse.text();
      
      const clientIdMatch = scriptText.match(/client_id\s*:\s*"([^"]+)"/);
      if (clientIdMatch) {
        clientIdCache = clientIdMatch[1];
        console.log('Found client ID:', clientIdCache);
        return clientIdCache;
      }
    }

    throw new Error('Could not find client ID in any script');
  } catch (error) {
    console.error('Error getting client ID:', error);
    return null;
  }
}

// Track data retrieval
async function getTrackData(trackElement = null) {
  try {
    let urlMatch, clientId;

    if (trackElement) {
      const linkElement = trackElement.querySelector('a.soundTitle__title, a[href^="/"]');
      if (!linkElement) return null;

      const href = linkElement.getAttribute('href');
      urlMatch = href.match(/^\/([^\/]+\/[^\/\?]+)/);
      
      if (!urlMatch) return null;
    } else {
      urlMatch = window.location.href.match(/soundcloud\.com\/([^\/]+\/[^\/\?]+)/);
      if (!urlMatch) {
        throw new Error('Could not find track URL');
      }
    }
    
    clientId = await getClientId();
    if (!clientId) {
      throw new Error('Could not get client ID');
    }

    const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=https://soundcloud.com/${urlMatch[1]}&client_id=${clientId}`;
    console.log('Resolving URL:', resolveUrl);
    
    const resolveResponse = await fetch(resolveUrl);
    const trackData = await resolveResponse.json();
    console.log('Track data:', trackData);

    const progressiveStream = trackData.media.transcodings.find(
      t => t.format.protocol === 'progressive' && t.format.mime_type === 'audio/mpeg'
    );

    if (!progressiveStream) {
      throw new Error('No progressive stream found');
    }

    const streamResponse = await fetch(`${progressiveStream.url}?client_id=${clientId}`);
    const streamData = await streamResponse.json();
    console.log('Stream data:', streamData);

    if (!streamData.url) {
      throw new Error('No stream URL in response');
    }

    let artworkUrl = null;
    if (trackData.artwork_url) {
      artworkUrl = trackData.artwork_url.replace('-large.', '-t500x500.');
    } 
    else if (trackData.user && trackData.user.avatar_url) {
      artworkUrl = trackData.user.avatar_url.replace('-large.', '-t500x500.');
      console.log('Using avatar URL as artwork:', artworkUrl);
    }

    const sanitizeFilename = (str) => {
      return str
        .replace(/[<>:"/\\|?*]/g, '') // Remove invalid filename characters
        .replace(/\s+/g, ' ')         // Replace multiple spaces with single space
        .trim();
    };

    const filename = `${sanitizeFilename(trackData.title)}.mp3`;

    return {
      url: streamData.url,
      filename: filename,
      artworkUrl: artworkUrl,
      metadata: {
        title: trackData.title,
        artist: trackData.user.username,
        album: trackData.title,
        year: new Date(trackData.created_at).getFullYear().toString()
      }
    };
  } catch (error) {
    console.error('Error getting track data:', error);
    return null;
  }
}

// Track download functionality
async function downloadTrack(trackData) {
  try {
    console.log('Starting download...');
    
    const trackResponse = await fetch(trackData.url);
    if (!trackResponse.ok) {
      throw new Error('Track download failed');
    }

    const reader = trackResponse.body.getReader();
    const chunks = [];
    let totalLength = 0;

    while (true) {
      const {done, value} = await reader.read();
      
      if (done) {
        console.log('Download complete. Total bytes:', totalLength);
        break;
      }
      
      chunks.push(value);
      totalLength += value.length;
    }

    const trackArrayBuffer = new ArrayBuffer(totalLength);
    const uint8View = new Uint8Array(trackArrayBuffer);
    let position = 0;
    
    for (const chunk of chunks) {
      uint8View.set(chunk, position);
      position += chunk.length;
    }

    console.log('Track data combined:', trackArrayBuffer.byteLength, 'bytes');

    let artworkBuffer = null;
    if (trackData.artworkUrl) {
      console.log('Downloading artwork from:', trackData.artworkUrl);
      const artworkResponse = await fetch(trackData.artworkUrl);
      if (artworkResponse.ok) {
        artworkBuffer = await artworkResponse.arrayBuffer();
        console.log('Artwork downloaded:', artworkBuffer.byteLength, 'bytes');
      }
    }

    console.log('Writing ID3 tags with metadata:', trackData.metadata);
    const taggedArrayBuffer = ID3Writer.write(trackArrayBuffer, trackData.metadata, artworkBuffer);
    console.log('Final file size:', taggedArrayBuffer.byteLength, 'bytes');

    const blob = new Blob([taggedArrayBuffer], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = trackData.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Download failed:', error);
    return false;
  }
}

// Grid view selectors for debugging
const gridViewSelectors = [
  '.playableTile',
  '.soundBadge',
  '.trackItem__content',
  '.trackList__item',
  '.sound__content',
  '.soundTitle__titleContainer'
];

// Download button creation for grid view
function createGridViewDownloadButton(trackElement) {
  const downloadButton = document.createElement('button');
  downloadButton.className = 'sc-button-download playableTile__actionButton sc-button sc-button-small sc-button-icon sc-button-lightfg sc-button-nostyle';
  downloadButton.setAttribute('title', 'Download');
  downloadButton.setAttribute('aria-label', 'Download');
  downloadButton.setAttribute('tabindex', '0');

  downloadButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M3,11 L3,13 L13,13 L13,11 L3,11 Z M3,4 L13,4 L8,10 L3,4 Z M6,2 L6,4 L10,4 L10,2 L6,2 Z" fill="#ffffff"/>
    </svg>
  `;

  const playableTile = trackElement.closest('.playableTile');
  if (playableTile) {
    const actionWrapper = playableTile.querySelector('.playableTile__actionWrapper');
    if (actionWrapper && !actionWrapper.querySelector('.sc-button-download')) {
      actionWrapper.appendChild(downloadButton);

      downloadButton.addEventListener('click', async (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        downloadButton.style.opacity = '0.5';
        
        try {
          const trackData = await getTrackData(trackElement);
          if (!trackData) {
            throw new Error('Could not find track data');
          }
          
          const success = await downloadTrack(trackData);
          if (!success) {
            throw new Error('Download failed');
          }
        } catch (error) {
          console.error('Error:', error);
          alert(error.message || 'Download failed. Please try again.');
        } finally {
          downloadButton.style.opacity = '1';
        }
      });
    }
  }
}

// Download button creation for regular view
function createDownloadButton(trackElement = null) {
  // Check for existing button on this element
  if (trackElement) {
    if (trackElement.querySelector('.sc-button-download') || 
        trackElement.closest('.sound__body, .soundList__item')?.querySelector('.sc-button-download')) {
      return;
    }
  }

  // For track pages, check if button already exists
  const existingButton = document.querySelector('.sc-button-download');
  if (!trackElement && existingButton) {
    return;
  }

  // Check if this is a grid view tile
  if (trackElement && trackElement.closest('.playableTile')) {
    return createGridViewDownloadButton(trackElement);
  }
  
  const downloadButton = document.createElement('button');
  downloadButton.className = 'sc-button-download sc-button-secondary sc-button sc-button-small sc-button-responsive';
  downloadButton.setAttribute('title', 'Download track with metadata');
  downloadButton.setAttribute('aria-label', 'Download track with metadata');
  downloadButton.setAttribute('tabindex', '0');
  downloadButton.style.width = '26px';
  downloadButton.style.height = '26px';
  downloadButton.style.padding = '5px';
  downloadButton.style.minWidth = '26px';

  downloadButton.style.display = 'flex';
  downloadButton.style.alignItems = 'center';
  downloadButton.style.justifyContent = 'center';

  downloadButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" style="display: block; transform: translate(0px, 0px);">
      <path d="M3,11 L3,13 L13,13 L13,11 L3,11 Z M3,4 L13,4 L8,10 L3,4 Z M6,2 L6,4 L10,4 L10,2 L6,2 Z" fill="rgb(34, 34, 34)"/>
    </svg>
  `;

  // Determine where to add the button
  let actionsContainer;
  if (trackElement) {
    actionsContainer = trackElement.querySelector(
      '.sc-button-group, ' + 
      '.soundActions, ' + 
      '.trackActions, ' + 
      '.sound__actions, ' + 
      '.trackList__item .sc-button-group, ' +
      '.sound__body .sc-button-group, ' +
      '.compactTrackList__item .sc-button-group'
    );
  } else {
    actionsContainer = document.querySelector(
      '.soundActions .sc-button-group, ' +
      '.trackView .soundActions .sc-button-group, ' + 
      '.sound-section .soundActions .sc-button-group, ' +
      '#content .soundActions .sc-button-group, ' +
      '.l-page .soundActions .sc-button-group, ' + 
      '.sound__actions .sc-button-group'
    );
  }

  if (!actionsContainer) return;

  // Prevent duplicate buttons
  if (actionsContainer.querySelector('.sc-button-download')) return;

  // Add click handler with download functionality
  downloadButton.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    downloadButton.style.opacity = '0.5';
    
    try {
      const trackData = await getTrackData(trackElement);
      if (!trackData) {
        throw new Error('Could not find track data');
      }
      
      const success = await downloadTrack(trackData);
      if (!success) {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'Download failed. Please try again.');
    } finally {
      downloadButton.style.opacity = '1';
    }
  });

  actionsContainer.appendChild(downloadButton);
}

// Main function to add download buttons
function addDownloadButtons() {
    // Add button to track page first
    const isTrackPage = window.location.href.match(/soundcloud\.com\/([^\/]+\/[^\/\?]+)/);
    if (isTrackPage) {
      const trackPageContainers = [
        '.soundActions .sc-button-group',
        '.trackView .soundActions .sc-button-group',
        '.sound-section .soundActions .sc-button-group',
        '#content .soundActions .sc-button-group',
        '.l-page .soundActions .sc-button-group',
        '.sound__actions .sc-button-group'
      ];
  
      for (const selector of trackPageContainers) {
        const container = document.querySelector(selector);
        if (container && !container.querySelector('.sc-button-download')) {
          createDownloadButton();
          break;
        }
      }
    }
  
    // Debug logging for grid view elements
    console.log('Searching for grid view tracks...');
    gridViewSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      console.log(`Found ${elements.length} elements for selector: ${selector}`);
    });

  // Track selectors including grid view
  const trackSelectors = [
    '.sound__body',
    '.soundList__item',
    '.userStreamItem',
    '.trackItem',
    '.compactTrackList__item',
    '.stream__header-top-track',
    '.heroPlaylist__track',
    '.soundTitle__containerTop',
    '.trackList__item',
    '[role="listitem"] .sound',
    '.stream__list .sound',
    '.sound',
    '.trackList__item',
    '.sound-item',
    '.listenEngagement__item',
    '.track__item',
    '.playableTile',
    '.soundBadge',
    '.trackItem__content'
  ];

  // Combine selectors and query
  const trackElements = document.querySelectorAll(trackSelectors.join(', '));
  console.log(`Total track elements found: ${trackElements.length}`);

  // Keep track of elements that already have buttons
  const processedElements = new Set();

  trackElements.forEach(trackElement => {
    // Skip if already processed
    if (processedElements.has(trackElement)) {
      console.log('Skipping already processed element');
      return;
    }

    // Skip if already has button
    if (trackElement.querySelector('.sc-button-download')) {
      console.log('Skipping element with existing button');
      return;
    }

    // Check for grid view
    const isGridView = trackElement.closest('.playableTile');
    if (isGridView) {
      console.log('Processing grid view element');
      const actionWrapper = isGridView.querySelector('.playableTile__actionWrapper');
      if (actionWrapper) {
        createGridViewDownloadButton(trackElement);
      }
    } else {
      // Regular view
      const trackLink = trackElement.querySelector('a.soundTitle__title, a[href^="/"]');
      if (trackLink) {
        createDownloadButton(trackElement);
      }
    }

    // Mark as processed
    processedElements.add(trackElement);
  });
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Observer setup
function setupObserver() {
  const debouncedAddButtons = debounce(() => {
    // Remove any duplicate buttons first
    const buttons = document.querySelectorAll('.sc-button-download');
    buttons.forEach((button, index) => {
      const parent = button.closest('.sound__body, .soundList__item, .playableTile');
      if (parent) {
        const buttonsInParent = parent.querySelectorAll('.sc-button-download');
        if (buttonsInParent.length > 1) {
          // Keep only the first button
          Array.from(buttonsInParent).slice(1).forEach(b => b.remove());
        }
      }
    });
    
    addDownloadButtons();
  }, 300);

  const observer = new MutationObserver((mutations) => {
    const hasRelevantMutation = mutations.some(mutation => 
      mutation.type === 'childList' && 
      Array.from(mutation.addedNodes).some(node => 
        node.nodeType === Node.ELEMENT_NODE && 
        (
          node.matches?.('.sound, .track, .trackList__item, .userStreamItem, .soundActions, .playableTile') || 
          node.querySelector?.('.sound, .track, .trackList__item, .userStreamItem, .soundActions, .playableTile')
        )
      )
    );

    if (hasRelevantMutation) {
      debouncedAddButtons();
    }
  });

  // Start observing the entire document
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Initial button addition with delay
  setTimeout(addDownloadButtons, 500);
}

// Run setup when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupObserver);
} else {
  setupObserver();
}