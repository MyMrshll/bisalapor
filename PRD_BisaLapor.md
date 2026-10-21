**BISALAPOR**

Product Requirements  
Document

*Kerja Selesai, Laporan Tinggal Jadi.*

| **Informasi**  | **Detail**                                                      |
|----------------|-----------------------------------------------------------------|
| Nama Produk    | BisaLapor                                                       |
| Kategori       | B2B SaaS — AI-Assisted Field Service Reporting                  |
| Target Awal    | Perusahaan jasa servis dan pemeliharaan AC                      |
| Platform MVP   | Web dashboard responsif + satu kanal pesan terintegrasi         |
| Status Dokumen | PRD awal untuk perencanaan dan implementasi MVP                 |
| Prinsip Utama  | AI menyusun draf; manusia memverifikasi dan menyetujui laporan. |

# 1. Ringkasan Produk

BisaLapor adalah platform B2B SaaS untuk membantu perusahaan jasa mengumpulkan dokumentasi pekerjaan lapangan dan mengubahnya menjadi draf laporan terstruktur dengan bantuan AI. Teknisi dapat mengirim catatan, foto, atau pesan suara melalui kanal yang terintegrasi. AI membantu mengekstrak informasi, menandai kekurangan, dan membuat draf. Admin atau supervisor kemudian meninjau, memperbaiki, dan menyetujui laporan sebelum diekspor menjadi PDF.

## 1.1 Visi

Membuat dokumentasi pekerjaan lapangan lebih mudah, konsisten, dan dapat ditelusuri.

## 1.2 Masalah yang ingin diuji

- Teknisi mengirim catatan, foto, atau pesan suara melalui berbagai kanal.

- Admin mungkin perlu mengumpulkan dan menulis ulang dokumentasi secara manual.

- Informasi penting berpotensi terlewat atau format laporan tidak konsisten.

- Menelusuri dokumentasi yang terkait dengan pekerjaan tertentu dapat memakan waktu.

Poin-poin tersebut merupakan hipotesis produk dan harus divalidasi melalui wawancara pelanggan; bukan klaim pasar yang sudah terbukti.

## 1.3 Prinsip Produk

- AI hanya membuat draf; manusia yang berwenang menyetujui laporan final.

- AI tidak boleh mengarang fakta, nilai pengukuran, komponen, waktu, atau hasil pekerjaan.

- Dokumentasi hanya dihubungkan ke work order setelah identitasnya cukup pasti.

- Dashboard adalah pusat kendali operasional; bot pesan merupakan kanal input.

- Aturan bisnis, status, izin, dan persetujuan dikendalikan backend.

- Tidak ada statistik palsu atau tombol yang terlihat berfungsi padahal belum diimplementasikan.

# 2. Target Pengguna dan Persona

| **Persona** | **Kebutuhan**                                  | **Tanggung Jawab**                                                     |
|-------------|------------------------------------------------|------------------------------------------------------------------------|
| Owner       | Visibilitas operasional dan kontrol perusahaan | Mengelola workspace, tim, pengaturan, dan data operasional sesuai izin |
| Admin       | Mengelola pekerjaan dan laporan secara efisien | Membuat work order, menugaskan teknisi, memeriksa laporan              |
| Supervisor  | Menjaga kualitas dokumentasi                   | Meninjau, meminta revisi, dan menyetujui laporan                       |
| Teknisi     | Mengirim dokumentasi tanpa proses rumit        | Melaksanakan pekerjaan dan mengirim catatan, foto, atau suara          |

# 3. Tujuan Produk dan Metrik

- Mempermudah pengumpulan dokumentasi pekerjaan.

- Menghasilkan draf laporan terstruktur dari input teknisi.

- Mengurangi informasi yang terlewat melalui pemeriksaan kelengkapan.

- Menyediakan alur review, revisi, persetujuan, dan ekspor yang dapat ditelusuri.

- Mengukur waktu penyelesaian laporan, tingkat revisi, kualitas output AI, dan biaya per laporan.

| **Metrik**                 | **Definisi / Tujuan**                                                        |
|----------------------------|------------------------------------------------------------------------------|
| Report Completion Time     | Waktu dari awal pengumpulan dokumentasi hingga laporan lengkap.              |
| First-Pass Approval Rate   | Proporsi laporan yang disetujui tanpa revisi.                                |
| Revision Rate              | Proporsi laporan yang memerlukan revisi.                                     |
| Missing Information Rate   | Seberapa sering laporan kekurangan informasi.                                |
| AI Processing Success Rate | Proporsi proses AI yang berhasil menurut definisi pengukuran yang konsisten. |
| AI Correction Rate         | Seberapa sering draf AI membutuhkan koreksi material.                        |
| Cost per Report            | Biaya AI dan pemrosesan terkait per laporan.                                 |
| Pilot-to-Paid Conversion   | Proporsi pilot yang menjadi pelanggan berbayar.                              |

