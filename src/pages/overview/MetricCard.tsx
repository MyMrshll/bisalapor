import React from 'react';
import { KpiMetric } from '../../mocks/metrics';

export const MetricCard: React.FC<{ metric: KpiMetric }> = ({ metric }) => {
  const isPositive = metric.badge.includes('+') || metric.badge.includes('✓');

  return (
    <article className="metric-card glass-panel">
      <div className="metric-head">
        <span className="metric-head-label">{metric.label}</span>
        <span className={`metric-pill ${isPositive ? 'positive' : 'neutral'}`}>{metric.badge}</span>
      </div>
      <div className="metric-value">{metric.value}</div>
      <div className="metric-detail">{metric.subtitle}</div>

      <style>{`
        .metric-card {
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 124px;
          transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.18s ease;
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px rgba(15, 30, 85, 0.09);
        }

        .metric-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .metric-head-label {
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .metric-pill {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          line-height: 1.2;
        }

        .metric-pill.positive {
          background: rgba(35, 134, 83, 0.1);
          color: #238653;
          border: 1px solid rgba(35, 134, 83, 0.2);
        }

        .metric-pill.neutral {
          background: rgba(47, 111, 218, 0.1);
          color: #2f6fda;
          border: 1px solid rgba(47, 111, 218, 0.2);
        }

        .metric-value {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #0f172a;
          margin-top: 6px;
          line-height: 1.1;
        }

        .metric-detail {
          margin-top: 8px;
          font-size: 12px;
          color: #64748b;
          font-weight: 500;
        }

        @media (max-width: 760px) {
          .metric-card {
            padding: 16px;
            min-height: 106px;
          }
          .metric-value {
            font-size: 26px;
          }
        }
      `}</style>
    </article>
  );
};
