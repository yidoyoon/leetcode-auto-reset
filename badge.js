const leetcode = 'https://leetcode.com';

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.startsWith(leetcode)) {
    chrome.storage.local.get('leetcodeAutoResetIsActive', (data) => {
      updateBadgeText(data.leetcodeAutoResetIsActive, tabId);
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.startsWith(leetcode)) {
    toggleActivation(tab);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ leetcodeAutoResetIsActive: true }, () => {
    chrome.action.setBadgeText({ text: 'ON' });
  });
});

const updateBadgeText = (state, tabId) => {
  const text = state ? 'ON' : 'OFF';
  chrome.action.setBadgeText({ tabId: tabId, text: text });
}

const toggleActivation = async (tab) => {
  const { leetcodeAutoResetIsActive } = await chrome.storage.local.get('leetcodeAutoResetIsActive');
  const nextState = !leetcodeAutoResetIsActive;
  await chrome.storage.local.set({ leetcodeAutoResetIsActive: nextState });
  updateBadgeText(nextState, tab.id);

  if (nextState) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });
  }
}
