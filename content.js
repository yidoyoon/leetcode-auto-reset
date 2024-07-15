// content.js
function checkForSolved() {
  const elements = document.querySelectorAll('.text-body.flex.flex-none.items-center.gap-1');
  for (let element of elements) {
    if (element.textContent.includes('Solved')) {
      chrome.runtime.sendMessage({ action: 'deleteLocalStorage' });
      break;
    }
  }
}

checkForSolved();
