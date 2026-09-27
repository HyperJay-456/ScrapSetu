@echo off
echo ===================================================
echo Shutting down ScrapSetu Platform...
echo ===================================================
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do (
    echo Stopping process PID: %%a on port 8000...
    taskkill /f /pid %%a >nul 2>&1
)
echo Server stopped successfully.
pause
