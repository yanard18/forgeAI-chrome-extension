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
        id: 'aiAskSelection',
        title: 'ForgeAI - Ask About Selcetion',
        contexts: ['selection']
    })

    chrome.contextMenus.create({
        id: 'aiAsk',
        title: 'ForgeAI - Ask',
        contexts: ['all']

    })
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === 'aiMeaning') {
        chrome.sidePanel.open({ windowId: tab.windowId });
        await aiFetch(info.selectionText);
    }
    else if (info.menuItemId === 'aiSimplify') {
        chrome.sidePanel.open({ windowId: tab.windowId });
        await aiFetch(
            "Describe the content with spimplifying: "
            + info.selectionText);
    }
    else if (info.menuItemId === 'aiAskSelection') {
        chrome.sidePanel.open({ windowId: tab.windowId });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { message: info.selectionText }, function
                (response) {
            });
        })
    } else if (info.menuItemId === 'aiAsk') {
        chrome.sidePanel.open({ windowId: tab.windowId });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { message: null}, function
                (response) {
            });
        })


    }
});


chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === 'generateAiResponse') {
        console.log(request);
        if(request.selection !== null)
            await aiFetch(request.input + '\n selected text: ' + request.selection);
        else
            await aiFetch(request.input);
    }
});

