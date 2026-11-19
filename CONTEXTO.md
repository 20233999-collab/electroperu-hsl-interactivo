# CONTEXTO DEL PROYECTO: FLYERS INFOGRÁFICOS HSL - ELECTROPERU S.A. (v3.1 FINAL + PPTX EDITABLE + WEB v2.2)

> **Propósito de este documento:** Este archivo permite a cualquier agente de IA o desarrollador retomar el trabajo exactamente en el punto donde se dejó, comprendiendo el contexto institucional, los insumos base, la evolución a través de las **iteraciones hasta la v3.1 definitiva (con PPTX editable y QRs HTTP 200)** y la **Web Interactiva v2.2**, los estándares técnicos y la ubicación de todos los entregables.

---

## 1. Resumen Ejecutivo del Proyecto (Iteraciones 1.0, 2.0 y 3.0)
Se diseñó, redactó, ensambló y auditó una colección de **10 infografías verticales en formato 9:16 (1080 × 1920 px)** para la campaña anual obligatoria de **Capacitación y Sensibilización en Prevención del Hostigamiento Sexual Laboral (HSL)** de la empresa estatal **ELECTROPERU S.A.** (alcance para sus sedes de **Lima, Mantaro y Tumbes**).

El proyecto evolucionó mediante tres iteraciones documentadas y respaldadas:
- **Iteración 1.0 (Respaldada en `flyers_hsl/dist_v1/` y `reports/AUDITORIA_CALIDAD_v1.md`):** Primera versión funcional construida a partir de los Términos de Referencia (TDR) y los 10 ejes temáticos base.
- **Iteración 2.0 (Respaldada en `flyers_hsl/dist_v2/` y `reports/AUDITORIA_CALIDAD_v2.md`):** Incorporación inicial de la paleta Pantone de la Guía de Identidad Corporativa (`#00559F`, `#34B4E4`), franja bicolor escalonada y actualización legal con el D. Leg. N° 1410.
- **Iteración 3.0 — Versión Definitiva (Entregable Activo en `flyers_hsl/dist/` y `reports/AUDITORIA_CALIDAD.md`):** Ejecutada a partir del dictamen crítico **`reports/DIAGNOSTICO_PEDAGOGICO_V3.md`**, logrando:
  1. **Corrección Exacta del Logotipo Oficial (`1.51:1`):** Generación de `assets/logo_electroperu_oficial_v3.png` (`860 × 586 px`), restituyendo la proporción constructiva oficial de la **Página 7 del Manual de Identidad Corporativa** (corrigiendo el estiramiento horizontal que traía el archivo externo `LogoElectroPeru3.png`).
  2. **Descontaminación Visual:** Eliminación de metadatos burocráticos del TDR (códigos `PR3-R3`, `Rev: 01`, `POI: 1276.2`, exceso de micro-píldoras y etiquetas redundantes) que saturaban la pieza.
  3. **Claridad Pedagógica y Respiración Editorial:** Textos concisos, directos y empáticos orientados al trabajador, con jerarquía visual limpia y aprobación **100/100** por el Auditor Pedagógico y de Calidad.

---

## 2. Insumos Base de Entrada (Ubicados en el workspace)
Ruta base: `/home/laptop/Documentos/TRD_serviciocapa/`

1. **`TDR_Servicio Capacitación y Sensibilización Prevención del HSL para 3 sedes ELP[R][R][R].pdf`**:
   - Términos de Referencia oficiales emitidos por la **Subgerencia de Gestión Humana** para las sedes **Lima, Mantaro y Tumbes**.
2. **`Relación de 10 Contenidos Clave para los Flyers Informativos.docx`**:
   - Propuesta técnico-pedagógica con los 10 ejes temáticos tipo "pastillas informativas" bajo la normativa peruana y la plataforma ALIADA de SUNAFIL.
3. **`identidad visual/Guia de Identidad Corporativo de ELECTROPERU.pdf` (43 páginas)**:
   - Manual oficial de identidad corporativa de ELECTROPERU S.A.: proporción constructiva del logotipo en Página 7 (`1.51:1`), colores principales Pantone 286 PC (`#00559F`), Pantone 298 PC (`#34B4E4`), Cool Gray 10PC (`#868689`), Process Black (`#1A171B`), complementarios (`#003F70`, `#2D6CB5`, `#76A4D7`, `#C4DAF1`), tipografía **Bariol** (Sección 1.7.2) y franja horizontal bicolor escalonada.
4. **`identidad visual/LogoElectroPeru3.png`**:
   - Archivo de referencia cuyo estiramiento horizontal fue diagnosticado y corregido en la Iteración 3.0 conforme a la Página 7 del Manual para producir `flyers_hsl/assets/logo_electroperu_oficial_v3.png` (`860 × 586 px`, ratio `1.51:1`).