Target angka ditentukan setelah baseline dan hasil pilot tersedia. Jangan menyatakan penghematan atau akurasi sebagai fakta sebelum diukur.

# 4. Ruang Lingkup dan Prioritas

| **Prioritas** | **Fitur**                                                                                                                                                                                                                                                        |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| P0 — MVP      | Authentication, company workspace, RBAC, overview, work orders, technician management, report management, AI Report Agent, AI Inbox, satu kanal pesan, media storage, missing-information handling, human approval, PDF export, audit log dasar, error handling. |
| P1            | Customer Management lebih lengkap, template PDF yang dapat dikonfigurasi, aturan kelengkapan per jenis layanan, filter lanjutan, statistik dasar, pemantauan penggunaan AI, pengingat sederhana.                                                                 |
| P2            | Kanal pesan kedua, AI Assistant operasional, ringkasan harian/mingguan, pengingat lanjutan, billing, kuota AI, analitik lanjutan, aplikasi mobile.                                                                                                               |
| Out of Scope  | Akuntansi, inventaris lengkap, penggajian, pembayaran pelanggan, penjadwalan kompleks, ERP, pelatihan model AI sendiri, multi-agent otonom dengan akses luas, persetujuan otomatis tanpa manusia.                                                                |

# 5. Informasi Arsitektur dan Navigasi

> BISALAPOR  
> WORKSPACE  
> Overview  
> Work Orders  
> Reports  
> AI Inbox  
> MANAGEMENT  
> Technicians  
> Customers  
> SETTINGS  
> Company Profile  
> Integrations  
> Team & Access

Menu yang belum diimplementasikan tidak boleh ditampilkan seolah-olah aktif. AI Assistant, AI Activity lanjutan, dan Subscription dapat ditambahkan saat fiturnya siap.

# 6. Functional Requirements

## 6.1 Authentication dan Workspace

- Pengguna dapat login dan logout dengan aman.

- Backend memvalidasi sesi atau token pada endpoint yang membutuhkan autentikasi.

- Pengguna hanya dapat mengakses data perusahaan sesuai membership dan role.

- Owner atau admin berizin dapat mengelola anggota tim.

- Perubahan akses dan tindakan sensitif dicatat.

## 6.2 Work Orders

- Membuat, melihat, mencari, memfilter, dan memperbarui work order.

- Menetapkan pelanggan, lokasi, jenis layanan, tanggal, dan teknisi.

- Mengelola penugasan dan status pekerjaan.

- Menghubungkan dokumentasi serta laporan ke pekerjaan yang tepat.

- Menolak atau meminta konfirmasi jika hubungan dokumentasi dengan work order belum pasti.

| **Status**  | **Arti**                               |
|-------------|----------------------------------------|
| OPEN        | Pekerjaan dibuat dan belum ditugaskan. |
| ASSIGNED    | Pekerjaan sudah ditugaskan.            |
| IN_PROGRESS | Pekerjaan sedang dilakukan.            |
| COMPLETED   | Pekerjaan selesai.                     |
| CANCELLED   | Pekerjaan dibatalkan.                  |

## 6.3 Report Management

Laporan harus memiliki nomor unik, work order, pelanggan, teknisi, tanggal layanan, keluhan, temuan, tindakan, hasil, suku cadang jika ada, foto, catatan, status, serta informasi persetujuan.

- Admin dapat membuat, membuka, mencari, memfilter, dan mengedit draf.

- Tampilkan sumber dokumentasi berdampingan dengan draf laporan.

- Sediakan aksi simpan, minta informasi tambahan, revisi, setujui, dan ekspor PDF sesuai status.

- Perubahan dan persetujuan penting dicatat.

- Laporan final tidak boleh berubah diam-diam; perubahan harus melalui revisi yang dapat ditelusuri.

## 6.4 AI Report Agent

1.  Terima teks, foto, atau pesan suara dari kanal yang terintegrasi.

2.  Verifikasi pengirim dan izin akses.

3.  Identifikasi work order; minta konfirmasi jika ambigu.

4.  Transkripsikan audio jika diperlukan.

5.  Ekstrak informasi relevan dan hasilkan draf sesuai schema.

6.  Validasi output dan tandai informasi yang belum tersedia.

7.  Simpan draf serta status pemrosesan.

8.  Minta klarifikasi bila diperlukan dan sediakan review manusia.

| **Tool Backend**          | **Fungsi**                                      |
|---------------------------|-------------------------------------------------|
| get_work_order            | Mengambil detail work order yang boleh diakses. |
| create_report_draft       | Membuat draf laporan.                           |
| update_report_draft       | Memperbarui draf yang diizinkan.                |
| check_missing_information | Memeriksa kelengkapan laporan.                  |
| get_daily_summary         | Mengambil ringkasan operasional sesuai izin.    |

