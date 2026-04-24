$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "Fortuno - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/fortuno" -ErrorAction SilentlyContinue

Write-Host "Fortuno - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../Fortuno/fortuno-app"
git pull
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/fortuno"
Pop-Location

Write-Host "Fortuno - Done!" -ForegroundColor Green
