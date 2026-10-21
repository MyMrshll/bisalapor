import React, { useState } from 'react';
import { Topbar } from '../../layouts/Topbar';
import { mockReports } from '../../mocks/reports';
import { Badge } from '../../components/ui/Badge';
import { SearchInput } from '../../components/ui/SearchInput';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/ui/Icons';
import { useNavigation } from '../../context/NavigationContext';
import { useToast } from '../../context/ToastContext';

export const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Semua laporan');
  const [searchQuery, setSearchQuery] = useState('');
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const tabs = ['Semua laporan', 'Perlu review', 'Butuh informasi', 'Disetujui'];

  const filteredReports = mockReports.filter((rpt) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      rpt.title.toLowerCase().includes(q) ||
      rpt.id.toLowerCase().includes(q) ||
      rpt.workOrderId.toLowerCase().includes(q) ||
      rpt.technician.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (activeTab === 'Perlu review') return rpt.status === 'PENDING_REVIEW';
    if (activeTab === 'Butuh informasi') return rpt.status === 'NEEDS_INFORMATION';
    if (activeTab === 'Disetujui') return rpt.status === 'APPROVED';
    return true;
  });

  return (
    <div className="reports-page">
      <Topbar
        title="Reports"
        subtitle="Tinjau, revisi, dan setujui laporan pekerjaan teknisi lapangan."
        customActions={
          <Button
            variant="primary"
            icon={<Icons.Plus size={18} />}
            onClick={() => showToast('Form laporan manual siap dibuka.')}
          >
            Buat laporan manual
          </Button>
        }
      />

      {/* Tabs */}
      <div className="reports-tabs-bar">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="reports-toolbar">
        <SearchInput
          placeholder="Cari laporan atau nomor work order..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
        />
        <Button
          variant="secondary"
          icon={<Icons.Clipboard size={16} />}
          onClick={() => showToast('Export laporan dibuat.')}
        >
          Export
        </Button>
      </div>

      {/* Table */}
      <article className="glass-panel" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '860px' }}>
          <thead>
            <tr>
              <th style={{ padding: '18px 20px 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800, borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}>LAPORAN</th>
              <th style={{ padding: '18px 20px 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800, borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}>WORK ORDER</th>
              <th style={{ padding: '18px 20px 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800, borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}>TEKNISI</th>
              <th style={{ padding: '18px 20px 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800, borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}>DIPERBARUI</th>
              <th style={{ padding: '18px 20px 14px', color: '#64748b', fontSize: '10px', textAlign: 'left', letterSpacing: '0.08em', fontWeight: 800, borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}>STATUS</th>
              <th style={{ padding: '18px 20px 14px', borderBottom: '1px solid rgba(15, 30, 85, 0.1)' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((rpt) => (
              <tr key={rpt.id}>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{rpt.title}</div>
                  <div style={{ color: '#64748b', fontSize: '11px', marginTop: '3px' }}>{rpt.id}</div>
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)', color: '#2f6fda', fontWeight: 600 }}>{rpt.workOrderId}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)', color: '#334155' }}>{rpt.technician}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)', color: '#64748b' }}>{rpt.updatedAt}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)' }}>
                  <Badge label={rpt.status} />
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid rgba(15, 30, 85, 0.08)' }}>
                  <button
                    onClick={() => navigateTo('report-review')}
                    style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center', color: '#64748b', borderRadius: '8px' }}
                    aria-label="Tinjau Laporan"
                  >
                    <Icons.ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>

      <style>{`
        .reports-tabs-bar {
          display: flex;
          gap: 24px;
          border-bottom: 1px solid rgba(15, 30, 85, 0.12);
          margin-bottom: 20px;
          overflow-x: auto;
        }

        .tab-btn {
          position: relative;
          padding: 0 0 12px;
          color: #64748b;
          background: none;
          border: none;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.15s ease;
        }

        .tab-btn:hover {
          color: #0f172a;
        }

        .tab-btn.active {
          color: #2f6fda;
          font-weight: 750;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 3px;
          background-color: #2f6fda;
          border-radius: 3px;
        }

        .reports-toolbar {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};
