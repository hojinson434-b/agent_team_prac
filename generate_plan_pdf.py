#!/usr/bin/env python3
"""개발 계획서 PDF 생성 (fpdf2 사용)"""

from fpdf import FPDF

# 한국어 지원 폰트
CJK_FONT = "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"
MONO_FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

# 색상
CHESTNUT = (92, 58, 30)
REDBEAN = (139, 58, 58)
MUGWORT = (74, 124, 89)
HONEY = (212, 168, 71)
SESAME = (44, 44, 44)
CREAM = (255, 248, 240)
RICE = (245, 237, 224)
INJEOLMI = (232, 213, 183)
WHITE = (255, 255, 255)
DARK_BG = (44, 44, 44)
GRAY = (150, 150, 150)


class PlanPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.add_font("cjk", "", CJK_FONT, uni=True)
        self.add_font("cjk", "B", CJK_FONT, uni=True)
        self.add_font("mono", "", MONO_FONT, uni=True)
        self.set_auto_page_break(auto=True, margin=20)

    def footer(self):
        self.set_y(-15)
        self.set_font("mono", "", 8)
        self.set_text_color(*GRAY)
        self.cell(0, 10, str(self.page_no()), align="C")


def section_title(pdf, text):
    pdf.set_font("cjk", "B", 16)
    pdf.set_text_color(*CHESTNUT)
    pdf.cell(0, 12, text, new_x="LMARGIN", new_y="NEXT")
    y = pdf.get_y()
    pdf.set_fill_color(*HONEY)
    pdf.rect(20, y, 170, 1.5, "F")
    pdf.ln(6)


def subsection(pdf, text):
    pdf.set_font("cjk", "B", 12)
    pdf.set_text_color(*REDBEAN)
    pdf.cell(0, 10, text, new_x="LMARGIN", new_y="NEXT")


def body_text(pdf, text):
    pdf.set_font("cjk", "", 10)
    pdf.set_text_color(*SESAME)
    pdf.set_x(20)
    pdf.multi_cell(170, 7, text)


def bullet_item(pdf, text):
    pdf.set_font("cjk", "", 10)
    pdf.set_text_color(*SESAME)
    pdf.set_x(20)
    pdf.cell(8, 7, "  - ")
    pdf.multi_cell(162, 7, text)


def draw_table(pdf, headers, data, widths):
    pdf.set_fill_color(*CHESTNUT)
    pdf.set_text_color(*WHITE)
    pdf.set_font("cjk", "B", 9)
    for i, h in enumerate(headers):
        pdf.cell(widths[i], 8, "  " + h, fill=True)
    pdf.ln()

    pdf.set_font("cjk", "", 9)
    for ri, row in enumerate(data):
        if ri % 2 == 0:
            pdf.set_fill_color(*CREAM)
        else:
            pdf.set_fill_color(*WHITE)
        pdf.set_text_color(*SESAME)
        for i, cell in enumerate(row):
            pdf.cell(widths[i], 7, "  " + cell, fill=True)
        pdf.ln()

    pdf.set_draw_color(*INJEOLMI)
    pdf.line(20, pdf.get_y(), 190, pdf.get_y())


def code_block(pdf, lines):
    line_h = 5.2
    block_h = len(lines) * line_h + 8
    start_y = pdf.get_y()
    if start_y + block_h > 277:
        pdf.add_page()
        start_y = pdf.get_y()
    pdf.set_fill_color(*DARK_BG)
    pdf.rect(20, start_y, 170, block_h, "F")
    pdf.set_y(start_y + 4)
    pdf.set_font("cjk", "", 7)
    pdf.set_text_color(*RICE)
    for line in lines:
        pdf.set_x(22)
        pdf.cell(168, line_h, line, new_x="LMARGIN", new_y="NEXT")
    pdf.set_y(start_y + block_h + 3)


# ==================== PDF 생성 ====================
pdf = PlanPDF()
pdf.set_left_margin(20)
pdf.set_right_margin(20)

