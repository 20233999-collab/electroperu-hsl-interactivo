const fs = require('fs');
const path = require('path');
const { renderQrSvg, getCardIconSvg } = require('./icons_and_diagrams');

const ROOT = path.resolve(__dirname, '..');
const flyers = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'flyers_data.json'), 'utf8'));
const logoBase64 = fs.readFileSync(path.join(ROOT, 'assets', 'logo_electroperu_oficial_v3.png')).toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

// Official Manual Palette (PANTONE 286 PC #00559F, PANTONE 298 PC #34B4E4, PANTONE P 108-8C #003F70, PANTONE P 104-7C #2D6CB5)
function getThemeConfig(flyer) {
  const map = {
    anatomy_cards: {
      accent: '#00559F',
      accentSecondary: '#34B4E4',
      accentSoft: '#EBF3FA',
      badgeBg: '#34B4E4',
      badgeText: '#003F70',
      heroBar: '#34B4E4',
      heroGrad: 'linear-gradient(135deg, #003F70 0%, #00559F 65%, #2D6CB5 100%)',
      cardColors: ['#00559F', '#2D6CB5', '#003F70', '#0D9488']
    },
    warning_grid: {
      accent: '#DC2626',
      accentSecondary: '#FFC000',
      accentSoft: '#FEF2F2',
      badgeBg: '#FFC000',
      badgeText: '#003F70',
      heroBar: '#FFC000',
      heroGrad: 'linear-gradient(135deg, #003F70 0%, #00559F 55%, #7F1D1D 100%)',
      cardColors: ['#DC2626', '#B45309', '#DC2626', '#00559F']
    },
    hierarchy_flow: {
      accent: '#00559F',
      accentSecondary: '#34B4E4',
      accentSoft: '#EBF3FA',
      badgeBg: '#FFC000',
      badgeText: '#003F70',
      heroBar: '#FFC000',
      heroGrad: 'linear-gradient(135deg, #003F70 0%, #00559F 60%, #2D6CB5 100%)',
      cardColors: ['#DC2626', '#00559F', '#0D9488']
    },
    shield_pillars: {
      accent: '#0D9488',
      accentSecondary: '#00559F',
      accentSoft: '#ECFDF5',
      badgeBg: '#34B4E4',
      badgeText: '#003F70',
      heroBar: '#34B4E4',
      heroGrad: 'linear-gradient(135deg, #003F70 0%, #00559F 62%, #0D9488 100%)',
      cardColors: ['#00559F', '#0D9488', '#2D6CB5', '#003F70']
    },
    rights_checklist: {
      accent: '#0D9488',
      accentSecondary: '#34B4E4',
      accentSoft: '#ECFDF5',
      badgeBg: '#34B4E4',
      badgeText: '#003F70',
      heroBar: '#34B4E4',
      heroGrad: 'linear-gradient(135deg, #003F70 0%, #00559F 60%, #0D9488 100%)',
      cardColors: ['#0D9488', '#00559F', '#0D9488', '#2D6CB5']
    },
    committee_hub: {
      accent: '#2D6CB5',
      accentSecondary: '#34B4E4',
      accentSoft: '#EBF3FA',
      badgeBg: '#34B4E4',
      badgeText: '#003F70',
      heroBar: '#34B4E4',
      heroGrad: 'linear-gradient(135deg, #003F70 0%, #00559F 65%, #2D6CB5 100%)',
      cardColors: ['#00559F', '#2D6CB5', '#0D9488', '#003F70']
    },
    step_by_step_channels: {
      accent: '#00559F',
      accentSecondary: '#34B4E4',
      accentSoft: '#EBF3FA',
      badgeBg: '#FFC000',
      badgeText: '#003F70',
      heroBar: '#FFC000',
      heroGrad: 'linear-gradient(135deg, #003F70 0%, #00559F 62%, #2D6CB5 100%)',
      cardColors: ['#00559F', '#B45309', '#2D6CB5', '#0D9488']
    },
    timeline_plazos: {
      accent: '#B45309',
      accentSecondary: '#FFC000',
      accentSoft: '#FFFBEB',
      badgeBg: '#FFC000',
      badgeText: '#003F70',
      heroBar: '#FFC000',
      heroGrad: 'linear-gradient(135deg, #003F70 0%, #00559F 58%, #B45309 100%)',
      cardColors: ['#0D9488', '#B45309', '#DC2626', '#00559F']
    },
    severity_scale: {
      accent: '#DC2626',
      accentSecondary: '#FFC000',
      accentSoft: '#FEF2F2',
      badgeBg: '#FFC000',
      badgeText: '#003F70',
      heroBar: '#FFC000',
      heroGrad: 'linear-gradient(135deg, #003F70 0%, #00559F 52%, #7F1D1D 100%)',
      cardColors: ['#00559F', '#B45309', '#DC2626', '#7F1D1D']
    },
    culture_manifesto: {
      accent: '#00559F',
      accentSecondary: '#34B4E4',
      accentSoft: '#EBF3FA',
      badgeBg: '#FFC000',
      badgeText: '#003F70',
      heroBar: '#FFC000',
      heroGrad: 'linear-gradient(135deg, #003F70 0%, #00559F 60%, #0D9488 100%)',
      cardColors: ['#00559F', '#0D9488', '#B45309', '#003F70']
    }
  };
  return map[flyer.infographic_type] || map.anatomy_cards;
}

