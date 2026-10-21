import React from 'react';
import { useNavigation, RouteKey } from '../context/NavigationContext';
import { useToast } from '../context/ToastContext';
import { Icons } from '../components/ui/Icons';

interface NavItem {
  route: RouteKey;
  label: string;
  icon: React.FC<{ size?: number; className?: string }>;
}

const navItems: NavItem[] = [
  { route: 'overview', label: 'Overview', icon: Icons.Dashboard },
  { route: 'work-orders', label: 'Work Orders', icon: Icons.Clipboard },
  { route: 'reports', label: 'Reports', icon: Icons.Report },
  { route: 'inbox', label: 'AI Inbox', icon: Icons.Inbox },
  { route: 'technicians', label: 'Technicians', icon: Icons.Users },
  { route: 'customers', label: 'Customers', icon: Icons.Building },
  { route: 'settings', label: 'Settings', icon: Icons.Settings },
];

export const Sidebar: React.FC = () => {
  const { activeNavTile, navigateTo } = useNavigation();
  const { showToast } = useToast();

  return (
    <aside className="app-sidebar" aria-label="Navigasi Utama">
      {/* Brand Monogram */}
      <div className="brand-wrapper">
        <button
          className="brand-logo-btn"
          onClick={() => navigateTo('overview')}
          aria-label="BisaLapor Dashboard"
        >
          <img
            src="/logo.svg"
            alt="BisaLapor Logo"
            className="brand-logo-img"
            onError={(e) => {
              // Fallback to stylized 'B' box if image fails
              const target = e.currentTarget;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = 'grid';
              }
            }}
          />
          <span className="brand-fallback-monogram" style={{ display: 'none' }}>
            B
          </span>
        </button>
      </div>

      {/* Nav Items */}
      <nav className="nav-items-container" id="main-nav">
        {navItems.map((item) => {
          const isActive = activeNavTile === item.route;
          const IconComponent = item.icon;

          return (
            <button
              key={item.route}
              onClick={() => navigateTo(item.route)}
              data-tooltip={item.label}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={`nav-item-btn ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon-wrapper">
                <IconComponent size={28} />
              </span>
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="sidebar-spacer" />

      {/* User Profile Avatar at bottom */}
      <div className="sidebar-bottom-section">
        <button
          className="sidebar-avatar-btn"
          data-tooltip="Rafi Pratama (Owner)"
          aria-label="Profil Rafi Pratama"
          onClick={() => showToast('Profil Rafi Pratama · Owner Workspace')}
        >
          <span className="avatar-circle">RP</span>
          <span className="avatar-status-dot" />
        </button>
      </div>

      <style>{`
        .app-sidebar {
          width: 136px;
          flex: 0 0 136px;
          min-height: 100vh;
          height: 100vh;
          position: sticky;
          top: 0;
          padding: 24px 12px 20px;
          background: #ffffff;
          border-right: 1px solid rgba(226, 232, 240, 0.85);
          box-shadow: 2px 0 16px rgba(15, 30, 85, 0.03);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 20;
          overflow-y: auto;
          scrollbar-width: none;
        }
        .app-sidebar::-webkit-scrollbar {
          display: none;
        }

        .brand-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 12px;
          width: 100%;
        }

        .brand-logo-btn {
          width: 124px;
          height: 124px;
          border-radius: 28px;
          display: grid;
          place-items: center;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .brand-logo-btn:hover {
          transform: scale(1.04);
        }

        .brand-logo-img {
          width: 108px;
          height: 108px;
          border-radius: 22px;
          object-fit: contain;
        }

        .brand-fallback-monogram {
          display: grid;
          place-items: center;
          width: 108px;
          height: 108px;
          border-radius: 24px;
          background: linear-gradient(135deg, #1b3585, #0f1e55);
          color: #ffffff;
          font-weight: 800;
          font-size: 44px;
          box-shadow: 0 10px 24px rgba(15, 30, 85, 0.24);
        }

        .nav-items-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
          position: relative;
          z-index: 21;
        }

        .nav-item-btn {
          position: relative;
          width: 64px;
          height: 64px;
          display: grid;
          place-items: center;
          padding: 0;
          color: #64748b;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item-btn:hover {
          color: #0f1e55;
          background: #eef1f6;
          border-color: rgba(15, 30, 85, 0.1);
          box-shadow: 0 6px 16px rgba(15, 30, 85, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
        }

        .nav-item-btn.active {
          color: #ffffff;
          background: #0f1e55;
          border-color: #0f1e55;
          box-shadow: 0 8px 20px rgba(15, 30, 85, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.18);
        }

        .nav-item-btn.active:hover {
          background: linear-gradient(135deg, #182d73 0%, #0f1e55 100%);
          color: #ffffff;
          transform: translateY(-2px);
        }

        .nav-icon-wrapper {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
        }

        .sidebar-spacer {
          flex: 1;
          min-height: 12px;
        }

        .sidebar-bottom-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding-bottom: 8px;
        }

        .sidebar-avatar-btn {
          position: relative;
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          background: transparent;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          padding: 0;
          transition: transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .sidebar-avatar-btn:hover {
          transform: translateY(-2px);
        }

        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1b3585, #0f1e55);
          color: #ffffff;
          font-weight: 750;
          font-size: 13px;
          display: grid;
          place-items: center;
          box-shadow: 0 4px 12px rgba(15, 30, 85, 0.18);
        }

        .avatar-status-dot {
          position: absolute;
          bottom: 4px;
          right: 4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #238653;
          border: 2px solid #ffffff;
        }

        /* Responsive Mobile Breakpoint (< 760px) */
        @media (max-width: 760px) {
          .app-sidebar {
            width: 100%;
            min-height: auto;
            height: auto;
            position: sticky;
            top: 0;
            padding: 8px 12px;
            border-right: none;
            border-bottom: 1px solid rgba(226, 232, 240, 0.85);
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .brand-wrapper {
            width: auto;
            padding-bottom: 0;
          }

          .brand-logo-btn {
            width: 52px;
            height: 52px;
            border-radius: 14px;
          }

          .brand-logo-img, .brand-fallback-monogram {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            font-size: 20px;
          }

          .nav-items-container {
            flex-direction: row;
            gap: 6px;
            width: auto;
            overflow-x: auto;
            scrollbar-width: none;
            padding: 0 4px;
          }
          .nav-items-container::-webkit-scrollbar {
            display: none;
          }

          .nav-item-btn {
            width: 44px;
            height: 44px;
            border-radius: 12px;
          }

          .nav-icon-wrapper svg {
            width: 22px;
            height: 22px;
          }

          .sidebar-spacer {
            display: none;
          }

          .sidebar-bottom-section {
            width: auto;
            padding-bottom: 0;
          }

          .sidebar-avatar-btn {
            width: 38px;
            height: 38px;
          }

          .avatar-circle {
            width: 34px;
            height: 34px;
            font-size: 11px;
          }
        }
      `}</style>
    </aside>
  );
};