# ========== 표지 ==========
pdf.add_page()
pdf.set_fill_color(*CREAM)
pdf.rect(0, 0, 210, 297, "F")

pdf.set_fill_color(*HONEY)
pdf.rect(20, 40, 170, 3, "F")

pdf.set_y(55)
pdf.set_font("cjk", "B", 32)
pdf.set_text_color(*CHESTNUT)
pdf.cell(0, 18, "\ub5a1\ub2f4 (Tteokdam)", align="C", new_x="LMARGIN", new_y="NEXT")

pdf.set_font("cjk", "", 14)
pdf.set_text_color(*REDBEAN)
pdf.cell(0, 12, "\ub5a1 \uc911\uac1c \ud310\ub9e4 \ud50c\ub7ab\ud3fc", align="C", new_x="LMARGIN", new_y="NEXT")

pdf.ln(5)
pdf.set_font("cjk", "", 11)
pdf.set_text_color(*GRAY)
pdf.cell(0, 8, "\uac1c\ubc1c \uacc4\ud68d\uc11c", align="C", new_x="LMARGIN", new_y="NEXT")

pdf.set_fill_color(*INJEOLMI)
pdf.rect(70, 105, 70, 1, "F")

pdf.set_y(115)
pdf.set_font("cjk", "", 10)
pdf.set_text_color(*SESAME)
for line in [
    '\ub5a1 + \ub2f4(\u8ac7) = "\ub5a1 \uc774\uc57c\uae30\ub97c \ub098\ub204\ub294 \uacf5\uac04"',
    '\ub5a1 + \ub2f4(\u64d4) = "\uc5ec\ub7ec \uc5c5\uccb4\uc758 \ub5a1\uc744 \ud55c\uacf3\uc5d0 \ub2f4\ub294 \ud50c\ub7ab\ud3fc"',
]:
    pdf.cell(0, 7, line, align="C", new_x="LMARGIN", new_y="NEXT")

# 팀 구조 박스
pdf.set_y(145)
pdf.set_fill_color(*WHITE)
pdf.set_draw_color(*INJEOLMI)
pdf.rect(30, 145, 150, 65, "DF")

pdf.set_y(148)
pdf.set_font("cjk", "B", 11)
pdf.set_text_color(*CHESTNUT)
pdf.cell(0, 8, "\uc11c\ube0c\uc5d0\uc774\uc804\ud2b8 \ud300 \uad6c\uc870", align="C", new_x="LMARGIN", new_y="NEXT")

pdf.set_font("cjk", "", 9)
pdf.set_text_color(*SESAME)
for line in [
    "\ucd1d\uad04 (Manager) \u2014 \uacc4\ud68d \uc218\ub9bd \u00b7 \uc791\uc5c5 \ubd84\ubc30 \u00b7 \ud1b5\ud569 \uad00\ub9ac",
    "\u251c\u2500\u2500 \ub514\uc790\uc778 Agent \u2014 tailwind \ud14c\ub9c8, \uc0c9\uc0c1, \uae00\ub85c\ubc8c \uc2a4\ud0c0\uc77c",
    "\u251c\u2500\u2500 \ubc31\uc5d4\ub4dc Agent \u2014 \ub370\uc774\ud130(lib/), Context, \uc124\uc815 \ud30c\uc77c",
    "\u251c\u2500\u2500 \ud504\ub860\ud2b8 Agent \u2014 \ucef4\ud3ec\ub10c\ud2b8(26\uac1c), \ud398\uc774\uc9c0(13\uac1c)",
    "\u2514\u2500\u2500 \ud14c\uc2a4\ud2b8 Agent \u2014 \ube4c\ub4dc \uac80\uc99d, \uc624\ub958 \uc218\uc815",
]:
    pdf.cell(0, 7, line, align="C", new_x="LMARGIN", new_y="NEXT")

