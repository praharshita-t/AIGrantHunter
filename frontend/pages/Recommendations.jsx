// Recommendations.jsx — AI Grant Recommendations dashboard page
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import RecommendationHeader from '../components/recommendations/RecommendationHeader.jsx'
import FilterBar            from '../components/recommendations/FilterBar.jsx'
import GrantCard            from '../components/recommendations/GrantCard.jsx'
import EmptyState           from '../components/recommendations/EmptyState.jsx'

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_GRANTS = [
  {
    id: 'nsf-bio-2024',
    title: 'NSF Biology Integration Grants 2024',
    agency: 'National Science Foundation (NSF)',
    amount: '$500,000',
    matchScore: 96,
    deadline: '2024-09-15',
    category: 'Government',
    tags: ['Computational Biology', 'Machine Learning', 'Genomics'],
    aiReason:
      'Strongly matches your computational genomics research profile. Your recent publications on ML-driven protein folding align with 3 of the 4 stated priority areas.',
  },
  {
    id: 'wellcome-neuro-2024',
    title: 'Wellcome Trust Neuroscience Discovery Award',
    agency: 'Wellcome Trust',
    amount: '$750,000',
    matchScore: 92,
    deadline: '2024-08-30',
    category: 'International',
    tags: ['Neuroscience', 'Brain Imaging', 'AI Diagnostics'],
    aiReason:
      'Your interdisciplinary work on AI-assisted brain imaging positions you as an ideal candidate. Eligibility criteria match your career stage and institutional affiliation.',
  },
  {
    id: 'anrf-climate-2024',
    title: 'ANRF Climate & Sustainability Research Fund',
    agency: 'ANRF India',
    amount: '$220,000',
    matchScore: 88,
    deadline: '2024-10-01',
    category: 'Government',
    tags: ['Climate Science', 'Remote Sensing', 'Data Analytics'],
    aiReason:
      'Recommended because your remote sensing and satellite data analytics background directly addresses the fund’s core research mandate on climate modelling.',
  },
  {
    id: 'ukri-ai-2024',
    title: 'UKRI AI for Science Accelerator Grant',
    agency: 'UK Research and Innovation (UKRI)',
    amount: '$380,000',
    matchScore: 85,
    deadline: '2024-11-20',
    category: 'International',
    tags: ['AI / ML', 'Drug Discovery', 'Life Sciences'],
    aiReason:
      'Your cross-disciplinary AI and life-sciences research profile closely matches the stated objective of accelerating scientific discovery through AI-driven approaches.',
  },
  {
    id: 'siemens-digital-2024',
    title: 'Siemens Digital Innovation Research Partnership',
    agency: 'Siemens AG — Corporate R&D',
    amount: '$150,000',
    matchScore: 79,
    deadline: '2024-12-05',
    category: 'Industry',
    tags: ['Digital Twins', 'Industrial IoT', 'Simulation'],
    aiReason:
      'Recommended because it closely matches your research interests in simulation and digital twin technology. Industry co-funding may complement your existing ANRF grant.',
  },
  {
    id: 'eu-horizon-2024',
    title: 'EU Horizon Europe — ERC Starting Grant',
    agency: 'European Research Council (ERC)',
    amount: '$1,500,000',
    matchScore: 74,
    deadline: '2025-01-12',
    category: 'International',
    tags: ['Frontier Research', 'Open Science', 'Multidisciplinary'],
    aiReason:
      'High-value flagship grant. Your research outputs and citation impact score are within the eligibility range. Recommended as a stretch application with strong ROI potential.',
  },
]

// ─── Enriched data: whyMatched + priority added to each grant ─────────────────
const ENRICHED_GRANTS = [
  {
    ...MOCK_GRANTS[0],
    whyMatched:
      'Your 12 publications in computational genomics and ML-based protein structure prediction directly satisfy NSF’s stated priority on AI-driven biological integration. Institutional eligibility confirmed. Keyword overlap score: 96%.',
    priority: 'High',
  },
  {
    ...MOCK_GRANTS[1],
    whyMatched:
      'Brain imaging AI is the core focus of this award, matching your three most-cited papers. Your career stage (early-career researcher) satisfies the eligibility window for the Discovery Award. Grant history: 0 disqualifying conflicts.',
    priority: 'High',
  },
  {
    ...MOCK_GRANTS[2],
    whyMatched:
      'Your remote sensing datasets and climate modelling collaborations align with ANRF’s sustainability mandate. Strong geographical eligibility as an Indian-affiliated institution researcher. Keyword overlap score: 88%.',
    priority: 'High',
  },
  {
    ...MOCK_GRANTS[3],
    whyMatched:
      'UKRI’s accelerator explicitly targets AI applied to drug discovery and life sciences — both active threads in your publication record. Moderate overlap with industrial application requirements. Keyword overlap score: 85%.',
    priority: 'Medium',
  },
  {
    ...MOCK_GRANTS[4],
    whyMatched:
      'Moderate match — your simulation work overlaps with Digital Twins, but the industrial IoT component is less represented in your profile. Strong fit for the industry co-funding structure with your existing ANRF collaboration.',
    priority: 'Medium',
  },
  {
    ...MOCK_GRANTS[5],
    whyMatched:
      'Stretch application with high upside. Citation h-index meets the minimum threshold. Multidisciplinary scope gives your diverse research portfolio an advantage over narrower applicants. Keyword overlap score: 74%.',
    priority: 'Low',
  },
]

