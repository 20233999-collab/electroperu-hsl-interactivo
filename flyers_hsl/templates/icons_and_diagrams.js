// Version 3.0: High-Clarity Duotone Vector Illustrations & ISO QR Matrices for ELECTROPERU S.A.
// Official Brand Manual Palette (Págs. 14, 16-17, 30):
// Azul Corporativo PANTONE 286 PC: #00559F | Celeste Corporativo PANTONE 298 PC: #34B4E4
// Azul Marino Profundo PANTONE P 108-8C: #003F70 | Azul Medio PANTONE P 104-7C: #2D6CB5
// Azul Acero Claro PANTONE P 108-8C: #76A4D7 | Azul Hielo Suave PANTONE P 109-2C: #C4DAF1
// Gris Corporativo COOL GRAY 10PC: #868689 | Negro Corporativo: #1A171B
// Semantic Accents: Amber #FFC000 / #B45309 | Red #DC2626 | Emerald #0D9488

const fs = require('fs');
const path = require('path');
const qrMatrices = JSON.parse(fs.readFileSync(path.join(__dirname, 'qr_matrices.json'), 'utf8'));

function renderQrSvg(url, size = 118, primaryColor = '#003F70', accentColor = '#00559F') {
  let matrix = qrMatrices.aliada;
  if (url && url.includes('electroperu')) {
    matrix = qrMatrices.electroperu;
  } else if (url && (url.includes('mimp') || url.includes('normas-legales') || url.includes('285411'))) {
    matrix = qrMatrices.ley27942 || qrMatrices.ley;
  }
  const N = matrix.length;
  const S = 10; // Scale factor so all SVG coordinate units are >= 18
  const Q = 3;  // 3-module clean white quiet zone on all sides
  let rects = '';
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const inTL = r < 7 && c < 7;
      const inTR = r < 7 && c >= N - 7;
      const inBL = r >= N - 7 && c < 7;
      if (inTL || inTR || inBL) continue;
      if (matrix[r][c] === 1) {
        rects += `<rect x="${(c + Q) * S}" y="${(r + Q) * S}" width="10.2" height="10.2" fill="${primaryColor}"/>`;
      }
    }
  }

  const finderSvg = (x, y) => `
    <rect x="${(x + 0.5) * S}" y="${(y + 0.5) * S}" width="60" height="60" fill="none" stroke="${primaryColor}" stroke-width="10"/>
    <rect x="${(x + 2) * S}" y="${(y + 2) * S}" width="30" height="30" fill="${accentColor}"/>
  `;

  const total = (N + Q * 2) * S;

  return `<svg viewBox="0 0 ${total} ${total}" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
    <rect x="0" y="0" width="${total}" height="${total}" rx="24" fill="#FFFFFF"/>
    ${finderSvg(Q, Q)}
    ${finderSvg(Q + N - 7, Q)}
    ${finderSvg(Q, Q + N - 7)}
    ${rects}
  </svg>`;
}