pdf.set_y(220)
pdf.set_font("cjk", "B", 10)
pdf.set_text_color(*MUGWORT)
pdf.cell(0, 8, "\uae30\uc220 \uc2a4\ud0dd", align="C", new_x="LMARGIN", new_y="NEXT")
pdf.set_font("cjk", "", 9)
pdf.set_text_color(*SESAME)
pdf.cell(0, 7, "Next.js 14 (App Router) + React + Tailwind CSS", align="C", new_x="LMARGIN", new_y="NEXT")
pdf.cell(0, 7, '\ub514\uc790\uc778 \ucee8\uc149: "\u97d3\ubaa8\ub358 (Han-Modern)"', align="C", new_x="LMARGIN", new_y="NEXT")

pdf.set_fill_color(*HONEY)
pdf.rect(20, 260, 170, 3, "F")

pdf.set_y(270)
pdf.set_font("cjk", "", 9)
pdf.set_text_color(*GRAY)
pdf.cell(0, 7, "2026\ub144 2\uc6d4 16\uc77c", align="C", new_x="LMARGIN", new_y="NEXT")


# ========== 목차 ==========
pdf.add_page()
section_title(pdf, "\ubaa9\ucc28")

toc = [
    ("1", "\ube0c\ub79c\ub4dc & \ucee8\uc149"),
    ("2", "\uc11c\ube0c\uc5d0\uc774\uc804\ud2b8 \ud300 \uad6c\uc870"),
    ("3", "\uc804\uccb4 \ud30c\uc77c \uad6c\uc870"),
    ("4", "\ud398\uc774\uc9c0\ubcc4 \uc5ed\ud560"),
    ("5", "Context \uc124\uacc4"),
    ("6", "Tailwind \ucee4\uc2a4\ud140 \ud14c\ub9c8 \uc124\uacc4"),
    ("7", "\uad6c\ud604 \ub2e8\uacc4 (Phase\ubcc4)"),
    ("8", "\uac80\uc99d \ubc29\ubc95"),
]
for num, title in toc:
    pdf.set_font("cjk", "B", 11)
    pdf.set_text_color(*CHESTNUT)
    pdf.cell(10, 10, num + ".")
    pdf.set_font("cjk", "", 11)
    pdf.set_text_color(*SESAME)
    pdf.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT")


# ========== 1. 브랜드 & 컨셉 ==========
pdf.add_page()
section_title(pdf, "1. \ube0c\ub79c\ub4dc & \ucee8\uc149")

subsection(pdf, "\ube0c\ub79c\ub4dc\uba85: \ub5a1\ub2f4 (Tteokdam)")
body_text(pdf, '\ub5a1 + \ub2f4(\u8ac7) = "\ub5a1 \uc774\uc57c\uae30" \u2014 \ub5a1\uc5d0 \ub300\ud55c \uc774\uc57c\uae30\ub97c \ub098\ub204\ub294 \uacf5\uac04')
body_text(pdf, '\ub5a1 + \ub2f4(\u64d4) = "\ub5a1\uc744 \ub2f4\ub2e4" \u2014 \uc5ec\ub7ec \uc5c5\uccb4\uc758 \ub5a1\uc744 \ud55c\uacf3\uc5d0 \ub2f4\ub294 \ud50c\ub7ab\ud3fc')
body_text(pdf, "\uc9e7\uace0 \uae30\uc5b5\ud558\uae30 \uc27d\uc6b0\uba70, \uc804\ud1b5\uc801\uc774\uba74\uc11c\ub3c4 \ud604\ub300\uc801\uc778 \ub290\ub08c")

