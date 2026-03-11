$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "Emagine - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/emagine" -ErrorAction SilentlyContinue

Write-Host "Emagine - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/emagine-site"
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/emagine"
Pop-Location

Write-Host "Emagine - Done!" -ForegroundColor Green
