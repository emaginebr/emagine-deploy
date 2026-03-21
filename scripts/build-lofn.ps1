$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "Lofn - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/lofn" -ErrorAction SilentlyContinue

Write-Host "Lofn - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../Lofn/lofn-react"
git pull
npm run build
Push-Location "example-app"
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/lofn"
Pop-Location
Pop-Location

Write-Host "Lofn - Done!" -ForegroundColor Green