pdf.ln(5)
subsection(pdf, '\ub514\uc790\uc778 \ucee8\uc149: "\u97d3\ubaa8\ub358 (Han-Modern)"')
body_text(pdf, "\uc804\ud1b5 \ud55c\uad6d\uc758 \ub530\ub73b\ud568\uacfc \ud604\ub300\uc801 \ubbf8\ub2c8\ub9d0\ub9ac\uc998\uc758 \uc870\ud654")
body_text(pdf, "\ubbf8\uc0c9/\uc300\uc0c9 \ubc30\uacbd, \ubc24\uc0c9 \ud14d\uc2a4\ud2b8, \ud321\uc0c9\u00b7\uc259\uc0c9\u00b7\uaf40\uc0c9 \ud3ec\uc778\ud2b8")

pdf.ln(5)
subsection(pdf, "\ud575\uc2ec \ucc28\ubcc4\uc810: \ub5a1 \uc911\uac1c \ub9c8\ucf13\ud50c\ub808\uc774\uc2a4")
for b in [
    "\uc5ec\ub7ec \ub5a1 \uc5c5\uccb4\uc758 \uc0c1\ud488\uc744 \ud55c\uacf3\uc5d0 \ubaa8\uc544 \ud310\ub9e4",
    "\uc5c5\uccb4\ubcc4 \uc0c1\ud488 \ube44\uad50 \uae30\ub2a5 \uc81c\uacf5",
    "\uc5c5\uccb4 \uc785\uc810 \uc2e0\uccad \uc2dc\uc2a4\ud15c",
    "\uc911\uac1c\uc218\uc218\ub8cc \uae30\ubc18 \ube44\uc988\ub2c8\uc2a4 \ubaa8\ub378",
]:
    bullet_item(pdf, b)


# ========== 2. 서브에이전트 팀 구조 ==========
pdf.add_page()
section_title(pdf, "2. \uc11c\ube0c\uc5d0\uc774\uc804\ud2b8 \ud300 \uad6c\uc870")

headers = ["\uc5d0\uc774\uc804\ud2b8", "\ub2f4\ub2f9 \uc601\uc5ed", "\uc8fc\uc694 \uc0b0\ucd9c\ubb3c"]
widths = [30, 65, 75]
data = [
    ["\ucd1d\uad04", "\uacc4\ud68d \uc218\ub9bd, \uc791\uc5c5 \ubd84\ubc30, \ud1b5\ud569 \uad00\ub9ac", "\uc804\uccb4 \ud504\ub85c\uc81d\ud2b8 \uc870\uc728"],
    ["\ub514\uc790\uc778", "tailwind.config.js, \uc0c9\uc0c1/\ud3f0\ud2b8/\uadf8\ub9bc\uc790", "\ub514\uc790\uc778 \uc2dc\uc2a4\ud15c \ud30c\uc77c"],
    ["\ubc31\uc5d4\ub4dc", "lib/ \ub370\uc774\ud130, contexts/, hooks/", "\ub370\uc774\ud130/\uc0c1\ud0dc/\uc124\uc815 \ud30c\uc77c"],
    ["\ud504\ub860\ud2b8", "components/, app/ \ud398\uc774\uc9c0 \uc804\uccb4", "\ucef4\ud3ec\ub10c\ud2b8/\ud398\uc774\uc9c0 \ud30c\uc77c"],
    ["\ud14c\uc2a4\ud2b8", "\ube4c\ub4dc \uac80\uc99d, \uc624\ub958 \uc218\uc815, \ucd5c\uc885 \uc810\uac80", "\ube4c\ub4dc \uc131\uacf5 \ud655\uc778"],
]
draw_table(pdf, headers, data, widths)

pdf.ln(8)
subsection(pdf, "\ubcd1\ub82c \uc2e4\ud589 \uc804\ub7b5")
body_text(pdf, "\ub3c5\ub9bd\uc801\uc778 \uc791\uc5c5\uc740 \ubcd1\ub82c\ub85c \uc2e4\ud589\ud558\uc5ec \uac1c\ubc1c \uc18d\ub3c4\ub97c \uadf9\ub300\ud654\ud569\ub2c8\ub2e4:")
for b in [
    "Phase 1: \ub514\uc790\uc778 Agent + \ubc31\uc5d4\ub4dc Agent \ub3d9\uc2dc \uc9c4\ud589",
    "Phase 2~4: \ud504\ub860\ud2b8 Agent 2\uac1c\ub97c \ub3d9\uc2dc \ud22c\uc785",
    "Phase 6: \ud14c\uc2a4\ud2b8 Agent \ub2e8\ub3c5 \uac80\uc99d",
]:
    bullet_item(pdf, b)


