# Panduan Prompt Frontend (FE) BisaLapor — 5 Developer

Dokumen ini berisi kumpulan prompt instruksi untuk masing-masing dari **5 developer Frontend (FE)**. Setiap prompt dirancang agar developer (atau AI coding agent yang mereka gunakan) bekerja konsisten, menggunakan design system yang sama, dan fokus 100% pada Frontend (Mock Data / Client-Side State) tanpa saling tumpang-tindih.

---

## 📌 Standar Bersama (Shared Rules untuk Seluruh Dev)

Sebelum masuk ke prompt spesifik tiap anggota, pastikan aturan dasar ini dipatuhi:
1. **Design System:**
   - Background: Putih bersih (`#FFFFFF`) dengan aksen glassmorphism halus (`rgba(255,255,255,0.65)`, blur 14–18px, border `rgba(226,232,240,0.85)`).
   - Warna Utama: Apple Navy (`#0F1E55`), Dark Ink (`#0F172A`), Slate (`#334155`), Muted (`#64748B`).
   - Warna Semantik: Sukses (`#238653`), Warning (`#A96B00`), Error/Alert (`#C73548`), Blue Accent (`#2F6FDA`).
   - Font: `Inter`, system-ui.
2. **Kemandirian Frontend (Pure FE / No Backend):**
   - Tidak ada integrasi backend nyata saat ini.
   - Gunakan mock data lokal (JSON / TypeScript arrays).
   - State interaktif (filter, search, add, toggle status) disimpan di state client-side (Zustand / Context / React State / LocalStorage).
3. **Responsivitas Mutlak:**
   - Wajib berjalan mulus dari viewport mobile 360px hingga desktop 1440px.
   - Tabel di desktop otomatis beralih menjadi kartu (Card View) di mobile (< 760px) tanpa clipping horizontal.
4. **Acuan Desain:**
   - Prototype acuan: `ui/bisalapor-ui.html`
   - Aset vektor & Figma: `figma-export/BisaLapor_All_Screens_Figma.pdf` dan file `.svg` terkait.

---

## 👤 Prompt untuk Dev 1 (Lead FE: Design System, App Shell & Overview)

```text
Kamu bertindak sebagai Lead Frontend Engineer (Dev 1) untuk platform SaaS B2B BisaLapor.
Fokusmu adalah membangun pondasi UI/UX, Design System, Layout App Shell, dan Halaman Overview Dashboard secara 100% Frontend menggunakan Mock Data.

TANGGUNG JAWAB UTAMA:
1. Setup Design Tokens & Global Styles:
   - Warna: Canvas #FFFFFF, Navy brand #0F1E55, Text ink #0F172A, Muted #64748B, Border rgba(226,232,240,0.85).
   - Glassmorphism: backdrop-filter blur 14-18px, soft ambient shadow, rounded corners (Card: 18px, Button/Input: 11-12px, Active tile: 18px).
   - Typography: Font Inter, skala h1 (28-32px bold), h2 (16-18px bold), body (13-14px).
2. Bangun Reusable UI Components (src/components/ui/):
   - Button (variants: primary navy #0F1E55, secondary white outline, danger; sizes: sm, md).
   - Badge (status dot pill: success green, warning amber, error red, neutral blue).
   - SearchInput (dengan icon search & clear button).
   - Dropdown & Select-like trigger.
   - Modal Dialog & Toast Notification Feedback.
3. Persistent App Shell (Layout):
   - Sidebar Rail Kiri: Lebar 136px di desktop. Logo BisaLapor 'B' (108px artwork / 124px wrapper).
   - Navigasi ikon vertikal (item 64x64px, icon 30x30px, active state navy #0F1E55 dengan icon putih). Tooltip saat hover di sisi kanan.
   - User profile avatar 'RP' di bagian bawah sidebar dengan status dot online.
   - Responsive Mobile Header: Pada layar < 760px, sidebar otomatis beralih menjadi header ringkas dengan baris 7 ikon tanpa horizontal scrollbar terpotong.
4. Halaman 01_Overview:
   - Topbar/Header: Judul "Overview", subtitle ramah, tombol aksi sejajar di kanan: [Notifikasi] + [Hari Ini] + [+ Buat work order].
   - 4 Metric KPI Cards: Pekerjaan aktif (12), Menunggu review (07), Butuh info (03), Disetujui minggu ini (36).
   - Bar Chart Distribusi Status Pekerjaan (Open, Assigned, In Progress, Completed).
   - Widget Antrean Review (3 item teratas dengan link ke Reports).
   - Widget Aktivitas Terbaru (timeline perubahan status operasional).
   - AI Processing Health Card (Status Berjalan normal, 96.4% success bar, estimasi biaya).

ATURAN KHUSUS:
- Gunakan data mock lokal di `src/mocks/metrics.ts` dan `src/mocks/recentActivities.ts`.
- Jangan buat dependensi ke API eksternal. Pastikan semua tombol memiliki interaksi (misal toast atau modal trigger).
- Acuan visual: lihat halaman 01_Overview di `ui/bisalapor-ui.html` dan `figma-export/01_Overview.svg`.
```

