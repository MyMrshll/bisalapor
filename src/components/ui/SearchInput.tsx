import React from 'react';
import { Icons } from './Icons';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  containerClassName?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Cari...',
  className = '',
  containerClassName = '',
  style,
  ...props
}) => {
  const hasValue = Boolean(value && String(value).length > 0);

  return (
    <div
      className={`search-input-wrapper ${containerClassName}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: '380px',
        ...style,
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: '14px',
          color: '#64748b',
          display: 'grid',
          placeItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <Icons.Search size={18} />
      </span>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`search-input-field ${className}`}
        style={{
          width: '100%',
          height: '42px',
          padding: hasValue ? '0 36px 0 42px' : '0 16px 0 42px',
          fontSize: '13px',
          color: '#10204f',
          background: 'rgba(255, 255, 255, 0.72)',
          border: '1px solid rgba(226, 232, 240, 0.95)',
          borderRadius: '11px',
          boxShadow: '0 4px 14px rgba(15, 30, 85, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          transition: 'all 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
          outline: 'none',
        }}
        {...props}
      />
      {hasValue && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Hapus pencarian"
          style={{
            position: 'absolute',
            right: '12px',
            color: '#64748b',
            display: 'grid',
            placeItems: 'center',
            padding: '4px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
        >
          <Icons.Close size={14} />
        </button>
      )}
    </div>
  );
};