# ========== 3. 전체 파일 구조 ==========
pdf.add_page()
section_title(pdf, "3. \uc804\uccb4 \ud30c\uc77c \uad6c\uc870")

code_block(pdf, [
    "agents_homepage/",
    "+-- app/",
    "|   +-- layout.js              <- \uc804\uccb4 \ub808\uc774\uc544\uc6c3",
    "|   +-- page.js                <- \ud648 \ud398\uc774\uc9c0",
    "|   +-- globals.css            <- \uae00\ub85c\ubc8c \uc2a4\ud0c0\uc77c",
    "|   +-- products/",
    "|   |   +-- page.js            <- \uc0c1\ud488 \ubaa9\ub85d",
    "|   |   +-- [id]/page.js       <- \uc0c1\ud488 \uc0c1\uc138",
    "|   +-- compare/page.js        <- \uc0c1\ud488 \ube44\uad50",
    "|   +-- cart/page.js           <- \uc7a5\ubc14\uad6c\ub2c8",
    "|   +-- checkout/page.js       <- \uc8fc\ubb38\uc11c",
    "|   +-- auth/page.js           <- \ub85c\uadf8\uc778/\ud68c\uc6d0\uac00\uc785",
    "|   +-- mypage/page.js         <- \ub9c8\uc774\ud398\uc774\uc9c0",
    "|   +-- vendors/",
    "|   |   +-- page.js            <- \uc785\uc810 \uc5c5\uccb4 \ubaa9\ub85d",
    "|   |   +-- [id]/page.js       <- \uc5c5\uccb4 \uc0c1\uc138",
    "|   +-- vendor-register/page.js <- \uc5c5\uccb4 \ub4f1\ub85d",
    "|   +-- about/page.js          <- \uc18c\uac1c",
    "|   +-- notice/page.js         <- \uacf5\uc9c0\uc0ac\ud56d",
    "+-- components/",
    "|   +-- ui/       Button, Input, Card, Badge, Modal, Toast",
    "|   +-- layout/   Header, Footer, MobileMenu, Container",
    "|   +-- product/  ProductCard, ProductGrid, ProductFilter",
    "|   +-- home/     HeroBanner, PopularProducts, CategorySection",
    "|   +-- vendor/   VendorCard, VendorGrid, VendorRegisterForm",
    "|   +-- cart/     CartItem, CartSummary",
    "+-- contexts/     Cart, Auth, Wishlist, Compare, Theme",
    "+-- lib/          products, vendors, categories, utils",
    "+-- tailwind.config.js",
    "+-- next.config.js",
    "+-- package.json",
])


# ========== 4. 페이지별 역할 ==========
pdf.add_page()
section_title(pdf, "4. \ud398\uc774\uc9c0\ubcc4 \uc5ed\ud560")

