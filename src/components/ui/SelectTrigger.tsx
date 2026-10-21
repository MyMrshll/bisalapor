import React from 'react';

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  icon,
  children,
  className = '',
  style,
  ...props
}) => {
  return (
    <button
      className={`select-like ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        height: '42px',
        padding: '0 16px',
        borderRadius: '11px',
        background: 'rgba(255, 255, 255, 0.72)',
        border: '1px solid rgba(226, 232, 240, 0.95)',
        boxShadow: '0 4px 14px rgba(15, 30, 85, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        color: '#10204f',
        fontSize: '13px',
        fontWeight: 600,
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        cursor: 'pointer',
        transition: 'all 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
        userSelect: 'none',
        ...style,
      }}
      {...props}
    >
      {icon && <span style={{ display: 'grid', placeItems: 'center', color: '#64748b' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
