$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."

# Native commands (git, npm) don't stop the script on failure by themselves: check each exit code, so a failed pull or
# build never copies an old dist as if it were new.
function Invoke-Step([string]$Name, [scriptblock]$Command) {
    & $Command
    if ($LASTEXITCODE -ne 0) { throw "Roll6 - $Name failed (exit code $LASTEXITCODE)" }
}

Write-Host "Roll6 - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/roll6" -ErrorAction SilentlyContinue

Write-Host "Roll6 - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location "$Root/../Roll6/frontend"
try {
    Invoke-Step "git pull" { git pull }
    Invoke-Step "npm install" { npm install }
    Invoke-Step "npm run build" { npm run build }
    Copy-Item -Recurse -Force "dist" "$Root/builds/roll6"
}
finally {
    Pop-Location
}

$Entry = Select-String -Path "$Root/builds/roll6/index.html" -Pattern 'assets/index-[A-Za-z0-9_-]+\.js' | Select-Object -First 1
Write-Host "Roll6 - Done! ($($Entry.Matches.Value))" -ForegroundColor Green
