@echo off
cd /d "%~dp0"
if exist .env.local (
  echo .env.local already exists.
  echo Edit it if SMTP_PASS is wrong, then run: npm.cmd run dev
  pause
  exit /b 0
)

(
echo # Local email — do not commit
echo SMTP_HOST=smtp.gmail.com
echo SMTP_PORT=587
echo SMTP_SECURE=false
echo SMTP_USER=marcominvexal@gmail.com
echo SMTP_PASS=PASTE_APP_PASSWORD_HERE
echo SMTP_FROM=marcominvexal@gmail.com
echo CONTACT_TO=marcominvexal@gmail.com
) > .env.local

echo.
echo Created .env.local
echo.
echo 1. Open .env.local in Notepad
echo 2. Replace PASTE_APP_PASSWORD_HERE with your Gmail App Password ^(16 chars, no spaces^)
echo 3. Save the file
echo 4. Run: npm.cmd run dev
echo 5. Test: http://localhost:3000/book-a-demo
echo.
notepad .env.local
pause
