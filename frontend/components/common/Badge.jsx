import { cn } from '@/components/common/utils';

const variants = {
  default: {
    bg: 'var(--color-bg-tertiary)',
    text: 'var(--color-text-secondary)',
    border: 'var(--color-border-primary)',
  },
  blue: {
    bg: 'rgba(59, 130, 246, 0.1)',
    text: '#3b82f6',
    border: 'rgba(59, 130, 246, 0.2)',
  },
  green: {
    bg: 'rgba(16, 185, 129, 0.1)',
    text: '#10b981',
    border: 'rgba(16, 185, 129, 0.2)',
  },
  amber: {
    bg: 'rgba(245, 158, 11, 0.1)',
    text: '#f59e0b',
    border: 'rgba(245, 158, 11, 0.2)',
  },
  red: {
    bg: 'rgba(239, 68, 68, 0.1)',
    text: '#ef4444',
    border: 'rgba(239, 68, 68, 0.2)',
  },
  violet: {
    bg: 'rgba(139, 92, 246, 0.1)',
    text: '#8b5cf6',
    border: 'rgba(139, 92, 246, 0.2)',
  },
};

export default function Badge({ children, variant = 'default', size = 'sm', className }) {
  const colors = variants[variant] || variants.default;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        size === 'xs' && 'px-1.5 py-0.5 text-[10px]',
        size === 'sm' && 'px-2.5 py-1 text-xs',
        size === 'md' && 'px-3 py-1.5 text-sm',
        className
      )}
      style={{
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {children}
    </span>
  );
}
