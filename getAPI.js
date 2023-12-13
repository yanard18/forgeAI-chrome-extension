document.addEventListener('DOMContentLoaded', function() {
  const getApiKeyButton = document.getElementById('getApiKeyButton');

  getApiKeyButton.addEventListener('click', function() {
    chrome.storage.sync.get(['apiKey'], function(result) {
      const apiKey = result.apiKey;
      if (apiKey) {
        console.log('API key retrieved:', apiKey);
      } else {
        console.log('API key not found.');
      }
    });
  });
});
