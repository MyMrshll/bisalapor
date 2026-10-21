import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: '11px',
    fontWeight: 650,
    fontSize: size === 'sm' ? '12px' : '13px',
    height: size === 'sm' ? '36px' : '42px',
    padding: size === 'sm' ? '0 14px' : '0 18px',
    transition: 'all 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    boxSizing: 'border-box',
    textDecoration: 'none',
  };

  let variantStyle: React.CSSProperties = {};

  if (variant === 'primary') {
    variantStyle = {
      color: '#ffffff',
      background: 'linear-gradient(135deg, #1b3585 0%, #0f1e55 100%)',
      border: '1px solid #0f1e55',
      boxShadow: '0 8px 20px rgba(15, 30, 85, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
    };
  } else if (variant === 'danger') {
    variantStyle = {
      color: '#c73548',
      background: 'rgba(199, 53, 72, 0.08)',
      border: '1px solid rgba(199, 53, 72, 0.25)',
      boxShadow: '0 4px 12px rgba(199, 53, 72, 0.06)',
    };
  } else {
    // secondary (white outline / subtle glass)
    variantStyle = {
      color: '#10204f',
      background: 'rgba(255, 255, 255, 0.72)',
      border: '1px solid rgba(226, 232, 240, 0.95)',
      boxShadow: '0 4px 14px rgba(15, 30, 85, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    };
  }

  return (
    <button
      style={{ ...baseStyle, ...variantStyle, ...style }}
      className={`btn-component ${variant} ${size} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span style={{ display: 'grid', placeItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};
