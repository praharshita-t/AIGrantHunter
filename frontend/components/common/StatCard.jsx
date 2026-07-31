import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, FileText, Target, DollarSign, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/components/common/utils';

const iconMap = {
  Search,
  FileText,
  Target,
  DollarSign,
  Clock,
};

const colorMap = {
  blue: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.2)' },
  violet: { bg: 'rgba(139, 92, 246, 0.1)', text: '#8b5cf6', border: 'rgba(139, 92, 246, 0.2)' },
  emerald: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', border: 'rgba(16, 185, 129, 0.2)' },
  amber: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.2)' },
  rose: { bg: 'rgba(244, 63, 94, 0.1)', text: '#f43f5e', border: 'rgba(244, 63, 94, 0.2)' },
};

function AnimatedCounter({ value, format, prefix, suffix }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (value - startValue) * eased);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isInView]);

  const formatted =
    format === 'currency'
      ? formatCurrency(displayValue)
      : `${prefix || ''}${displayValue.toLocaleString()}${suffix || ''}`;

  return <span ref={ref}>{formatted}</span>;
}

export default function StatCard({ title, value, trend, icon, color, format, prefix, suffix }) {
  const Icon = iconMap[icon] || Search;
  const colors = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group relative rounded-2xl border p-5 transition-all duration-300"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border-primary)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.boxShadow = `0 0 20px ${colors.border}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-primary)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            {title}
          </p>
          <p className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            <AnimatedCounter value={value} format={format} prefix={prefix} suffix={suffix} />
          </p>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: colors.bg }}
        >
          <Icon className="h-5 w-5" style={{ color: colors.text }} />
        </div>
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          {trend.direction === 'up' ? (
            <TrendingUp className="h-3.5 w-3.5" style={{ color: 'var(--color-success)' }} />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" style={{ color: 'var(--color-error)' }} />
          )}
          <span
            className="text-xs font-medium"
            style={{
              color: trend.direction === 'up' ? 'var(--color-success)' : 'var(--color-error)',
            }}
          >
            {trend.value}%
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
            vs last month
          </span>
        </div>
      )}
    </motion.div>
  );
}
