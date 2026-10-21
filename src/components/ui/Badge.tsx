import React from 'react';

export type BadgeType = 'success' | 'warning' | 'alert' | 'error' | 'neutral' | 'blue';

export interface BadgeProps {
  label: string;
  type?: BadgeType;
  showDot?: boolean;
  className?: string;
}

export const getBadgeTypeFromStatus = (status: string): BadgeType => {
  const s = status.toLowerCase();
  if (/disetujui|selesai|aktif|aman|terhubung|normal|approved|completed/i.test(s)) return 'success';
  if (/dikerjakan|perlu|review|processing|konfirmasi|in_progress|pending/i.test(s)) return 'warning';
  if (/butuh|info|gagal|error|alert|revision|failed/i.test(s)) return 'alert';
  return 'blue';
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  type,
  showDot = true,
  className = '',
}) => {
  const badgeType = type || getBadgeTypeFromStatus(label);

  const colors = {
    success: { text: '#238653', dot: '#238653', bg: 'rgba(35, 134, 83, 0.08)', border: 'rgba(35, 134, 83, 0.22)' },
    warning: { text: '#a96b00', dot: '#a96b00', bg: 'rgba(169, 107, 0, 0.08)', border: 'rgba(169, 107, 0, 0.22)' },
    alert: { text: '#c73548', dot: '#c73548', bg: 'rgba(199, 53, 72, 0.08)', border: 'rgba(199, 53, 72, 0.22)' },
    error: { text: '#c73548', dot: '#c73548', bg: 'rgba(199, 53, 72, 0.08)', border: 'rgba(199, 53, 72, 0.22)' },
    neutral: { text: '#64748b', dot: '#64748b', bg: 'rgba(100, 116, 139, 0.08)', border: 'rgba(100, 116, 139, 0.22)' },
    blue: { text: '#2f6fda', dot: '#2f6fda', bg: 'rgba(47, 111, 218, 0.08)', border: 'rgba(47, 111, 218, 0.22)' },
  };

  const scheme = colors[badgeType] || colors.blue;

  return (
    <span
      className={`badge-pill ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        height: '26px',
        padding: '0 10px',
        borderRadius: '999px',
        background: 'rgba(255, 255, 255, 0.7)',
        border: `1px solid ${scheme.border}`,
        boxShadow: '0 4px 12px rgba(15, 30, 85, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        color: scheme.text,
        fontSize: '11px',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        flexShrink: 0,
      }}
    >
      {showDot && (
        <span
          style={{
            display: 'inline-block',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: scheme.dot,
            flexShrink: 0,
          }}
        />
      )}
      {label}
    </span>
  );
};
