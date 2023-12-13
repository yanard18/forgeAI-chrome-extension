// background.js

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === 'generateText') {
    const prompt = request.prompt;
    const apiKey = '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';

    console.log('Generating...');

    try {
      // Use await within an asynchronous function
      const res = await aiFetch(prompt, apiKey);

      if (res !== null) {
        console.log(res);
      }

      // If you want to send the generated text back to the popup or do other actions, you can use chrome.runtime.sendMessage here
    } catch (error) {
      console.error('Error during generation:', error);
    }
  }
});

