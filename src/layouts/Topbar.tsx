import React from 'react';
import { Icons } from '../components/ui/Icons';
import { Button } from '../components/ui/Button';
import { SelectTrigger } from '../components/ui/SelectTrigger';
import { useToast } from '../context/ToastContext';

export interface TopbarProps {
  title: string;
  subtitle?: string;
  onOpenCreateModal?: () => void;
  customActions?: React.ReactNode;
}

export const Topbar: React.FC<TopbarProps> = ({
  title,
  subtitle,
  onOpenCreateModal,
  customActions,
}) => {
  const { showToast } = useToast();

  return (
    <header className="page-header-row">
      <div className="header-titles">
        <h1 className="header-h1">{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>

      <div className="header-actions">
        {customActions ? (
          customActions
        ) : (
          <>
            {/* Notification bell button */}
            <button
              className="header-icon-btn"
              aria-label="Notifikasi"
              onClick={() => showToast('Tidak ada notifikasi baru.')}
            >
              <Icons.Bell size={18} />
              <span className="notif-badge-dot" />
            </button>

            {/* Date filter dropdown trigger */}
            <SelectTrigger
              icon={<Icons.Calendar size={18} />}
              onClick={() => showToast('Pemilih rentang tanggal dibuka.')}
            >
              Hari Ini
            </SelectTrigger>

            {/* Primary CTA */}
            <Button
              variant="primary"
              icon={<Icons.Plus size={18} />}
              onClick={onOpenCreateModal || (() => showToast('Form work order baru siap dibuka.'))}
            >
              Buat work order
            </Button>
          </>
        )}
      </div>

      <style>{`
        .page-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .header-titles {
          min-width: 0;
          flex: 1 1 300px;
        }

        .header-h1 {
          font-size: 28px;
          font-weight: 750;
          letter-spacing: -0.04em;
          line-height: 1.25;
          color: #0f172a;
        }

        .header-subtitle {
          margin-top: 4px;
          color: #64748b;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.4;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .header-icon-btn {
          position: relative;
          width: 42px;
          height: 42px;
          color: #0f1e55;
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(15, 30, 85, 0.12);
          border-radius: 11px;
          box-shadow: 0 4px 14px rgba(15, 30, 85, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9);
          display: grid;
          place-items: center;
          cursor: pointer;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .header-icon-btn:hover {
          background: #ffffff;
          box-shadow: 0 6px 18px rgba(15, 30, 85, 0.08);
          transform: translateY(-1px);
        }

        .notif-badge-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #c73548;
          border: 1.5px solid #ffffff;
        }

        @media (max-width: 760px) {
          .page-header-row {
            margin-bottom: 20px;
            gap: 14px;
          }

          .header-h1 {
            font-size: 24px;
          }

          .header-actions {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </header>
  );
};
