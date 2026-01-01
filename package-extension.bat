@echo off
setlocal enabledelayedexpansion

REM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REM   Pramana Context - Extension Packaging Script (Windows)
REM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   Pramana Context - Extension Packager
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM Get version from manifest.json
for /f "tokens=2 delims=:, " %%a in ('findstr /C:"\"version\"" manifest.json') do (
    set VERSION=%%a
    set VERSION=!VERSION:"=!
)

set OUTPUT_FILE=pramana-context-v!VERSION!.zip

echo 📦 Creating package: %OUTPUT_FILE%
echo 📌 Version: !VERSION!
echo.

REM Delete existing package if it exists
if exist "%OUTPUT_FILE%" (
    echo ⚠️  File %OUTPUT_FILE% already exists. Deleting...
    del "%OUTPUT_FILE%"
    echo.
)

REM Create a temporary directory for packaging
set TEMP_DIR=pramana-context-temp
if exist "%TEMP_DIR%" rmdir /s /q "%TEMP_DIR%"
mkdir "%TEMP_DIR%"

echo 📁 Copying files to temporary directory...
echo.

REM Copy manifest.json
echo   ✓ Copying: manifest.json
copy manifest.json "%TEMP_DIR%\" >nul

REM Copy directories
echo   ✓ Copying: background\
xcopy /E /I /Q background "%TEMP_DIR%\background\" >nul

echo   ✓ Copying: popup\
xcopy /E /I /Q popup "%TEMP_DIR%\popup\" >nul

echo   ✓ Copying: search\
xcopy /E /I /Q search "%TEMP_DIR%\search\" >nul

echo   ✓ Copying: storage\
xcopy /E /I /Q storage "%TEMP_DIR%\storage\" >nul

echo   ✓ Copying: assets\
xcopy /E /I /Q assets "%TEMP_DIR%\assets\" >nul

echo.
echo 🗜️  Creating ZIP archive...

REM Use PowerShell to create ZIP file
powershell -command "Compress-Archive -Path '%TEMP_DIR%\*' -DestinationPath '%OUTPUT_FILE%' -Force"

REM Clean up temporary directory
rmdir /s /q "%TEMP_DIR%"

REM Check if ZIP was created successfully
if exist "%OUTPUT_FILE%" (
    echo.
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo ✅ Package created successfully!
    echo 📂 Location: %CD%\%OUTPUT_FILE%

    REM Get file size
    for %%A in ("%OUTPUT_FILE%") do set SIZE=%%~zA
    set /a SIZE_KB=!SIZE! / 1024
    echo 📊 Size: !SIZE_KB! KB
    echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    echo.
    echo 🚀 Next Steps:
    echo    1. Test the extension by loading it as unpacked in Chrome
    echo    2. Upload to Chrome Web Store: https://chrome.google.com/webstore/devconsole
    echo    3. Upload to Edge Add-ons: https://partner.microsoft.com/dashboard/microsoftedge
    echo.
) else (
    echo.
    echo ❌ Error: Failed to create package
    echo.
)

pause
