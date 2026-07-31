import { motion } from 'framer-motion';
import { Calendar, CheckSquare, ChevronRight } from 'lucide-react';
import Badge from '@/components/common/Badge';

const priorityVariants = {
  high: 'red',
  medium: 'amber',
  low: 'green',
};

export default function TaskCard({ task, onToggleSubtask, onMoveStatus }) {
  if (!task) return null;

  const completedSubtasks = task.subtasks?.filter((st) => st.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border p-4 transition-all duration-200"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <Badge variant={priorityVariants[task.priority]} size="xs">
          {task.priority} priority
        </Badge>
        <span
          className="text-[11px] font-medium"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {task.category}
        </span>
      </div>

      <h4
        className="text-sm font-semibold mb-1"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {task.title}
      </h4>

      <p
        className="text-xs line-clamp-2 mb-3"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {task.description}
      </p>

      {/* Subtask progress */}
      {totalSubtasks > 0 && (
        <div className="space-y-1.5 mb-3">
          <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
            <span className="flex items-center gap-1">
              <CheckSquare className="h-3 w-3" />
              Subtasks
            </span>
            <span>
              {completedSubtasks}/{totalSubtasks}
            </span>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full"
            style={{ background: 'var(--color-bg-tertiary)' }}
          >
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t text-xs" style={{ borderColor: 'var(--color-border-primary)', color: 'var(--color-text-tertiary)' }}>
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <span>{task.dueDate}</span>
        </div>

        {/* Quick status cycle button */}
        <button
          onClick={() => {
            const nextStatus =
              task.status === 'todo'
                ? 'in_progress'
                : task.status === 'in_progress'
                ? 'review'
                : task.status === 'review'
                ? 'done'
                : 'todo';
            onMoveStatus?.(task.id, nextStatus);
          }}
          className="flex items-center gap-1 text-[11px] font-medium text-blue-500 hover:text-blue-400"
        >
          Move <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}
