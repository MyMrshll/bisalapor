import React from 'react';
import { ToastProvider } from './context/ToastContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AppShell } from './layouts/AppShell';
import { OverviewPage } from './pages/overview/OverviewPage';
import { WorkOrdersPage } from './pages/work-orders/WorkOrdersPage';
import { WorkOrderDetailPage } from './pages/work-orders/WorkOrderDetailPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { ReportReviewPage } from './pages/reports/ReportReviewPage';
import { InboxPage } from './pages/inbox/InboxPage';
import { TechniciansPage } from './pages/technicians/TechniciansPage';
import { CustomersPage } from './pages/customers/CustomersPage';
import { SettingsPage } from './pages/settings/SettingsPage';

const AppContent: React.FC = () => {
  const { currentRoute } = useNavigation();

  return (
    <AppShell>
      {({ onOpenCreateModal }) => {
        switch (currentRoute) {
          case 'overview':
            return <OverviewPage onOpenCreateModal={onOpenCreateModal} />;
          case 'work-orders':
            return <WorkOrdersPage onOpenCreateModal={onOpenCreateModal} />;
          case 'work-order-detail':
            return <WorkOrderDetailPage />;
          case 'reports':
            return <ReportsPage />;
          case 'report-review':
            return <ReportReviewPage />;
          case 'inbox':
            return <InboxPage />;
          case 'technicians':
            return <TechniciansPage />;
          case 'customers':
            return <CustomersPage />;
          case 'settings':
            return <SettingsPage />;
          default:
            return <OverviewPage onOpenCreateModal={onOpenCreateModal} />;
        }
      }}
    </AppShell>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ToastProvider>
  );
};

export default App;
