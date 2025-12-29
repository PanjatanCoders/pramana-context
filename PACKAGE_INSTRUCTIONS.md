# How to Create Clean Package for Edge Add-ons

## The Problem
Your package includes development folders (.git, .claude, .qodo) which causes Edge submission to fail.

## Solution: Create Clean Package

### Option 1: Manual ZIP (Recommended)

1. Create a new folder: `pramana-context-package`
2. Copy ONLY these folders/files into it:
   ```
   assets/
   background/
   popup/
   search/
   storage/
   manifest.json
   PRIVACY_POLICY.md
   ```

3. Right-click the `pramana-context-package` folder
4. Select "Send to" → "Compressed (zipped) folder"
5. Upload this ZIP to Edge Add-ons

### Option 2: Use PowerShell Script

Run this in PowerShell from the project root:

```powershell
# Create clean package directory
$packageDir = "pramana-context-package"
if (Test-Path $packageDir) { Remove-Item $packageDir -Recurse -Force }
New-Item -ItemType Directory -Path $packageDir

# Copy only necessary files
$items = @(
    "assets",
    "background",
    "popup",
    "search",
    "storage",
    "manifest.json",
    "PRIVACY_POLICY.md"
)

foreach ($item in $items) {
    Copy-Item -Path $item -Destination $packageDir -Recurse -Force
}

# Create ZIP
Compress-Archive -Path "$packageDir\*" -DestinationPath "pramana-context-v1.0.0.zip" -Force

Write-Host "Package created: pramana-context-v1.0.0.zip"
```

### What NOT to Include
❌ .git folder
❌ .claude folder
❌ .qodo folder
❌ .gitignore
❌ development-plan.md
❌ README.md
❌ STORE_LISTING.md
❌ PUBLISHING_CHECKLIST.md
❌ node_modules (if any)

### What TO Include
✅ assets/ folder (icons)
✅ background/ folder
✅ popup/ folder
✅ search/ folder
✅ storage/ folder
✅ manifest.json
✅ PRIVACY_POLICY.md (optional but good to have)

## Verify Before Upload

1. Extract your ZIP file to test
2. Load as unpacked extension in Edge
3. Test all functionality
4. If it works, upload to Edge Add-ons

## Common Edge Submission Errors

### "Something went wrong" errors usually mean:
- Package too large (> 100MB)
- Invalid folder structure (.git or other dev files)
- Missing required files
- Corrupt ZIP file

### After Creating Clean Package:
- Package size should be < 5MB
- Only production files included
- Extension works when loaded unpacked

## Next Steps

1. Create the clean package using Option 1 or 2 above
2. Test the package by loading it in Edge
3. Upload to Edge Add-ons Partner Center
4. Wait for review (usually 1-3 days)
