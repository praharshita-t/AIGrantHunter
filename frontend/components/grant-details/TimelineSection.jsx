// TimelineSection.jsx — Application opens / deadline / results
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } }),
}

const STEP_COLORS = [
  { dot: 'bg-brand-400',   line: 'bg-brand-500/30',   label: 'text-brand-300' },
  { dot: 'bg-amber-400',   line: 'bg-amber-500/30',   label: 'text-amber-300' },
  { dot: 'bg-emerald-400', line: 'bg-emerald-500/30', label: 'text-emerald-300' },
]

export default function TimelineSection({ timeline, animIndex = 2 }) {
  const steps = [
    { label: 'Application Opens', date: timeline.opens,    icon: '🟢' },
    { label: 'Submission Deadline', date: timeline.deadline, icon: '🟡' },
    { label: 'Results Announced',  date: timeline.results,  icon: '🏁' },
  ]

  return (
    <motion.div
      custom={animIndex}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="rounded-2xl bg-white/[0.04] border border-white/8 p-4"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-sm">📅</div>
        <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Timeline</h3>
      </div>

      <div className="relative pl-6">
        {steps.map((step, i) => {
          const c = STEP_COLORS[i]
          const isLast = i === steps.length - 1
          return (
            <div key={step.label} className="relative flex gap-4">
              {/* Connector line */}
              {!isLast && (
                <div className={`absolute left-0 top-5 w-px h-full ${c.line}`} />
              )}

              {/* Dot */}
              <div className="relative z-10 flex-shrink-0 -ml-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: animIndex * 0.08 + i * 0.1 }}
                  className={`w-3 h-3 rounded-full ${c.dot} shadow-lg mt-1`}
                />
              </div>

              {/* Content */}
              <div className={`pb-5 ${isLast ? '' : ''}`}>
                <p className={`text-[11px] font-semibold uppercase tracking-widest ${c.label} mb-0.5`}>
                  {step.label}
                </p>
                <p className="text-sm font-medium text-white">{step.date}</p>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