draw_table(pdf,
    ["\ud398\uc774\uc9c0", "\uacbd\ub85c", "\uc124\uba85"],
    [
        ["\ud648", "/", "\ud788\uc5b4\ub85c \ubc30\ub108, \uc778\uae30 \uc0c1\ud488, \uce74\ud14c\uace0\ub9ac, \uc5c5\uccb4"],
        ["\uc0c1\ud488 \ubaa9\ub85d", "/products", "\uc804\uccb4 \ub5a1 \uc0c1\ud488 + \uce74\ud14c\uace0\ub9ac/\uc5c5\uccb4\ubcc4 \ud544\ud130"],
        ["\uc0c1\ud488 \uc0c1\uc138", "/products/[id]", "\uc0c1\ud488 \uc815\ubcf4, \ud310\ub9e4 \uc5c5\uccb4, \ube44\uad50 \ub9c1\ud06c"],
        ["\uc0c1\ud488 \ube44\uad50", "/compare", "\uc120\ud0dd \uc0c1\ud488 \ub098\ub780\ud788 \ube44\uad50"],
        ["\uc7a5\ubc14\uad6c\ub2c8", "/cart", "\ub2f4\uc740 \uc0c1\ud488, \uc218\ub7c9 \ubcc0\uacbd, \ud569\uacc4"],
        ["\uc8fc\ubb38\uc11c", "/checkout", "\ubc30\uc1a1\uc9c0 \uc785\ub825, \uc8fc\ubb38 \uc694\uc57d"],
        ["\ub85c\uadf8\uc778/\uac00\uc785", "/auth", "\ub85c\uadf8\uc778/\ud68c\uc6d0\uac00\uc785 (localStorage)"],
        ["\ub9c8\uc774\ud398\uc774\uc9c0", "/mypage", "\uc8fc\ubb38\ub0b4\uc5ed, \ucc1c \ubaa9\ub85d, \ud68c\uc6d0\uc815\ubcf4"],
        ["\uc5c5\uccb4 \ubaa9\ub85d", "/vendors", "\uc785\uc810 \uc5c5\uccb4 \uce74\ub4dc \ubaa9\ub85d"],
        ["\uc5c5\uccb4 \uc0c1\uc138", "/vendors/[id]", "\uc5c5\uccb4 \uc815\ubcf4, \ud574\ub2f9 \uc5c5\uccb4 \uc0c1\ud488"],
        ["\uc5c5\uccb4 \ub4f1\ub85d", "/vendor-register", "\uc5c5\uccb4 \uc785\uc810 \uc2e0\uccad \ud3fc"],
        ["\uc18c\uac1c", "/about", "\ub5a1\ub2f4 \uc11c\ube44\uc2a4 \uc18c\uac1c"],
        ["\uacf5\uc9c0\uc0ac\ud56d", "/notice", "\uacf5\uc9c0\uc0ac\ud56d \ubaa9\ub85d"],
    ],
    [28, 42, 100],
)


# ========== 5. Context 설계 ==========
pdf.add_page()
section_title(pdf, "5. Context \uc124\uacc4")

draw_table(pdf,
    ["Context", "localStorage \ud0a4", "\uc5ed\ud560"],
    [
        ["CartContext", "tteokdam_cart", "\uc7a5\ubc14\uad6c\ub2c8 CRUD, \uc218\ub7c9 \ubcc0\uacbd, \ud569\uacc4 \uacc4\uc0b0"],
        ["AuthContext", "tteokdam_user", "\ub85c\uadf8\uc778/\ub85c\uadf8\uc544\uc6c3/\ud68c\uc6d0\uac00\uc785"],
        ["WishlistContext", "tteokdam_wishlist", "\ucc1c \ubaa9\ub85d \ucd94\uac00/\uc0ad\uc81c"],
        ["CompareContext", "tteokdam_compare", "\ube44\uad50 \ubaa9\ub85d (\ucd5c\ub300 4\uac1c)"],
        ["ThemeContext", "tteokdam_theme", "\ub77c\uc774\ud2b8/\ub2e4\ud06c \ubaa8\ub4dc \uc804\ud658"],
    ],
    [40, 45, 85],
)


# ========== 6. Tailwind 커스텀 테마 ==========
pdf.ln(10)
section_title(pdf, "6. Tailwind \ucee4\uc2a4\ud140 \ud14c\ub9c8 \uc124\uacc4")

subsection(pdf, "\uc0c9\uc0c1 (\uc804\ud1b5 \ud55c\uad6d + \ubaa8\ub358)")

