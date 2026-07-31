// RecommendationHeader.jsx — Page title, subtitle and live run stats
import { motion } from 'framer-motion'

const STATS = [
  { value: '15', label: 'Grants Found', icon: '🏆' },
  { value: '91%', label: 'Avg Match',   icon: '🎯' },
  { value: '$2.3M', label: 'Total Funding', icon: '💰' },
  { value: '3',   label: 'Due < 30 Days', icon: '⏰' },
]

export default function RecommendationHeader({ total = 6 }) {
  return (
    <div className="mb-10">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 text-[11px] font-mono text-white/25 mb-6"
      >
        <span>GrantAI</span><span>/</span>
        <span className="text-white/40">mission-control</span><span>/</span>
        <span className="text-brand-400">recommendations</span>
      </motion.div>

      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-xs font-semibold tracking-widest text-brand-400 uppercase"
          >
            AI Recommendations
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-white"
          >
            AI Grant{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 via-brand-400 to-purple-400">
              Recommendations
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-2 text-white/40 text-base font-light"
          >
            Personalized funding opportunities ranked by AI relevance.
          </motion.p>
        </div>

        {/* Grant count pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500/10 border border-brand-500/20 flex-shrink-0"
        >
          <span className="text-brand-400 text-lg">✦</span>
          <div>
            <div className="text-sm font-bold text-brand-300">{total} grants shortlisted</div>
            <div className="text-[10px] text-white/30">by 4 AI agents</div>
          </div>
        </motion.div>
      </div>

      {/* Quick stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
            className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/8 px-4 py-3"
          >
            <span className="text-xl">{s.icon}</span>
            <div>
              <div className="text-sm font-bold text-white">{s.value}</div>
              <div className="text-[10px] text-white/30">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
