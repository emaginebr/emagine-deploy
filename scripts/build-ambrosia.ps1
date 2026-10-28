$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."
$Frontend = "$Root/../ambrosia/frontend"

# Native commands (git, npm, node) don't stop the script on failure by themselves: check each exit code, so a failed
# pull or build never copies an old dist as if it were new.
function Invoke-Step([string]$Name, [scriptblock]$Command) {
    & $Command
    if ($LASTEXITCODE -ne 0) { throw "Ambrosia - $Name failed (exit code $LASTEXITCODE)" }
}

# The Google Client ID is baked into the bundle at build time. With an empty value the "Entrar com Google" button
# silently disappears, so refuse to build without it: $env:VITE_GOOGLE_CLIENT_ID or frontend/.env.production.local.
$LocalEnv = "$Frontend/.env.production.local"
$HasClientId = $env:VITE_GOOGLE_CLIENT_ID -or
    ((Test-Path $LocalEnv) -and (Select-String -Path $LocalEnv -Pattern '^VITE_GOOGLE_CLIENT_ID=.+' -Quiet))
if (-not $HasClientId) {
    throw "Ambrosia - VITE_GOOGLE_CLIENT_ID not set (env var or $LocalEnv)"
}

Write-Host "Ambrosia - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/ambrosia" -ErrorAction SilentlyContinue

Write-Host "Ambrosia - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Push-Location $Frontend
try {
    Invoke-Step "git pull" { git pull }
    Invoke-Step "npm ci" { npm ci }
    Invoke-Step "npm run build" { npm run build -- --mode production }
    # Same package check the frontend Dockerfile runs (SC-004): no dev-only entry point in the bundle.
    Invoke-Step "verify-prod" { node scripts/verify-prod.mjs }
    Copy-Item -Recurse -Force "dist" "$Root/builds/ambrosia"
}
finally {
    Pop-Location
}

$Entry = Select-String -Path "$Root/builds/ambrosia/index.html" -Pattern 'assets/index-[A-Za-z0-9_-]+\.js' | Select-Object -First 1
Write-Host "Ambrosia - Done! ($($Entry.Matches.Value))" -ForegroundColor Green
