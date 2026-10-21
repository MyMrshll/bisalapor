# MASTER AGENT CONTEXT: BISALAPOR FRONTEND

> **PANDUAN KONTEKS TUNGGAL (SINGLE SOURCE OF TRUTH)**  
> File ini wajib dimuat/dibaca oleh seluruh AI Coding Agent (Dev 1 s/d Dev 5) sebelum mengeksekusi kode atau membuat komponen pada proyek BisaLapor Frontend.

---

## 1. Identitas & Esensi Produk

* **Nama Produk:** BisaLapor
* **Kategori:** B2B SaaS — AI-Assisted Field Service Reporting
* **Target Pengguna Awal:** Perusahaan jasa teknisi lapangan (servis AC komersial, genset, chiller gedung, dan instalasi mekanikal/elektrikal).
* **Fokus Proyek Saat Ini:** **100% PURE FRONTEND PROTOTYPE (MOCK DATA ARCHITECTURE)**. Tidak ada dependensi ke server backend, database nyata, atau webhook live untuk fase ini.
* **Prinsip Utama Produk (PRD Pasal 1.3 & 14):**
  1. *AI hanya menyusun draf; manusia yang berwenang memeriksa dan menyetujui laporan final.*
  2. *AI dilarang mengarang fakta, angka pengukuran freon/tegangan, komponen spare part, atau hasil pekerjaan yang tidak dilaporkan teknisi.*
  3. *Field yang belum lengkap wajib ditandai secara visual (`Missing Information Alert`), bukan diisi asal.*

---

## 2. Design System & Spesifikasi Visual (Apple Web Design + Glassmorphism)

Seluruh komponen yang dibuat oleh agent **wajib mematuhi design token berikut tanpa improvisasi warna sembarangan**:

### A. Palet Warna (Color Tokens)
* **Background Canvas:** `#FFFFFF` (Putih bersih dengan radial gradient halus `#74A5FF` 8% opacity).
* **Brand Primary:** `#0F1E55` (Deep Apple Navy — digunakan untuk logo, primary CTA button, dan active nav tile).
* **Card Surface (Glassmorphism):** `rgba(255, 255, 255, 0.65)` dengan `backdrop-filter: blur(16px)` dan shadow lembut `0 14px 34px rgba(15, 30, 85, 0.06)`.
* **Border & Dividers:** `rgba(226, 232, 240, 0.85)` atau `rgba(15, 30, 85, 0.12)`.
* **Typography Ink:**
  * Heading Utama: `#0F172A` (Dark Ink)
  * Body Text: `#334155` (Slate Text)
  * Muted / Placeholder / Secondary: `#64748B` (Muted Slate)
* **Status Colors:**
  * **Success:** `#238653` (Badge `Disetujui`, `Selesai`, `Aktif`)
  * **Warning:** `#A96B00` (Badge `Dikerjakan`, `Perlu review`, `Konfirmasi dibutuhkan`)
  * **Error / Alert:** `#C73548` (Badge `Butuh info`, `2 informasi perlu dikonfirmasi`)
  * **Accent Blue:** `#2F6FDA` (Tabs active, link detail)

### B. Tipografi
* **Font Family:** `Inter`, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.
* **Heading 1:** 28px – 32px, font-weight 700 / 800, letter-spacing -0.04em.
* **Heading 2 (Card Title):** 16px – 18px, font-weight 700, letter-spacing -0.025em.
* **Body / Table Content:** 13px – 14px, font-weight 400 / 500.
* **Labels / Table Headers / Eyebrow:** 9.5px – 11px, font-weight 700 / 800, text-transform uppercase, letter-spacing 0.08em.

### C. Layout Shell & Spacing Rhythm
* **Sidebar Rail (Desktop):** Lebar `136px`. Logo monogram 'B' (artwork 108×108px). Navigasi item berbentuk rounded square `64×64px`, icon SVG `30×30px`. Item aktif berwarna `#0F1E55` dengan ikon putih. Tooltip muncul di sisi kanan item saat hover.
* **Topbar Header:** Satu baris terpadu (single header). Judul halaman di kiri, tombol aksi sejajar di kanan: `[Notifikasi] [Hari Ini] [+ Buat work order]`. Tidak boleh ada header ganda atau breadcrumb duplikat.
* **Base Spacing:** Skala 4px/8px (Gap antar kontrol toolbar: 12px; gap antar card: 20–28px; padding card panel: 24–30px).
* **Responsivitas Mobile (< 760px):**
  * Sidebar otomatis berubah menjadi top bar ringkas dengan 7 ikon menu sejajar.
  * Tabel multi-kolom desktop otomatis beralih menjadi **Card View per item** (tanpa horizontal overflow).
  * Tombol CTA utama menjadi full-width di atas tabel.

---

## 3. Standar Skema Data Mock (Shared Mock Contract)

Semua agent harus menggunakan penamaan field dan tipe data yang seragam di folder `src/mocks/`:

