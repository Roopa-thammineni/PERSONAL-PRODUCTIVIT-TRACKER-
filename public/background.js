let currentTabId = null;
let currentStartTime = null;

chrome.tabs.onActivated.addListener(activeInfo => {
  handleTabSwitch(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    handleTabSwitch(tabId);
  }
});

chrome.idle.onStateChanged.addListener(state => {
  if (state === 'idle' || state === 'locked') {
    saveTimeSpent();
  }
});

function handleTabSwitch(tabId) {
  saveTimeSpent();
  currentTabId = tabId;
  currentStartTime = Date.now();
}

function saveTimeSpent() {
  if (currentTabId !== null && currentStartTime !== null) {
    const timeSpent = Math.floor((Date.now() - currentStartTime) / 1000);
    chrome.tabs.get(currentTabId, tab => {
      const url = new URL(tab.url).hostname;
      chrome.storage.local.get([url], data => {
        const current = data[url] || 0;
        chrome.storage.local.set({ [url]: current + timeSpent });
      });
    });
  }
}
