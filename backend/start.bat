@echo off
echo Starting IntelliGrow Backend Server...
echo.
cd /d %~dp0
call venv\Scripts\activate
python -m uvicorn main:app --reload
