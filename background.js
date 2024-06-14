let lastActiveTabId = null;
let isChromeFocused = true; // Assume Chrome is initially focused

// Check active tab and handle focus change
setInterval(() => {
  chrome.windows.getCurrent(window => {
    if (!window.focused && isChromeFocused) {
      // Chrome lost focus
      isChromeFocused = false;
      pauseAllYouTubeVideos();
    } else if (window.focused && !isChromeFocused) {
      // Chrome regained focus
      isChromeFocused = true;
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs && tabs.length > 0) {
          const activeTabId = tabs[0].id;
          lastActiveTabId = activeTabId;
          handleTabChange(activeTabId);
        }
      });
    }
  });
}, 1000); // Check every second (adjust as needed)

// Listen for tab activation and update last active tab
chrome.tabs.onActivated.addListener(activeInfo => {
  const currentTabId = activeInfo.tabId;
  if (lastActiveTabId !== currentTabId) {
    handleTabChange(currentTabId);
    lastActiveTabId = currentTabId;
  }
});

// Listen for tab updates (like URL changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === lastActiveTabId && changeInfo.status === 'complete') {
    handleTabChange(tabId);
  }
});

// Function to handle tab change events
function handleTabChange(tabId) {
  chrome.tabs.get(tabId, tab => {
    if (tab && tab.url && tab.url.includes("youtube.com/watch")) {
      chrome.tabs.sendMessage(tabId, { action: "resume" });
    } else {
      pauseAllYouTubeVideos();
    }
  });
}

// Function to pause all YouTube videos across tabs
function pauseAllYouTubeVideos() {
  chrome.tabs.query({ url: "*://*.youtube.com/*" }, tabs => {
    tabs.forEach(youtubeTab => {
      chrome.tabs.sendMessage(youtubeTab.id, { action: "pause" });
    });
  });
}
