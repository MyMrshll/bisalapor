# Panduan Import Desain BisaLapor ke Figma

Folder ini berisi aset desain **BisaLapor Product UI v2** (tema Apple Web Design + Glassmorphism + Dark Navy `#0F1E55`) yang siap diimpor langsung ke Figma.

---

## Cara Import ke Figma

### Opsi 1: Multi-Page Vector PDF (Paling Cepat & Lengkap)
1. Buka file atau canvas baru di **Figma**.
2. **Drag & Drop** file:
   ```
   BisaLapor_All_Screens_Figma.pdf
   ```
   langsung ke dalam canvas Figma.
3. Figma otomatis mengimpor **9 artboard / frame sekaligus** (1440 × 1080 px) lengkap dengan teks, layer vektor, card, dan warna.

### Opsi 2: Standalone Vector SVG (Per Layar)
1. Drag & drop file `.svg` yang diinginkan ke canvas Figma:
   - `01_Overview.svg`
   - `02_Work_Orders.svg`
   - `03_Work_Order_Detail.svg`
   - `04_Reports.svg`
   - `05_Report_Review.svg`
   - `06_AI_Inbox.svg`
   - `07_Technicians.svg`
   - `08_Customers.svg`
   - `09_Settings.svg`
2. Setiap file SVG akan langsung menjadi **Frame 1440 × 1080** dengan elemen vektor yang dapat diedit (group, shape, path, stroke).

### Opsi 3: Standalone Vector Logo
- `BisaLapor_Logo_Vector.svg` — Monogram huruf "B" geometris dengan simbol dokumen lipat khas BisaLapor, 100% scalable vector.

### Opsi 4: PNG Previews (Hi-Res 1440×1080)
- Digunakan sebagai perbandingan visual langsung atau mockup background.

---

## Design Tokens & Spesifikasi

### 1. Warna Brand & Semantik
| Nama Token | Hex / Value | Deskripsi & Penggunaan |
|---|---|---|
| **Canvas Background** | `#FFFFFF` | Background halaman web (Apple clean style) |
| **Primary Navy** | `#0F1E55` | Brand utama, logo, primary button, active nav tile |
| **Dark Ink** | `#0F172A` | Teks judul utama (`<h1>`, `<h2>`) |
| **Body Slate** | `#334155` | Teks konten, label |
| **Muted Slate** | `#64748B` | Subtitle, placeholder, inactive icons |
| **Surface Card** | `rgba(255, 255, 255, 0.65)` | Glassmorphism card surface |
| **Border / Divider**| `rgba(226, 232, 240, 0.85)` | Stroke batas card dan pemisah tabel |
| **Accent Blue** | `#2F6FDA` / `#74A5FF` | Link, tabs, interactive highlights |
| **Success Green** | `#238653` | Status Selesai, Disetujui, Berjalan normal |
| **Warning Amber** | `#A96B00` | Status Dikerjakan, Perlu review |
| **Error Red** | `#C73548` | Status Butuh info, Missing information |

### 2. Tipografi
- **Font Family:** `Inter`, ui-sans-serif, system-ui
- **Page Heading (`<h1>`):** 28px – 32px (Bold 700, letter-spacing -0.04em)
- **Card Heading (`<h2>`):** 16px – 18px (Bold 700, letter-spacing -0.025em)
- **Body & Table Text:** 12.5px – 14px (Regular 400 / Medium 500)
- **Eyebrow / Badges:** 10px – 11px (Bold 700, letter-spacing +0.08em)

### 3. Glassmorphism & Elevation
- **Backdrop Blur:** 14px – 18px
- **Card Shadow:** `0 14px 34px rgba(15, 30, 85, 0.06), 0 3px 10px rgba(15, 30, 85, 0.04)`
- **Corner Radius:**
  - Cards / Panels: `18px` (`--radius-lg`)
  - Buttons / Inputs: `11px` – `12px` (`--radius-md`)
  - Nav Active Tile: `18px` (64 × 64 px)