Agent tidak boleh mendapat akses SQL langsung atau melewati autentikasi, otorisasi, status bisnis, maupun persetujuan.

## 6.5 AI Inbox

- Menampilkan kanal, pengirim terverifikasi, isi pesan, media, waktu, work order, dan status pemrosesan.

- Menyediakan antrean konfirmasi jika work order belum jelas.

- Mempertahankan pesan asli dan mencegah duplikasi akibat webhook atau retry.

- Memungkinkan pengguna membuka draf yang terkait.

## 6.6 Integrasi WhatsApp / Telegram

MVP mendukung satu kanal terlebih dahulu. Pilih berdasarkan hasil wawancara pelanggan; Telegram dapat mempermudah prototipe, sedangkan WhatsApp Business Platform dapat diprioritaskan bila itulah kanal utama pelanggan.

- Menerima teks dan media yang didukung.

- Memverifikasi webhook dan memetakan pengirim ke identitas yang sah.

- Menyimpan dokumentasi dan mengirim konfirmasi penerimaan.

- Meminta nomor work order atau konfirmasi saat referensi ambigu.

- Bot hanya memproses pesan yang dikirim melalui integrasi, bukan seluruh percakapan pribadi.

## 6.7 Technician Management

- Menambah, mengubah, mengaktifkan, atau menonaktifkan akun teknisi.

- Melihat penugasan dan laporan yang membutuhkan informasi.

- Menjaga riwayat pekerjaan ketika akses dinonaktifkan.

- Mencegah akses ke pekerjaan yang tidak diizinkan.

## 6.8 Customer Management

Prioritas P1: menyimpan nama, kontak yang diperlukan, lokasi layanan, serta riwayat work order dan laporan sesuai hak akses.

## 6.9 Overview Dashboard

- Menampilkan pekerjaan hari ini, pekerjaan aktif, laporan menunggu review, laporan membutuhkan informasi, laporan disetujui, aktivitas terbaru, dan tindakan yang perlu dilakukan.

- Semua metrik berasal dari backend aktual.

- Menyediakan loading, empty, error, retry, dan permission states.

## 6.10 PDF Export

- Menggunakan template konsisten dan data backend.

- Menampilkan informasi pekerjaan, pelanggan, teknisi, tindakan, hasil, dokumentasi, dan persetujuan yang tersedia.

- Menangani teks panjang dan banyak foto tanpa merusak layout.

- Ekspor final hanya untuk laporan yang telah disetujui; pratinjau draf harus diberi label jelas.

## 6.11 AI Activity dan Logging

Logging dasar wajib: status pemrosesan, waktu, jumlah percobaan, kode error aman, tool yang dipanggil, status hasil, dan estimasi penggunaan/biaya jika tersedia. Hindari menyimpan data sensitif secara berlebihan.

## 6.12 AI Assistant dan Pengingat

Prioritas P2. AI Assistant menjawab pertanyaan operasional melalui tool backend yang dibatasi. Pengingat ditentukan oleh aturan backend, dengan deduplikasi dan batas frekuensi agar tidak mengganggu pengguna.

# 7. Status dan Business Rules

| **Status Laporan** | **Arti**                                                                       |
|--------------------|--------------------------------------------------------------------------------|
| PROCESSING         | Sistem sedang memproses input, jika status ini digunakan pada entitas laporan. |
| NEEDS_INFORMATION  | Informasi yang dibutuhkan belum lengkap.                                       |
| PENDING_REVIEW     | Draf siap diperiksa.                                                           |
| REVISION_REQUIRED  | Laporan dikembalikan untuk diperbaiki.                                         |
| APPROVED           | Laporan disetujui.                                                             |

- Status work order dan report dipisahkan.

- Backend memvalidasi setiap transisi status.

- AI tidak boleh mengubah status bisnis atau menyetujui laporan sendiri.

- Kelengkapan ditentukan oleh aturan bisnis; kebutuhan dapat berbeda menurut jenis layanan.

- Laporan yang disetujui menyimpan versi, penyetuju, dan waktu persetujuan.

- Webhook dan pemrosesan ulang harus idempotent sejauh memungkinkan.

# 8. Roles dan Access Control

| **Aksi**              | **Owner**    | **Admin**    | **Supervisor**   | **Technician**   |
|-----------------------|--------------|--------------|------------------|------------------|
| Mengelola anggota     | Ya           | Sesuai izin  | Tidak            | Tidak            |
| Membuat work order    | Ya           | Ya           | Sesuai izin      | Tidak            |
| Menugaskan pekerjaan  | Ya           | Ya           | Sesuai izin      | Tidak            |
| Melihat work order    | Sesuai akses | Sesuai akses | Sesuai penugasan | Yang ditugaskan  |
| Mengirim dokumentasi  | Ya           | Ya           | Ya               | Ya               |
| Mengedit draf         | Ya           | Ya           | Ya               | Sesuai kebijakan |
| Menyetujui laporan    | Ya           | Sesuai izin  | Ya               | Tidak            |
| Pengaturan perusahaan | Ya           | Terbatas     | Tidak            | Tidak            |

