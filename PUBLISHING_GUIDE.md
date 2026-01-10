# Publishing Guide - Pramana Context v2.2.2

This guide will walk you through publishing Pramana Context to Chrome Web Store and Microsoft Edge Add-ons.

---

## 📋 Pre-Publishing Checklist

### ✅ Code & Testing
- [x] All features working correctly
- [x] Tags system functional
- [x] Quick stats displaying
- [x] Animations smooth
- [ ] Tested on Chrome (latest version)
- [ ] Tested on Edge (latest version)
- [ ] No console errors
- [ ] Extension loads without issues
- [ ] All permissions justified

### ✅ Documentation
- [x] README.md updated with v2.2 features
- [x] RELEASE_NOTES.md created
- [x] PRIVACY_POLICY.md exists
- [ ] STORE_LISTING.md reviewed
- [x] Version number updated to 2.2.2 in manifest.json
- [ ] Screenshots captured (1280x800 or 640x400)
- [ ] Promotional images created (440x280 for small tile)

### ✅ Assets
- [x] Icons present (16x16, 48x48, 128x128)
- [ ] Screenshots (at least 1, max 5)
- [ ] Promotional images (optional but recommended)
- [ ] Video demo (optional)

### ✅ Legal & Compliance
- [x] Privacy policy written
- [x] MIT License included
- [x] No external dependencies
- [x] No tracking/analytics
- [x] All data stored locally

---

## 📦 Step 1: Package the Extension

### For Chrome Web Store

1. **Clean up development files** (remove if present):
   ```bash
   # Remove these if they exist:
   - .git folder
   - .gitignore
   - node_modules
   - package.json (if using npm for dev only)
   - Any test files or development scripts
   ```

2. **Verify required files**:
   ```
   ✅ manifest.json
   ✅ background/serviceWorker.js
   ✅ popup/popup.html, popup.css, popup.js
   ✅ search/search.html, search.css, search.js
   ✅ storage/*.js files
   ✅ assets/icons/*.png files
   ✅ PRIVACY_POLICY.md
   ✅ README.md
   ```

3. **Create ZIP file**:

   **Windows (PowerShell)**:
   ```powershell
   # Navigate to project directory
   cd g:\AutomationProjects\pramana-context

   # Create ZIP (exclude .git and other dev files)
   Compress-Archive -Path * -DestinationPath pramana-context-v2.2.2.zip -Force
   ```

   **Linux/Mac**:
   ```bash
   cd /path/to/pramana-context
   zip -r pramana-context-v2.2.2.zip . -x "*.git*" "node_modules/*" ".DS_Store"
   ```

   **Using File Explorer (Windows)**:
   - Select all files in the `pramana-context` folder
   - Right-click → "Send to" → "Compressed (zipped) folder"
   - Rename to `pramana-context-v2.2.2.zip`

### For Edge Add-ons
Use the same ZIP file created for Chrome Web Store. Edge supports the same package format.

---

## 🌐 Step 2: Publish to Chrome Web Store

### Prerequisites
- Google account
- One-time $5 developer registration fee
- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)

### Publishing Steps

1. **Register as Chrome Web Store Developer** (if not already):
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
   - Pay the one-time $5 registration fee
   - Agree to the Developer Agreement

2. **Create New Item**:
   - Click "New Item" button
   - Upload `pramana-context-v2.2.2.zip`
   - Wait for upload to complete

3. **Fill Store Listing**:

   **Product Details**:
   - **Name**: `Pramana Context - Tab Intent Tracker`
   - **Summary** (132 chars max):
     ```
     Remember why you opened each tab. Track intent, add notes, and organize your research with tags. Privacy-first, locally stored.
     ```
   - **Description**: Copy from STORE_LISTING.md (see below)
   - **Category**: `Productivity`
   - **Language**: `English (United States)`

   **Icon**:
   - Upload `assets/icons/icon128.png` (128x128)

   **Screenshots** (1280x800 or 640x400):
   - Capture at least 1, maximum 5 screenshots
   - **Recommended screenshots**:
     1. Popup with tags and quick stats
     2. Search page with contexts and tags
     3. Grouped view with tags
     4. Statistics dashboard
     5. Dark/Light theme comparison

   **Promotional Images** (optional but recommended):
   - Small tile: 440x280
   - Marquee: 1400x560 (for featured placement)

