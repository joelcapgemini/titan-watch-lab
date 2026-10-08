"""Render lab markdown to PDFs with reportlab.

usage: build_lab_pdf.py <repo root> instructions|scenario <out.pdf> [scenario folder]
"""
import re
import sys
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(sys.argv[1])
MODE = sys.argv[2]
OUT = Path(sys.argv[3])

ss = getSampleStyleSheet()
BODY = ParagraphStyle("body", parent=ss["Normal"], fontName="Helvetica", fontSize=10, leading=14, spaceAfter=6)
H1 = ParagraphStyle("h1", parent=ss["Heading1"], fontName="Helvetica-Bold", fontSize=20, leading=24, spaceBefore=4, spaceAfter=10, textColor=colors.HexColor("#1b1f3b"))
H2 = ParagraphStyle("h2", parent=ss["Heading2"], fontName="Helvetica-Bold", fontSize=13.5, leading=17, spaceBefore=12, spaceAfter=5, textColor=colors.HexColor("#3b3f8c"))
H3 = ParagraphStyle("h3", parent=ss["Heading3"], fontName="Helvetica-Bold", fontSize=11, leading=14, spaceBefore=8, spaceAfter=3)
CODE = ParagraphStyle("code", parent=ss["Code"], fontName="Courier", fontSize=8.2, leading=10.5, backColor=colors.HexColor("#f3f3f7"), borderPadding=6, leftIndent=4, spaceBefore=4, spaceAfter=8)
CELL = ParagraphStyle("cell", parent=BODY, fontSize=8.8, leading=11.5, spaceAfter=0)
CELLH = ParagraphStyle("cellh", parent=CELL, fontName="Helvetica-Bold", textColor=colors.white)
NOTE = ParagraphStyle("note", parent=BODY, fontSize=9, textColor=colors.HexColor("#555555"))

if MODE == "scenario":
    BODY.fontSize, BODY.leading, BODY.spaceAfter = 9.3, 12.2, 4
    H1.fontSize, H1.leading, H1.spaceAfter = 17, 21, 6
    H2.fontSize, H2.leading, H2.spaceBefore, H2.spaceAfter = 12, 15, 8, 3
    CODE.fontSize, CODE.leading, CODE.spaceAfter = 7.8, 9.8, 6
    CELL.fontSize, CELL.leading = 8.3, 10.5


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def inline(s):
    s = esc(s)
    s = re.sub(r"`([^`]+)`", r'<font face="Courier" size="8.8">\1</font>', s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)
    return s


def render_markdown(text):
    flow = []
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.strip() == "---pagebreak---":
            flow.append(PageBreak())
            i += 1
            continue
        if line.startswith("```"):
            buf = []
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                buf.append(lines[i])
                i += 1
            flow.append(Preformatted("\n".join(buf), CODE))
            i += 1
            continue
        if line.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                cells = [c.strip() for c in lines[i].strip().strip("|").split("|")]
                if not all(re.fullmatch(r":?-+:?", c) for c in cells):
                    rows.append(cells)
                i += 1
            ncol = max(len(r) for r in rows)
            data = []
            for r_i, r in enumerate(rows):
                r = r + [""] * (ncol - len(r))
                style = CELLH if r_i == 0 else CELL
                data.append([Paragraph(inline(c), style) for c in r])
            t = Table(data, colWidths=[7.0 * inch / ncol] * ncol, repeatRows=1)
            t.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1b1f3b")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f6f6fa")]),
                ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#cccccc")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]))
            flow.append(t)
            flow.append(Spacer(1, 8))
            continue
        if re.match(r"^\s*([-*]|\d+\.)\s+", line):
            items = []
            numbered = bool(re.match(r"^\s*\d+\.", line))
            while i < len(lines) and re.match(r"^\s*([-*]|\d+\.)\s+", lines[i]):
                body = re.sub(r"^\s*([-*]|\d+\.)\s+", "", lines[i])
                items.append(ListItem(Paragraph(inline(body), BODY), leftIndent=14))
                i += 1
            flow.append(ListFlowable(items, bulletType="1" if numbered else "bullet", start="1" if numbered else None, leftIndent=16, bulletFontSize=9))
            continue
        if line.startswith("# "):
            flow.append(Paragraph(inline(line[2:]), H1))
        elif line.startswith("## "):
            flow.append(Paragraph(inline(line[3:]), H2))
        elif line.startswith("### "):
            flow.append(Paragraph(inline(line[4:]), H3))
        elif line.strip() == "":
            pass
        else:
            para = [line]
            while i + 1 < len(lines) and lines[i + 1].strip() and not re.match(r"^(#|\||```|---pagebreak---|\s*[-*]\s|\s*\d+\.\s)", lines[i + 1]):
                i += 1
                para.append(lines[i])
            flow.append(Paragraph(inline(" ".join(para)), BODY))
        i += 1
    return flow


