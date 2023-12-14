const saveOptions = () => {
    const apiKey = document.getElementById('api-input').value;

    chrome.storage.sync.set(
        {key: apiKey},
        () => {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

document.getElementById('save').addEventListener('click', saveOptions);