const STORAGE_KEY = "pramana_context";

async function getAllContexts() {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || {};
}

async function saveContext(context) {
    const contexts = await getAllContexts();
    contexts[context.id] = context;
    await chrome.storage.local.set({ [STORAGE_KEY]: contexts });
}

async function deleteContext(contextId) {
    const contexts = await getAllContexts();
    delete contexts[contextId];
    await chrome.storage.local.set({ [STORAGE_KEY]: contexts });
}

async function getContextByUrl(url) {
    const contexts = await getAllContexts();
    return Object.values(contexts).find(c => c.url === url);
}

function createContext({ url, title }) {
  return {
    id: crypto.randomUUID(),
    url,
    title,
    intent: null,
    createdAt: Date.now(),
    lastVisitedAt: Date.now(),
    visitCount: 1,
    status: "active"
  };
}

async function handleTabContext(tab) {
  console.log('Processing tab:', tab?.url);
  
  // Only track HTTP/HTTPS URLs
  if (!tab || !tab.url) {
    console.log('No tab or URL');
    return;
  }
  
  if (!tab.url.startsWith("http://") && !tab.url.startsWith("https://")) {
    console.log('Not HTTP/HTTPS:', tab.url);
    return;
  }
  
  console.log('Saving context for:', tab.url);

  let context = await getContextByUrl(tab.url);

  if (!context) {
    context = createContext({
      url: tab.url,
      title: tab.title,
    });
  } else {
    context.lastVisitedAt = Date.now();
    context.visitCount++;
    context.title = tab.title; // Update title in case it changed
  }
  await saveContext(context);
}

async function cleanupDuplicateUrls() {
  const contexts = await getAllContexts();
  const urlMap = new Map();
  const cleaned = {};
  
  // Keep only the most recent entry for each URL
  for (const [id, context] of Object.entries(contexts)) {
    if (context.url && context.url.startsWith("http")) {
      const existing = urlMap.get(context.url);
      if (!existing || context.lastVisitedAt > existing.lastVisitedAt) {
        if (existing) {
          // Merge visit counts
          context.visitCount = (context.visitCount || 1) + (existing.visitCount || 1);
        }
        urlMap.set(context.url, context);
      }
    }
  }
  
  // Convert back to object with IDs
  urlMap.forEach(context => {
    cleaned[context.id] = context;
  });
  
  await chrome.storage.local.set({ [STORAGE_KEY]: cleaned });
  console.log('Cleaned up duplicate URLs');
}

// Clean up on startup
cleanupDuplicateUrls();

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  try {
    const tab = await chrome.tabs.get(tabId);
    console.log('Tab activated:', tab.url);
    await handleTabContext(tab);
  } catch (error) {
    console.log('Error handling tab:', error);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    try {
      console.log('Tab updated:', tab.url);
      await handleTabContext(tab);
    } catch (error) {
      console.log('Error handling tab update:', error);
    }
  }
});
