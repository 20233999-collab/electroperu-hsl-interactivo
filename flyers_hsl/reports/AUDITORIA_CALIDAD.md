# INFORME DE AUDITORÍA DE CALIDAD — FASE 3 (GATE 3): PNGs, ESCANEO REAL DE 11 QRs Y VALIDACIÓN PPTX
## Campaña de Pastillas Informativas: Prevención del Hostigamiento Sexual Laboral (HSL) — ELECTROPERU S.A.

- **Entidad Auditada:** ELECTROPERU S.A. (`www.gob.pe/electroperu`)
- **Área Responsable:** Subgerencia de Gestión Humana / Gerencia de Administración y Finanzas
- **Alcance Geográfico:** Sedes Lima, Mantaro y Tumbes
- **Directorio de Entregables Auditados:** `/home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/`
- **Entregables Verificados:** 10 Infografías PNG (`1080x1920 px`, 9:16) + Presentación Editable Nativa (`Campana_HSL_ELECTROPERU_Editable.pptx`)
- **Auditor Responsable:** `Agent-AuditorQA`
- **Veredicto Global:** **PASS (100 / 100 — 11/11 QRs DECODIFICADOS CON HTTP 200 + PPTX NATIVO VALIDADO)**

---

## 1. Escaneo Óptico Real de los 11 Códigos QR desde los 10 PNGs Finales (`jsQR` + `curl HTTP 200`)

Se ejecutó la decodificación directa sobre la matriz de píxeles de los 10 archivos PNG finales en `/home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/` y se verificó la respuesta HTTP de cada URL decodificada mediante `curl -ILs -o /dev/null -w "%{http_code}"`:

| # QR | Archivo PNG (`flyers_hsl/dist/`) | Etiqueta Visual en Flyer | URL Exacta Decodificada desde el PNG (`jsQR`) | Código HTTP (`curl`) | Estado |
| :-: | :--- | :--- | :--- | :-: | :-: |
| **01** | [flyer_01_que_es_el_hsl.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_01_que_es_el_hsl.png) | `PLATAFORMA OFICIAL gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **02** | [flyer_02_manifestaciones_y_conductas.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_02_manifestaciones_y_conductas.png) | `PLATAFORMA OFICIAL gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **03** | [flyer_03_principio_autoridad_y_entorno.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_03_principio_autoridad_y_entorno.png) | `PLATAFORMA OFICIAL gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **04** | [flyer_04_obligaciones_del_empleador.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_04_obligaciones_del_empleador.png) | `PLATAFORMA OFICIAL gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **05** | [flyer_05_derechos_de_los_trabajadores.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_05_derechos_de_los_trabajadores.png) | `PLATAFORMA OFICIAL gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **06** | [flyer_06_rol_del_comite_de_intervencion.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_06_rol_del_comite_de_intervencion.png) | `PLATAFORMA OFICIAL gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **07** | [flyer_07_flujograma_y_pasos_denuncia.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_07_flujograma_y_pasos_denuncia.png) | `FORMATO DE DENUNCIA gob.pe/electroperu` | `https://www.gob.pe/institucion/electroperu/campa%C3%B1as/40531-juntos-contra-el-hostigamiento-tu-voz-importa` | `200` | **PASS** |
| **08** | [flyer_08_medidas_de_proteccion_inmediata.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_08_medidas_de_proteccion_inmediata.png) | `PLATAFORMA OFICIAL gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **09** | [flyer_09_sanciones_y_consecuencias.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_09_sanciones_y_consecuencias.png) | `PLATAFORMA OFICIAL gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **10-A** | [flyer_10_canales_ayuda_y_plataforma_aliada.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_10_canales_ayuda_y_plataforma_aliada.png) (QR Izq.) | `ALIADA SUNAFIL` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **10-B** | [flyer_10_canales_ayuda_y_plataforma_aliada.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_10_canales_ayuda_y_plataforma_aliada.png) (QR Der.) | `D.S. 014-2019 / Ley` | `https://www.gob.pe/institucion/mimp/normas-legales/285411-014-2019-mimp` | `200` | **PASS** |

---

## 2. Validación Estructural y Textual del Entregable Editable (`.pptx`)

Archivo auditado: [Campana_HSL_ELECTROPERU_Editable.pptx](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/Campana_HSL_ELECTROPERU_Editable.pptx) mediante `python-pptx`:

