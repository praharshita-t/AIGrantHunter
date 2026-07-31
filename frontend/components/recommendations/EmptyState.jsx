// EmptyState.jsx — Shown when no grants match the active filter / search
import { motion } from 'framer-motion'

export default function EmptyState({ query = '', filter = 'All' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-28 text-center"
    >
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-4xl mb-6 shadow-inner">
        🔍
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">No matching grants found</h3>

      <p className="text-sm text-white/40 max-w-sm leading-relaxed">
        {query
          ? `No grants matched "${query}" under the "${filter}" category. Try adjusting your search or filter.`
          : `No grants available in the "${filter}" category right now. Try a different filter.`}
      </p>

      <div className="mt-6 h-px w-40 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <p className="mt-4 text-xs text-white/25">
        GrantAI continuously indexes new opportunities — check back soon.
      </p>
    </motion.div>
  )
}
