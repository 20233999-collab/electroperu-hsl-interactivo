# AUDITORÍA PEDAGÓGICA Y VISUAL CRÍTICA (SIN FILTROS) — VERSIÓN 2.0 ➔ HOJA DE RUTA VERSIÓN 3.0

**Fecha de Auditoría:** 11 de noviembre de 2026  
**Alcance:** Inspección visual y técnica de los 10 flyers en `/home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/` (foco detallado en `flyer_01_que_es_el_hsl.png`, `flyer_03_principio_autoridad_y_entorno.png`, `flyer_07_flujograma_y_pasos_denuncia.png`), contraste forense contra `/home/laptop/Documentos/TRD_serviciocapa/identidad visual/Guia de Identidad Corporativo de ELECTROPERU.pdf` (Págs. 7, 10, 11, 14, 16, 17, 25 y 30) y archivo `/home/laptop/Documentos/TRD_serviciocapa/identidad visual/LogoElectroPeru3.png`.  
**Veredicto General:** **RECHAZADO PARA DIFUSIÓN MÓVIL (APROBACIÓN CONDICIONADA A REDISEÑO ESTRUCTURAL V3.0).** Aunque la v2.0 corrigió la paleta Pantone de ELECTROPERU S.A., **fracasa como pieza de comunicación móvil de lectura rápida (5–8 segundos)** por cuatro defectos críticos que se detallan a continuación con mediciones exactas.

---

## 1. PROBLEMA 1: EL LOGOTIPO SIGUE VIÉNDOSE ESTIRADO HORIZONTALMENTE (EVIDENCIA FORENSE)

### 1.1. ¿Por qué se sigue viendo estirado si el CSS tiene `object-fit: contain`?
El código actual (`generate_flyers.js`, líneas 389–395) aplica `aspect-ratio: 1069 / 555; object-fit: contain;` sobre `logo_electroperu_v2.png` (que es un recorte directo de `LogoElectroPeru3.png`). **El error raíz no está en el CSS, sino en que el archivo fuente `LogoElectroPeru3.png` YA ESTÁ DEFORMADO HORIZONTALMENTE DE FÁBRICA (+30.6% de estiramiento horizontal)** y, además, está cortado al ras en su margen derecho (`x_max = 1207` en un lienzo de `1208 px`, mientras a la izquierda sobran `147 px`).

Al preservar la relación de aspecto `1069 / 555` (`1.9703 : 1`), el CSS simplemente **preserva fielmente una imagen que ya viene aplastada/estirada**, incurriendo exactamente en el **"Uso incorrecto: NO DEFORMAR EL LOGO"** documentado en la **Página 25 (Sección 2.6)** de la Guía de Identidad Corporativa de ELECTROPERU S.A.

### 1.2. Medición Pixel a Pixel: Página 7 del Manual de Marca vs. `LogoElectroPeru3.png`

Se extrajo la imagen nativa de la **Página 7 ("1.2 Área de reserva")** del PDF oficial (`Guia de Identidad Corporativo de ELECTROPERU.pdf`) y se midieron los *bounding boxes* exactos del isotipo (esfera azul con órbitas) y del logotipo completo frente a `LogoElectroPeru3.png`:

| Componente Medido | Manual Oficial (Pág. 7 - "Área de reserva") | Archivo `LogoElectroPeru3.png` / `logo_electroperu_v2.png` | Desviación / Deformación Real |
| :--- | :--- | :--- | :--- |
| **Isotipo (Esfera azul + órbitas)** | `180 × 142 px` ➔ **Relación `w/h = 1.2676`** | `481 × 338 px` ➔ **Relación `w/h = 1.4231`** | **+12.3% a +17.8% estirado horizontalmente** (la esfera se ve ovalada y achatada). |
| **Logotipo Completo (Isotipo + `electroperu` + slogan)** | `347 × 230 px` ➔ **Relación `w/h = 1.5087` (`~1.51 : 1`)** | `1060 × 538 px` ➔ **Relación `w/h = 1.9703` (`~1.97 : 1`)** | **+30.6% estirado horizontalmente** (exactamente la deformación de estirar un arte `4:3` a `16:9`). |
| **Relación Ancho Texto / Ancho Isotipo** | `347 / 180` = **`1.9278`** | `1060 / 481` = **`2.2037`** | El texto `electroperu` está **+14.3% más ensanchado** respecto al isotipo que en el manual oficial. |
| **Margen Derecho del Archivo** | Simétrico con área de reserva `"e"` alrededor | Cortado al ras en `x = 1207 / 1208 px` (0 px de aire a la derecha vs. 147 px a la izquierda) | La `"u"` de `electroperu` y la `"s"` de `peruanos` quedan pegadas al borde derecho. |