- **Cantidad de Diapositivas:** `10 slides` (correspondientes a `01/10` – `10/10`).
- **Dimensiones de Página:** `7.5 x 13.333 in` (relación vertical exacta `9:16` equivalente a `1080x1920 px`).
- **Editabilidad Nativa:** `589 cuadros de texto editables nativos` distribuidos en las 10 diapositivas (`60` shapes de texto en slides 1, 2, 4–9; `50` en slide 3; `59` en slide 10).
- **Depuración de Textos Antiguos:**
  - `"SUBGERENCIA DE GESTIÓN HUMANA • COMITÉ CIFHS"` → **0 ocurrencias (`False` en 10/10 slides)**.
  - `"ELECTROPERU S.A. — La energía de los peruanos"` → **0 ocurrencias (`False` en 10/10 slides)**.
- **Presencia de Firma Institucional Actualizada:**
  - `"Subgerencia de Gestión Humana"` → **Presente en 10/10 slides (`True`)**.
  - `"Gerencia de Administración y Finanzas"` → **Presente en 10/10 slides (`True`)**.

---

## 3. Inspección Visual Directa de las Infografías PNG

Se inspeccionaron visualmente las láminas representativas ([flyer_01_que_es_el_hsl.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_01_que_es_el_hsl.png), [flyer_03_principio_autoridad_y_entorno.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_03_principio_autoridad_y_entorno.png), [flyer_04_obligaciones_del_empleador.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_04_obligaciones_del_empleador.png), [flyer_07_flujograma_y_pasos_denuncia.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_07_flujograma_y_pasos_denuncia.png) y [flyer_10_canales_ayuda_y_plataforma_aliada.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist/flyer_10_canales_ayuda_y_plataforma_aliada.png)):

1. **Cabecera Limpia y Proporción del Logo Oficial:**
   - La franja superior bicolor muestra `ELECTROPERU S.A. • SEDES LIMA, MANTARO Y TUMBES` a la izquierda y `LEY N° 27942 • D. LEG. N° 1410` a la derecha.
   - El cabezal blanco exhibe únicamente el logotipo oficial `electroperu / la energía de los peruanos` con proporción intacta `1.926:1` (esfera orbital `e` perfectamente circular), separador vertical, título limpio `PREVENCIÓN DEL HOSTIGAMIENTO SEXUAL LABORAL` y pastilla numerada (`01 / 10` a `10 / 10`), libre de ruido visual o cajetines recargados.
2. **Pie Inferior Derecho en 2 Azules y Nueva Firma Organizacional:**
   - La banda inferior presenta a la izquierda el fondo azul corporativo `#00559F` con `www.gob.pe/electroperu`, una transición diagonal en celeste `#34B4E4` y a la derecha el bloque claro con dos líneas en tonalidades azules corporativas:
     - Línea 1: **Subgerencia de Gestión Humana**
     - Línea 2: **Gerencia de Administración y Finanzas**
3. **Verificación de Textos Nuevos Solicitados por el Usuario:**
   - **Flyer 03 (`El Principio de Autoridad y el Entorno Laboral`):** Incorpora literalmente en el concepto clave, en el Bloque 03 (*Terceros y Representación*) y en el cuadro normativo inferior la cobertura extendida a *"contratistas o terceros, o comunidades aledañas, o cuando se actúe en representación de ELECTROPERU S.A., o cuando se porte el uniforme de la Empresa"*.
   - **Flyer 04 (`Obligaciones de ELECTROPERU S.A. frente al HSL`):** Despliega el nombre completo **"Comité de Intervención Frente al Hostigamiento Sexual"** sin abreviaturas ambiguas en el concepto clave, en el Bloque 01 (*Capacitación Obligatoria*, incluyendo formación anual especializada a la Subgerencia de Gestión Humana y al Comité de Intervención Frente al Hostigamiento Sexual), en el Bloque 02 y en el bloque normativo inferior.
   - **Flyer 07 (`Pasos y Plazos para Presentar una Denuncia`):** Indica expresamente que *"existe un formato para la denuncia disponible en el portal web oficial"* tanto en el banner superior como en el Paso 1 y en el bloque inferior junto al código QR que enlaza directamente a `https://www.gob.pe/institucion/electroperu/campa%C3%B1as/40531-juntos-contra-el-hostigamiento-tu-voz-importa`.
   - **Flyer 10 (`Canales de Ayuda y Plataforma ALIADA`):** Presenta los dos códigos QR limpios (sin textos superpuestos que obstruyan los módulos centrales), perfectamente escaneables a simple vista (`ALIADA SUNAFIL` y `D.S. 014-2019 / Ley`).
