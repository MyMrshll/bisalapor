import React from 'react';
import { mockReviewQueue } from '../../mocks/metrics';
import { Badge } from '../../components/ui/Badge';
import { useNavigation } from '../../context/NavigationContext';

export const ReviewQueueWidget: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <article className="review-panel glass-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Antrean review</h2>
          <p className="panel-subtitle">Laporan yang perlu ditinjau hari ini</p>
        </div>
        <span className="badge-count">7 laporan</span>
      </div>

      <div className="review-list">
        {mockReviewQueue.map((item) => (
          <div
            key={item.id}
            className="review-row"
            onClick={() => navigateTo('report-review')}
            role="button"
            tabIndex={0}
            title="Klik untuk meninjau laporan ini"
          >
            <span className={`status-indicator-dot ${item.statusType}`} />
            <div className="review-info">
              <div className="review-title">{item.title}</div>
              <div className="review-meta">{item.workOrderId}</div>
            </div>
            <Badge label={item.status} type={item.statusType} />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="panel-action-link"
        onClick={() => navigateTo('reports')}
      >
        Lihat semua laporan →
      </button>

      <style>{`
        .review-panel {
          padding: 24px 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 310px;
        }

        .panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
        }

        .panel-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .panel-subtitle {
          margin-top: 3px;
          font-size: 12px;
          color: #64748b;
        }

        .badge-count {
          color: #2f6fda;
          font-size: 12px;
          font-weight: 750;
        }

        .review-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          flex: 1;
        }

        .review-row {
          display: grid;
          grid-template-columns: 10px minmax(0, 1fr) auto;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(15, 30, 85, 0.08);
          cursor: pointer;
          transition: background-color 0.15s ease;
        }
        .review-row:last-child {
          border-bottom: none;
        }
        .review-row:hover .review-title {
          color: #2f6fda;
        }

        .status-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .status-indicator-dot.warning {
          background-color: #a96b00;
        }
        .status-indicator-dot.alert {
          background-color: #c73548;
        }
        .status-indicator-dot.neutral {
          background-color: #2f6fda;
        }

        .review-info {
          min-width: 0;
        }

        .review-title {
          font-size: 13px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.3;
          transition: color 0.15s ease;
        }

        .review-meta {
          margin-top: 3px;
          color: #64748b;
          font-size: 11px;
        }

        .panel-action-link {
          margin-top: 14px;
          background: none;
          border: none;
          padding: 0;
          color: #2f6fda;
          font-size: 13px;
          font-weight: 700;
          text-align: left;
          cursor: pointer;
          transition: transform 0.15s ease, color 0.15s ease;
          display: inline-block;
        }
        .panel-action-link:hover {
          color: #0f1e55;
          transform: translateX(3px);
        }

        @media (max-width: 760px) {
          .review-panel {
            padding: 18px 16px;
            min-height: auto;
          }
        }
      `}</style>
    </article>
  );
};