4. **Privacy Practices**:
   - **Single Purpose Description**:
     ```
     This extension helps users remember why they opened each browser tab by allowing them to add intent notes and tags, track visit history, and organize contexts by domain.
     ```
   - **Permissions Justification**:
     - `tabs`: Required to read page URLs and titles for context saving
     - `storage`: Required to save context data locally on user's device
   - **Host Permissions**: None required
   - **Data Usage**:
     - No data collection
     - All data stored locally
     - No external servers
   - **Privacy Policy**: Provide URL to your hosted privacy policy OR upload PRIVACY_POLICY.md

5. **Distribution**:
   - **Visibility**: `Public`
   - **Regions**: `All regions` (or select specific countries)

6. **Submit for Review**:
   - Click "Submit for Review"
   - Review typically takes 1-3 business days
   - You'll receive email when approved

---

## 🔷 Step 3: Publish to Microsoft Edge Add-ons

### Prerequisites
- Microsoft account
- No registration fee
- [Microsoft Edge Partner Center](https://partner.microsoft.com/dashboard/microsoftedge)

### Publishing Steps

1. **Register as Edge Extension Developer**:
   - Go to [Partner Center](https://partner.microsoft.com/dashboard/microsoftedge)
   - Sign in with Microsoft account
   - Complete registration (free)

2. **Submit New Extension**:
   - Click "New extension"
   - Upload `pramana-context-v2.2.2.zip`

3. **Fill Extension Details**:
   - **Name**: `Pramana Context - Tab Intent Tracker`
   - **Summary**:
     ```
     Remember why you opened each tab. Track intent, add notes, and organize with tags. Privacy-first.
     ```
   - **Description**: Copy from STORE_LISTING.md
   - **Category**: `Productivity`
   - **Language**: `English`

4. **Store Listing Assets**:
   - **Icon**: `assets/icons/icon128.png`
   - **Screenshots**: Same as Chrome Web Store
   - **Privacy Policy**: Provide URL or upload

5. **Privacy & Permissions**:
   - **Permissions**:
     - `tabs`: Read page information
     - `storage`: Store data locally
   - **Justification**: Same as Chrome Web Store
   - **Privacy Policy**: Required

6. **Availability**:
   - **Markets**: All available markets
   - **Pricing**: Free

7. **Submit**:
   - Click "Publish"
   - Review typically takes 1-2 business days

---

## 📝 Store Listing Content

### Short Description (132 characters)
```
Remember why you opened each tab. Track intent, add notes, and organize your research with tags. Privacy-first, locally stored.
```

### Full Description

```markdown
# Pramana Context - Tab Intent Tracker

**Remember why you opened it.**

Stop losing track of your research, debugging sessions, and deep work. Pramana Context helps you track and remember the purpose behind every page you visit.

## 🎯 Key Features

### NEW in v2.2: Tags & Categories
- **Organize with Tags**: Add custom tags to categorize your contexts
- **Smart Suggestions**: Auto-suggest previously used tags
- **Quick Stats**: See total contexts, active count, and tag count at a glance
- **Tag Display**: Tags visible in both popup and search interface

### Core Functionality
- **Intent Tracking**: Add notes about why you opened each page
- **Smart Search**: Find tabs by intent or title with instant search
- **Context Memory**: Track visit counts and time spent
- **Abandoned Detection**: Identify tabs you haven't visited in 7+ days
- **Domain Grouping**: Organize by website (Netlify, GitHub, Vercel, etc.)

### Advanced Features
- **Statistics Dashboard**: Real-time metrics (total, active, resolved, visits, time)
- **Date Filtering**: Filter by Today, Week, Month, or 3 Months
- **Priority Badges**: Visual HIGH/MED indicators for important contexts
- **Dark/Light Theme**: Toggle between themes
- **Bulk Operations**: Select and manage multiple contexts
- **Export Data**: Backup your contexts in JSON format
- **Inline Editing**: Edit intent notes directly in search

## 🔒 Privacy First

✅ **100% Local Storage** - All data stays on your device
✅ **No External Servers** - Zero data transmission
✅ **No Tracking** - No analytics or telemetry
✅ **Open Source** - Fully transparent code

**Permissions:**
- `tabs`: To read page URLs and titles
- `storage`: To save data locally on your device

## 💡 Perfect For

- 📚 **Researchers**: Track sources and research intent
- 👨‍💻 **Developers**: Remember why you opened that StackOverflow tab
- 🎓 **Students**: Organize study materials and resources
- 📝 **Writers**: Keep track of reference materials
- 🧠 **Anyone**: Managing multiple tasks and projects

## 🚀 How to Use

1. Visit any webpage
2. Click the Pramana icon
3. Add intent: "Why did I open this?"
4. Add tags for organization
5. Your context is saved and searchable!

## 🌟 What Makes It Special

**Pramana** (प्रमाण) means "valid knowledge" in Sanskrit. This extension preserves not just information — but **understanding**.

Modern browsing is optimized for speed, not memory. Pramana Context acts as a cognitive layer for your browser, helping you maintain context across long sessions.

## 🆓 Free & Open Source

- MIT Licensed
- No ads, no premium tiers
- Community-driven development
- GitHub: github.com/PanjatanCoders/pramana-context

## 📊 Version 2.2.2 Features

**New:**
- Tags & categories system
- Tag suggestions (auto-complete)
- Quick stats in popup
- Premium animations
- Compact design

**All Features:**
- Intent tracking with tags
- Smart search & filtering
- Statistics dashboard
- Date range filters
- Priority indicators
- Dark/Light theme
- Bulk operations
- Export data
- Privacy-first

---

**Made with ❤️ for productivity enthusiasts**

Privacy Policy: [Include URL or attach]
Support: GitHub Issues
```

---

## 📸 Screenshot Guidelines

### Required Screenshots (1280x800 or 640x400)

**Screenshot 1: Main Popup with Tags**
- Show the premium popup interface
- Tags input with a few tags added
- Quick stats visible
- Intent field filled

**Screenshot 2: Search Page**
- Show multiple contexts with tags
- Statistics dashboard visible
- Some tags displayed below intents

**Screenshot 3: Grouped View**
- Domain grouping enabled
- Show contexts organized by domain
- Tags visible in mini view

**Screenshot 4: Dark/Light Theme**
- Split view or side-by-side
- Same page in both themes

**Screenshot 5: Statistics** (optional)
- Close-up of statistics dashboard
- Show all 6 metrics

### Tips for Great Screenshots
- Use 1280x800 resolution
- Clear, readable text
- Show actual functionality
- Include realistic data (not "Test test test")
- Use professional, clean examples
- Highlight key features

---

## ⏱️ Post-Publishing

### After Approval

1. **Update GitHub**:
   ```bash
   git tag v2.2.2
   git push origin v2.2.2
   ```

2. **Create GitHub Release**:
   - Go to GitHub → Releases → "Create new release"
   - Tag: `v2.2.2`
   - Title: `v2.2.2 - Tags & Categories`
   - Description: Copy from RELEASE_NOTES.md
   - Attach `pramana-context-v2.2.2.zip`

3. **Update README**:
   - Update installation links with Chrome Web Store URL
   - Update installation links with Edge Add-ons URL

4. **Announce**:
   - Share on social media
   - Post on Reddit (r/chrome, r/productivity)
   - Update any project listings

### Monitoring

- Check Chrome Web Store reviews daily
- Respond to Edge Add-ons feedback
- Monitor GitHub issues
- Track installation stats

---

## 🐛 If Rejected

Common reasons and fixes:

1. **Privacy Policy Missing**: Ensure privacy policy is accessible
2. **Permissions Not Justified**: Add clear justification in manifest
3. **Single Purpose**: Ensure description clearly states single purpose
4. **Screenshots**: Add if missing, improve quality if unclear
5. **Metadata**: Fix any formatting issues in description

---

## 📞 Support & Resources

- **Chrome Web Store Developer Docs**: https://developer.chrome.com/docs/webstore/
- **Edge Add-ons Developer Guide**: https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/
- **Extension Manifest V3**: https://developer.chrome.com/docs/extensions/mv3/

---

**Ready to publish? Good luck! 🚀**
