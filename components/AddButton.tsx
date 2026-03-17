'use client';

interface AddButtonProps {
  onClick: () => void;
  label?: string;
}

export function AddButton({ onClick, label = '+ Add' }: AddButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClick}
        className="text-sm hover-subtle transition-colors"
        style={{
          color: 'var(--text-muted)',
          fontWeight: 500,
          padding: '6px 12px',
          borderRadius: '8px',
          backgroundColor: 'transparent',
          transitionDuration: '0.15s',
          transitionTimingFunction: 'ease',
        }}
      >
        {label}
      </button>
    </div>
  );
}
