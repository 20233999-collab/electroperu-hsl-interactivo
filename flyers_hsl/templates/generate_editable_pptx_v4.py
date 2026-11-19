#!/usr/bin/env python3
"""
Generador de PowerPoint Editable V4.0 (obs02) 9:16 (7.5 in x 13.333 in) para ELECTROPERU S.A.
Implementa exactamente la arquitectura visual de observaciones/obs02/sugerencias.pptx en dist_v4/.
"""
import json
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATA_PATH = os.path.join(ROOT, 'content', 'flyers_data_v4.json')
ASSETS_DIR = os.path.join(ROOT, 'assets')
OUT_PPTX = os.path.join(ROOT, 'dist_v4', 'Campana_HSL_ELECTROPERU_Editable_v4.pptx')

LOGO_PATH = os.path.join(ASSETS_DIR, 'logo_electroperu_oficial_v3.png')
QR_ALIADA = os.path.join(ASSETS_DIR, 'qr_aliada.png')
QR_LEY = os.path.join(ASSETS_DIR, 'qr_ley27942.png')
QR_ELP = os.path.join(ASSETS_DIR, 'qr_electroperu.png')

# Colores Oficiales Manual ELECTROPERU
C_BLUE = RGBColor(0x00, 0x55, 0x9F)       # #00559F PANTONE 286 PC
C_CYAN = RGBColor(0x34, 0xB4, 0xE4)       # #34B4E4 PANTONE 298 PC
C_NAVY = RGBColor(0x00, 0x3F, 0x70)       # #003F70 Azul Marino Oscuro
C_LIGHT_BLUE = RGBColor(0x00, 0x66, 0xB3) # #0066B3 Azul más claro legible
C_MEDIUM = RGBColor(0x2D, 0x6C, 0xB5)     # #2D6CB5
C_ICE = RGBColor(0xC4, 0xDA, 0xF1)        # #C4DAF1
C_BG = RGBColor(0xF4, 0xF8, 0xFC)         # #F4F8FC
C_ICE_SOFT = RGBColor(0xE6, 0xF6, 0xFC)   # #E6F6FC
C_CARD_TAG = RGBColor(0xEB, 0xF3, 0xFA)   # #EBF3FA
C_BLACK = RGBColor(0x1A, 0x17, 0x1B)      # #1A171B
C_WHITE = RGBColor(0xFF, 0xFF, 0xFF)      # #FFFFFF
C_AMBER = RGBColor(0xFF, 0xC0, 0x00)      # #FFC000
C_AMBER_DARK = RGBColor(0xB4, 0x53, 0x09) # #B45309
C_RED = RGBColor(0xDC, 0x26, 0x26)        # #DC2626
C_TEAL = RGBColor(0x0D, 0x94, 0x88)       # #0D9488


def add_rect(slide, shape_type, left, top, width, height, fill_rgb=None, line_rgb=None, line_pt=1.0):
    sh = slide.shapes.add_shape(shape_type, left, top, width, height)
    if fill_rgb is not None:
        sh.fill.solid()
        sh.fill.fore_color.rgb = fill_rgb
    else:
        sh.fill.background()
    if line_rgb is not None:
        sh.line.color.rgb = line_rgb
        sh.line.width = Pt(line_pt)
    else:
        sh.line.fill.background()
    if shape_type == MSO_SHAPE.ROUNDED_RECTANGLE:
        try:
            sh.adjustments[0] = 0.06
        except Exception:
            pass
    return sh


def add_textbox(slide, left, top, width, height, text, font_size=14, bold=False, color=C_BLACK,
                align=PP_ALIGN.LEFT, font_name='Calibri', valign=MSO_ANCHOR.TOP, hyperlink_url=None):
    tb = slide.shapes.add_textbox(left, top, width, height)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = valign
    tf.margin_left = Inches(0.04)
    tf.margin_right = Inches(0.04)
    tf.margin_top = Inches(0.02)
    tf.margin_bottom = Inches(0.02)
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.name = font_name
    run.font.size = Pt(font_size)
    run.font.bold = bold
    run.font.color.rgb = color
    if hyperlink_url:
        run.hyperlink.address = hyperlink_url
    return tb


