// PreviousGrantForm.jsx — Optional previous grants list (agency, topic, year)
import { motion, AnimatePresence } from 'framer-motion'

const EMPTY_GRANT = { agency: '', topic: '', year: '' }

const inputCls =
  'w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/10 text-sm text-white placeholder-white/25 outline-none focus:border-brand-500/40 focus:bg-white/[0.07] transition-all duration-200'

export default function PreviousGrantForm({ grants, onChange }) {
  const add    = () => onChange([...grants, { ...EMPTY_GRANT }])
  const remove = (i) => onChange(grants.filter((_, idx) => idx !== i))
  const set    = (i, key, val) => {
    const next = grants.map((g, idx) => idx === i ? { ...g, [key]: val } : g)
    onChange(next)
  }

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/8 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-sm">🏆</div>
          <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Previous Grants <span className="text-white/20 normal-case font-normal tracking-normal">(optional)</span>
          </h2>
        </div>
        <button
          id="add-grant"
          type="button"
          onClick={add}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-brand-500/20 border border-brand-500/30 text-brand-300 hover:bg-brand-500/30 transition-all duration-150"
        >
          + Add Grant
        </button>
      </div>

      {grants.length === 0 && (
        <p className="text-xs text-white/25 text-center py-4">
          No previous grants added. Click "+ Add Grant" to start.
        </p>
      )}

      <div className="space-y-3">
        <AnimatePresence>
          {grants.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <input
                  type="text"
                  value={g.agency}
                  onChange={(e) => set(i, 'agency', e.target.value)}
                  placeholder="Funding Agency"
                  className={inputCls}
                />
                <input
                  type="text"
                  value={g.topic}
                  onChange={(e) => set(i, 'topic', e.target.value)}
                  placeholder="Research Topic"
                  className={inputCls}
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={g.year}
                    onChange={(e) => set(i, 'year', e.target.value)}
                    placeholder="Year"
                    min="1990"
                    max="2030"
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="px-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors duration-150 text-sm flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
