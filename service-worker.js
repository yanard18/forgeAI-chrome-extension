chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'openSidePanel',
    title: 'Use AI',
    contexts: ['selection']
  });
});

var lastSelection = "";

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openSidePanel') {
    // This will open the panel in all the pages on the current window.
    chrome.sidePanel.open({ windowId: tab.windowId });
    lastSelection = info.selectionText;
  }

});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message === 'get-user-data') {
    sendResponse(lastSelection);
  }
});


/*
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === 'generateText') {
    const prompt = request.prompt;
    const apiKey = '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';

      // Use await within an asynchronous function

        chrome.sidePanel.setOptions({path: sidePanel});
      const res = await aiFetch(prompt, apiKey);

      if (res !== null) {
        chrome.sidePanel.setOptions({path: sp});
      }
  }
});
*/

