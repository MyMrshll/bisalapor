# Panduan Eksekusi Tim Frontend (FE) BisaLapor

Dokumen ini adalah panduan standar bagi setiap developer (Dev 2 s/d Dev 5) maupun AI Coding Agent untuk mulai bekerja mengikuti arsitektur dan arahan dari **Lead Frontend (Dev 1)**.

---

## Alur Kerja Utama (Step-by-Step)

```text
[1. Git Clone & Setup] ➔ [2. Pahami AGENT_CONTEXT.md] ➔ [3. Eksekusi Prompt Modul] ➔ [4. Rujuk Prototype UI] ➔ [5. Quality Gate & PR]
```

---

### Langkah 1: Clone Repository & Buat Branch Fitur

1. **Clone repository proyek:**
   ```bash
   git clone <URL_REPOSITORY_BISALAPOR>
   cd BisaLapor
   ```
2. **Install dependency dan pastikan environment berjalan:**
   ```bash
   npm install
   # atau pnpm install / yarn
   ```
3. **Tarik branch terbaru dari Lead Dev (`main` / `dev`):**
   ```bash
   git checkout main
   git pull origin main
   ```
4. **Buat branch kerja terisolasi sesuai standar penamaan tim:**
   Format: `feat/<dev-name>-<nama-modul>`
   * Dev 2 (Work Orders): `git checkout -b feat/dev2-work-orders`
   * Dev 3 (Reports): `git checkout -b feat/dev3-reports-review`
   * Dev 4 (AI Inbox): `git checkout -b feat/dev4-ai-inbox`
   * Dev 5 (Settings/Directory): `git checkout -b feat/dev5-management-settings`

---

### Langkah 2: Baca & Pahami `AGENT_CONTEXT.md`

Sebelum menulis kode atau membuat komponen baru, setiap developer/agent **wajib membaca `AGENT_CONTEXT.md`** sebagai satu-satunya acuan kebenaran (*Single Source of Truth*):

* **Fokus 100% Frontend:** Tidak ada panggilan API backend live. Semua data menggunakan mock lokal di `src/mocks/`.
* **Design System Terkunci:**
  * Background: Putih bersih (`#FFFFFF`)
  * Brand Utama: Apple Navy (`#0F1E55`)
  * Card Surface: Translucent glass (`rgba(255, 255, 255, 0.65)`, `blur(16px)`, border `rgba(226, 232, 240, 0.85)`)
  * Tipografi: Font `Inter`
* **Skema Data Bersama:** Pastikan interface TypeScript (`WorkOrder`, `Report`, `InboxMessage`) memakai nama properti yang persis sesuai kontrak di `AGENT_CONTEXT.md` agar modul mudah digabungkan.

---

### Langkah 3: Ambil & Jalankan Prompt Spesifik Modul

Buka file `PROMPTS_DEV_FE.md`, lalu salin prompt sesuai pembagian tugas masing-masing:

| Developer | Bagian Prompt di `PROMPTS_DEV_FE.md` | Fokus Pengerjaan |
|---|---|---|
| **Dev 1** | Prompt Dev 1 (Lead FE) | Setup Design Tokens, UI Kit dasar (`Button`, `Badge`, `Input`), Layout AppShell, dan `01_Overview`. |
| **Dev 2** | Prompt Dev 2 (Work Orders) | `02_Work_Orders` (search debounce, filter status/tanggal, responsive table to cards) & `03_Work_Order_Detail`. |
| **Dev 3** | Prompt Dev 3 (Reports & Review) | `04_Reports` & `05_Report_Review` (Split View: bukti lapangan vs draf AI, missing-info alert, approval lock). |
| **Dev 4** | Prompt Dev 4 (AI Inbox & Media) | `06_AI_Inbox` (Master-detail list pesan, resolusi work order ambigu, inline audio player, foto lightbox). |
| **Dev 5** | Prompt Dev 5 (Directory & Settings) | `07_Technicians`, `08_Customers`, dan `09_Settings` (Team & Access RBAC, status bot Telegram verified). |

> **Tips untuk AI Agent (Claude / Cursor / Windsurf / Codex / Copilot):**  
> Tempelkan prompt spesifik developer Anda dan tambahkan instruksi awal:  
> *"Patuhi konteks desain dan skema mock data di `AGENT_CONTEXT.md`."*

---

### Langkah 4: Rujuk Prototype Hidup & File Figma

Jika ragu mengenai ukuran padding, letak tombol, atau transisi interaksi, rujuk file acuan yang sudah diverifikasi:

1. **Prototype Interaktif Langsung (Browser):**
   * Buka file `ui/bisalapor-ui.html` di browser.
   * Seluruh 9 halaman, transisi tombol, filter pencarian, dan adaptasi mobile dapat diuji langsung di sini.
2. **Aset Vektor & Spesifikasi Figma:**
   * File multi-halaman Figma: `figma-export/BisaLapor_All_Screens_Figma.pdf`
   * File per-layar: `figma-export/01_Overview.svg` s/d `09_Settings.svg`
   * Vector Logo resmi: `figma-export/BisaLapor_Logo_Vector.svg`

---

### Langkah 5: Quality Gate Sebelum Pull Request (Definition of Done)

Sebelum membuat Pull Request (PR) ke branch utama:

1. **Cek Responsivitas:**
   * Buka DevTools di browser, uji ukuran layar ponsel (`360px` – `390px`).
   * Pastikan tidak ada horizontal scrollbar liar pada body/canvas.
   * Pastikan tabel beralih ke Card View mandiri di layar mobile.
2. **Cek Interaktivitas:**
   * Tombol aksi harus memberikan feedback visual (Toast, modal terbuka, atau state data lokal ter-update).
   * Draf AI pada modul Dev 3 tidak boleh langsung berstatus *Approved* tanpa interaksi konfirmasi verifikasi.
3. **Cek Lint & Typecheck:**
   ```bash
   npm run lint
   npm run typecheck # atau tsc --noEmit
   ```
4. **Kirim Pull Request:**
   * Push branch Anda: `git push origin feat/<dev-name>-<nama-modul>`
   * Buat PR dengan deskripsi fitur, screenshot tampilan desktop & mobile, lalu minta review dari **Dev 1 (Lead FE)**.
