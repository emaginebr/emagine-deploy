$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "DevBlog - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/devblog" -ErrorAction SilentlyContinue

Write-Host "DevBlog - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../devblog"
git pull
npm install --legacy-peer-deps
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/devblog"
Pop-Location

Write-Host "DevBlog - Done!" -ForegroundColor Green
