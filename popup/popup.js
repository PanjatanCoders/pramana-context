import { getContextByUrl, saveContext } from "../storage/contextStore.js";

(async function () {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    // Only work with HTTP/HTTPS URLs
    if (!tab || !tab.url || (!tab.url.startsWith("http://") && !tab.url.startsWith("https://"))) {
        document.body.innerHTML = '<div style="padding: 20px; text-align: center;">Extension only works on web pages</div>';
        return;
    }
    
    let context = await getContextByUrl(tab.url);
    
    if (!context) {
        const { createContext } = await import("../storage/contextModel.js");
        context = createContext({ url: tab.url, title: tab.title });
        await saveContext(context);
    }

    document.getElementById("page-title").innerText = tab.title || "Untitled Page";

    const intentText = document.getElementById("intent");
    intentText.value = context?.intent || "";

    document.getElementById("save").onclick = async () => {
        if (intentText.value.trim()) {
            context.intent = intentText.value.trim();
            await saveContext(context);
        }
        window.close();
    };
    
    document.getElementById("search-btn").onclick = () => {
        chrome.tabs.create({ url: chrome.runtime.getURL("search/search.html") });
    };
})();