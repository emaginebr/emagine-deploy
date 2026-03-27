$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "ProxyPay - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/proxypay" -ErrorAction SilentlyContinue

Write-Host "ProxyPay - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../ProxyPay/proxypay-react"
git pull
npm run build
Push-Location "example-app"
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/proxypay"
Pop-Location
Pop-Location

Write-Host "ProxyPay - Done!" -ForegroundColor Green