def footer_for(label):
    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#777777"))
        canvas.drawString(0.75 * inch, 0.5 * inch, label)
        canvas.drawRightString(letter[0] - 0.75 * inch, 0.5 * inch, str(doc.page))
        canvas.restoreState()
    return footer


def cover(title, subtitle, bullets):
    s = [Spacer(1, 1.6 * inch)]
    s.append(Paragraph("CAPGEMINI FDE - HVE TRAINING", ParagraphStyle("kick", parent=BODY, fontSize=10, textColor=colors.HexColor("#c58a00"), fontName="Helvetica-Bold")))
    s.append(Paragraph(title, ParagraphStyle("t", parent=H1, fontSize=28, leading=34)))
    s.append(Paragraph(subtitle, ParagraphStyle("sub", parent=BODY, fontSize=13, leading=18, textColor=colors.HexColor("#444444"))))
    s.append(Spacer(1, 14))
    s.append(Spacer(1, 24))
    s.append(Paragraph("Contents", H2))
    s.append(ListFlowable([ListItem(Paragraph(b, BODY), leftIndent=14) for b in bullets], bulletType="bullet", leftIndent=16))
    s.append(Spacer(1, 20))
    s.append(Paragraph("Derived from The Kaiju Lab v1.0 (Sumer Verma, 7 October 2026). The sample application is MIT licensed; the scenario is fiction and contains no client material.", NOTE))
    s.append(PageBreak())
    return s


if MODE == "instructions":
    story = cover(
        "The Kaiju Lab, compressed",
        "Participant instructions - setup, scenarios, three labs",
        ["1. Setup: what you need, the repository, download, before typing", "2. Pick a scenario", "3. Lab 1: Discovery with the Design Thinking Coach", "4. Lab 2: Security planner and Responsible AI planner", "5. Lab 3: Research, Plan, Implement", "6. Close"],
    )
    story += render_markdown((ROOT / "lab" / "README.md").read_text(encoding="utf-8"))
    label = "Kaiju Lab, compressed - Shared instructions"
    title = "The Kaiju Lab, compressed: Shared instructions"
else:
    folder = Path(sys.argv[4])
    story = render_markdown((folder / "scenario.md").read_text(encoding="utf-8"))
    for p in sorted((folder / "cards").glob("card-*.md")):
        story.append(PageBreak())
        story += render_markdown(p.read_text(encoding="utf-8"))
    if (folder / "run-sheet.md").exists():
        story.append(PageBreak())
        story += render_markdown((folder / "run-sheet.md").read_text(encoding="utf-8"))
    label = "Kaiju Lab, compressed - Scenario pack: " + folder.name + ""
    title = "The Kaiju Lab, compressed: Scenario pack " + folder.name

doc = SimpleDocTemplate(str(OUT), pagesize=letter, leftMargin=0.75 * inch, rightMargin=0.75 * inch, topMargin=(0.6 if MODE == "scenario" else 0.8) * inch, bottomMargin=(0.65 if MODE == "scenario" else 0.8) * inch, title=title, author="Capgemini FDE HVE training")
doc.build(story, onFirstPage=footer_for(label), onLaterPages=footer_for(label))
print(OUT)
