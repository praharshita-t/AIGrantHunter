// RequirementChecklist.jsx — ✔/✘ checklist of applicant requirements
import { motion } from 'framer-motion'

export default function RequirementChecklist({ requirements, animIndex = 5 }) {
  const met    = requirements.filter((r) => r.met).length
  const total  = requirements.length
  const pct    = Math.round((met / total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: animIndex * 0.08 }}
      className="rounded-2xl bg-white/[0.04] border border-white/8 p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm">✅</div>
          <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Requirement Checklist</h3>
        </div>
        <span className={`text-xs font-bold ${pct === 100 ? 'text-emerald-400' : pct >= 75 ? 'text-amber-400' : 'text-red-400'}`}>
          {met}/{total} met
        </span>
      </div>

      {/* Overall progress */}
      <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: animIndex * 0.08 + 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${pct === 100 ? 'bg-emerald-500' : pct >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
        />
      </div>

      {/* Items */}
      <div className="space-y-2">
        {requirements.map((req, i) => (
          <motion.div
            key={req.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: animIndex * 0.08 + i * 0.06 }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-150
              ${req.met
                ? 'bg-emerald-500/[0.06] border-emerald-500/15'
                : 'bg-red-500/[0.06] border-red-500/15'
              }`}
          >
            {/* Icon */}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18, delay: animIndex * 0.08 + i * 0.06 + 0.1 }}
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold
                ${req.met ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}
            >
              {req.met ? '✓' : '✕'}
            </motion.span>

            {/* Label */}
            <span className={`text-sm font-medium flex-1 ${req.met ? 'text-white/75' : 'text-white/40 line-through'}`}>
              {req.label}
            </span>

            {/* Note */}
            {req.note && (
              <span className="text-[10px] text-white/25 italic">{req.note}</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