---

## 👤 Prompt untuk Dev 2 (Work Orders Lifecycle & Details)

```text
Kamu bertindak sebagai Frontend Engineer (Dev 2) untuk platform SaaS B2B BisaLapor.
Fokusmu adalah membangun seluruh alur pengelolaan pekerjaan lapangan (Work Orders List & Detail) secara 100% Frontend menggunakan Mock Data dan state client-side.

TANGGUNG JAWAB UTAMA:
1. Halaman 02_Work_Orders:
   - Header: Judul "Work Orders", subtitle "Kelola seluruh pekerjaan dan penugasan teknisi.", dan tombol CTA [+ Buat work order] di kanan.
   - Toolbar Responsif:
     * Search bar full-width (debounce input untuk filter teks real-time berdasarkan nomor WO, pelanggan, atau lokasi).
     * Filter Dropdown "Semua status" (Open, Assigned, In Progress, Completed).
     * Filter Rentang Tanggal "22–28 Jul 2024".
     * Tombol "Export" (trigger toast download sukses).
   - Data Table (Desktop): Kolom PEKERJAAN (Judul + Nomor WO), PELANGGAN, TEKNISI, TANGGAL, STATUS PEKERJAAN (badge dot), STATUS LAPORAN (badge dot), dan tombol panah detail.
   - Responsive Card View (Mobile < 760px): Tabel otomatis berubah menjadi kartu vertikal terpisah untuk setiap WO dengan label field yang rapi (tanpa overflow horizontal).
2. Modal Form "Buat Work Order Baru":
   - Form input: Pelanggan, Lokasi, Jenis Servis, Tanggal/Waktu, dan Penugasan Teknisi.
   - Validasi client-side sederhana.
   - Saat submit, tambahkan data baru langsung ke state daftar WO dan tampilkan Toast konfirmasi.
3. Halaman 03_Work_Order_Detail:
   - Header detail dengan nomor WO (misal `WO-240318-017`), badge status, dan tombol "Tandai selesai".
   - Ringkasan Pekerjaan: Grid info Pelanggan, Lokasi, Teknisi, Jadwal, Tanggal dibuat, dan deskripsi keluhan.
   - Stepper Progres: Indikator visual 3 tahap (Dijadwalkan → Dikerjakan → Selesai).
   - Timeline Jejak Aktivitas: Daftar riwayat pekerjaan dari pembuatan hingga dokumentasi diterima.
   - Card Catatan Teknisi & Card Lampiran Dokumentasi Lapangan (counter foto & voice note).

ATURAN KHUSUS:
- Sumber data utama: Buat `src/mocks/workOrders.ts` berisi minimal 6-10 data realistis servis AC/genset.
- Gunakan komponen UI dasar dari Dev 1 (Button, Badge, SearchInput).
- Klik tombol panah pada tabel atau kartu langsung mengarahkan ke halaman `work-order-detail`.
- Acuan visual: lihat halaman 02 & 03 di `ui/bisalapor-ui.html` dan `figma-export/02_Work_Orders.svg`.
```

---

## 👤 Prompt untuk Dev 3 (Reports Management & Human Verification Engine)