function renderCardsSection(flyer, theme) {
  const type = flyer.infographic_type;
  const sections = flyer.sections;

  // FLYER 03: 3 Full-Width Horizontal Cards (Icon 106x106 left + Badge 17px, Title 30px, Body 23px right)
  if (type === 'hierarchy_flow') {
    return `
      <div class="cards-stack-3">
        ${sections.map((sec, idx) => {
          const color = theme.cardColors[idx % theme.cardColors.length];
          const badgeLabel = `0${idx + 1} • ${sec.metric_or_badge || sec.tag}`;
          return `
            <article class="card-horizontal-v3" style="--card-color: ${color};">
              <div class="card-horiz-icon-wrap">
                ${getCardIconSvg(sec.icon_concept, 106)}
              </div>
              <div class="card-horiz-content">
                <div class="card-top-row">
                  <span class="card-badge">${badgeLabel}</span>
                </div>
                <h3 class="card-heading-horiz">${sec.heading}</h3>
                <p class="card-body-horiz">${sec.body}</p>
              </div>
            </article>
          `;
        }).join('')}
      </div>
    `;
  }

  // ALL OTHER FLYERS (4 Sections): Spacious 2x2 Grid of Protagonist Cards
  const isProgressive = ['step_by_step_channels', 'timeline_plazos', 'severity_scale'].includes(type);

  return `
    <div class="cards-grid-2x2">
      ${sections.map((sec, idx) => {
        const color = theme.cardColors[idx % theme.cardColors.length];
        const badgeLabel = `0${idx + 1} • ${sec.metric_or_badge || sec.tag}`;
        const progressPct = isProgressive ? (idx + 1) * 25 : 100;
        return `
          <article class="card-v3" style="--card-color: ${color};">
            <div class="card-header-v3">
              <div class="card-icon-box-v3">
                ${getCardIconSvg(sec.icon_concept, 96)}
              </div>
              <span class="card-badge">${badgeLabel}</span>
            </div>
            <h3 class="card-heading">${sec.heading}</h3>
            <p class="card-body">${sec.body}</p>
            <div class="card-progress-track">
              <div class="card-progress-fill" style="width: ${progressPct}%; background: ${color}; opacity: ${isProgressive ? '1' : '0.35'};"></div>
            </div>
          </article>
        `;
      }).join('')}
    </div>
  `;
}

