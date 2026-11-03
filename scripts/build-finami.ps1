$ErrorActionPreference = "Stop"
$Root = Resolve-Path "$PSScriptRoot/.."
$Frontend = "$Root/../finami/frontend"

# Native commands (git, npm, node) don't stop the script on failure by themselves: check each exit code, so a failed
# pull or build never copies an old dist as if it were new.
function Invoke-Step([string]$Name, [scriptblock]$Command) {
    & $Command
    if ($LASTEXITCODE -ne 0) { throw "Finami - $Name failed (exit code $LASTEXITCODE)" }
}

# The Google Client ID is baked into the bundle at build time ($env:VITE_GOOGLE_CLIENT_ID or
# frontend/.env.production.local). It is optional: without it the "Entrar com Google" button is hidden.
# It must be the OAuth Client ID (*.apps.googleusercontent.com), never the Client Secret (GOCSPX-...).
$LocalEnv = "$Frontend/.env.production.local"
$ClientId = $env:VITE_GOOGLE_CLIENT_ID
if (-not $ClientId -and (Test-Path $LocalEnv)) {
    $Line = Select-String -Path $LocalEnv -Pattern '^VITE_GOOGLE_CLIENT_ID=(.+)$' | Select-Object -First 1
    if ($Line) { $ClientId = $Line.Matches[0].Groups[1].Value.Trim() }
}
if ($ClientId -like "GOCSPX-*") {
    throw "Finami - VITE_GOOGLE_CLIENT_ID is a Client Secret (GOCSPX-...), not a Client ID"
}
if (-not $ClientId) {
    Write-Warning "Finami - VITE_GOOGLE_CLIENT_ID not set: the Google sign-in button will be hidden"
}

Write-Host "Finami - Clean" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

Remove-Item -Recurse -Force "$Root/builds/finami" -ErrorAction SilentlyContinue

Write-Host "Finami - Build and Copy" -ForegroundColor Cyan
Write-Host "----------------------------------------------------------"

# App and API share the origin (https://finami.site): empty VITE_API_URL = same origin, and nginx.conf proxies
# /api, /mcp, /oauth and /.well-known/oauth-* to the finami-api container.
$Saved = @{
    VITE_API_URL          = $env:VITE_API_URL
    VITE_SITE_BASENAME    = $env:VITE_SITE_BASENAME
    VITE_GOOGLE_CLIENT_ID = $env:VITE_GOOGLE_CLIENT_ID
}
Push-Location $Frontend
try {
    $env:VITE_API_URL = ""
    $env:VITE_SITE_BASENAME = ""
    if ($ClientId) { $env:VITE_GOOGLE_CLIENT_ID = $ClientId }

    Invoke-Step "git pull" { git pull }
    Invoke-Step "npm ci" { npm ci }
    Invoke-Step "npm run build" { npm run build }
    # PWA check (service worker, manifest and shortcuts present in dist/)
    Invoke-Step "check:pwa" { npm run check:pwa }
    Copy-Item -Recurse -Force "dist" "$Root/builds/finami"
}
finally {
    Pop-Location
    foreach ($Name in $Saved.Keys) {
        if ($null -eq $Saved[$Name]) { Remove-Item "env:$Name" -ErrorAction SilentlyContinue }
        else { Set-Item "env:$Name" $Saved[$Name] }
    }
}

$Entry = Select-String -Path "$Root/builds/finami/index.html" -Pattern 'assets/index-[A-Za-z0-9_-]+\.js' | Select-Object -First 1
Write-Host "Finami - Done! ($($Entry.Matches.Value))" -ForegroundColor Green
