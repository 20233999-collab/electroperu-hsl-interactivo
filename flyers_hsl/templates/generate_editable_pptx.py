#!/usr/bin/env python3
"""
Generador de PowerPoint Editable 9:16 (7.5 in x 13.333 in) para ELECTROPERU S.A.
Crea 10 diapositivas con formas y cuadros de texto 100% nativos y editables en PowerPoint.
"""
import json
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DATA_PATH = os.path.join(ROOT, 'content', 'flyers_data.json')
ASSETS_DIR = os.path.join(ROOT, 'assets')
OUT_PPTX = os.path.join(ROOT, 'dist', 'Campana_HSL_ELECTROPERU_Editable.pptx')

LOGO_PATH = os.path.join(ASSETS_DIR, 'logo_electroperu_oficial_v3.png')
QR_ALIADA = os.path.join(ASSETS_DIR, 'qr_aliada.png')
QR_LEY = os.path.join(ASSETS_DIR, 'qr_ley27942.png')
QR_ELP = os.path.join(ASSETS_DIR, 'qr_electroperu.png')

# Colores Oficiales Manual ELECTROPERU
C_BLUE = RGBColor(0x00, 0x55, 0x9F)      # #00559F PANTONE 286 PC
C_CYAN = RGBColor(0x34, 0xB4, 0xE4)      # #34B4E4 PANTONE 298 PC
C_NAVY = RGBColor(0x00, 0x3F, 0x70)      # #003F70 Azul Marino Oscuro
C_LIGHT_BLUE = RGBColor(0x00, 0x66, 0xB3)# #0066B3 Azul más claro legible
C_MEDIUM = RGBColor(0x2D, 0x6C, 0xB5)    # #2D6CB5
C_ICE = RGBColor(0xC4, 0xDA, 0xF1)       # #C4DAF1
C_BG = RGBColor(0xF4, 0xF8, 0xFC)        # #F4F8FC
C_ICE_SOFT = RGBColor(0xE6, 0xF6, 0xFC)  # #E6F6FC
C_CARD_TAG = RGBColor(0xEB, 0xF3, 0xFA)  # #EBF3FA
C_BLACK = RGBColor(0x1A, 0x17, 0x1B)     # #1A171B
C_WHITE = RGBColor(0xFF, 0xFF, 0xFF)     # #FFFFFF
C_AMBER = RGBColor(0xFF, 0xC0, 0x00)     # #FFC000
C_AMBER_DARK = RGBColor(0xB4, 0x53, 0x09)# #B45309
C_RED = RGBColor(0xDC, 0x26, 0x26)       # #DC2626
C_TEAL = RGBColor(0x0D, 0x94, 0x88)      # #0D9488


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
                align=PP_ALIGN.LEFT, font_name='Calibri', valign=MSO_ANCHOR.TOP):
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


