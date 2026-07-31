// GrantDetails.jsx — Standalone page that renders the GrantDetailsDrawer with mock data
import { useState } from 'react'
import { motion } from 'framer-motion'
import GrantDetailsDrawer from '../components/grant-details/GrantDetailsDrawer.jsx'

// ─── Mock Grant Data ──────────────────────────────────────────────────────────
const MOCK_GRANT = {
  id:          'nsf-bio-2024',
  title:       'NSF Biology Integration Grants 2024',
  agency:      'National Science Foundation (NSF)',
  category:    'Government',
  matchScore:  96,

  aiSummary:
    'This grant strongly aligns with your research interests in Artificial Intelligence, Machine Learning and Healthcare. The funding amount and eligibility criteria closely match your profile. Your recent publications on ML-driven protein folding align with 3 of the 4 priority areas stated by NSF.',

  funding: {
    amount:   '$500,000',
    duration: '3 Years',
    deadline: '15 September 2024',
  },

  eligibility: {
    countries:   ['United States', 'Canada', 'United Kingdom', 'Australia'],
    domains:     ['Computational Biology', 'Machine Learning', 'Genomics', 'Healthcare AI'],
    careerLevel: ['Early Career', 'Mid Career', 'Senior Researcher'],
  },

  timeline: {
    opens:    '1 June 2024',
    deadline: '15 September 2024',
    results:  'December 2024',
  },

  documents: [
    { name: 'Proposal',               required: true  },
    { name: 'CV',                     required: true  },
    { name: 'Budget Plan',            required: true  },
    { name: 'Recommendation Letter',  required: true  },
    { name: 'Ethics Statement',       required: false },
    { name: 'Data Management Plan',   required: false },
  ],

  requirements: [
    { label: 'Publications',        met: true,  note: '5 required · you have 12' },
    { label: 'Research Proposal',   met: true,  note: 'Template ready'           },
    { label: 'Budget Plan',         met: true,  note: 'Draft submitted'          },
    { label: 'Ethics Approval',     met: false, note: 'Pending review'           },
  ],
}

// ─── Background preview card ──────────────────────────────────────────────────
function PreviewCard({ grant, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md overflow-hidden"
    >
      {/* Top accent */}
      <div className="h-px w-full bg-gradient-to-r from-emerald-400 via-brand-400 to-purple-500 opacity-70" />

      <div className="p-6">
        {/* Category badge */}
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/25 text-[10px] font-semibold text-sky-300 uppercase tracking-widest mb-3">
          {grant.category}
        </span>

        <h2 className="text-lg font-bold text-white leading-snug mb-1">{grant.title}</h2>
        <p className="text-xs text-white/40 font-medium mb-5">{grant.agency}</p>

        <div className="flex items-center gap-4 mb-6">
          <div>
            <div className="text-xl font-extrabold text-emerald-400">{grant.funding.amount}</div>
            <div className="text-[10px] text-white/30 mt-0.5">Total Funding</div>
          </div>
          <div className="h-10 w-px bg-white/8" />
          <div>
            <div className="text-xl font-extrabold text-brand-300">{grant.matchScore}%</div>
            <div className="text-[10px] text-white/30 mt-0.5">AI Match Score</div>
          </div>
          <div className="h-10 w-px bg-white/8" />
          <div>
            <div className="text-sm font-bold text-white">{grant.funding.deadline}</div>
            <div className="text-[10px] text-white/30 mt-0.5">Deadline</div>
          </div>
        </div>

        <motion.button
          id="open-grant-drawer"
          onClick={onOpen}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors duration-200"
          style={{ boxShadow: '0 0 28px rgba(100,115,243,0.35)' }}
        >
          View Full Details →
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function GrantDetails() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans flex flex-col items-center justify-center px-4">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-600/12 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/8 blur-[100px]" />
      </div>

      {/* Page heading */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="text-xs font-semibold tracking-widest text-brand-400 uppercase">Grant Details</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Grant Details Drawer
        </h1>
        <p className="mt-2 text-white/40 text-sm">
          Click the card below to open the AI-powered details drawer.
        </p>
      </motion.div>

      {/* Preview card */}
      <PreviewCard grant={MOCK_GRANT} onOpen={() => setDrawerOpen(true)} />

      {/* Keyboard hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-[11px] text-white/20 font-mono"
      >
        Press <kbd className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-white/30">Esc</kbd> to close the drawer
      </motion.p>

      {/* Drawer — only mounted when open */}
      {drawerOpen && (
        <GrantDetailsDrawer
          grant={MOCK_GRANT}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  )
}