5. **`C1 Resumen de la Ley N 27942 HST.docx`**:
   - Compendio técnico-legal de la Ley N° 27942, D.S. N° 014-2019-MIMP y **D. Leg. N° 1410** (Art. 176-B Acoso Sexual y Art. 176-C Chantaje Sexual del Código Penal).

---

## 3. Estructura de Directorios Resultante (Con las 3 Iteraciones)

```text
/home/laptop/Documentos/TRD_serviciocapa/
├── CONTEXTO.md                                                   # Este documento maestro de relevo (v3.0 Final)
├── CHANGELOG_PRODUCCION.md                                       # Bitácora cronológica de las Iteraciones 1.0, 2.0 y 3.0
├── TDR_Servicio Capacitación y Sensibilización...pdf            # PDF original del TDR
├── Relación de 10 Contenidos Clave para los Flyers...docx       # Word original con los 10 temas
├── C1 Resumen de la Ley N 27942 HST.docx                         # Compendio técnico-legal (D. Leg. N° 1410 / CP)
├── identidad visual/                                             # Insumos oficiales de marca
│   ├── Guia de Identidad Corporativo de ELECTROPERU.pdf          # Manual oficial de marca (43 páginas)
│   └── LogoElectroPeru3.png                                      # Imagen fuente de referencia
└── flyers_hsl/
    ├── assets/                                                   # Activos de identidad visual y tokens
    │   ├── logo_electroperu_oficial_v3.png                       # LOGO OFICIAL DEFINITIVO v3 (860x586 px, proporción 1.51:1 Pág. 7 Manual)
    │   ├── logo_electroperu_v2.png                               # Sincronizado con proporción oficial 1.51:1
    │   ├── logo_electroperu.png                                  # Sincronizado con proporción oficial 1.51:1
    │   ├── manual_marca_logotipo_reglas.png                      # Captura de referencia Pág. 7 del Manual (proporción logo)
    │   ├── manual_marca_colores_tipografia.png                   # Captura de referencia Pantone y tipografía Bariol
    │   ├── manual_marca_aplicaciones.png                         # Captura de referencia aplicaciones de marca
    │   └── style_tokens.json                                     # Tokens v3.0 (Pantone #00559F/#34B4E4, logo 1.51:1, Bariol)
    │
    ├── content/                                                  # Base de redacción pedagógica descontaminada
    │   └── flyers_data.json                                      # Textos v3.0 claros, humanos y rigurosos (Ley 27942 + D. Leg. 1410)
    │
    ├── templates/                                                # Motor técnico de generación v3.1 (PNG + PPTX)
    │   ├── generate_flyers.js                                    # Generador de plantillas HTML/CSS v3.1
    │   ├── generate_editable_pptx.py                             # Generador del PPTX nativo editable (589 cuadros de texto)
    │   ├── icons_and_diagrams.js                                 # Diagramas vectoriales SVG e iconos duotono
    │   ├── qr_matrices.json                                      # Matrices QR ERROR_CORRECT_H hacia URLs Gob.pe HTTP 200
    │   ├── render_and_verify.js                                  # Script de renderizado headless con Chrome
    │   ├── verify_images.py                                      # Script de verificación dimensional
    │   └── flyer_01_*.html ... flyer_10_*.html                   # 10 plantillas HTML v3.1 compiladas
    │
    ├── dist/                                                     # ENTREGABLES FINALES DEFINITIVOS v3.1 (1080x1920 px + PPTX)
    │   ├── Campana_HSL_ELECTROPERU_Editable.pptx                 # Presentación editable nativa (203 KB, 10 slides 7.5x13.333 in, 589 textos)
    │   ├── flyer_01_que_es_el_hsl.png                            # Flyer 01 v3.1 (Aprobado 100/100)
    │   ├── flyer_02_manifestaciones_y_conductas.png              # Flyer 02 v3.1 (Aprobado 100/100)
    │   ├── flyer_03_principio_autoridad_y_entorno.png            # Flyer 03 v3.1 (Aprobado 100/100)
    │   ├── flyer_04_obligaciones_del_empleador.png               # Flyer 04 v3.1 (Aprobado 100/100)
    │   ├── flyer_05_derechos_de_los_trabajadores.png             # Flyer 05 v3.1 (Aprobado 100/100)
    │   ├── flyer_06_rol_del_comite_de_intervencion.png           # Flyer 06 v3.1 (Aprobado 100/100)
    │   ├── flyer_07_flujograma_y_pasos_denuncia.png              # Flyer 07 v3.1 con QR formato denuncia ELECTROPERU (Aprobado 100/100)
    │   ├── flyer_08_medidas_de_proteccion_inmediata.png          # Flyer 08 v3.1 (Aprobado 100/100)
    │   ├── flyer_09_sanciones_y_consecuencias.png                # Flyer 09 v3.1 (Aprobado 100/100)
    │   └── flyer_10_canales_ayuda_y_plataforma_aliada.png       # Flyer 10 v3.1 con doble QR HTTP 200 (Aprobado 100/100)
    │
    ├── dist_v2/                                                  # RESPALDO HISTÓRICO ITERACIÓN 2.0 (10 PNG v2)
    │   └── flyer_01_*.png ... flyer_10_*.png
    │
    ├── dist_v1/                                                  # RESPALDO HISTÓRICO ITERACIÓN 1.0 (10 PNG v1)
    │   └── flyer_01_*.png ... flyer_10_*.png
    │
    └── reports/                                                  # Reportes de diagnóstico, auditoría y métricas
        ├── DIAGNOSTICO_PEDAGOGICO_V3.md                          # Diagnóstico crítico que guio la Iteración 3.0
        ├── AUDITORIA_CALIDAD.md                                  # Dictamen oficial activo v3.0 (100/100)
        ├── AUDITORIA_CALIDAD_v2.md                               # Respaldo del dictamen de la Iteración 2.0
        ├── AUDITORIA_CALIDAD_v1.md                               # Respaldo del dictamen de la Iteración 1.0
        └── layout_audit.json                                     # Métricas geométricas y de márgenes sin desbordes
```

