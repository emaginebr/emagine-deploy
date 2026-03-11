$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "MonexUp - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/monexup" -ErrorAction SilentlyContinue

Write-Host "MonexUp - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../MonexUp"
git pull
Push-Location "Frontend/monexup-app"
npm install --legacy-peer-deps
npm run build
Copy-Item -Recurse -Force "build" "$Root/builds/monexup"
Pop-Location

Write-Host "MonexUp SSL - Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Copy-Item -Force "SSL/monexup.com.chained.crt" "$Root/ssl/"
Copy-Item -Force "SSL/monexup.com.key" "$Root/ssl/"
Pop-Location

Write-Host "MonexUp - Done!" -ForegroundColor Green
