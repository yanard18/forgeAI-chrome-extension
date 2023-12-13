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
});

var aiRes = "";

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
});


async function useAIAndShowResult(propmt) {
    const apiKey = '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';

    console.log("Starting...");
    const res = await aiFetch(propmt, apiKey);

    if (res !== null) {
        aiRes = res;
        console.log(res);
    }


    chrome.runtime.sendMessage({
        name: 'define-word',
        data: { value: aiRes }
    });

}


chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    if (request.action === 'slideBarLoaded') {
        sendResponse(aiRes);
    }
});

