const STORAGE_KEY = "pramana_context";

export async function getAllContexts(params) {
    const result = await chrome.storage.local.get(STORAGE_KEY);
    return result[STORAGE_KEY] || {};
}

export async function saveContext(context) {
    const contexts = await getAllContexts();
    contexts[context.id] = context;
    await chrome.storage.local.set({ [STORAGE_KEY]: contexts });
}

export async function getContextByUrl(params) {
    const contexts = await getAllContexts();
    return Object.values(contexts).find(c => c.url === url)
}