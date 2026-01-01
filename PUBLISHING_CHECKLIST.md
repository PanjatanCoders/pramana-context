# Pramana Context - Publishing Checklist

## Pre-Submission Requirements

### ✅ Required Files
- [x] manifest.json (v2.0.0, author: Raza Technology Services)
- [x] Privacy Policy (PRIVACY_POLICY.md)
- [x] Store Listing content (STORE_LISTING.md)
- [x] Icons (16x16, 48x48, 128x128) - Located in assets/icons/
- [x] README.md updated with v2.0.0 features
- [x] LICENSE file (MIT License)
- [ ] Screenshots (1280x800 or 640x400) - **CREATE THESE**
- [ ] Promotional images (440x280 small tile) - **CREATE THIS**
- [ ] Promotional images (920x680 marquee) - **OPTIONAL**
- [ ] Promotional images (1400x560 large tile) - **OPTIONAL**

### 📸 Screenshot Requirements
Create at least 1-5 screenshots showing:
1. **Main popup** - showing the intent input and save functionality
2. **Search interface (dark mode)** - showing the context list with statistics dashboard
3. **Light mode interface** - showing the clean light theme
4. **Grouped view** - showing collapsible domain groups with previews
5. **Statistics & Filters** - showing date range filtering, priority badges, and dashboard

**Screenshot Specs:**
- Size: 1280x800 or 640x400 pixels
- Format: PNG or JPG
- Max file size: 16MB each
- Show the extension in action with sample data

### 🎨 Icon Requirements
Verify you have proper icons at:
- `assets/icons/icon16.png` (16x16)
- `assets/icons/icon48.png` (48x48)
- `assets/icons/icon128.png` (128x128)

**Icon should:**
- Be clear and recognizable
- Work well on light and dark backgrounds
- Represent the concept of "context" or "memory"

### 📝 Manifest Updates
- [x] Updated name to include keywords
- [x] Enhanced description (132 chars max)
- [x] Added default_title for tooltip
- [x] Author field set to "Raza Technology Services"
- [x] Version updated to 2.0.0

### 🔐 Privacy & Policies
- [x] Privacy Policy created
- [ ] Host Privacy Policy URL (required by Chrome Web Store)
  - Options: GitHub Pages, your website, or Google Drive
  - Must be publicly accessible
  - Add URL to manifest.json under "homepage_url"

### 📄 Store Listing Content

Use content from `STORE_LISTING.md`:
- [x] Extension name (with keywords)
- [x] Short description (132 chars)
- [x] Detailed description (rich formatting with features)
- [x] Category: Productivity
- [ ] Language: English (select during submission)

### 🧪 Testing Checklist (v2.0.0 Features)
Test these scenarios before publishing:

**Core Features:**
- [ ] Fresh install works correctly
- [ ] Auto-save toggle works
- [ ] Manual save with intent works
- [ ] Search functionality works (with debounce)
- [ ] Status filters work (All/Active/Resolved/Abandoned)
- [ ] Sort options work (Recent/Visits/Created)
- [ ] Works on different websites (HTTP/HTTPS)
- [ ] Error handling for non-web pages
- [ ] No console errors

**New v2.0.0 Features:**
- [ ] Statistics dashboard displays correctly (6 metrics)
- [ ] Date range filtering works (Today/Week/Month/3 Months)
- [ ] Priority badges show correctly (HIGH/MED)
- [ ] Pagination works (10 items per page, prev/next buttons)
- [ ] Collapsible groups work (click to expand/collapse)
- [ ] Group previews show top 3 contexts
- [ ] Dark/Light theme toggle works
- [ ] Theme preference persists after reload
- [ ] Toast notifications appear for all actions
- [ ] Tabular layout displays correctly in both modes
- [ ] Light mode styling is correct (no black backgrounds)
- [ ] Dropdown options visible in light mode

**Existing Features:**
- [ ] Group by domain toggle works and persists
- [ ] Smart domain grouping (Netlify, GitHub Pages, Vercel, etc.)
- [ ] Edit intent inline works
- [ ] Delete individual items works
- [ ] Bulk select/delete works
- [ ] Export data works (JSON format)
- [ ] Badge shows abandoned count
- [ ] Time tracking works
- [ ] Abandoned detection (7+ days)

### 💰 Developer Account
- [ ] Chrome Web Store developer account created ($5 one-time fee)
- [ ] Payment method added (if not already done)

### 📦 Packaging

