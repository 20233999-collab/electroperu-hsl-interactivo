# INFORME DE AUDITORÍA DE CALIDAD — FASE 3 (GATE 3): ITERACIÓN v4 (`flyers_hsl/dist_v4/`)
## Campaña de Pastillas Informativas: Prevención del Hostigamiento Sexual Laboral (HSL) — ELECTROPERU S.A.

- **Entidad Auditada:** ELECTROPERU S.A. (`www.gob.pe/electroperu`)
- **Área Responsable:** Subgerencia de Gestión Humana / Gerencia de Administración y Finanzas
- **Directorio de Entregables Auditados:** `/home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/`
- **Entregables Verificados:** 10 Infografías PNG v4 (`1080x1920 px`, 9:16) + Presentación Editable Nativa v4 (`Campana_HSL_ELECTROPERU_Editable_v4.pptx`)
- **Auditor Responsable:** `Agent-AuditorQA`
- **Veredicto Global:** **PASS (100 / 100 — 11/11 QRs DECODIFICADOS CON HTTP 200 + PPTX v4 NATIVO CON HIPERVÍNCULO VALIDADO)**

---

## 1. Escaneo Óptico Real de los 11 Códigos QR desde `flyers_hsl/dist_v4/*.png` (`jsQR` + `curl HTTP 200`)

Se ejecutó la decodificación directa sobre la matriz de píxeles de los 10 archivos PNG finales en `/home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/` y se verificó la respuesta HTTP de cada URL decodificada mediante `curl -ILs -o /dev/null -w "%{http_code}"`:

| # QR | Archivo PNG (`flyers_hsl/dist_v4/`) | Sección / Etiqueta en Flyer | URL Exacta Decodificada desde el PNG (`jsQR`) | HTTP (`curl`) | Estado |
| :-: | :--- | :--- | :--- | :-: | :-: |
| **01** | [flyer_01_que_es_el_hsl.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_01_que_es_el_hsl.png) | `Plataforma Oficial: gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **02** | [flyer_02_manifestaciones_y_conductas.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_02_manifestaciones_y_conductas.png) | `Plataforma Oficial: gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **03** | [flyer_03_principio_autoridad_y_entorno.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_03_principio_autoridad_y_entorno.png) | `Plataforma Oficial: gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **04** | [flyer_04_obligaciones_del_empleador.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_04_obligaciones_del_empleador.png) | `Plataforma Oficial: gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **05** | [flyer_05_derechos_de_los_trabajadores.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_05_derechos_de_los_trabajadores.png) | `Plataforma Oficial: gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **06** | [flyer_06_rol_del_comite_de_intervencion.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_06_rol_del_comite_de_intervencion.png) | `Plataforma Oficial: gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **07** | [flyer_07_flujograma_y_pasos_denuncia.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_07_flujograma_y_pasos_denuncia.png) | `Portal Oficial: gob.pe/electroperu` | `https://www.gob.pe/institucion/electroperu/campa%C3%B1as/40531-juntos-contra-el-hostigamiento-tu-voz-importa` | `200` | **PASS** |
| **08** | [flyer_08_medidas_de_proteccion_inmediata.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_08_medidas_de_proteccion_inmediata.png) | `Plataforma Oficial: gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **09** | [flyer_09_sanciones_y_consecuencias.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_09_sanciones_y_consecuencias.png) | `Plataforma Oficial: gob.pe/sunafil (ALIADA)` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **10-A** | [flyer_10_canales_ayuda_y_plataforma_aliada.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_10_canales_ayuda_y_plataforma_aliada.png) (QR Izq.) | `ALIADA SUNAFIL` | `https://www.gob.pe/institucion/sunafil/campa%C3%B1as/143346-aplicativo-aliada-tu-asesora-frente-al-hostigamiento-sexual` | `200` | **PASS** |
| **10-B** | [flyer_10_canales_ayuda_y_plataforma_aliada.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_10_canales_ayuda_y_plataforma_aliada.png) (QR Der.) | `D. S. N.° 014-2019` | `https://www.gob.pe/institucion/mimp/normas-legales/285411-014-2019-mimp` | `200` | **PASS** |

---

## 2. Validación de `Campana_HSL_ELECTROPERU_Editable_v4.pptx` (`python-pptx`)

Archivo auditado: [Campana_HSL_ELECTROPERU_Editable_v4.pptx](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/Campana_HSL_ELECTROPERU_Editable_v4.pptx):

