@echo off
echo ========================================================
echo   Deploying Dikesh Kumar's Portfolio to GitHub Pages
echo   Target Domain: https://dikesh9406.github.io
echo ========================================================
echo.
git add -A
git commit -m "Deploy latest portfolio updates" 2>nul
echo Pushing to origin main...
git push -u origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo [SUCCESS] Pushed to GitHub!
    echo Your portfolio will be live shortly at: https://dikesh9406.github.io
) else (
    echo [NOTE] If the push failed with 'repository not found':
    echo Please make sure you created the repository 'dikesh9406.github.io' at:
    echo https://github.com/new
)
echo.
pause
