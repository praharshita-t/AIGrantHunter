import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { daysUntil, formatCurrency } from '@/components/common/utils';
import Badge from '@/components/common/Badge';
import { useNavigate } from 'react-router-dom';

const priorityColors = {
  high: 'red',
  medium: 'amber',
  low: 'green',
};

export default function UpcomingDeadlines({ deadlines }) {
  const navigate = useNavigate();

  if (!deadlines) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="rounded-2xl border p-5"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3
          className="text-sm font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Upcoming Deadlines
        </h3>
        <button
          onClick={() => navigate('/discover')}
          className="flex items-center gap-1 text-xs font-medium text-blue-500 transition-colors hover:text-blue-400"
        >
          View All
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-3">
        {deadlines.map((deadline, index) => {
          const days = daysUntil(deadline.deadline);
          const urgency = days <= 7 ? 'red' : days <= 21 ? 'amber' : 'green';

          return (
            <motion.div
              key={deadline.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + index * 0.05 }}
              className="group flex items-center gap-4 rounded-xl border px-4 py-3 transition-all duration-200"
              style={{
                borderColor: 'var(--color-border-primary)',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg-card-hover)';
                e.currentTarget.style.borderColor = 'var(--color-border-secondary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'var(--color-border-primary)';
              }}
            >
              <div className="flex flex-col items-center">
                <span
                  className="text-xl font-bold"
                  style={{
                    color:
                      urgency === 'red'
                        ? 'var(--color-error)'
                        : urgency === 'amber'
                        ? 'var(--color-warning)'
                        : 'var(--color-success)',
                  }}
                >
                  {days}
                </span>
                <span
                  className="text-[10px] uppercase font-medium"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  days
                </span>
              </div>

              <div
                className="h-10 w-px"
                style={{ background: 'var(--color-border-primary)' }}
              />

              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {deadline.grantTitle}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="blue" size="xs">
                    {deadline.agency}
                  </Badge>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    {formatCurrency(deadline.funding)}
                  </span>
                </div>
              </div>

              <Badge variant={priorityColors[deadline.priority]} size="xs">
                {deadline.priority}
              </Badge>

              <button
                onClick={() => navigate('/discover')}
                className="rounded-lg p-2 text-blue-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-blue-500/10"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
