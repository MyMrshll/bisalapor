import React from 'react';
import { Topbar } from '../../layouts/Topbar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/ui/Icons';
import { useNavigation } from '../../context/NavigationContext';
import { useToast } from '../../context/ToastContext';

export const ReportReviewPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const handleApprove = () => {
    showToast('Laporan disetujui dan versi final dicatat.');
    setTimeout(() => {
      navigateTo('reports');
    }, 500);
  };

  return (
    <div className="report-review-page">
      <Topbar
        title="Review Laporan"
        subtitle="RPT-240318-017 · Servis AC Split 2 PK"
        customActions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button variant="secondary" onClick={() => navigateTo('reports')}>
              ← Kembali
            </Button>
            <Badge label="Perlu review" type="warning" />
            <Button
              variant="secondary"
              onClick={() => showToast('Permintaan informasi dikirim ke teknisi.')}
            >
              Minta informasi
            </Button>
            <Button
              variant="primary"
              icon={<Icons.Check size={16} />}
              onClick={handleApprove}
            >
              Setujui laporan
            </Button>
          </div>
        }
      />

      {/* Split View */}
      <div className="split-view-container">
        {/* Left Column: Field Evidence */}
        <article className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700 }}>Sumber Dokumentasi</h2>
            <Badge label="Pengirim terverifikasi" type="success" />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontWeight: 700, color: '#0f172a' }}>Dina Kartika · Telegram</div>
            <div style={{ color: '#64748b', fontSize: '12px' }}>22 Jul 2024 · 11:40</div>
          </div>

          <div
            style={{
              padding: '16px',
              backgroundColor: 'rgba(241, 245, 251, 0.7)',
              borderRadius: '12px',
              border: '1px solid rgba(15, 30, 85, 0.1)',
              lineHeight: 1.5,
              marginBottom: '20px',
              fontSize: '13px',
              color: '#0f172a',
            }}
          >
            “AC lantai 5 sudah dibersihkan. Filter sangat kotor dan tekanan freon rendah. Foto menyusul.”
          </div>

          <div className="eyebrow-label" style={{ marginBottom: '10px' }}>
            MEDIA · 3 FOTO DOKUMENTASI
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {['Sebelum', 'Proses', 'Sesudah'].map((tag) => (
              <div
                key={tag}
                style={{
                  height: '84px',
                  borderRadius: '11px',
                  backgroundColor: '#0f1e55',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '8px',
                  fontSize: '11px',
                  fontWeight: 650,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <div className="eyebrow-label" style={{ marginBottom: '10px' }}>
            AUDIO REKAMAN SUARA
          </div>
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(241, 245, 251, 0.7)',
              borderRadius: '12px',
              border: '1px solid rgba(15, 30, 85, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700 }}>voice-note-240722.m4a</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>00:18</div>
            </div>
            <Button size="sm" variant="secondary" onClick={() => showToast('Audio diputar.')}>
              Putar
            </Button>
          </div>
        </article>

        {/* Right Column: AI Draft & Verification */}
        <article className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '16px', borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}>
            <div>
              <div className="eyebrow-label" style={{ color: '#2f6fda' }}>DRAFT LAPORAN · AI GENERATED</div>
              <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', color: '#0f172a' }}>Servis AC Split 2 PK</div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>RPT-240318-017 · Versi 1 · Diperbarui 2 menit lalu</div>
            </div>
            <Badge label="Versi 1" type="blue" />
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 750, color: '#2f6fda' }}>Ringkasan</h3>
              <p style={{ marginTop: '4px', fontSize: '13px', lineHeight: 1.5, color: '#334155' }}>
                Unit indoor telah dibersihkan dan filter diganti. Tekanan refrigerant terdeteksi rendah.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 750, color: '#2f6fda' }}>Temuan</h3>
                <Badge label="Perlu verifikasi" type="warning" />
              </div>
              <p style={{ marginTop: '4px', fontSize: '13px', lineHeight: 1.5, color: '#334155' }}>
                Filter dalam kondisi sangat kotor. Terdapat indikasi tekanan refrigerant rendah.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 750, color: '#2f6fda' }}>Tindakan</h3>
              <p style={{ marginTop: '4px', fontSize: '13px', lineHeight: 1.5, color: '#334155' }}>
                Membersihkan unit indoor dan mengganti filter. Pemeriksaan refrigerant direkomendasikan.
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 750, color: '#2f6fda' }}>Rekomendasi</h3>
                <Badge label="Perlu verifikasi" type="warning" />
              </div>
              <p style={{ marginTop: '4px', fontSize: '13px', lineHeight: 1.5, color: '#334155' }}>
                Lakukan pengisian refrigerant setelah teknisi memverifikasi kebocoran pada sistem.
              </p>
            </div>
          </div>

          {/* Missing Information Alert Box */}
          <div
            style={{
              marginTop: '20px',
              padding: '14px 16px',
              backgroundColor: 'rgba(199, 53, 72, 0.08)',
              border: '1px solid rgba(199, 53, 72, 0.25)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <span style={{ color: '#c73548', marginTop: '2px' }}>
              <Icons.AlertCircle size={20} />
            </span>
            <div>
              <strong style={{ display: 'block', color: '#c73548', fontSize: '13px' }}>
                2 informasi perlu dikonfirmasi
              </strong>
              <p style={{ marginTop: '2px', color: '#64748b', fontSize: '12px' }}>
                Nomor seri unit dan hasil pengukuran akhir tekanan freon belum dilaporkan oleh teknisi.
              </p>
            </div>
          </div>
        </article>
      </div>

      <style>{`
        .split-view-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 20px;
        }

        @media (max-width: 1180px) {
          .split-view-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
