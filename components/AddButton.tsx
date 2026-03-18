'use client';

import { ReactNode } from 'react';

interface AddButtonProps {
  onClick: () => void;
  label?: string;
  icon?: ReactNode;
  active?: boolean;
}

export function AddButton({ onClick, label = '+ Add', icon, active }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-sm hover-subtle"
      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-btn-hover)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = active ? 'var(--text-dark-muted)' : 'var(--text-muted)'; }}
      style={{
        color: active ? 'var(--text-dark-muted)' : 'var(--text-muted)',
        fontWeight: 500,
        padding: '6px 10px',
        borderRadius: '8px',
        backgroundColor: 'transparent',
        transition: 'color 0.15s ease',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: icon ? '5px' : undefined,
      }}
    >
      {icon}
      {label}
    </button>
  );
}