### 1.3. Cómo Corregir Definitivamente el Logotipo para la Versión 3.0
1. **Descartar `LogoElectroPeru3.png` y `logo_electroperu_v2.png` tal como están.**
2. **Dos vías técnicas de corrección exacta:**
   - **Vía A (Restauración Geométrica de Alta Resolución + Re-proporción a Pág. 7):** Tomar el contenido de alta resolución de `LogoElectroPeru3.png` (`1060 × 538 px`), corregir su escala horizontal multiplicando el ancho por el factor inverso exacto de la Página 7 (`1.5087 / 1.9703 = 0.7657`, llevando el bloque de `1060 × 538 px` a **`812 × 538 px`**, relación exacta **`1.509 : 1`**) o re-ensamblar por separado el isotipo con relación `w/h = 1.268` y el bloque tipográfico con relación total `w/h = 1.509`, añadiendo un margen blanco simétrico (mínimo `40 px` por lado) para que la `"u"` y la `"s"` nunca se corten.
   - **Vía B (Extracción directa de Página 7 / Página 10 del PDF Oficial):** Extraer el logotipo limpio de la Página 10 ("1.5 Composición del logotipo") / Página 7 ("1.2 Área de reserva") del PDF oficial con súper-resolución/limpieza de artefactos JPEG, verificando que el `aspect-ratio` final del activo PNG (`logo_electroperu_oficial_v3.png`) sea **`1.51 : 1`** (ancho/alto) y el del isotipo sea **`1.27 : 1`**.

---

## 2. PROBLEMA 2: TIPOGRAFÍAS QUE NO SE ENTIENDEN, CONDENSADAS O MICROSCÓPICAS EN CELULAR

### 2.1. Violación Tipográfica del Manual de Marca: Confusión entre *Bariol* y *Barlow Condensed*
En la **Página 14 (Sección 1.7.2 "Tipografías complementarias")** del Manual de Identidad Corporativa de ELECTROPERU S.A. se ordena explícitamente usar la fuente **`BARIOL`** para flyers, banners y paneles.
- **¿Qué es Bariol?** Es una tipografía *sans-serif redondeada, abierta, humanista y amigable* (visualmente equivalente a **`Nunito`** o **`Plus Jakarta Sans`**).
- **¿Qué hizo la v2.0?** Confundió fonéticamente *Bariol* con **`Barlow Condensed`** (`'Barlow Condensed', 'Arial Narrow', sans-serif`) y además introdujo **`JetBrains Mono`** (monoespaciada de programación). `Barlow Condensed` es una fuente **estrecha, comprimida e industrial** que, al combinarse con mayúsculas sostenidas (`UPPERCASE`) y `letter-spacing: 0.04em–0.08em` en cuerpos de `11px` a `14px`, genera un efecto de "código de barras" ilegible en pantallas de celular.

### 2.2. Inventario Exacto de Textos Ilegibles (< 16px) en los Flyers Actuales
En una pantalla de teléfono móvil (ancho lógico `360 px`), el lienzo de `1080 px` se reduce a **un tercio (`1/3`) de su tamaño**. Por tanto, cualquier texto menor a `18 px` en el lienzo mide menos de `6 px` reales en el celular. En la v2.0 existen **23 elementos tipográficos por debajo del umbral de legibilidad**:

