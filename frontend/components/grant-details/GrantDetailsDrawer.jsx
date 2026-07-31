// GrantDetailsDrawer.jsx — Slide-in drawer composing all sections
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import CloseButton          from './CloseButton.jsx'
import FundingSection       from './FundingSection.jsx'
import EligibilitySection   from './EligibilitySection.jsx'
import TimelineSection      from './TimelineSection.jsx'
import DocumentsSection     from './DocumentsSection.jsx'
import AISummaryCard        from './AISummaryCard.jsx'
import RequirementChecklist from './RequirementChecklist.jsx'

// ─── Drawer motion variants ───────────────────────────────────────────────────
const drawerVariants = {
  hidden:  { x: '100%',  opacity: 0.5 },
  visible: { x: 0,       opacity: 1,   transition: { type: 'spring', stiffness: 280, damping: 30 } },
  exit:    { x: '100%',  opacity: 0,   transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } },
}

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2  } },
}

export default function GrantDetailsDrawer({ grant, onClose }) {
  /* Lock body scroll while drawer is open */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!grant) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer panel */}
        <motion.aside
          key="drawer"
          variants={drawerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Grant details"
          className="relative z-10 w-full sm:w-[480px] h-full flex flex-col bg-surface-900 border-l border-white/10 shadow-2xl overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #12121c 0%, #0e0e18 100%)' }}
        >
          {/* Subtle top glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full bg-brand-600/15 blur-[60px]" />

          {/* ── Header ─────────────────────────────────────────────────────── */}
          <div className="relative z-10 flex items-start gap-3 px-5 pt-5 pb-4 border-b border-white/[0.07] flex-shrink-0">
            {/* Category badge */}
            <div className="flex-1 min-w-0">
              <span className="inline-block px-2 py-0.5 rounded-full bg-brand-500/15 border border-brand-500/25 text-[10px] font-semibold text-brand-300 uppercase tracking-widest mb-2">
                {grant.category}
              </span>
              <h2 className="text-base font-bold text-white leading-snug line-clamp-2">
                {grant.title}
              </h2>
              <p className="text-xs text-white/40 mt-1 font-medium">{grant.agency}</p>
            </div>
            <CloseButton onClose={onClose} />
          </div>

          {/* ── Scrollable body ─────────────────────────────────────────────── */}
          <div className="relative z-10 flex-1 overflow-y-auto px-5 py-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">

            {/* AI Summary */}
            <AISummaryCard
              summary={grant.aiSummary}
              matchScore={grant.matchScore}
              animIndex={0}
            />

            {/* Funding */}
            <FundingSection funding={grant.funding} animIndex={1} />

            {/* Eligibility */}
            <EligibilitySection eligibility={grant.eligibility} animIndex={2} />

            {/* Timeline */}
            <TimelineSection timeline={grant.timeline} animIndex={3} />

            {/* Required Documents */}
            <DocumentsSection documents={grant.documents} animIndex={4} />

            {/* Requirement Checklist */}
            <RequirementChecklist requirements={grant.requirements} animIndex={5} />

            {/* Bottom spacer for sticky footer */}
            <div className="h-4" />
          </div>

          {/* ── Sticky footer CTA ───────────────────────────────────────────── */}
          <div className="relative z-10 flex-shrink-0 px-5 py-4 border-t border-white/[0.07] bg-surface-900/80 backdrop-blur-md flex gap-3">
            <motion.button
              id="drawer-apply"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors duration-200 shadow-lg"
              style={{ boxShadow: '0 0 24px rgba(100,115,243,0.35)' }}
            >
              Apply Now →
            </motion.button>
            <motion.button
              id="drawer-save"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-white/[0.06] border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              🔖 Save Grant
            </motion.button>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  )
}
