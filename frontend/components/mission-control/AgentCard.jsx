// AgentCard.jsx — Premium glassmorphism card for a single AI agent
import { motion } from 'framer-motion'
import StatusBadge from './StatusBadge.jsx'
import AgentProgress from './AgentProgress.jsx'

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function AgentCard({ agent, index }) {
  const {
    id,
    name,
    icon,
    status,
    currentTask,
    progress,
    color,
    progressColor,
    metrics = [],
    log = [],
  } = agent

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="relative group rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 backdrop-blur-md overflow-hidden transition-colors duration-300"
    >
      {/* Top accent line */}
      <div className={`h-px w-full bg-gradient-to-r ${color} opacity-60`} />

      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.03] to-transparent" />

      {/* Ambient glow (subtle, behind card) */}
      <div
        className={`absolute -top-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${color}`}
      />

      <div className="relative z-10 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Icon bubble */}
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-lg shadow-lg flex-shrink-0`}
            >
              {icon}
            </div>
            <div>
              <div className="text-sm font-semibold text-white leading-tight">{name}</div>
              <div className="text-[11px] text-white/35 mt-0.5 font-mono">agent/{id}</div>
            </div>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Current task */}
        <div className="mb-4 rounded-xl bg-white/[0.03] border border-white/5 p-3">
          <div className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mb-1">
            Current Task
          </div>
          <div className="text-xs text-white/75 font-medium leading-relaxed flex items-center gap-1.5">
            {status === 'running' && (
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
            )}
            {status === 'complete' && <span className="text-emerald-400 text-[10px]">✓</span>}
            {currentTask}
          </div>
        </div>

        {/* Progress */}
        <AgentProgress value={progress} color={progressColor} label="Progress" />

        {/* Metrics row */}
        {metrics.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-lg bg-white/[0.03] border border-white/5 p-2 text-center">
                <div className="text-sm font-bold text-white">{m.value}</div>
                <div className="text-[10px] text-white/30 mt-0.5 truncate">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Activity log */}
        {log.length > 0 && (
          <div className="mt-4 space-y-1">
            {log.map((entry, i) => (
              <div key={i} className="flex items-start gap-2 text-[10px] text-white/30 font-mono">
                <span className="text-white/15 flex-shrink-0">{entry.time}</span>
                <span className="text-white/45">{entry.msg}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
