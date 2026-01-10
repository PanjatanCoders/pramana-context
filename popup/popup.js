import { getContextByUrl, saveContext, getAllContexts } from "../storage/contextStore.js";
import { getAutoSaveEnabled } from "../storage/settingsStore.js";

// Character counter functionality
function updateCharCounter() {
    const intentText = document.getElementById("intent");
    const charCounter = document.getElementById("char-counter");
    if (intentText && charCounter) {
        charCounter.textContent = intentText.value.length;
    }
}

// Tags management
let currentTags = [];

function renderTags() {
    const tagsDisplay = document.getElementById("tags-display");
    if (!tagsDisplay) {
        console.log('Tags display element not found');
        return;
    }

    console.log('Rendering tags:', currentTags);

    // Clear existing tags
    tagsDisplay.innerHTML = '';

    // Create tag elements
    currentTags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = 'tag';

        const tagText = document.createTextNode(tag);
        tagEl.appendChild(tagText);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'tag-remove';
        removeBtn.textContent = '×';
        removeBtn.dataset.tag = tag;
        removeBtn.addEventListener('click', () => {
            currentTags = currentTags.filter(t => t !== tag);
            renderTags();
            updateTagSuggestions();
        });

        tagEl.appendChild(removeBtn);
        tagsDisplay.appendChild(tagEl);
    });
}

async function getAllExistingTags() {
    const contexts = await getAllContexts();
    const tagsSet = new Set();
    Object.values(contexts).forEach(ctx => {
        if (ctx.tags && Array.isArray(ctx.tags)) {
            ctx.tags.forEach(tag => tagsSet.add(tag));
        }
    });
    return Array.from(tagsSet).sort();
}

async function updateTagSuggestions() {
    const allTags = await getAllExistingTags();
    const unusedTags = allTags.filter(tag => !currentTags.includes(tag));
    const suggestionsContainer = document.getElementById("tags-suggestions");

    if (!suggestionsContainer) return;

    // Clear suggestions
    suggestionsContainer.innerHTML = '';

    if (unusedTags.length > 0) {
        unusedTags.slice(0, 5).forEach(tag => {
            const suggestionEl = document.createElement('span');
            suggestionEl.className = 'tag-suggestion';
            suggestionEl.textContent = tag;
            suggestionEl.dataset.tag = tag;
            suggestionEl.addEventListener('click', () => {
                addTag(tag);
            });
            suggestionsContainer.appendChild(suggestionEl);
        });
    }
}

function addTag(tag) {
    const trimmedTag = tag.trim().toLowerCase();
    console.log('Adding tag:', trimmedTag, 'Current tags:', currentTags);
    if (trimmedTag && !currentTags.includes(trimmedTag)) {
        currentTags.push(trimmedTag);
        console.log('Tag added. New tags array:', currentTags);
        renderTags();
        updateTagSuggestions();
    } else {
        console.log('Tag not added. Either empty or duplicate.');
    }
}

function initTagsInput() {
    const tagsInput = document.getElementById("tags-input");
    if (!tagsInput) return;

    tagsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && tagsInput.value.trim()) {
            e.preventDefault();
            addTag(tagsInput.value);
            tagsInput.value = '';
        } else if (e.key === 'Backspace' && tagsInput.value === '' && currentTags.length > 0) {
            currentTags.pop();
            renderTags();
            updateTagSuggestions();
        }
    });
}

// Update quick stats
async function updateQuickStats() {
    const contexts = await getAllContexts();
    const contextsArray = Object.values(contexts);

    const totalContexts = contextsArray.length;
    const activeContexts = contextsArray.filter(ctx => ctx.status === 'active').length;

    // Count unique tags
    const allTags = new Set();
    contextsArray.forEach(ctx => {
        if (ctx.tags && Array.isArray(ctx.tags)) {
            ctx.tags.forEach(tag => allTags.add(tag));
        }
    });

    const totalContextsEl = document.getElementById("total-contexts");
    const activeContextsEl = document.getElementById("active-contexts");
    const totalTagsEl = document.getElementById("total-tags");

    if (totalContextsEl) totalContextsEl.textContent = totalContexts;
    if (activeContextsEl) activeContextsEl.textContent = activeContexts;
    if (totalTagsEl) totalTagsEl.textContent = allTags.size;

    // Update footer message
    const footerMessage = document.getElementById("footer-message");
    if (footerMessage && totalContexts > 0) {
        const messages = [
            `You have ${totalContexts} context${totalContexts !== 1 ? 's' : ''} saved`,
            `${activeContexts} active context${activeContexts !== 1 ? 's' : ''}`,
            allTags.size > 0 ? `Organized with ${allTags.size} tag${allTags.size !== 1 ? 's' : ''}` : ''
        ].filter(Boolean);
        footerMessage.textContent = messages[Math.floor(Math.random() * messages.length)];
    }
}

(async function () {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });

    // Only work with HTTP/HTTPS URLs
    if (!tab || !tab.url || (!tab.url.startsWith("http://") && !tab.url.startsWith("https://"))) {
        document.querySelector('.popup-container').innerHTML = `
            <div style="padding: 40px 20px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                <div style="font-size: 14px; font-weight: 600; color: #c9d1d9; margin-bottom: 8px;">Not Available</div>
                <div style="font-size: 12px; color: #8b949e;">Extension only works on web pages (HTTP/HTTPS)</div>
            </div>
        `;
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

        // Hide the "Save" button for new pages (not yet in memory)
        // Only "Add to Memory" button should be visible
        saveBtn.style.display = "none";

        // Disable "Add to Memory" button initially
        savePageBtn.disabled = true;
        savePageBtn.style.opacity = "0.5";
        savePageBtn.title = "Please add intent first";

        // Enable "Add to Memory" button only when intent is provided
        intentText.addEventListener('input', () => {
            updateCharCounter();
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

        // Initialize character counter
        updateCharCounter();

        // Initialize tags
        initTagsInput();
        updateTagSuggestions();

        // Initialize quick stats
        updateQuickStats();

        savePageBtn.onclick = async () => {
            if (!intentText.value.trim()) {
                alert("Please add an intent before saving to memory");
                return;
            }

            const { createContext } = await import("../storage/contextModel.js");
            context = createContext({ url: tab.url, title: tab.title });
            context.intent = intentText.value.trim();
            context.tags = currentTags;

            await saveContext(context);

            // Close popup after successful save
            window.close();
        };

        // Enable saving intent after page is added
        saveBtn.onclick = async () => {
            if (context && intentText.value.trim()) {
                context.intent = intentText.value.trim();
                context.tags = currentTags;
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

    // Load existing tags (ensure backward compatibility)
    if (!context.tags) {
        context.tags = [];
    }
    if (context.tags && Array.isArray(context.tags)) {
        currentTags = [...context.tags];
    }
    renderTags();

    // Add character counter listener
    intentText.addEventListener('input', updateCharCounter);

    // Initialize character counter
    updateCharCounter();

    // Initialize tags
    initTagsInput();
    updateTagSuggestions();

    // Initialize quick stats
    updateQuickStats();

    document.getElementById("save").onclick = async () => {
        if (intentText.value.trim()) {
            context.intent = intentText.value.trim();
        }
        context.tags = currentTags;
        await saveContext(context);
        window.close();
    };

    document.getElementById("search-btn").onclick = () => {
        chrome.tabs.create({ url: chrome.runtime.getURL("search/search.html") });
    };
})();