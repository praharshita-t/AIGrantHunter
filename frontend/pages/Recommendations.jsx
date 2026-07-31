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
      'Recommended because your remote sensing and satellite data analytics background directly addresses the fund's core research mandate on climate modelling.',
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
    let list = MOCK_GRANTS
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
        <RecommendationHeader total={MOCK_GRANTS.length} />

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
              <span className="text-white/50">{MOCK_GRANTS.length}</span> grants
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
                <GrantCard key={grant.id} grant={grant} index={i} />
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
