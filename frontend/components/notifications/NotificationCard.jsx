import { motion } from 'framer-motion';
import { Clock, Search, FileText, Calendar, CheckCircle2 } from 'lucide-react';
import { getTimeAgo } from '@/components/common/utils';

const iconMap = {
  deadline: Clock,
  new_grant: Search,
  application: FileText,
  planner: Calendar,
};

const colorMap = {
  deadline: '#ef4444',
  new_grant: '#3b82f6',
  application: '#8b5cf6',
  planner: '#10b981',
};

export default function NotificationCard({ notification, onMarkAsRead }) {
  if (!notification) return null;

  const Icon = iconMap[notification.type] || Clock;
  const color = colorMap[notification.type] || '#3b82f6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group flex items-start gap-4 rounded-2xl border p-4 transition-all duration-200 ${
        !notification.read ? 'border-l-4' : ''
      }`}
      style={{
        background: notification.read ? 'var(--color-bg-card)' : 'rgba(59, 130, 246, 0.04)',
        borderColor: 'var(--color-border-primary)',
        borderLeftColor: !notification.read ? '#3b82f6' : 'var(--color-border-primary)',
      }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${color}15` }}
      >
        <Icon className="h-5 w-5" style={{ color }} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4
            className="text-sm font-semibold truncate"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {notification.title}
          </h4>
          <span className="text-xs shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
            {getTimeAgo(notification.timestamp)}
          </span>
        </div>

        <p className="text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          {notification.message}
        </p>

        {!notification.read && (
          <button
            onClick={() => onMarkAsRead?.(notification.id)}
            className="flex items-center gap-1 text-[11px] font-medium text-blue-500 hover:text-blue-400"
          >
            <CheckCircle2 className="h-3 w-3" />
            Mark as read
          </button>
        )}
      </div>
    </motion.div>
  );
}
