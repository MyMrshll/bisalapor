import React from 'react';
import { mockStatusDistribution } from '../../mocks/metrics';

export const StatusDistributionChart: React.FC = () => {
  return (
    <article className="chart-panel glass-panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Status pekerjaan</h2>
          <p className="panel-subtitle">Distribusi work order minggu ini</p>
        </div>
        <div className="chart-head-right">
          <div className="chart-total">42</div>
          <div className="chart-total-label">TOTAL</div>
        </div>
      </div>

      <div className="bars-container">
        {mockStatusDistribution.map((item) => (
          <div key={item.status} className="bar-column">
            <div
              className="bar-fill"
              style={{
                height: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
              title={`${item.label}: ${item.count} items (${item.percentage}%)`}
            />
            <div className="bar-label">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="chart-legend">
        <span className="legend-item">
          <i className="legend-dot" style={{ backgroundColor: '#2f6fda' }} />
          Open
        </span>
        <span className="legend-item">
          <i className="legend-dot" style={{ backgroundColor: '#a96b00' }} />
          Dikerjakan
        </span>
        <span className="legend-item">
          <i className="legend-dot" style={{ backgroundColor: '#238653' }} />
          Selesai
        </span>
      </div>

      <style>{`
        .chart-panel {
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
          margin-bottom: 20px;
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

        .chart-head-right {
          text-align: right;
        }

        .chart-total {
          font-size: 26px;
          font-weight: 800;
          color: #0f172a;
          line-height: 1;
        }

        .chart-total-label {
          color: #64748b;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-top: 3px;
        }

        .bars-container {
          height: 180px;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          gap: 20px;
          padding: 16px 12px 0;
          border-bottom: 1px solid rgba(15, 30, 85, 0.1);
        }

        .bar-column {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          flex: 1;
        }

        .bar-fill {
          width: 44px;
          max-width: 80%;
          min-height: 18px;
          border-radius: 8px 8px 3px 3px;
          box-shadow: -3px -3px 7px rgba(116, 165, 255, 0.15), 4px 4px 7px rgba(8, 15, 50, 0.2);
          transition: height 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .bar-label {
          color: #64748b;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-align: center;
        }

        .chart-legend {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 18px;
          margin-top: 18px;
          color: #64748b;
          font-size: 12px;
          font-weight: 500;
        }

        .legend-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .legend-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        @media (max-width: 760px) {
          .chart-panel {
            padding: 18px 16px;
            min-height: auto;
          }
          .bars-container {
            gap: 10px;
            padding: 12px 0 0;
          }
          .bar-fill {
            width: 32px;
          }
        }
      `}</style>
    </article>
  );
};
