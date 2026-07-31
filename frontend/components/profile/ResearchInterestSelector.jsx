// ResearchInterestSelector.jsx — Multi-select chip grid
import { motion } from 'framer-motion'

const ALL_INTERESTS = [
  { id: 'ai',        label: 'Artificial Intelligence', icon: '🤖' },
  { id: 'healthcare',label: 'Healthcare',              icon: '🏥' },
  { id: 'cv',        label: 'Computer Vision',         icon: '👁️' },
  { id: 'cyber',     label: 'Cybersecurity',           icon: '🔐' },
  { id: 'quantum',   label: 'Quantum Computing',       icon: '⚛️' },
  { id: 'nlp',       label: 'Natural Language Processing', icon: '💬' },
  { id: 'robotics',  label: 'Robotics',                icon: '🦾' },
  { id: 'climate',   label: 'Climate Science',         icon: '🌍' },
  { id: 'genomics',  label: 'Genomics',                icon: '🧬' },
  { id: 'materials', label: 'Materials Science',       icon: '🔬' },
]

export default function ResearchInterestSelector({ selected, onChange }) {
  const toggle = (id) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id],
    )
  }

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/8 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-violet-500/20 flex items-center justify-center text-sm">🎯</div>
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Research Interests</h2>
        </div>
        {selected.length > 0 && (
          <span className="text-[11px] font-semibold text-brand-400">
            {selected.length} selected
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {ALL_INTERESTS.map((interest) => {
          const isOn = selected.includes(interest.id)
          return (
            <motion.button
              key={interest.id}
              id={`interest-${interest.id}`}
              type="button"
              onClick={() => toggle(interest.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200
                ${isOn
                  ? 'bg-brand-600/80 border-brand-400/60 text-white shadow-md'
                  : 'bg-white/[0.04] border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'
                }`}
            >
              <span>{interest.icon}</span>
              {interest.label}
              {isOn && <span className="text-brand-200 text-[10px]">✓</span>}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
