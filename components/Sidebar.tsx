'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

function TodayIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 18 18" fill="none"
      style={{ color: active ? '#1A1A1A' : '#B5B5B0', transition: 'color 80ms ease' }}
    >
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 9L8 11L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BacklogIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 18 18" fill="none"
      style={{ color: active ? '#1A1A1A' : '#B5B5B0', transition: 'color 80ms ease' }}
    >
      <rect x="2.75" y="2.75" width="12.5" height="12.5" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5.5" y1="6.5" x2="12.5" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5.5" y1="9" x2="12.5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5.5" y1="11.5" x2="9.5" y2="11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlansIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 18 18" fill="none"
      style={{ color: active ? '#1A1A1A' : '#B5B5B0', transition: 'color 80ms ease' }}
    >
      <rect x="2.75" y="3.75" width="12.5" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="2" x2="6" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="2" x2="12" y2="5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="2.75" y1="7.5" x2="15.25" y2="7.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

interface SidebarProps {
  todayCount?: number;
  backlogCount?: number;
  plansCount?: number;
}

export function Sidebar({ todayCount: _todayCount, backlogCount: _backlogCount, plansCount: _plansCount }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/today',
      icon: (active: boolean) => <TodayIcon active={active} />,
    },
    {
      href: '/backlog',
      icon: (active: boolean) => <BacklogIcon active={active} />,
    },
    {
      href: '/plans',
      icon: (active: boolean) => <PlansIcon active={active} />,
    },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: '22px',
        padding: '8px 10px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        boxShadow:
          '0 0 0 1px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08), 0 24px 48px rgba(0,0,0,0.10)',
      }}
    >
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              backgroundColor: 'transparent',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {active && (
              <motion.div
                layoutId="nav-pill"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '14px',
                  backgroundColor: '#F0EFED',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 35,
                  mass: 0.8,
                }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>
              {item.icon(active)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
