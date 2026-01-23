import { getAllContexts, saveContext, deleteContext } from "../storage/contextStore.js";
import { getSettings, saveSetting } from "../storage/settingsStore.js";

let allContexts = [];
let selectedContextIds = new Set();
let groupViewEnabled = false;
let searchDebounceTimer = null;
let currentPage = 1;
let itemsPerPage = 10;
let filteredContexts = [];
let collapsedGroups = new Set();

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

function getGroupingDomain(url) {
    const hostname = getHostname(url);
    if (hostname === 'Unknown') return hostname;

    // Common hosting services that should group by parent domain
    // Check for Netlify
    if (/\.netlify\.app$/i.test(hostname)) return 'netlify.app';
    if (/\.netlify\.com$/i.test(hostname)) return 'netlify.com';

    // GitHub Pages
    if (/\.github\.io$/i.test(hostname)) return 'github.io';

    // Vercel
    if (/\.vercel\.app$/i.test(hostname)) return 'vercel.app';

    // Heroku
    if (/\.herokuapp\.com$/i.test(hostname)) return 'herokuapp.com';

    // Azure
    if (/\.azurewebsites\.net$/i.test(hostname)) return 'azurewebsites.net';

    // Firebase
    if (/\.firebaseapp\.com$/i.test(hostname)) return 'firebaseapp.com';
    if (/\.web\.app$/i.test(hostname)) return 'web.app';

    // CloudFront
    if (/\.cloudfront\.net$/i.test(hostname)) return 'cloudfront.net';

    // For regular domains, return full hostname
    return hostname;
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

// Priority calculation based on visits and time spent
function getPriority(context) {
    const highVisitThreshold = 10;
    const highTimeThreshold = 3600000; // 1 hour

    if (context.visitCount >= highVisitThreshold || context.totalTimeOpen >= highTimeThreshold) {
        return 'high';
    } else if (context.visitCount >= 5 || context.totalTimeOpen >= 1800000) {
        return 'medium';
    }
    return 'normal';
}

// Toast notification system
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fadeOut');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Theme toggle
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-toggle');
    const isLight = body.classList.toggle('light-theme');

    themeBtn.textContent = isLight ? '☀️' : '🌙';
    saveSetting('theme', isLight ? 'light' : 'dark');
    showToast(`Switched to ${isLight ? 'light' : 'dark'} theme`, 'success');
}

// Statistics calculation
function calculateStatistics(contexts) {
    const stats = {
        total: contexts.length,
        active: contexts.filter(c => c.status === 'active').length,
        resolved: contexts.filter(c => c.status === 'resolved').length,
        totalVisits: contexts.reduce((sum, c) => sum + c.visitCount, 0),
        totalTime: contexts.reduce((sum, c) => sum + (c.totalTimeOpen || 0), 0),
        mostVisited: null
    };

    if (contexts.length > 0) {
        const sorted = [...contexts].sort((a, b) => b.visitCount - a.visitCount);
        stats.mostVisited = sorted[0];
    }

    return stats;
}

// Update statistics dashboard
function updateStatistics(contexts) {
    const stats = calculateStatistics(contexts);

    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-active').textContent = stats.active;
    document.getElementById('stat-resolved').textContent = stats.resolved;
    document.getElementById('stat-visits').textContent = stats.totalVisits;

    const hours = Math.floor(stats.totalTime / 3600000);
    const minutes = Math.floor((stats.totalTime % 3600000) / 60000);
    document.getElementById('stat-time').textContent = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

    document.getElementById('stat-most-visited').textContent =
        stats.mostVisited ? `${stats.mostVisited.title.substring(0, 20)}...` : '-';
}

// Date range filtering
function filterByDateRange(contexts, range) {
    const now = Date.now();
    const ranges = {
        'today': 86400000, // 1 day
        'week': 604800000, // 7 days
        'month': 2592000000, // 30 days
        '3months': 7776000000 // 90 days
    };

    if (range === 'all') return contexts;

    const threshold = now - ranges[range];
    return contexts.filter(c => c.lastVisitedAt >= threshold);
}

