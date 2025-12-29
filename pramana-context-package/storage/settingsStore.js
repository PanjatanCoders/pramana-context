const SETTINGS_KEY = 'pramana_settings';

const DEFAULT_SETTINGS = {
    autoSaveUrls: true
};

export async function getSettings() {
    const result = await chrome.storage.local.get(SETTINGS_KEY);
    return result[SETTINGS_KEY] || DEFAULT_SETTINGS;
}

export async function saveSetting(key, value) {
    const settings = await getSettings();
    settings[key] = value;
    await chrome.storage.local.set({ [SETTINGS_KEY]: settings });
}

export async function getAutoSaveEnabled() {
    const settings = await getSettings();
    return settings.autoSaveUrls !== false;
}
