#!/bin/bash

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#   Pramana Context - Extension Packaging Script (Linux/Mac)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Pramana Context - Extension Packager"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get version from manifest.json
VERSION=$(grep -o '"version": *"[^"]*"' manifest.json | grep -o '"[0-9.]*"' | tr -d '"')
OUTPUT_FILE="pramana-context-v${VERSION}.zip"

echo "📦 Creating package: ${OUTPUT_FILE}"
echo "📌 Version: ${VERSION}"
echo ""

# Delete existing package if it exists
if [ -f "${OUTPUT_FILE}" ]; then
    echo "⚠️  File ${OUTPUT_FILE} already exists. Deleting..."
    rm "${OUTPUT_FILE}"
    echo ""
fi

echo "📁 Creating ZIP archive..."
echo ""

# Create ZIP file with only necessary files
zip -r "${OUTPUT_FILE}" \
    manifest.json \
    background/ \
    popup/ \
    search/ \
    storage/ \
    assets/ \
    -x "*.DS_Store" "*/.*" \
    > /dev/null 2>&1

# Check if ZIP was created successfully
if [ -f "${OUTPUT_FILE}" ]; then
    SIZE=$(ls -lh "${OUTPUT_FILE}" | awk '{print $5}')
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "✅ Package created successfully!"
    echo "📂 Location: $(pwd)/${OUTPUT_FILE}"
    echo "📊 Size: ${SIZE}"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🚀 Next Steps:"
    echo "   1. Test the extension by loading it as unpacked in Chrome"
    echo "   2. Upload to Chrome Web Store: https://chrome.google.com/webstore/devconsole"
    echo "   3. Upload to Edge Add-ons: https://partner.microsoft.com/dashboard/microsoftedge"
    echo ""
else
    echo ""
    echo "❌ Error: Failed to create package"
    echo ""
    exit 1
fi
