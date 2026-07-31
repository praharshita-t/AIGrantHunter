import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  {
    id: 'discovery',
    icon: '🔭',
    title: 'Grant Discovery',
    description:
      'Continuously scans NIH, NSF, EU Horizon, Wellcome Trust and 50+ databases. Never miss a funding opportunity again.',
    color: 'from-sky-500/20 to-blue-600/10',
    border: 'border-sky-500/20',
    iconBg: 'bg-sky-500/20 text-sky-300',
    stats: [
      { value: '2,400+', label: 'Grants indexed' },
      { value: '50+', label: 'Databases' },
    ],
  },
  {
    id: 'matching',
    icon: '🎯',
    title: 'AI Matching',
    description:
      'Semantic vector matching aligns your research profile with grant requirements. Ranked by fit score, deadline, and funding amount.',
    color: 'from-brand-500/20 to-purple-600/10',
    border: 'border-brand-500/20',
    iconBg: 'bg-brand-500/20 text-brand-300',
    stats: [
      { value: '94%', label: 'Match accuracy' },
      { value: '<2 min', label: 'Per analysis' },
    ],
  },
  {
    id: 'planning',
    icon: '🗂️',
    title: 'Research Planning',
    description:
      'Generates a personalized application roadmap with milestones, required documents, and writing prompts tailored to each grant.',
    color: 'from-emerald-500/20 to-teal-600/10',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/20 text-emerald-300',
    stats: [
      { value: '3×', label: 'Faster prep' },
      { value: '100%', label: 'Deadline coverage' },
    ],
  },
  {
    id: 'transparency',
    icon: '🔍',
    title: 'Transparent AI',
    description:
      'Every recommendation comes with a full reasoning trace. Understand exactly why each grant was selected for your profile.',
    color: 'from-amber-500/20 to-orange-600/10',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/20 text-amber-300',
    stats: [
      { value: '100%', label: 'Explainable' },
      { value: '0', label: 'Black boxes' },
    ],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function FeatureCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-brand-400 uppercase">Features</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Everything you need to<br />
            <span className="text-gradient">win more grants</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.id}
              custom={i}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className={`group relative rounded-2xl p-6 bg-gradient-to-br ${feat.color} border ${feat.border} hover:border-white/20 transition-all duration-300 cursor-default overflow-hidden`}
            >
              {/* Hover shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${feat.iconBg} flex items-center justify-center text-2xl mb-5 font-normal`}>
                {feat.icon}
              </div>

              {/* Title & description */}
              <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{feat.description}</p>

              {/* Stats */}
              <div className="flex gap-6 border-t border-white/10 pt-5">
                {feat.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
