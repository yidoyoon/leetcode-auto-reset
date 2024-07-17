const leetcode = 'https://leetcode.com';

function updateBadgeText(state, tabId) {
  const text = state ? 'ON' : 'OFF';
  chrome.action.setBadgeText({ tabId: tabId, text: text });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ leetcodeAutoResetIsActive: true }, () => {
    chrome.action.setBadgeText({ text: 'ON' });
  });
});

async function toggleActivation(tab) {
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

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.startsWith(leetcode)) {
    toggleActivation(tab);
  }
});
