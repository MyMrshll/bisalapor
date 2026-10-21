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

export const mockInboxMessages: InboxMessage[] = [
  {
    id: 'INB-001',
    senderName: 'Dina Kartika',
    channel: 'Telegram',
    timestamp: '2 mnt lalu',
    rawSnippet: 'AC lantai 5 sudah dibersihkan...',
    fullMessage: '“AC lantai 5 sudah dibersihkan. Filter sangat kotor dan tekanan freon rendah. Foto menyusul.”',
    status: 'NEEDS_CONFIRMATION',
    matchedWorkOrderId: 'WO-240318-017',
    isAmbiguous: true,
    suggestedWorkOrders: [
      { id: 'WO-240318-017', title: 'Servis AC Split 2 PK', client: 'PT Arunika' },
      { id: 'WO-240318-009', title: 'Perawatan chiller gedung A', client: 'PT Arunika' },
    ],
  },
  {
    id: 'INB-002',
    senderName: 'Budi Santoso',
    channel: 'WhatsApp',
    timestamp: '18 mnt lalu',
    rawSnippet: 'Foto hasil instalasi jaringan...',
    fullMessage: '“Foto hasil instalasi jaringan 8 node di lantai 2 sudah saya kirim. Patching sudah oke.”',
    status: 'DRAFT_CREATED',
    matchedWorkOrderId: 'WO-240318-016',
    isAmbiguous: false,
  },
  {
    id: 'INB-003',
    senderName: 'Dina Kartika',
    channel: 'Telegram',
    timestamp: '1 jam lalu',
    rawSnippet: 'Voice note · 00:18',
    fullMessage: 'Voice note laporan pemeliharaan genset pabrik Cikarang.',
    status: 'PROCESSING',
    matchedWorkOrderId: 'WO-240318-012',
    isAmbiguous: false,
  },
  {
    id: 'INB-004',
    senderName: 'Rafi Pratama',
    channel: 'WhatsApp',
    timestamp: '2 jam lalu',
    rawSnippet: 'Work order baru untuk PT Arunika',
    fullMessage: '“Jadwalkan teknisi untuk cek unit chiller rooftop gedung A besok pagi.”',
    status: 'LINKED',
    matchedWorkOrderId: 'WO-240318-009',
    isAmbiguous: false,
  },
];
