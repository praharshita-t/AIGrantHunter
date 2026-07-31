// WorkflowTimeline.jsx — Vertical animated pipeline with sequential light-up
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STAGES = [
  {
    id: 'profile',
    label: 'Research Profile',
    sub: 'Input uploaded & parsed',
    icon: '👤',
    color: 'from-sky-500 to-blue-600',
    glow: 'rgba(14,165,233,0.4)',
  },
  {
    id: 'discovery',
    label: 'Grant Discovery',
    sub: 'NSF · ANRF · UKRI · 50+ sources',
    icon: '🔭',
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.4)',
  },
  {
    id: 'extraction',
    label: 'Extraction',
    sub: 'Parsing eligibility, deadlines & amounts',
    icon: '⚙️',
    color: 'from-brand-500 to-indigo-600',
    glow: 'rgba(100,115,243,0.4)',
  },
  {
    id: 'matching',
    label: 'Matching',
    sub: 'Semantic vector scoring',
    icon: '🎯',
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    id: 'planning',
    label: 'Planning',
    sub: 'Proposal roadmap generated',
    icon: '🗂️',
    color: 'from-amber-500 to-orange-600',
    glow: 'rgba(245,158,11,0.4)',
  },
  {
    id: 'recommendations',
    label: 'Recommendations',
    sub: '15 grants ranked & delivered',
    icon: '✨',
    color: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.4)',
  },
]

export default function WorkflowTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!isInView) return
    let i = 0
    const step = () => {
      setActive(i)
      i++
      if (i < STAGES.length) setTimeout(step, 420)
    }
    const t = setTimeout(step, 200)
    return () => clearTimeout(t)
  }, [isInView])

  return (
    <div ref={ref} className="flex flex-col items-center w-full max-w-sm mx-auto">
      {STAGES.map((stage, i) => {
        const isDone = active > i
        const isCurrent = active === i
        const isPending = active < i

        return (
          <div key={stage.id} className="relative flex flex-col items-center w-full">
            {/* Stage card */}
            <motion.div
              initial={{ opacity: 0.15, scale: 0.92 }}
              animate={
                isCurrent
                  ? { opacity: 1, scale: 1.02 }
                  : isDone
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0.18, scale: 0.94 }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div
                className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-400
                  ${isDone
                    ? 'bg-white/[0.05] border-white/15'
                    : isCurrent
                    ? 'bg-white/[0.07] border-white/20 shadow-xl'
                    : 'bg-white/[0.02] border-white/5'
                  }`}
                style={
                  isCurrent
                    ? { boxShadow: `0 0 24px ${stage.glow}, 0 4px 24px rgba(0,0,0,0.4)` }
                    : undefined
                }
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-base flex-shrink-0 shadow-md transition-all duration-300
                    ${isPending ? 'opacity-30 grayscale' : 'opacity-100'}
                  `}
                >
                  {stage.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      isPending ? 'text-white/25' : 'text-white'
                    }`}
                  >
                    {stage.label}
                  </div>
                  <div
                    className={`text-[11px] transition-colors duration-300 ${
                      isPending ? 'text-white/15' : 'text-white/40'
                    }`}
                  >
                    {stage.sub}
                  </div>
                </div>

                {/* State indicators */}
                <div className="flex-shrink-0">
                  {isCurrent && (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                  )}
                  {isDone && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="flex h-6 w-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 items-center justify-center"
                    >
                      <span className="text-emerald-400 text-[10px] font-bold">✓</span>
                    </motion.span>
                  )}
                  {isPending && (
                    <span className="h-2.5 w-2.5 rounded-full border border-white/15 inline-block" />
                  )}
                </div>
              </div>
            </motion.div>

            {/* Connector */}
            {i < STAGES.length - 1 && (
              <div className="flex flex-col items-center my-1 h-7 relative">
                {/* Track */}
                <div className="w-px h-full bg-white/8 absolute" />
                {/* Animated fill */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isDone ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeIn' }}
                  style={{ originY: 0 }}
                  className={`w-px h-full absolute bg-gradient-to-b ${stage.color} opacity-70`}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