function renderActionFooter(flyer) {
  const hb = flyer.highlight_box;
  const numId = Number(flyer.id);
  const isFlyer10 = numId === 10;
  const isFlyer07 = numId === 7;

  if (isFlyer10) {
    return `
      <section class="action-footer-box action-footer-dual">
        <div class="action-copy-col">
          <div class="action-law-pill">${hb.law_reference}</div>
          <h4 class="action-title">${hb.title}</h4>
          <p class="action-text">${hb.text}</p>
        </div>
        <div class="action-qrs-dual">
          <div class="qr-card-mini">
            <div class="qr-svg-holder">
              ${renderQrSvg(hb.aliada_link || 'https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual', 112, '#003F70', '#00559F')}
            </div>
            <div class="qr-mini-caption">ALIADA SUNAFIL</div>
          </div>
          <div class="qr-card-mini">
            <div class="qr-svg-holder">
              ${renderQrSvg(hb.law_link || 'https://www.gob.pe/institucion/mimp/normas-legales/285411-014-2019-mimp', 112, '#003F70', '#0D9488')}
            </div>
            <div class="qr-mini-caption">D.S. 014-2019 / Ley</div>
          </div>
        </div>
      </section>
    `;
  }

  const qrUrl = isFlyer07
    ? (hb.campaign_link || hb.normative_link || 'https://www.gob.pe/institucion/electroperu/campa%C3%B1as/40531-juntos-contra-el-hostigamiento-tu-voz-importa')
    : (hb.normative_link || 'https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual');
  const qrKicker = isFlyer07 ? 'FORMATO DE DENUNCIA' : 'PLATAFORMA OFICIAL';
  const qrDomain = isFlyer07 ? 'gob.pe/electroperu' : 'gob.pe/sunafil (ALIADA)';

  return `
    <section class="action-footer-box">
      <div class="action-copy-col">
        <div class="action-law-pill">${hb.law_reference}</div>
        <h4 class="action-title">${hb.title}</h4>
        <p class="action-text">${hb.text}</p>
      </div>
      <div class="qr-card-single">
        <div class="qr-svg-holder">
          ${renderQrSvg(qrUrl, 118, '#003F70', '#00559F')}
        </div>
        <div class="qr-info-col">
          <span class="qr-kicker">${qrKicker}</span>
          <strong class="qr-domain">${qrDomain}</strong>
          <span class="qr-hotline-pill">Línea 1819 • Gratuita</span>
        </div>
      </div>
    </section>
  `;
}