---

## 4. Página Web Interactiva Portable (`web_interactiva_hsl/` — Iteración 4.0)

Además de las 10 láminas PNG estáticas en formato 9:16, se construyó, auditó y desplegó en producción una **aplicación web interactiva 100% autocontenida y portable** ubicada en `/home/laptop/Documentos/TRD_serviciocapa/web_interactiva_hsl/`, diseñada para capacitación digital, intranet o distribución directa sin requerir backend ni dependencias externas rotas.

### Despliegue en Producción (Vercel):
- **URL Principal de Producción:** `https://electroperu-hsl-interactivo.vercel.app`
- **URL de Despliegue:** `https://electroperu-hsl-interactivo-ho11fseox-miguels-projects-440e7871.vercel.app`
- **Proyecto Vercel:** `miguels-projects-440e7871/electroperu-hsl-interactivo` (desplegado desde `/home/laptop/Documentos/TRD_serviciocapa/web_interactiva_hsl/` con `.vercelignore` excluyendo `reports/`).

### Estructura de Archivos de `web_interactiva_hsl/` (Optimizada v2.1):
```text
/home/laptop/Documentos/TRD_serviciocapa/web_interactiva_hsl/
├── index.html                                  # SPA semántica (Google Fonts Nunito 600..900, <script defer>, #sidebar-search)
├── vercel.json                                 # Caché optimizada (stale-while-revalidate) y headers de seguridad HTTP
├── favicon.ico                                 # Icono institucional de respaldo
├── .vercelignore                               # Excluye reports/ del paquete de despliegue en Vercel
├── css/
│   └── styles.css                              # UI/UX v2.1 (WCAG AA #525866, área táctil 40-51px, 100dvh, glassmorphism :fullscreen)
├── js/
│   ├── data.js                                 # Datos + qr_svgs compactados en <path> único (105,437 B; -47.5 KB; 288 nodos DOM)
│   └── app.js                                  # Render incremental, transiciones dir-next/dir-prev, Focus Trap + retorno de foco
├── assets/
│   ├── logo_electroperu_web.webp               # Logo web optimizado (256x174 px, 15,004 B, proporción intacta 860:586)
│   ├── favicon-32x32.png                       # Favicon ligero optimizado (1,258 B)
│   ├── logo_electroperu_oficial_v3.png         # Logotipo maestro de ELECTROPERU S.A. (860x586 px, ratio exacto 1.51:1)
│   └── flyers/
│       └── flyer_01_*.png ... flyer_10_*.png   # Copia autocontenida de los 10 flyers finales v3.0 (1080x1920 px)
└── reports/
    ├── REPORTE_PRUEBAS_FUNCIONALES.md          # Reporte QA funcional en Chromium real (100% PASS, 0 errores consola)
    ├── AUDITORIA_VISUAL_WEB.md                 # Dictamen de auditoría visual Desktop y Móvil
    └── screenshots/                            # Capturas de evidencia en 360x800, 390x844, 768x1024 y 1440x900
```

