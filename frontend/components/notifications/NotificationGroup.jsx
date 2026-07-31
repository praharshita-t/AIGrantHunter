import NotificationCard from './NotificationCard';

export default function NotificationGroup({ title, notifications, onMarkAsRead }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3
        className="text-xs font-bold uppercase tracking-wider px-1"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        {title} ({notifications.length})
      </h3>

      <div className="space-y-3">
        {notifications.map((item) => (
          <NotificationCard key={item.id} notification={item} onMarkAsRead={onMarkAsRead} />
        ))}
      </div>
    </div>
  );
}
