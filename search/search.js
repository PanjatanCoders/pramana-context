import { getAllContexts, saveContext, deleteContext } from "../storage/contextStore.js";
import { getSettings, saveSetting } from "../storage/settingsStore.js";

let allContexts = [];
let selectedContextIds = new Set();

function getHostname(url) {
    try {
        if (!url || typeof url !== 'string' || !url.includes('://')) {
            return url || 'Unknown';
        }
        return new URL(url).hostname;
    } catch {
        return url || 'Unknown';
    }
}

function formatTimeOpen(ms) {
    if (!ms || ms === 0) return '';
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m`;
    return '<1m';
}

function getDaysSinceLastVisit(lastVisitedAt) {
    return Math.floor((Date.now() - lastVisitedAt) / 86400000);
}

function isAbandoned(context) {
    const ABANDONED_THRESHOLD_DAYS = 7;
    return context.status === 'active' && getDaysSinceLastVisit(context.lastVisitedAt) >= ABANDONED_THRESHOLD_DAYS;
}

async function loadContexts() {
    const contexts = await getAllContexts();
    allContexts = Object.values(contexts);
    renderContexts(allContexts);
}

function renderContexts(contexts) {
    const container = document.getElementById("contexts-list");

    if (contexts.length === 0) {
        container.innerHTML = '<div class="no-results">No contexts found</div>';
        return;
    }

    container.innerHTML = contexts.map(context => {
        const abandoned = isAbandoned(context);
        const daysSince = getDaysSinceLastVisit(context.lastVisitedAt);
        return `
        <div class="context-item ${abandoned ? 'abandoned' : ''}" data-id="${context.id}">
            <input type="checkbox" class="context-checkbox" data-checkbox-id="${context.id}" ${selectedContextIds.has(context.id) ? 'checked' : ''} />
            <div class="context-content">
                <div class="context-header">
                    <h3 class="context-title">${context.title}</h3>
                    <span class="context-status ${context.status}">${context.status}${abandoned ? ' ⚠️' : ''}</span>
                </div>
                <div class="context-bottom">
                    <div class="context-meta">
                        <span class="context-url">${getHostname(context.url)}</span>
                        <span class="context-visits">${context.visitCount} visits</span>
                        ${abandoned ? `<span class="context-abandoned">⚠️ ${daysSince}d ago</span>` : ''}
                        ${context.totalTimeOpen > 0 ? `<span class="context-time-open ${context.totalTimeOpen > 3600000 ? 'long-open' : ''}">⏱ ${formatTimeOpen(context.totalTimeOpen)}</span>` : ''}
                        <div class="intent-section">
                            <div class="intent-display-wrapper" data-intent-display="${context.id}">
                                <span class="context-intent-text">${context.intent || '<span class="no-intent-text">Click pencil to add intent</span>'}</span>
                                <button class="intent-edit-icon" data-edit="${context.id}" title="Edit intent">✏️</button>
                            </div>
                            <textarea class="intent-edit hidden" data-intent-edit="${context.id}" placeholder="Add intent...">${context.intent || ''}</textarea>
                        </div>
                    </div>
                    <div class="context-actions">
                        <button data-url="${context.url}">Open</button>
                        <button data-id="${context.id}" data-status="${context.status}">${context.status === 'active' ? 'Resolve' : 'Active'}</button>
                        <button data-delete="${context.id}" class="delete-btn">×</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join('');

    // Add event listeners
    container.querySelectorAll('button[data-url]').forEach(btn => {
        btn.addEventListener('click', () => openContext(btn.dataset.url));
    });

    container.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', () => toggleStatus(btn.dataset.id));
    });

    container.querySelectorAll('.intent-edit-icon[data-edit]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleEditIntent(btn.dataset.edit);
        });
    });

    container.querySelectorAll('button[data-delete]').forEach(btn => {
        btn.addEventListener('click', () => deleteContextItem(btn.dataset.delete));
    });

    container.querySelectorAll('.context-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const contextId = e.target.dataset.checkboxId;
            if (e.target.checked) {
                selectedContextIds.add(contextId);
            } else {
                selectedContextIds.delete(contextId);
            }
            updateBulkActionsState();
        });
    });
}

function filterAndSort() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const statusFilter = document.getElementById("status-filter").value;
    const sortBy = document.getElementById("sort-by").value;

    let filtered = allContexts.filter(context => {
        const matchesSearch = !searchTerm ||
            context.title.toLowerCase().includes(searchTerm) ||
            (context.intent && context.intent.toLowerCase().includes(searchTerm));

        let matchesStatus;
        if (statusFilter === 'abandoned') {
            matchesStatus = isAbandoned(context);
        } else {
            matchesStatus = statusFilter === 'all' || context.status === statusFilter;
        }

        return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'recent':
                return b.lastVisitedAt - a.lastVisitedAt;
            case 'visits':
                return b.visitCount - a.visitCount;
            case 'created':
                return b.createdAt - a.createdAt;
            default:
                return 0;
        }
    });

    renderContexts(filtered);
}

async function deleteContextItem(contextId) {
    await deleteContext(contextId);
    await loadContexts();
}

function openContext(url) {
    chrome.tabs.create({ url });
}

async function toggleStatus(contextId) {
    const context = allContexts.find(c => c.id === contextId);
    if (context) {
        context.status = context.status === 'active' ? 'resolved' : 'active';
        await saveContext(context);
        await loadContexts();
    }
}

