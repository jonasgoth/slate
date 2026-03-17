'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useTodos } from '@/hooks/useTodos';
import { usePlans } from '@/hooks/usePlans';
import { useData } from '@/lib/DataContext';
import { TaskCard } from '@/components/TaskCard';
import { PlanCard } from '@/components/PlanCard';
import { SectionLabel } from '@/components/SectionLabel';
import { AddButton } from '@/components/AddButton';
import { InlineAddTask } from '@/components/InlineAddTask';
import { SortableList } from '@/components/SortableList';
import type { Todo } from '@/types';

const collapseVariants = {
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export default function TodayPage() {
  const { today } = useData();
  const { todos, addTodo, updateTodo, deleteTodo, reorderTodos, moveToBacklog } = useTodos();
  const { plans } = usePlans();

  const [addingTask, setAddingTask] = useState(false);
  const [focusOpen, setFocusOpen] = useState(true);
  const [plansOpen, setPlansOpen] = useState(true);

  const dayName = format(new Date(), 'EEEE');
  const dateLabel = format(new Date(), 'MMMM d');

  const upcomingPlans = plans.slice(0, 3);

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1
          style={{
            color: 'var(--text-primary)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '26px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {dayName}
        </h1>
        <p
          style={{
            color: 'var(--text-submuted)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '16px',
            marginTop: '4px',
          }}
        >
          {dateLabel}
        </p>
      </div>

      {/* Focus section */}
      <div style={{ marginBottom: '32px' }}>
        <SectionLabel
          collapsible
          isOpen={focusOpen}
          onToggle={() => setFocusOpen((v) => !v)}
        >
          Focus
        </SectionLabel>
        <motion.div
          variants={collapseVariants}
          animate={focusOpen ? 'open' : 'closed'}
          initial={false}
          style={{ overflow: 'hidden' }}
        >
          <SortableList<Todo>
            items={todos}
            onReorder={reorderTodos}
            gap={8}
            renderItem={(todo) => (
              <AnimatePresence initial={false}>
                <motion.div
                  key={todo.id}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <TaskCard
                    id={todo.id}
                    title={todo.title}
                    isCompleted={todo.is_completed}
                    onToggle={(id, completed) => updateTodo(id, { is_completed: completed })}
                    onUpdate={(id, title) => updateTodo(id, { title })}
                    onDelete={deleteTodo}
                    showMoveToBacklog={!todo.is_completed}
                    onMoveToBacklog={moveToBacklog}
                    onEnter={() => setAddingTask(true)}
                  />
                </motion.div>
              </AnimatePresence>
            )}
          />
          {addingTask && (
            <div style={{ marginTop: '8px' }}>
              <InlineAddTask
                onAdd={async (title) => { await addTodo(title); }}
                onCancel={() => setAddingTask(false)}
              />
            </div>
          )}
          {!addingTask && (
            <div style={{ marginTop: '8px' }}>
              <AddButton onClick={() => setAddingTask(true)} />
            </div>
          )}
        </motion.div>
      </div>

      {/* Plans preview */}
      <div>
        <SectionLabel
          collapsible
          isOpen={plansOpen}
          onToggle={() => setPlansOpen((v) => !v)}
        >
          Plans
        </SectionLabel>
        <motion.div
          variants={collapseVariants}
          animate={plansOpen ? 'open' : 'closed'}
          initial={false}
          style={{ overflow: 'hidden' }}
        >
          {upcomingPlans.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
              {upcomingPlans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onUpdate={() => {}}
                  onDelete={() => {}}
                  readonly={true}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

    </div>
  );
}
