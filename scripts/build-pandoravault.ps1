$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "PandoraVault - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/pandoravault" -ErrorAction SilentlyContinue

Write-Host "PandoraVault - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../PandoraVault"
git pull
Push-Location "Frontend/pandora-vault-app"
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/pandoravault"
Pop-Location

Write-Host "PandoraVault SSL - Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Copy-Item -Force "SSL/pandoravault.com.chained.crt" "$Root/ssl/"
Copy-Item -Force "SSL/pandoravault.com.key" "$Root/ssl/"
Pop-Location

Write-Host "PandoraVault - Done!" -ForegroundColor Green