function updateBulkActionsState() {
    const deleteBtn = document.getElementById("delete-selected-btn");
    const selectAllBtn = document.getElementById("select-all-btn");

    deleteBtn.disabled = selectedContextIds.size === 0;

    const displayedContexts = Array.from(document.querySelectorAll('.context-checkbox'));
    const allSelected = displayedContexts.length > 0 &&
                        displayedContexts.every(cb => cb.checked);

    selectAllBtn.textContent = allSelected ? 'Deselect All' : 'Select All';
}

function toggleSelectAll() {
    const checkboxes = document.querySelectorAll('.context-checkbox');
    const allSelected = Array.from(checkboxes).every(cb => cb.checked);

    selectedContextIds.clear();

    if (!allSelected) {
        checkboxes.forEach(cb => {
            cb.checked = true;
            selectedContextIds.add(cb.dataset.checkboxId);
        });
    } else {
        checkboxes.forEach(cb => cb.checked = false);
    }

    updateBulkActionsState();
}

async function deleteSelectedContexts() {
    if (selectedContextIds.size === 0) return;

    const count = selectedContextIds.size;
    if (!confirm(`Delete ${count} selected context${count > 1 ? 's' : ''}?`)) {
        return;
    }

    for (const contextId of selectedContextIds) {
        await deleteContext(contextId);
    }

    selectedContextIds.clear();
    await loadContexts();
    updateBulkActionsState();
}

async function loadSettings() {
    const settings = await getSettings();
    const autoSaveToggle = document.getElementById("auto-save-toggle");
    autoSaveToggle.checked = settings.autoSaveUrls !== false;
}

async function toggleAutoSave(enabled) {
    await saveSetting('autoSaveUrls', enabled);
}

async function toggleEditIntent(contextId) {
    const intentDisplayWrapper = document.querySelector(`[data-intent-display="${contextId}"]`);
    const intentEdit = document.querySelector(`[data-intent-edit="${contextId}"]`);
    const editIcon = document.querySelector(`.intent-edit-icon[data-edit="${contextId}"]`);

    if (intentEdit.classList.contains('hidden')) {
        // Enter edit mode
        intentDisplayWrapper.classList.add('hidden');
        intentEdit.classList.remove('hidden');
        intentEdit.focus();

        // Create a wrapper for textarea and buttons
        const editWrapper = document.createElement('div');
        editWrapper.className = 'intent-edit-wrapper';
        editWrapper.dataset.editWrapper = contextId;
        editWrapper.style.display = 'flex';
        editWrapper.style.alignItems = 'center';
        editWrapper.style.gap = '4px';

        // Move textarea into wrapper
        intentEdit.parentNode.insertBefore(editWrapper, intentEdit);
        editWrapper.appendChild(intentEdit);

        // Add save and cancel buttons
        const saveBtn = document.createElement('button');
        saveBtn.textContent = '✓';
        saveBtn.className = 'intent-save-btn';
        saveBtn.dataset.save = contextId;
        saveBtn.title = 'Save (Enter)';

        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = '✕';
        cancelBtn.className = 'intent-cancel-btn';
        cancelBtn.dataset.cancel = contextId;
        cancelBtn.title = 'Cancel (Esc)';

        editWrapper.appendChild(saveBtn);
        editWrapper.appendChild(cancelBtn);

        // Handle save button click
        saveBtn.onclick = async () => {
            await saveIntent(contextId);
        };

        // Handle cancel button click
        cancelBtn.onclick = () => {
            cancelEdit(contextId);
        };

        // Handle save on Enter key
        const handleKeyPress = async (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                await saveIntent(contextId);
                intentEdit.removeEventListener('keypress', handleKeyPress);
            } else if (e.key === 'Escape') {
                cancelEdit(contextId);
                intentEdit.removeEventListener('keypress', handleKeyPress);
            }
        };
        intentEdit.addEventListener('keypress', handleKeyPress);
        intentEdit.dataset.keypressHandler = 'attached';
    }
}

async function saveIntent(contextId) {
    const context = allContexts.find(c => c.id === contextId);
    const intentEdit = document.querySelector(`[data-intent-edit="${contextId}"]`);

    if (context) {
        context.intent = intentEdit.value.trim();
        await saveContext(context);

        // Clean up edit mode before reloading
        const editWrapper = document.querySelector(`[data-edit-wrapper="${contextId}"]`);
        if (editWrapper) {
            editWrapper.parentNode.insertBefore(intentEdit, editWrapper);
            editWrapper.remove();
        }

        await loadContexts();
    }
}

function cancelEdit(contextId) {
    const intentDisplayWrapper = document.querySelector(`[data-intent-display="${contextId}"]`);
    const intentEdit = document.querySelector(`[data-intent-edit="${contextId}"]`);
    const editWrapper = document.querySelector(`[data-edit-wrapper="${contextId}"]`);
    const context = allContexts.find(c => c.id === contextId);

    // Restore original value
    intentEdit.value = context?.intent || '';

    // Exit edit mode
    intentDisplayWrapper.classList.remove('hidden');
    intentEdit.classList.add('hidden');

    // Move textarea back and remove wrapper
    if (editWrapper) {
        editWrapper.parentNode.insertBefore(intentEdit, editWrapper);
        editWrapper.remove();
    }
}

document.getElementById("search").addEventListener("input", filterAndSort);
document.getElementById("status-filter").addEventListener("change", filterAndSort);
document.getElementById("sort-by").addEventListener("change", filterAndSort);
document.getElementById("select-all-btn").addEventListener("click", toggleSelectAll);
document.getElementById("delete-selected-btn").addEventListener("click", deleteSelectedContexts);
document.getElementById("auto-save-toggle").addEventListener("change", (e) => {
    toggleAutoSave(e.target.checked);
});

loadContexts();
loadSettings();