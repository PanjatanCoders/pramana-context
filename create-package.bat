@echo off
echo Creating clean package for Edge Add-ons...
echo.

REM Define variables
set PACKAGE_DIR=pramana-context-package
set ZIP_NAME=pramana-context-v1.0.0.zip

REM Remove old package if exists
if exist %PACKAGE_DIR% (
    echo Removing old package directory...
    rmdir /s /q %PACKAGE_DIR%
)

if exist %ZIP_NAME% (
    echo Removing old ZIP file...
    del /f %ZIP_NAME%
)

REM Create new package directory
echo Creating package directory...
mkdir %PACKAGE_DIR%

REM Copy necessary folders
echo Copying files...
echo   - assets
xcopy /s /i /q assets %PACKAGE_DIR%\assets

echo   - background
xcopy /s /i /q background %PACKAGE_DIR%\background

echo   - popup
xcopy /s /i /q popup %PACKAGE_DIR%\popup

echo   - search
xcopy /s /i /q search %PACKAGE_DIR%\search

echo   - storage
xcopy /s /i /q storage %PACKAGE_DIR%\storage

echo   - manifest.json
copy /y manifest.json %PACKAGE_DIR%\

echo.
echo Files copied successfully!
echo.
echo Now manually:
echo 1. Right-click the "%PACKAGE_DIR%" folder
echo 2. Select "Send to" -^> "Compressed (zipped) folder"
echo 3. Rename to "%ZIP_NAME%"
echo 4. Upload to Edge Add-ons Partner Center
echo.
pause
