export interface RecentActivity {
  id: string;
  title: string;
  timestamp: string;
  type: 'success' | 'info' | 'warning' | 'alert';
}

export const mockRecentActivities: RecentActivity[] = [
  {
    id: 'act-1',
    title: 'Rafi menyetujui laporan WO-240318-004',
    timestamp: '2 menit lalu',
    type: 'success',
  },
  {
    id: 'act-2',
    title: 'Dina mengirim 3 foto dokumentasi',
    timestamp: '18 menit lalu',
    type: 'info',
  },
  {
    id: 'act-3',
    title: 'AI menandai 2 informasi belum lengkap',
    timestamp: '1 jam lalu',
    type: 'warning',
  },
  {
    id: 'act-4',
    title: 'Work order baru dibuat oleh Rafi',
    timestamp: '2 jam lalu',
    type: 'info',
  },
];
