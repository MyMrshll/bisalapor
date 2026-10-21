import React, { useState } from 'react';
import { Topbar } from '../../layouts/Topbar';
import { Badge } from '../../components/ui/Badge';
import { SearchInput } from '../../components/ui/SearchInput';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/ui/Icons';
import { useToast } from '../../context/ToastContext';

export const TechniciansPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const technicians = [
    { name: 'Dina Kartika', email: 'dina@arunika.id', status: 'Aktif', activeJobs: '2 pekerjaan', reports: '12 laporan' },
    { name: 'Budi Santoso', email: 'budi@nusadata.id', status: 'Aktif', activeJobs: '1 pekerjaan', reports: '9 laporan' },
    { name: 'Rafi Pratama', email: 'rafi@bisalapor.id', status: 'Aktif', activeJobs: '3 pekerjaan', reports: '18 laporan' },
    { name: 'Andi Wijaya', email: 'andi@meridian.id', status: 'Aktif', activeJobs: '0 pekerjaan', reports: '7 laporan' },
    { name: 'Sari Ningsih', email: 'sari@arunika.id', status: 'Nonaktif', activeJobs: '—', reports: '5 laporan' },
  ];

  const filtered = technicians.filter(
    (t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="technicians-page">
      <Topbar
        title="Technicians"
        subtitle="Kelola anggota tim lapangan dan penugasan mereka."
        customActions={
          <Button
            variant="primary"
            icon={<Icons.Plus size={18} />}
            onClick={() => showToast('Undangan teknisi dibuat.')}
          >
            Undang teknisi
          </Button>
        }
      />

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        <SearchInput
          placeholder="Cari nama atau email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
        />
        <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
          {filtered.length} teknisi aktif
        </span>
      </div>

      <article className="glass-panel" style={{ padding: 0, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
          <thead>
            <tr>
              <th style={{ padding: '18px 20px 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800, borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}>TEKNISI</th>
              <th style={{ padding: '18px 20px 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800, borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}>STATUS</th>
              <th style={{ padding: '18px 20px 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800, borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}>PEKERJAAN AKTIF</th>
              <th style={{ padding: '18px 20px 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800, borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}>LAPORAN</th>
              <th style={{ padding: '18px 20px 14px', borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.email}>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#0f1e55',
                        color: '#ffffff',
                        display: 'grid',
                        placeItems: 'center',
                        fontWeight: 700,
                        fontSize: '12px',
                      }}
                    >
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                      <div style={{ color: '#64748b', fontSize: '11px', marginTop: '2px' }}>{t.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)' }}>
                  <Badge label={t.status} />
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)', color: '#64748b' }}>{t.activeJobs}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)', color: '#64748b' }}>{t.reports}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)' }}>
                  <button
                    onClick={() => showToast(`Menu teknisi ${t.name} dibuka.`)}
                    style={{ padding: '6px', borderRadius: '6px', color: '#64748b' }}
                  >
                    •••
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </div>
  );
};
