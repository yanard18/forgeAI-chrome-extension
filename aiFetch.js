async function aiFetch(prompt) {
  chrome.storage.sync.get(['key'], async function (apiKey) {

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        stream: true,
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    var resultText = "";

    while (true) {
      const chunk = await reader.read();
      const { done, value } = chunk;
      if (done) {
        break;
      }
      const decodedChunk = decoder.decode(value);
      const lines = decodedChunk.split('\n');
      const parsedLines = lines
        .map(line => line.replace(/^data: /, "").trim())
        .filter(line => line !== "" && line !== "[DONE]")
        .map((line) => JSON.parse(line));

      for (const parsedLine of parsedLines) {
        const { choices } = parsedLine;
        const { delta } = choices[0];
        const { content } = delta;
        if (content) {
          resultText += content;
          chrome.runtime.sendMessage({
            name: 'define-word',
            data: { value: resultText }
          });
        }
      }
    }
  });
}

// Export the function for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = aiFetch;
}
