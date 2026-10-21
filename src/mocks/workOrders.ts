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

export const mockWorkOrders: WorkOrder[] = [
  {
    id: 'WO-240318-017',
    title: 'Servis AC Split 2 PK',
    customer: 'PT Arunika',
    location: 'Gedung Arunika Lt. 5',
    technician: 'Dina Kartika',
    scheduledDate: '22 Jul 2024',
    scheduledTime: '09:00',
    jobStatus: 'IN_PROGRESS',
    reportStatus: 'NONE',
    notes: 'Unit indoor berdebu, filter sangat kotor. Tekanan refrigerant rendah.',
  },
  {
    id: 'WO-240318-016',
    title: 'Instalasi jaringan kantor',
    customer: 'CV Nusa Data',
    location: 'Kantor Pusat Lt. 2',
    technician: 'Budi Santoso',
    scheduledDate: '22 Jul 2024',
    scheduledTime: '10:30',
    jobStatus: 'IN_PROGRESS',
    reportStatus: 'DRAFT',
    notes: 'Pemasangan kabel UTP Cat6 dan switch 24 port rackmount.',
  },
  {
    id: 'WO-240318-012',
    title: 'Maintenance genset 250 kVA',
    customer: 'PT Sinar Jaya',
    location: 'Pabrik Cikarang Area Powerhouse',
    technician: 'Dina Kartika',
    scheduledDate: '21 Jul 2024',
    scheduledTime: '13:00',
    jobStatus: 'IN_PROGRESS',
    reportStatus: 'PENDING_REVIEW',
    notes: 'Penggantian oli filter, cek aki starter, uji beban 50kW.',
  },
  {
    id: 'WO-240318-009',
    title: 'Perawatan chiller gedung A',
    customer: 'PT Arunika',
    location: 'Gedung Arunika Rooftop',
    technician: 'Rafi Pratama',
    scheduledDate: '20 Jul 2024',
    scheduledTime: '08:30',
    jobStatus: 'ASSIGNED',
    reportStatus: 'NONE',
    notes: 'Pembersihan kondensor evaporator dan logging data delta suhu.',
  },
  {
    id: 'WO-240318-004',
    title: 'Servis AC cassette lantai 3',
    customer: 'PT Meridian',
    location: 'Gedung Meridian Sayap Barat',
    technician: 'Budi Santoso',
    scheduledDate: '19 Jul 2024',
    scheduledTime: '14:00',
    jobStatus: 'COMPLETED',
    reportStatus: 'APPROVED',
    notes: 'Flushing drain pipe yang mampet, unit kembali normal dingin.',
  },
  {
    id: 'WO-240318-001',
    title: 'Pemeriksaan panel listrik',
    customer: 'CV Nusa Data',
    location: 'Ruang Server Lt. 1',
    technician: 'Dina Kartika',
    scheduledDate: '18 Jul 2024',
    scheduledTime: '11:00',
    jobStatus: 'COMPLETED',
    reportStatus: 'APPROVED',
    notes: 'Thermal imaging breaker utama, tidak ada hotspot abnormal.',
  },
];
