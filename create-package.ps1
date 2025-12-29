# PowerShell Script to Create Clean Package for Edge Add-ons
# Run this from the pramana-context directory

Write-Host "Creating clean package for Edge Add-ons..." -ForegroundColor Cyan

# Define package directory
$packageDir = "pramana-context-package"
$zipName = "pramana-context-v1.0.0.zip"

# Remove old package if exists
if (Test-Path $packageDir) {
    Write-Host "Removing old package directory..." -ForegroundColor Yellow
    Remove-Item $packageDir -Recurse -Force
}

if (Test-Path $zipName) {
    Write-Host "Removing old ZIP file..." -ForegroundColor Yellow
    Remove-Item $zipName -Force
}

# Create new package directory
Write-Host "Creating package directory..." -ForegroundColor Green
New-Item -ItemType Directory -Path $packageDir | Out-Null

# Define what to include
$items = @(
    "assets",
    "background",
    "popup",
    "search",
    "storage",
    "manifest.json"
)

# Copy files
Write-Host "Copying files..." -ForegroundColor Green
foreach ($item in $items) {
    if (Test-Path $item) {
        Write-Host "  ✓ Copying $item" -ForegroundColor Gray
        Copy-Item -Path $item -Destination $packageDir -Recurse -Force
    } else {
        Write-Host "  ✗ Missing: $item" -ForegroundColor Red
    }
}

# Create ZIP
Write-Host "Creating ZIP file..." -ForegroundColor Green
Compress-Archive -Path "$packageDir\*" -DestinationPath $zipName -Force

# Get file size
$zipSize = (Get-Item $zipName).Length / 1MB
$zipSizeMB = [math]::Round($zipSize, 2)

Write-Host ""
Write-Host "✓ Package created successfully!" -ForegroundColor Green
Write-Host "  File: $zipName" -ForegroundColor Cyan
Write-Host "  Size: $zipSizeMB MB" -ForegroundColor Cyan

if ($zipSizeMB -gt 50) {
    Write-Host ""
    Write-Host "⚠ Warning: Package is larger than expected!" -ForegroundColor Yellow
    Write-Host "  Expected: < 5 MB" -ForegroundColor Yellow
    Write-Host "  Actual: $zipSizeMB MB" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Extract $zipName to verify contents" -ForegroundColor White
Write-Host "2. Load as unpacked extension in Edge to test" -ForegroundColor White
Write-Host "3. Upload $zipName to Edge Add-ons Partner Center" -ForegroundColor White

# Cleanup
Write-Host ""
$cleanup = Read-Host "Remove package directory? (y/n)"
if ($cleanup -eq 'y') {
    Remove-Item $packageDir -Recurse -Force
    Write-Host "✓ Cleaned up package directory" -ForegroundColor Green
}
