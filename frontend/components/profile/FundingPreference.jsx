// FundingPreference.jsx — Checkbox group: Government, Private, International, Industry
import { motion } from 'framer-motion'

const OPTIONS = [
  { id: 'government',    label: 'Government',    icon: '🏛️', desc: 'NSF, NIH, ANRF, UKRI…' },
  { id: 'private',       label: 'Private',       icon: '🏢', desc: 'Foundations, charities'  },
  { id: 'international', label: 'International', icon: '🌍', desc: 'EU Horizon, WHO, UNESCO'  },
  { id: 'industry',      label: 'Industry',      icon: '🔧', desc: 'Corporate R&D partnerships' },
]

export default function FundingPreference({ selected, onChange }) {
  const toggle = (id) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id],
    )
  }

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/8 p-5">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-lg bg-pink-500/20 flex items-center justify-center text-sm">🎛️</div>
        <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Funding Preferences</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OPTIONS.map((opt) => {
          const isOn = selected.includes(opt.id)
          return (
            <motion.button
              key={opt.id}
              id={`funding-pref-${opt.id}`}
              type="button"
              onClick={() => toggle(opt.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200
                ${isOn
                  ? 'bg-brand-500/15 border-brand-500/40 shadow-sm'
                  : 'bg-white/[0.03] border-white/8 hover:border-white/15'
                }`}
            >
              {/* Checkbox */}
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
                ${isOn ? 'bg-brand-600 border-brand-400' : 'bg-transparent border-white/20'}`}>
                {isOn && <span className="text-white text-[10px] font-bold">✓</span>}
              </div>

              <span className="text-xl flex-shrink-0">{opt.icon}</span>

              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold transition-colors duration-200 ${isOn ? 'text-white' : 'text-white/60'}`}>
                  {opt.label}
                </div>
                <div className="text-[10px] text-white/30 mt-0.5">{opt.desc}</div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
