# Release Notes - Pramana Context v2.2.3

**Release Date**: January 2026

## 🎉 What's New in v2.2.3

### ✨ Enhanced Delete Functionality
Complete delete support across all views!

**Features:**
- **Single Delete in Grouped View**: Delete button (×) now available for each context in grouped view
- **Bulk Delete in Grouped View**: Checkboxes added to grouped view for multi-select
- **Select All**: Works seamlessly in both regular and grouped views
- **Confirmation Dialogs**: Confirm before deleting multiple contexts
- **Consistent UI**: Delete buttons styled consistently across all views

**Bug Fixes:**
- Fixed unused variable warning in intent editing function
- Improved layout in grouped view with checkbox integration

---

## 🎉 What's New in v2.2.2

### 🏷️ Tags & Categories System
The most requested feature is here! Organize your contexts with custom tags for better categorization and discoverability.

**Features:**
- **Add Tags**: Type a tag and press Enter in the popup
- **Tag Suggestions**: Automatically suggests up to 5 previously used tags
- **Remove Tags**: Click the × button on any tag to remove it
- **Backspace Support**: Press Backspace in empty tag input to remove the last tag
- **Display Everywhere**: Tags appear in both popup and search/memory page
- **Smart Storage**: Tags saved with each context and persist across sessions

### 📊 Quick Stats in Popup
Get instant insights without leaving the popup!

**Stats Displayed:**
- 📚 **Total Contexts**: All saved contexts
- 🎯 **Active Contexts**: Currently active contexts
- 🏷️ **Total Tags**: Unique tags across all contexts

**Additional Features:**
- Rotating footer messages with stats
- Hover effects on stat cards
- Staggered animation on load

### 🎨 Premium UI Enhancements
- **Compact Design**: Reduced padding and font sizes throughout
  - Header: 20px → 14px padding
  - Sections: 14-16px padding (previously 20px)
  - Font sizes: 10-13px (optimized for readability)
- **Blue Gradient Tags**: Consistent styling across popup and search
- **Tag Pop Animation**: Smooth scale and bounce effect when adding tags
- **Sequential Animations**: Elements animate in with staggered delays (0.2s - 0.6s)

### 🐛 Bug Fixes
- **Fixed**: Tags not displaying after adding
- **Fixed**: Tags not persisting after save
- **Fixed**: Statistics showing 0 tags even when tags exist
- **Improved**: Backward compatibility for contexts without tags field
- **Enhanced**: DOM element creation for better performance

### 🔧 Technical Improvements
- Replaced `innerHTML` with `createElement` for tags (more secure)
- Added console logging for debugging tag operations
- Improved error handling for missing tag elements
- Optimized animation timing for smoother experience

---

## 📸 Screenshots

### Popup with Tags
- Premium blue gradient header
- Tag input with suggestions
- Quick stats display
- Compact, efficient layout

### Search Page with Tags
- Tags displayed below intent
- Hover effects on tags
- Both regular and grouped views supported
- Consistent styling across the interface

---

## 🚀 How to Update

### From Chrome Web Store / Edge Add-ons
The extension will auto-update within 24 hours. To manually update:
1. Go to `chrome://extensions/` or `edge://extensions/`
2. Enable "Developer mode"
3. Click "Update" button

### Manual Installation
1. Download the latest release
2. Go to `chrome://extensions/` or `edge://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the extracted folder

---

## 🔄 Upgrade Path from v2.0.0

Your existing data will be preserved! The upgrade includes:

✅ **Automatic Migration**: Old contexts without tags get `tags: []` automatically
✅ **No Data Loss**: All your existing contexts, intents, and settings remain intact
✅ **Backward Compatible**: Extension works with both old and new data formats

---

## 📋 Complete Feature List (v2.2.2)

### Core Features
- Intent tracking for each page
- Smart search (by intent or title)
- Context memory (visit counts, time tracking)
- Abandoned tab detection (7+ days)
- Domain grouping
- Export/import data
- Privacy-first (local storage only)

### Advanced Features
- ✨ Tags & categories (NEW)
- ✨ Tag suggestions (NEW)
- ✨ Quick stats in popup (NEW)
- ✨ Tags in search page (NEW)
- Statistics dashboard (6 metrics)
- Date range filtering
- Priority indicators (HIGH/MED badges)
- Pagination (10 items/page)
- Collapsible domain groups
- Dark/Light theme
- Toast notifications
- Auto-save toggle
- Inline editing
- Bulk operations
- Badge notifications
- Status management
- Time tracking
- Premium animations
- Compact design

---

## 🐛 Known Issues

None currently. Please report any issues on [GitHub](https://github.com/PanjatanCoders/pramana-context/issues).

---

## 🗺️ What's Next?

### v2.3.0 (Planned)
- Tag filtering in search page
- Tag-based statistics
- Tag color customization
- Most used tags widget

### v3.0.0 (Future)
- Import data feature
- Keyboard shortcuts
- Custom date range picker
- Advanced analytics

---

## 💬 Feedback & Support

We'd love to hear from you!

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/PanjatanCoders/pramana-context/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/PanjatanCoders/pramana-context/discussions)
- ⭐ **Star the Project**: [GitHub Repository](https://github.com/PanjatanCoders/pramana-context)
- 📧 **Contact**: Open an issue or discussion on GitHub

---

## 🙏 Thank You!

Thank you for using Pramana Context! Your support and feedback help us make this extension better for everyone.

**Happy Organizing!** 🎯

---

**Full Changelog**: [v2.0.0...v2.2.2](https://github.com/PanjatanCoders/pramana-context/compare/v2.0.0...v2.2.2)
