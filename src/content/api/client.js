let clientIdCache = null;

export async function getClientId() {
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