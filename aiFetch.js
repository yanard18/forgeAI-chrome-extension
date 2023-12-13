async function aiFetch(prompt, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
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
    }),
  });

  if (response.ok) {
    const result = await response.json();
    console.log('API Response:', result);
    return result.choices[0].message.content;
  } else {
    console.error('Fetch failed. HTTP status:', response.status);
    return null;
  }
}

// Export the function for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = aiFetch;
}