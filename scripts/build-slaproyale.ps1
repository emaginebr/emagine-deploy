$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "SlapRoyale - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/slaproyale" -ErrorAction SilentlyContinue

Write-Host "SlapRoyale - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../SlapRoyale"
git pull
Push-Location "Frontend/website"
npm install
npm run build
Copy-Item -Recurse -Force "build" "$Root/builds/slaproyale"
Pop-Location

Write-Host "SlapRoyale SSL - Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Copy-Item -Force "SSL/slaproyale.com.chained.crt" "$Root/ssl/"
Copy-Item -Force "SSL/slaproyale.com.key" "$Root/ssl/"
Pop-Location

Write-Host "SlapRoyale - Done!" -ForegroundColor Green
