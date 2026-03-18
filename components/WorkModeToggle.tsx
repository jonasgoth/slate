'use client';

import { useMode } from '@/lib/ModeContext';

function BriefcaseIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="5.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 5.5V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1.5" y1="10" x2="14.5" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 7L8 1.5 14.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 6v7.5a.5.5 0 0 0 .5.5h3.25V10.5a1.25 1.25 0 1 1 2.5 0V14H12.5a.5.5 0 0 0 .5-.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WorkModeToggle() {
  const { isWorkMode, toggleMode } = useMode();

  return (
    <button
      onClick={toggleMode}
      title={isWorkMode ? 'Switch to personal mode' : 'Switch to work mode'}
      style={{
        position: 'fixed',
        top: '20px',
        right: '60px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: isWorkMode ? 'var(--bg-hover-subtle)' : 'transparent',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease, color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-hover-subtle)';
        e.currentTarget.style.color = 'var(--icon-active)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isWorkMode ? 'var(--bg-hover-subtle)' : 'transparent';
        e.currentTarget.style.color = 'var(--text-muted)';
      }}
    >
      {isWorkMode ? <BriefcaseIcon /> : <HomeIcon />}
    </button>
  );
}
