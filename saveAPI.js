document.addEventListener('DOMContentLoaded', function() {
  const saveApiKeyButton = document.getElementById('saveApiKeyButton');
  const apiKeyInput = document.getElementById('apiKeyInput');

  saveApiKeyButton.addEventListener('click', function() {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      chrome.storage.sync.set({ 'apiKey': apiKey }, function() {
        console.log('API key saved:', apiKey);
      });
    }
  });
});

