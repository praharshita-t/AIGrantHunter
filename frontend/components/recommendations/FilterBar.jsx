// FilterBar.jsx — Category filter tabs + search input
import { motion } from 'framer-motion'

const FILTERS = ['All', 'Government', 'Industry', 'International']

export default function FilterBar({ active, onFilter, query, onSearch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-8"
    >
      {/* Category tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/8 flex-wrap">
        {FILTERS.map((f) => {
          const isActive = active === f
          return (
            <button
              key={f}
              id={`filter-${f.toLowerCase()}`}
              onClick={() => onFilter(f)}
              className={`relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200
                ${isActive
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70'
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-lg bg-brand-600/80 border border-brand-500/50 shadow-sm"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          )
        })}
      </div>

      {/* Search input */}
      <div className="relative w-full sm:w-64">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 text-sm pointer-events-none">
          🔍
        </span>
        <input
          id="grant-search"
          type="text"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search grants…"
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder-white/25 outline-none focus:border-brand-500/50 focus:bg-white/[0.07] transition-all duration-200"
        />
        {query && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 text-xs transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  )
}
