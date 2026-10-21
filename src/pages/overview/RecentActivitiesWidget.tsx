import React from 'react';
import { mockRecentActivities } from '../../mocks/recentActivities';

export const RecentActivitiesWidget: React.FC = () => {
  const getDotColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#238653';
      case 'warning':
        return '#a96b00';
      case 'alert':
        return '#c73548';
      default:
        return '#2f6fda';
    }
  };

  return (
    <article className="activity-panel glass-panel">
      <div className="panel-header">
        <h2 className="panel-title">Aktivitas terbaru</h2>
        <p className="panel-subtitle">Perubahan terakhir di workspace</p>
      </div>

      <div className="activity-list">
        {mockRecentActivities.map((item) => (
          <div key={item.id} className="activity-row">
            <span
              className="activity-dot"
              style={{ backgroundColor: getDotColor(item.type) }}
            />
            <div className="activity-content">
              <div className="activity-title">{item.title}</div>
              <div className="activity-time">{item.timestamp}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .activity-panel {
          padding: 24px 26px;
          display: flex;
          flex-direction: column;
          min-height: 240px;
        }

        .panel-header {
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

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .activity-row {
          display: grid;
          grid-template-columns: 10px minmax(0, 1fr);
          align-items: flex-start;
          gap: 14px;
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .activity-content {
          min-width: 0;
        }

        .activity-title {
          font-size: 13px;
          font-weight: 600;
          color: #10204f;
          line-height: 1.35;
        }

        .activity-time {
          margin-top: 3px;
          color: #64748b;
          font-size: 11px;
        }

        @media (max-width: 760px) {
          .activity-panel {
            padding: 18px 16px;
            min-height: auto;
          }
        }
      `}</style>
    </article>
  );
};
