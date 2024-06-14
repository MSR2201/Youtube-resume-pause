# YouTube Pause and Resume Chrome Extension

This Chrome extension allows you to automatically pause YouTube videos when you switch tabs or focus away from Chrome, and resume playback when you return.

## Features

- Automatically pauses YouTube videos when switching tabs or minimizing Chrome.
- Resumes YouTube videos when returning to Chrome or switching back to YouTube tabs.

## Installation

To install and use the extension:

1. Clone or download this repository to your local machine.
2. Open Google Chrome.
3. Navigate to `chrome://extensions/`.
4. Enable "Developer mode" (toggle switch usually located in the top-right corner).
5. Click on "Load unpacked" button.
6. Select the directory where you cloned/downloaded this repository.

The extension should now be installed and active in your Chrome browser.

## Usage

- Open a YouTube video in one tab.
- Switch to another tab or minimize Chrome to automatically pause the video.
- Return to the YouTube tab or bring Chrome back into focus to resume playback.

## How It Works

- The extension uses a background script (`background.js`) to monitor tab and window focus changes.
- When a tab or Chrome window loses focus, it sends messages to content scripts (`content.js`) on YouTube tabs to pause videos.
- When focus returns to Chrome or a YouTube tab, it sends messages to resume playback.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request in this repository.
