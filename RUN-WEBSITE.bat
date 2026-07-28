@echo off
title Invexal Website - Local
cd /d "%~dp0"

echo.
echo ========================================
echo   INVEXAL - Start website (localhost)
echo ========================================
echo.

echo [1/5] Stopping old Node servers...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo [2/5] Updating code from GitHub (latest)...
git fetch origin main
git reset --hard origin/main
git clean -fd web/node_modules web/.next 2>nul
if errorlevel 1 (
  echo ERROR: git failed. Install Git or check internet.
  pause
  exit /b 1
)
if not exist "web\app\api\contact\route.ts" (
  echo ERROR: web folder not found. Run this from C:\invexal-website
  pause
  exit /b 1
)
findstr /C:"nodemailer" web\app\api\contact\route.ts >nul
if errorlevel 1 (
  echo ERROR: Old code still present. Run: git reset --hard origin/main
  pause
  exit /b 1
)
findstr /C:"FORWARD_EMAIL" web\app\api\contact\route.ts >nul
if errorlevel 1 (
  echo ERROR: Email forward code missing. Run: git fetch origin main ^& git reset --hard origin/main
  pause
  exit /b 1
)

cd web

echo [3/5] Creating .env.local for email...
call npm.cmd run env:write
if errorlevel 1 (
  echo ERROR: could not write .env.local
  pause
  exit /b 1
)

echo [4/5] Installing packages...
call npm.cmd install
if errorlevel 1 (
  echo ERROR: npm install failed
  pause
  exit /b 1
)

echo.
echo [5/5] Testing email to marcominvexal@gmail.com + danish.khan@invexal.com ...
call npm.cmd run email:test
if errorlevel 1 (
  echo.
  echo EMAIL TEST FAILED - check Gmail App Password in web\.env.local
  pause
  exit /b 1
)

echo.
echo ========================================
echo   Website: http://localhost:3000
echo   Form:    http://localhost:3000/book-a-demo
echo ========================================
echo   Leave this window OPEN while testing
echo   After submit, terminal must show: [contact] email sent with both addresses in "to"
echo   Gmail forward setup: see GMAIL-FORWARD-SETUP.txt in repo root
echo ========================================
echo.

call npm.cmd run dev -- -p 3000