function groupContextsByDomain(contexts) {
    const groups = {};
    contexts.forEach(context => {
        const domain = getGroupingDomain(context.url);
        if (!groups[domain]) {
            groups[domain] = {
                domain,
                contexts: [],
                count: 0,
                totalVisits: 0,
                lastVisit: 0
            };
        }
        groups[domain].contexts.push(context);
        groups[domain].count++;
        groups[domain].totalVisits += context.visitCount;
        groups[domain].lastVisit = Math.max(groups[domain].lastVisit, context.lastVisitedAt);
    });
    return Object.values(groups).sort((a, b) => b.lastVisit - a.lastVisit);
}

async function loadContexts() {
    const contexts = await getAllContexts();
    allContexts = Object.values(contexts);
    updateStatistics(allContexts);
    filteredContexts = allContexts;
    currentPage = 1; // Reset to first page
    if (groupViewEnabled) {
        renderGroupedView(allContexts);
    } else {
        renderContexts(allContexts);
    }
}

function renderContexts(contexts) {
    const container = document.getElementById("contexts-list");
    const paginationDiv = document.getElementById("pagination");

    if (contexts.length === 0) {
        container.innerHTML = '<div class="no-results">No contexts found</div>';
        paginationDiv.classList.add('hidden');
        return;
    }

    // Calculate pagination
    const totalPages = Math.ceil(contexts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedContexts = contexts.slice(startIndex, endIndex);

    // Show/hide pagination
    if (totalPages > 1) {
        paginationDiv.classList.remove('hidden');
        updatePaginationUI(currentPage, totalPages);
    } else {
        paginationDiv.classList.add('hidden');
    }

    container.innerHTML = paginatedContexts.map(context => {
        const abandoned = isAbandoned(context);
        const daysSince = getDaysSinceLastVisit(context.lastVisitedAt);
        const priority = getPriority(context);
        return `
        <div class="context-item ${abandoned ? 'abandoned' : ''} ${priority !== 'normal' ? priority + '-priority' : ''}" data-id="${context.id}">
            <input type="checkbox" class="context-checkbox" data-checkbox-id="${context.id}" ${selectedContextIds.has(context.id) ? 'checked' : ''} />
            <div class="context-content">
                <div class="context-header">
                    <h3 class="context-title">
                        ${context.title}
                        ${priority === 'high' ? '<span class="priority-badge high">HIGH</span>' : ''}
                        ${priority === 'medium' ? '<span class="priority-badge medium">MED</span>' : ''}
                    </h3>
                    <span class="context-status ${context.status}">${context.status}${abandoned ? ' ⚠️' : ''}</span>
                </div>
                <div class="context-table">
                    <div class="context-col-left">
                        <span class="context-url">${getHostname(context.url)}</span>
                        <span class="context-visits">${context.visitCount} visits</span>
                        ${abandoned ? `<span class="context-abandoned">⚠️ ${daysSince}d ago</span>` : ''}
                        ${context.totalTimeOpen > 0 ? `<span class="context-time-open ${context.totalTimeOpen > 3600000 ? 'long-open' : ''}">⏱ ${formatTimeOpen(context.totalTimeOpen)}</span>` : ''}
                    </div>
                    <div class="context-col-center">
                        <div class="intent-section">
                            <div class="intent-display-wrapper" data-intent-display="${context.id}">
                                <span class="context-intent-text">${context.intent || '<span class="no-intent-text">Click pencil to add intent</span>'}</span>
                                <button class="intent-edit-icon" data-edit="${context.id}" title="Edit intent">✏️</button>
                            </div>
                            <textarea class="intent-edit hidden" data-intent-edit="${context.id}" placeholder="Add intent...">${context.intent || ''}</textarea>
                        </div>
                        ${context.tags && context.tags.length > 0 ? `
                        <div class="context-tags">
                            ${context.tags.map(tag => `<span class="context-tag">${tag}</span>`).join('')}
                        </div>
                        ` : ''}
                    </div>
                    <div class="context-col-right">
                        <div class="context-actions">
                            <button data-url="${context.url}">Open</button>
                            <button data-id="${context.id}" data-status="${context.status}">${context.status === 'active' ? 'Resolve' : 'Active'}</button>
                            <button data-delete="${context.id}" class="delete-btn">×</button>
                        </div>
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

function renderGroupedView(contexts) {
    const container = document.getElementById("contexts-list");
    const groups = groupContextsByDomain(contexts);

    if (groups.length === 0) {
        container.innerHTML = '<div class="no-results">No contexts found</div>';
        return;
    }

    // Sort contexts within each group by visit count
    groups.forEach(group => {
        group.contexts.sort((a, b) => b.visitCount - a.visitCount);
    });

    container.innerHTML = groups.map(group => {
        const isCollapsed = collapsedGroups.has(group.domain);
        const previewContexts = group.contexts.slice(0, 3);

        return `
        <div class="domain-group ${isCollapsed ? 'collapsed' : ''}" data-domain="${group.domain}">
            <div class="domain-group-header" data-toggle-domain="${group.domain}">
                <h3 class="domain-name">${group.domain}</h3>
                <span class="group-stats">${group.count} page${group.count > 1 ? 's' : ''} • ${group.totalVisits} total visits</span>
            </div>
            <div class="domain-group-preview">
                ${previewContexts.map(context => `
                    <div class="preview-item">
                        <strong>${context.title}</strong> - ${context.visitCount} visits
                    </div>
                `).join('')}
                ${group.count > 3 ? `<div class="preview-item">... and ${group.count - 3} more</div>` : ''}
            </div>
            <div class="domain-group-contexts">
                ${group.contexts.map(context => {
                    const abandoned = isAbandoned(context);
                    const daysSince = getDaysSinceLastVisit(context.lastVisitedAt);
                    return `
                    <div class="context-item-mini ${abandoned ? 'abandoned' : ''}" data-id="${context.id}">
                        <input type="checkbox" class="context-checkbox" data-checkbox-id="${context.id}" ${selectedContextIds.has(context.id) ? 'checked' : ''} />
                        <div class="context-mini-content">
                            <div class="context-mini-title">${context.title}</div>
                            <div class="context-mini-table">
                                <div class="mini-col-left">
                                    <span>${context.visitCount} visits</span>
                                    ${abandoned ? `<span class="mini-abandoned">⚠️ ${daysSince}d</span>` : ''}
                                </div>
                                <div class="mini-col-center">
                                    ${context.intent ? `<span class="mini-intent">"${context.intent}"</span>` : '<span class="mini-intent no-intent">-</span>'}
                                    ${context.tags && context.tags.length > 0 ? `
                                    <div class="mini-tags">
                                        ${context.tags.map(tag => `<span class="mini-tag">${tag}</span>`).join('')}
                                    </div>
                                    ` : ''}
                                </div>
                                <div class="mini-col-right">
                                    <div class="context-mini-actions">
                                        <button data-url="${context.url}" class="mini-btn">Open</button>
                                        <button data-id="${context.id}" data-status="${context.status}" class="mini-btn">${context.status === 'active' ? 'Resolve' : 'Active'}</button>
                                        <button data-delete="${context.id}" class="mini-btn delete-btn">×</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                }).join('')}
            </div>
        </div>
    `}).join('');

    // Add event listeners
    container.querySelectorAll('button[data-url]').forEach(btn => {
        btn.addEventListener('click', () => openContext(btn.dataset.url));
    });

    container.querySelectorAll('button[data-id]').forEach(btn => {
        btn.addEventListener('click', () => toggleStatus(btn.dataset.id));
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

    // Add toggle event listeners for collapsible groups
    container.querySelectorAll('[data-toggle-domain]').forEach(header => {
        header.addEventListener('click', () => {
            const domain = header.dataset.toggleDomain;
            const groupDiv = header.closest('.domain-group');

            if (collapsedGroups.has(domain)) {
                collapsedGroups.delete(domain);
                groupDiv.classList.remove('collapsed');
            } else {
                collapsedGroups.add(domain);
                groupDiv.classList.add('collapsed');
            }
        });
    });
}

function filterAndSort() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const statusFilter = document.getElementById("status-filter").value;
    const dateRange = document.getElementById("date-range-filter").value;
    const sortBy = document.getElementById("sort-by").value;

    // Apply date range filter first
    let filtered = filterByDateRange(allContexts, dateRange);

    // Then apply search and status filters
    filtered = filtered.filter(context => {
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

    filteredContexts = filtered;
    currentPage = 1; // Reset to first page on filter change
    updateStatistics(filtered); // Update stats based on filtered data

    if (groupViewEnabled) {
        renderGroupedView(filtered);
    } else {
        renderContexts(filtered);
    }
}

function updatePaginationUI(page, totalPages) {
    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredContexts.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderContexts(filteredContexts);

    // Scroll to top of list
    document.getElementById("contexts-list").scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function deleteContextItem(contextId) {
    await deleteContext(contextId);
    await loadContexts();
    showToast('Context deleted', 'success');
}

function openContext(url) {
    chrome.tabs.create({ url });
    showToast('Opening in new tab', 'info');
}

async function toggleStatus(contextId) {
    const context = allContexts.find(c => c.id === contextId);
    if (context) {
        const newStatus = context.status === 'active' ? 'resolved' : 'active';
        context.status = newStatus;
        await saveContext(context);
        await loadContexts();
        showToast(`Marked as ${newStatus}`, 'success');
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
    showToast(`Deleted ${count} context${count > 1 ? 's' : ''}`, 'success');
}

async function loadSettings() {
    const settings = await getSettings();
    const autoSaveToggle = document.getElementById("auto-save-toggle");
    const groupViewToggle = document.getElementById("group-view-toggle");
    const themeBtn = document.getElementById('theme-toggle');

    autoSaveToggle.checked = settings.autoSaveUrls !== false;
    groupViewEnabled = settings.groupByDomain === true;
    groupViewToggle.checked = groupViewEnabled;

    // Load theme
    if (settings.theme === 'light') {
        document.body.classList.add('light-theme');
        themeBtn.textContent = '☀️';
    } else {
        themeBtn.textContent = '🌙';
    }
}

async function toggleAutoSave(enabled) {
    await saveSetting('autoSaveUrls', enabled);
}

async function toggleEditIntent(contextId) {
    const intentDisplayWrapper = document.querySelector(`[data-intent-display="${contextId}"]`);
    const intentEdit = document.querySelector(`[data-intent-edit="${contextId}"]`);

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

document.getElementById("search").addEventListener("input", () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(filterAndSort, 300);
});
document.getElementById("status-filter").addEventListener("change", filterAndSort);
document.getElementById("date-range-filter").addEventListener("change", filterAndSort);
document.getElementById("sort-by").addEventListener("change", filterAndSort);
document.getElementById("select-all-btn").addEventListener("click", toggleSelectAll);
document.getElementById("delete-selected-btn").addEventListener("click", deleteSelectedContexts);
document.getElementById("auto-save-toggle").addEventListener("change", (e) => {
    toggleAutoSave(e.target.checked);
    showToast(`Auto-save ${e.target.checked ? 'enabled' : 'disabled'}`, 'success');
});
document.getElementById("group-view-toggle").addEventListener("change", async (e) => {
    groupViewEnabled = e.target.checked;
    await saveSetting('groupByDomain', groupViewEnabled);
    loadContexts();
    showToast(`Group view ${e.target.checked ? 'enabled' : 'disabled'}`, 'success');
});
document.getElementById("export-btn").addEventListener("click", exportData);
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

// Pagination event listeners
document.getElementById("prev-page").addEventListener("click", () => {
    goToPage(currentPage - 1);
});

document.getElementById("next-page").addEventListener("click", () => {
    goToPage(currentPage + 1);
});

async function exportData() {
    const contexts = await getAllContexts();
    const dataStr = JSON.stringify(contexts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pramana-context-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Data exported successfully', 'success');
}

// Load settings first, then contexts
(async () => {
    await loadSettings();
    await loadContexts();
})();