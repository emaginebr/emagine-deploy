$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "GoblinWars - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/goblinwars-classic" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "$Root/builds/goblinwars-reborn" -ErrorAction SilentlyContinue

Write-Host "GoblinWars - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../gwr-website"
git pull

Push-Location "gwc-website"
npm install
npm run build
Copy-Item -Recurse -Force "build" "$Root/builds/goblinwars-classic"
Pop-Location

Push-Location "gwr-website"
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/goblinwars-reborn"
Pop-Location

Write-Host "GoblinWars SSL - Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Copy-Item -Force "SSL/goblinwars.net.chained.crt" "$Root/ssl/"
Copy-Item -Force "SSL/goblinwars.net.key" "$Root/ssl/"
Pop-Location

Write-Host "GoblinWars - Done!" -ForegroundColor Green