function getCardIconSvg(concept, size = 88) {
  const icons = {
    hand_stop_shield: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <path d="M32 6L54 15V31C54 45.5 44.4 55.4 32 59C19.6 55.4 10 45.5 10 31V15L32 6Z" fill="#FFFFFF" stroke="#003F70" stroke-width="2.6"/>
        <path d="M32 10L50 17.5V30.8C50 42.6 42.1 50.9 32 54C21.9 50.9 14 42.6 14 30.8V17.5L32 10Z" fill="#34B4E4" fill-opacity="0.32"/>
        <path d="M25 35V22.5C25 21.1 26.1 20 27.5 20C28.9 20 30 21.1 30 22.5V29M30 29V19.5C30 18.1 31.1 17 32.5 17C33.9 17 35 18.1 35 19.5V29M35 29V21.5C35 20.1 36.1 19 37.5 19C38.9 19 40 20.1 40 21.5V36.5C40 42.3 35.5 46 30.5 46C25.3 46 22.2 42.6 20.3 38.2L18.5 34C17.9 32.7 18.5 31.1 19.8 30.5C21.1 29.9 22.6 30.5 23.2 31.8L25 35Z" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="48" cy="16" r="8.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="2.2"/>
        <path d="M45 13L51 19M51 13L45 19" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>
      </svg>`,
    alert_speech_bubble: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <rect x="8" y="10" width="44" height="34" rx="8" fill="#FFFFFF" stroke="#003F70" stroke-width="2.6"/>
        <path d="M18 44L14 55L26 44H18Z" fill="#34B4E4" stroke="#003F70" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="M16 21H38M16 29H30" stroke="#00559F" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="46" cy="40" r="13" fill="#FFC000" stroke="#003F70" stroke-width="2.6"/>
        <path d="M46 33V41" stroke="#003F70" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="46" cy="46" r="2" fill="#003F70"/>
      </svg>`,
    workplace_warning: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <rect x="10" y="13" width="34" height="43" rx="4" fill="#FFFFFF" stroke="#003F70" stroke-width="2.6"/>
        <rect x="16" y="19" width="8" height="6" rx="1.2" fill="#00559F"/>
        <rect x="28" y="19" width="8" height="6" rx="1.2" fill="#34B4E4"/>
        <rect x="16" y="29" width="8" height="6" rx="1.2" fill="#34B4E4"/>
        <rect x="28" y="29" width="8" height="6" rx="1.2" fill="#00559F"/>
        <rect x="22" y="42" width="10" height="14" fill="#003F70"/>
        <path d="M45 24L58 48H32L45 24Z" fill="#FFC000" stroke="#003F70" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="M45 33V40" stroke="#003F70" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="45" cy="44" r="1.7" fill="#003F70"/>
      </svg>`,
    gavel_scale: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <path d="M32 12V50M20 50H44" stroke="#003F70" stroke-width="3" stroke-linecap="round"/>
        <path d="M14 22H50" stroke="#00559F" stroke-width="3" stroke-linecap="round"/>
        <path d="M16 22L10 36H22L16 22Z" fill="#34B4E4" stroke="#003F70" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M48 22L42 36H54L48 22Z" fill="#FFC000" stroke="#003F70" stroke-width="2.2" stroke-linejoin="round"/>
        <circle cx="32" cy="12" r="4.5" fill="#00559F" stroke="#003F70" stroke-width="2.2"/>
      </svg>`,
    warning_contract_lock: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5"/>
        <rect x="12" y="8" width="32" height="44" rx="4" fill="#FFFFFF" stroke="#003F70" stroke-width="2.6"/>
        <path d="M18 18H36M18 25H36M18 32H28" stroke="#00559F" stroke-width="2.6" stroke-linecap="round"/>
        <rect x="34" y="32" width="20" height="18" rx="4" fill="#DC2626" stroke="#003F70" stroke-width="2.5"/>
        <path d="M39 32V27C39 24.2 41.2 22 44 22C46.8 22 49 24.2 49 27V32" stroke="#003F70" stroke-width="2.6" stroke-linecap="round"/>
        <circle cx="44" cy="41" r="2.4" fill="#FFFFFF"/>
      </svg>`,
    megaphone_prohibited: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="26" fill="#FEF2F2" stroke="#DC2626" stroke-width="2.8"/>
        <path d="M18 28H26L38 19V43L26 34H18V28Z" fill="#00559F" stroke="#003F70" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M21 34L23 44H27L25 34" fill="#FFC000" stroke="#003F70" stroke-width="2.2"/>
        <path d="M43 25C45.5 27.5 45.5 34.5 43 37" stroke="#003F70" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M14 14L50 50" stroke="#DC2626" stroke-width="3.6" stroke-linecap="round"/>
      </svg>`,
    personal_space_barrier: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="26" fill="#FEF2F2" stroke="#DC2626" stroke-width="2.6" stroke-dasharray="5 3"/>
        <circle cx="32" cy="22" r="6.5" fill="#00559F" stroke="#003F70" stroke-width="2.4"/>
        <path d="M20 45C20 38.5 25.4 33.5 32 33.5C38.6 33.5 44 38.5 44 45" fill="#34B4E4" stroke="#003F70" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M11 32H18M46 32H53" stroke="#DC2626" stroke-width="3.2" stroke-linecap="round"/>
      </svg>`,
    smartphone_alert: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FEF2F2" stroke="#FECACA" stroke-width="1.5"/>
        <rect x="16" y="8" width="26" height="48" rx="5" fill="#FFFFFF" stroke="#003F70" stroke-width="2.6"/>
        <rect x="20" y="14" width="18" height="32" rx="2" fill="#EBF3FA" stroke="#00559F" stroke-width="2"/>
        <circle cx="29" cy="51" r="2.2" fill="#003F70"/>
        <rect x="32" y="18" width="22" height="16" rx="4" fill="#DC2626" stroke="#003F70" stroke-width="2.4"/>
        <path d="M43 22V27" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>
        <circle cx="43" cy="30.5" r="1.5" fill="#FFFFFF"/>
      </svg>`,
    hierarchy_down_arrow: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FEF2F2" stroke="#FECACA" stroke-width="1.5"/>
        <rect x="16" y="8" width="32" height="15" rx="4" fill="#003F70"/>
        <circle cx="24" cy="15.5" r="3.2" fill="#FFC000"/>
        <path d="M31 15.5H41" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M32 24V39M32 39L25 32M32 39L39 32" stroke="#DC2626" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="14" y="42" width="36" height="14" rx="4" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <circle cx="22" cy="49" r="3.2" fill="#00559F"/>
        <path d="M29 49H42" stroke="#003F70" stroke-width="2.4" stroke-linecap="round"/>
      </svg>`,
    horizontal_arrows_users: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <circle cx="16" cy="24" r="6" fill="#00559F" stroke="#003F70" stroke-width="2.3"/>
        <path d="M8 45C8 39.5 11.5 35.5 16 35.5C20.5 35.5 24 39.5 24 45" fill="#34B4E4" stroke="#003F70" stroke-width="2.3"/>
        <circle cx="48" cy="24" r="6" fill="#00559F" stroke="#003F70" stroke-width="2.3"/>
        <path d="M40 45C40 39.5 43.5 35.5 48 35.5C52.5 35.5 56 39.5 56 45" fill="#34B4E4" stroke="#003F70" stroke-width="2.3"/>
        <path d="M25 28H39M25 28L29 24M25 28L29 32M39 28L35 24M39 28L35 32" stroke="#FFC000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    network_shield_nodes: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5"/>
        <circle cx="32" cy="32" r="22" stroke="#0D9488" stroke-width="2.2" stroke-dasharray="4 3"/>
        <path d="M32 17L45 22.5V33C45 41.5 39.4 47.4 32 49.8C24.6 47.4 19 41.5 19 33V22.5L32 17Z" fill="#00559F" stroke="#003F70" stroke-width="2.4"/>
        <path d="M27 33L30.5 36.5L37.5 29.5" stroke="#FFC000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="32" cy="9" r="4.2" fill="#FFC000" stroke="#003F70" stroke-width="2"/>
        <circle cx="54" cy="32" r="4.2" fill="#34B4E4" stroke="#003F70" stroke-width="2"/>
        <circle cx="10" cy="32" r="4.2" fill="#34B4E4" stroke="#003F70" stroke-width="2"/>
        <circle cx="32" cy="55" r="4.2" fill="#0D9488" stroke="#003F70" stroke-width="2"/>
      </svg>`,
    graduation_shield: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <path d="M32 11L56 22L32 33L8 22L32 11Z" fill="#003F70" stroke="#003F70" stroke-width="2.4" stroke-linejoin="round"/>
        <path d="M18 27V39.5C18 44.5 24.3 48.5 32 48.5C39.7 48.5 46 44.5 46 39.5V27" fill="#34B4E4" fill-opacity="0.38" stroke="#003F70" stroke-width="2.5"/>
        <path d="M52 24V39" stroke="#FFC000" stroke-width="3.2" stroke-linecap="round"/>
        <circle cx="52" cy="41" r="3.2" fill="#FFC000"/>
      </svg>`,
    building_pillars_check: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <path d="M32 8L54 20H10L32 8Z" fill="#00559F" stroke="#003F70" stroke-width="2.5" stroke-linejoin="round"/>
        <rect x="14" y="20" width="6.5" height="26" fill="#FFFFFF" stroke="#003F70" stroke-width="2.2"/>
        <rect x="28.75" y="20" width="6.5" height="26" fill="#FFFFFF" stroke="#003F70" stroke-width="2.2"/>
        <rect x="43.5" y="20" width="6.5" height="26" fill="#FFFFFF" stroke="#003F70" stroke-width="2.2"/>
        <rect x="10" y="46" width="44" height="6" rx="2" fill="#003F70"/>
        <circle cx="48" cy="44" r="9.5" fill="#0D9488" stroke="#FFFFFF" stroke-width="2.2"/>
        <path d="M44 44L47 47L53 41" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    justice_balance_clock: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <circle cx="28" cy="33" r="18" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <path d="M28 22V33L35 37" stroke="#00559F" stroke-width="3" stroke-linecap="round"/>
        <path d="M46 13L56 17V26.5C56 33.8 51.6 39 46 41C40.4 39 36 33.8 36 26.5V17L46 13Z" fill="#FFC000" stroke="#003F70" stroke-width="2.4"/>
        <path d="M42 26.5L45 29.5L51 23.5" stroke="#003F70" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    clipboard_verified_cloud: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5"/>
        <rect x="12" y="12" width="32" height="42" rx="4" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <rect x="21" y="8" width="14" height="8" rx="2" fill="#00559F" stroke="#003F70" stroke-width="2.2"/>
        <path d="M19 26H35M19 33H31M19 40H27" stroke="#003F70" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="44" cy="42" r="11.5" fill="#0D9488" stroke="#003F70" stroke-width="2.4"/>
        <path d="M39 42L42.5 45.5L49.5 38.5" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    lock_privacy_user: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5"/>
        <path d="M32 6L52 14V30C52 43.5 43.2 53 32 57C20.8 53 12 43.5 12 30V14L32 6Z" fill="#FFFFFF" stroke="#0D9488" stroke-width="2.6"/>
        <rect x="22" y="28" width="20" height="16" rx="3.5" fill="#003F70"/>
        <path d="M26 28V23C26 19.7 28.7 17 32 17C35.3 17 38 19.7 38 23V28" stroke="#003F70" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="32" cy="35" r="2.4" fill="#34B4E4"/>
        <path d="M32 37V40.5" stroke="#34B4E4" stroke-width="2.4" stroke-linecap="round"/>
      </svg>`,
    umbrella_protection_check: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <path d="M10 32C10 19.8 19.8 10 32 10C44.2 10 54 19.8 54 32H10Z" fill="#00559F" stroke="#003F70" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M32 32V48C32 51.3 29.3 54 26 54C23.2 54 21 51.8 21 49" stroke="#003F70" stroke-width="3" stroke-linecap="round"/>
        <circle cx="46" cy="44" r="9.5" fill="#0D9488" stroke="#FFFFFF" stroke-width="2.2"/>
        <path d="M42 44L45 47L50.5 41.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    heart_care_cross: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5"/>
        <path d="M32 52C32 52 10 38.6 10 23.5C10 16.6 15.4 11 22 11C26.2 11 29.9 13.2 32 16.5C34.1 13.2 37.8 11 42 11C48.6 11 54 16.6 54 23.5C54 38.6 32 52 32 52Z" fill="#FFFFFF" stroke="#003F70" stroke-width="2.6" stroke-linejoin="round"/>
        <path d="M32 22V36M25 29H39" stroke="#0D9488" stroke-width="4.2" stroke-linecap="round"/>
      </svg>`,
    user_respect_star: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <circle cx="28" cy="22" r="8" fill="#34B4E4" stroke="#003F70" stroke-width="2.5"/>
        <path d="M14 48C14 40.3 20.3 34 28 34C35.7 34 42 40.3 42 48" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M47 14L49.8 20L56.4 20.8L51.5 25.3L52.8 31.8L47 28.5L41.2 31.8L42.5 25.3L37.6 20.8L44.2 20L47 14Z" fill="#FFC000" stroke="#003F70" stroke-width="2.2" stroke-linejoin="round"/>
      </svg>`,
    people_balance_group: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <rect x="8" y="38" width="48" height="6" rx="3" fill="#003F70"/>
        <path d="M32 38V52M22 52H42" stroke="#003F70" stroke-width="3" stroke-linecap="round"/>
        <circle cx="18" cy="20" r="5.5" fill="#00559F" stroke="#003F70" stroke-width="2.2"/>
        <path d="M10.5 35C10.5 30.8 13.8 27.5 18 27.5C22.2 27.5 25.5 30.8 25.5 35" fill="#34B4E4" stroke="#003F70" stroke-width="2.2"/>
        <circle cx="46" cy="20" r="5.5" fill="#FFC000" stroke="#003F70" stroke-width="2.2"/>
        <path d="M38.5 35C38.5 30.8 41.8 27.5 46 27.5C50.2 27.5 53.5 30.8 53.5 35" fill="#FFFFFF" stroke="#003F70" stroke-width="2.2"/>
      </svg>`,
    magnifying_glass_document: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <rect x="12" y="10" width="30" height="40" rx="4" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <path d="M18 20H34M18 27H30M18 34H26" stroke="#00559F" stroke-width="2.6" stroke-linecap="round"/>
        <circle cx="40" cy="38" r="10.5" fill="#FFFFFF" stroke="#003F70" stroke-width="2.6"/>
        <circle cx="40" cy="38" r="6.5" fill="#34B4E4" fill-opacity="0.4"/>
        <path d="M47.5 45.5L55 53" stroke="#003F70" stroke-width="3.6" stroke-linecap="round"/>
      </svg>`,
    file_check_timer: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <rect x="10" y="10" width="30" height="40" rx="4" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <path d="M17 22L22 27L32 17" stroke="#0D9488" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="44" cy="40" r="12" fill="#FFC000" stroke="#003F70" stroke-width="2.5"/>
        <path d="M44 33V40L49 43" stroke="#003F70" stroke-width="2.6" stroke-linecap="round"/>
      </svg>`,
    compass_support_hands: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <circle cx="32" cy="32" r="22" fill="#FFFFFF" stroke="#003F70" stroke-width="2.6"/>
        <polygon points="32,14 39,32 32,29 25,32" fill="#34B4E4"/>
        <polygon points="32,50 39,32 32,35 25,32" fill="#003F70"/>
        <circle cx="32" cy="32" r="4" fill="#FFC000" stroke="#003F70" stroke-width="1.8"/>
      </svg>`,
    inbox_document_send: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <rect x="10" y="28" width="44" height="24" rx="4" fill="#003F70"/>
        <path d="M10 34H23C23 37.9 27 41 32 41C37 41 41 37.9 41 34H54" stroke="#34B4E4" stroke-width="2.5"/>
        <rect x="18" y="10" width="28" height="22" rx="3" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <path d="M32 15V26M32 15L27 20M32 15L37 20" stroke="#00559F" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    shield_fast_clock: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5"/>
        <path d="M28 8L48 16V30C48 42.5 39.8 51.5 28 55C16.2 51.5 8 42.5 8 30V16L28 8Z" fill="#00559F" stroke="#003F70" stroke-width="2.5"/>
        <circle cx="44" cy="40" r="12.5" fill="#FFC000" stroke="#003F70" stroke-width="2.5"/>
        <path d="M44 33V40L49 43" stroke="#003F70" stroke-width="2.8" stroke-linecap="round"/>
      </svg>`,
    search_folder_scales: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <path d="M10 18C10 15.8 11.8 14 14 14H26L31 20H50C52.2 20 54 21.8 54 24V46C54 48.2 52.2 50 50 50H14C11.8 50 10 48.2 10 46V18Z" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <circle cx="34" cy="34" r="9.5" fill="#EBF3FA" stroke="#00559F" stroke-width="2.6"/>
        <path d="M41 41L48 48" stroke="#003F70" stroke-width="3.2" stroke-linecap="round"/>
      </svg>`,
    stamp_resolution_check: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5"/>
        <rect x="14" y="42" width="36" height="8" rx="3" fill="#003F70"/>
        <path d="M18 52H46" stroke="#0D9488" stroke-width="3.6" stroke-linecap="round"/>
        <path d="M26 42L28 26C25 24 24 20 26 16C28 12 36 12 38 16C40 20 39 24 36 26L38 42H26Z" fill="#34B4E4" stroke="#003F70" stroke-width="2.5"/>
      </svg>`,
    arrows_split_location: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5"/>
        <circle cx="17" cy="34" r="8.5" fill="#0D9488" stroke="#003F70" stroke-width="2.4"/>
        <circle cx="47" cy="34" r="8.5" fill="#DC2626" stroke="#003F70" stroke-width="2.4"/>
        <path d="M32 10V54" stroke="#003F70" stroke-width="3" stroke-dasharray="4 3"/>
        <path d="M26 24L18 16M46 16L38 24" stroke="#00559F" stroke-width="2.6" stroke-linecap="round"/>
      </svg>`,
    user_pause_badge: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5"/>
        <circle cx="26" cy="22" r="8" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <path d="M12 48C12 40.3 18.3 34 26 34C33.7 34 40 40.3 40 48" fill="#76A4D7" stroke="#003F70" stroke-width="2.5"/>
        <circle cx="44" cy="40" r="12.5" fill="#FFC000" stroke="#003F70" stroke-width="2.5"/>
        <path d="M41 35V45M47 35V45" stroke="#003F70" stroke-width="3.2" stroke-linecap="round"/>
      </svg>`,
    no_contact_ring: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="26" fill="#FEF2F2" stroke="#DC2626" stroke-width="3"/>
        <path d="M16 16L48 48" stroke="#DC2626" stroke-width="3.4" stroke-linecap="round"/>
        <rect x="21" y="24" width="22" height="16" rx="3" fill="#FFFFFF" stroke="#003F70" stroke-width="2.4"/>
        <path d="M21 26L32 33.5L43 26" stroke="#003F70" stroke-width="2.4"/>
      </svg>`,
    hand_heart_calendar: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5"/>
        <rect x="12" y="14" width="40" height="38" rx="5" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <path d="M12 24H52" stroke="#003F70" stroke-width="2.5"/>
        <path d="M22 10V18M42 10V18" stroke="#003F70" stroke-width="3" stroke-linecap="round"/>
        <path d="M32 45C32 45 22 38.5 22 32.5C22 29.5 24.4 27 27.5 27C29.4 27 31.1 28 32 29.5C32.9 28 34.6 27 36.5 27C39.6 27 42 29.5 42 32.5C42 38.5 32 45 32 45Z" fill="#0D9488" stroke="#003F70" stroke-width="2.2"/>
      </svg>`,
    file_warning_mark: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5"/>
        <rect x="14" y="8" width="32" height="44" rx="4" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <path d="M21 18H39M21 25H35" stroke="#003F70" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M42 28L55 52H29L42 28Z" fill="#FFC000" stroke="#003F70" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M42 37V44" stroke="#003F70" stroke-width="2.8" stroke-linecap="round"/>
        <circle cx="42" cy="48" r="1.6" fill="#003F70"/>
      </svg>`,
    calendar_ban_alert: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5"/>
        <rect x="10" y="14" width="38" height="36" rx="4" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <path d="M10 24H48" stroke="#003F70" stroke-width="2.5"/>
        <circle cx="44" cy="42" r="11.5" fill="#DC2626" stroke="#003F70" stroke-width="2.4"/>
        <path d="M37 35L51 49" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
    gavel_ban_building: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FEF2F2" stroke="#FECACA" stroke-width="1.5"/>
        <rect x="12" y="46" width="28" height="6.5" rx="2" fill="#003F70"/>
        <rect x="26" y="14" width="13" height="23" rx="3" transform="rotate(-45 26 14)" fill="#DC2626" stroke="#003F70" stroke-width="2.5"/>
        <path d="M32 28L48 44" stroke="#003F70" stroke-width="3.8" stroke-linecap="round"/>
      </svg>`,
    courthouse_alert_scale: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FEF2F2" stroke="#FECACA" stroke-width="1.5"/>
        <path d="M32 8L54 18H10L32 8Z" fill="#003F70" stroke="#003F70" stroke-width="2" stroke-linejoin="round"/>
        <rect x="15" y="18" width="6.5" height="26" fill="#FFFFFF" stroke="#003F70" stroke-width="2.2"/>
        <rect x="28.75" y="18" width="6.5" height="26" fill="#FFFFFF" stroke="#003F70" stroke-width="2.2"/>
        <rect x="42.5" y="18" width="6.5" height="26" fill="#FFFFFF" stroke="#003F70" stroke-width="2.2"/>
        <rect x="10" y="44" width="44" height="6.5" rx="2" fill="#DC2626"/>
      </svg>`,
    headset_building_shield: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <path d="M16 34V28C16 19.2 23.2 12 32 12C40.8 12 48 19.2 48 28V34" stroke="#003F70" stroke-width="3.2" stroke-linecap="round"/>
        <rect x="12" y="30" width="8.5" height="14" rx="4" fill="#00559F" stroke="#003F70" stroke-width="2.3"/>
        <rect x="43.5" y="30" width="8.5" height="14" rx="4" fill="#00559F" stroke="#003F70" stroke-width="2.3"/>
        <path d="M32 22L43 26.5V35C43 41.8 38.4 46.8 32 49C25.6 46.8 21 41.8 21 35V26.5L32 22Z" fill="#34B4E4" stroke="#003F70" stroke-width="2.3"/>
      </svg>`,
    laptop_globe_verified: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <rect x="14" y="14" width="36" height="26" rx="3" fill="#FFFFFF" stroke="#003F70" stroke-width="2.5"/>
        <path d="M8 40H56L52 46.5H12L8 40Z" fill="#003F70"/>
        <circle cx="32" cy="27" r="8.5" fill="#34B4E4" stroke="#003F70" stroke-width="2.2"/>
        <path d="M23.5 27H40.5M32 18.5C34.8 21.2 34.8 32.8 32 35.5C29.2 32.8 29.2 21.2 32 18.5Z" stroke="#003F70" stroke-width="1.8"/>
      </svg>`,
    phone_lifebuoy_support: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5"/>
        <circle cx="32" cy="32" r="22" fill="#FFFFFF" stroke="#003F70" stroke-width="2.6"/>
        <circle cx="32" cy="32" r="11" fill="#EBF3FA" stroke="#003F70" stroke-width="2.3"/>
        <path d="M16 16L24 24M48 16L40 24M16 48L24 40M48 48L40 40" stroke="#DC2626" stroke-width="4.2" stroke-linecap="round"/>
      </svg>`,
    qr_code_book_law: `
      <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" fill="#EBF3FA" stroke="#C4DAF1" stroke-width="1.5"/>
        <rect x="12" y="10" width="40" height="44" rx="4" fill="#FFFFFF" stroke="#003F70" stroke-width="2.6"/>
        <rect x="20" y="18" width="10" height="10" rx="1.8" fill="#003F70"/>
        <rect x="34" y="18" width="10" height="10" rx="1.8" fill="#00559F"/>
        <rect x="20" y="32" width="10" height="10" rx="1.8" fill="#34B4E4"/>
        <rect x="34" y="32" width="10" height="10" rx="1.8" fill="#FFC000" stroke="#003F70" stroke-width="2"/>
      </svg>`
  };
  return icons[concept] || icons.hand_stop_shield;
}

module.exports = {
  renderQrSvg,
  getCardIconSvg
};