def build_Editable_pptx():
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
        # ZONA 1: CABECERA INSTITUCIONAL LIMPIA (Sin Subgerencia en cabecera)
        # ======================================================================
        # Cinta Bicolor Superior
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(5.1), Inches(0.32), fill_rgb=C_BLUE)
        add_textbox(slide, Inches(0.22), Inches(0.03), Inches(4.8), Inches(0.26),
                    "ELECTROPERU S.A. • SEDES LIMA, MANTARO Y TUMBES",
                    font_size=9.5, bold=True, color=C_WHITE, valign=MSO_ANCHOR.MIDDLE)

        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(5.1), Inches(0), Inches(2.4), Inches(0.32), fill_rgb=C_CYAN)
        add_textbox(slide, Inches(5.15), Inches(0.03), Inches(2.25), Inches(0.26),
                    "LEY N° 27942 • D. LEG. N° 1410",
                    font_size=9.5, bold=True, color=C_NAVY, align=PP_ALIGN.RIGHT, valign=MSO_ANCHOR.MIDDLE)

        # Banda blanca de cabecera
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0), Inches(0.32), Inches(7.5), Inches(1.05),
                 fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.2)

        # Logo Oficial manteniendo proporción exacta 860:586 (solo especificamos width)
        slide.shapes.add_picture(LOGO_PATH, Inches(0.25), Inches(0.39), width=Inches(1.34))

        # Título del programa en cabecera (sin "SUBGERENCIA DE GESTIÓN HUMANA • COMITÉ CIFHS")
        add_textbox(slide, Inches(1.82), Inches(0.48), Inches(4.35), Inches(0.72),
                    "PREVENCIÓN DEL HOSTIGAMIENTO SEXUAL LABORAL",
                    font_size=15, bold=True, color=C_NAVY, valign=MSO_ANCHOR.MIDDLE)

        # Badge de edición 01 / 10 .. 10 / 10
        badge_sh = add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.28), Inches(0.55), Inches(0.96), Inches(0.56),
                            fill_rgb=C_BLUE, line_rgb=C_CYAN, line_pt=1.5)
        add_textbox(slide, Inches(6.28), Inches(0.58), Inches(0.96), Inches(0.50),
                    f"{flyer['id']} / 10", font_size=14, bold=True, color=C_WHITE,
                    align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE)

        # ======================================================================
        # ZONA 2: HERO BANNER
        # ======================================================================
        hero_top = Inches(1.52)
        hero_h = Inches(2.38)
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.25), hero_top, Inches(7.0), hero_h,
                 fill_rgb=C_NAVY, line_rgb=C_CYAN, line_pt=1.5)

        # Badge de categoría
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.48), Inches(1.70), Inches(3.6), Inches(0.32),
                 fill_rgb=C_AMBER if num_id in (2, 3, 7, 8, 9, 10) else C_CYAN)
        add_textbox(slide, Inches(0.52), Inches(1.71), Inches(3.52), Inches(0.30),
                    flyer['category_badge'], font_size=9.5, bold=True, color=C_NAVY, valign=MSO_ANCHOR.MIDDLE)

        # Título Hero editable
        add_textbox(slide, Inches(0.45), Inches(2.08), Inches(6.6), Inches(0.86),
                    flyer['title'], font_size=22, bold=True, color=C_WHITE)

        # Idea Fuerza (Key Concept) editable
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.48), Inches(2.98), Inches(6.54), Inches(0.76),
                 fill_rgb=C_BLUE, line_rgb=C_CYAN, line_pt=1.0)
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0.48), Inches(2.98), Inches(0.08), Inches(0.76),
                 fill_rgb=C_AMBER)
        kc_font = 10.5 if num_id == 3 else 11.5
        add_textbox(slide, Inches(0.64), Inches(3.01), Inches(6.30), Inches(0.70),
                    flyer['key_concept'], font_size=kc_font, bold=True, color=C_WHITE, valign=MSO_ANCHOR.MIDDLE)

        # ======================================================================
        # ZONA 3: TARJETAS INFOGRÁFICAS PROTAGONISTAS EDITABLES
        # ======================================================================
        sections = flyer['sections']
        if flyer['infographic_type'] == 'hierarchy_flow':
            # 3 Tarjetas Horizontales de ancho completo (Flyer 03)
            card_top_start = Inches(4.08)
            card_h = Inches(2.14)
            card_gap = Inches(0.18)
            for idx, sec in enumerate(sections):
                c_top = card_top_start + idx * (card_h + card_gap)
                accent_c = card_colors[idx % len(card_colors)]
                add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.25), c_top, Inches(7.0), card_h,
                         fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.5)
                # Barra lateral de color
                add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0.25), c_top + Inches(0.12), Inches(0.10), card_h - Inches(0.24),
                         fill_rgb=accent_c)
                # Badge
                badge_txt = f"0{idx + 1} • {sec.get('metric_or_badge') or sec.get('tag')}"
                add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.52), c_top + Inches(0.18), Inches(2.3), Inches(0.32),
                         fill_rgb=C_CARD_TAG, line_rgb=C_ICE, line_pt=1.0)
                add_textbox(slide, Inches(0.56), c_top + Inches(0.19), Inches(2.22), Inches(0.30),
                            badge_txt, font_size=9.5, bold=True, color=accent_c, valign=MSO_ANCHOR.MIDDLE)
                # Título de tarjeta
                add_textbox(slide, Inches(0.50), c_top + Inches(0.55), Inches(6.5), Inches(0.42),
                            sec['heading'], font_size=16.5, bold=True, color=C_NAVY)
                # Cuerpo de tarjeta
                body_font = 11.2 if idx == 2 else 12.2
                add_textbox(slide, Inches(0.50), c_top + Inches(0.98), Inches(6.5), Inches(1.04),
                            sec['body'], font_size=body_font, bold=False, color=C_BLACK)
        else:
            # Grilla 2x2 de 4 Tarjetas Protagonistas
            grid_top = Inches(4.08)
            col_w = Inches(3.40)
            row_h = Inches(3.32)
            gap_x = Inches(0.20)
            gap_y = Inches(0.20)
            for idx, sec in enumerate(sections):
                r = idx // 2
                c = idx % 2
                c_left = Inches(0.25) + c * (col_w + gap_x)
                c_top = grid_top + r * (row_h + gap_y)
                accent_c = card_colors[idx % len(card_colors)]

                add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, c_left, c_top, col_w, row_h,
                         fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.5)
                # Franja superior de color en tarjeta
                add_rect(slide, MSO_SHAPE.RECTANGLE, c_left + Inches(0.12), c_top, col_w - Inches(0.24), Inches(0.09),
                         fill_rgb=accent_c)

                # Badge numérico
                badge_txt = f"0{idx + 1} • {sec.get('metric_or_badge') or sec.get('tag')}"
                add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, c_left + Inches(0.20), c_top + Inches(0.22),
                         col_w - Inches(0.40), Inches(0.36), fill_rgb=C_CARD_TAG, line_rgb=C_ICE, line_pt=1.0)
                add_textbox(slide, c_left + Inches(0.24), c_top + Inches(0.23), col_w - Inches(0.48), Inches(0.34),
                            badge_txt, font_size=10, bold=True, color=accent_c, valign=MSO_ANCHOR.MIDDLE)

                # Título de tarjeta
                head_font = 14.2 if len(sec['heading']) > 32 else 16.0
                add_textbox(slide, c_left + Inches(0.18), c_top + Inches(0.68), col_w - Inches(0.36), Inches(0.68),
                            sec['heading'], font_size=head_font, bold=True, color=C_NAVY)

                # Cuerpo de tarjeta
                add_textbox(slide, c_left + Inches(0.18), c_top + Inches(1.40), col_w - Inches(0.36), Inches(1.62),
                            sec['body'], font_size=12.2, bold=False, color=C_BLACK)

                # Barra visual inferior de tarjeta
                add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, c_left + Inches(0.20), c_top + row_h - Inches(0.22),
                         col_w - Inches(0.40), Inches(0.08), fill_rgb=accent_c)

        # ======================================================================
        # ZONA 4: BLOQUE DE ACCIÓN INFERIOR + QR REAL ESCANEABLE + PIE DERECHO
        # ======================================================================
        hb = flyer['highlight_box']
        foot_top = Inches(11.08)
        foot_h = Inches(1.56)
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.25), foot_top, Inches(7.0), foot_h,
                 fill_rgb=C_NAVY, line_rgb=C_CYAN, line_pt=1.8)

        # Pill de referencia legal
        add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.45), foot_top + Inches(0.14), Inches(3.85), Inches(0.28),
                 fill_rgb=C_BLUE, line_rgb=C_CYAN, line_pt=1.0)
        add_textbox(slide, Inches(0.50), foot_top + Inches(0.15), Inches(3.75), Inches(0.26),
                    hb['law_reference'], font_size=9.5, bold=True, color=C_AMBER, valign=MSO_ANCHOR.MIDDLE)

        # Título y texto de highlight_box
        copy_w = Inches(4.15) if num_id == 10 else Inches(4.25)
        add_textbox(slide, Inches(0.45), foot_top + Inches(0.44), copy_w, Inches(0.42),
                    hb['title'], font_size=13.2, bold=True, color=C_WHITE)
        add_textbox(slide, Inches(0.45), foot_top + Inches(0.86), copy_w, Inches(0.64),
                    hb['text'], font_size=10.2, bold=False, color=C_ICE)

        if num_id == 10:
            # 2 QRs reales limpios en Flyer 10 (ALIADA SUNAFIL y Ley 27942 / D.S. 014-2019-MIMP)
            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.72), foot_top + Inches(0.12), Inches(1.18), Inches(1.32),
                     fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.0)
            slide.shapes.add_picture(QR_ALIADA, Inches(4.83), foot_top + Inches(0.17), width=Inches(0.96))
            add_textbox(slide, Inches(4.74), foot_top + Inches(1.13), Inches(1.14), Inches(0.26),
                        "ALIADA SUNAFIL", font_size=8.5, bold=True, color=C_NAVY, align=PP_ALIGN.CENTER)

            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(5.96), foot_top + Inches(0.12), Inches(1.18), Inches(1.32),
                     fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.0)
            slide.shapes.add_picture(QR_LEY, Inches(6.07), foot_top + Inches(0.17), width=Inches(0.96))
            add_textbox(slide, Inches(5.98), foot_top + Inches(1.13), Inches(1.14), Inches(0.26),
                        "D.S. 014-2019 / Ley", font_size=8.5, bold=True, color=C_NAVY, align=PP_ALIGN.CENTER)
        else:
            # Tarjeta blanca con QR real limpio (Flyer 07 -> electroperu, demás -> aliada)
            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.78), foot_top + Inches(0.14), Inches(2.32), Inches(1.28),
                     fill_rgb=C_WHITE, line_rgb=C_ICE, line_pt=1.0)
            qr_img = QR_ELP if num_id == 7 else QR_ALIADA
            qr_kicker = "FORMATO DENUNCIA" if num_id == 7 else "PLATAFORMA OFICIAL"
            qr_domain = "gob.pe/electroperu" if num_id == 7 else "gob.pe/sunafil"
            slide.shapes.add_picture(qr_img, Inches(4.86), foot_top + Inches(0.22), width=Inches(1.12))
            add_textbox(slide, Inches(6.00), foot_top + Inches(0.26), Inches(1.06), Inches(0.32),
                        qr_kicker, font_size=8.5, bold=True, color=C_BLUE)
            add_textbox(slide, Inches(6.00), foot_top + Inches(0.58), Inches(1.06), Inches(0.34),
                        qr_domain, font_size=9.5, bold=True, color=C_NAVY)
            add_rect(slide, MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.00), foot_top + Inches(0.96), Inches(1.02), Inches(0.28),
                     fill_rgb=C_TEAL)
            add_textbox(slide, Inches(6.00), foot_top + Inches(0.97), Inches(1.02), Inches(0.26),
                        "Línea 1819", font_size=9.0, bold=True, color=C_WHITE,
                        align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE)

        # ======================================================================
        # CINTA BICOLOR INFERIOR (Sin eslogan izq., con Subgerencia/Gerencia der.)
        # ======================================================================
        bot_y = Inches(12.78)
        bot_h = Inches(0.553)
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(0), bot_y, Inches(3.85), bot_h, fill_rgb=C_BLUE)
        add_textbox(slide, Inches(0.25), bot_y + Inches(0.08), Inches(3.5), Inches(0.38),
                    "www.gob.pe/electroperu", font_size=11, bold=True, color=C_WHITE, valign=MSO_ANCHOR.MIDDLE)

        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(3.85), bot_y, Inches(0.30), bot_h, fill_rgb=C_CYAN)
        add_rect(slide, MSO_SHAPE.RECTANGLE, Inches(4.15), bot_y, Inches(3.35), bot_h, fill_rgb=C_ICE_SOFT)

        # Línea 1 (Azul más oscuro #003F70): Subgerencia de Gestión Humana
        add_textbox(slide, Inches(4.20), bot_y + Inches(0.04), Inches(3.15), Inches(0.24),
                    "Subgerencia de Gestión Humana",
                    font_size=10.5, bold=True, color=C_NAVY, align=PP_ALIGN.RIGHT, valign=MSO_ANCHOR.MIDDLE)
        # Línea 2 (Azul más claro #0066B3): Gerencia de Administración y Finanzas
        add_textbox(slide, Inches(4.20), bot_y + Inches(0.27), Inches(3.15), Inches(0.24),
                    "Gerencia de Administración y Finanzas",
                    font_size=10.0, bold=True, color=C_LIGHT_BLUE, align=PP_ALIGN.RIGHT, valign=MSO_ANCHOR.MIDDLE)

    os.makedirs(os.path.dirname(OUT_PPTX), exist_ok=True)
    prs.save(OUT_PPTX)
    print(f"[OK] Saved editable PPTX ({len(prs.slides)} slides) -> {OUT_PPTX} ({os.path.getsize(OUT_PPTX) // 1024} KB)")


if __name__ == '__main__':
    build_Editable_pptx()
