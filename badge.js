
import { deleteLocalStorageData } from './localStorageUtils.js';
console.log('badge.js');

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  });
});

const leetcode = 'https://leetcode.com';

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(leetcode)) {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState
    });

    if (nextState === 'ON') {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    }
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
