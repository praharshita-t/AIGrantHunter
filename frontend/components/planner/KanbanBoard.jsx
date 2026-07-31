import TaskCard from './TaskCard';

export default function KanbanBoard({ columns, tasks, onToggleSubtask, onMoveStatus }) {
  if (!columns) return null;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.status === col.status);

        return (
          <div
            key={col.id}
            className="flex flex-col rounded-2xl border p-4"
            style={{
              background: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    background:
                      col.status === 'todo'
                        ? '#f59e0b'
                        : col.status === 'in_progress'
                        ? '#3b82f6'
                        : col.status === 'review'
                        ? '#8b5cf6'
                        : '#10b981',
                  }}
                />
                <h3
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {col.title}
                </h3>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{
                  background: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                {colTasks.length}
              </span>
            </div>

            {/* Task list */}
            <div className="space-y-3 flex-1 overflow-y-auto min-h-[300px]">
              {colTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleSubtask={onToggleSubtask}
                  onMoveStatus={onMoveStatus}
                />
              ))}
              {colTasks.length === 0 && (
                <div
                  className="flex h-32 items-center justify-center rounded-xl border border-dashed text-xs"
                  style={{
                    borderColor: 'var(--color-border-primary)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  No tasks
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
