$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "EasySLA - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/easysla-site" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$Root/builds/easysla-app" -ErrorAction SilentlyContinue

Write-Host "EasySLA Site - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../EasySLA"
git pull
Push-Location "Frontend/easysla-site"
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/easysla-site"
Pop-Location

Write-Host "EasySLA App - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "Frontend/easysla-app"
npm install --legacy-peer-deps
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/easysla-app"
Pop-Location

Write-Host "EasySLA SSL - Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Copy-Item -Force "SSL/easysla.com.chained.crt" "$Root/ssl/"
Copy-Item -Force "SSL/easysla.com.key" "$Root/ssl/"
Pop-Location

Write-Host "EasySLA - Done!" -ForegroundColor Green
