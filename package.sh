#!/bin/bash
# Bash script to package Pramana Context extension
# Run this from the project root directory

VERSION="2.2.2"
PACKAGE_NAME="pramana-context-v${VERSION}.zip"
TEMP_DIR="package-temp"

echo "========================================"
echo "Pramana Context Extension Packager"
echo "Version: $VERSION"
echo "========================================"
echo ""

# Create temporary directory
echo "Creating temporary directory..."
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Copy required files
echo "Copying extension files..."
FILES_TO_COPY=(
    "manifest.json"
    "background"
    "popup"
    "search"
    "storage"
    "assets"
    "README.md"
    "LICENSE"
    "PRIVACY_POLICY.md"
    "RELEASE_NOTES.md"
)

for file in "${FILES_TO_COPY[@]}"; do
    if [ -e "$file" ]; then
        cp -r "$file" "$TEMP_DIR/"
        echo "  ✓ Copied $file"
    else
        echo "  ✗ Skipped $file (not found)"
    fi
done

# Remove existing package if it exists
if [ -f "$PACKAGE_NAME" ]; then
    echo ""
    echo "Removing existing package..."
    rm -f "$PACKAGE_NAME"
fi

# Create ZIP package
echo ""
echo "Creating ZIP package..."
cd "$TEMP_DIR"
zip -r "../$PACKAGE_NAME" . -x "*.git*" "*.DS_Store" > /dev/null
cd ..

# Get file size
FILE_SIZE=$(du -h "$PACKAGE_NAME" | cut -f1)

# Cleanup
echo "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

# Success message
echo ""
echo "========================================"
echo "✓ Package created successfully!"
echo "========================================"
echo "File: $PACKAGE_NAME"
echo "Size: $FILE_SIZE"
echo ""
echo "Ready to upload to:"
echo "  • Chrome Web Store"
echo "  • Microsoft Edge Add-ons"
echo ""
echo "Next steps:"
echo "  1. Review PUBLISHING_GUIDE.md"
echo "  2. Capture screenshots (1280x800)"
echo "  3. Upload $PACKAGE_NAME to stores"
echo "========================================"
echo ""