### Optimizaciones Clave de la Versión Web v2.1 (Fase 7):
1. **Rendimiento y Reducción de DOM (`web_perf_auditor_agent`):**
   - Creación de `vercel.json` con políticas de caché (`max-age=604800, stale-while-revalidate=86400` para estáticos y `max-age=0, must-revalidate` para HTML) y cabeceras de seguridad (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).
   - Optimización del logo a `assets/logo_electroperu_web.webp` (`256×174`, `15,004 B`, proporción `860:586` intacta) y `assets/favicon-32x32.png` (`1,258 B`).
   - Compactación de `qr_svgs` (`aliada` y `ley27942`) en `js/data.js` de `809+` etiquetas `<rect>` a `<path>` único (`152,955 B` → `105,437 B`, ahorro de `47,518 B`), reduciendo los nodos DOM iniciales de `1,073` a `288`.
   - Carga diferida `<script defer>`, reducción de fuentes a `Nunito` (`600..900`) y renderizado incremental sin reconstruir `sidebar`/`stories`.
2. **Accesibilidad WCAG 2.1 AA y Usabilidad (`web_qa_tester_agent`):**
   - Ajuste de `--elp-text-muted` a `#525866` elevando el contraste de `3.31:1`/`3.63:1` a **`6.51:1` y `7.13:1`** (cumplimiento holgado de WCAG 2.1 AA).
   - Implementación de **Focus Trap y retorno automático de foco** al cerrar modales, y ampliación del área táctil de `.story-segment` a `40–51px`.
3. **Responsividad Móvil y Estética (`web_visual_auditor_agent`):**
   - Corrección de `.flyer-qr-pair` en grilla de 2 columnas sin recortes en `360×800` y `390×844`, toolbar móvil simétrica de 2 filas, modales con `100dvh` sin cortes inferiores, `white-space: nowrap` en `.flyer-counter` y estilo *glassmorphism* oscuro en modo `:fullscreen`.
   - Verificado con Playwright Chromium (`PASS` en `360×800`, `390×844`, `768×1024` y `1440×900`, `0` errores de consola, `0` 404, `0` overflow), elevando el puntaje visual de `8.3/10` a **`9.3/10`**.
4. **Actualización V3.1 y Web v2.2 (Fase 8 — Observaciones del Cliente, PPTX Editable y QRs HTTP 200):**
   - **Cabecera y Pie Institucional:** Eliminada la leyenda superior `"SUBGERENCIA DE GESTIÓN HUMANA • COMITÉ CIFHS"` y el pie `"ELECTROPERU S.A. — La energía de los peruanos"`, ubicando en la parte inferior derecha **Subgerencia de Gestión Humana** (`#003F70`) y **Gerencia de Administración y Finanzas** (`#0066B3` sobre fondo claro `#E6F6FC` / `#D8EAFA`).
   - **Ajustes Específicos de Contenido:**
     - **Flyer 03:** Alcance ampliado (`"... o terceros, o comunidades aledañas, o cuando se actúe en representación de ELECTROPERU S.A., o cuando se porte el uniforme de la Empresa"`).
     - **Flyer 04:** Nombre completo `"Comité de Intervención Frente al Hostigamiento Sexual"`.
     - **Flyer 07:** Referencia y QR directo al formato de denuncia en el portal oficial de ELECTROPERU (`https://www.gob.pe/institucion/electroperu/campa%C3%B1as/40531-juntos-contra-el-hostigamiento-tu-voz-importa`).
     - **Global:** Reemplazo transversal de `"Gestión Humana"` aislado por `"Subgerencia de Gestión Humana"`.
   - **QRs Verificados con `jsQR` (11/11 PASS + HTTP 200):** Reemplazo de URLs caídas/404 por enlaces oficiales activos de Gob.pe (`sunafil/campañas/143346-...`, `mimp/normas-legales/285411-014-2019-mimp` y `electroperu/campañas/40531-...`), regenerados con `ERROR_CORRECT_H` sin recuadros centrales obstructivos.
   - **Entregable PPTX Editable:** Generado `flyers_hsl/dist/Campana_HSL_ELECTROPERU_Editable.pptx` (`203 KB`, 10 slides `7.5×13.333 in`, `589` cuadros de texto editables nativos) mediante `flyers_hsl/templates/generate_editable_pptx.py`.
   - **Certificación Final Web v2.2:** `web_qa_tester_agent` **`8/8 PASS`**, `web_visual_auditor_agent` **`9.7 / 10`**, redesplegado en Vercel (`https://electroperu-hsl-interactivo.vercel.app`) y sincronizado con `git push` a GitHub (`electroperu-hsl-interactivo`).

