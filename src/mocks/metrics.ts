export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  subtitle: string;
  badge: string;
  badgeType?: 'success' | 'warning' | 'alert' | 'neutral';
}

export interface WorkOrderStatusDistribution {
  status: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED';
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ReviewQueueItem {
  id: string;
  title: string;
  workOrderId: string;
  status: string;
  statusType: 'success' | 'warning' | 'alert' | 'neutral';
}

export interface AiProcessingHealth {
  statusText: string;
  isHealthy: boolean;
  successRate: number; // e.g. 96.4
  costEstimateToday: string; // e.g. "Rp 48.200"
}

export const mockKpiMetrics: KpiMetric[] = [
  {
    id: 'active_jobs',
    label: 'Pekerjaan aktif',
    value: '12',
    subtitle: '+3 dari minggu lalu',
    badge: '+24%',
    badgeType: 'neutral',
  },
  {
    id: 'pending_review',
    label: 'Menunggu review',
    value: '07',
    subtitle: '2 membutuhkan perhatian',
    badge: '+18%',
    badgeType: 'warning',
  },
  {
    id: 'needs_info',
    label: 'Butuh informasi',
    value: '03',
    subtitle: 'Teknisi perlu melengkapi',
    badge: '+12%',
    badgeType: 'alert',
  },
  {
    id: 'approved_week',
    label: 'Disetujui minggu ini',
    value: '36',
    subtitle: '92% tanpa revisi',
    badge: 'Aman ✓',
    badgeType: 'success',
  },
];

export const mockStatusDistribution: WorkOrderStatusDistribution[] = [
  { status: 'OPEN', label: 'OPEN', count: 8, percentage: 34, color: '#2F6FDA' },
  { status: 'ASSIGNED', label: 'ASSIGNED', count: 11, percentage: 49, color: '#2F6FDA' },
  { status: 'IN_PROGRESS', label: 'IN PROGRESS', count: 15, percentage: 68, color: '#A96B00' },
  { status: 'COMPLETED', label: 'COMPLETED', count: 20, percentage: 88, color: '#238653' },
];

export const mockReviewQueue: ReviewQueueItem[] = [
  {
    id: 'RPT-240318-017',
    title: 'Servis AC Split 2 PK',
    workOrderId: 'WO-240318-017',
    status: 'Perlu review',
    statusType: 'warning',
  },
  {
    id: 'RPT-240318-012',
    title: 'Maintenance genset 250 kVA',
    workOrderId: 'WO-240318-012',
    status: 'Butuh info',
    statusType: 'alert',
  },
  {
    id: 'RPT-240318-009',
    title: 'Perawatan chiller gedung A',
    workOrderId: 'WO-240318-009',
    status: 'Draf siap',
    statusType: 'neutral',
  },
];

export const mockAiHealth: AiProcessingHealth = {
  statusText: 'Berjalan normal',
  isHealthy: true,
  successRate: 96.4,
  costEstimateToday: 'Rp 48.200',
};
