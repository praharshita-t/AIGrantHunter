import { usePlanner } from '@/hooks/usePlanner';
import PageHeader from '@/components/common/PageHeader';
import ProgressRing from '@/components/planner/ProgressRing';
import KanbanBoard from '@/components/planner/KanbanBoard';
import Timeline from '@/components/planner/Timeline';
import PlannerChecklist from '@/components/planner/PlannerChecklist';
import PlannerCalendar from '@/components/planner/PlannerCalendar';
import { LayoutGrid, ListTodo, GitCommit, Calendar } from 'lucide-react';

export default function Planner() {
  const {
    tasks,
    columns,
    activeView,
    setActiveView,
    moveTaskStatus,
    toggleSubtask,
    completedCount,
    totalTasks,
    progressPercentage,
  } = usePlanner();

  const views = [
    { id: 'kanban', label: 'Kanban', icon: LayoutGrid },
    { id: 'checklist', label: 'Checklist', icon: ListTodo },
    { id: 'timeline', label: 'Timeline', icon: GitCommit },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Grant Application Planner"
          subtitle="Track milestones, proposal sections, budget justifications, and submission checklists."
        />

        {/* Overall Completion Ring */}
        <div
          className="flex items-center gap-3 rounded-2xl border p-3 self-start sm:self-auto"
          style={{
            background: 'var(--color-bg-card)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <ProgressRing percentage={progressPercentage} size={48} strokeWidth={5} />
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Overall Progress
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {completedCount} of {totalTasks} tasks completed
            </p>
          </div>
        </div>
      </div>

      {/* View Switcher */}
      <div className="flex items-center gap-2 border-b pb-3" style={{ borderColor: 'var(--color-border-primary)' }}>
        {views.map((v) => {
          const Icon = v.icon;
          const isActive = activeView === v.id;

          return (
            <button
              key={v.id}
              onClick={() => setActiveView(v.id)}
              className="flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all"
              style={{
                background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: isActive ? '#3b82f6' : 'var(--color-text-secondary)',
                border: `1px solid ${isActive ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}`,
              }}
            >
              <Icon className="h-4 w-4" />
              {v.label}
            </button>
          );
        })}
      </div>

      {/* Active View Render */}
      {activeView === 'kanban' && (
        <KanbanBoard
          columns={columns}
          tasks={tasks}
          onToggleSubtask={toggleSubtask}
          onMoveStatus={moveTaskStatus}
        />
      )}
      {activeView === 'checklist' && (
        <PlannerChecklist tasks={tasks} onToggleSubtask={toggleSubtask} />
      )}
      {activeView === 'timeline' && <Timeline tasks={tasks} />}
      {activeView === 'calendar' && <PlannerCalendar tasks={tasks} />}
    </div>
  );
}
