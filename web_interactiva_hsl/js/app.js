// Lógica interactiva de la Campaña de Prevención del HSL - ELECTROPERU S.A.
(function () {
  'use strict';

  const DATA = window.HSL_DATA;
  if (!DATA || !Array.isArray(DATA.flyers) || DATA.flyers.length === 0) {
    console.error('HSL_DATA no está disponible o está vacío.');
    return;
  }

  const STORAGE_KEYS = {
    viewed: 'electroperu_hsl_viewed_v3',
    activeIndex: 'electroperu_hsl_active_idx_v3',
    sede: 'electroperu_hsl_sede_v3'
  };

  const state = {
    activeIndex: 0,
    viewedIds: new Set(['01']),
    selectedSede: 'todas',
    lastFocusedElement: null,
    directionTimer: null,
    quiz: {
      currentQuestion: 0,
      score: 0,
      answered: false,
      selectedOption: null,
      finished: false
    }
  };

  // Referencias DOM
  const dom = {
    sedeSelector: document.getElementById('sede-selector'),
    sedeInfoBadge: document.getElementById('sede-info-badge'),
    sedeInfoTitle: document.getElementById('sede-info-title'),
    sedeInfoChannel: document.getElementById('sede-info-channel'),
    sedeInfoCoverage: document.getElementById('sede-info-coverage'),
    progressText: document.getElementById('progress-text'),
    progressFill: document.getElementById('progress-fill'),
    progressBarAria: document.getElementById('progress-bar-aria'),
    sidebarSearch: document.getElementById('sidebar-search'),
    sidebarList: document.getElementById('sidebar-list'),
    sidebarEmpty: document.getElementById('sidebar-empty'),
    storiesBar: document.getElementById('stories-bar'),
    viewerStage: document.getElementById('viewer-stage'),
    flyerCanvas: document.getElementById('flyer-canvas'),
    flyerCounter: document.getElementById('flyer-counter'),
    btnPrev: document.getElementById('btn-prev'),
    btnNext: document.getElementById('btn-next'),
    btnDownloadPng: document.getElementById('btn-download-png'),
    btnFullscreen: document.getElementById('btn-fullscreen'),
    detailModal: document.getElementById('detail-modal'),
    btnCloseDetail: document.getElementById('btn-close-detail'),
    modalIcon: document.getElementById('modal-icon'),
    modalBadge: document.getElementById('modal-badge'),
    modalTitle: document.getElementById('modal-title'),
    modalExplanation: document.getElementById('modal-explanation'),
    modalExample: document.getElementById('modal-example'),
    modalKeyRule: document.getElementById('modal-key-rule'),
    modalLegalRef: document.getElementById('modal-legal-ref'),
    btnOpenQuiz: document.getElementById('btn-open-quiz'),
    quizModal: document.getElementById('quiz-modal'),
    btnCloseQuiz: document.getElementById('btn-close-quiz'),
    quizProgressLabel: document.getElementById('quiz-progress-label'),
    quizBody: document.getElementById('quiz-body')
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeText(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function loadPersistedState() {
    try {
      const savedViewed = localStorage.getItem(STORAGE_KEYS.viewed);
      if (savedViewed) {
        const parsed = JSON.parse(savedViewed);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.viewedIds = new Set(parsed);
        }
      }
      const savedIdx = localStorage.getItem(STORAGE_KEYS.activeIndex);
      if (savedIdx !== null) {
        const idx = parseInt(savedIdx, 10);
        if (!Number.isNaN(idx) && idx >= 0 && idx < DATA.flyers.length) {
          state.activeIndex = idx;
        }
      }
      const savedSede = localStorage.getItem(STORAGE_KEYS.sede);
      if (savedSede && DATA.sedes[savedSede]) {
        state.selectedSede = savedSede;
      }
    } catch (_err) {
      // Ignorar errores de almacenamiento en modos privados restringidos
    }
    const activeFlyer = DATA.flyers[state.activeIndex];
    if (activeFlyer) {
      state.viewedIds.add(activeFlyer.id);
    }
  }

  function savePersistedState() {
    try {
      localStorage.setItem(STORAGE_KEYS.viewed, JSON.stringify(Array.from(state.viewedIds)));
      localStorage.setItem(STORAGE_KEYS.activeIndex, String(state.activeIndex));
      localStorage.setItem(STORAGE_KEYS.sede, state.selectedSede);
    } catch (_err) {
      // Ignorar errores de almacenamiento
    }
  }

  function renderSedeInfo() {
    const sede = DATA.sedes[state.selectedSede] || DATA.sedes.todas;
    if (dom.sedeSelector) {
      dom.sedeSelector.value = sede.id;
    }
    if (dom.sedeInfoBadge) {
      dom.sedeInfoBadge.textContent = sede.id === 'todas' ? 'COBERTURA 360°' : `SEDE ${sede.shortName.toUpperCase()}`;
    }
    if (dom.sedeInfoTitle) dom.sedeInfoTitle.textContent = sede.name;
    if (dom.sedeInfoChannel) dom.sedeInfoChannel.textContent = sede.channel;
    if (dom.sedeInfoCoverage) dom.sedeInfoCoverage.textContent = sede.coverage;
  }

  function renderProgress() {
    const total = DATA.flyers.length;
    const viewedCount = state.viewedIds.size;
    const pct = Math.round((viewedCount / total) * 100);

    if (dom.progressText) {
      dom.progressText.textContent = `${viewedCount} / ${total} vistos`;
    }
    if (dom.progressFill) {
      dom.progressFill.style.width = `${pct}%`;
    }
    if (dom.progressBarAria) {
      dom.progressBarAria.setAttribute('aria-valuenow', String(viewedCount));
    }
  }

  function renderSidebarOnce() {
    if (!dom.sidebarList) return;
    const html = DATA.flyers
      .map((flyer, idx) => {
        const searchIndex = normalizeText(
          `${flyer.id} ${flyer.title} ${flyer.subtitle} ${flyer.category_badge} ${
            (flyer.highlight_box && flyer.highlight_box.law_reference) || ''
          }`
        );
        return `
          <li class="sidebar-item" data-search="${escapeHtml(searchIndex)}">
            <button
              type="button"
              class="sidebar-btn"
              data-flyer-index="${idx}"
              aria-current="false"
            >
              <span class="sidebar-num">${escapeHtml(flyer.id)}</span>
              <span class="sidebar-label">${escapeHtml(flyer.title)}</span>
              <span class="sidebar-status status-pending">Pendiente</span>
            </button>
          </li>
        `;
      })
      .join('');
    dom.sidebarList.innerHTML = html;
  }

  function renderStoriesOnce() {
    if (!dom.storiesBar) return;
    const html = DATA.flyers
      .map((flyer, idx) => {
        return `
          <button
            type="button"
            class="story-segment"
            data-flyer-index="${idx}"
            role="tab"
            aria-selected="false"
            aria-label="Ir al flyer ${escapeHtml(flyer.id)}: ${escapeHtml(flyer.title)}"
            title="${escapeHtml(flyer.id)} • ${escapeHtml(flyer.title)}"
          >
            <span class="story-segment-fill"></span>
          </button>
        `;
      })
      .join('');
    dom.storiesBar.innerHTML = html;
  }

  function updateNavigationUI() {
    if (dom.sidebarList) {
      const sidebarBtns = dom.sidebarList.querySelectorAll('.sidebar-btn[data-flyer-index]');
      sidebarBtns.forEach((btn) => {
        const idx = parseInt(btn.getAttribute('data-flyer-index'), 10);
        const flyer = DATA.flyers[idx];
        if (!flyer) return;
        const isActive = idx === state.activeIndex;
        const isViewed = state.viewedIds.has(flyer.id);

        btn.classList.toggle('is-active', isActive);
        btn.classList.toggle('is-viewed', isViewed);
        btn.setAttribute('aria-current', isActive ? 'step' : 'false');

        const statusEl = btn.querySelector('.sidebar-status');
        if (statusEl) {
          statusEl.classList.remove('status-active', 'status-viewed', 'status-pending');
          if (isActive) {
            statusEl.textContent = 'Activo';
            statusEl.classList.add('status-active');
          } else if (isViewed) {
            statusEl.textContent = 'Visto';
            statusEl.classList.add('status-viewed');
          } else {
            statusEl.textContent = 'Pendiente';
            statusEl.classList.add('status-pending');
          }
        }
      });
    }

    if (dom.storiesBar) {
      const storyBtns = dom.storiesBar.querySelectorAll('.story-segment[data-flyer-index]');
      storyBtns.forEach((btn) => {
        const idx = parseInt(btn.getAttribute('data-flyer-index'), 10);
        const flyer = DATA.flyers[idx];
        if (!flyer) return;
        const isActive = idx === state.activeIndex;
        const isViewed = state.viewedIds.has(flyer.id);

        btn.classList.toggle('is-active', isActive);
        btn.classList.toggle('is-viewed', isViewed);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }
  }

  function filterSidebar(query) {
    if (!dom.sidebarList) return;
    const normalizedQuery = normalizeText(query).trim();
    const items = dom.sidebarList.querySelectorAll('.sidebar-item');
    let visibleCount = 0;

    items.forEach((item) => {
      const haystack = item.getAttribute('data-search') || '';
      const matches = !normalizedQuery || haystack.includes(normalizedQuery);
      item.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    if (dom.sidebarEmpty) {
      dom.sidebarEmpty.hidden = visibleCount > 0;
    }
  }

  function renderToolbar(flyer) {
    const total = DATA.flyers.length;
    if (dom.flyerCounter) {
      dom.flyerCounter.textContent = `${flyer.id} / ${String(total).padStart(2, '0')}`;
    }
    if (dom.btnPrev) {
      dom.btnPrev.disabled = state.activeIndex === 0;
    }
    if (dom.btnNext) {
      dom.btnNext.disabled = state.activeIndex === total - 1;
    }
    if (dom.btnDownloadPng) {
      dom.btnDownloadPng.href = `assets/flyers/${flyer.filename}`;
      dom.btnDownloadPng.setAttribute('download', flyer.filename);
    }
  }

  function applyDirectionalTransition(direction) {
    if (!dom.flyerCanvas || !direction) return;
    if (state.directionTimer) {
      clearTimeout(state.directionTimer);
      state.directionTimer = null;
    }
    dom.flyerCanvas.classList.remove('dir-next', 'dir-prev');
    void dom.flyerCanvas.offsetWidth;
    const cls = direction === 'next' ? 'dir-next' : 'dir-prev';
    dom.flyerCanvas.classList.add(cls);
    state.directionTimer = setTimeout(() => {
      if (dom.flyerCanvas) {
        dom.flyerCanvas.classList.remove('dir-next', 'dir-prev');
      }
      state.directionTimer = null;
    }, 360);
  }

  function renderFlyerCanvas(flyer, direction) {
    if (!dom.flyerCanvas) return;

    const isHorizontalFlow = flyer.infographic_type === 'hierarchy_flow' || flyer.sections.length === 3;
    const gridClass = isHorizontalFlow ? 'flyer-grid-horizontal' : 'flyer-grid-2x2';
    const sede = DATA.sedes[state.selectedSede] || DATA.sedes.todas;
    const showSedeBanner = sede.id !== 'todas';

    const cardsHtml = flyer.sections
      .map((sec, idx) => {
        const iconSvg = DATA.icons[sec.icon_concept] || '';
        const badgeText = sec.metric_or_badge || sec.tag;
        return `
          <button
            type="button"
            class="flyer-card ${isHorizontalFlow ? 'flyer-card-horizontal' : ''}"
            data-section-index="${idx}"
            aria-label="Ver detalle legal y ejemplo de ${escapeHtml(sec.heading)}"
          >
            <div class="flyer-card-top">
              <div class="flyer-card-icon" aria-hidden="true">${iconSvg}</div>
              <span class="flyer-card-badge">${escapeHtml(badgeText)}</span>
            </div>
            <div class="flyer-card-content">
              <h3 class="flyer-card-heading">${escapeHtml(sec.heading)}</h3>
              <p class="flyer-card-body">${escapeHtml(sec.body)}</p>
            </div>
            <div class="flyer-card-footer">
              <span class="flyer-card-law">${escapeHtml(sec.footer_label)}</span>
              <span class="flyer-card-cta">Ver detalle +</span>
            </div>
          </button>
        `;
      })
      .join('');

    const qrSvg = DATA.qr_svgs && DATA.qr_svgs.aliada ? DATA.qr_svgs.aliada : '';
    const qrLeySvg = DATA.qr_svgs && DATA.qr_svgs.ley27942 ? DATA.qr_svgs.ley27942 : '';
    const qrElectroSvg = DATA.qr_svgs && DATA.qr_svgs.electroperu ? DATA.qr_svgs.electroperu : '';
    const aliadaFallbackUrl = 'https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual';
    const normativeUrl = (flyer.highlight_box && flyer.highlight_box.normative_link) || aliadaFallbackUrl;
    const isDualQr = flyer.id === '10' && Boolean(qrLeySvg);
    const isFlyer07Electro = flyer.id === '07' && Boolean(qrElectroSvg);

    let qrBlockHtml = '';
    if (isDualQr) {
      qrBlockHtml = `
        <div class="flyer-qr-pair">
          <a
            href="${escapeHtml(normativeUrl)}"
            target="_blank"
            rel="noopener noreferrer"
            class="flyer-qr-link"
            title="Abrir Plataforma ALIADA de SUNAFIL"
            aria-label="Abrir Plataforma ALIADA de SUNAFIL en nueva pestaña"
          >
            <div class="flyer-qr-box">${qrSvg}</div>
            <span class="flyer-qr-caption">ALIADA SUNAFIL ↗</span>
          </a>
          <a
            href="https://www.gob.pe/institucion/mimp/normas-legales/285411-014-2019-mimp"
            target="_blank"
            rel="noopener noreferrer"
            class="flyer-qr-link"
            title="Consultar Ley N° 27942 y D.S. N° 014-2019-MIMP"
            aria-label="Consultar Ley N° 27942 y D.S. N° 014-2019-MIMP en nueva pestaña"
          >
            <div class="flyer-qr-box">${qrLeySvg}</div>
            <span class="flyer-qr-caption">LEY N° 27942 ↗</span>
          </a>
        </div>
      `;
    } else if (isFlyer07Electro) {
      qrBlockHtml = `
        <a
          href="https://www.gob.pe/institucion/electroperu/campa%C3%B1as/40531-juntos-contra-el-hostigamiento-tu-voz-importa"
          target="_blank"
          rel="noopener noreferrer"
          class="flyer-qr-link"
          title="Abrir campaña Juntos contra el Hostigamiento - ELECTROPERU S.A."
          aria-label="Abrir formato de denuncia y campaña ELECTROPERU S.A. en nueva pestaña"
        >
          <div class="flyer-qr-box">${qrElectroSvg}</div>
          <span class="flyer-qr-caption">FORMATO DENUNCIA ↗</span>
        </a>
      `;
    } else {
      qrBlockHtml = `
        <a
          href="${escapeHtml(normativeUrl)}"
          target="_blank"
          rel="noopener noreferrer"
          class="flyer-qr-link"
          title="Abrir Plataforma ALIADA de SUNAFIL"
          aria-label="Abrir Plataforma ALIADA de SUNAFIL en nueva pestaña"
        >
          <div class="flyer-qr-box">${qrSvg}</div>
          <span class="flyer-qr-caption">ALIADA SUNAFIL ↗</span>
        </a>
      `;
    }

    const bannerHighlight = flyer.banner_highlight || flyer.highlight_box || {};
    const bannerCtaLabel = flyer.cta_button_label || bannerHighlight.cta_button_label || '';
    const bannerCtaUrl = bannerHighlight.normative_link || normativeUrl;
    const normativeBannerText =
      flyer.normative_banner || (flyer.highlight_box && flyer.highlight_box.law_reference) || '';
    const qrCtaText = flyer.qr_cta_text || 'ESCANEA Y CONOCE LOS CANALES DE ORIENTACIÓN';
    const orientationText = flyer.orientation_banner || flyer.cta_footer || '';

    dom.flyerCanvas.innerHTML = `
      <div class="flyer-ribbon-top" aria-hidden="true"></div>

      <header class="flyer-header">
        <div class="flyer-header-logo-wrap">
          <picture>
            <source srcset="assets/logo_electroperu_web.webp" type="image/webp">
            <img src="assets/logo_electroperu_oficial_v3.png" alt="ELECTROPERU S.A." class="flyer-header-logo" width="128" height="87" decoding="async">
          </picture>
        </div>
      </header>

      <div class="flyer-hero">
        <h2 class="flyer-hero-title">${escapeHtml(flyer.title)}</h2>
        <p class="flyer-hero-subtitle">${escapeHtml(flyer.subtitle)}</p>
        <div class="flyer-key-concept">
          <span class="flyer-key-concept-tag">IDEA FUERZA</span>
          <p class="flyer-key-concept-text">${escapeHtml(flyer.key_concept)}</p>
        </div>
        ${
          showSedeBanner
            ? `<div class="flyer-sede-pill">
                <strong>${escapeHtml(sede.name)}:</strong> ${escapeHtml(sede.channel)}
              </div>`
            : ''
        }
        <span class="flyer-category-badge">${escapeHtml(flyer.category_badge)}</span>
      </div>

      <div class="flyer-sections ${gridClass}">
        ${cardsHtml}
      </div>

      <div class="flyer-banner-highlight">
        <div class="flyer-banner-highlight-body">
          ${bannerHighlight.label ? `<span class="flyer-banner-label">${escapeHtml(bannerHighlight.label)}</span>` : ''}
          <h3>${escapeHtml(bannerHighlight.title || '')}</h3>
          <p>${escapeHtml(bannerHighlight.text || bannerHighlight.body || '')}</p>
        </div>
        ${
          bannerCtaLabel
            ? `<a href="${escapeHtml(bannerCtaUrl)}" target="_blank" rel="noopener noreferrer" class="flyer-cta-btn">${escapeHtml(bannerCtaLabel)}</a>`
            : ''
        }
      </div>

      <div class="flyer-normative-bar">
        <span>${escapeHtml(normativeBannerText)}</span>
      </div>

      <div class="flyer-highlight">
        <div class="flyer-highlight-content">
          <span class="flyer-highlight-label">ORIENTACIÓN Y AYUDA</span>
          <h3 class="flyer-highlight-title">${escapeHtml(qrCtaText)}</h3>
          <p class="flyer-highlight-text">${escapeHtml(orientationText)}</p>
          <div class="flyer-highlight-actions">
            <a href="tel:1819" class="flyer-tel-link" title="Llamar a la Línea Gratuita 1819 del MTPE">
              Línea Gratuita 1819
            </a>
          </div>
        </div>
        ${qrBlockHtml}
      </div>

      <footer class="flyer-ribbon-bottom">
        <a href="https://www.gob.pe/electroperu" target="_blank" rel="noopener noreferrer" class="flyer-footer-url">www.gob.pe/electroperu</a>
        <div class="flyer-footer-org">
          <span class="flyer-footer-subgerencia">Subgerencia de Gestión Humana</span>
          <span class="flyer-footer-gerencia">Gerencia de Administración y Finanzas</span>
        </div>
      </footer>
    `;

    applyDirectionalTransition(direction);
  }

  function renderActiveFlyer(direction) {
    const flyer = DATA.flyers[state.activeIndex];
    if (!flyer) return;

    state.viewedIds.add(flyer.id);
    savePersistedState();

    renderProgress();
    updateNavigationUI();
    renderToolbar(flyer);
    renderFlyerCanvas(flyer, direction);
  }

  function goToFlyer(index) {
    if (index < 0 || index >= DATA.flyers.length || index === state.activeIndex) return;
    const direction = index > state.activeIndex ? 'next' : 'prev';
    state.activeIndex = index;
    renderActiveFlyer(direction);
  }

  // Accesibilidad: Focus Trap y retorno de foco en modales
  function getFocusableElements(container) {
    if (!container) return [];
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    return Array.from(container.querySelectorAll(selector)).filter(
      (el) => !el.hidden && el.offsetParent !== null
    );
  }

  function trapFocus(e, modalEl) {
    if (e.key !== 'Tab' || !modalEl || modalEl.hidden) return;
    const focusables = getFocusableElements(modalEl);
    if (focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first || !modalEl.contains(document.activeElement)) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last || !modalEl.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    }
  }

  function restoreLastFocus() {
    if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === 'function') {
      state.lastFocusedElement.focus();
    }
    state.lastFocusedElement = null;
  }

  function openDetailModal(sectionIndex) {
    const flyer = DATA.flyers[state.activeIndex];
    if (!flyer || !flyer.sections[sectionIndex]) return;
    const sec = flyer.sections[sectionIndex];
    const detail = sec.interactive_detail || {};

    state.lastFocusedElement = document.activeElement;

    if (dom.modalIcon) dom.modalIcon.innerHTML = DATA.icons[sec.icon_concept] || '';
    if (dom.modalBadge) dom.modalBadge.textContent = sec.metric_or_badge || sec.tag;
    if (dom.modalTitle) dom.modalTitle.textContent = sec.heading;
    if (dom.modalExplanation) dom.modalExplanation.textContent = detail.explanation || sec.body;
    if (dom.modalExample) dom.modalExample.textContent = detail.example || '';
    if (dom.modalKeyRule) dom.modalKeyRule.textContent = detail.key_rule || '';
    if (dom.modalLegalRef) dom.modalLegalRef.textContent = detail.legal_ref || flyer.highlight_box.law_reference;

    if (dom.detailModal) {
      dom.detailModal.hidden = false;
      document.body.classList.add('modal-open');
      if (dom.btnCloseDetail) dom.btnCloseDetail.focus();
    }
  }

  function closeDetailModal() {
    if (dom.detailModal && !dom.detailModal.hidden) {
      dom.detailModal.hidden = true;
      document.body.classList.remove('modal-open');
      restoreLastFocus();
    }
  }

  function resetQuizState() {
    state.quiz = {
      currentQuestion: 0,
      score: 0,
      answered: false,
      selectedOption: null,
      finished: false
    };
  }

  function renderQuiz() {
    if (!dom.quizBody) return;
    const questions = DATA.quiz || [];
    const total = questions.length;

    if (state.quiz.finished) {
      const score = state.quiz.score;
      const pct = Math.round((score / total) * 100);
      let feedbackTitle = '¡Buen repaso! Sigue fortaleciendo tu conocimiento.';
      if (score === total) {
        feedbackTitle = '¡Excelente! Dominas la normativa de prevención del HSL.';
      } else if (score >= 4) {
        feedbackTitle = '¡Muy bien! Conoces los pilares clave de la Ley N° 27942.';
      }

      if (dom.quizProgressLabel) {
        dom.quizProgressLabel.textContent = 'Resultado final';
      }

      dom.quizBody.innerHTML = `
        <div class="quiz-result">
          <div class="quiz-score-badge">${score} / ${total}</div>
          <p class="quiz-score-pct">${pct}% de aciertos</p>
          <h3 class="quiz-result-title">${escapeHtml(feedbackTitle)}</h3>
          <p class="quiz-result-desc">
            Recuerda que en ELECTROPERU S.A. (Lima, Mantaro y Tumbes) aplicamos tolerancia cero frente al hostigamiento sexual laboral.
          </p>
          <div class="quiz-result-actions">
            <button type="button" id="btn-restart-quiz" class="btn btn-quiz">Reiniciar Quiz</button>
            <button type="button" id="btn-finish-quiz" class="btn btn-nav">Cerrar</button>
          </div>
        </div>
      `;
      return;
    }

    const q = questions[state.quiz.currentQuestion];
    if (!q) return;

    if (dom.quizProgressLabel) {
      dom.quizProgressLabel.textContent = `Pregunta ${state.quiz.currentQuestion + 1} de ${total}`;
    }

    const optionsHtml = q.options
      .map((opt, idx) => {
        let extraClass = '';
        if (state.quiz.answered) {
          if (idx === q.correctIndex) {
            extraClass = 'is-correct';
          } else if (idx === state.quiz.selectedOption) {
            extraClass = 'is-wrong';
          }
        }
        return `
          <button
            type="button"
            class="quiz-option ${extraClass}"
            data-option-index="${idx}"
            ${state.quiz.answered ? 'disabled' : ''}
          >
            <span class="quiz-option-letter">${String.fromCharCode(65 + idx)}</span>
            <span class="quiz-option-text">${escapeHtml(opt)}</span>
          </button>
        `;
      })
      .join('');

    const isCorrectSelection = state.quiz.selectedOption === q.correctIndex;
    const feedbackHtml = state.quiz.answered
      ? `
        <div class="quiz-feedback ${isCorrectSelection ? 'is-correct' : 'is-wrong'}">
          <strong>${isCorrectSelection ? '¡Respuesta correcta!' : 'Respuesta incorrecta'}</strong>
          <p>${escapeHtml(q.explanation)}</p>
        </div>
        <div class="quiz-next-wrap">
          <button type="button" id="btn-quiz-next" class="btn btn-quiz">
            ${state.quiz.currentQuestion === total - 1 ? 'Ver resultado final' : 'Siguiente pregunta →'}
          </button>
        </div>
      `
      : '';

    dom.quizBody.innerHTML = `
      <div class="quiz-question-block">
        <h3 class="quiz-question-text">${escapeHtml(q.question)}</h3>
        <div class="quiz-options-list">
          ${optionsHtml}
        </div>
        ${feedbackHtml}
      </div>
    `;
  }

  function openQuizModal() {
    state.lastFocusedElement = document.activeElement;
    resetQuizState();
    renderQuiz();
    if (dom.quizModal) {
      dom.quizModal.hidden = false;
      document.body.classList.add('modal-open');
      if (dom.btnCloseQuiz) dom.btnCloseQuiz.focus();
    }
  }

  function closeQuizModal() {
    if (dom.quizModal && !dom.quizModal.hidden) {
      dom.quizModal.hidden = true;
      document.body.classList.remove('modal-open');
      restoreLastFocus();
    }
  }

  function toggleFullscreen() {
    const target = dom.viewerStage || document.documentElement;
    if (!document.fullscreenElement) {
      if (target.requestFullscreen) {
        target.requestFullscreen().catch(() => {});
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }

  function bindEvents() {
    // Cambio de sede
    if (dom.sedeSelector) {
      dom.sedeSelector.addEventListener('change', (e) => {
        const val = e.target.value;
        if (DATA.sedes[val]) {
          state.selectedSede = val;
          renderSedeInfo();
          renderActiveFlyer(null);
        }
      });
    }

    // Buscador en tiempo real del sidebar
    if (dom.sidebarSearch) {
      dom.sidebarSearch.addEventListener('input', (e) => {
        filterSidebar(e.target.value);
      });
    }

    // Navegación desde sidebar, barra de stories, tarjetas y quiz
    document.addEventListener('click', (e) => {
      const navBtn = e.target.closest('[data-flyer-index]');
      if (navBtn) {
        const idx = parseInt(navBtn.getAttribute('data-flyer-index'), 10);
        if (!Number.isNaN(idx)) {
          goToFlyer(idx);
        }
        return;
      }

      const cardBtn = e.target.closest('.flyer-card[data-section-index]');
      if (cardBtn) {
        const secIdx = parseInt(cardBtn.getAttribute('data-section-index'), 10);
        if (!Number.isNaN(secIdx)) {
          openDetailModal(secIdx);
        }
        return;
      }

      const quizOpt = e.target.closest('.quiz-option[data-option-index]');
      if (quizOpt && !state.quiz.answered) {
        const optIdx = parseInt(quizOpt.getAttribute('data-option-index'), 10);
        const currentQ = DATA.quiz[state.quiz.currentQuestion];
        if (!Number.isNaN(optIdx) && currentQ) {
          state.quiz.answered = true;
          state.quiz.selectedOption = optIdx;
          if (optIdx === currentQ.correctIndex) {
            state.quiz.score += 1;
          }
          renderQuiz();
        }
        return;
      }

      if (e.target.id === 'btn-quiz-next') {
        if (state.quiz.currentQuestion < DATA.quiz.length - 1) {
          state.quiz.currentQuestion += 1;
          state.quiz.answered = false;
          state.quiz.selectedOption = null;
        } else {
          state.quiz.finished = true;
        }
        renderQuiz();
        return;
      }

      if (e.target.id === 'btn-restart-quiz') {
        resetQuizState();
        renderQuiz();
        return;
      }

      if (e.target.id === 'btn-finish-quiz') {
        closeQuizModal();
      }
    });

    if (dom.btnPrev) {
      dom.btnPrev.addEventListener('click', () => goToFlyer(state.activeIndex - 1));
    }
    if (dom.btnNext) {
      dom.btnNext.addEventListener('click', () => goToFlyer(state.activeIndex + 1));
    }
    if (dom.btnFullscreen) {
      dom.btnFullscreen.addEventListener('click', toggleFullscreen);
    }

    // Modales
    if (dom.btnCloseDetail) {
      dom.btnCloseDetail.addEventListener('click', closeDetailModal);
    }
    if (dom.detailModal) {
      dom.detailModal.addEventListener('click', (e) => {
        if (e.target === dom.detailModal) closeDetailModal();
      });
    }
    if (dom.btnOpenQuiz) {
      dom.btnOpenQuiz.addEventListener('click', openQuizModal);
    }
    if (dom.btnCloseQuiz) {
      dom.btnCloseQuiz.addEventListener('click', closeQuizModal);
    }
    if (dom.quizModal) {
      dom.quizModal.addEventListener('click', (e) => {
        if (e.target === dom.quizModal) closeQuizModal();
      });
    }

    // Navegación por teclado y Focus Trap en modales
    document.addEventListener('keydown', (e) => {
      const detailOpen = dom.detailModal && !dom.detailModal.hidden;
      const quizOpen = dom.quizModal && !dom.quizModal.hidden;

      if (e.key === 'Escape') {
        if (detailOpen) closeDetailModal();
        if (quizOpen) closeQuizModal();
        return;
      }

      if (detailOpen) {
        trapFocus(e, dom.detailModal);
        return;
      }
      if (quizOpen) {
        trapFocus(e, dom.quizModal);
        return;
      }

      const tag = e.target && e.target.tagName;
      if (tag === 'SELECT' || tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToFlyer(state.activeIndex - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToFlyer(state.activeIndex + 1);
      }
    });

    // Gestos swipe táctiles en el visor del flyer
    if (dom.flyerCanvas) {
      let touchStartX = 0;
      let touchStartY = 0;

      dom.flyerCanvas.addEventListener(
        'touchstart',
        (e) => {
          if (e.changedTouches && e.changedTouches.length > 0) {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
          }
        },
        { passive: true }
      );

      dom.flyerCanvas.addEventListener(
        'touchend',
        (e) => {
          if (e.changedTouches && e.changedTouches.length > 0) {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > 55 && Math.abs(dy) < 60) {
              if (dx < 0) {
                goToFlyer(state.activeIndex + 1);
              } else {
                goToFlyer(state.activeIndex - 1);
              }
            }
          }
        },
        { passive: true }
      );
    }
  }

  function init() {
    loadPersistedState();
    renderSedeInfo();
    renderSidebarOnce();
    renderStoriesOnce();
    bindEvents();
    renderActiveFlyer(null);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
