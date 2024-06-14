chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "pause") {
      const video = document.querySelector("video");
      if (video && !video.paused) {
        video.pause();
      }
    } else if (message.action === "resume") {
      const video = document.querySelector("video");
      if (video && video.paused) {
        video.play();
      }
    }
  });
  
  