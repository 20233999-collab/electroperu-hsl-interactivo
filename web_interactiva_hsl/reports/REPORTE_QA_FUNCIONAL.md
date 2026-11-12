# Reporte Técnico de Pruebas Funcionales End-to-End (QA)

**Proyecto:** Campaña Interactiva de Prevención del HSL — ELECTROPERU S.A.  
**Ruta probada:** `/home/laptop/Documentos/TRD_serviciocapa/web_interactiva_hsl/index.html`  
**Entorno de prueba:** Chromium (Playwright MCP) contra servidor HTTP local temporal (`python3 -m http.server 8765`, detenido al finalizar)  
**Viewports evaluados:** Desktop (`1440×900`) y Móvil (`390×844`)

---

## Resumen Ejecutivo

Todas las pruebas funcionales end-to-end aprobaron satisfactoriamente (**PASS**). Se detectó y corrigió un error menor de recurso faltante (`404 /favicon.ico`) agregando `<link rel="icon" type="image/png" href="assets/logo_electroperu_oficial_v3.png">` en `index.html`, tras lo cual la recarga completa verificó **0 errores de consola** y **0 peticiones HTTP fallidas**.

---

## Resultados Detallados por Suite

| # | Caso de Prueba | Resultado | Evidencia / Detalles Observados |
|---|---|---|---|
| 1 | **Carga inicial y cero errores** | **PASS** (tras fix) | Inicialmente se detectó `404` en `/favicon.ico`. Tras añadir `<link rel="icon">` en `index.html`, la recarga arrojó `0` errores de consola, `0` warnings y `0` recursos con `status >= 400`. |
| 2 | **Integridad y proporción de logotipo (`logo_electroperu_oficial_v3.png`)** | **PASS** | Tamaño natural `860×586` (ratio `1.468`). En header (`.app-logo`): `96×65.41` (ratio `1.468`, ~`0.01%` redondeo). En flyer (`.flyer-header-logo`): `128×87.2` (ratio `1.468`, ~`0.02%` redondeo). `naturalWidth > 0`. |
| 3 | **Navegación por los 10 Flyers (botones, barra, sidebar, teclado)** | **PASS** | - `#btn-next` / `#btn-prev`: transiciones `01 / 10` → `02 / 10` → `03 / 10` → `02 / 10`.<br>- Teclado `ArrowRight` / `ArrowLeft`: transiciones `02 / 10` → `04 / 10` → `03 / 10`.<br>- `#stories-bar` (segmento 6): saltó a `06 / 10`.<br>- `#sidebar-list` (ítem 10): saltó a `10 / 10`.<br>- Contador `#flyer-counter` y barra `#progress-text` (`1 / 10 vistos` hasta `6 / 10 vistos` durante el recorrido) actualizados correctamente.<br>- Flyer 03: renderiza `.flyer-grid-horizontal` con `3` tarjetas `.flyer-card`.<br>- Flyer 10: renderiza los `2` códigos QR (`qrBoxes: 3` contenedor + 2 tarjetas QR). |
| 4 | **Interactividad de Tarjetas y Modales (`#detail-modal`)** | **PASS** | Clic en `.flyer-card[data-section-index="0"]` del Flyer 01 abrió `#detail-modal` (`hidden` removido, `display: flex`) con título (`Conducta No Deseada`), explicación práctica, ejemplo cotidiano, regla clave y base legal (`Art. 4 de la Ley N° 27942 • Art. 6 del D.S. N° 014-2019-MIMP`). Cierre verificado tanto con botón `#btn-close-detail` (`X`) como con tecla `Escape`. |
| 5 | **Selector de Sedes (`#sede-selector`)** | **PASS** | Cambio entre `lima` (`SEDE LIMA — Sede Central Lima`), `mantaro` (`SEDE MANTARO — Complejo Hidroeléctrico del Mantaro`), `tumbes` (`SEDE TUMBES — Sede Tumbes (Central Térmica)`) y `todas` (`COBERTURA 360° — Todas las Sedes (Cobertura Nacional)`). `#sede-info-card` actualizó badge, título, canal y cobertura en cada selección. |
| 6 | **Descarga PNG y Enlaces Externos** | **PASS** | `#btn-download-png` actualiza dinámicamente `href` y atributo `download` por flyer. Verificación `HEAD` a los `10` archivos en `assets/flyers/flyer_01_*.png` … `flyer_10_*.png` devolvió `HTTP 200` en los 10 casos. Enlaces `https://aliada.sunafil.gob.pe/` y `tel:1819` presentes en DOM. |
| 7 | **Mini-Quiz Interactivo (`#quiz-modal`)** | **PASS** | `#btn-open-quiz` abrió `#quiz-modal` (`Pregunta 1 de 5`). Al responder la Pregunta 1 se mostró feedback inmediato (`.quiz-feedback`). Se completaron las 5 preguntas hasta la pantalla de `Resultado final` (`1 / 5`, `20% de aciertos`). Clic en `#btn-restart-quiz` reinició correctamente a `Pregunta 1 de 5`. |
| 8 | **Responsividad Móvil (`390×844`)** | **PASS** | En `390×844` sobre Flyer 01: `scrollWidth === 390` (`innerWidth === 390`), `0` desbordamiento horizontal. |

---

## Capturas de Pantalla Generadas

Guardadas en `/home/laptop/Documentos/TRD_serviciocapa/web_interactiva_hsl/reports/screenshots/`:

- `01_desktop_flyer01.png` (`1440×900`)
- `02_desktop_flyer03.png` (`1440×900`)
- `03_desktop_modal_detalle.png` (`1440×900`)
- `04_desktop_quiz.png` (`1440×900`)
- `05_desktop_flyer10.png` (`1440×900`)
- `06_mobile_flyer01.png` (`390×844`)

---

## Corrección Aplicada

- **Archivo:** `/home/laptop/Documentos/TRD_serviciocapa/web_interactiva_hsl/index.html`
- **Cambio:** Se añadió `<link rel="icon" type="image/png" href="assets/logo_electroperu_oficial_v3.png">` dentro de `<head>` para eliminar el error `404 /favicon.ico` en consola del navegador.
