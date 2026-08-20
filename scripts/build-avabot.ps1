$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "AvaBot - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/avabot" -ErrorAction SilentlyContinue

Write-Host "AvaBot - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../AvaBot/frontend"
git pull
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/avabot"
Pop-Location

Write-Host "AvaBot - Done!" -ForegroundColor Green
