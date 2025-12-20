import { getContextByUrl, saveContext } from "../storage/contextStore.js"

(async function () {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    if (!tab || !tab.url) return;
    const context = await getContextByUrl(tab.url) || {};

    document.getElementById("page-title").innerText = tab.title || "Untitled Page";

    const intentText = document.getElementById("intent");
    intentText.value = context?.intent || "";

    document.getElementById("save").onclick = async () => {
        context.intent = intentText.value.trim();
        await saveContext(tab.url, context);
        window.close();
    };
})();