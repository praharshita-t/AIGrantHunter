import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '@/components/common/Badge';

export default function PlannerCalendar({ tasks }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            August 2026
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-lg p-1.5 border hover:bg-white/5" style={{ borderColor: 'var(--color-border-primary)', color: 'var(--color-text-secondary)' }}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="rounded-lg p-1.5 border hover:bg-white/5" style={{ borderColor: 'var(--color-border-primary)', color: 'var(--color-text-secondary)' }}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const formattedDay = day < 10 ? `0${day}` : `${day}`;
          const matchingTasks = tasks.filter((t) => t.dueDate.endsWith(`-${formattedDay}`));

          return (
            <div
              key={day}
              className="min-h-[70px] rounded-xl border p-1.5 flex flex-col justify-between"
              style={{
                background: matchingTasks.length > 0 ? 'rgba(59, 130, 246, 0.05)' : 'var(--color-bg-secondary)',
                borderColor: matchingTasks.length > 0 ? 'rgba(59, 130, 246, 0.2)' : 'var(--color-border-primary)',
              }}
            >
              <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                {day}
              </span>
              {matchingTasks.map((t) => (
                <div key={t.id} className="truncate rounded bg-blue-600/20 px-1 py-0.5 text-[9px] font-medium text-blue-400">
                  {t.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