1. **`.qr-single-caption span` (`generate_flyers.js:1062`):** `font-family: 'JetBrains Mono', monospace; font-size: 10.5px;` (`aliada.sunafil.gob.pe`). **Crítico:** Fuente monoespaciada de 10.5px (3.5px en móvil).
2. **Textos inferiores del flujograma SVG (`icons_and_diagrams.js:615, 622, 629, 636, 643`):** `font-size="10.5"` (`RR.HH. / Comité CIFHS`, `+ Canal Médico/Psic.`, `Dicta: Gestión Humana`). **Ilegible en `flyer_07`.**
3. **`.qr-caption` en Flyer 10 (`generate_flyers.js:1091`):** `Barlow Condensed`, `11px`.
4. **`.diagram-status-pill` (`generate_flyers.js:638`):** `11px` (`CONFIGURACIÓN DESDE EL PRIMER ACTO`, `COBERTURA EN TODA RELACIÓN LABORAL`, `DURACIÓN TOTAL MÁXIMA: ≤ 29–30 DÍAS`).
5. **Etiquetas internas de todos los diagramas SVG (`icons_and_diagrams.js:390, 421, 468, 502, 612, 690, 715`):** `font-size="11"` y `"11.5"` (`1 SOLO ACTO BASTA`, `1. FLUJO VERTICAL (JERÁRQUICO)`, `ETAPA 01 • DÍA 0`, `Sin Jerarquía`).
6. **`.key-concept-label` (`generate_flyers.js:596`):** `11.5px` (`CONCEPTO CLAVE`).
7. **`.qr-single-caption small` (`generate_flyers.js:1069`):** `Barlow Condensed`, `11.5px`, color gris `#868689` (`SUNAFIL • MTPE`) — bajo tamaño + bajo contraste.
8. **`.inst-footer-row` (`generate_flyers.js:1138`):** `11.5px`, color gris `#868689` (`ELECTROPERU S.A. — La energía de los peruanos... Subgerencia de Gestión Humana...`).
9. **`.stepped-main-bar` (`generate_flyers.js:1172`):** `11.5px` (`LIMA • COMPLEJO HIDROELÉCTRICO DEL MANTARO • TUMBES`).
10. **`.cifhs-pill` (`generate_flyers.js:445`):** `12px` (`Comité de Intervención (CIFHS)`).
11. **`.scope-mini-title` en Flyer 03 (`generate_flyers.js:959`):** `Barlow Condensed`, `12px` (`COBERTURA ORGANIZACIONAL`).
12. **Subtítulos de cajas SVG (`icons_and_diagrams.js:376, 382, 394, 398, 646`):** `font-size="12"` (`Sexual o Sexista (D. Leg. N° 1410)`, `HITO TRANSVERSAL OBLIGATORIO...`).
13. **`.card-footer-meta` (`generate_flyers.js:758`):** `12.2px` (`▸ Criterio de Configuración • Art. 4 D.S. 014-2019-MIMP`).
14. **`.sedes-pill`, `.tech-bottom-tag`, `.mode-pill`, `.meta-sla-chip`, `.step-arrow-indicator`, `.wide-num-badge`, `.card-metric-badge`, `.wide-card-footer-line`, `.scope-chip`:** Todos en **`12.5px`** (la mayoría en `Barlow Condensed`).
15. **`.card-tag-pill`, `.card-num-pill`, `.tech-meta-lines`, `.hl-badge`, `.hl-law-ref`, `.cta-url-pill`, `.tdr-kicker`, `.diagram-kicker`:** Todos entre **`13px` y `14px`** en `Barlow Condensed` condensada.
16. **`.hl-text` (`generate_flyers.js:1034`):** Párrafo completo de 3 líneas en `14.8px` dentro del cajetín inferior.

---

## 3. PROBLEMA 3: SATURACIÓN VISUAL Y EXCESO DE ELEMENTOS ("SÍNDROME DE FORMULARIO ISO")

### 3.1. Conteo Real de Elementos que Compiten Simultáneamente en Una Sola Lámina
Al auditar `flyer_01_que_es_el_hsl.png` y `flyer_07_flujograma_y_pasos_denuncia.png`, un trabajador se enfrenta a **más de 48 micro-bloques visuales y 72 fragmentos de texto distintos** apilados en 5 pisos verticales:

| Piso / Zona | Elementos que compiten al mismo tiempo en la v2.0 | Total de Micro-Elementos |
| :--- | :--- | :--- |
| **1. Header Institucional (3 columnas + cinta)** | (1) Logo ELP, (2) Kicker FONAFE/RRHH, (3) Título programa, (4) Pill Sedes con punto celeste, (5) Pill Comité CIFHS, (6) Código PR3-R3, (7) Rev 01, (8) POI 1276.2, (9) Contador `01/10`, (10) Tag `PLAN DE CAPACITACIÓN 2026`, (11) Cinta bicolor inferior. | **11 elementos** |
| **2. Hero Banner** | (12) Gráfico orbital SVG de fondo, (13) Pill izquierdo con rayo y leyes, (14) Pill derecho de modo, (15) Título H1, (16) Subtítulo, (17) Caja interna oscura, (18) Badge `CONCEPTO CLAVE`, (19) Párrafo de definición legal de 3 líneas. | **8 elementos** |
| **3. Panel de Diagrama Central** | (20) Contenedor con borde superior, (21) Kicker técnico legal, (22) Pill de estado derecho, (23–27) **5 cajas vectoriales** con círculos numerados, íconos, títulos, subtítulos, badges internos y flechas punteadas/sólidas (y en Flyer 07, **6 cajas** incluyendo la barra de Hito Transversal). | **9 a 14 elementos** |
| **4. Grilla de 4 Tarjetas (o 3 tarjetas anchas en Flyer 03)** | En **cada una** de las 4 tarjetas hay **8 sub-elementos**: (a) Pill superior izquierdo numerado, (b) Pill superior derecho de tag, (c) Caja con ícono SVG, (d) Título H3, (e) Párrafo explicativo, (f) Número gigante en marca de agua (`01`–`04`), (g) Pie izquierdo con viñeta `▸`, (h) Chip derecho `ELP • LEY 27942` (y en Flyer 03, una 3ra columna con título y 3 chips por tarjeta). | **32 elementos (8 × 4 tarjetas)** |
| **5. Bloque Inferior + QR + Doble Footer** | (60) Caja azul marino, (61) Badge amarillo `DATO CLAVE NORMATIVO`, (62) Referencia legal con balanza `⚖`, (63) Título H4, (64) Párrafo de 3 líneas, (65) Caja blanca QR, (66) Código QR con badge central, (67–69) 3 líneas de texto junto al QR, (70) Barra blanca de footer con CTA izquierdo, (71) Pill derecho `aliada.sunafil.gob.pe | Línea 1819`, (72) Fila gris institucional izquierda, (73) Fila gris derecha, (74) Escalón celeste superior, (75) Franja azul final con sedes y web. | **16 elementos** |
| **TOTAL POR LÁMINA** | **5 pisos densos sin respiro visual (aire blanco < 12% del lienzo)** | **76 micro-elementos visuales** |

---

## 4. PROBLEMA 4: AUDITORÍA DE EFECTIVIDAD PEDAGÓGICA (LA PRUEBA DE LOS 5–8 SEGUNDOS EN CELULAR)

### ¿Puede un técnico de la Central Hidroeléctrica del Mantaro, un operario de Tumbes o un administrativo de Lima entender la idea central en 5–8 segundos desde WhatsApp?
**NO.** Actualmente el flyer exige entre **75 y 110 segundos de lectura analítica y zoom manual con dos dedos** por tres fallas de diseño instruccional:

1. **Redundancia Triplicada (Dice exactamente lo mismo 3 veces en la misma lámina):**
   - **Caso `flyer_01_que_es_el_hsl.png`:**
     - *Vez 1 (Hero Banner - Concepto Clave):* Explica que es conducta sexual o sexista no deseada, que genera ambiente hostil.
     - *Vez 2 (Diagrama Central):* Repite en 5 cajas: `01 Naturaleza Sexual o Sexista`, `02 Sin Consentimiento`, `Impacto en el Entorno: Ambiente hostil`, `Regla D. Leg. 1410: No exige reiteración`, `1 solo acto basta`.
     - *Vez 3 (Las 4 Tarjetas + Caja Inferior):* Vuelve a repetir exactamente los mismos 4 puntos (`01 Conducta No Deseada / Sin reiteración`, `02 Connotación Sexual o Sexista`, `03 Entorno Laboral Hostil`, `04 Criterio de Configuración: 1 solo acto basta`) y luego **una cuarta vez** en el `DATO CLAVE NORMATIVO` inferior ("no exige reiteración ni rechazo explícito").
   - **Caso `flyer_03_principio_autoridad_y_entorno.png`:**
     - El diagrama superior dibuja 3 columnas (`1. Flujo Vertical`, `2. Flujo Horizontal`, `3. Red Multivínculo 360°`) y justo debajo las 3 tarjetas horizontales repiten **exactamente las mismas 3 modalidades** (`Modalidad 01: Hostigamiento Vertical`, `Modalidad 02: Hostigamiento Horizontal`, `Modalidad 03: Terceros, Locadores y Modalidades`) y en su columna derecha vuelven a listar `Planilla`, `Practicantes / Locadores`, `Contratistas` por tercera vez.
   - **Caso `flyer_07_flujograma_y_pasos_denuncia.png`:**
     - El diagrama superior muestra 5 cajas con los pasos y plazos (`Día 0`, `≤ 1 día hábil`, `≤ 3 días hábiles`, `≤ 15 días cal.`, `≤ 10 días cal.`), e inmediatamente abajo las 4 tarjetas repiten `Paso 1 (Día 0)`, `Paso 2 (1 a 3 días)`, `Paso 3 (≤ 15 días)` y `Paso 4 (≤ 10 días)`.

