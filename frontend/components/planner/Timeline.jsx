import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';
import Badge from '@/components/common/Badge';

export default function Timeline({ tasks }) {
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      <h3
        className="text-base font-semibold mb-6"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Milestones Timeline
      </h3>

      <div className="relative pl-6 space-y-6">
        {/* Continuous line */}
        <div
          className="absolute left-2.5 top-3 bottom-3 w-0.5"
          style={{ background: 'var(--color-border-primary)' }}
        />

        {sortedTasks.map((task, index) => {
          const isDone = task.status === 'done';

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex items-start gap-4"
            >
              {/* Dot icon */}
              <div
                className="absolute -left-[27px] top-1 flex h-6 w-6 items-center justify-center rounded-full border"
                style={{
                  background: isDone ? '#10b981' : 'var(--color-bg-elevated)',
                  borderColor: isDone ? '#10b981' : 'var(--color-border-accent)',
                  color: isDone ? '#ffffff' : '#3b82f6',
                }}
              >
                {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
              </div>

              {/* Task Details Card */}
              <div
                className="flex-1 rounded-xl border p-4"
                style={{
                  background: 'var(--color-bg-secondary)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold text-blue-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Due {task.dueDate}
                  </span>
                  <Badge variant={isDone ? 'green' : 'amber'} size="xs">
                    {task.status.replace('_', ' ')}
                  </Badge>
                </div>

                <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  {task.title}
                </h4>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {task.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
