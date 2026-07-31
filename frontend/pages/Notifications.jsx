import { useNotifications } from '@/hooks/useNotifications';
import PageHeader from '@/components/common/PageHeader';
import NotificationList from '@/components/notifications/NotificationList';
import { CheckCheck } from 'lucide-react';

export default function Notifications() {
  const { notifications, unreadCount, filter, setFilter, markAsRead, markAllAsRead } =
    useNotifications();

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: `Unread (${unreadCount})` },
    { id: 'deadline', label: 'Deadlines' },
    { id: 'new_grant', label: 'New Grants' },
    { id: 'application', label: 'Applications' },
    { id: 'planner', label: 'Planner' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Notifications"
        subtitle="Stay up to date with grant matches, deadline countdowns, and proposal milestones."
        actions={
          unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors hover:bg-white/5"
              style={{
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <CheckCheck className="h-4 w-4 text-emerald-500" />
              Mark all as read
            </button>
          )
        }
      />

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b" style={{ borderColor: 'var(--color-border-primary)' }}>
        {filters.map((f) => {
          const isActive = filter === f.id;

          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all"
              style={{
                background: isActive ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: isActive ? '#3b82f6' : 'var(--color-text-secondary)',
                border: `1px solid ${isActive ? 'rgba(59, 130, 246, 0.3)' : 'transparent'}`,
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <NotificationList notifications={notifications} onMarkAsRead={markAsRead} />
    </div>
  );
}
