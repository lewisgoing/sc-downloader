import { setupObserver } from './buttons';

// Initialize the extension when the page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupObserver);
} else {
  setupObserver();
}