// ─── Priority badge styles ────────────────────────────────────────────────────
const PRIORITY_CONFIG = {
  High:   { bg: 'bg-emerald-500/12', border: 'border-emerald-500/25', text: 'text-emerald-300', dot: 'bg-emerald-400', label: 'High Priority'   },
  Medium: { bg: 'bg-amber-500/12',   border: 'border-amber-500/25',   text: 'text-amber-300',   dot: 'bg-amber-400',   label: 'Medium Priority' },
  Low:    { bg: 'bg-white/[0.04]',   border: 'border-white/8',         text: 'text-white/35',    dot: 'bg-white/25',    label: 'Low Priority'    },
}

// ─── Enriched card wrapper ────────────────────────────────────────────────────
// Wraps GrantCard with a priority+match header bar on top and
// a "Why Matched" explanation strip on the bottom.
function EnrichedGrantCard({ grant, index }) {
  const { priority, whyMatched, matchScore } = grant
  const pc = PRIORITY_CONFIG[priority] ?? PRIORITY_CONFIG.Low

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      {/* ── Priority + Match Score header bar ────────────────────────────── */}
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-t-2xl border-t border-x ${pc.border} ${pc.bg}`}
      >
        {/* Priority indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pc.dot} opacity-60`} />
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${pc.dot}`} />
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${pc.text}`}>
            {pc.label}
          </span>
        </div>

        {/* Match score pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10">
          <span className="text-[10px] text-white/25 font-medium">AI Match</span>
          <span
            className={`text-xs font-extrabold tabular-nums ${
              matchScore >= 90 ? 'text-emerald-400' :
              matchScore >= 75 ? 'text-blue-400'    :
              'text-amber-400'
            }`}
          >
            {matchScore}%
          </span>
        </div>
      </div>

      {/* ── GrantCard — rendered with top corners removed ────────────────── */}
      <div className="[&>article]:rounded-t-none [&>article]:border-t-0">
        <GrantCard grant={grant} index={0} />
      </div>

      {/* ── Why Matched strip ─────────────────────────────────────────────── */}
      <div className="px-4 py-3 rounded-b-2xl bg-white/[0.02] border-b border-x border-white/[0.06]">
        <div className="flex items-start gap-2">
          <span className="flex-shrink-0 mt-0.5 text-[9px] font-extrabold tracking-widest text-brand-400 uppercase">
            Why
          </span>
          <p className="text-[11px] text-white/45 leading-relaxed">{whyMatched}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section divider ─────────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-2">
      <div className="h-px w-48 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Recommendations() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [query,        setQuery]        = useState('')

  const filtered = useMemo(() => {
    let list = ENRICHED_GRANTS
    if (activeFilter !== 'All') {
      list = list.filter((g) => g.category === activeFilter)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.agency.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q)),
      )
    }
    return list
  }, [activeFilter, query])

  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans">
      {/* Background glow blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full bg-brand-600/10 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-600/8 blur-[120px]" />
        <div className="absolute top-1/2 left-1/5 w-[280px] h-[280px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <RecommendationHeader total={ENRICHED_GRANTS.length} />

        <SectionDivider />

        {/* Filter bar */}
        <div className="mt-8">
          <FilterBar
            active={activeFilter}
            onFilter={setActiveFilter}
            query={query}
            onSearch={setQuery}
          />
        </div>

        {/* Result count */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 && (
            <motion.p
              key="count"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-white/25 mb-6 font-medium"
            >
              Showing <span className="text-white/50">{filtered.length}</span> of{' '}
              <span className="text-white/50">{ENRICHED_GRANTS.length}</span> grants
              {activeFilter !== 'All' && (
                <> · <span className="text-brand-400">{activeFilter}</span></>
              )}
              {query && (
                <> · matching "<span className="text-brand-400">{query}</span>"</>
              )}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Cards grid or empty state */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`grid-${activeFilter}-${query}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {filtered.map((grant, i) => (
                <EnrichedGrantCard key={grant.id} grant={grant} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <EmptyState query={query} filter={activeFilter} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center text-xs text-white/20"
          >
            Rankings generated by GrantAI · 4 autonomous agents · Session #MC-2024-001
          </motion.div>
        )}
      </main>
    </div>
  )
}
