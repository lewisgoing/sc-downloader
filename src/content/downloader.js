import { ID3Writer } from './id3writer';
import { getTrackData } from './api/track';
import { triggerDownload } from '../utils/helpers';

export async function downloadTrack(trackData) {
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
    
    triggerDownload(url, trackData.filename);
    
    return true;
  } catch (error) {
    console.error('Download failed:', error);
    return false;
  }
}

export function addDownloadHandler(button, trackElement = null) {
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