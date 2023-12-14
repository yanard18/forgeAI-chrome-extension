importScripts('./aiFetch.js');

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'aiMeaning',
        title: 'ForgeAI - Meaning',
        contexts: ['selection']
    });

    chrome.contextMenus.create({
        id: "aiSimplify",
        title: "ForgeAI - Simplify",
        contexts: ['selection']
    })

    chrome.contextMenus.create({
        id: 'aiAsk',
        title: 'ForgeAI - Ask',
        contexts: ['selection']
    })
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'aiMeaning') {
        chrome.sidePanel.open({ windowId: tab.windowId });
        await useAIAndShowResult(info.selectionText);
    }
    else if (info.menuItemId === 'aiSimplify') {
        chrome.sidePanel.open({ windowId: tab.windowId });
        await useAIAndShowResult(
            "Describe the content with spimplifying: "
            + info.selectionText);
    }
    else if (info.menuItemId === 'aiAsk') {
        chrome.sidePanel.open({ windowId: tab.windowId });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { message: info.selectionText }, function
                (response) {
            });
        })



    }
});



async function useAIAndShowResult(prompt) {
    chrome.storage.sync.get(['key'], async function (apiKey) {
        const res = await aiFetch(prompt, apiKey.key);

        if (res !== null) {
            chrome.runtime.sendMessage({
                name: 'define-word',
                data: { value: res }
            });
        }
    });
}


chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === 'generateAiResponse') {
        await useAIAndShowResult(request.input + '\n selected text: ' + request.selection);
    }
});

