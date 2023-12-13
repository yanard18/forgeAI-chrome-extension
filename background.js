// background.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'generateText') {
    const prompt = request.prompt;
    // Use the prompt to generate text

    // For demonstration purposes, let's just log the generated text to the console
    console.log('Generated Text:', prompt);

    // If you want to send the generated text back to the popup or do other actions, you can use chrome.runtime.sendMessage here
  }
});

