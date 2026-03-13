$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "Bazzuca Media - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/bazzuca-media" -ErrorAction SilentlyContinue

Write-Host "Bazzuca Media - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../Bazzuca/bazzuca-react/frontend"
git pull
npm install --legacy-peer-deps
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/bazzuca-media"
Pop-Location

Write-Host "Bazzuca Media - Done!" -ForegroundColor Green