Multi-tenancy wajib: identitas tenant berasal dari konteks autentikasi tepercaya, bukan tenantId mentah dari request. Semua query, media, PDF, dan hasil AI harus mengikuti isolasi tenant.

# 9. Data Model dan Database

Rekomendasi: PostgreSQL + Prisma. Model konseptual berikut perlu disesuaikan dengan repository dan kebutuhan aktual.

| **Entitas**         | **Fungsi / Field penting**                                                                                                   |
|---------------------|------------------------------------------------------------------------------------------------------------------------------|
| Company             | id, name, slug, createdAt, updatedAt                                                                                         |
| User                | id, name, email, passwordHash atau referensi identity provider                                                               |
| Membership          | companyId, userId, role, status                                                                                              |
| Customer            | companyId, name, contactInformation                                                                                          |
| WorkOrder           | companyId, workOrderNumber, customerId, serviceType, location, scheduledAt, status                                           |
| WorkOrderAssignment | workOrderId, userId, assignment metadata                                                                                     |
| InboundMessage      | companyId, integrationId, externalMessageId, senderId, messageType, content, status, workOrderId nullable                    |
| Attachment          | companyId, storageKey, mimeType, fileSize, uploadedBy, relasi ke pesan/pekerjaan/laporan                                     |
| Report              | companyId, workOrderId, reportNumber, version, complaint, findings, actionsTaken, result, partsUsed, status, approval fields |
| ReportRevision      | Riwayat versi dan perubahan laporan                                                                                          |
| AIProcessingJob     | companyId, input reference, processingType, status, attemptCount, errorCode, timestamps                                      |
| Integration         | Konfigurasi kanal dan status integrasi                                                                                       |
| AuditLog            | companyId, actor, action, entity, metadata, timestamp                                                                        |

- Gunakan foreign key, unique constraint, dan indeks yang sesuai.

- Nomor work order dan report unik dalam cakupan perusahaan.

- Simpan media di object storage dan metadata di database.

- Simpan secret secara aman, bukan plaintext.

- Gunakan transaksi untuk perubahan yang harus berhasil bersama.

- Tentukan kebijakan retensi dan penghapusan data.

# 10. System Architecture

> Web Dashboard ─┐  
> ├─ Backend API (modular monolith) ─ PostgreSQL  
> Messaging Bot ─┘ │ └ Object Storage  
> ├─ LLM API  
> ├─ Transcription API  
> ├─ PDF generation  
> └─ Audit / monitoring

| **Komponen** | **Rekomendasi**                                  |
|--------------|--------------------------------------------------|
| Frontend     | React atau framework yang sudah digunakan        |
| Backend      | Node.js + Express                                |
| Database     | PostgreSQL                                       |
| ORM          | Prisma                                           |
| AI           | LLM API dengan structured output                 |
| Audio        | Audio transcription API                          |
| Storage      | S3-compatible object storage                     |
| PDF          | Library yang sesuai kebutuhan layout             |
| Messaging    | Telegram Bot API atau WhatsApp Business Platform |

Gunakan modular monolith untuk MVP. Tambahkan job queue, worker, cache, atau microservices hanya ketika kebutuhan operasional membenarkannya.

# 11. API Requirements

| **Method** | **Endpoint**                            | **Fungsi**                 |
|------------|-----------------------------------------|----------------------------|
| POST       | /api/v1/auth/login                      | Login                      |
| POST       | /api/v1/auth/logout                     | Logout                     |
| GET        | /api/v1/auth/me                         | Pengguna aktif             |
| GET        | /api/v1/company                         | Perusahaan aktif           |
| GET        | /api/v1/team                            | Anggota tim                |
| POST       | /api/v1/team/invitations                | Undang anggota             |
| GET        | /api/v1/work-orders                     | Daftar pekerjaan           |
| POST       | /api/v1/work-orders                     | Buat pekerjaan             |
| GET        | /api/v1/work-orders/:id                 | Detail pekerjaan           |
| PATCH      | /api/v1/work-orders/:id                 | Perbarui pekerjaan         |
| PATCH      | /api/v1/work-orders/:id/status          | Perbarui status            |
| POST       | /api/v1/work-orders/:id/assignments     | Tugaskan teknisi           |
| GET        | /api/v1/reports                         | Daftar laporan             |
| POST       | /api/v1/reports                         | Buat laporan manual        |
| GET        | /api/v1/reports/:id                     | Detail laporan             |
| PATCH      | /api/v1/reports/:id                     | Perbarui draf              |
| POST       | /api/v1/reports/:id/request-information | Minta informasi            |
| POST       | /api/v1/reports/:id/approve             | Setujui laporan            |
| POST       | /api/v1/reports/:id/revisions           | Buat revisi                |
| GET        | /api/v1/reports/:id/pdf                 | Ekspor PDF                 |
| GET        | /api/v1/inbox                           | Daftar pesan               |
| POST       | /api/v1/inbox/:id/process               | Proses/ulang proses        |
| POST       | /api/v1/inbox/:id/confirm-work-order    | Konfirmasi work order      |
| GET        | /api/v1/ai/jobs/:id                     | Status pemrosesan AI       |
| POST       | /api/v1/webhooks/telegram               | Webhook Telegram           |
| POST       | /api/v1/webhooks/whatsapp               | Webhook potensial WhatsApp |

