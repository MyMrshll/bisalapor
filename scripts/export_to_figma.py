import os
import subprocess
from pathlib import Path

# Paths
BASE_DIR = Path('/media/shall/DATA_KERJA/BisaLapor').resolve()
HTML_SRC = BASE_DIR / 'ui' / 'bisalapor-ui.html'
EXPORT_DIR = BASE_DIR / 'figma-export'
EXPORT_DIR.mkdir(parents=True, exist_ok=True)

# 9 Screens definition
SCREENS = [
    ('01_Overview', 'overview', 'Overview Dashboard'),
    ('02_Work_Orders', 'work-orders', 'Work Orders List'),
    ('03_Work_Order_Detail', 'work-order-detail', 'Work Order Detail'),
    ('04_Reports', 'reports', 'Reports List'),
    ('05_Report_Review', 'report-review', 'Report Review & Approval'),
    ('06_AI_Inbox', 'inbox', 'AI Inbox & Mapping'),
    ('07_Technicians', 'technicians', 'Technicians Management'),
    ('08_Customers', 'customers', 'Customers Directory'),
    ('09_Settings', 'settings', 'Team & Workspace Settings')
]

# Read original HTML
html_content = HTML_SRC.read_text(encoding='utf-8')

# Custom CSS for perfect single-page 1440pt x 1080pt print
print_css = """
<style>
@media print {
  @page {
    size: 1440pt 1080pt;
    margin: 0;
  }
  html, body, .app {
    width: 1440pt !important;
    height: 1080pt !important;
    min-height: 1080pt !important;
    max-height: 1080pt !important;
    overflow: hidden !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    background: #ffffff !important;
  }
}
</style>
"""

# Temporary modified HTML with print styles
tmp_html = Path('/tmp/bisalapor_print.html')
tmp_html.write_text(html_content.replace('</head>', print_css + '</head>'), encoding='utf-8')

pdf_files = []

print("=== 1. GENERATING STANDALONE VECTOR PDFS, SVGS & PNGS ===")
for prefix, route, label in SCREENS:
    print(f"\nProcessing {prefix} ({label})...")
    url = f"file://{tmp_html}#{route}"
    
    pdf_path = EXPORT_DIR / f"{prefix}.pdf"
    svg_path = EXPORT_DIR / f"{prefix}.svg"
    png_path = EXPORT_DIR / f"{prefix}.png"
    
    # 1. Generate Vector PDF via headless Chrome
    cmd_pdf = [
        'google-chrome',
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--no-pdf-header-footer',
        f'--print-to-pdf={pdf_path}',
        url
    ]
    subprocess.run(cmd_pdf, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # 2. Convert PDF to W3C Standard Vector SVG via pdftocairo
    cmd_svg = [
        'pdftocairo',
        '-svg',
        str(pdf_path),
        str(svg_path)
    ]
    subprocess.run(cmd_svg, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    # 3. Generate 1440x1080 PNG preview for visual reference
    cmd_png = [
        'google-chrome',
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--window-size=1440,1080',
        '--default-background-color=ffffff',
        f'--screenshot={png_path}',
        url
    ]
    subprocess.run(cmd_png, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    pdf_files.append(pdf_path)
    print(f"  ✓ PDF: {pdf_path.name} ({pdf_path.stat().st_size:,} bytes)")
    print(f"  ✓ SVG: {svg_path.name} ({svg_path.stat().st_size:,} bytes)")
    print(f"  ✓ PNG: {png_path.name} ({png_path.stat().st_size:,} bytes)")

# 4. Generate Combined Multi-Page PDF
print("\n=== 2. GENERATING COMBINED MULTI-PAGE VECTOR PDF FOR FIGMA ===")
combined_pdf = EXPORT_DIR / "BisaLapor_All_Screens_Figma.pdf"
cmd_combine = ['pdfunite'] + [str(p) for p in pdf_files] + [str(combined_pdf)]
subprocess.run(cmd_combine, check=True)
print(f"  ✓ Multi-Page PDF: {combined_pdf.name} ({combined_pdf.stat().st_size:,} bytes)")

# 5. Extract Pure Scalable SVG Logo
print("\n=== 3. EXPORTING STANDALONE VECTOR LOGO ===")
logo_svg_path = EXPORT_DIR / "BisaLapor_Logo_Vector.svg"
logo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 108" width="108" height="108">
  <defs>
    <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1B3585"/>
      <stop offset="100%" stop-color="#0F1E55"/>
    </linearGradient>
  </defs>
  <!-- Background Tile -->
  <rect width="108" height="108" rx="24" fill="url(#logoBg)"/>
  <!-- BisaLapor 'B' Document Monogram Silhouette -->
  <path d="M 32 26 L 62 26 C 73 26 80 32 80 40 C 80 46 76 50 70 52 C 78 54 82 59 82 67 C 82 76 74 82 62 82 L 32 82 Z" fill="#FFFFFF"/>
  <!-- Embedded Document Cutout -->
  <path d="M 40 34 L 56 34 L 64 42 L 64 74 L 40 74 Z" fill="#0F1E55"/>
  <!-- Folded Corner Detail -->
  <path d="M 56 34 L 56 42 L 64 42 Z" fill="#1B3585"/>
  <!-- Document Text Bars -->
  <rect x="46" y="50" width="12" height="3" rx="1.5" fill="#FFFFFF"/>
  <rect x="46" y="58" width="12" height="3" rx="1.5" fill="#FFFFFF"/>
</svg>
"""
logo_svg_path.write_text(logo_svg, encoding='utf-8')
print(f"  ✓ Logo SVG: {logo_svg_path.name}")

print("\n=== ALL FIGMA ASSETS GENERATED SUCCESSFULLY! ===")
