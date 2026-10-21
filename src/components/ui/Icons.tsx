import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

export const Icons = {
  Dashboard: ({ size = 24, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.8" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.8" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.8" />
      <rect x="14" y="14" width="6.5" height="6.5" rx="1.8" />
    </svg>
  ),

  Clipboard: ({ size = 24, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4.5V3h6v1.5M8 10h8M8 14h6" />
    </svg>
  ),

  Report: ({ size = 24, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v5h4M9 12h6M9 16h6" />
    </svg>
  ),

  Inbox: ({ size = 24, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M4 5h16v12H4z" />
      <path d="m4 14 4-4 4 3 3-2 5 4M8 20h8" />
    </svg>
  ),

  Users: ({ size = 24, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M16 5.5a3 3 0 0 1 0 5.5M17 14c2.5.5 3.8 2.3 4 5" />
    </svg>
  ),

  Building: ({ size = 24, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M4 21V4h12v17M16 9h4v12M8 8h4M8 12h4M8 16h4M9 21v-3h2v3" />
    </svg>
  ),

  Settings: ({ size = 24, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="m19.4 15 .1.1a2 2 0 1 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4V19a2 2 0 1 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 3.6 11H3a2 2 0 1 1 0-4h.2A2 2 0 0 0 4.6 3.6l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A2 2 0 0 0 11 3.6V3a2 2 0 1 1 4 0v.2a2 2 0 0 0 3.4 1.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A2 2 0 0 0 20.4 11h.2a2 2 0 1 1 0 4h-.2a2 2 0 0 0-1 0Z" transform="scale(.82) translate(2.2 2.2)" />
    </svg>
  ),

  Bell: ({ size = 20, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </svg>
  ),

  Calendar: ({ size = 18, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  ),

  Plus: ({ size = 18, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),

  Search: ({ size = 18, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 5 5" />
    </svg>
  ),

  ArrowRight: ({ size = 16, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),

  Check: ({ size = 16, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  ),

  Close: ({ size = 16, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),

  AlertCircle: ({ size = 18, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="m12 3 9 17H3z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),

  ChevronDown: ({ size = 16, className, ...props }: IconProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
};
