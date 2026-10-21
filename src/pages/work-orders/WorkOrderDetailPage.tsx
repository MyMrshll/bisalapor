import React from 'react';
import { Topbar } from '../../layouts/Topbar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/ui/Icons';
import { useToast } from '../../context/ToastContext';
import { useNavigation } from '../../context/NavigationContext';

export const WorkOrderDetailPage: React.FC = () => {
  const { showToast } = useToast();
  const { navigateTo } = useNavigation();

  return (
    <div className="work-order-detail-page">
      <Topbar
        title="Servis AC Split 2 PK"
        subtitle="WO-240318-017 · Detail pekerjaan operasional"
        customActions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              variant="secondary"
              onClick={() => navigateTo('work-orders')}
            >
              ← Kembali
            </Button>
            <Badge label="Dikerjakan" type="warning" />
            <Button
              variant="primary"
              icon={<Icons.Check size={16} />}
              onClick={() => showToast('Status pekerjaan diperbarui menjadi selesai.')}
            >
              Tandai selesai
            </Button>
          </div>
        }
      />

      {/* Summary Row */}
      <article className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '20px' }}>
          <div>
            <div className="eyebrow-label">PELANGGAN</div>
            <div style={{ marginTop: '6px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>PT Arunika</div>
          </div>
          <div>
            <div className="eyebrow-label">LOKASI</div>
            <div style={{ marginTop: '6px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Gedung Arunika, Lt. 5</div>
          </div>
          <div>
            <div className="eyebrow-label">TEKNISI</div>
            <div style={{ marginTop: '6px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Dina Kartika</div>
          </div>
          <div>
            <div className="eyebrow-label">JADWAL</div>
            <div style={{ marginTop: '6px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>22 Jul 2024 · 09:00</div>
          </div>
        </div>
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(15, 30, 85, 0.1)', color: '#64748b', fontSize: '13px' }}>
          Servis rutin AC split 2 PK — unit tidak dingin dan mengeluarkan suara berisik.
        </div>
      </article>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        <article className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Catatan Teknisi</h2>
          <p style={{ color: '#334155', lineHeight: 1.6 }}>
            Unit indoor berdebu, filter sangat kotor. Tekanan refrigerant rendah. Menunggu konfirmasi spare part.
          </p>
        </article>

        <article className="glass-panel" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px' }}>Tindakan Terkait</h2>
          <Button
            variant="secondary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => navigateTo('report-review')}
          >
            Buka Draf Laporan AI →
          </Button>
        </article>
      </div>
    </div>
  );
};
