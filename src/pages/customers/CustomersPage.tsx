import React, { useState } from 'react';
import { Topbar } from '../../layouts/Topbar';
import { SearchInput } from '../../components/ui/SearchInput';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/ui/Icons';
import { useToast } from '../../context/ToastContext';

export const CustomersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const customers = [
    { name: 'PT Arunika', location: 'Gedung Arunika Lt. 5, Jakarta Selatan', workOrders: '12 work orders', reports: '4 laporan aktif' },
    { name: 'CV Nusa Data', location: 'Kantor Pusat Lt. 2, Tangerang', workOrders: '8 work orders', reports: '2 laporan aktif' },
    { name: 'PT Sinar Jaya', location: 'Pabrik Cikarang Area Powerhouse, Bekasi', workOrders: '6 work orders', reports: '1 laporan aktif' },
    { name: 'PT Meridian', location: 'Gedung Meridian Sayap Barat, Jakarta Pusat', workOrders: '5 work orders', reports: '0 laporan aktif' },
  ];

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="customers-page">
      <Topbar
        title="Customers"
        subtitle="Direktori pelanggan dan riwayat pekerjaan teknisi."
        customActions={
          <Button
            variant="primary"
            icon={<Icons.Plus size={18} />}
            onClick={() => showToast('Form pelanggan baru siap dibuka.')}
          >
            Tambah pelanggan
          </Button>
        }
      />

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        <SearchInput
          placeholder="Cari nama pelanggan..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
        />
        <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: '12px', fontWeight: 600 }}>
          {filtered.length} pelanggan terdaftar
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {filtered.map((c) => (
          <article key={c.name} className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#0f1e55',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 800,
                  fontSize: '14px',
                }}
              >
                {c.name.replace(/^(PT|CV) /, '').slice(0, 2).toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{c.name}</h2>
                <p style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>{c.location}</p>
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: 'rgba(15, 30, 85, 0.08)', margin: '18px 0' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div className="eyebrow-label">WORK ORDERS</div>
                <div style={{ marginTop: '4px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{c.workOrders}</div>
              </div>
              <div>
                <div className="eyebrow-label">LAPORAN AKTIF</div>
                <div style={{ marginTop: '4px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{c.reports}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
