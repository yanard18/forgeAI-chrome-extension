document.addEventListener('DOMContentLoaded', function() {
	const generateButton = document.getElementById('generateButton');
	const inputText = document.getElementById('inputText');
	const outputDiv = document.getElementById('output');
	const apiKeyInput = document.getElementById('apiKeyInput');
	const saveApiKeyButton = document.getElementById('saveApiKeyButton');

	// Load saved API key if available
	chrome.storage.sync.get(['apiKey'], function(result) {
		const savedApiKey = result.apiKey;
		if (savedApiKey) {
			apiKeyInput.value = savedApiKey;
		}
	});

	generateButton.addEventListener('click', async function() {
		const prompt = inputText.value.trim();
		if (!prompt) return;

		const apiKey = apiKeyInput.value.trim();
		if (!apiKey) {
			outputDiv.textContent = 'API key not provided. Please configure your extension.';
			return;
		}

		// Send a message to the background script with the selected text as the prompt
		chrome.runtime.sendMessage({ action: 'generateText', prompt: prompt });

		// For immediate user feedback, you can set the outputDiv with a loading message
		outputDiv.textContent = 'Generating...';
	});

	saveApiKeyButton.addEventListener('click', function() {
		const apiKey = apiKeyInput.value.trim();
		if (apiKey) {
			chrome.storage.sync.set({ 'apiKey': apiKey }, function() {
				console.log('API key saved:', apiKey);
			});
		}
	});
});
