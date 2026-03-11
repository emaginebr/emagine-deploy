$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "Bazzuca Media - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/bazzuca-media" -ErrorAction SilentlyContinue

Write-Host "Bazzuca Media - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../BazzucaMedia"
git pull
Push-Location "Frontend/bazzuca-app"
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/bazzuca-media"
Pop-Location

Write-Host "Bazzuca Media SSL - Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Copy-Item -Force "SSL/bazzuca.media.chained.crt" "$Root/ssl/"
Copy-Item -Force "SSL/bazzuca.media.key" "$Root/ssl/"
Pop-Location

Write-Host "Bazzuca Media - Done!" -ForegroundColor Green
