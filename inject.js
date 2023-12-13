// content.js

document.addEventListener("mouseup", function(event) {
  var selectedText = window.getSelection().toString();

  if (selectedText) {
    var popup = document.createElement("div");
    popup.id = "customPopup";
    popup.style.position = "absolute";
    popup.style.background = "#ffffff";
    popup.style.border = "1px solid #000000";
    popup.style.padding = "10px";
    popup.style.zIndex = "9999";
    popup.style.top = `${event.clientY}px`;
    popup.style.left = `${event.clientX}px`;

    var popupContent = document.createElement("p");
    popupContent.textContent = `Selected Text: ${selectedText}`;
    popup.appendChild(popupContent);

    var generateButton = document.createElement("button");
    generateButton.id = "generateButton";
    generateButton.textContent = "Generate";
    popup.appendChild(generateButton);

    document.body.appendChild(popup);

    generateButton.addEventListener('click', function() {
      // Send a message to the background script with the selected text
      chrome.runtime.sendMessage({ action: 'generateText', prompt: selectedText });
      // Remove the popup immediately after clicking the button
      document.getElementById("customPopup").remove();
    });
  }
});