- Semua endpoint harus memiliki validasi input, otorisasi, dan respons error konsisten.

- Gunakan pagination untuk daftar data.

- Validasi filter dan sorting di server.

- Webhook hanya diaktifkan untuk kanal yang dipilih dan harus diverifikasi.

- Dokumentasikan transisi status dan terapkan idempotensi pada operasi yang rawan duplikasi.

# 12. UI/UX Requirements

- Desain modern B2B SaaS dengan navigasi yang jelas dan tabel operasional yang mudah dipindai.

- Gunakan **Apple Web Design dengan Refined Glassmorphism** sebagai arah visual utama di atas canvas putih bersih (`#FFFFFF`). Glassmorphism diterapkan secara terkontrol pada surface kartu dan panel mengambang (`rgba(255, 255, 255, 0.65)`, `backdrop-filter: blur(14px–18px)`, border halus `rgba(226, 232, 240, 0.85)`, dan soft elevation shadow) untuk memberikan kedalaman visual yang elegan dan tenang tanpa mengorbankan keterbacaan data.

- Layout menggunakan sistem **Single Header terpadu**: judul halaman utama dan aksi operasional berada dalam satu baris selaras. Tombol notifikasi, filter tanggal ('Hari Ini'), dan tombol aksi utama ('+ Buat work order') dikelompokkan di sisi kanan tanpa header ganda atau breadcrumb yang berulang.

- Sidebar menggunakan model **Icon Rail Desktop (lebar 136px)**: tombol navigasi berukuran 64×64px dengan sudut membulat 18px dan ikon SVG 30×30px. Item aktif menggunakan kontras navy `#0F1E55` dengan ikon putih, dilengkapi tooltip penjelas di sisi kanan saat hover. Profil pengguna (avatar 'RP' dengan indikator online hijau) berada di bagian bawah sidebar.

- Halaman Reports menggunakan arsitektur **Split View dua kolom berdampingan**: sisi kiri menampilkan dokumentasi sumber asli lapangan (teks teknisi, galeri foto Sebelum/Proses/Sesudah, dan pemutar audio voice note), sedangkan sisi kanan menampilkan draf terstruktur AI (Ringkasan, Temuan, Tindakan, Rekomendasi).

- Seluruh draf AI dilengkapi **Missing Information Alert**: jika ada parameter wajib yang belum dilaporkan teknisi, sistem menampilkan kotak peringatan visual dan tidak boleh mengarang fakta untuk mengisi kekosongan tersebut.

- Aksi utama laporan: Simpan Perubahan, Minta Informasi Tambahan, Setujui Laporan, dan Ekspor PDF.

- AI Inbox menggunakan tata letak **Master-Detail**: daftar pesan masuk dari kanal terintegrasi (Telegram/WhatsApp) di sisi kiri, dan detail pesan serta kartu resolusi work order ambigu di sisi kanan.

- Semua halaman utama memiliki loading (skeleton), empty, error, retry, dan permission states.

- **Responsivitas Mutlak:** Antarmuka wajib beradaptasi mulus dari layar ponsel (360px) hingga desktop (1440px). Tabel operasional di desktop secara otomatis bertransformasi menjadi susunan **Card View mandiri** pada layar mobile (< 760px) untuk mencegah kolom terpotong atau horizontal overflow.

- Dukungan aksesibilitas (`prefers-reduced-transparency`): jika opsi transparansi dinonaktifkan pada sistem operasi pengguna, seluruh surface glass otomatis menjadi putih solid (`#FFFFFF`).

## 12.1 Identitas Visual dan Logo

- Logo utama menggunakan monogram geometris custom huruf **B** yang terintegrasi dengan simbol dokumen berlipat.

- Ciri logo wajib dipertahankan: stem vertikal yang kokoh, dua lobe membulat proporsional, notch tegas di tengah, dokumen inset di dalam huruf B, lipatan sudut kanan atas dokumen (folded corner), dan dua bar horizontal berbentuk rounded pill.

