# Pramana Context - Tab Intent Tracker

**Remember why you opened it.**

> A Chrome extension that helps you track and remember the purpose behind every page you visit. Perfect for researchers, developers, students, and anyone managing multiple tasks.

Pramana Context preserves the *intent* behind every tab, so you never lose context in long-running work.

---

## 🎯 Features

### Core Functionality
- **Intent Tracking**: Add notes about why you opened each page
- **Smart Search**: Find tabs by intent or title
- **Context Memory**: Track visit counts and time spent on each page
- **Abandoned Tabs**: Automatically identify tabs you haven't visited in 7+ days
- **Domain Grouping**: Organize tabs by website for better overview
- **Export Data**: Backup your contexts in JSON format
- **Privacy First**: All data stored locally on your device

### Advanced Features
- **Auto-save Toggle**: Choose automatic or manual URL tracking
- **Inline Editing**: Edit intent notes directly in the search interface
- **Bulk Operations**: Select and delete multiple contexts at once
- **Badge Notifications**: See count of abandoned contexts at a glance
- **Status Management**: Mark contexts as Active or Resolved
- **Time Tracking**: See how long you've kept tabs open
- **Dark Theme**: Developer-friendly UI optimized for long sessions

---

## 🧠 What Problem Does It Solve?

People don't forget links — they forget *why* those links mattered.

- Tabs stay open for days with no context
- Bookmarks lose meaning over time
- Research, debugging, and learning get fragmented
- Important work is silently abandoned

Pramana Context preserves intent so you can resume work without mental reload.

---

## 🚀 Installation

### From Chrome Web Store _(Coming Soon)_
1. Visit the Chrome Web Store listing
2. Click "Add to Chrome"
3. Start tracking your browsing context!

### Manual Installation (Development)
1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" (top right)
4. Click "Load unpacked"
5. Select the `pramana-context` folder

---

## 💡 How to Use

### Quick Start
1. Visit any webpage (HTTP/HTTPS only)
2. Click the Pramana Context extension icon
3. Add a note: "Why did I open this?"
4. Click "Add to Memory" or "Save"
5. Your context is saved and searchable!

### Search & Manage
1. Click the "Search Memory" button in the popup
2. Use the search bar to find contexts by intent or title
3. Filter by status (All/Active/Resolved/Abandoned)
4. Sort by recent visits, visit count, or date created
5. Edit intents inline using the pencil icon ✏️
6. Mark contexts as "Resolved" when done
7. Delete individual or multiple contexts

### Settings & Preferences
- **Auto-save URLs**: Toggle to automatically track all visited pages (default: ON)
- **Group by Domain**: Toggle to organize contexts by website (preference saved)
- **Export Data**: Download all your contexts as JSON for backup

---

## 📁 Project Structure

```
pramana-context/
├── manifest.json              # Extension configuration
├── background/
│   └── serviceWorker.js      # Background processes, tab tracking
├── popup/
│   ├── popup.html            # Extension popup UI
│   ├── popup.css             # Popup styles
│   └── popup.js              # Popup logic
├── search/
│   ├── search.html           # Full search interface
│   ├── search.css            # Dark theme styles
│   └── search.js             # Search, filter, sort logic
├── storage/
│   ├── contextStore.js       # Context CRUD operations
│   ├── contextModel.js       # Context data model
│   └── settingsStore.js      # User settings management
├── assets/
│   └── icons/                # Extension icons (16, 48, 128)
├── PRIVACY_POLICY.md         # Privacy policy for Chrome Web Store
├── STORE_LISTING.md          # Store listing content
└── PUBLISHING_CHECKLIST.md   # Pre-launch checklist
```

---

## 🛠️ Tech Stack

- **Manifest V3**: Latest Chrome extension standard
- **Vanilla JavaScript**: ES6 modules, no frameworks
- **Chrome APIs**: `tabs`, `storage.local`
- **CSS3**: Custom dark theme with smooth transitions
- **No Dependencies**: Lightweight and fast

---

## 🔒 Privacy & Security

Pramana Context is built with privacy as a core principle:

✅ **All data stored locally** on your device using Chrome's storage API
✅ **No external servers** or data transmission
✅ **No tracking or analytics** of any kind
✅ **No third-party services** or dependencies
✅ **You own your data** completely — view, export, or delete anytime

**Required Permissions:**
- `tabs`: To read page URLs and titles for saving contexts
- `storage`: To save your data locally on your device

Read our full [Privacy Policy](PRIVACY_POLICY.md)

---

## 🌍 Browser Support

- ✅ Google Chrome (Manifest V3)
- ✅ Microsoft Edge (Chromium-based)
- ⏳ Firefox (planned)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:
- Report bugs via GitHub Issues
- Suggest features
- Submit Pull Requests
- Improve documentation

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Chrome version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

---

## 🗺️ Roadmap

**Completed (v1.0.0):**
- ✅ Core intent capture and tracking
- ✅ Context-based search and filtering
- ✅ Domain grouping
- ✅ Abandoned tab detection (7+ days)
- ✅ Time tracking for open tabs
- ✅ Export functionality
- ✅ Dark theme UI

**Planned:**
- [ ] Import data feature
- [ ] Tags and categories
- [ ] Keyboard shortcuts
- [ ] Statistics dashboard
- [ ] Browser sync (optional)
- [ ] Advanced search filters

---

## 📊 Version History

### v1.0.0 _(Current)_
- Initial release
- Full context tracking system
- Search, filter, and sort capabilities
- Premium dark theme UI
- Export and bulk operations
- Abandoned context detection
- Auto-save toggle
- Group view with persistence
- Inline intent editing

---

## 🧭 Philosophy

*Pramana* means "valid knowledge" or "means of knowing" in Sanskrit.

Pramana Context exists to preserve not just information — but **understanding**.

Modern browsing is optimized for speed, not memory. This extension acts as a lightweight cognitive layer for your browser, helping you maintain context across long research sessions, complex debugging, and deep learning.

---

## 📜 License

MIT License — see LICENSE file for details

---

## 🙏 Acknowledgments

Built with ❤️ for productivity enthusiasts, researchers, and developers everywhere.

**Star this repo ⭐** if you find it helpful!
