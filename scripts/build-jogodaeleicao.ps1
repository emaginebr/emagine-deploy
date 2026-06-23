$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

Write-Host "Jogo da Eleicao - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/jogodaeleicao" -ErrorAction SilentlyContinue

Write-Host "Jogo da Eleicao - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../jogo-da-eleicao/frontend"
git pull
npm install
npm run build
Copy-Item -Recurse -Force "dist" "$Root/builds/jogodaeleicao"
Pop-Location

Write-Host "Jogo da Eleicao - Done!" -ForegroundColor Green