- Logo tidak boleh diganti dengan glyph font B standar, ikon folder generik, clipboard, chat bubble, mikrofon, atau simbol AI bintang/sparkle.

- Ukuran logo pada sidebar desktop menggunakan proporsi dominan: artwork berukuran **108×108px** (wrapper 124×124px) untuk memastikan keterbacaan siluet dokumen di dalam huruf B.

- Warna brand utama mengikuti palet resmi BisaLapor:
  - **Canvas Background:** `#FFFFFF` (Putih bersih dengan radial gradient halus)
  - **Primary Brand Navy:** `#0F1E55` (Logo, tombol aksi utama, item navigasi aktif)
  - **Surface Glass:** `rgba(255, 255, 255, 0.65)` dengan `backdrop-filter: blur(16px)`
  - **Inset / Input Surface:** `rgba(241, 245, 251, 0.82)`
  - **Border & Dividers:** `rgba(226, 232, 240, 0.85)` atau `rgba(15, 30, 85, 0.12)`
  - **Heading Text (Ink):** `#0F172A`
  - **Body Text (Slate):** `#334155`
  - **Muted Text / Secondary:** `#64748B`
  - **Status Sukses:** `#238653` (Badge Selesai, Disetujui, Aktif)
  - **Status Warning:** `#A96B00` (Badge Dikerjakan, Perlu review, Konfirmasi dibutuhkan)
  - **Status Error / Alert:** `#C73548` (Badge Butuh info, Missing information)
  - **Accent Blue:** `#2F6FDA` (Tabs active, text link)

- Varian logo yang disediakan:
  1. Solid Navy `#0F1E55` di atas canvas terang / putih.
  2. Monogram putih di dalam tile navy membulat untuk ikon aplikasi.
  3. Flat monochrome hitam/navy untuk pencetakan dokumen PDF dan kop surat resmi.
  4. Favicon tajam skala 16×16 px dan 32×32 px.

- Logo ditempatkan secara konsisten dan proporsional. Warna accent digunakan secara disiplin hanya untuk primary action, status, dan elemen interaktif terpilih.

- Brand assets wajib tersedia dalam format vektor murni (SVG/PDF) di folder `figma-export/` agar selalu tajam pada dashboard, favicon, laporan PDF, dan media cetak. Acuan implementasi kode antarmuka wajib mengacu pada file `ui/bisalapor-ui.html`.

# 13. Non-Functional Requirements

| **Area**      | **Persyaratan awal**                                                                                                 |
|---------------|----------------------------------------------------------------------------------------------------------------------|
| Performance   | Sasaran awal API sederhana P95 ≤ 500 ms pada lingkungan uji; dashboard utama ≤ 3 detik pada kondisi yang ditetapkan. |
| Reliability   | Input asli tidak hilang saat AI gagal; retry aman; backup dan pemulihan diuji.                                       |
| Security      | Hash password, lindungi secret, validasi tenant dan role, verifikasi webhook, validasi upload.                       |
| Privacy       | Batasi akses media, minimalkan data sensitif pada prompt/log, tetapkan retensi.                                      |
| Scalability   | Arsitektur dapat menambahkan queue/worker saat dibutuhkan.                                                           |
| Accessibility | Navigasi keyboard, label jelas, status tidak dibedakan hanya dengan warna.                                           |

Angka performa adalah sasaran awal yang perlu diukur, bukan jaminan atau hasil yang telah terbukti.

# 14. AI Governance dan Batasan AI

- AI tidak mengarang nilai pengukuran, suku cadang, waktu, kondisi komponen, atau hasil yang tidak diberikan.

- Bedakan fakta dari teknisi, data work order, hasil ekstraksi media, dan interpretasi AI.

- Output harus mengikuti schema dan divalidasi sebelum disimpan.

- Human review wajib sebelum laporan menjadi final.

- Jika AI gagal, simpan input asli, catat error aman, dan sediakan retry atau laporan manual.

- Catat penggunaan dan biaya AI bila tersedia; pertimbangkan kuota setelah pola penggunaan diketahui.

# 15. Integrasi dan Penyimpanan Media

> Terima media → Verifikasi pengirim → Validasi file → Simpan object  
> storage → Simpan metadata → Hubungkan ke work order → Proses AI jika perlu

- Batasi ukuran dan tipe file.

- Jangan mempercayai ekstensi file saja.

- Gunakan object storage dan akses unduh yang terkontrol.

- Dokumentasi tanpa work order yang pasti tetap disimpan dalam status belum terhubung.

- Tentukan kebijakan retensi dan penghapusan.

- Tangani rate limit, retry, dan duplikasi pada integrasi pesan.

# 16. Acceptance Criteria End-to-End

## A. Pekerjaan manual

9.  Admin membuat work order dan menugaskan teknisi.

