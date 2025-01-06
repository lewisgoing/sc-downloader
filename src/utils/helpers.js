/**
 * Debounces function execution
 */
export function debounce(func, wait) {
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
  
  /**
   * Gets track information from DOM element
   */
  export function getTrackInfo(trackElement) {
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
  
  /**
   * Sanitizes filename by removing invalid characters
   */
  export function sanitizeFilename(str) {
    return str
      .replace(/[<>:"/\\|?*]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  
  /**
   * Creates a download link and triggers download
   */
  export function triggerDownload(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }