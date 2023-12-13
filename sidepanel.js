chrome.runtime.onMessage.addListener(({ name, data }) => {
    if (name === 'define-word') {
      document.body.querySelector('#res').innerText = data.value;
      console.log(data.value);
    }
  });