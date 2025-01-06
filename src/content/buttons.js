import { debounce, getTrackInfo } from '../utils/helpers';
import { addDownloadHandler } from './downloader';

function createDownloadButtonElement(isSmallButton = false) {
  const downloadButton = document.createElement('button');
  downloadButton.className = 'sc-button-download sc-button sc-button-small sc-button-icon sc-button-secondary';
  downloadButton.setAttribute('title', 'Download');
  downloadButton.setAttribute('aria-label', 'Download');
  downloadButton.setAttribute('tabindex', '0');
  
  const size = isSmallButton ? '22px' : '26px';
  const padding = isSmallButton ? '4px' : '5px';
  
  downloadButton.style.cssText = `
    width: ${size};
    height: ${size};
    padding: ${padding};
    min-width: ${size};
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  downloadButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path d="M3,11 L3,13 L13,13 L13,11 L3,11 Z M3,4 L13,4 L8,10 L3,4 Z M6,2 L6,4 L10,4 L10,2 L6,2 Z" fill="rgb(34, 34, 34)"/>
    </svg>
  `;

  return downloadButton;
}

export function createDownloadButton(trackElement = null) {
  const trackInfo = getTrackInfo(trackElement);
  
  if (trackElement) {
    // Check for existing buttons
    const existingButtons = [
      ...trackElement.querySelectorAll('.sc-button-download'),
      ...(trackElement.closest('.sound, .track')?.querySelectorAll('.sc-button-download') || [])
    ];
    
    if (existingButtons.length > 0) {
      console.log(`Skipping duplicate button for: ${trackInfo}`);
      return;
    }
  }

  console.log(`Creating download button for: ${trackInfo}`);
  
  // Determine button size based on view type
  const isSmallButton = trackElement && (
    trackElement.closest('.soundList__item, .trackList__item, .compactTrackList__item') ||
    trackElement.closest('.systemPlaylistTrackList__item, .listenEngagement__item') ||
    trackElement.matches('.sound:not(.soundBadge)')
  );

  const downloadButton = createDownloadButtonElement(isSmallButton);

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

export function createGridViewDownloadButton(trackElement) {
  if (!trackElement) return;

  const trackInfo = getTrackInfo(trackElement);
  
  const playableTile = trackElement.closest('.playableTile');
  if (!playableTile) return;
  
  const actionWrapper = playableTile.querySelector('.playableTile__actionWrapper');
  if (!actionWrapper) return;

  if (actionWrapper.querySelector('.sc-button-download') || 
      playableTile.querySelector('.sc-button-download')) {
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

function removeAllDuplicateButtons() {
  const buttons = document.querySelectorAll('.sc-button-download');
  console.log(`Cleaning up: Found ${buttons.length} download buttons`);
  
  const buttonGroups = new Map();
  
  buttons.forEach(button => {
    const container = button.closest('.sc-button-group, .playableTile__actionWrapper');
    if (container) {
      if (!buttonGroups.has(container)) {
        buttonGroups.set(container, []);
      }
      buttonGroups.get(container).push(button);
    }
  });

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

export function addDownloadButtons() {
  removeAllDuplicateButtons();

  const isTrackPage = window.location.href.match(/soundcloud\.com\/([^\/]+\/[^\/\?]+)/);
  if (isTrackPage) {
    console.log('Checking track page button');
    createDownloadButton();
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
    '.trackItem__content',
    '.systemPlaylistTrackList__item',
    '.relatedTracks__item'
  ];

  const processedElements = new Set();
  const trackElements = document.querySelectorAll(trackSelectors.join(', '));
  console.log(`Found ${trackElements.length} total track elements`);

  trackElements.forEach(trackElement => {
    if (processedElements.has(trackElement)) return;

    const isGridView = trackElement.closest('.playableTile');
    if (isGridView) {
      createGridViewDownloadButton(trackElement);
    } else {
      createDownloadButton(trackElement);
    }

    processedElements.add(trackElement);
  });
}

export function setupObserver() {
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

  removeAllDuplicateButtons();
  setTimeout(addDownloadButtons, 500);
}