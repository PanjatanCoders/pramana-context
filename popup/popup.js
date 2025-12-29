import { getContextByUrl, saveContext } from "../storage/contextStore.js";
import { getAutoSaveEnabled } from "../storage/settingsStore.js";

(async function () {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    // Only work with HTTP/HTTPS URLs
    if (!tab || !tab.url || (!tab.url.startsWith("http://") && !tab.url.startsWith("https://"))) {
        document.body.innerHTML = '<div style="padding: 20px; text-align: center;">Extension only works on web pages</div>';
        return;
    }

    const autoSaveEnabled = await getAutoSaveEnabled();
    let context = await getContextByUrl(tab.url);

    // Auto-save is disabled and context doesn't exist
    if (!autoSaveEnabled && !context) {
        document.getElementById("page-title").innerText = tab.title || "Untitled Page";

        const statusDiv = document.getElementById("context-status");
        statusDiv.textContent = "This page is not saved in memory";
        statusDiv.className = "context-status not-saved";

        const savePageBtn = document.getElementById("save-page-btn");
        savePageBtn.classList.remove("hidden");

        const intentText = document.getElementById("intent");
        const saveBtn = document.getElementById("save");

        // Disable both buttons initially
        saveBtn.disabled = true;
        saveBtn.style.opacity = "0.5";
        saveBtn.title = "Add page to memory first";

        savePageBtn.disabled = true;
        savePageBtn.style.opacity = "0.5";
        savePageBtn.title = "Please add intent first";

        // Enable "Add to Memory" button only when intent is provided
        intentText.addEventListener('input', () => {
            if (intentText.value.trim()) {
                savePageBtn.disabled = false;
                savePageBtn.style.opacity = "1";
                savePageBtn.title = "";
            } else {
                savePageBtn.disabled = true;
                savePageBtn.style.opacity = "0.5";
                savePageBtn.title = "Please add intent first";
            }
        });

        savePageBtn.onclick = async () => {
            if (!intentText.value.trim()) {
                alert("Please add an intent before saving to memory");
                return;
            }

            const { createContext } = await import("../storage/contextModel.js");
            context = createContext({ url: tab.url, title: tab.title });
            context.intent = intentText.value.trim();

            await saveContext(context);

            // Close popup after successful save
            window.close();
        };

        // Enable saving intent after page is added
        saveBtn.onclick = async () => {
            if (context && intentText.value.trim()) {
                context.intent = intentText.value.trim();
                await saveContext(context);
            }
            window.close();
        };

        document.getElementById("search-btn").onclick = () => {
            chrome.tabs.create({ url: chrome.runtime.getURL("search/search.html") });
        };

        return;
    }

    // Auto-save is enabled OR context already exists
    if (!context) {
        const { createContext } = await import("../storage/contextModel.js");
        context = createContext({ url: tab.url, title: tab.title });
        await saveContext(context);
    }

    document.getElementById("page-title").innerText = tab.title || "Untitled Page";

    const statusDiv = document.getElementById("context-status");
    statusDiv.textContent = "Saved in memory";
    statusDiv.className = "context-status saved";

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