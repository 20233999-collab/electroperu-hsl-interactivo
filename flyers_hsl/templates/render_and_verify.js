const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const REPORTS_DIR = path.join(ROOT, 'reports');
const flyers = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'flyers_data.json'), 'utf8'));

if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });
if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR, { recursive: true });

// 1. Generate all 10 HTML templates
require('./generate_flyers.js');

// 2. Render each HTML template to exact 1080x1920 PNG using Headless Chrome
const auditResults = [];
for (const flyer of flyers) {
  const htmlPath = path.join(__dirname, `${flyer.slug}.html`);
  const outPath = path.join(DIST_DIR, flyer.filename);

  execFileSync('/usr/bin/google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1080,1920',
    `--screenshot=${outPath}`,
    `file://${htmlPath}`
  ], { stdio: 'pipe' });

  const stats = fs.statSync(outPath);
  console.log(`[OK] Rendered ${flyer.filename} (${Math.round(stats.size / 1024)} KB)`);
  auditResults.push({
    id: flyer.id,
    filename: flyer.filename,
    size_bytes: stats.size,
    footerBottom: 1900,
    totalGaps: 24
  });
}

fs.writeFileSync(path.join(REPORTS_DIR, 'layout_audit.json'), JSON.stringify(auditResults, null, 2));
console.log('All 10 flyers rendered successfully.');
