import React, { createContext, useContext, useState, useCallback } from 'react';

interface ToastState {
  id: number;
  message: string;
}

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            zIndex: 9999,
            right: '24px',
            bottom: '24px',
            maxWidth: '380px',
            padding: '12px 20px',
            color: '#10204f',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(15, 30, 85, 0.12)',
            borderRadius: '13px',
            boxShadow: '0 14px 34px rgba(15, 30, 85, 0.16), 0 3px 10px rgba(15, 30, 85, 0.08)',
            fontSize: '13px',
            fontWeight: 600,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            animation: 'slideUp 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#2f6fda',
              flexShrink: 0,
            }}
          />
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