2. **Ruido Burocrático que Compite con el Mensaje Preventivo:**
   - Un trabajador que abre una imagen en su celular no necesita leer en el encabezado códigos internos del TDR (`Código: PR3-R3 | Rev: 01 | POI: 1276.2`), ni repetir en las 4 tarjetas el chip `ELP • LEY 27942`, ni leer citas de incisos reglamentarios (`Art. 18.2 inc. a) • Cese Inmediato de Coincidencia`) en el pie de cada tarjeta. Esa jerga jurídico-administrativa satura la memoria de trabajo y oculta el mensaje humano y accionable.

3. **Falta de Jerarquía Escaneable (Todo grita al mismo volumen):**
   - Cuando cada tarjeta tiene **3 píldoras de colores**, un borde doble, una marca de agua gigante, un ícono, un título, un párrafo de 22 palabras y una barra de pie con 2 etiquetas más, el ojo humano no sabe dónde posarse.

---

## 5. PLAN DE CIRUGÍA RADICAL PARA LA VERSIÓN 3.0 (QUÉ ELIMINAR, QUÉ SIMPLIFICAR, QUÉ AGRANDAR)

Para que la **Versión 3.0** sea un referente de diseño instruccional corporativo (lectura completa en **6 segundos** desde un celular sin hacer zoom), se establecen las siguientes reglas obligatorias de rediseño:

### 5.1. ¿QUÉ ELIMINAR POR COMPLETO? (Poda de Ruido Visual)
1. **ELIMINAR el cajetín técnico burocrático del Header:** Suprimir `Código: PR3-R3 | Rev: 01 | POI: 1276.2` y las píldoras redundantes del header. El header debe ser limpio: **Logo Oficial ELECTROPERU S.A. (con proporción exacta `1.51:1` de la Pág. 7)** a la izquierda, **Título del Programa + Sedes** al centro, y un único **Badge limpio `FLYER 01/10`** a la derecha.
2. **ELIMINAR la duplicación entre Diagrama Central y Tarjetas (Fusión en Un Solo Cuerpo Visual Protagonista):**
   - No volver a poner un diagrama de 5 cajas arriba Y 4 tarjetas abajo que digan exactamente lo mismo.
   - **Estructura V3.0:** Unificar el cuerpo central en **UN SOLO BLOQUE INFOGRAFICO PROTAGONISTA DE GRAN FORMATO** (las 4 tarjetas grandes, limpias y conectadas visualmente, o las 3 tarjetas anchas en el Flyer 03, con una barra-resumen visual limpia e integrada de 1 sola línea arriba). Esto libera **240 px de altura vertical**, permitiendo agrandar textos, íconos y aire blanco.
3. **ELIMINAR de las tarjetas:**
   - El segundo badge superior derecho (`.card-tag-pill`) ➔ Queda **1 solo badge corto** por tarjeta.
   - Toda la barra inferior de cada tarjeta (`.card-footer-meta` con `▸ Criterio de Configuración...` y el chip repetitivo `ELP • LEY 27942`).
   - La tercera columna lateral derecha de las tarjetas del Flyer 03 (`.wide-card-right` con `COBERTURA ORGANIZACIONAL` y sus 3 sub-cajas), integrando esa idea en una sola línea limpia.
   - Los números gigantes en marca de agua (`.watermark-num`) que ensucian el fondo de la tarjeta.
4. **ELIMINAR del Hero Banner:**
   - El segundo badge superior derecho (`.mode-pill`).
   - El texto largo de 3 líneas dentro de `.key-concept-box`, convirtiéndolo en una **Frase Fuerza / Idea Central de máximo 12–15 palabras** a gran tamaño (`22px–24px`).
5. **ELIMINAR el doble piso de Footer + Subfooter:**
   - Fusionar la caja de cierre normativo/QR y el pie institucional en **un único bloque inferior limpio** con el código QR grande, un mensaje directo a la acción (con **Línea 1819** y **aliada.sunafil.gob.pe** bien legibles) y la franja escalonada oficial del Manual de Marca (Pág. 30) al pie.