draw_table(pdf,
    ["\uc774\ub984", "\uc0c9\uc0c1\uac12", "\uc6a9\ub3c4"],
    [
        ["cream", "#FFF8F0", "\ubbf8\uc0c9 (\ubc30\uacbd)"],
        ["rice", "#F5EDE0", "\uc300\uc0c9 (\ubcf4\uc870 \ubc30\uacbd)"],
        ["chestnut", "#5C3A1E", "\ubc24\uc0c9 (\uc8fc\uc694 \ud14d\uc2a4\ud2b8)"],
        ["chestnut-light", "#8B6242", "\ubc24\uc0c9 \ubc1d\uc740 (\ubcf4\uc870 \ud14d\uc2a4\ud2b8)"],
        ["redbean", "#8B3A3A", "\ud321\uc0c9 (\ud3ec\uc778\ud2b8)"],
        ["sesame", "#2C2C2C", "\ucc38\uae68\uc0c9 (\ub2e4\ud06c \ud14d\uc2a4\ud2b8)"],
        ["mugwort", "#4A7C59", "\uc259\uc0c9 (\uc790\uc5f0/\uc2e0\uc120)"],
        ["honey", "#D4A847", "\uaf40\uc0c9 (CTA \ubc84\ud2bc, \uac15\uc870)"],
        ["injeolmi", "#E8D5B7", "\uc778\uc808\ubbf8\uc0c9 (\uce74\ub4dc \ubc30\uacbd)"],
        ["songpyeon", "#7BA784", "\uc1a1\ud3b8\uc0c9 (\ubcf4\uc870 \uac15\uc870)"],
        ["caramel", "#C4956A", "\uce74\ub77c\uba5c (\ud14c\ub450\ub9ac, \ud638\ubc84)"],
    ],
    [35, 30, 105],
)

pdf.ln(5)
subsection(pdf, "\ud3f0\ud2b8")
for b in [
    "font-display: 'Noto Serif KR' \u2014 \uc81c\ubaa9/\uac15\uc870 (\uc804\ud1b5 \uc138\ub9ac\ud504)",
    "font-body: 'Noto Sans KR' \u2014 \ubcf8\ubb38/UI",
    "font-accent: 'DM Sans' \u2014 \uc601\ubb38/\uc22b\uc790 \ubcf4\uc870",
]:
    bullet_item(pdf, b)


# ========== 7. 구현 단계 ==========
pdf.add_page()
section_title(pdf, "7. \uad6c\ud604 \ub2e8\uacc4 (Phase\ubcc4 \uc11c\ube0c\uc5d0\uc774\uc804\ud2b8 \ud22c\uc785)")

