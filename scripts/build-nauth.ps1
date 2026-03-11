$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "NAuth - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/nauth" -ErrorAction SilentlyContinue

Write-Host "NAuth - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../NAuth/nauth-react"
git pull
Push-Location "example-app"
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/nauth"
Pop-Location
Pop-Location

Write-Host "NAuth - Done!" -ForegroundColor Green
