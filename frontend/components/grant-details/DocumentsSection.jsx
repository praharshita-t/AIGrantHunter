// DocumentsSection.jsx — Required documents list
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } }),
}

const DOC_ICONS = {
  Proposal:               '📄',
  CV:                     '👤',
  'Budget Plan':          '💼',
  'Recommendation Letter':'✉️',
  'Ethics Statement':     '⚖️',
  'Data Management Plan': '🗂️',
}

export default function DocumentsSection({ documents, animIndex = 3 }) {
  return (
    <motion.div
      custom={animIndex}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="rounded-2xl bg-white/[0.04] border border-white/8 p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-violet-500/20 flex items-center justify-center text-sm">📋</div>
        <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Required Documents</h3>
      </div>

      <div className="space-y-2">
        {documents.map((doc, i) => (
          <motion.div
            key={doc.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: animIndex * 0.08 + i * 0.06 }}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors duration-150 group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">{DOC_ICONS[doc.name] ?? '📎'}</span>
              <span className="text-sm text-white/70 font-medium group-hover:text-white transition-colors duration-150">
                {doc.name}
              </span>
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                doc.required
                  ? 'bg-red-500/10 border-red-500/20 text-red-300'
                  : 'bg-white/5 border-white/10 text-white/30'
              }`}
            >
              {doc.required ? 'Required' : 'Optional'}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
