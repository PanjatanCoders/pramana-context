import { getAllContexts, saveContext, deleteContext } from "../storage/contextStore.js";

let allContexts = [];

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

    container.innerHTML = contexts.map(context => `
        <div class="context-item" data-id="${context.id}">
            <div class="context-header">
                <h3 class="context-title">${context.title}</h3>
                <span class="context-status ${context.status}">${context.status}</span>
            </div>
            <div class="context-bottom">
                <div class="context-meta">
                    <span class="context-url">${getHostname(context.url)}</span>
                    <span class="context-visits">${context.visitCount} visits</span>
                    <span class="context-intent">${context.intent || 'No intent'}</span>
                </div>
                <div class="context-actions">
                    <button data-url="${context.url}">Open</button>
                    <button data-id="${context.id}" data-status="${context.status}">${context.status === 'active' ? 'Resolve' : 'Active'}</button>
                    <button data-delete="${context.id}" class="delete-btn">×</button>
                </div>
            </div>
        </div>
    `).join('');
    
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
}

function filterAndSort() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const statusFilter = document.getElementById("status-filter").value;
    const sortBy = document.getElementById("sort-by").value;

    let filtered = allContexts.filter(context => {
        const matchesSearch = !searchTerm || 
            context.title.toLowerCase().includes(searchTerm) ||
            (context.intent && context.intent.toLowerCase().includes(searchTerm));
        
        const matchesStatus = statusFilter === 'all' || context.status === statusFilter;
        
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

document.getElementById("search").addEventListener("input", filterAndSort);
document.getElementById("status-filter").addEventListener("change", filterAndSort);
document.getElementById("sort-by").addEventListener("change", filterAndSort);

loadContexts();