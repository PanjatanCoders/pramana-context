# Pramana Context - Tab Intent Tracker

**Remember why you opened it.**

> A Chrome extension that helps you track and remember the purpose behind every page you visit. Perfect for researchers, developers, students, and anyone managing multiple tasks.

Pramana Context preserves the *intent* behind every tab, so you never lose context in long-running work.

---

## 🎯 Features

### Core Functionality
- **Intent Tracking**: Add notes about why you opened each page
- **Smart Search**: Find tabs by intent or title with debounced search
- **Context Memory**: Track visit counts and time spent on each page
- **Abandoned Tabs**: Automatically identify tabs you haven't visited in 7+ days
- **Domain Grouping**: Organize tabs by website (Netlify, GitHub Pages, Vercel, etc.)
- **Export Data**: Backup your contexts in JSON format
- **Privacy First**: All data stored locally on your device

### Advanced Features (v2.2)
- **Tags & Categories**: Organize contexts with custom tags for better categorization
- **Quick Stats in Popup**: See total contexts, active count, and tag count at a glance
- **Tag Suggestions**: Auto-suggest previously used tags for consistency
- **Statistics Dashboard**: Real-time metrics for total contexts, active/resolved status, visits, and time spent
- **Date Range Filtering**: Filter by Today, Last 7 Days, Last 30 Days, or Last 3 Months
- **Priority Indicators**: Visual HIGH/MED badges for frequently visited or long-running contexts
- **Pagination**: View 10 items per page for better performance with large datasets
- **Collapsible Groups**: Expand/collapse domain groups with preview of top 3 contexts
- **Dark/Light Theme**: Toggle between developer-friendly dark and clean light themes
- **Toast Notifications**: Instant feedback for all actions
- **Auto-save Toggle**: Choose automatic or manual URL tracking
- **Inline Editing**: Edit intent notes directly in the search interface
- **Bulk Operations**: Select and delete multiple contexts at once
- **Badge Notifications**: See count of abandoned contexts at a glance
- **Status Management**: Mark contexts as Active or Resolved
- **Time Tracking**: See how long you've kept tabs open
- **Premium Animations**: Smooth transitions and staggered animations throughout the UI
- **Compact Design**: Optimized popup height for better screen real estate

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

**This is an open-source project and we welcome contributions!**

GitHub Repository: [https://github.com/PanjatanCoders/pramana-context](https://github.com/PanjatanCoders/pramana-context)

### How to Contribute
- 🐛 **Report bugs** via [GitHub Issues](https://github.com/PanjatanCoders/pramana-context/issues)
- 💡 **Suggest features** or improvements
- 🔧 **Submit Pull Requests** for bug fixes or new features
- 📖 **Improve documentation** or add examples
- ⭐ **Star the repository** to show your support
- 🔀 **Fork the project** and build your own extensions

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/pramana-context.git`
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes and test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

We appreciate all contributions, big or small! Feel free to participate and help make Pramana Context better for everyone.

---

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Chrome version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

---

## 🗺️ Roadmap

**Completed (v2.0.0):**
- ✅ Core intent capture and tracking
- ✅ Context-based search and filtering
- ✅ Smart domain grouping (Netlify, GitHub Pages, Vercel, etc.)
- ✅ Abandoned tab detection (7+ days)
- ✅ Time tracking for open tabs
- ✅ Export functionality
- ✅ Dark/Light theme toggle
- ✅ Statistics dashboard with 6 real-time metrics
- ✅ Date range filtering (Today, Week, Month, 3 Months)
- ✅ Priority indicators (HIGH/MED badges)
- ✅ Pagination (10 items per page)
- ✅ Collapsible domain groups with previews
- ✅ Toast notification system
- ✅ Inline intent editing
- ✅ Bulk operations
- ✅ Settings persistence

**Completed (v2.2.2):**
- ✅ Tags and categories system
- ✅ Tag suggestions from existing tags
- ✅ Quick stats in popup
- ✅ Tags display in search/memory page
- ✅ Premium animations and transitions
- ✅ Compact popup design

**Planned:**
- [ ] Import data feature
- [ ] Tag filtering in search
- [ ] Keyboard shortcuts
- [ ] Browser sync (optional)
- [ ] Custom date range picker
- [ ] Context sharing/collaboration
- [ ] Advanced analytics

---

## 📊 Version History

### v2.2.2 _(Current - December 2024)_
- **Tags & Categories**: Add custom tags to organize contexts
- **Tag Suggestions**: Auto-suggest from existing tags (shows up to 5)
- **Quick Stats**: Popup shows total contexts, active count, and unique tags
- **Tags in Search**: Display tags in both regular and grouped views
- **Premium UI**: Redesigned popup with blue gradient header and bold typography
- **Compact Design**: Reduced padding and font sizes for better space utilization
- **Enhanced Animations**: Sequential animations with staggered delays
- **Character Counter**: Real-time character count for intent field
- **Bug Fixes**: Fixed tags not displaying, improved backward compatibility

### v2.1.0
- Premium popup redesign with gradient header
- Bold typography (700-800 font weights)
- 3D button effects with shadows
- Character counter for intent textarea
- Improved spacing and visual hierarchy

### v2.0.0
- Statistics dashboard with 6 real-time metrics
- Date range filtering (Today, Week, Month, 3 Months)
- Priority indicators with HIGH/MED badges
- Pagination (10 items per page)
- Collapsible domain groups with context previews
- Dark/Light theme toggle with persistence
- Toast notification system
- Tabular layout for better organization
- Smart domain grouping (Netlify, GitHub Pages, Vercel, Heroku, Azure, Firebase, CloudFront)
- Enhanced light mode styling
- Settings persistence improvements

### v1.0.0
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

MIT License — see [LICENSE](LICENSE) file for details

Copyright (c) 2025 Raza Technology Services

Permission is hereby granted, free of charge, to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software.

---

## 🙏 Acknowledgments

Built with ❤️ by [Raza Technology Services](https://github.com/PanjatanCoders) for productivity enthusiasts, researchers, and developers everywhere.

**Star this repo ⭐** if you find it helpful!

### Support the Project
- ⭐ Star the repository on [GitHub](https://github.com/PanjatanCoders/pramana-context)
- 🐛 Report issues or bugs
- 💡 Share feature ideas
- 🔀 Contribute code or documentation
- 📢 Share with others who might find it useful

---

**Made with ❤️ and open-sourced for the community**
