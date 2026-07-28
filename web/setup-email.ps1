# Run once on Windows (PowerShell) from the web folder:
#   cd C:\invexal-website\web
#   powershell -ExecutionPolicy Bypass -File .\setup-email.ps1

$ErrorActionPreference = "Stop"
$envFile = Join-Path $PSScriptRoot ".env.local"

if (Test-Path $envFile) {
  Write-Host ".env.local already exists at $envFile"
  Write-Host "Delete it first if you want to recreate it."
  exit 0
}

Write-Host ""
Write-Host "Invexal — email setup for local dev"
Write-Host "Use a Gmail App Password (NOT your normal Gmail password)."
Write-Host "Create one: Google Account -> Security -> 2-Step Verification -> App passwords"
Write-Host ""

$appPassword = Read-Host "Paste your 16-character Gmail App Password"
$appPassword = ($appPassword -replace '\s', '').Trim()

if ($appPassword.Length -lt 16) {
  Write-Error "App password looks too short. It should be 16 characters."
}

$content = @"
# Created by setup-email.ps1 — do not commit this file
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=marcominvexal@gmail.com
SMTP_PASS=$appPassword
SMTP_FROM=marcominvexal@gmail.com
CONTACT_TO=marcominvexal@gmail.com
"@

Set-Content -Path $envFile -Value $content -Encoding UTF8
Write-Host ""
Write-Host "Created $envFile"
Write-Host "Start the site: npm.cmd run dev"
Write-Host "Then test: http://localhost:3000/book-a-demo"
