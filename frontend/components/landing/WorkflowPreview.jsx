import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  {
    id: 'profile',
    label: 'Research Profile',
    description: 'Upload your CV, publications & research interests',
    icon: '👤',
    color: 'from-sky-500 to-blue-600',
    badge: 'Input',
  },
  {
    id: 'discovery',
    label: 'Grant Discovery',
    description: 'AI scans 2,400+ funding databases in real-time',
    icon: '🔍',
    color: 'from-violet-500 to-purple-600',
    badge: 'Agent 1',
  },
  {
    id: 'extraction',
    label: 'Extraction',
    description: 'Parses eligibility, deadlines & requirements',
    icon: '⚙️',
    color: 'from-brand-500 to-indigo-600',
    badge: 'Agent 2',
  },
  {
    id: 'matching',
    label: 'Matching',
    description: 'Semantic scoring against your research profile',
    icon: '🎯',
    color: 'from-emerald-500 to-teal-600',
    badge: 'Agent 3',
  },
  {
    id: 'planning',
    label: 'Planning',
    description: 'Creates application strategy & timeline',
    icon: '🗂️',
    color: 'from-amber-500 to-orange-600',
    badge: 'Agent 4',
  },
  {
    id: 'recommendations',
    label: 'Recommendations',
    description: 'Ranked, personalized grant shortlist delivered',
    icon: '✨',
    color: 'from-pink-500 to-rose-600',
    badge: 'Output',
  },
]

export default function WorkflowPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!isInView) return
    let i = 0
    const interval = setInterval(() => {
      setActive(i)
      i++
      if (i >= STEPS.length) clearInterval(interval)
    }, 350)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section ref={ref} className="py-28 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-brand-400 uppercase">How it works</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            From profile to<br />
            <span className="text-gradient">funded research</span>
          </h2>
          <p className="mt-4 text-white/40 text-base max-w-xl mx-auto">
            Our pipeline of four specialized agents handles everything — you just upload your profile.
          </p>
        </motion.div>

        {/* Workflow steps */}
        <div className="relative flex flex-col items-center gap-0">
          {STEPS.map((step, i) => (
            <div key={step.id} className="relative flex flex-col items-center w-full max-w-md">
              {/* Step card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={active >= i ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 ${
                  active >= i
                    ? 'border-white/20 shadow-lg shadow-black/30'
                    : 'opacity-0'
                }`}
              >
                {/* Icon bubble */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-xl flex-shrink-0 shadow-lg`}>
                  {step.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-semibold text-white text-sm">{step.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r ${step.color} text-white font-semibold tracking-wide`}>
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">{step.description}</p>
                </div>

                {/* Active pulse dot */}
                {active === i && (
                  <span className="relative flex h-3 w-3 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500" />
                  </span>
                )}
                {active > i && (
                  <span className="text-emerald-400 text-base flex-shrink-0">✓</span>
                )}
              </motion.div>

              {/* Connector line + arrow */}
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={active > i ? { scaleY: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{ originY: 0 }}
                  className="flex flex-col items-center my-1"
                >
                  <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />
                  <span className="text-white/20 text-xs">↓</span>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
