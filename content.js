// Helper functions
function getTrackInfo(trackElement) {
    if (!trackElement) {
      // For track pages
      const title = document.querySelector('.soundTitle__title')?.textContent?.trim();
      return title ? `Track page: ${title}` : 'Unknown track page';
    }
  
    // For track elements
    const title = trackElement.querySelector('.soundTitle__title')?.textContent?.trim() ||
                  trackElement.querySelector('a[href^="/"]')?.textContent?.trim();
    const artist = trackElement.querySelector('.soundTitle__username')?.textContent?.trim();
    
    return title ? `${title}${artist ? ` by ${artist}` : ''}` : 'Unknown track';
  }
  
  function removeAllDuplicateButtons() {
    const buttons = document.querySelectorAll('.sc-button-download');
    console.log(`Cleaning up: Found ${buttons.length} download buttons`);
    
    // Group buttons by their closest button group container
    const buttonGroups = new Map();
    
    buttons.forEach(button => {
      const buttonGroup = button.closest('.sc-button-group');
      if (buttonGroup) {
        if (!buttonGroups.has(buttonGroup)) {
          buttonGroups.set(buttonGroup, []);
        }
        buttonGroups.get(buttonGroup).push(button);
      }
    });
  
    // For each button group, keep only one button
    let removedCount = 0;
    buttonGroups.forEach(groupButtons => {
      if (groupButtons.length > 1) {
        groupButtons.slice(1).forEach(button => {
          button.remove();
          removedCount++;
        });
      }
    });
  
    if (removedCount > 0) {
      console.log(`Removed ${removedCount} duplicate buttons`);
    }
  }
  
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
        
        buffer.set(this.encoders.string(id), 0);
        buffer.set(this.encoders.uint32(1 + encoded.length), 4);
        buffer.set([0, 0], 8);
        buffer[10] = 3;
        buffer.set(encoded, 11);
        
        return buffer;
      },
    
      createAPICFrame: function(imageData) {
        const mimeType = this.encoders.string('image/jpeg\0');
        const description = this.encoders.string('\0');
        
        const frameSize = 1 + mimeType.length + 1 + description.length + imageData.byteLength;
        const buffer = new Uint8Array(10 + frameSize);
        
        buffer.set(this.encoders.string('APIC'), 0);
        buffer.set(this.encoders.uint32(frameSize), 4);
        buffer.set([0, 0], 8);
        
        let offset = 10;
        buffer[offset++] = 3;
        buffer.set(mimeType, offset);
        offset += mimeType.length;
        buffer[offset++] = 3;
        buffer.set(description, offset);
        offset += description.length;
        buffer.set(new Uint8Array(imageData), offset);
        
        return buffer;
      },
    
      write: function(data, metadata, imageData = null) {
        const frames = [];
        
        if (metadata.title) frames.push(this.createTextFrame('TIT2', metadata.title));
        if (metadata.artist) frames.push(this.createTextFrame('TPE1', metadata.artist));
        if (metadata.album) frames.push(this.createTextFrame('TALB', metadata.album));
        if (metadata.year) frames.push(this.createTextFrame('TYER', metadata.year));
        if (imageData) frames.push(this.createAPICFrame(imageData));
        
        const totalFrameSize = frames.reduce((sum, frame) => sum + frame.length, 0);
        const tagSize = 10 + totalFrameSize;
        const finalBuffer = new Uint8Array(tagSize + data.byteLength);
        
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
      
        const synchsafeSize = encodeSynchsafe(totalFrameSize);
        finalBuffer[6] = synchsafeSize[0];
        finalBuffer[7] = synchsafeSize[1];
        finalBuffer[8] = synchsafeSize[2];
        finalBuffer[9] = synchsafeSize[3];
        
        let offset = 10;
        frames.forEach(frame => {
          finalBuffer.set(frame, offset);
          offset += frame.length;
        });
        
        finalBuffer.set(new Uint8Array(data), tagSize);
        
        return finalBuffer.buffer;
      }
  };
  
  // Client ID handling
  let clientIdCache = null;
  
  async function getClientId() {
    if (clientIdCache) return clientIdCache;
  
    try {
      const response = await fetch('https://soundcloud.com/');
      const text = await response.text();
      
      const matches = text.match(/src="(https:\/\/a-v2\.sndcdn\.com\/assets\/[^"]+)/g);
      if (!matches) throw new Error('Could not find app script URL');
  
      for (const match of matches) {
        const scriptUrl = match.slice(5).replace('"', '');
        const scriptResponse = await fetch(scriptUrl);
        const scriptText = await scriptResponse.text();
        
        const clientIdMatch = scriptText.match(/client_id\s*:\s*"([^"]+)"/);
        if (clientIdMatch) {
          clientIdCache = clientIdMatch[1];
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
        if (!urlMatch) throw new Error('Could not find track URL');
      }
      
      clientId = await getClientId();
      if (!clientId) throw new Error('Could not get client ID');
  
      const resolveUrl = `https://api-v2.soundcloud.com/resolve?url=https://soundcloud.com/${urlMatch[1]}&client_id=${clientId}`;
      const resolveResponse = await fetch(resolveUrl);
      const trackData = await resolveResponse.json();
  
      const progressiveStream = trackData.media.transcodings.find(
        t => t.format.protocol === 'progressive' && t.format.mime_type === 'audio/mpeg'
      );
  
      if (!progressiveStream) throw new Error('No progressive stream found');
  
      const streamResponse = await fetch(`${progressiveStream.url}?client_id=${clientId}`);
      const streamData = await streamResponse.json();
  
      if (!streamData.url) throw new Error('No stream URL in response');
  
      let artworkUrl = null;
      if (trackData.artwork_url) {
        artworkUrl = trackData.artwork_url.replace('-large.', '-t500x500.');
      } 
      else if (trackData.user && trackData.user.avatar_url) {
        artworkUrl = trackData.user.avatar_url.replace('-large.', '-t500x500.');
      }
  
      const sanitizeFilename = (str) => {
        return str
          .replace(/[<>:"/\\|?*]/g, '')
          .replace(/\s+/g, ' ')
          .trim();
      };
  
      return {
        url: streamData.url,
        filename: `${sanitizeFilename(trackData.title)}.mp3`,
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
      if (!trackResponse.ok) throw new Error('Track download failed');
  
      const reader = trackResponse.body.getReader();
      const chunks = [];
      let totalLength = 0;
  
      while (true) {
        const {done, value} = await reader.read();
        if (done) break;
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
  
      let artworkBuffer = null;
      if (trackData.artworkUrl) {
        const artworkResponse = await fetch(trackData.artworkUrl);
        if (artworkResponse.ok) {
          artworkBuffer = await artworkResponse.arrayBuffer();
        }
      }
  
      const taggedArrayBuffer = ID3Writer.write(trackArrayBuffer, trackData.metadata, artworkBuffer);
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
  
  // Button creation functions
  function createGridViewDownloadButton(trackElement) {
    const trackInfo = getTrackInfo(trackElement);
    
    // Check if there's already a button in the action wrapper
    const playableTile = trackElement.closest('.playableTile');
    if (!playableTile) return;
    
    const actionWrapper = playableTile.querySelector('.playableTile__actionWrapper');
    if (!actionWrapper || actionWrapper.querySelector('.sc-button-download')) {
      console.log(`Skipping duplicate grid button for: ${trackInfo}`);
      return;
    }
  
    console.log(`Creating grid view button for: ${trackInfo}`);
  
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
  
    actionWrapper.appendChild(downloadButton);
    addDownloadHandler(downloadButton, trackElement);
  }
  
  function createTrackPageDownloadButton() {
    const trackInfo = getTrackInfo();
    console.log(`Creating track page button for: ${trackInfo}`);
  
    const downloadButton = document.createElement('button');
    downloadButton.className = 'sc-button-download sc-button sc-button-small sc-button-icon sc-button-secondary';
    downloadButton.setAttribute('title', 'Download');
    downloadButton.setAttribute('aria-label', 'Download');
    downloadButton.setAttribute('tabindex', '0');
    
    // Add fixed sizing and padding
    downloadButton.style.width = '26px';
    downloadButton.style.height = '26px';
    downloadButton.style.padding = '5px';
    downloadButton.style.minWidth = '26px';
    downloadButton.style.display = 'flex';
    downloadButton.style.alignItems = 'center';
    downloadButton.style.justifyContent = 'center';
  
    downloadButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M3,11 L3,13 L13,13 L13,11 L3,11 Z M3,4 L13,4 L8,10 L3,4 Z M6,2 L6,4 L10,4 L10,2 L6,2 Z" fill="rgb(34, 34, 34)"/>
      </svg>
    `;
  
    const actionsContainer = document.querySelector(
      '.soundActions .sc-button-group, ' +
      '.trackView .soundActions .sc-button-group'
    );
  
    if (actionsContainer && !actionsContainer.querySelector('.sc-button-download')) {
      actionsContainer.appendChild(downloadButton);
      addDownloadHandler(downloadButton);
    }
  }
  
  function addDownloadHandler(button, trackElement = null) {
    button.addEventListener('click', async (event) => {
      event.preventDefault();
      event.stopPropagation();
      
      button.style.opacity = '0.5';
      
      try {
        const trackData = await getTrackData(trackElement);
        if (!trackData) throw new Error('Could not find track data');
        
        const success = await downloadTrack(trackData);
        if (!success) throw new Error('Download failed');
      } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Download failed. Please try again.');
      } finally {
        button.style.opacity = '1';
      }
    });
  }

  function createDownloadButton(trackElement = null) {
    const trackInfo = getTrackInfo(trackElement);
    
    if (trackElement) {
      const buttonGroup = trackElement.querySelector('.sc-button-group');
      if (buttonGroup?.querySelector('.sc-button-download')) {
        console.log(`Skipping duplicate button for: ${trackInfo}`);
        return;
      }
    }
  
    console.log(`Creating download button for: ${trackInfo}`);
    
    const downloadButton = document.createElement('button');
    downloadButton.className = 'sc-button-download sc-button sc-button-small sc-button-icon sc-button-secondary';
    downloadButton.setAttribute('title', 'Download');
    downloadButton.setAttribute('aria-label', 'Download');
    downloadButton.setAttribute('tabindex', '0');
    
    // Add fixed sizing and padding
    downloadButton.style.width = '26px';
    downloadButton.style.height = '26px';
    downloadButton.style.padding = '5px';
    downloadButton.style.minWidth = '26px';
    downloadButton.style.display = 'flex';
    downloadButton.style.alignItems = 'center';
    downloadButton.style.justifyContent = 'center';
  
    // Modified SVG to prevent duplicate icons
    downloadButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path d="M3,11 L3,13 L13,13 L13,11 L3,11 Z M3,4 L13,4 L8,10 L3,4 Z M6,2 L6,4 L10,4 L10,2 L6,2 Z" fill="rgb(34, 34, 34)"/>
      </svg>
    `;
  
    let actionsContainer;
    if (trackElement) {
      actionsContainer = trackElement.querySelector('.sc-button-group');
    } else {
      actionsContainer = document.querySelector(
        '.soundActions .sc-button-group, ' +
        '.trackView .soundActions .sc-button-group'
      );
    }
  
    if (!actionsContainer || actionsContainer.querySelector('.sc-button-download')) return;
  
    actionsContainer.appendChild(downloadButton);
    addDownloadHandler(downloadButton, trackElement);
  }

function addDownloadButtons() {
  // Add button to track page first
  const isTrackPage = window.location.href.match(/soundcloud\.com\/([^\/]+\/[^\/\?]+)/);
  if (isTrackPage) {
    console.log('Checking track page button');
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

  const trackElements = document.querySelectorAll(trackSelectors.join(', '));
  console.log(`Found ${trackElements.length} total track elements`);

  const processedElements = new Set();

  trackElements.forEach(trackElement => {
    if (processedElements.has(trackElement)) return;
    if (trackElement.querySelector('.sc-button-download')) return;

    const isGridView = trackElement.closest('.playableTile');
    if (isGridView) {
      const actionWrapper = isGridView.querySelector('.playableTile__actionWrapper');
      if (actionWrapper) {
        createGridViewDownloadButton(trackElement);
      }
    } else {
      const trackLink = trackElement.querySelector('a.soundTitle__title, a[href^="/"]');
      if (trackLink) {
        createDownloadButton(trackElement);
      }
    }

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
    removeAllDuplicateButtons();
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

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Initial cleanup and button addition
  removeAllDuplicateButtons();
  setTimeout(addDownloadButtons, 500);
}

// Run setup when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupObserver);
} else {
  setupObserver();
}