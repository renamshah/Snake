@echo off
REM Snake Game Server Launcher for Windows
REM This script starts a simple HTTP server to run the Snake game

echo.
echo ========================================
echo   Snake Game Server Launcher
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Found Python! Starting HTTP server...
    echo.
    echo Opening http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server.
    echo.
    start http://localhost:8000
    python -m http.server 8000
) else (
    echo Error: Python not found!
    echo.
    echo Please install Python from https://www.python.org/
    echo Or use one of the alternative methods in README.md:
    echo   - Node.js http-server
    echo   - VS Code Live Server extension
    echo   - Direct file opening (index.html)
    echo.
    pause
)
