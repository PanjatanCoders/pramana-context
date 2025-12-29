# Chrome Web Store Publishing Checklist

## Pre-Submission Requirements

### ✅ Required Files
- [x] manifest.json (optimized with better name and description)
- [x] Privacy Policy (PRIVACY_POLICY.md)
- [x] Store Listing content (STORE_LISTING.md)
- [ ] Icons (16x16, 48x48, 128x128) - **VERIFY THESE EXIST**
- [ ] Screenshots (1280x800 or 640x400) - **CREATE THESE**
- [ ] Promotional images (440x280 small tile) - **CREATE THIS**
- [ ] Promotional images (920x680 marquee) - **OPTIONAL**
- [ ] Promotional images (1400x560 large tile) - **OPTIONAL**

### 📸 Screenshot Requirements
Create at least 1-5 screenshots showing:
1. **Main popup** - showing the intent input and save functionality
2. **Search interface** - showing the context list with dark theme
3. **Grouped view** - showing domain-based organization
4. **Intent editing** - showing inline edit feature
5. **Filters in action** - showing search/filter/sort

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
- [x] Added author field
- [ ] **UPDATE "author" field with your actual name**

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

### 🧪 Testing Checklist
Test these scenarios before publishing:

- [ ] Fresh install works correctly
- [ ] Auto-save toggle works
- [ ] Manual save with intent works
- [ ] Search functionality works
- [ ] Filters work (status, sort)
- [ ] Group by domain toggle works and persists
- [ ] Edit intent inline works
- [ ] Delete individual items works
- [ ] Bulk delete works
- [ ] Export data works
- [ ] Badge shows abandoned count
- [ ] Time tracking works
- [ ] Works on different websites (HTTP/HTTPS)
- [ ] Error handling for non-web pages
- [ ] No console errors

### 💰 Developer Account
- [ ] Chrome Web Store developer account created ($5 one-time fee)
- [ ] Payment method added (if not already done)

### 📦 Packaging
- [ ] Remove any development files from the package:
  - [ ] Remove `.git` folder
  - [ ] Remove `node_modules` if any
  - [ ] Remove `.gitignore`
  - [ ] Remove development documentation except PRIVACY_POLICY.md
- [ ] Create ZIP file of extension folder
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
- [ ] Share on social media
- [ ] Post on Product Hunt
- [ ] Share on Reddit (r/SideProject, r/Chrome)
- [ ] Share on Hacker News (Show HN)
- [ ] Monitor reviews and ratings
- [ ] Respond to user feedback

### Initial Marketing
- [ ] Create a simple landing page
- [ ] Write a blog post about the extension
- [ ] Share in relevant communities (developer forums, productivity groups)
- [ ] Ask friends/colleagues for honest reviews

## Version Updates

For future updates:
1. Increment version in manifest.json (1.0.0 → 1.0.1)
2. Create ZIP file
3. Upload new version in developer dashboard
4. Add changelog/release notes
5. Submit for review

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
