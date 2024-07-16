import { deleteLocalStorageData } from './deleteLocalStorageData.js';
console.log('badge.js');

function updateBadgeText(state, tabId) {
  const text = state ? 'ON' : 'OFF';
  chrome.action.setBadgeText({ tabId: tabId, text: text });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ leetcodeAutoResetIsActive: true }, () => {
    chrome.action.setBadgeText({ text: 'ON' });
  });
});

const leetcode = 'https://leetcode.com';

async function checkAndInjectContentScript(tabId, url) {
  if (url.startsWith(leetcode)) {
    const { leetcodeAutoResetIsActive } = await chrome.storage.local.get('leetcodeAutoResetIsActive');
    if (!leetcodeAutoResetIsActive) return;

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    checkAndInjectContentScript(tabId, tab.url);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'deleteLocalStorage') {
    console.log('deleteLocalStorage action received');
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      func: deleteLocalStorageData
    });
  }
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
