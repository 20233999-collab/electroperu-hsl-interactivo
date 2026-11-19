const fs = require('fs');
const path = require('path');
const { renderQrSvg, getCardIconSvg } = require('./icons_and_diagrams');

const ROOT = path.resolve(__dirname, '..');
const flyers = JSON.parse(fs.readFileSync(path.join(ROOT, 'content', 'flyers_data_v4.json'), 'utf8'));
const logoBase64 = fs.readFileSync(path.join(ROOT, 'assets', 'logo_electroperu_oficial_v3.png')).toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

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

  // FLYER 03: 3 Compact Full-Width Horizontal Cards
  if (type === 'hierarchy_flow') {
    return `
      <div class="cards-stack-3">
        ${sections.map((sec, idx) => {
          const color = theme.cardColors[idx % theme.cardColors.length];
          const badgeLabel = `0${idx + 1} • ${sec.metric_or_badge || sec.tag}`;
          return `
            <article class="card-horizontal-v4" style="--card-color: ${color};">
              <div class="card-horiz-icon-wrap">
                ${getCardIconSvg(sec.icon_concept, 86)}
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

  // ALL OTHER FLYERS (4 Sections): Compact & Balanced 2x2 Grid
  const isProgressive = ['step_by_step_channels', 'timeline_plazos', 'severity_scale'].includes(type);

  return `
    <div class="cards-grid-2x2">
      ${sections.map((sec, idx) => {
        const color = theme.cardColors[idx % theme.cardColors.length];
        const badgeLabel = `0${idx + 1} • ${sec.metric_or_badge || sec.tag}`;
        const progressPct = isProgressive ? (idx + 1) * 25 : 100;
        return `
          <article class="card-v4" style="--card-color: ${color};">
            <div class="card-header-v4">
              <div class="card-icon-box-v4">
                ${getCardIconSvg(sec.icon_concept, 78)}
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

function renderBannerHighlight(flyer) {
  const bh = flyer.banner_highlight || flyer.highlight_box;
  const numId = Number(flyer.id);
  const isFlyer07 = numId === 7;
  const ctaLabel = bh.cta_button_label || flyer.cta_button_label || 'Ir al Formato de Denuncia ↗';

  return `
    <section class="zone-banner-highlight">
      <div class="banner-highlight-icon">
        <svg viewBox="0 0 48 48" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#00559F"/>
          <path d="M24 13V26" stroke="#FFC000" stroke-width="4" stroke-linecap="round"/>
          <circle cx="24" cy="34" r="2.5" fill="#FFC000"/>
        </svg>
      </div>
      <div class="banner-highlight-copy">
        <h4 class="banner-highlight-title">${bh.title}</h4>
        <p class="banner-highlight-text">${bh.text}</p>
      </div>
      ${isFlyer07 ? `
        <div class="banner-cta-btn">
          <span>${ctaLabel}</span>
        </div>
      ` : ''}
    </section>
  `;
}

function renderBottomTwoSpaces(flyer) {
  const hb = flyer.highlight_box || {};
  const numId = Number(flyer.id);
  const isFlyer10 = numId === 10;
  const isFlyer07 = numId === 7;
  const normativeText = flyer.normative_banner || hb.law_reference || 'Marco normativo: Ley N.° 27942, D. Leg. N.° 1410 y D. S. N.° 014-2019-MIMP.';
  const qrCtaText = flyer.qr_cta_text || 'ESCANEA Y CONOCE LOS CANALES DE ORIENTACIÓN';

  // Split "Marco normativo:" prefix for visual emphasis
  let normPrefix = 'Marco normativo:';
  let normRest = normativeText.replace(/^Marco normativo:\s*/i, '');

  const spaceA = `
    <div class="space-normative-bar">
      <svg viewBox="0 0 32 32" width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" fill="#FFC000"/>
        <path d="M16 8V23M10 23H22M9 12H23" stroke="#003F70" stroke-width="2.4" stroke-linecap="round"/>
      </svg>
      <p class="normative-bar-text"><strong>${normPrefix}</strong> ${normRest}</p>
    </div>
  `;

  if (isFlyer10) {
    return `
      <section class="zone-bottom-spaces">
        ${spaceA}
        <div class="space-orientation-box">
          <div class="orientation-copy-col">
            <span class="orientation-kicker-pill">ORIENTACIÓN Y AYUDA CONFIDENCIAL</span>
            <h4 class="orientation-cta-heading">${qrCtaText}</h4>
            <div class="orientation-channels-row">
              <span class="channel-chip-white">gob.pe/sunafil (ALIADA)</span>
              <span class="channel-chip-teal">Línea Gratuita 1819</span>
            </div>
          </div>
          <div class="orientation-qrs-dual">
            <div class="qr-card-large-dual">
              <div class="qr-svg-holder">
                ${renderQrSvg(hb.aliada_link || 'https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual', 160, '#003F70', '#00559F')}
              </div>
              <span class="qr-dual-label">ALIADA SUNAFIL</span>
            </div>
            <div class="qr-card-large-dual">
              <div class="qr-svg-holder">
                ${renderQrSvg(hb.law_link || 'https://www.gob.pe/institucion/mimp/normas-legales/285411-014-2019-mimp', 160, '#003F70', '#0D9488')}
              </div>
              <span class="qr-dual-label">D. S. N.° 014-2019</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  const qrUrl = isFlyer07
    ? (hb.campaign_link || hb.normative_link || 'https://www.gob.pe/institucion/electroperu/campa%C3%B1as/40531-juntos-contra-el-hostigamiento-tu-voz-importa')
    : (hb.normative_link || 'https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual');
  const platformLabel = isFlyer07 ? 'Portal Oficial: gob.pe/electroperu' : 'Plataforma Oficial: gob.pe/sunafil (ALIADA)';

  return `
    <section class="zone-bottom-spaces">
      ${spaceA}
      <div class="space-orientation-box">
        <div class="orientation-copy-col">
          <span class="orientation-kicker-pill">ORIENTACIÓN Y AYUDA CONFIDENCIAL</span>
          <h4 class="orientation-cta-heading">${qrCtaText}</h4>
          <p class="orientation-subtext">Escanea el código QR con tu celular para acceder de inmediato:</p>
          <div class="orientation-channels-row">
            <span class="channel-chip-white">${platformLabel}</span>
            <span class="channel-chip-teal">Línea Gratuita 1819</span>
          </div>
        </div>
        <div class="qr-card-large-single">
          <div class="qr-svg-holder">
            ${renderQrSvg(qrUrl, 168, '#003F70', '#00559F')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function buildFlyerHtml(flyer) {
  const theme = getThemeConfig(flyer);
  const cardsHtml = renderCardsSection(flyer, theme);
  const bannerHighlightHtml = renderBannerHighlight(flyer);
  const bottomSpacesHtml = renderBottomTwoSpaces(flyer);
  const badgeNumber = (flyer.edition_badge || flyer.badge_number || `${String(flyer.id).padStart(2, '0')}/10`).replace('/', ' / ');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>ELECTROPERU S.A. - Flyer ${flyer.id} V4.0 (obs02)</title>
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
        radial-gradient(circle at 92% 10%, rgba(52, 180, 228, 0.12) 0%, transparent 38%),
        radial-gradient(circle at 8% 85%, rgba(0, 85, 159, 0.08) 0%, transparent 42%),
        linear-gradient(180deg, #F7FAFD 0%, #EBF3FA 100%);
      overflow: hidden;
    }

    .canvas-bg-waves {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    /* ==========================================================================
       1. CABECERA INSTITUCIONAL LIMPIA (SIN PRIMER BANNER SUPERIOR)
       ========================================================================== */
    .zone-header {
      position: relative;
      z-index: 2;
      background: #FFFFFF;
      border-bottom: 3px solid var(--elp-ice);
      box-shadow: 0 6px 18px rgba(0, 63, 112, 0.05);
    }

    .header-main-row {
      height: 138px;
      padding: 0 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    .header-logo-cell {
      width: 238px;
      height: 118px;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-right: 18px;
      border-right: 2px solid var(--elp-ice);
      flex-shrink: 0;
    }

    .brand-logo {
      width: 192px;
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
    }

    .header-program-title {
      font-family: 'Nunito', sans-serif;
      font-size: 25px;
      font-weight: 900;
      color: var(--elp-navy);
      line-height: 1.18;
      letter-spacing: -0.01em;
    }

    .header-edition-badge {
      background: var(--elp-blue);
      color: #FFFFFF;
      font-family: 'Nunito', sans-serif;
      font-size: 24px;
      font-weight: 900;
      padding: 12px 24px;
      border-radius: 16px;
      border: 3px solid var(--elp-cyan);
      letter-spacing: 0.03em;
      flex-shrink: 0;
      box-shadow: 0 6px 16px rgba(0, 85, 159, 0.18);
    }

    /* ==========================================================================
       2. HERO PROTAGONISTA (TÍTULO + DESCRIPCIÓN ARRIBA, CATEGORÍA DEBAJO)
       ========================================================================== */
    .zone-hero {
      position: relative;
      z-index: 2;
      margin: 16px 36px 0;
      padding: 26px 34px 22px;
      border-radius: 24px;
      background: ${theme.heroGrad};
      color: #FFFFFF;
      overflow: hidden;
      box-shadow: 0 12px 28px rgba(0, 63, 112, 0.16);
      border: 2px solid rgba(52, 180, 228, 0.45);
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .hero-orbital-deco {
      position: absolute;
      right: -40px;
      top: -40px;
      width: 340px;
      height: 340px;
      pointer-events: none;
      opacity: 0.16;
    }

    .hero-title {
      position: relative;
      z-index: 1;
      font-family: 'Nunito', sans-serif;
      font-size: 45px;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.11;
      letter-spacing: -0.015em;
    }

    .hero-key-concept {
      position: relative;
      z-index: 1;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 20.5px;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 1.36;
      background: rgba(255, 255, 255, 0.12);
      border-left: 6px solid var(--hero-bar);
      padding: 13px 20px;
      border-radius: 0 14px 14px 0;
    }

    .hero-bottom-bar {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-top: 2px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      background: var(--badge-bg);
      color: var(--badge-text);
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 900;
      padding: 6px 18px;
      border-radius: 999px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    /* ==========================================================================
       3. TARJETAS COMPACTAS Y EQUILIBRADAS (MENOS AIRE BLANCO)
       ========================================================================== */
    .zone-cards {
      position: relative;
      z-index: 2;
      margin: 16px 36px 0;
      display: flex;
      flex-direction: column;
    }

    .cards-grid-2x2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: auto;
      gap: 18px;
    }

    .card-v4 {
      background: #FFFFFF;
      border-radius: 22px;
      border: 2.5px solid var(--elp-ice);
      border-top: 7px solid var(--card-color);
      padding: 20px 24px 18px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 8px 20px rgba(0, 63, 112, 0.05);
      position: relative;
    }

    .card-header-v4 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .card-icon-box-v4 {
      width: 92px;
      height: 92px;
      border-radius: 20px;
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
      padding: 7px 15px;
      border-radius: 12px;
      letter-spacing: 0.02em;
      text-align: right;
    }

    .card-heading {
      font-family: 'Nunito', sans-serif;
      font-size: 25.5px;
      font-weight: 900;
      color: var(--elp-navy);
      line-height: 1.18;
      letter-spacing: -0.01em;
    }

    .card-body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: var(--elp-black);
      line-height: 1.38;
    }

    .card-progress-track {
      width: 100%;
      height: 8px;
      background: #EBF3FA;
      border-radius: 999px;
      overflow: hidden;
      margin-top: 4px;
    }

    .card-progress-fill {
      height: 100%;
      border-radius: 999px;
    }

    /* Flyer 03: 3 Tarjetas Horizontales Compactas */
    .cards-stack-3 {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .card-horizontal-v4 {
      background: #FFFFFF;
      border-radius: 22px;
      border: 2.5px solid var(--elp-ice);
      border-left: 10px solid var(--card-color);
      padding: 18px 26px;
      display: flex;
      align-items: center;
      gap: 24px;
      box-shadow: 0 8px 20px rgba(0, 63, 112, 0.05);
    }

    .card-horiz-icon-wrap {
      width: 104px;
      height: 104px;
      border-radius: 22px;
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
      gap: 6px;
    }

    .card-top-row {
      display: flex;
      align-items: center;
    }

    .card-heading-horiz {
      font-family: 'Nunito', sans-serif;
      font-size: 26px;
      font-weight: 900;
      color: var(--elp-navy);
      line-height: 1.16;
    }

    .card-body-horiz {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 19.5px;
      font-weight: 600;
      color: var(--elp-black);
      line-height: 1.36;
    }

    /* ==========================================================================
       4. BANNER DESTACADO DEBAJO DE LAS TARJETAS (banner_highlight)
       ========================================================================== */
    .zone-banner-highlight {
      position: relative;
      z-index: 2;
      margin: 16px 36px 0;
      padding: 18px 26px;
      border-radius: 20px;
      background: linear-gradient(90deg, #E6F6FC 0%, #FFFFFF 100%);
      border: 2.5px solid var(--elp-cyan);
      border-left: 10px solid var(--elp-blue);
      box-shadow: 0 8px 20px rgba(0, 85, 159, 0.08);
      display: flex;
      align-items: center;
      gap: 18px;
    }

    .banner-highlight-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .banner-highlight-copy {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .banner-highlight-title {
      font-family: 'Nunito', sans-serif;
      font-size: 23px;
      font-weight: 900;
      color: var(--elp-navy);
      line-height: 1.18;
    }

    .banner-highlight-text {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 18.5px;
      font-weight: 600;
      color: var(--elp-black);
      line-height: 1.34;
    }

    .banner-cta-btn {
      flex-shrink: 0;
      background: var(--elp-blue);
      color: #FFFFFF;
      border: 2.5px solid var(--elp-cyan);
      font-family: 'Nunito', sans-serif;
      font-size: 18px;
      font-weight: 900;
      padding: 14px 22px;
      border-radius: 16px;
      box-shadow: 0 6px 16px rgba(0, 85, 159, 0.22);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
    }

    /* ==========================================================================
       5. ZONA INFERIOR DIVIDIDA EN 2 ESPACIOS CLAROS + QR GRANDE (>= 160x160 px)
       ========================================================================== */
    .zone-bottom-spaces {
      position: relative;
      z-index: 2;
      margin: 14px 36px 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* Espacio A: Marco Normativo */
    .space-normative-bar {
      background: var(--elp-blue);
      border: 2px solid var(--elp-cyan);
      border-radius: 16px;
      padding: 11px 22px;
      display: flex;
      align-items: center;
      gap: 14px;
      box-shadow: 0 6px 14px rgba(0, 63, 112, 0.10);
    }

    .normative-bar-text {
      font-family: 'Nunito', sans-serif;
      font-size: 18.5px;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.25;
    }

    .normative-bar-text strong {
      color: #FFC000;
      font-weight: 900;
    }

    /* Espacio B: Orientación y Ayuda + QR Grande */
    .space-orientation-box {
      background: var(--elp-navy);
      border: 3px solid var(--elp-cyan);
      border-radius: 22px;
      padding: 18px 26px;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      box-shadow: 0 12px 26px rgba(0, 63, 112, 0.16);
    }

    .orientation-copy-col {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .orientation-kicker-pill {
      display: inline-flex;
      align-self: flex-start;
      background: #FFC000;
      color: var(--elp-navy);
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 900;
      padding: 5px 15px;
      border-radius: 999px;
      letter-spacing: 0.03em;
    }

    .orientation-cta-heading {
      font-family: 'Nunito', sans-serif;
      font-size: 25px;
      font-weight: 900;
      color: #FFFFFF;
      line-height: 1.18;
      letter-spacing: 0.01em;
    }

    .orientation-subtext {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 17.5px;
      font-weight: 600;
      color: #EBF3FA;
      line-height: 1.3;
    }

    .orientation-channels-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      margin-top: 2px;
    }

    .channel-chip-white {
      background: rgba(255, 255, 255, 0.14);
      border: 1.5px solid var(--elp-cyan);
      color: #FFFFFF;
      font-family: 'Nunito', sans-serif;
      font-size: 17px;
      font-weight: 800;
      padding: 7px 16px;
      border-radius: 12px;
    }

    .channel-chip-teal {
      background: #0D9488;
      color: #FFFFFF;
      font-family: 'Nunito', sans-serif;
      font-size: 17px;
      font-weight: 900;
      padding: 7px 16px;
      border-radius: 12px;
    }

    .qr-card-large-single {
      background: #FFFFFF;
      padding: 10px;
      border-radius: 18px;
      border: 2.5px solid var(--elp-ice);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
    }

    .orientation-qrs-dual {
      display: flex;
      align-items: center;
      gap: 14px;
      flex-shrink: 0;
    }

    .qr-card-large-dual {
      background: #FFFFFF;
      padding: 8px 10px;
      border-radius: 16px;
      border: 2px solid var(--elp-ice);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .qr-dual-label {
      font-family: 'Nunito', sans-serif;
      font-size: 16px;
      font-weight: 900;
      color: var(--elp-navy);
    }

    .qr-svg-holder {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ==========================================================================
       6. PIE INSTITUCIONAL FINAL
       ========================================================================== */
    .zone-footer {
      position: relative;
      z-index: 2;
    }

    .bicolor-ribbon-bottom {
      height: 60px;
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
    <svg class="canvas-bg-waves" viewBox="0 0 1080 1920" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-120 420 C 260 340, 720 520, 1200 390" stroke="#C4DAF1" stroke-width="2.5" stroke-opacity="0.55"/>
      <path d="M-120 1440 C 340 1320, 760 1540, 1200 1410" stroke="#C4DAF1" stroke-width="2.5" stroke-opacity="0.55"/>
    </svg>

    <!-- 1. CABECERA INSTITUCIONAL LIMPIA (SIN BANNER SUPERIOR) -->
    <header class="zone-header">
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

    <!-- 2. HERO PROTAGONISTA (TÍTULO + DESCRIPCIÓN ARRIBA, CATEGORÍA DEBAJO) -->
    <section class="zone-hero">
      <svg class="hero-orbital-deco" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="220" cy="140" r="140" stroke="#34B4E4" stroke-width="14"/>
        <circle cx="220" cy="140" r="95" stroke="#FFFFFF" stroke-width="6" stroke-dasharray="14 10"/>
      </svg>
      <h1 class="hero-title">${flyer.title}</h1>
      <p class="hero-key-concept">${flyer.key_concept}</p>
      <div class="hero-bottom-bar">
        <span class="hero-badge">${flyer.category_badge}</span>
      </div>
    </section>

    <!-- 3. TARJETAS COMPACTAS Y EQUILIBRADAS -->
    <section class="zone-cards">
      ${cardsHtml}
    </section>

    <!-- 4. BANNER DESTACADO DEBAJO DE LAS TARJETAS -->
    ${bannerHighlightHtml}

    <!-- 5. ZONA INFERIOR DIVIDIDA EN 2 ESPACIOS CLAROS + QR GRANDE -->
    ${bottomSpacesHtml}

    <!-- 6. PIE INSTITUCIONAL FINAL -->
    <footer class="zone-footer">
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

function generateAllFlyersV4() {
  const htmlDir = path.join(ROOT, 'templates', 'html_v4');
  const distV4Dir = path.join(ROOT, 'dist_v4');
  fs.mkdirSync(htmlDir, { recursive: true });
  fs.mkdirSync(distV4Dir, { recursive: true });

  const manifest = [];
  for (const flyer of flyers) {
    const html = buildFlyerHtml(flyer);
    const htmlFilename = `${flyer.slug}.html`;
    const htmlPath = path.join(htmlDir, htmlFilename);
    fs.writeFileSync(htmlPath, html, 'utf8');
    manifest.push({
      id: flyer.id,
      slug: flyer.slug,
      filename: flyer.filename || `${flyer.slug}.png`,
      htmlPath,
      pngPath: path.join(distV4Dir, flyer.filename || `${flyer.slug}.png`)
    });
  }
  console.log(`Generated ${manifest.length} V4.0 (obs02) HTML templates in ${htmlDir}`);
  return manifest;
}

if (require.main === module) {
  generateAllFlyersV4();
}

module.exports = { generateAllFlyersV4 };
