# Windows — setup localhost email + dev server
#   cd C:\invexal-website\web
#   powershell -ExecutionPolicy Bypass -File .\START-LOCAL.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "`n=== Invexal local setup ===`n" -ForegroundColor Cyan

if (Get-Command git -ErrorAction SilentlyContinue) {
  Write-Host "Pulling latest code..."
  Push-Location (Split-Path $PSScriptRoot -Parent)
  git pull origin main 2>$null
  Pop-Location
}

$envFile = Join-Path $PSScriptRoot ".env.local"
if (-not (Test-Path $envFile)) {
  Copy-Item (Join-Path $PSScriptRoot ".env.example") $envFile
  Write-Host "Created .env.local — paste Gmail App Password into SMTP_PASS"
  notepad $envFile
}

Write-Host "Installing dependencies..."
npm.cmd install

Write-Host "`nTesting email..."
npm.cmd run email:test
if ($LASTEXITCODE -ne 0) {
  Write-Host "`nFix SMTP_PASS in .env.local (Gmail App Password, 16 chars)`n" -ForegroundColor Yellow
  notepad $envFile
  exit 1
}

Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue |
  ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }

Write-Host "`nhttp://localhost:3000/book-a-demo`n" -ForegroundColor Green
npm.cmd run dev
