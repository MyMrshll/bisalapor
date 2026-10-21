import React from 'react';
import { mockAiHealth } from '../../mocks/metrics';

export const AiHealthWidget: React.FC = () => {
  return (
    <article className="ai-health-panel glass-panel">
      <div className="panel-header">
        <h2 className="panel-title">AI processing</h2>
        <p className="panel-subtitle">Status layanan hari ini</p>
      </div>

      <div className="ai-status-row">
        <span className="status-dot-green" />
        <span className="status-label-green">{mockAiHealth.statusText}</span>
      </div>

      <div className="split-stats">
        <span className="stat-label">Keberhasilan proses</span>
        <span className="stat-value">{mockAiHealth.successRate}%</span>
      </div>

      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${mockAiHealth.successRate}%` }}
        />
      </div>

      <div className="split-stats" style={{ marginTop: '8px' }}>
        <span className="stat-label">Estimasi biaya hari ini</span>
        <span className="stat-cost">{mockAiHealth.costEstimateToday}</span>
      </div>

      <style>{`
        .ai-health-panel {
          padding: 24px 26px;
          display: flex;
          flex-direction: column;
          min-height: 240px;
          justify-content: space-between;
        }

        .panel-header {
          margin-bottom: 12px;
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

        .ai-status-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
        }

        .status-dot-green {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #238653;
          box-shadow: 0 0 8px rgba(35, 134, 83, 0.4);
        }

        .status-label-green {
          color: #238653;
          font-size: 13px;
          font-weight: 700;
        }

        .split-stats {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 16px;
        }

        .stat-label {
          color: #64748b;
          font-size: 12px;
          font-weight: 500;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
        }

        .stat-cost {
          font-size: 15px;
          font-weight: 750;
          color: #0f1e55;
        }

        .progress-bar-track {
          height: 8px;
          margin: 10px 0 16px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(241, 245, 251, 0.85);
          border: 1px solid rgba(15, 30, 85, 0.08);
        }

        .progress-bar-fill {
          height: 100%;
          background: #238653;
          border-radius: inherit;
          box-shadow: 0 0 10px rgba(35, 134, 83, 0.3);
          transition: width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @media (max-width: 760px) {
          .ai-health-panel {
            padding: 18px 16px;
            min-height: auto;
          }
        }
      `}</style>
    </article>
  );
};
