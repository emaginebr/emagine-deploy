$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "NoChainSwap - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/nochainswap" -ErrorAction SilentlyContinue

Write-Host "NoChainSwap - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../NoChainSwap"
git pull
Push-Location "Frontend/nochainswap-app"
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/nochainswap"
Pop-Location

Write-Host "NoChainSwap SSL - Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Copy-Item -Force "SSL/nochainswap.org.chained.crt" "$Root/ssl/"
Copy-Item -Force "SSL/nochainswap.org.key" "$Root/ssl/"
Pop-Location

Write-Host "NoChainSwap - Done!" -ForegroundColor Green
