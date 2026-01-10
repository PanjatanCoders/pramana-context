# PowerShell script to package Pramana Context extension
# Run this from the project root directory

$version = "2.2.2"
$packageName = "pramana-context-v$version.zip"
$tempDir = "package-temp"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Pramana Context Extension Packager" -ForegroundColor Cyan
Write-Host "Version: $version" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Create temporary directory
Write-Host "Creating temporary directory..." -ForegroundColor Yellow
if (Test-Path $tempDir) {
    Remove-Item -Recurse -Force $tempDir
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy required files
Write-Host "Copying extension files..." -ForegroundColor Yellow
$filesToCopy = @(
    "manifest.json",
    "background",
    "popup",
    "search",
    "storage",
    "assets",
    "README.md",
    "LICENSE",
    "PRIVACY_POLICY.md",
    "RELEASE_NOTES.md"
)

foreach ($file in $filesToCopy) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination $tempDir -Recurse -Force
        Write-Host "  ✓ Copied $file" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Skipped $file (not found)" -ForegroundColor Red
    }
}

# Remove existing package if it exists
if (Test-Path $packageName) {
    Write-Host "`nRemoving existing package..." -ForegroundColor Yellow
    Remove-Item -Force $packageName
}

# Create ZIP package
Write-Host "`nCreating ZIP package..." -ForegroundColor Yellow
Compress-Archive -Path "$tempDir\*" -DestinationPath $packageName -Force

# Get file size
$fileSize = (Get-Item $packageName).Length / 1KB
$fileSizeMB = $fileSize / 1024

# Cleanup
Write-Host "Cleaning up temporary files..." -ForegroundColor Yellow
Remove-Item -Recurse -Force $tempDir

# Success message
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✓ Package created successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "File: $packageName" -ForegroundColor Cyan
Write-Host "Size: $([math]::Round($fileSizeMB, 2)) MB ($([math]::Round($fileSize, 2)) KB)" -ForegroundColor Cyan
Write-Host "`nReady to upload to:" -ForegroundColor Yellow
Write-Host "  • Chrome Web Store" -ForegroundColor White
Write-Host "  • Microsoft Edge Add-ons" -ForegroundColor White
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Review PUBLISHING_GUIDE.md" -ForegroundColor White
Write-Host "  2. Capture screenshots (1280x800)" -ForegroundColor White
Write-Host "  3. Upload $packageName to stores" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Green
