$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "Avachat - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/avachat" -ErrorAction SilentlyContinue

Write-Host "Avachat - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../Avachat/avachat-app"
git pull
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/avachat"
Pop-Location

Write-Host "Avachat - Done!" -ForegroundColor Green
