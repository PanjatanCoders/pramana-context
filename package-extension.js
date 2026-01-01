#!/usr/bin/env node

/**
 * Pramana Context - Extension Packaging Script
 *
 * This script packages the extension for submission to Chrome Web Store and Edge Add-ons.
 * It creates a clean ZIP file containing only the necessary files.
 *
 * Usage: node package-extension.js
 */

const fs = require('fs');
const path = require('path');
const { createWriteStream } = require('fs');
const archiver = require('archiver');

// Files and directories to include in the package
const INCLUDE_PATTERNS = [
    'manifest.json',
    'background/**/*',
    'popup/**/*',
    'search/**/*',
    'storage/**/*',
    'assets/**/*'
];

// Files and directories to exclude
const EXCLUDE_PATTERNS = [
    'node_modules',
    'pramana-context-package',
    '.git',
    '.gitignore',
    'README.md',
    'PRIVACY_POLICY.md',
    'STORE_LISTING.md',
    'PUBLISHING_CHECKLIST.md',
    'LICENSE',
    'package-extension.js',
    'package-extension.bat',
    'package.json',
    'package-lock.json',
    '*.zip',
    '.DS_Store',
    'Thumbs.db'
];

// Get version from manifest.json
function getVersion() {
    const manifestPath = path.join(__dirname, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return manifest.version;
}

// Check if file should be excluded
function shouldExclude(filePath) {
    const relativePath = path.relative(__dirname, filePath);

    // Check against exclude patterns
    for (const pattern of EXCLUDE_PATTERNS) {
        if (relativePath.includes(pattern)) {
            return true;
        }
    }

    return false;
}

// Recursively add files to archive
function addFilesToArchive(archive, dir, baseDir = '') {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.join(baseDir, file);

        if (shouldExclude(filePath)) {
            console.log(`  ⊗ Excluding: ${relativePath}`);
            return;
        }

        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            addFilesToArchive(archive, filePath, relativePath);
        } else {
            console.log(`  ✓ Adding: ${relativePath}`);
            archive.file(filePath, { name: relativePath });
        }
    });
}

// Main packaging function
async function packageExtension() {
    const version = getVersion();
    const outputFileName = `pramana-context-v${version}.zip`;
    const outputPath = path.join(__dirname, outputFileName);

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Pramana Context - Extension Packager');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`📦 Creating package: ${outputFileName}`);
    console.log(`📌 Version: ${version}\n`);

    // Check if output file already exists
    if (fs.existsSync(outputPath)) {
        console.log(`⚠️  File ${outputFileName} already exists. Deleting...\n`);
        fs.unlinkSync(outputPath);
    }

    // Create output stream
    const output = createWriteStream(outputPath);
    const archive = archiver('zip', {
        zlib: { level: 9 } // Maximum compression
    });

    // Handle stream events
    output.on('close', () => {
        const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ Package created successfully!`);
        console.log(`📊 Total size: ${sizeInMB} MB`);
        console.log(`📂 Location: ${outputPath}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('🚀 Next Steps:');
        console.log('   1. Test the extension by loading it as unpacked in Chrome');
        console.log('   2. Upload to Chrome Web Store: https://chrome.google.com/webstore/devconsole');
        console.log('   3. Upload to Edge Add-ons: https://partner.microsoft.com/dashboard/microsoftedge\n');
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
            console.warn('⚠️  Warning:', err);
        } else {
            throw err;
        }
    });

    // Pipe archive data to the output file
    archive.pipe(output);

    console.log('📁 Adding files to package:\n');

    // Add files from included directories
    const includeDirs = ['background', 'popup', 'search', 'storage', 'assets'];

    // Add manifest.json
    if (fs.existsSync(path.join(__dirname, 'manifest.json'))) {
        console.log('  ✓ Adding: manifest.json');
        archive.file(path.join(__dirname, 'manifest.json'), { name: 'manifest.json' });
    }

    // Add directories
    includeDirs.forEach(dir => {
        const dirPath = path.join(__dirname, dir);
        if (fs.existsSync(dirPath)) {
            addFilesToArchive(archive, dirPath, dir);
        }
    });

    // Finalize the archive
    await archive.finalize();
}

// Run the packager
packageExtension().catch(err => {
    console.error('\n❌ Error creating package:', err);
    process.exit(1);
});
