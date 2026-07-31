import NotificationGroup from './NotificationGroup';
import EmptyState from '@/components/common/EmptyState';
import { Bell } from 'lucide-react';

export default function NotificationList({ notifications, onMarkAsRead }) {
  if (!notifications || notifications.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        title="No notifications"
        description="You're all caught up! Check back later for grant match updates and deadline alerts."
      />
    );
  }

  // Group notifications by group field (Today, Yesterday, Earlier)
  const todayList = notifications.filter((n) => n.group === 'Today');
  const yesterdayList = notifications.filter((n) => n.group === 'Yesterday');
  const earlierList = notifications.filter((n) => n.group === 'Earlier' || !n.group);

  return (
    <div className="space-y-6">
      <NotificationGroup title="Today" notifications={todayList} onMarkAsRead={onMarkAsRead} />
      <NotificationGroup title="Yesterday" notifications={yesterdayList} onMarkAsRead={onMarkAsRead} />
      <NotificationGroup title="Earlier" notifications={earlierList} onMarkAsRead={onMarkAsRead} />
    </div>
  );
}
