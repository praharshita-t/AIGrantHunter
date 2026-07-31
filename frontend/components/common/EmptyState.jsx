import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      {Icon && (
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: 'var(--color-bg-tertiary)' }}
        >
          <Icon className="h-8 w-8" style={{ color: 'var(--color-text-tertiary)' }} />
        </div>
      )}
      <h3
        className="mb-2 text-lg font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="mb-6 max-w-sm text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {description}
        </p>
      )}
      {action && action}
    </motion.div>
  );
}