10. Teknisi mengirim dokumentasi.

11. Sistem menyimpan dokumentasi dan membuat draf.

12. Admin memeriksa, memperbaiki, menyetujui, lalu mengekspor PDF.

**Kriteria lulus:** Laporan terhubung ke work order yang benar; sumber dapat ditelusuri; persetujuan tercatat.

## B. Informasi tidak lengkap

13. AI membuat draf dari input singkat.

14. Sistem menandai field yang belum tersedia.

15. Teknisi melengkapi informasi.

16. Admin meninjau draf yang diperbarui.

**Kriteria lulus:** Sistem tidak mengarang nilai untuk mengisi field kosong.

## C. Work order ambigu

17. Teknisi mengirim dokumentasi tanpa referensi jelas.

18. Sistem meminta nomor atau pilihan work order.

19. Backend memverifikasi akses setelah konfirmasi.

**Kriteria lulus:** Tidak ada tautan otomatis berdasarkan tebakan.

## D. AI gagal

20. Input disimpan.

21. Penyedia AI gagal.

22. Status gagal dicatat dan pengguna dapat retry atau membuat laporan manual.

**Kriteria lulus:** Input asli tetap tersedia dan retry tidak menimbulkan duplikasi.

## E. Isolasi tenant

23. Pengguna perusahaan A mencoba membuka laporan perusahaan B.

24. Backend memverifikasi tenant dan menolak akses.

**Kriteria lulus:** Data perusahaan lain tidak dapat dibaca atau dimodifikasi.

## F. Laporan disetujui

25. Supervisor menyetujui laporan.

26. Informasi baru masuk setelah persetujuan.

**Kriteria lulus:** Laporan final tidak berubah diam-diam; informasi baru masuk proses revisi.

# 17. Testing Requirements

## 17.1 Unit Testing

- Transisi status.

- Pemeriksaan role dan tenant.

- Validasi laporan dan kelengkapan.

- Pembentukan nomor laporan.

- Logika revisi dan ringkasan dashboard.

## 17.2 Integration Testing

- API dengan PostgreSQL.

- API dengan object storage.

- Backend dengan AI provider.

- Webhook dengan sistem pesan.

- Report approval dan PDF export.

## 17.3 AI Evaluation

- Uji input lengkap, singkat, ambigu, transkrip tidak sempurna, dan informasi bertentangan.

- Uji kemampuan menandai informasi yang hilang.

- Uji kepatuhan schema dan konsistensi terhadap sumber.

- Uji prompt injection dan instruksi yang mencoba melewati batasan.

- Ukur tingkat kesalahan fakta, kebutuhan koreksi, waktu, dan biaya.

## 17.4 Release Gate

- Isolasi tenant dan otorisasi telah diuji.

- AI tidak dapat menyetujui laporan sendiri.

- Input asli tetap tersedia ketika AI gagal.

- Laporan final tidak berubah tanpa revisi tercatat.

- PDF sesuai data laporan yang disetujui.

- Alur end-to-end telah diuji.

# 18. Business Model dan Validasi Pasar

Hipotesis awal: langganan bulanan per perusahaan dengan batas anggota, kuota laporan, atau penggunaan AI. Harga dan paket belum tervalidasi.

- Wawancarai 5–10 perusahaan untuk memahami alur kerja dan masalah nyata.

- Jika memungkinkan, jalankan pilot dengan 1–3 perusahaan.

- Bandingkan waktu penyelesaian laporan sebelum dan sesudah penggunaan.

- Catat koreksi AI, revisi, biaya per laporan, dan kesediaan membayar.

- Jangan mengklaim penghematan atau ukuran pasar tanpa bukti.

## 18.1 Komponen Biaya

- Hosting backend dan database.

- Object storage.

- LLM API dan transkripsi.

- Pengiriman pesan.

- PDF generation.

- Monitoring, backup, dan dukungan pelanggan.

# 19. Risiko dan Mitigasi

| **Risiko**                   | **Mitigasi**                                                       |
|------------------------------|--------------------------------------------------------------------|
| AI mengarang detail          | Schema validation, missing-info flags, review manusia.             |
| Dokumentasi salah work order | Konfirmasi referensi dan verifikasi akses.                         |
| Integrasi gagal              | Simpan input, logging, retry, monitoring.                          |
| Biaya AI tinggi              | Ukur biaya per laporan dan batasi penggunaan.                      |
| Adopsi rendah                | Validasi alur kerja dan pilih kanal yang digunakan pelanggan.      |
| Kebocoran data               | Tenant isolation, akses media terkontrol, audit, security testing. |
| PDF tidak konsisten          | Template teruji dan pengujian layout.                              |
| Ketergantungan provider      | Pisahkan adapter provider dari logika bisnis.                      |
| Scope membesar               | Pertahankan batas P0 dan validasi prioritas fitur.                 |

