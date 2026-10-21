import React from 'react';
import { Topbar } from '../../layouts/Topbar';
import { MetricCard } from './MetricCard';
import { StatusDistributionChart } from './StatusDistributionChart';
import { ReviewQueueWidget } from './ReviewQueueWidget';
import { RecentActivitiesWidget } from './RecentActivitiesWidget';
import { AiHealthWidget } from './AiHealthWidget';
import { mockKpiMetrics } from '../../mocks/metrics';

export interface OverviewPageProps {
  onOpenCreateModal: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onOpenCreateModal }) => {
  return (
    <div className="overview-page-wrapper">
      {/* Unified Header */}
      <Topbar
        title="Overview"
        subtitle="Selamat datang, Rafi Pratama! Pantau ringkasan performa operasional secara realtime."
        onOpenCreateModal={onOpenCreateModal}
      />

      {/* 4 Metric KPI Cards Grid */}
      <section className="metrics-grid" aria-label="KPI Ringkasan">
        {mockKpiMetrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      {/* Main Dashboard 2-Column Grid */}
      <section className="dashboard-two-column-grid" aria-label="Distribusi dan Antrean">
        <StatusDistributionChart />
        <ReviewQueueWidget />
      </section>

      {/* Bottom Secondary 2-Column Grid */}
      <section className="dashboard-bottom-grid" aria-label="Aktivitas dan AI Processing">
        <RecentActivitiesWidget />
        <AiHealthWidget />
      </section>

      <style>{`
        .overview-page-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .dashboard-two-column-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
        }

        .dashboard-bottom-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
        }

        @media (max-width: 1180px) {
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .dashboard-two-column-grid,
          .dashboard-bottom-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
        }

        @media (max-width: 760px) {
          .overview-page-wrapper {
            gap: 18px;
          }
          .metrics-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};
