import React, { useEffect } from 'react';
import { Icons } from './Icons';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '540px',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'grid',
        placeItems: 'center',
        padding: '20px',
        backgroundColor: 'rgba(15, 30, 85, 0.38)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth,
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 24px 60px rgba(15, 30, 85, 0.22), 0 4px 16px rgba(15, 30, 85, 0.08)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          position: 'relative',
        }}
        role="dialog"
        aria-modal="true"
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 750, color: '#0f172a' }}>{title}</h2>
            {subtitle && <p className="subtitle">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup modal"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'grid',
              placeItems: 'center',
              color: '#64748b',
              backgroundColor: 'rgba(15, 30, 85, 0.05)',
              transition: 'all 0.15s ease',
            }}
          >
            <Icons.Close size={16} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
