import { getClientId } from './client';
import { sanitizeFilename } from '../../utils/helpers';

export async function getTrackData(trackElement = null) {
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