@echo off
echo ===================================================
echo Starting ScrapSetu Platform...
echo ===================================================
cd /d "%~dp0"
set PYTHONPATH=%CD%
echo Access URLs once started:
echo   - Interactive Dual Portal: http://127.0.0.1:8000/
echo   - Collector Mobile App:   http://127.0.0.1:8000/collector/
echo   - Recycler Web Dashboard: http://127.0.0.1:8000/recycler/
echo   - Swagger API Docs:       http://127.0.0.1:8000/docs
echo ===================================================
echo Press Ctrl+C at any time to shut down the server.
echo.
python -m uvicorn services.core_api.main:app --host 127.0.0.1 --port 8000 --reload
pause