phases = [
    ("\u25b6 Phase 1: \ud504\ub85c\uc81d\ud2b8 \ucd08\uae30 \uc124\uc815", [
        "\ucd1d\uad04: Next.js \ud504\ub85c\uc81d\ud2b8 \uc0dd\uc131 (create-next-app)",
        "\ub514\uc790\uc778 Agent: tailwind.config.js + globals.css",
        "\ubc31\uc5d4\ub4dc Agent: lib/ \ub370\uc774\ud130 + contexts/ + next.config.js",
    ], "\ub514\uc790\uc778 + \ubc31\uc5d4\ub4dc \ubcd1\ub82c \uc2e4\ud589"),

    ("\u25b6 Phase 2: \uae30\ubc18 \ucef4\ud3ec\ub10c\ud2b8", [
        "\ud504\ub860\ud2b8 Agent 1: ui/ \ucef4\ud3ec\ub10c\ud2b8 (Button, Input, Card...)",
        "\ud504\ub860\ud2b8 Agent 2: layout/ \ucef4\ud3ec\ub10c\ud2b8 + app/layout.js",
    ], "\ub450 \ud504\ub860\ud2b8 \uc791\uc5c5 \ubcd1\ub82c"),

    ("\u25b6 Phase 3: \ud648 + \uc0c1\ud488 \ud398\uc774\uc9c0", [
        "\ud504\ub860\ud2b8 Agent 1: home/ \ucef4\ud3ec\ub10c\ud2b8 + \ud648 \ud398\uc774\uc9c0",
        "\ud504\ub860\ud2b8 Agent 2: product/ \ucef4\ud3ec\ub10c\ud2b8 + \uc0c1\ud488 \ubaa9\ub85d/\uc0c1\uc138",
    ], "\ub450 \uc791\uc5c5 \ubcd1\ub82c"),

    ("\u25b6 Phase 4: \uc5c5\uccb4 + \uc7a5\ubc14\uad6c\ub2c8 + \ube44\uad50", [
        "\ud504\ub860\ud2b8 Agent 1: vendor/ \ucef4\ud3ec\ub10c\ud2b8 + \uc5c5\uccb4 \ud398\uc774\uc9c0",
        "\ud504\ub860\ud2b8 Agent 2: cart/ + \uc7a5\ubc14\uad6c\ub2c8/\uccb4\ud06c\uc544\uc6c3/\ube44\uad50",
    ], "\ub450 \uc791\uc5c5 \ubcd1\ub82c"),

    ("\u25b6 Phase 5: \ub098\uba38\uc9c0 \ud398\uc774\uc9c0", [
        "\ud504\ub860\ud2b8 Agent: \uc778\uc99d, \ub9c8\uc774\ud398\uc774\uc9c0, \uc18c\uac1c, \uacf5\uc9c0\uc0ac\ud56d",
    ], None),

    ("\u25b6 Phase 6: \ud1b5\ud569 \ud14c\uc2a4\ud2b8", [
        "\ud14c\uc2a4\ud2b8 Agent: \ube4c\ub4dc \u2192 \uc624\ub958 \uc218\uc9d1 \u2192 \uc218\uc815 \u2192 \uc7ac\ube4c\ub4dc \u2192 \uc131\uacf5",
    ], None),

    ("\u25b6 Phase 7: \ucee4\ubc0b & \ud478\uc2dc", [
        "\ucd1d\uad04: \ucd5c\uc885 git commit + push",
    ], None),
]

for title, tasks, parallel in phases:
    pdf.ln(3)
    pdf.set_font("cjk", "B", 11)
    pdf.set_text_color(*REDBEAN)
    pdf.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
    for t in tasks:
        bullet_item(pdf, t)
    if parallel:
        pdf.set_font("cjk", "", 8)
        pdf.set_text_color(*MUGWORT)
        pdf.cell(0, 6, "    >> " + parallel, new_x="LMARGIN", new_y="NEXT")


# ========== 8. 검증 방법 ==========
pdf.ln(10)
section_title(pdf, "8. \uac80\uc99d \ubc29\ubc95")

checks = [
    "npm run build \uc131\uacf5 \ud655\uc778 (\ube4c\ub4dc \uc5d0\ub7ec 0)",
    "npm run dev\ub85c \ubaa8\ub4e0 \ud398\uc774\uc9c0 \uc811\uadfc \uac00\ub2a5 \ud655\uc778",
    "\uc7a5\ubc14\uad6c\ub2c8 \ucd94\uac00/\uc0ad\uc81c, \ube44\uad50 \ubaa9\ub85d, \ucc1c \uae30\ub2a5 \ub3d9\uc791 \ud655\uc778",
    "\ubaa8\ubc14\uc77c \ubc18\uc751\ud615 \ud655\uc778",
    "\ub2e4\ud06c\ubaa8\ub4dc \uc804\ud658 \ud655\uc778",
]
for i, c in enumerate(checks, 1):
    pdf.set_font("cjk", "", 10)
    pdf.set_text_color(*SESAME)
    pdf.cell(0, 8, f"  {i}. {c}", new_x="LMARGIN", new_y="NEXT")


# ========== 저장 ==========
output = "/home/user/agent_team_prac/tteokdam_plan.pdf"
pdf.output(output)
print(f"PDF \uc0dd\uc131 \uc644\ub8cc: {output}")