### Funcionalidades Clave de la Web Interactiva:
1. **Catálogo Interactivo de los 10 Flyers:** Filtrado por categorías preventivas/normativas, búsqueda en tiempo real y vista en tarjetas con réplica HTML interactiva (incluyendo grilla `1fr` optimizada para el Flyer 03 y doble botón `ALIADA SUNAFIL ↗` + `LEY N° 27942 ↗` en el Flyer 10).
2. **Visor Modal Profundo (39 Nodos Interactivos):** Permite inspeccionar cada flyer en alta resolución (`1080 × 1920 px`), hacer zoom, descargar el PNG oficial y desplegar los 39 puntos pedagógicos y legales (Ley N° 27942, D.S. N° 014-2019-MIMP, D. Leg. N° 1410).
3. **Selector Dinámico por Sede (`Lima`, `Mantaro`, `Tumbes`):** Adapta la orientación de canales de ayuda y contacto del Comité de Intervención frente al Hostigamiento Sexual (CIFHS) y RR.HH. según la sede del trabajador.
4. **Módulo de Autoevaluación (Quiz Interactivo):** Simulador formativo de 5 preguntas clave con retroalimentación pedagógica inmediata y puntaje final.

### Cómo Abrir o Mantener la Web Interactiva:
- **Apertura directa o con servidor local:**
  ```bash
  cd /home/laptop/Documentos/TRD_serviciocapa/web_interactiva_hsl
  python3 -m http.server 8080
  # Abrir http://localhost:8080 en cualquier navegador
  ```
- **Mantenimiento y validación sintáctica:**
  - Para actualizar textos, preguntas del quiz o canales por sede: editar `web_interactiva_hsl/js/data.js`.
  - Para validar la sintaxis de los scripts tras cualquier cambio:
    ```bash
    node --check /home/laptop/Documentos/TRD_serviciocapa/web_interactiva_hsl/js/data.js
    node --check /home/laptop/Documentos/TRD_serviciocapa/web_interactiva_hsl/js/app.js
    ```
  - Si se regeneran los flyers en `flyers_hsl/dist/`, sincronizarlos hacia la web con:
    ```bash
    cp /home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/*.png /home/laptop/Documentos/TRD_serviciocapa/web_interactiva_hsl/assets/flyers/
    ```

---

## 5. Especificaciones de Diseño y Tokens Oficiales v3.0 (`style_tokens.json`)

* **Lienzo:** `1080 × 1920 px` (Proporción 9:16 vertical, cero desbordes).
* **Logotipo Oficial Corregido (`logo_electroperu_oficial_v3.png`):**
  - Dimensiones exactas: `860 × 586 px` (Proporción constructiva `1.51:1` de la Página 7 de la Guía de Identidad Corporativa).
* **Paleta Oficial del Manual de Identidad Corporativa de ELECTROPERU S.A.:**
  - **Pantone 286 PC (Azul Corporativo Principal):** `#00559F`
  - **Pantone 298 PC (Celeste Corporativo Principal):** `#34B4E4`
  - **Cool Gray 10PC (Gris Corporativo):** `#868689`
  - **Process Black (Negro Corporativo):** `#1A171B`
  - **Paleta Complementaria Oficial:** `#003F70`, `#2D6CB5`, `#76A4D7`, `#C4DAF1`
* **Criterios Editoriales v3.0:**
  - Cabecera limpia con el logo oficial en proporción `1.51:1`, contador discreto (`01 / 10` a `10 / 10`) y franja horizontal bicolor escalonada oficial.
  - Cero contaminación por códigos administrativos internos del TDR.
  - Lenguaje claro, pedagógico y accionable respaldado por la Ley N° 27942, D.S. N° 014-2019-MIMP, D. Leg. N° 1410 (Art. 176-B y 176-C CP) y SUNAFIL ALIADA.

---

## 6. Comandos Útiles para Futuras Modificaciones (Motor de Flyers PNG)

1. **Editar los textos:** Modificar `/home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/content/flyers_data.json`.
2. **Recompilar las plantillas HTML v3.0:**
   ```bash
   cd /home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/templates
   node generate_flyers.js
   ```
3. **Renderizar los PNG (1080x1920) y ejecutar auditoría DOM:**
   ```bash
   cd /home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/templates
   node render_and_verify.js
   ```
4. **Validar dimensiones e integridad de imágenes:**
   ```bash
   cd /home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/templates
   python3 verify_images.py
   ```
5. **Regenerar la presentación PowerPoint 100% editable (`.pptx`):**
   ```bash
   cd /home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/templates
   python3 generate_editable_pptx.py
   ```
