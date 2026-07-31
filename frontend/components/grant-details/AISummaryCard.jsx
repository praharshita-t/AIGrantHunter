// AISummaryCard.jsx — Brand-highlighted AI-generated summary block
import { motion } from 'framer-motion'

export default function AISummaryCard({ summary, matchScore, animIndex = 4 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animIndex * 0.08 }}
      className="relative rounded-2xl overflow-hidden"
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/30 via-purple-500/20 to-transparent" />
      <div className="absolute inset-[1px] rounded-2xl bg-surface-900" />

      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-sm shadow-md">
              ✦
            </div>
            <h3 className="text-sm font-bold text-white">AI Summary</h3>
          </div>

          {/* Match score badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            <span className="text-xs font-bold text-emerald-300">{matchScore}% Match</span>
          </div>
        </div>

        {/* Summary text */}
        <p className="text-sm text-white/65 leading-relaxed">{summary}</p>

        {/* Confidence bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] text-white/30 mb-1.5">
            <span>AI Confidence</span>
            <span className="text-brand-400 font-semibold">{matchScore}%</span>
          </div>
          <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${matchScore}%` }}
              transition={{ duration: 1.1, delay: animIndex * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-purple-500"
              style={{ boxShadow: '0 0 8px rgba(100,115,243,0.6)' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
