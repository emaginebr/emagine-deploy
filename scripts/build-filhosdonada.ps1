$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "Filhos do Nada - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/filhosdonada" -ErrorAction SilentlyContinue

Write-Host "Filhos do Nada - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../filhos-do-nada/web"
git pull
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/filhosdonada"
Pop-Location

Write-Host "Filhos do Nada - Done!" -ForegroundColor Green
