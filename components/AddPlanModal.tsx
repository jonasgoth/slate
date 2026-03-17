'use client';

import { useState, useEffect, useRef } from 'react';

interface AddPlanModalProps {
  onClose: () => void;
  onAdd: (title: string, date: string) => void;
}

export function AddPlanModal({ onClose, onAdd }: AddPlanModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const submit = () => {
    if (!title.trim() || !date) return;
    onAdd(title.trim(), date);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0,0,0,0.18)', backdropFilter: 'blur(3px)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full"
        style={{
          maxWidth: '380px',
          borderRadius: '16px',
          padding: '28px',
          background: 'var(--bg-card)',
        }}
      >
        <h2
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '18px',
            fontWeight: 400,
            color: 'var(--text-primary)',
            marginBottom: '20px',
          }}
        >
          New plan
        </h2>

        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && date) submit();
          }}
          placeholder="What's coming up?"
          className="w-full outline-none"
          style={{
            border: '1px solid var(--border-input)',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '15px',
            color: 'var(--text-primary)',
            background: 'var(--bg-card)',
            marginBottom: '12px',
          }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
          className="w-full outline-none"
          style={{
            border: '1px solid var(--border-input)',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '15px',
            color: date ? 'var(--text-primary)' : 'var(--text-muted)',
            background: 'var(--bg-card)',
            marginBottom: '16px',
          }}
        />

        <button
          onClick={submit}
          className="w-full"
          style={{
            padding: '10px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 500,
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-card)',
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