**Automated Packaging Scripts Available:**
- Windows: `package-extension.bat`
- Linux/Mac: `./package-extension.sh`
- Node.js: `node package-extension.js`

These scripts automatically:
- [x] Include only necessary files (manifest, background, popup, search, storage, assets)
- [x] Exclude development files (.git, node_modules, README, etc.)
- [x] Create properly named ZIP: `pramana-context-v2.0.0.zip`
- [ ] **Run packaging script before submission**
- [ ] Test ZIP file by loading as unpacked extension

## Submission Steps

### 1. Chrome Web Store Developer Dashboard
1. Go to https://chrome.google.com/webstore/devconsole
2. Sign in with Google account
3. Pay $5 developer registration fee (if first time)

### 2. Upload Extension
1. Click "New Item"
2. Upload your ZIP file
3. Wait for automated review to complete

### 3. Fill Out Store Listing

**Product Details:**
- Small Tile Icon (440x280 PNG/JPG)
- Screenshots (1-5 images)
- Promotional images (optional)

**Description:**
- Copy from STORE_LISTING.md (Detailed Description section)
- Use proper markdown formatting

**Additional Fields:**
- Category: Productivity
- Language: English
- Privacy Policy URL: [YOUR URL HERE]

**Single Purpose Description:**
- "This extension helps users track and remember why they opened each browser tab by allowing them to add intent notes and search their browsing context."

**Permission Justification:**
- **tabs**: "Required to identify which web pages the user visits in order to save them with context notes"
- **storage**: "Required to save user's context data, intent notes, and preferences locally on their device"

### 4. Privacy Practices
- [x] Declare that extension does not collect user data
- [x] Confirm no remote code execution
- [x] Provide privacy policy URL
- [x] No analytics or tracking

### 5. Distribution
- [ ] Choose visibility: Public
- [ ] Select regions: All regions
- [ ] Pricing: Free

### 6. Submit for Review
- [ ] Review all information
- [ ] Click "Submit for Review"
- [ ] Wait 1-3 days for Google review

## Post-Submission

### Monitor Review Status
- Check developer dashboard daily
- Respond to any review feedback within 7 days

### After Approval
- [ ] Update GitHub README with store links and badges
- [ ] Create GitHub release (v2.0.0) with changelog
- [ ] Share on social media
- [ ] Post on Product Hunt
- [ ] Share on Reddit (r/SideProject, r/Chrome, r/productivity)
- [ ] Share on Hacker News (Show HN)
- [ ] Monitor reviews and ratings
- [ ] Respond to user feedback
- [ ] Set up GitHub Issues for bug reports

**GitHub Repository:** https://github.com/PanjatanCoders/pramana-context

### Initial Marketing
- [ ] Create a simple landing page
- [ ] Write a blog post about the extension
- [ ] Share in relevant communities (developer forums, productivity groups)
- [ ] Ask friends/colleagues for honest reviews

## Microsoft Edge Add-ons Submission

The same extension package can be submitted to Microsoft Edge Add-ons:

1. Go to https://partner.microsoft.com/dashboard/microsoftedge
2. Create account (free, no registration fee)
3. Click "Create new extension"
4. Upload same ZIP file: `pramana-context-v2.0.0.zip`
5. Fill out similar information as Chrome Web Store
6. Submit for review (typically 1-2 business days)

**Edge-specific notes:**
- Same manifest.json works for both stores
- Same screenshots can be reused
- Review process is typically faster than Chrome

---

## Version Updates

For future updates:
1. Increment version in manifest.json (2.0.0 → 2.0.1 or 2.1.0)
2. Update README.md version history
3. Run packaging script to create new ZIP
4. Upload new version in both store dashboards
5. Add changelog/release notes
6. Submit for review
7. Create GitHub release with tag

## Important Notes

⚠️ **Review Time**: Usually 1-3 business days, but can take up to 1 week

⚠️ **Common Rejection Reasons:**
- Missing or invalid privacy policy
- Unclear permission justifications
- Low-quality screenshots
- Misleading description
- Keyword stuffing in name

⚠️ **Best Practices:**
- Respond to reviews professionally
- Update regularly (shows active maintenance)
- Fix bugs quickly
- Listen to user feedback

## Support Resources

- Chrome Web Store Developer Documentation: https://developer.chrome.com/docs/webstore/
- Developer Program Policies: https://developer.chrome.com/docs/webstore/program-policies/
- Support Forum: https://groups.google.com/a/chromium.org/g/chromium-extensions

---

**Ready to publish?** Go through this checklist carefully and check off each item!
