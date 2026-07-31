// AgentProgress.jsx — Animated progress bar with percentage label
import { motion } from 'framer-motion'

export default function AgentProgress({ value = 0, color = 'from-brand-500 to-purple-500', label }) {
  const clamp = Math.min(100, Math.max(0, value))

  return (
    <div className="w-full">
      {/* Label row */}
      <div className="flex items-center justify-between mb-1.5 text-xs font-medium">
        {label && <span className="text-white/40">{label}</span>}
        <span className={`ml-auto font-bold ${clamp === 100 ? 'text-emerald-400' : 'text-white/70'}`}>
          {clamp}%
        </span>
      </div>

      {/* Track */}
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
        {/* Glow layer */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamp}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${color} blur-sm opacity-50`}
        />
        {/* Solid bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamp}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  )
}
