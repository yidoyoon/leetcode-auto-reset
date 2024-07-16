export function deleteLocalStorageData() {
    function findProblemFunctionName() {
      const elements = document.querySelectorAll('span.mtk10');
  
      return elements.length ? elements[0].textContent : null;
    }
  
    function findProblemLocalStorageKey() {
      const problemFunctionName = findProblemFunctionName();
      if (!problemFunctionName) {
        console.error('Problem function name not found');
        return null;
      }
  
      let matchingKey = null;
  
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        if (value && value.includes(problemFunctionName)) {
          matchingKey = key;
          break;
        }
      }
  
      if (matchingKey) {
        console.log('Found matching key:', matchingKey);
      } else {
        console.log('No matching key found in localStorage');
      }
  
      return matchingKey;
    }
  
    const problemLocalStorageKey = findProblemLocalStorageKey();
    if (problemLocalStorageKey) {
      localStorage.removeItem(problemLocalStorageKey);
      console.log('Local storage data deleted');
    }
}
