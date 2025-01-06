# SoundCloud Track Downloader

A Chrome extension that enables downloading tracks from SoundCloud while preserving metadata and artwork.

## Features

- Download tracks directly from any SoundCloud page
- Automatic metadata inclusion (title, artist, album, year)
- Album artwork preservation
- Support for multiple SoundCloud views:
  - Track pages
  - Playlists
  - User profiles
  - Album grid view
  - Search results
  - Related tracks
  - Likes pages

## Installation

### From Source

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the directory containing the extension files

## Usage

After installation, you'll see a download button (↓) appear next to tracks across SoundCloud:

- On track pages: Next to the share and like buttons
- In playlists: Next to each track
- In grid view: On hover over album artwork
- In list views: Next to each track's title

Simply click the download button to save the track with its metadata and artwork.

## Permissions

This extension requires the following permissions:

- `scripting`: Required for adding download buttons to SoundCloud pages
- Access to soundcloud.com domains: Required for fetching track data and metadata
- Access to sndcdn.com: Required for accessing SoundCloud's CDN (for artwork)

## Technical Details

The extension includes:

- Metadata preservation using ID3v2.3 tags
- High-quality MP3 download (best available quality from SoundCloud)
- Automatic handling of special characters in filenames
- Efficient downloading with progress tracking
- Proper error handling and user feedback

## Known Limitations

- Downloads are limited to tracks that are publicly available on SoundCloud
- Download quality is dependent on the source file quality
- Some tracks might not be available for download due to SoundCloud's restrictions

## Known Bugs

- First song in List view on the Likes pages won't download correctly.
- Download icon renders twice on some views
- Sizing of the Download button in some views is off by ~4px

## Contributing

Feel free to submit issues or pull requests if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
