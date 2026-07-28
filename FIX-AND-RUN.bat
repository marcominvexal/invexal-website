@echo off
cd /d "%~dp0"
echo Fixing git and starting website...
git fetch origin main
git reset --hard origin/main
git clean -fd
call RUN-WEBSITE.bat
