'use client';

import { DataProvider, useData } from '@/lib/DataContext';
import { Sidebar } from './Sidebar';
import { DailyWipe } from './DailyWipe';

function AppShellInner({ children }: { children: React.ReactNode }) {
  const { today, todos, backlog, plans } = useData();

  const todayCount = todos.filter((t) => !t.is_completed).length;
  const backlogCount = backlog.filter((t) => !t.is_completed).length;
  const plansCount = plans.length;

  return (
    <div style={{ backgroundColor: '#F2F1EE' }}>
      <main style={{ paddingBottom: '108px' }}>
        {children}
      </main>
      <Sidebar todayCount={todayCount} backlogCount={backlogCount} plansCount={plansCount} />
      <DailyWipe today={today} />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <AppShellInner>{children}</AppShellInner>
    </DataProvider>
  );
}