# 20. Roadmap Pengembangan

| **Fase**              | **Pekerjaan**                                                        | **Hasil**                                     |
|-----------------------|----------------------------------------------------------------------|-----------------------------------------------|
| 1\. Fondasi           | Audit repository, autentikasi, tenant isolation, RBAC, validasi.     | Fondasi backend aman.                         |
| 2\. Core Operations   | Work order, assignment, report management, dashboard, audit log.     | Operasional manual berjalan.                  |
| 3\. AI Reporting      | LLM, schema, missing-info, retry, review dan approval.               | Draf AI dapat diperiksa.                      |
| 4\. Messaging & Media | Satu kanal, webhook, storage, pemetaan pengirim dan work order.      | Dokumentasi masuk melalui kanal.              |
| 5\. PDF & Stabilitas  | Template PDF, integration/security tests, AI evaluation, monitoring. | MVP siap untuk pilot jika release gate lulus. |
| 6\. Pilot             | Onboarding, baseline, feedback, pengukuran biaya dan hasil.          | Prioritas lanjutan berdasarkan bukti.         |

# 21. Definition of Done

- Kebutuhan bisnis dan acceptance criteria terpenuhi.

- Frontend/backend terimplementasi sesuai kebutuhan.

- Validasi input, autentikasi, otorisasi, dan tenant isolation diterapkan.

- Error states dan logging tersedia.

- Data berasal dari backend aktual, bukan dummy yang menyamar sebagai data nyata.

- Test relevan dijalankan dan hasilnya dilaporkan.

- Dokumentasi API diperbarui jika perlu.

- Tidak ada secret di source code.

- Untuk fitur AI: schema valid, input asli dipertahankan, fakta tidak dikarang, kegagalan ditangani, dan review manusia tersedia.

# 22. Instruksi untuk AI Coding Agent

Gunakan instruksi ini sebagai prompt dasar ketika agent mengembangkan repository BisaLapor.

| Kamu bertindak sebagai Senior Software Engineer yang mengembangkan BisaLapor, platform B2B SaaS untuk dokumentasi dan pelaporan pekerjaan lapangan berbantuan AI. Audit repository terlebih dahulu, pertahankan kode yang bekerja, dan buat rencana sebelum perubahan besar. Implementasikan bertahap: fondasi keamanan, work order, report management, AI Report Agent, AI Inbox dan satu kanal, lalu PDF export. AI hanya membuat draf dan tidak boleh mengarang fakta, mengakses SQL langsung, melewati otorisasi, atau menyetujui laporan final. Terapkan tenant isolation, validasi input, idempotensi, audit log, dan penanganan kegagalan. Gunakan data backend aktual; jangan membuat statistik palsu atau tombol yang belum berfungsi. Pada setiap fase, jalankan lint/typecheck/test yang tersedia dan laporkan perubahan, file yang terpengaruh, hasil pengujian, acceptance criteria yang terpenuhi, serta pekerjaan dan risiko yang tersisa. |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|

# 23. Keputusan yang Perlu Dikonfirmasi

| **Keputusan**  | **Rekomendasi awal**                   | **Status**                    |
|----------------|----------------------------------------|-------------------------------|
| Segmen awal    | Perusahaan servis AC                   | Hipotesis; validasi pelanggan |
| Backend        | Node.js + Express                      | Rekomendasi                   |
| Database       | PostgreSQL + Prisma                    | Rekomendasi                   |
| AI provider    | LLM API dengan structured output       | Pilih provider                |
| Kanal MVP      | Satu kanal terlebih dahulu             | Pilih berdasar alur pelanggan |
| Autentikasi    | Session atau token yang aman           | Sesuaikan repository          |
| Storage        | S3-compatible object storage           | Pilih provider                |
| PDF            | Library dengan layout yang dapat diuji | Pilih library                 |
| Harga          | Langganan dengan batas penggunaan      | Validasi                      |
| Revisi laporan | Laporan final tidak diubah diam-diam   | Prinsip wajib                 |
| Multi-tenancy  | Isolasi data per perusahaan            | Prinsip wajib                 |

# 24. Rekomendasi Langkah Berikutnya

27. Audit repository BisaLapor dan dokumentasikan kondisi kode yang sudah ada.

28. Finalisasi schema database dan business rules, terutama relasi work order, laporan, pesan, media, dan persetujuan.

29. Bangun satu alur end-to-end: buat work order → kirim dokumentasi → hasilkan draf AI → review → approve → ekspor PDF.

30. Jalankan pengujian keamanan, evaluasi AI, dan pilot terbatas sebelum menambah fitur sekunder.

| Ukuran keberhasilan MVP bukan jumlah fitur, melainkan apakah satu pekerjaan lapangan dapat berubah menjadi laporan yang akurat, dapat ditinjau, dan siap digunakan. |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
