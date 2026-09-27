$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "Roll6 - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/roll6" -ErrorAction SilentlyContinue

Write-Host "Roll6 - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../Roll6/frontend"
git pull
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/roll6"
Pop-Location

Write-Host "Roll6 - Done!" -ForegroundColor Green