### A. Work Order Entity (`src/mocks/workOrders.ts`)
```typescript
export interface WorkOrder {
  id: string; // Format: "WO-240318-017"
  title: string; // Misal: "Servis AC Split 2 PK"
  customer: string; // Misal: "PT Arunika"
  location: string; // Misal: "Gedung Arunika Lt. 5"
  technician: string; // Misal: "Dina Kartika"
  scheduledDate: string; // Misal: "22 Jul 2024"
  scheduledTime: string; // Misal: "09:00"
  jobStatus: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  reportStatus: 'NONE' | 'DRAFT' | 'PENDING_REVIEW' | 'NEEDS_INFO' | 'APPROVED';
  notes?: string;
}
```

### B. Report Entity (`src/mocks/reports.ts`)
```typescript
export interface Report {
  id: string; // Format: "RPT-240318-017"
  workOrderId: string; // Ref ke WorkOrder.id
  title: string;
  technician: string;
  updatedAt: string; // Misal: "2 menit lalu"
  status: 'PROCESSING' | 'NEEDS_INFORMATION' | 'PENDING_REVIEW' | 'REVISION_REQUIRED' | 'APPROVED';
  version: number;
  // Field verifikasi AI
  sections: {
    summary: string;
    findings: string;
    actionsTaken: string;
    recommendations: string;
  };
  missingFields?: string[]; // Misal: ["Nomor seri unit", "Pengukuran tekanan freon"]
  evidence: {
    senderChannel: 'Telegram' | 'WhatsApp';
    senderVerified: boolean;
    rawMessage: string;
    photos: { label: 'Sebelum' | 'Proses' | 'Sesudah'; url: string }[];
    audioNote?: { filename: string; duration: string };
  };
}
```

### C. Inbox Message Entity (`src/mocks/inboxMessages.ts`)
```typescript
export interface InboxMessage {
  id: string;
  senderName: string;
  channel: 'Telegram' | 'WhatsApp';
  timestamp: string;
  rawSnippet: string;
  fullMessage: string;
  status: 'PROCESSING' | 'DRAFT_CREATED' | 'NEEDS_CONFIRMATION' | 'LINKED' | 'FAILED';
  matchedWorkOrderId?: string;
  isAmbiguous: boolean;
  suggestedWorkOrders?: { id: string; title: string; client: string }[];
}
```

---

## 4. Struktur Folder & Pembagian Modul Tim

Untuk menghindari konflik file di Git, setiap developer mengelola domainnya masing-masing:

```text
src/
├── components/          # [Dev 1] UI Kit global (Button, Badge, Input, Modal, Toast)
├── layouts/             # [Dev 1] AppShell (Sidebar rail, Topbar, Mobile Drawer)
├── pages/
│   ├── overview/        # [Dev 1] Halaman 01_Overview
│   ├── work-orders/     # [Dev 2] Halaman 02_Work_Orders & 03_Work_Order_Detail
│   ├── reports/         # [Dev 3] Halaman 04_Reports & 05_Report_Review (Split View)
│   ├── inbox/           # [Dev 4] Halaman 06_AI_Inbox & Media Players
│   ├── technicians/     # [Dev 5] Halaman 07_Technicians
│   ├── customers/       # [Dev 5] Halaman 08_Customers
│   └── settings/        # [Dev 5] Halaman 09_Settings (Team & RBAC)
└── mocks/               # Data mock JSON/TypeScript sesuai schema di atas
```

---

## 5. File Referensi Wajib (Ground Truth)

Saat agen membutuhkan klarifikasi visual, tata letak, atau perilaku interaksi, buka dan rujuk file-file berikut yang sudah tersedia di workspace:
1. `ui/bisalapor-ui.html`: Prototype interaktif lengkap yang mencakup seluruh 9 layar, navigasi aktif, animasi, dan penanganan responsif.
2. `figma-export/BisaLapor_All_Screens_Figma.pdf`: Vektor lengkap 9 layar yang diimpor ke Figma.
3. `figma-export/01_Overview.svg` s/d `09_Settings.svg`: Spesifikasi ukuran dan posisi komponen per layar.
4. `PRD_BisaLapor.md`: Syarat fungsional produk, aturan bisnis, dan kriteria kelulusan alur kerja.

---

## 6. Checklist Kualitas Sebelum Merge (Quality Gate)

Setiap agen wajib memastikan:
- [ ] Tidak ada panggilan API jaringan backend nyata (`fetch('/api/...')` wajib mengarah ke mock handler / lokal state).
- [ ] Tombol interaktif memiliki visual feedback (klik tombol memunculkan toast, modal, atau perubahan state data lokal).
- [ ] Halaman diuji dan bebas dari horizontal scrollbar yang tidak diinginkan pada lebar 360px, 768px, dan 1440px.
- [ ] Icon SVG memiliki atribut `currentColor` agar mewarisi warna state hover dan active secara benar.
- [ ] Tidak ada text label yang hard-coded bahasa Inggris jika sudah ada padanan di PRD (gunakan Bahasa Indonesia profesional).
