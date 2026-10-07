$ErrorActionPreference = "Stop"
$root = (Get-Location).Path
if (!(Test-Path "$root\package.json") -or !(Test-Path "$root\src")) { throw "Run this script from the TK Fireworks project root (the folder containing package.json)." }

$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backup = Join-Path $root ".seo-v2-backup-$stamp"
New-Item -ItemType Directory -Path $backup -Force | Out-Null

function Backup-File($relative) {
  $src = Join-Path $root $relative
  if (Test-Path $src) {
    $dst = Join-Path $backup $relative
    New-Item -ItemType Directory -Path (Split-Path $dst) -Force | Out-Null
    Copy-Item $src $dst -Force
  }
}

Backup-File "src\components\SEO.tsx"
Backup-File "src\components\SEOInternalLinks.tsx"
Backup-File "public\robots.txt"
Backup-File "public\sitemap.xml"
Backup-File "index.html"
Backup-File "src\pages\Home.tsx"

# Copy package files from this script's folder.
$packageRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
New-Item -ItemType Directory -Path "$root\src\components" -Force | Out-Null
New-Item -ItemType Directory -Path "$root\public" -Force | Out-Null
Copy-Item "$packageRoot\src\components\SEO.tsx" "$root\src\components\SEO.tsx" -Force
Copy-Item "$packageRoot\src\components\SEOInternalLinks.tsx" "$root\src\components\SEOInternalLinks.tsx" -Force
Copy-Item "$packageRoot\public\robots.txt" "$root\public\robots.txt" -Force
Copy-Item "$packageRoot\public\sitemap.xml" "$root\public\sitemap.xml" -Force

# Strengthen favicon declarations without touching the WhatsApp code/config.
$index = Join-Path $root "index.html"
if (Test-Path $index) {
  $html = Get-Content $index -Raw
  $favicon = @'
<!-- TK Fireworks favicon -->
    <link rel="icon" type="image/png" sizes="48x48" href="/images/logo.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/images/logo.png" />
    <link rel="apple-touch-icon" href="/images/logo.png" />
    <link rel="shortcut icon" href="/images/logo.png" />
'@
  $html = [regex]::Replace($html, '(?m)\s*<link\s+rel="icon"[^>]*>\s*', "`r`n$favicon`r`n", 1)
  if ($html -notmatch 'sizes="48x48"') { $html = $html -replace '<meta name="viewport"', "$favicon`r`n    <meta name=\"viewport\"" }
  Set-Content $index $html -Encoding UTF8
}

# Add crawlable internal links to Home.tsx. Existing navigation/WhatsApp code is left untouched.
$home = Join-Path $root "src\pages\Home.tsx"
if (Test-Path $home) {
  $text = Get-Content $home -Raw
  if ($text -notmatch 'SEOInternalLinks') {
    if ($text -notmatch "import \{ SEOInternalLinks \} from '../components/SEOInternalLinks';") {
      $text = "import { SEOInternalLinks } from '../components/SEOInternalLinks';`r`n" + $text
    }
    $component = "`r`n      <SEOInternalLinks />`r`n"
    $matches = [regex]::Matches($text, '</main>')
    if ($matches.Count -gt 0) {
      $m = $matches[$matches.Count - 1]
      $text = $text.Insert($m.Index, $component)
      Set-Content $home $text -Encoding UTF8
    } else {
      Write-Warning "Home.tsx has no </main>; SEOInternalLinks.tsx was installed but not auto-inserted. Add <SEOInternalLinks /> inside the Home page." 
    }
  }
}

Write-Host "SEO V2 applied." -ForegroundColor Green
Write-Host "Backup: $backup"
Write-Host "WhatsApp/config files were not modified by this script."
Write-Host "Run: npm run build"