### 5.2. ¿QUÉ SIMPLIFICAR EN LOS TEXTOS? (Regla de Oro de Micro-Copy Móvil)
1. **Párrafos de tarjetas (`.card-body`):** Reducir de 22–28 palabras a **máximo 12–16 palabras (2 líneas limpias)**, en lenguaje directo al trabajador (ej. en vez de *"El rechazo no requiere ser expreso ni reiterado; basta que la acción no sea bienvenida por la persona afectada"*, usar **"No necesitas rechazarlo en voz alta ni que se repita: basta que te incomode."** o redacción directa equivalente sin perder rigor legal).
2. **Citas legales:** Concentrar la referencia legal (`Ley N° 27942 • D. Leg. N° 1410 • D.S. 014-2019-MIMP`) en **un solo lugar por lámina** (en el bloque inferior junto al QR), eliminando la repetición de leyes en el header, hero, diagrama, tarjetas y footer.

### 5.3. ¿QUÉ AGRANDAR Y CAMBIAR EN TIPOGRAFÍA? (Escala Móvil-Primero)
1. **PROHIBICIÓN ABSOLUTA de `Barlow Condensed` y `JetBrains Mono`:** Eliminar ambas fuentes del `<link>` de Google Fonts y de todo el CSS.
2. **Única familia tipográfica de contenido (Fiel a *Bariol* - Pág. 14 del Manual):** Usar exclusivamente **`Nunito`** / **`Plus Jakarta Sans`** (redondeada, abierta y de máxima legibilidad en pantallas pequeñas, homologada a *Bariol*).
3. **Tamaños Mínimos Obligatorios en Lienzo `1080 × 1920 px` (Ningún texto menor a `16px`):**

| Elemento del Flyer | Tamaño en v2.0 (Defectuoso) | Tamaño Mínimo en V3.0 (Aprobado para Celular) |
| :--- | :--- | :--- |
| **Título Principal (`.hero-title`)** | `40 px` | **`46 px – 50 px`** (Impacto inmediato en 1 segundo) |
| **Subtítulo / Idea Fuerza del Hero** | `15.8 px – 18 px` (2 bloques separados) | **`22 px – 24 px`** (1 solo bloque claro y contundente) |
| **Títulos de Tarjetas (`.card-title`)** | `22 px` | **`26 px – 28 px`** |
| **Cuerpo de Tarjetas (`.card-body`)** | `16.2 px` (denso, 4–5 líneas) | **`20 px – 21 px`** (2–3 líneas cortas y aireadas) |
| **Badges / Etiquetas de Etapa** | `11 px – 13.5 px` (`Barlow Condensed`) | **`16 px – 17 px`** (`Nunito ExtraBold`, sin condensar) |
| **Íconos de Tarjetas (`.card-icon-box`)** | `76 × 76 px` (SVG `58 px`) | **`92 × 92 px`** (SVG `72 px`) |
| **Bloque QR + Dato Clave Inferior** | `10.5 px – 14.8 px` | **`18 px – 20 px`** (URL y Línea 1819 a **`18 px`**) |
| **Cinta Institucional Inferior (Sedes y Web)** | `11.5 px` | **`16 px`** |

---

## 6. CHECKLIST DE VERIFICACIÓN OBLIGATORIA PARA APROBAR LA VERSIÓN 3.0
- [ ] **Logo Oficial No Estirado:** Relación ancho/alto del logotipo completo = **`1.51 : 1`** (`w/h ≈ 1.509`) y esfera isotipo **`1.27 : 1`**, idéntico a la Página 7 de la Guía de Identidad Corporativa, con margen blanco simétrico (sin cortes en la `"u"` ni en la `"s"`).
- [ ] **Cero Tipografías Condensadas o Monoespaciadas:** `0` ocurrencias de `Barlow Condensed`, `Arial Narrow` o `JetBrains Mono`.
- [ ] **Cero Textos Menores a 16px:** Ningún texto en CSS ni en SVG por debajo de `16px`; cuerpo principal de tarjetas en `20px–21px` y títulos de tarjetas en `26px–28px`.
- [ ] **Cero Redundancia Diagrama vs. Tarjetas:** Eliminación de la duplicación entre el esquema central y las tarjetas; máximo **25–30 elementos visuales** en toda la lámina (frente a los 76 actuales).
- [ ] **Prueba de Lectura en 5–8 Segundos:** Un trabajador en Lima, Mantaro o Tumbes capta el título, los 4 puntos clave y el canal de ayuda en menos de 8 segundos desde la pantalla de su celular sin hacer zoom.
