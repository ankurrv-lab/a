@echo off
echo ========================================
echo Unika Housing Society - Fixed Version
echo ========================================
echo.
echo This version fixes:
echo - Character encoding issues
echo - Metadata loading problems
echo - Font compatibility
echo.

echo Installing required packages...
pip install requests

echo.
echo Running metadata extraction...
python extract_metadata_fixed.py

echo.
echo ========================================
echo Extraction Complete!
echo ========================================
echo.
echo Files created:
dir video_metadata.js 2>nul && echo   - video_metadata.js (main file)
dir data\video_metadata.js 2>nul && echo   - data\video_metadata.js (backup)
dir data\*.json 2>nul && echo   - JSON backup files

echo.
echo The website will now load metadata from either location!
echo Ready to upload to GitHub Pages.
echo.
pause
