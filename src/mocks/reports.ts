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

export const mockReports: Report[] = [
  {
    id: 'RPT-240318-017',
    workOrderId: 'WO-240318-017',
    title: 'Servis AC Split 2 PK',
    technician: 'Dina Kartika',
    updatedAt: '2 menit lalu',
    status: 'PENDING_REVIEW',
    version: 1,
    sections: {
      summary: 'Unit indoor telah dibersihkan dan filter diganti. Tekanan refrigerant terdeteksi rendah.',
      findings: 'Filter dalam kondisi sangat kotor. Terdapat indikasi tekanan refrigerant rendah.',
      actionsTaken: 'Membersihkan unit indoor dan mengganti filter. Pemeriksaan refrigerant direkomendasikan.',
      recommendations: 'Lakukan pengisian refrigerant setelah teknisi memverifikasi kebocoran pada sistem.',
    },
    missingFields: ['Nomor seri unit', 'Hasil pengukuran akhir tekanan freon'],
    evidence: {
      senderChannel: 'Telegram',
      senderVerified: true,
      rawMessage: '“AC lantai 5 sudah dibersihkan. Filter sangat kotor dan tekanan freon rendah. Foto menyusul.”',
      photos: [
        { label: 'Sebelum', url: '/designs/landing.png' },
        { label: 'Proses', url: '/designs/dashboard.png' },
        { label: 'Sesudah', url: '/designs/report.png' },
      ],
      audioNote: {
        filename: 'voice-note-240722.m4a',
        duration: '00:18',
      },
    },
  },
  {
    id: 'RPT-240318-012',
    workOrderId: 'WO-240318-012',
    title: 'Maintenance genset 250 kVA',
    technician: 'Dina Kartika',
    updatedAt: '1 jam lalu',
    status: 'NEEDS_INFORMATION',
    version: 1,
    sections: {
      summary: 'Pemeriksaan rutin oli mesin dan tegangan aki starter 24V.',
      findings: 'Oli mesin mendekati masa penggantian berkala (250 jam operasional).',
      actionsTaken: 'Mengganti filter oli dan membersihkan radiator fin.',
      recommendations: 'Jadwalkan penggantian fuel filter primer dalam 2 minggu ke depan.',
    },
    missingFields: ['Foto dokumentasi level oli sesudah penggantian'],
    evidence: {
      senderChannel: 'WhatsApp',
      senderVerified: true,
      rawMessage: '“Genset 250 kVA sudah dicek, aki oke 24.8V. Filter oli diganti.”',
      photos: [
        { label: 'Sebelum', url: '/designs/landing.png' },
        { label: 'Sesudah', url: '/designs/report.png' },
      ],
    },
  },
  {
    id: 'RPT-240318-016',
    workOrderId: 'WO-240318-016',
    title: 'Instalasi jaringan kantor',
    technician: 'Budi Santoso',
    updatedAt: '3 jam lalu',
    status: 'PROCESSING',
    version: 1,
    sections: {
      summary: 'Penarikan 8 titik kabel Cat6 dari ruang server ke kubikel lantai 2.',
      findings: 'Kabel ducting eksisting penuh, memerlukan penambahan klem di bawah lantai.',
      actionsTaken: 'Terminasi patch panel Cat6 dan pengetesan flukemeter.',
      recommendations: 'Labeling permanen pada tiap faceplate ruangan.',
    },
    evidence: {
      senderChannel: 'Telegram',
      senderVerified: true,
      rawMessage: '“Penarikan kabel 8 node selesai, tinggal rapikan rack.”',
      photos: [
        { label: 'Sebelum', url: '/designs/landing.png' },
        { label: 'Proses', url: '/designs/dashboard.png' },
      ],
    },
  },
  {
    id: 'RPT-240318-004',
    workOrderId: 'WO-240318-004',
    title: 'Servis AC cassette lantai 3',
    technician: 'Budi Santoso',
    updatedAt: 'Kemarin',
    status: 'APPROVED',
    version: 2,
    sections: {
      summary: 'Perbaikan saluran pembuangan air kondensasi yang mampet oleh lumut.',
      findings: 'Pompa drain bekerja normal, pipa pembuangan tersumbat endapan lendir.',
      actionsTaken: 'Chemical flushing jalur pipa pembuangan dan pembersihan tray air.',
      recommendations: 'Pemberian tablet anti-lumut pada drain pan setiap 3 bulan.',
    },
    evidence: {
      senderChannel: 'WhatsApp',
      senderVerified: true,
      rawMessage: '“Drain pan AC cassette sudah bersih, test run 30 menit tidak bocor.”',
      photos: [
        { label: 'Sebelum', url: '/designs/landing.png' },
        { label: 'Proses', url: '/designs/dashboard.png' },
        { label: 'Sesudah', url: '/designs/report.png' },
      ],
    },
  },
  {
    id: 'RPT-240318-001',
    workOrderId: 'WO-240318-001',
    title: 'Pemeriksaan panel listrik',
    technician: 'Dina Kartika',
    updatedAt: 'Kemarin',
    status: 'APPROVED',
    version: 1,
    sections: {
      summary: 'Inspeksi preventif panel distribusi MDP ruang server.',
      findings: 'Koneksi terminal busbar kencang, suhu rata-rata 32.4°C.',
      actionsTaken: 'Pengukuran tegangan antar fasa (R-S-T 382V stabil).',
      recommendations: 'Pembersihan debu elektrostatik pada exhaust fan panel.',
    },
    evidence: {
      senderChannel: 'Telegram',
      senderVerified: true,
      rawMessage: '“Inspeksi MDP selesai, semua fasa normal tanpa hotspot.”',
      photos: [
        { label: 'Sebelum', url: '/designs/landing.png' },
        { label: 'Sesudah', url: '/designs/report.png' },
      ],
    },
  },
];
