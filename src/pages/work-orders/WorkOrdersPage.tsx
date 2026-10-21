import React, { useState } from 'react';
import { Topbar } from '../../layouts/Topbar';
import { mockWorkOrders } from '../../mocks/workOrders';
import { Badge } from '../../components/ui/Badge';
import { SearchInput } from '../../components/ui/SearchInput';
import { SelectTrigger } from '../../components/ui/SelectTrigger';
import { Button } from '../../components/ui/Button';
import { Icons } from '../../components/ui/Icons';
import { useNavigation } from '../../context/NavigationContext';
import { useToast } from '../../context/ToastContext';

export const WorkOrdersPage: React.FC<{ onOpenCreateModal: () => void }> = ({ onOpenCreateModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const filteredOrders = mockWorkOrders.filter((wo) => {
    const q = searchQuery.toLowerCase();
    return (
      wo.title.toLowerCase().includes(q) ||
      wo.id.toLowerCase().includes(q) ||
      wo.customer.toLowerCase().includes(q) ||
      wo.technician.toLowerCase().includes(q)
    );
  });

  return (
    <div className="work-orders-page">
      <Topbar
        title="Work Orders"
        subtitle="Kelola seluruh pekerjaan dan penugasan teknisi."
        onOpenCreateModal={onOpenCreateModal}
      />

      {/* Toolbar */}
      <div className="toolbar-row">
        <SearchInput
          placeholder="Cari nomor, pelanggan, atau lokasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClear={() => setSearchQuery('')}
        />
        <SelectTrigger
          icon={<Icons.Calendar size={18} />}
          onClick={() => showToast('Filter status dibuka.')}
        >
          Semua status
        </SelectTrigger>
        <SelectTrigger
          icon={<Icons.Calendar size={18} />}
          onClick={() => showToast('Pemilih tanggal dibuka.')}
        >
          22–28 Jul 2024
        </SelectTrigger>
        <Button
          variant="secondary"
          icon={<Icons.Clipboard size={16} />}
          onClick={() => showToast('Export work orders dibuat.')}
        >
          Export
        </Button>
      </div>

      {/* Table Container */}
      <article className="table-card glass-panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>PEKERJAAN</th>
              <th>PELANGGAN</th>
              <th>TEKNISI</th>
              <th>TANGGAL</th>
              <th>STATUS</th>
              <th>LAPORAN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((wo) => (
              <tr key={wo.id}>
                <td>
                  <div className="cell-title">{wo.title}</div>
                  <div className="cell-meta">{wo.id}</div>
                </td>
                <td className="cell-muted">{wo.customer}</td>
                <td className="cell-muted">{wo.technician}</td>
                <td className="cell-muted">{wo.scheduledDate}</td>
                <td>
                  <Badge label={wo.jobStatus} />
                </td>
                <td>
                  <Badge label={wo.reportStatus} />
                </td>
                <td>
                  <button
                    className="row-action-btn"
                    onClick={() => navigateTo('work-order-detail')}
                    aria-label="Lihat rincian work order"
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
        .toolbar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .table-card {
          padding: 0;
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 860px;
        }

        .data-table th {
          padding: 18px 20px 14px;
          color: #64748b;
          font-size: 10px;
          text-align: left;
          letter-spacing: 0.08em;
          font-weight: 800;
          border-bottom: 1px solid rgba(15, 30, 85, 0.1);
        }

        .data-table td {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(15, 30, 85, 0.08);
          vertical-align: middle;
        }

        .data-table tbody tr:hover {
          background-color: rgba(116, 165, 255, 0.06);
        }

        .cell-title {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
        }

        .cell-meta {
          color: #64748b;
          font-size: 11px;
          margin-top: 3px;
        }

        .cell-muted {
          color: #334155;
          font-size: 13px;
        }

        .row-action-btn {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          color: #64748b;
          border-radius: 8px;
          transition: all 0.15s ease;
        }

        .row-action-btn:hover {
          color: #0f172a;
          background-color: rgba(15, 30, 85, 0.06);
        }

        @media (max-width: 760px) {
          .data-table {
            display: block;
            min-width: 0;
          }
          .data-table thead {
            display: none;
          }
          .data-table tbody {
            display: grid;
            gap: 12px;
            padding: 12px;
          }
          .data-table tr {
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 14px;
            padding: 14px;
            background: rgba(255, 255, 255, 0.7);
            border: 1px solid rgba(15, 30, 85, 0.1);
            border-radius: 14px;
          }
          .data-table td {
            display: flex;
            padding: 0 !important;
            border: none !important;
            flex-direction: column;
            gap: 2px;
          }
          .data-table td:first-child {
            grid-column: 1 / -1;
            padding-right: 36px !important;
          }
          .data-table td:last-child {
            position: absolute;
            top: 12px;
            right: 12px;
          }
        }
      `}</style>
    </div>
  );
};
