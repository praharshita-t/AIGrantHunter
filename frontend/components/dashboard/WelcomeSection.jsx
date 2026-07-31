import { motion } from 'framer-motion';
import { Sparkles, FileText, Search, Calendar } from 'lucide-react';
import { getGreeting } from '@/components/common/utils';
import { useNavigate } from 'react-router-dom';

export default function WelcomeSection({ user }) {
  const greeting = getGreeting();
  const navigate = useNavigate();

  const quickActions = [
    { label: 'Find Grants', icon: Search, color: 'from-blue-500 to-blue-600', path: '/discover' },
    { label: 'My Proposals', icon: FileText, color: 'from-violet-500 to-violet-600', path: '/planner' },
    { label: 'View Planner', icon: Calendar, color: 'from-emerald-500 to-emerald-600', path: '/planner' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-2xl border p-6 sm:p-8"
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.05), transparent)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium text-blue-500">AI-Powered Research Assistant</span>
        </div>
        <h2
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {greeting}, {user?.name ? user.name.split(' ')[0] : 'Dr. Sarah'}
        </h2>
        <p className="mt-2 max-w-xl text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          You have <span className="font-semibold text-blue-500">5 upcoming deadlines</span> and{' '}
          <span className="font-semibold text-emerald-500">3 new grant matches</span> since your last visit.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <motion.button
              key={action.label}
              onClick={() => navigate(action.path)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 rounded-xl bg-gradient-to-r ${action.color} px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-shadow hover:shadow-xl`}
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
