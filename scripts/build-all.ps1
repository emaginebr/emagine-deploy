$ErrorActionPreference = "Stop"
$ScriptDir = $PSScriptRoot

Write-Host "=========================================================" -ForegroundColor Yellow
Write-Host "  Build All Projects" -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Yellow

& "$ScriptDir/build-monexup.ps1"
& "$ScriptDir/build-easysla.ps1"
& "$ScriptDir/build-goblinwars.ps1"
& "$ScriptDir/build-nochainswap.ps1"
& "$ScriptDir/build-pandoravault.ps1"
& "$ScriptDir/build-emagine.ps1"
& "$ScriptDir/build-nauth.ps1"
& "$ScriptDir/build-lofn.ps1"
& "$ScriptDir/build-bazzucamedia.ps1"
& "$ScriptDir/build-devblog.ps1"

Write-Host "=========================================================" -ForegroundColor Green
Write-Host "  All builds completed!" -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Green
