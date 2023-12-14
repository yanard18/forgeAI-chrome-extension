chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {

    var popup = document.createElement("div");
    popup.id = "inputPopup";
    popup.style.position = "absolute";
    popup.style.background = "#ffffff";
    popup.style.border = "1px solid #000000";
    popup.style.padding = "10px";
    popup.style.zIndex = "9999";
    // Get the selection range to determine the position
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var rect = range.getBoundingClientRect();

        // Set the popup position based on the selection position
        popup.style.top = `${rect.top + window.scrollY}px`;
        popup.style.left = `${rect.left + window.scrollX}px`;
    }

    var popupInput = document.createElement("input");
    popupInput.type = "text";
    popup.appendChild(popupInput);

    var generateButton = document.createElement("button");
    generateButton.id = "generateButton";
    generateButton.textContent = "Generate";
    popup.appendChild(generateButton);

    var cancelBtn = document.createElement("button");
    cancelBtn.id = "cacnelBtn";
    cancelBtn.textContent = "Cancel";
    popup.appendChild(cancelBtn);

    document.body.appendChild(popup);

    generateButton.addEventListener('click', function () {

        // Remove the popup immediately after clicking the button
        document.getElementById("inputPopup").remove();

        chrome.runtime.sendMessage({
            action: 'generateAiResponse',
            selection: message.message,
            input: popupInput.value
        });

    });

    cancelBtn.addEventListener('click', function () {
        document.getElementById("inputPopup").remove();
    });

});

