const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { generateAllFlyersV4 } = require('./generate_flyers_v4');

const ROOT = path.resolve(__dirname, '..');
const DIST_V4_DIR = path.join(ROOT, 'dist_v4');
const WEB_FLYERS_DIR = path.resolve(ROOT, '..', 'web_interactiva_hsl', 'assets', 'flyers');

fs.mkdirSync(DIST_V4_DIR, { recursive: true });
fs.mkdirSync(WEB_FLYERS_DIR, { recursive: true });

const manifest = generateAllFlyersV4();

for (const item of manifest) {
  execFileSync('/usr/bin/google-chrome', [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--window-size=1080,1920',
    `--screenshot=${item.pngPath}`,
    `file://${item.htmlPath}`
  ], { stdio: 'pipe' });

  const stats = fs.statSync(item.pngPath);
  const webDest = path.join(WEB_FLYERS_DIR, item.filename);
  fs.copyFileSync(item.pngPath, webDest);
  console.log(`[OK] Rendered V4 ${item.filename} (${Math.round(stats.size / 1024)} KB) -> dist_v4 & web_interactiva_hsl`);
}

console.log('All 10 V4 flyers rendered and synced successfully.');
