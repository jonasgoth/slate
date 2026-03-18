'use client';

import { useEffect, useRef } from 'react';
import {
  fetchStaleTodos,
  deleteCompletedTodosByDate,
  carryForwardTodos,
} from '@/lib/queries/todos';

interface DailyWipeProps {
  today: string;
}

export function DailyWipe({ today }: DailyWipeProps) {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const doRollover = async () => {
      const stale = await fetchStaleTodos(today);
      if (stale.length === 0) return;

      const dates = [...new Set(stale.map((t) => t.date))];

      for (const date of dates) {
        await deleteCompletedTodosByDate(date);
        await carryForwardTodos(date, today);
      }
    };

    doRollover();
  }, [today]);

  return null;
}