def get_card_colors(infographic_type):
    mapping = {
        'warning_grid': [C_RED, C_AMBER_DARK, C_RED, C_BLUE],
        'hierarchy_flow': [C_RED, C_BLUE, C_TEAL],
        'shield_pillars': [C_BLUE, C_TEAL, C_MEDIUM, C_NAVY],
        'rights_checklist': [C_TEAL, C_BLUE, C_TEAL, C_MEDIUM],
        'step_by_step_channels': [C_BLUE, C_AMBER_DARK, C_MEDIUM, C_TEAL],
        'timeline_plazos': [C_TEAL, C_AMBER_DARK, C_RED, C_BLUE],
        'severity_scale': [C_BLUE, C_AMBER_DARK, C_RED, C_NAVY],
        'culture_manifesto': [C_BLUE, C_TEAL, C_AMBER_DARK, C_NAVY],
    }
    return mapping.get(infographic_type, [C_BLUE, C_MEDIUM, C_NAVY, C_TEAL])


def build_editable_pptx_v4():
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        flyers = json.load(f)

    prs = Presentation()
    prs.slide_width = Inches(7.5)
    prs.slide_height = Inches(13.333)
    blank_layout = prs.slide_layouts[6]

    for flyer in flyers:
        slide = prs.slides.add_slide(blank_layout)
        num_id = int(flyer['id'])
        card_colors = get_card_colors(flyer['infographic_type'])

        # 0. Fondo general de la diapositiva
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(7.5), Inches(13.333), fill_rgb=C_BG)

        # ======================================================================
        # 1. CABECERA INSTITUCIONAL LIMPIA (SIN PRIMER BANNER SUPERIOR)
        # ======================================================================
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(7.5), Inches(1.04),
                 fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.2)

        # Logo Oficial manteniendo proporción exacta 860:586 (solo especificamos width)
        slide.shapes.add_picture(LOGO_PATH, Inches(0.25), Inches(0.08), width=Inches(1.32))

        # Título del programa en cabecera
        add_textbox(slide, Inches(1.80), Inches(0.16), Inches(4.35), Inches(0.72),
                    "PREVENCIÓN DEL HOSTIGAMIENTO SEXUAL LABORAL",
                    font_size=15, bold=True, color=C_NAVY, valign=MSO_ANCHOR.MIDDLE)

        # Badge de edición 01 / 10 .. 10 / 10
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.28), Inches(0.24), Inches(0.96), Inches(0.54),
                 fill_rgb=C_BLUE, line_rgb=C_CYAN, line_pt=1.5)
        add_textbox(slide, Inches(6.28), Inches(0.26), Inches(0.96), Inches(0.50),
                    f"{flyer['id']} / 10", font_size=14, bold=True, color=C_WHITE,
                    align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE)

        # ======================================================================
        # 2. HERO PROTAGONISTA (TÍTULO + DESCRIPCIÓN ARRIBA, CATEGORÍA DEBAJO)
        # ======================================================================
        hero_top = Inches(1.18)
        hero_h = Inches(2.26)
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.25), hero_top, Inches(7.0), hero_h,
                 fill_rgb=C_NAVY, line_rgb=C_CYAN, line_pt=1.5)

        # Título Hero protagonista arriba
        add_textbox(slide, Inches(0.45), Inches(1.28), Inches(6.6), Inches(0.78),
                    flyer['title'], font_size=21.5, bold=True, color=C_WHITE)

        # Descripción / Idea Fuerza (key_concept)
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.48), Inches(2.10), Inches(6.54), Inches(0.76),
                 fill_rgb=C_BLUE, line_rgb=C_CYAN, line_pt=1.0)
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0.48), Inches(2.10), Inches(0.08), Inches(0.76),
                 fill_rgb=C_AMBER)
        kc_font = 10.2 if num_id == 3 else 11.2
        add_textbox(slide, Inches(0.64), Inches(2.13), Inches(6.30), Inches(0.70),
                    flyer['key_concept'], font_size=kc_font, bold=True, color=C_WHITE, valign=MSO_ANCHOR.MIDDLE)

        # Pastilla de categoría DEBAJO del bloque de título/descripción
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.48), Inches(2.98), Inches(3.75), Inches(0.32),
                 fill_rgb=C_AMBER if num_id in (2, 3, 7, 8, 9, 10) else C_CYAN)
        add_textbox(slide, Inches(0.52), Inches(2.99), Inches(3.67), Inches(0.30),
                    flyer['category_badge'], font_size=9.5, bold=True, color=C_NAVY, valign=MSO_ANCHOR.MIDDLE)

        # ======================================================================
        # 3. TARJETAS COMPACTAS Y EQUILIBRADAS (MENOS AIRE BLANCO)
        # ======================================================================
        sections = flyer['sections']
        if flyer['infographic_type'] == 'hierarchy_flow':
            # 3 Tarjetas Horizontales Compactas (Flyer 03)
            card_top_start = Inches(3.58)
            card_h = Inches(1.66)
            card_gap = Inches(0.14)
            for idx, sec in enumerate(sections):
                c_top = card_top_start + idx * (card_h + card_gap)
                accent_c = card_colors[idx % len(card_colors)]
                add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.25), c_top, Inches(7.0), card_h,
                         fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.5)
                add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0.25), c_top + Inches(0.10), Inches(0.10), card_h - Inches(0.20),
                         fill_rgb=accent_c)
                badge_txt = f"0{idx + 1} • {sec.get('metric_or_badge') or sec.get('tag')}"
                add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.50), c_top + Inches(0.14), Inches(2.3), Inches(0.28),
                         fill_rgb=C_CARD_TAG, line_rgb=C_ICE, line_pt=1.0)
                add_textbox(slide, Inches(0.54), c_top + Inches(0.15), Inches(2.22), Inches(0.26),
                            badge_txt, font_size=9.5, bold=True, color=accent_c, valign=MSO_ANCHOR.MIDDLE)
                add_textbox(slide, Inches(0.48), c_top + Inches(0.45), Inches(6.5), Inches(0.36),
                            sec['heading'], font_size=15.5, bold=True, color=C_NAVY)
                body_font = 10.8 if idx == 2 else 11.8
                add_textbox(slide, Inches(0.48), c_top + Inches(0.82), Inches(6.5), Inches(0.76),
                            sec['body'], font_size=body_font, bold=False, color=C_BLACK)
        else:
            # Grilla 2x2 de 4 Tarjetas Compactas
            grid_top = Inches(3.58)
            col_w = Inches(3.40)
            row_h = Inches(2.55)
            gap_x = Inches(0.20)
            gap_y = Inches(0.16)
            for idx, sec in enumerate(sections):
                r = idx // 2
                c = idx % 2
                c_left = Inches(0.25) + c * (col_w + gap_x)
                c_top = grid_top + r * (row_h + gap_y)
                accent_c = card_colors[idx % len(card_colors)]

                add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, c_left, c_top, col_w, row_h,
                         fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.5)
                add_rect(slide, MSO_SHAPE.RECTANGLE, c_left + Inches(0.12), c_top, col_w - Inches(0.24), Inches(0.08),
                         fill_rgb=accent_c)

                badge_txt = f"0{idx + 1} • {sec.get('metric_or_badge') or sec.get('tag')}"
                add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, c_left + Inches(0.18), c_top + Inches(0.18),
                         col_w - Inches(0.36), Inches(0.32), fill_rgb=C_CARD_TAG, line_rgb=C_ICE, line_pt=1.0)
                add_textbox(slide, c_left + Inches(0.22), c_top + Inches(0.19), col_w - Inches(0.44), Inches(0.30),
                            badge_txt, font_size=9.5, bold=True, color=accent_c, valign=MSO_ANCHOR.MIDDLE)

                head_font = 13.5 if len(sec['heading']) > 32 else 15.2
                add_textbox(slide, c_left + Inches(0.16), c_top + Inches(0.56), col_w - Inches(0.32), Inches(0.58),
                            sec['heading'], font_size=head_font, bold=True, color=C_NAVY)

                add_textbox(slide, c_left + Inches(0.16), c_top + Inches(1.16), col_w - Inches(0.32), Inches(1.16),
                            sec['body'], font_size=11.5, bold=False, color=C_BLACK)

                add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, c_left + Inches(0.18), c_top + row_h - Inches(0.18),
                         col_w - Inches(0.36), Inches(0.07), fill_rgb=accent_c)

        # ======================================================================
        # 4. BANNER DESTACADO DEBAJO DE LAS TARJETAS (banner_highlight)
        # ======================================================================
        bh = flyer.get('banner_highlight') or flyer.get('highlight_box', {})
        bh_top = Inches(8.96)
        bh_h = Inches(1.12)
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.25), bh_top, Inches(7.0), bh_h,
                 fill_rgb=C_ICE_SOFT, line_rgb=C_CYAN, line_pt=1.8)
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0.25), bh_top + Inches(0.10), Inches(0.10), bh_h - Inches(0.20),
                 fill_rgb=C_BLUE)

        if num_id == 7:
            # En Slide 07 incluimos botón gráfico estilizado con hipervínculo nativo (sin URL literal larga)
            target_url = bh.get('normative_link') or 'https://www.gob.pe/institucion/electroperu/campa%C3%B1as/40531-juntos-contra-el-hostigamiento-tu-voz-importa'
            cta_label = bh.get('cta_button_label') or 'Ir al Formato de Denuncia ↗'
            add_textbox(slide, Inches(0.45), bh_top + Inches(0.10), Inches(4.65), Inches(0.38),
                        bh['title'], font_size=13.5, bold=True, color=C_NAVY)
            add_textbox(slide, Inches(0.45), bh_top + Inches(0.48), Inches(4.65), Inches(0.56),
                        bh['text'], font_size=10.5, bold=False, color=C_BLACK)

            btn_sh = add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.18), bh_top + Inches(0.26),
                              Inches(1.92), Inches(0.60), fill_rgb=C_BLUE, line_rgb=C_CYAN, line_pt=1.5)
            btn_sh.click_action.hyperlink.address = target_url
            add_textbox(slide, Inches(5.20), bh_top + Inches(0.28), Inches(1.88), Inches(0.56),
                        cta_label, font_size=10.5, bold=True, color=C_WHITE,
                        align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE, hyperlink_url=target_url)
        else:
            add_textbox(slide, Inches(0.45), bh_top + Inches(0.10), Inches(6.65), Inches(0.38),
                        bh['title'], font_size=14.0, bold=True, color=C_NAVY)
            add_textbox(slide, Inches(0.45), bh_top + Inches(0.48), Inches(6.65), Inches(0.56),
                        bh['text'], font_size=10.8, bold=False, color=C_BLACK)

        # ======================================================================
        # 5. ZONA INFERIOR DIVIDIDA EN 2 ESPACIOS CLAROS + QR MÁS GRANDE
        # ======================================================================
        # Espacio A — Marco Normativo
        norm_top = Inches(10.20)
        norm_h = Inches(0.46)
        norm_text = flyer.get('normative_banner') or 'Marco normativo: Ley N.° 27942, D. Leg. N.° 1410 y D. S. N.° 014-2019-MIMP.'
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.25), norm_top, Inches(7.0), norm_h,
                 fill_rgb=C_BLUE, line_rgb=C_CYAN, line_pt=1.5)
        add_textbox(slide, Inches(0.42), norm_top + Inches(0.05), Inches(6.66), Inches(0.36),
                    norm_text, font_size=11.0, bold=True, color=C_WHITE, valign=MSO_ANCHOR.MIDDLE)

        # Espacio B — Orientación y Ayuda + QR Grande
        ori_top = Inches(10.76)
        ori_h = Inches(1.88)
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.25), ori_top, Inches(7.0), ori_h,
                 fill_rgb=C_NAVY, line_rgb=C_CYAN, line_pt=1.8)

        qr_cta = flyer.get('qr_cta_text') or 'ESCANEA Y CONOCE LOS CANALES DE ORIENTACIÓN'
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.45), ori_top + Inches(0.16), Inches(3.25), Inches(0.28),
                 fill_rgb=C_AMBER)
        add_textbox(slide, Inches(0.50), ori_top + Inches(0.17), Inches(3.15), Inches(0.26),
                    "ORIENTACIÓN Y AYUDA CONFIDENCIAL", font_size=9.5, bold=True, color=C_NAVY, valign=MSO_ANCHOR.MIDDLE)

        if num_id == 10:
            add_textbox(slide, Inches(0.45), ori_top + Inches(0.50), Inches(3.95), Inches(0.68),
                        qr_cta, font_size=14.0, bold=True, color=C_WHITE)
            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.45), ori_top + Inches(1.30), Inches(1.95), Inches(0.36),
                     fill_rgb=C_BLUE, line_rgb=C_CYAN, line_pt=1.0)
            add_textbox(slide, Inches(0.48), ori_top + Inches(1.32), Inches(1.89), Inches(0.32),
                        "gob.pe/sunafil (ALIADA)", font_size=9.5, bold=True, color=C_WHITE,
                        align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE)
            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(2.50), ori_top + Inches(1.30), Inches(1.65), Inches(0.36),
                     fill_rgb=C_TEAL)
            add_textbox(slide, Inches(2.52), ori_top + Inches(1.32), Inches(1.61), Inches(0.32),
                        "Línea Gratuita 1819", font_size=9.5, bold=True, color=C_WHITE,
                        align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE)

            # 2 QRs Grandes limpios en Slide 10
            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.48), ori_top + Inches(0.14), Inches(1.32), Inches(1.60),
                     fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.0)
            slide.shapes.add_picture(QR_ALIADA, Inches(4.56), ori_top + Inches(0.19), width=Inches(1.16))
            add_textbox(slide, Inches(4.50), ori_top + Inches(1.40), Inches(1.28), Inches(0.28),
                        "ALIADA SUNAFIL", font_size=8.8, bold=True, color=C_NAVY, align=PP_ALIGN.CENTER)

            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.86), ori_top + Inches(0.14), Inches(1.32), Inches(1.60),
                     fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.0)
            slide.shapes.add_picture(QR_LEY, Inches(5.94), ori_top + Inches(0.19), width=Inches(1.16))
            add_textbox(slide, Inches(5.88), ori_top + Inches(1.40), Inches(1.28), Inches(0.28),
                        "D. S. N.° 014-2019", font_size=8.8, bold=True, color=C_NAVY, align=PP_ALIGN.CENTER)
        else:
            add_textbox(slide, Inches(0.45), ori_top + Inches(0.50), Inches(4.65), Inches(0.68),
                        qr_cta, font_size=15.0, bold=True, color=C_WHITE)
            platform_label = "Portal Oficial: gob.pe/electroperu" if num_id == 7 else "Plataforma Oficial: gob.pe/sunafil (ALIADA)"
            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.45), ori_top + Inches(1.32), Inches(2.85), Inches(0.36),
                     fill_rgb=C_BLUE, line_rgb=C_CYAN, line_pt=1.0)
            add_textbox(slide, Inches(0.50), ori_top + Inches(1.34), Inches(2.75), Inches(0.32),
                        platform_label, font_size=9.5, bold=True, color=C_WHITE,
                        align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE)
            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(3.40), ori_top + Inches(1.32), Inches(1.65), Inches(0.36),
                     fill_rgb=C_TEAL)
            add_textbox(slide, Inches(3.42), ori_top + Inches(1.34), Inches(1.61), Inches(0.32),
                        "Línea Gratuita 1819", font_size=9.5, bold=True, color=C_WHITE,
                        align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE)

            # QR Grande limpio (1.52 in x 1.52 in)
            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.42), ori_top + Inches(0.12), Inches(1.64), Inches(1.64),
                     fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.2)
            qr_img = QR_ELP if num_id == 7 else QR_ALIADA
            slide.shapes.add_picture(qr_img, Inches(5.48), ori_top + Inches(0.18), width=Inches(1.52))

        # ======================================================================
        # 6. PIE INSTITUCIONAL FINAL
        # ======================================================================
        bot_y = Inches(12.78)
        bot_h = Inches(0.553)
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0), bot_y, Inches(3.85), bot_h, fill_rgb=C_BLUE)
        add_textbox(slide, Inches(0.25), bot_y + Inches(0.08), Inches(3.5), Inches(0.38),
                    "www.gob.pe/electroperu", font_size=11, bold=True, color=C_WHITE, valign=MSO_ANCHOR.MIDDLE)

        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(3.85), bot_y, Inches(0.30), bot_h, fill_rgb=C_CYAN)
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(4.15), bot_y, Inches(3.35), bot_h, fill_rgb=C_ICE_SOFT)

        add_textbox(slide, Inches(4.20), bot_y + Inches(0.04), Inches(3.15), Inches(0.24),
                    "Subgerencia de Gestión Humana",
                    font_size=10.5, bold=True, color=C_NAVY, align=PP_ALIGN.RIGHT, valign=MSO_ANCHOR.MIDDLE)
        add_textbox(slide, Inches(4.20), bot_y + Inches(0.27), Inches(3.15), Inches(0.24),
                    "Gerencia de Administración y Finanzas",
                    font_size=10.0, bold=True, color=C_LIGHT_BLUE, align=PP_ALIGN.RIGHT, valign=MSO_ANCHOR.MIDDLE)

    os.makedirs(os.path.dirname(OUT_PPTX), exist_ok=True)
    prs.save(OUT_PPTX)
    print(f"[OK] Saved editable V4 PPTX ({len(prs.slides)} slides) -> {OUT_PPTX} ({os.path.getsize(OUT_PPTX) // 1024} KB)")


if __name__ == '__main__':
    build_editable_pptx_v4()