```text
Kamu bertindak sebagai Frontend Engineer (Dev 3) untuk platform SaaS B2B BisaLapor.
Fokusmu adalah membangun modul paling krusial dalam PRD: Pengelolaan Laporan, Tampilan Verifikasi Draf AI (Split View), Peringatan Data Kurang, dan Approval Manusia.

TANGGUNG JAWAB UTAMA:
1. Halaman 04_Reports:
   - Header: Judul "Reports", subtitle "Tinjau, revisi, dan setujui laporan pekerjaan.", tombol [+ Buat laporan manual].
   - Filter Tabs Status: Tabs interaktif [Semua laporan], [Perlu review], [Butuh informasi], [Disetujui]. Klik tab langsung memfilter tabel secara instan.
   - Toolbar pencarian & tombol ekspor PDF.
   - Tabel Laporan: Kolom LAPORAN (Judul + ID RPT-...), WORK ORDER terkait (link biru), TEKNISI, DIPERBARUI, dan BADGE STATUS.
2. Halaman 05_Report_Review (Split View 2 Kolom):
   - Kolom Kiri — Bukti Lapangan Asli (Evidence Panel):
     * Badge "Pengirim terverifikasi", nama teknisi, kanal (Telegram/WhatsApp), dan timestamp.
     * Box teks pesan asli dari lapangan.
     * Galeri Foto 3 status: "Sebelum", "Proses", dan "Sesudah" (placeholder realistis).
     * Widget Voice Note: Bar pemutar audio dengan nama file, durasi (00:18), dan tombol play.
     * Catatan ketertelusuran (traceability notice).
   - Kolom Kanan — Editor Draf AI (AI Generated Draft):
     * Header draf: Tag "DRAFT LAPORAN · AI GENERATED", judul pekerjaan, versi draf, dan badge versi.
     * 4 Section Terstruktur yang dapat diedit:
       1. Ringkasan
       2. Temuan (dengan badge peringatan 'Perlu verifikasi')
       3. Tindakan
       4. Rekomendasi (dengan badge peringatan 'Perlu verifikasi')
   - Missing Information Alert (Patuhi PRD Pasal 14):
     * Box peringatan amber di bagian bawah draf: "2 informasi perlu dikonfirmasi (Nomor seri unit dan hasil pengukuran freon belum tersedia)".
3. Flow Approval & Revisi:
   - Tombol [Minta informasi] → memicu modal/toast permintaan klarifikasi ke teknisi.
   - Tombol [Setujui laporan] → mengunci draf (disabled input), mengubah status menjadi "APPROVED", memunculkan toast "Laporan disetujui", dan mengarahkan kembali ke daftar laporan.

ATURAN KHUSUS:
- Data layer: buat `src/mocks/reports.ts` yang berisi draf lengkap dan parsial.
- Pastikan layout 2 kolom responsif: berdampingan di desktop (>1180px) dan bertumpuk rapi di tablet/mobile.
- Acuan visual: lihat halaman 04 & 05 di `ui/bisalapor-ui.html` dan `figma-export/05_Report_Review.svg`.
```

---

## 👤 Prompt untuk Dev 4 (AI Inbox & Media Processing Pipeline)

```text
Kamu bertindak sebagai Frontend Engineer (Dev 4) untuk platform SaaS B2B BisaLapor.
Fokusmu adalah membangun AI Inbox (antrean pesan dokumentasi masuk dari bot pesan Telegram/WhatsApp), antarmuka resolusi work order ambigu, dan komponen media player.

TANGGUNG JAWAB UTAMA:
1. Halaman 06_AI_Inbox (Master-Detail Layout):
   - Header: Judul "AI Inbox", subtitle "Semua dokumentasi masuk dari kanal terintegrasi.", badge "AI processing normal", dan tombol [Proses ulang terpilih].
   - Panel Kiri (Message List):
     * Search input pesan/pengirim.
     * List item pesan masuk: Avatar inisial teknisi, nama teknisi, preview isi chat/voice note, waktu (misal "2 mnt lalu"), dan badge status (Diproses, Draf dibuat, Perlu konfirmasi, Terhubung).
     * State interaktif: Klik salah satu pesan akan mengaktifkan item tersebut (selected state) dan memperbarui panel kanan secara instan.
2. Panel Kanan (Message Detail & Work Order Matching):
   - Header pesan: Label "MESSAGE DETAIL", nama pengirim, sumber kanal ("Telegram · 22 Jul 2024 · 11:40").
   - Bubble pesan chat asli dengan styling inset container.
   - Card Work Order Terkait (AI Linker):
     * Tampilkan judul pekerjaan yang dicocokkan AI (`WO-240318-017 · PT Arunika`).
     * Jika ambigu, tampilkan badge warning "Konfirmasi dibutuhkan" dan teks penjelasan: "AI menemukan dua work order yang cocok. Pilih salah satu untuk melanjutkan pembuatan draf."
     * Tombol aksi: [+ Konfirmasi work order] (Primary) dan [Buat manual] (Secondary).
   - Catatan audit: "Pesan asli akan selalu disimpan untuk audit dan traceability."
3. Komponen Media Interaktif:
   - Inline Audio Player untuk voice note: tombol Play/Pause toggle, simulasi durasi berjalan, dan waveform/progress bar sederhana.
   - Image Lightbox Preview: klik thumbnail foto dokumentasi memunculkan modal preview resolusi penuh.

ATURAN KHUSUS:
- Mock data: buat `src/mocks/inboxMessages.ts` dengan minimal 4 skenario (pesan teks biasa, pesan dengan 3 foto, voice note, dan pesan tanpa nomor WO jelas / ambigu).
- Pastikan transisi antar pesan di sisi kanan berjalan mulus tanpa re-render yang berat.
- Acuan visual: lihat halaman 06 di `ui/bisalapor-ui.html` dan `figma-export/06_AI_Inbox.svg`.
```

