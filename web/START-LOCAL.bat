@echo off
cd /d "%~dp0"

echo.
echo === Invexal localhost setup ===
echo.

if not exist .env.local (
  echo Creating .env.local from .env.example...
  copy /Y .env.example .env.local >nul
  echo.
  echo IMPORTANT: Notepad will open. Paste your Gmail App Password into SMTP_PASS.
  echo Save and close Notepad to continue.
  echo.
  notepad .env.local
)

echo Installing packages...
call npm.cmd install

echo.
echo Testing email...
call npm.cmd run email:test
if errorlevel 1 (
  echo.
  echo EMAIL TEST FAILED.
  echo Open .env.local and set SMTP_PASS to your 16-char Gmail App Password.
  notepad .env.local
  pause
  exit /b 1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
  echo Stopping old server on port 3000...
  taskkill /PID %%a /F >nul 2>&1
)

echo.
echo Starting server at http://localhost:3000
echo Test form: http://localhost:3000/book-a-demo
echo.
call npm.cmd run dev