- **Cantidad de Diapositivas y Dimensiones:** `10 slides` de `7.5 x 13.333 in` exactos (`9:16`).
- **Cuadros de Texto Editables Nativos:** `605 text shapes` editables (`61` en slides 1, 2, 4, 5, 6, 8, 9; `51` en slide 3; `63` en slide 7; `64` en slide 10).
- **Eliminación de Barra Superior Antiguo Banner:**
  - `"ELECTROPERU S.A. • SEDES LIMA, MANTARO Y TUMBES"` → **Ausente (`False` en 10/10 slides)**.
- **Verificación de Textos y Estructura v4:**
  - `"¡Un solo acto puede constituir hostigamiento sexual!"` en Slide 01 → **Presente (`True`)**.
  - `"ESCANEA Y CONOCE LOS CANALES DE ORIENTACIÓN"` → **Presente en 10/10 slides (`True`)**.
  - Ausencia de URL cruda impresa (`https://www.gob.pe/institucion/electroperu...`) en el texto visible de Slide 07 → **Confirmado (`raw_url = False`)**.
  - **Hipervínculo Nativo en Botón de Slide 07 (`Ir al Formato de Denuncia ↗`):** **Confirmado (`True`)** — tanto a nivel de `run.hyperlink.address` como `shape.click_action.hyperlink.address` apunta a `https://www.gob.pe/institucion/electroperu/campa%C3%B1as/40531-juntos-contra-el-hostigamiento-tu-voz-importa`.

---

## 3. Inspección Visual Directa de las Infografías v4 (`dist_v4/`)

Inspeccionadas visualmente con `read_file` las láminas [flyer_01_que_es_el_hsl.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_01_que_es_el_hsl.png), [flyer_02_manifestaciones_y_conductas.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_02_manifestaciones_y_conductas.png), [flyer_07_flujograma_y_pasos_denuncia.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_07_flujograma_y_pasos_denuncia.png) y [flyer_10_canales_ayuda_y_plataforma_aliada.png](file:///home/laptop/Documentos/TRD_serviciocapa/flyers_hsl/dist_v4/flyer_10_canales_ayuda_y_plataforma_aliada.png):

1. **Sin Primer Banner Superior:** La franja oscura superior fue eliminada por completo; el lienzo inicia directamente con el cabezal blanco limpio que contiene el logo oficial `electroperu / la energía de los peruanos` (proporción intacta `1.926:1`), el título institucional `PREVENCIÓN DEL HOSTIGAMIENTO SEXUAL LABORAL` y el indicador `01 / 10`..`10 / 10`.
2. **Pastilla de Categoría Reubicada Debajo de la Descripción:** En el bloque hero, aparece primero el gran título principal, debajo la caja de definición/concepto con barra lateral vertical y, **debajo de la descripción**, la pastilla de categoría (`CONCEPTOS CLAVE`, `ALERTA PREVENTIVA`, `RUTA DE ATENCIÓN • FORMATO OFICIAL DE DENUNCIA`, `DIRECTORIO Y RECURSOS OFICIALES`).
3. **Tarjetas Compactas sin Aire Blanco Excesivo:** Las 4 tarjetas de la grilla presentan una proporción compacta y equilibrada, con la barra de acento inferior pegada a corta distancia del párrafo descriptivo.
4. **Banner Destacado Debajo de las 4 Tarjetas:** Inmediatamente debajo de la grilla de tarjetas se ubica la tarjeta destacada de fondo celeste claro con icono circular `!` y borde izquierdo azul (ej. *"¡Un solo acto puede constituir hostigamiento sexual!"* en Flyer 01; *"¡En el trabajo presencial y remoto también aplica!"* en Flyer 02; *"¡Formato oficial de denuncia disponible para ti!"* con el botón limpio **`Ir al Formato de Denuncia ↗`** sin URL cruda en Flyer 07).
5. **Bloque Inferior Dividido en Marco Normativo + Orientación y Ayuda con QR Grande:**
   - Una barra horizontal independiente para **`⚖ Marco normativo: Ley N.° 27942, D. Leg. N.° 1410 y D. S. N.° 014-2019-MIMP.`**
   - Debajo, el panel oscuro **`ORIENTACIÓN Y AYUDA CONFIDENCIAL — ESCANEA Y CONOCE LOS CANALES DE ORIENTACIÓN`** con un código QR de gran tamaño y alto contraste a la derecha (y doble QR grande en el Flyer 10).
