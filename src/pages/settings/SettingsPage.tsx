import React, { useState } from 'react';
import { Topbar } from '../../layouts/Topbar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/ui/Icons';
import { useToast } from '../../context/ToastContext';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'team' | 'integrations'>('team');
  const { showToast } = useToast();

  const members = [
    { name: 'Rafi Pratama', email: 'rafi@bisalapor.id', role: 'Owner', status: 'Aktif' },
    { name: 'Dina Kartika', email: 'dina@arunika.id', role: 'Technician', status: 'Aktif' },
    { name: 'Budi Santoso', email: 'budi@arunika.id', role: 'Technician', status: 'Aktif' },
    { name: 'Sari Ningsih', email: 'sari@arunika.id', role: 'Supervisor', status: 'Nonaktif' },
  ];

  return (
    <div className="settings-page">
      <Topbar
        title="Team & Access"
        subtitle="Kelola anggota tim, role hierarki, dan akses workspace operasional."
        customActions={
          <Button
            variant="primary"
            icon={<Icons.Plus size={18} />}
            onClick={() => showToast('Form undang anggota dibuka.')}
          >
            Undang anggota
          </Button>
        }
      />

      <div className="settings-layout-grid">
        {/* Settings Navigation Sidebar */}
        <aside className="glass-panel" style={{ padding: '18px 14px', height: 'fit-content' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => {
                setActiveTab('profile');
                showToast('Company Profile dipilih.');
              }}
              className={`settings-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            >
              <Icons.Building size={16} /> Company Profile
            </button>
            <button
              onClick={() => {
                setActiveTab('team');
                showToast('Team & Access dipilih.');
              }}
              className={`settings-nav-btn ${activeTab === 'team' ? 'active' : ''}`}
            >
              <Icons.Users size={16} /> Team & Access
            </button>
            <button
              onClick={() => {
                setActiveTab('integrations');
                showToast('Integrasi dipilih.');
              }}
              className={`settings-nav-btn ${activeTab === 'integrations' ? 'active' : ''}`}
            >
              <Icons.Clipboard size={16} /> Integrations
            </button>
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(15, 30, 85, 0.08)', margin: '16px 0' }} />

          <div style={{ padding: '0 8px 12px' }}>
            <div className="eyebrow-label">WORKSPACE ID</div>
            <div style={{ marginTop: '4px', fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>arunika-prod</div>
          </div>
          <div style={{ padding: '0 8px' }}>
            <div className="eyebrow-label">PLAN</div>
            <div style={{ marginTop: '6px' }}>
              <Badge label="Pilot" type="success" />
            </div>
          </div>
        </aside>

        {/* Settings Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Members Table */}
          <article className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>Anggota Workspace</h2>
            <p className="subtitle" style={{ marginBottom: '20px' }}>
              Peran menentukan otorisasi pembuatan, verifikasi AI, dan persetujuan laporan.
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '550px' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '0 0 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800 }}>NAMA</th>
                    <th style={{ padding: '0 0 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800 }}>ROLE</th>
                    <th style={{ padding: '0 0 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800 }}>STATUS</th>
                    <th style={{ padding: '0 0 14px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.email} style={{ borderBottom: '1px solid rgba(15, 30, 85, 0.08)' }}>
                      <td style={{ padding: '14px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: '#0f1e55',
                              color: '#ffffff',
                              display: 'grid',
                              placeItems: 'center',
                              fontWeight: 700,
                              fontSize: '11px',
                            }}
                          >
                            {m.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{m.name}</div>
                            <div style={{ color: '#64748b', fontSize: '11px' }}>{m.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 0', color: '#334155', fontSize: '13px' }}>{m.role}</td>
                      <td style={{ padding: '14px 0' }}>
                        <Badge label={m.status} />
                      </td>
                      <td style={{ padding: '14px 0', textAlign: 'right' }}>
                        <button
                          onClick={() => showToast(`Menu anggota ${m.name} dibuka.`)}
                          style={{ padding: '6px', borderRadius: '6px', color: '#64748b' }}
                        >
                          •••
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* Active Integrations */}
          <article className="glass-panel" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>Integrasi Aktif</h2>
            <p className="subtitle" style={{ marginBottom: '18px' }}>
              Kanal yang dapat menerima dokumentasi teknisi secara otomatis.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px',
                borderRadius: '13px',
                backgroundColor: 'rgba(247, 250, 255, 0.8)',
                border: '1px solid rgba(15, 30, 85, 0.1)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '11px',
                  backgroundColor: '#2f6fda',
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 700,
                }}
              >
                TG
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Telegram Bot</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>@arunika_lapor_bot · Webhook verified</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Badge label="Aktif" type="success" />
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <Button variant="secondary" onClick={() => showToast('Pengaturan integrasi dibuka.')}>
                Kelola integrasi
              </Button>
            </div>
            <p style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
              AI hanya memproses pesan yang masuk melalui kanal yang terverifikasi.
            </p>
          </article>
        </div>
      </div>

      <style>{`
        .settings-layout-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 20px;
        }

        .settings-nav-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          color: #64748b;
          border: 1px solid transparent;
          border-radius: 11px;
          background: transparent;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .settings-nav-btn:hover {
          color: #0f172a;
          background-color: rgba(255, 255, 255, 0.6);
        }

        .settings-nav-btn.active {
          color: #0f172a;
          background-color: rgba(247, 250, 255, 0.9);
          border-color: rgba(15, 30, 85, 0.12);
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .settings-layout-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
