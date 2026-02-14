# Snake Game Server Launcher for PowerShell
# Run this script to start a simple HTTP server

Write-Host ""
Write-Host "========================================"
Write-Host "  Snake Game Server Launcher"
Write-Host "========================================"
Write-Host ""

# Try to find and start Python HTTP server
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Found Python: $pythonVersion"
    Write-Host ""
    Write-Host "Starting HTTP server on port 8000..."
    Write-Host ""
    Write-Host "Opening http://localhost:8000"
    Write-Host ""
    Write-Host "Press Ctrl+C to stop the server."
    Write-Host ""
    
    # Open the browser
    Start-Process "http://localhost:8000"
    
    # Start the server
    python -m http.server 8000
} catch {
    Write-Host "Error: Python not found!"
    Write-Host ""
    Write-Host "Please install Python from https://www.python.org/"
    Write-Host ""
    Write-Host "Or use one of the alternative methods in README.md:"
    Write-Host "  - Node.js http-server"
    Write-Host "  - VS Code Live Server extension"
    Write-Host "  - Direct file opening (index.html)"
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
