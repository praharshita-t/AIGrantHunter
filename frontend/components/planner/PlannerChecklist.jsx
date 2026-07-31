import { CheckSquare, Square } from 'lucide-react';
import Badge from '@/components/common/Badge';

export default function PlannerChecklist({ tasks, onToggleSubtask }) {
  // Group tasks by category
  const categories = Array.from(new Set(tasks.map((t) => t.category)));

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const catTasks = tasks.filter((t) => t.category === category);

        return (
          <div
            key={category}
            className="rounded-2xl border p-5"
            style={{
              background: 'var(--color-bg-card)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {category} Requirements
            </h3>

            <div className="space-y-3">
              {catTasks.map((task) => (
                <div
                  key={task.id}
                  className="rounded-xl border p-3"
                  style={{
                    background: 'var(--color-bg-secondary)',
                    borderColor: 'var(--color-border-primary)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                      {task.title}
                    </span>
                    <Badge size="xs" variant="blue">
                      Due: {task.dueDate}
                    </Badge>
                  </div>

                  <div className="space-y-1.5 pl-2">
                    {task.subtasks?.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => onToggleSubtask?.(task.id, sub.id)}
                        className="flex w-full items-center gap-2 text-xs text-left transition-colors hover:text-white"
                        style={{
                          color: sub.completed ? 'var(--color-text-tertiary)' : 'var(--color-text-secondary)',
                          textDecoration: sub.completed ? 'line-through' : 'none',
                        }}
                      >
                        {sub.completed ? (
                          <CheckSquare className="h-4 w-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Square className="h-4 w-4 text-zinc-500 shrink-0" />
                        )}
                        <span>{sub.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