---

## 👤 Prompt untuk Dev 5 (Directory, Technicians & Team Settings / RBAC)

```text
Kamu bertindak sebagai Frontend Engineer (Dev 5) untuk platform SaaS B2B BisaLapor.
Fokusmu adalah membangun modul manajemen direktori teknisi, direktori pelanggan, dan halaman pengaturan workspace (Team & Access / RBAC).

TANGGUNG JAWAB UTAMA:
1. Halaman 07_Technicians:
   - Header: Judul "Technicians", subtitle "Kelola anggota tim lapangan dan penugasan mereka.", tombol [+ Undang teknisi].
   - Toolbar: Search bar nama/email, dropdown filter status (Semua, Aktif, Nonaktif), dan counter "6 teknisi aktif".
   - Tabel Teknisi: Avatar inisial, nama & email, badge status (Aktif hijau / Nonaktif abu-abu), jumlah pekerjaan aktif, jumlah laporan, tombol menu titik tiga.
   - Modal Form "Undang Teknisi Baru": Input nama, email, nomor WhatsApp/Telegram. Saat disubmit, tambahkan ke state list teknisi.
2. Halaman 08_Customers:
   - Header: Judul "Customers", subtitle "Direktori pelanggan dan riwayat pekerjaan.", tombol [+ Tambah pelanggan].
   - Card Grid Direktori: Grid 2 kolom di desktop (1 kolom di mobile). Setiap card menampilkan logo monogram inisial perusahaan, nama PT/CV, lokasi unit/kantor, counter WORK ORDERS aktif, counter LAPORAN AKTIF, dan tombol panah detail.
3. Halaman 09_Settings (Team & Access):
   - Layout 2 Kolom (Sub-navigasi di kiri, konten form di kanan):
     * Navigasi Settings: [Company Profile], [Team & Access] (Active), [Integrations], [Security & Logs].
     * Field Workspace Info: Workspace ID (`arunika-prod`), Status Plan (`Pilot`).
   - Tabel Anggota Workspace & Role (RBAC):
     * Kolom: NAMA, ROLE (Owner, Admin, Supervisor, Technician), STATUS, AKSI.
     * Dropdown pengubah role simulasi.
   - Card Integrasi Aktif:
     * Card Telegram Bot (`@arunika_lapor_bot`) dengan badge hijau "Aktif" dan indikator "Webhook verified".
     * Tombol [Kelola integrasi] dan catatan edukasi: "AI hanya memproses pesan yang masuk melalui kanal terintegrasi."

ATURAN KHUSUS:
- Sumber mock data: buat `src/mocks/technicians.ts`, `src/mocks/customers.ts`, dan `src/mocks/teamMembers.ts`.
- Sediakan fungsi toggle status (aktif/nonaktif) langsung di UI untuk menunjukkan reaktivitas frontend.
- Acuan visual: lihat halaman 07, 08, & 09 di `ui/bisalapor-ui.html` dan `figma-export/` terkait.
```

---

## 🚀 Cara Menggunakan Dokumen Ini
1. Berikan **Standar Bersama** ke seluruh tim di awal kickoff.
2. Salin (*copy-paste*) prompt masing-masing developer ke developer terkait (atau masukkan ke AI Coding Assistant masing-masing).
3. Jalankan standup harian untuk menyinkronkan format data mock di `src/mocks/` agar saat penggabungan (Sprint 3), semua halaman langsung terhubung tanpa perbedaan penamaan key JSON.
