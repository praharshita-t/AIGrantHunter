import { motion } from 'framer-motion';
import { User, Bookmark, CheckCircle, Bell, Sparkles, Send } from 'lucide-react';
import { getTimeAgo } from '@/components/common/utils';

const iconMap = {
  User,
  Bookmark,
  CheckCircle,
  Bell,
  Sparkles,
  Send,
};

const colorMap = {
  profile: '#3b82f6',
  grant_saved: '#f59e0b',
  planner: '#10b981',
  reminder: '#8b5cf6',
  match: '#06b6d4',
  application: '#f43f5e',
};

export default function RecentActivity({ activities }) {
  if (!activities) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-2xl border p-5"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      <h3
        className="mb-4 text-sm font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Recent Activity
      </h3>

      <div className="space-y-1">
        {activities.map((activity, index) => {
          const Icon = iconMap[activity.icon] || CheckCircle;
          const color = colorMap[activity.type] || '#3b82f6';

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'var(--color-bg-card-hover)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              <div className="relative flex flex-col items-center">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${color}15` }}
                >
                  <Icon className="h-4 w-4" style={{ color }} />
                </div>
                {index < activities.length - 1 && (
                  <div
                    className="mt-1 w-px flex-1"
                    style={{
                      background: 'var(--color-border-primary)',
                      minHeight: 16,
                    }}
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {activity.title}
                </p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {activity.description}
                </p>
              </div>

              <span
                className="shrink-0 text-xs"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                {getTimeAgo(activity.timestamp)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