function buildFlyerHtml(flyer) {
  const theme = getThemeConfig(flyer);
  const cardsHtml = renderCardsSection(flyer, theme);
  const actionFooterHtml = renderActionFooter(flyer);
  const badgeNumber = (flyer.edition_badge || flyer.badge_number || `${String(flyer.id).padStart(2, '0')}/10`).replace('/', ' / ');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>ELECTROPERU S.A. - Flyer ${flyer.id} V3.0</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,600;0,700;0,800;0,900;1,700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --elp-blue: #00559F;
      --elp-cyan: #34B4E4;
      --elp-navy: #003F70;
      --elp-medium: #2D6CB5;
      --elp-steel: #76A4D7;
      --elp-ice: #C4DAF1;
      --elp-gray: #868689;
      --elp-black: #1A171B;
      --elp-bg: #F4F8FC;
      --theme-accent: ${theme.accent};
      --theme-secondary: ${theme.accentSecondary};
      --theme-soft: ${theme.accentSoft};
      --badge-bg: ${theme.badgeBg};
      --badge-text: ${theme.badgeText};
      --hero-bar: ${theme.heroBar};
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      width: 1080px;
      height: 1920px;
      overflow: hidden;
      background: var(--elp-bg);
      font-family: 'Plus Jakarta Sans', 'Nunito', sans-serif;
      color: var(--elp-black);
      -webkit-font-smoothing: antialiased;
      text-rendering: geometricPrecision;
    }

    .canvas {
      position: relative;
      width: 1080px;
      height: 1920px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background:
        radial-gradient(circle at 92% 12%, rgba(52, 180, 228, 0.12) 0%, transparent 38%),
        radial-gradient(circle at 8% 85%, rgba(0, 85, 159, 0.08) 0%, transparent 42%),
        linear-gradient(180deg, #F7FAFD 0%, #EBF3FA 100%);
      overflow: hidden;
    }

    /* Subtle Hydroelectric Orbital Waves in Canvas Background */
    .canvas-bg-waves {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    /* ==========================================================================
       ZONA 1: CABECERA INSTITUCIONAL LIMPIA (Cinta Bicolor + 2 Columnas)
       ========================================================================== */
    .zone-header {
      position: relative;
      z-index: 2;
      background: #FFFFFF;
      border-bottom: 3px solid var(--elp-ice);
      box-shadow: 0 6px 20px rgba(0, 63, 112, 0.05);
    }

    /* Franja Bicolor Escalonada Oficial (Manual Pág. 30) */
    .bicolor-ribbon-top {
      height: 42px;
      width: 100%;
      background: var(--elp-blue);
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      overflow: hidden;
    }

    .ribbon-left-text {
      display: flex;
      align-items: center;
      padding-left: 36px;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: 0.04em;
    }

    .ribbon-step-right {
      display: flex;
      align-items: stretch;
    }

    .ribbon-step-mid {
      width: 48px;
      background: var(--elp-steel);
      clip-path: polygon(22px 0, 100% 0, 100% 100%, 0 100%);
      margin-right: -12px;
    }

    .ribbon-step-cyan {
      background: var(--elp-cyan);
      clip-path: polygon(20px 0, 100% 0, 100% 100%, 0 100%);
      padding: 0 36px 0 42px;
      display: flex;
      align-items: center;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 900;
      color: var(--elp-navy);
      letter-spacing: 0.02em;
    }

    .header-main-row {
      height: 148px;
      padding: 0 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .header-logo-cell {
      width: 245px;
      height: 126px;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-right: 20px;
      border-right: 2px solid var(--elp-ice);
      flex-shrink: 0;
    }

    .brand-logo {
      width: 195px;
      height: auto;
      aspect-ratio: 860 / 586;
      object-fit: contain;
      display: block;
    }

    .header-title-col {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
    }

    .header-kicker {
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: var(--elp-blue);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .header-program-title {
      font-family: 'Nunito', sans-serif;
      font-size: 25px;
      font-weight: 900;
      color: var(--elp-navy);
      line-height: 1.2;
      letter-spacing: -0.01em;
    }

    .header-edition-badge {
      background: var(--elp-blue);
      color: #FFFFFF;
      font-family: 'Nunito', sans-serif;
      font-size: 24px;
      font-weight: 900;
      padding: 14px 26px;
      border-radius: 16px;
      border: 3px solid var(--elp-cyan);
      letter-spacing: 0.03em;
      flex-shrink: 0;
      box-shadow: 0 6px 16px rgba(0, 85, 159, 0.18);
    }

    /* ==========================================================================
       ZONA 2: HERO BANNER LIMPIO Y DIRECTO
       ========================================================================== */
    .zone-hero {
      position: relative;
      z-index: 2;
      margin: 22px 36px 0;
      padding: 30px 36px;
      border-radius: 26px;
      background: ${theme.heroGrad};
      color: #FFFFFF;
      overflow: hidden;
      box-shadow: 0 14px 32px rgba(0, 63, 112, 0.18);
      border: 2px solid rgba(52, 180, 228, 0.45);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .hero-orbital-deco {
      position: absolute;
      right: -40px;
      top: -40px;
      width: 360px;
      height: 360px;
      pointer-events: none;
      opacity: 0.18;
    }

    .hero-top-bar {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      background: var(--badge-bg);
      color: var(--badge-text);
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 900;
      padding: 7px 18px;
      border-radius: 999px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .hero-title {
      position: relative;
      z-index: 1;
      font-family: 'Nunito', sans-serif;
      font-size: 47px;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.12;
      letter-spacing: -0.015em;
    }

    .hero-key-concept {
      position: relative;
      z-index: 1;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 22px;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 1.38;
      background: rgba(255, 255, 255, 0.11);
      border-left: 6px solid var(--hero-bar);
      padding: 15px 22px;
      border-radius: 0 16px 16px 0;
    }

    /* ==========================================================================
       ZONA 3: TARJETAS INFOGRÁFICAS PROTAGONISTAS (Cero saturación, aire limpio)
       ========================================================================== */
    .zone-cards {
      position: relative;
      z-index: 2;
      flex: 1;
      margin: 22px 36px;
      display: flex;
      flex-direction: column;
    }

    /* Layout 2x2 para 4 secciones */
    .cards-grid-2x2 {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 24px;
    }

    .card-v3 {
      background: #FFFFFF;
      border-radius: 24px;
      border: 2.5px solid var(--elp-ice);
      border-top: 8px solid var(--card-color);
      padding: 32px 32px 28px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      box-shadow: 0 10px 26px rgba(0, 63, 112, 0.06);
      position: relative;
    }

    .card-header-v3 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
    }

    .card-icon-box-v3 {
      width: 112px;
      height: 112px;
      border-radius: 24px;
      background: #F4F8FC;
      border: 2px solid var(--elp-ice);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .card-badge {
      display: inline-flex;
      align-items: center;
      background: #EBF3FA;
      color: var(--card-color);
      border: 2px solid var(--elp-ice);
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      padding: 9px 18px;
      border-radius: 12px;
      letter-spacing: 0.02em;
      text-align: right;
    }

    .card-heading {
      font-family: 'Nunito', sans-serif;
      font-size: 28px;
      font-weight: 900;
      color: var(--elp-navy);
      line-height: 1.22;
      letter-spacing: -0.01em;
      margin-top: 4px;
    }

    .card-body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 22px;
      font-weight: 600;
      color: var(--elp-black);
      line-height: 1.48;
      flex: 1;
    }

    .card-progress-track {
      width: 100%;
      height: 10px;
      background: #EBF3FA;
      border-radius: 999px;
      overflow: hidden;
      margin-top: auto;
    }

    .card-progress-fill {
      height: 100%;
      border-radius: 999px;
    }

    /* Layout Horizontal de 3 filas para Flyer 03 (3 secciones) */
    .cards-stack-3 {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 22px;
    }

    .card-horizontal-v3 {
      flex: 1;
      background: #FFFFFF;
      border-radius: 24px;
      border: 2.5px solid var(--elp-ice);
      border-left: 10px solid var(--card-color);
      padding: 28px 36px;
      display: flex;
      align-items: center;
      gap: 32px;
      box-shadow: 0 10px 26px rgba(0, 63, 112, 0.06);
    }

    .card-horiz-icon-wrap {
      width: 132px;
      height: 132px;
      border-radius: 26px;
      background: #F4F8FC;
      border: 2px solid var(--elp-ice);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .card-horiz-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .card-top-row {
      display: flex;
      align-items: center;
    }

    .card-heading-horiz {
      font-family: 'Nunito', sans-serif;
      font-size: 30px;
      font-weight: 900;
      color: var(--elp-navy);
      line-height: 1.18;
    }

    .card-body-horiz {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 23px;
      font-weight: 600;
      color: var(--elp-black);
      line-height: 1.44;
    }

    /* ==========================================================================
       ZONA 4: BLOQUE DE ACCIÓN INFERIOR + QR GRANDE + CINTA BICOLOR OFICIAL
       ========================================================================== */
    .zone-footer {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
    }

    .action-footer-box {
      margin: 0 36px 20px;
      padding: 22px 28px;
      border-radius: 24px;
      background: var(--elp-navy);
      border: 3px solid var(--elp-cyan);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      box-shadow: 0 12px 28px rgba(0, 63, 112, 0.16);
    }

    .action-copy-col {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .action-law-pill {
      display: inline-flex;
      align-self: flex-start;
      background: rgba(52, 180, 228, 0.2);
      border: 1.5px solid var(--elp-cyan);
      color: #FFC000;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      padding: 5px 14px;
      border-radius: 999px;
      letter-spacing: 0.03em;
    }

    .action-title {
      font-family: 'Nunito', sans-serif;
      font-size: 24px;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.2;
    }

    .action-text {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 19px;
      font-weight: 600;
      color: #EBF3FA;
      line-height: 1.38;
      overflow-wrap: anywhere;
      word-break: break-word;
    }

    .qr-card-single {
      background: #FFFFFF;
      color: var(--elp-navy);
      padding: 12px 18px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      gap: 16px;
      flex-shrink: 0;
      border: 2px solid var(--elp-ice);
    }

    .qr-svg-holder {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .qr-info-col {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .qr-kicker {
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: var(--elp-blue);
      letter-spacing: 0.03em;
    }

    .qr-domain {
      font-family: 'Nunito', sans-serif;
      font-size: 18px;
      font-weight: 900;
      color: var(--elp-navy);
    }

    .qr-hotline-pill {
      display: inline-flex;
      align-self: flex-start;
      background: #0D9488;
      color: #FFFFFF;
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 8px;
    }

    .action-qrs-dual {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-shrink: 0;
    }

    .qr-card-mini {
      background: #FFFFFF;
      color: var(--elp-navy);
      padding: 10px 14px;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      border: 2px solid var(--elp-ice);
    }

    .qr-mini-caption {
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: var(--elp-navy);
    }

    /* Cinta Bicolor Escalonada Inferior (Manual Pág. 30 y 32) */
    .bicolor-ribbon-bottom {
      height: 62px;
      width: 100%;
      background: var(--elp-blue);
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      overflow: hidden;
    }

    .ribbon-bottom-left {
      display: flex;
      align-items: center;
      padding-left: 36px;
      font-family: 'Nunito', sans-serif;
      font-size: 18px;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: 0.02em;
    }

    .ribbon-bottom-right {
      display: flex;
      align-items: stretch;
    }

    .ribbon-bottom-step1 {
      width: 56px;
      background: var(--elp-cyan);
      clip-path: polygon(24px 0, 100% 0, 100% 100%, 0 100%);
      margin-right: -14px;
    }

    .ribbon-bottom-step2 {
      background: #E6F6FC;
      clip-path: polygon(22px 0, 100% 0, 100% 100%, 0 100%);
      padding: 4px 36px 4px 48px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      gap: 1px;
    }

    .footer-unit-dark {
      font-family: 'Nunito', sans-serif;
      font-size: 17px;
      font-weight: 900;
      color: #003F70;
      line-height: 1.15;
    }

    .footer-unit-light {
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 800;
      color: #0066B3;
      line-height: 1.15;
    }
  </style>
</head>
<body>
  <main class="canvas">
    <!-- Ondas Hidroeléctricas Sutiles de Fondo (Identidad ELECTROPERU) -->
    <svg class="canvas-bg-waves" viewBox="0 0 1080 1920" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-120 420 C 260 340, 720 520, 1200 390" stroke="#C4DAF1" stroke-width="2.5" stroke-opacity="0.55"/>
      <path d="M-120 1440 C 340 1320, 760 1540, 1200 1410" stroke="#C4DAF1" stroke-width="2.5" stroke-opacity="0.55"/>
    </svg>

    <!-- ZONA 1: CABECERA INSTITUCIONAL LIMPIA -->
    <header class="zone-header">
      <div class="bicolor-ribbon-top">
        <div class="ribbon-left-text">ELECTROPERU S.A. • SEDES LIMA, MANTARO Y TUMBES</div>
        <div class="ribbon-step-right">
          <div class="ribbon-step-mid"></div>
          <div class="ribbon-step-cyan">LEY N° 27942 • D. LEG. N° 1410</div>
        </div>
      </div>
      <div class="header-main-row">
        <div class="header-logo-cell">
          <img class="brand-logo" src="${logoDataUri}" alt="ELECTROPERU S.A." />
        </div>
        <div class="header-title-col">
          <span class="header-program-title">PREVENCIÓN DEL HOSTIGAMIENTO SEXUAL LABORAL</span>
        </div>
        <div class="header-edition-badge">${badgeNumber}</div>
      </div>
    </header>

    <!-- ZONA 2: HERO BANNER LIMPIO Y DIRECTO -->
    <section class="zone-hero">
      <svg class="hero-orbital-deco" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="220" cy="140" r="140" stroke="#34B4E4" stroke-width="14"/>
        <circle cx="220" cy="140" r="95" stroke="#FFFFFF" stroke-width="6" stroke-dasharray="14 10"/>
      </svg>
      <div class="hero-top-bar">
        <span class="hero-badge">${flyer.category_badge}</span>
      </div>
      <h1 class="hero-title">${flyer.title}</h1>
      <p class="hero-key-concept">${flyer.key_concept}</p>
    </section>

    <!-- ZONA 3: TARJETAS INFOGRÁFICAS PROTAGONISTAS -->
    <section class="zone-cards">
      ${cardsHtml}
    </section>

    <!-- ZONA 4: BLOQUE DE ACCIÓN INFERIOR + QR + CINTA BICOLOR OFICIAL -->
    <footer class="zone-footer">
      ${actionFooterHtml}
      <div class="bicolor-ribbon-bottom">
        <div class="ribbon-bottom-left">www.gob.pe/electroperu</div>
        <div class="ribbon-bottom-right">
          <div class="ribbon-bottom-step1"></div>
          <div class="ribbon-bottom-step2">
            <span class="footer-unit-dark">Subgerencia de Gestión Humana</span>
            <span class="footer-unit-light">Gerencia de Administración y Finanzas</span>
          </div>
        </div>
      </div>
    </footer>
  </main>
</body>
</html>`;
}

function generateAllFlyers() {
  const htmlDir = path.join(ROOT, 'templates', 'html');
  fs.mkdirSync(htmlDir, { recursive: true });

  const manifest = [];
  for (const flyer of flyers) {
    const html = buildFlyerHtml(flyer);
    const htmlFilename = `${flyer.slug}.html`;
    const htmlPath = path.join(__dirname, htmlFilename);
    const htmlSubPath = path.join(htmlDir, htmlFilename);
    fs.writeFileSync(htmlPath, html, 'utf8');
    fs.writeFileSync(htmlSubPath, html, 'utf8');
    manifest.push({
      id: flyer.id,
      slug: flyer.slug,
      htmlPath,
      pngPath: path.join(ROOT, 'dist', flyer.filename || `${flyer.slug}.png`)
    });
  }
  console.log(`Generated ${manifest.length} V3.0 HTML templates in ${__dirname}`);
  return manifest;
}

generateAllFlyers();

module.exports = { generateAllFlyers };
