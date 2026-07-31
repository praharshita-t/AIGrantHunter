// MissionControl.jsx — AI Operating System Mission Control Dashboard
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import MissionHeader from '../components/mission-control/MissionHeader.jsx'
import AgentCard from '../components/mission-control/AgentCard.jsx'

// ─── Updated Pipeline Stages (backend-aligned) ───────────────────────────────
const PIPELINE_STAGES = [
  {
    id: 'profile',
    label: 'Research Profile Received',
    sub: 'Input parsed and vectorised',
    icon: '👤',
    color: 'from-sky-500 to-blue-600',
    glow: 'rgba(14,165,233,0.4)',
  },
  {
    id: 'discovery',
    label: 'Grant Discovery Agent',
    sub: 'NSF · ANRF · UKRI · 50+ sources',
    icon: '🔭',
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.4)',
  },
  {
    id: 'matching',
    label: 'Matching Agent',
    sub: 'Semantic vector scoring',
    icon: '🎯',
    color: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.4)',
  },
  {
    id: 'planning',
    label: 'Planning Agent',
    sub: 'Proposal roadmap generated',
    icon: '🗂️',
    color: 'from-amber-500 to-orange-600',
    glow: 'rgba(245,158,11,0.4)',
  },
  {
    id: 'completed',
    label: 'Completed',
    sub: '15 grants ranked & delivered',
    icon: '✅',
    color: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.4)',
  },
]

// ─── Local Pipeline Flow (same design as WorkflowTimeline, updated stages) ───
function PipelineFlow() {
  const ref = useRef(null)
  const [active, setActive] = useState(-1)

  // Use IntersectionObserver to trigger once in view
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          let i = 0
          const step = () => {
            setActive(i)
            i++
            if (i < PIPELINE_STAGES.length) setTimeout(step, 420)
          }
          setTimeout(step, 200)
        }
      },
      { rootMargin: '-80px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center w-full max-w-sm mx-auto">
      {PIPELINE_STAGES.map((stage, i) => {
        const isDone    = active > i
        const isCurrent = active === i
        const isPending = active < i

        return (
          <div key={stage.id} className="relative flex flex-col items-center w-full">
            {/* Stage card */}
            <motion.div
              initial={{ opacity: 0.15, scale: 0.92 }}
              animate={
                isCurrent
                  ? { opacity: 1, scale: 1.02 }
                  : isDone
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0.18, scale: 0.94 }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div
                className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-400
                  ${isDone
                    ? 'bg-white/[0.05] border-white/15'
                    : isCurrent
                    ? 'bg-white/[0.07] border-white/20 shadow-xl'
                    : 'bg-white/[0.02] border-white/5'
                  }`}
                style={
                  isCurrent
                    ? { boxShadow: `0 0 24px ${stage.glow}, 0 4px 24px rgba(0,0,0,0.4)` }
                    : undefined
                }
              >
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-base flex-shrink-0 shadow-md transition-all duration-300
                    ${isPending ? 'opacity-30 grayscale' : 'opacity-100'}`}
                >
                  {stage.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold transition-colors duration-300 ${isPending ? 'text-white/25' : 'text-white'}`}>
                    {stage.label}
                  </div>
                  <div className={`text-[11px] transition-colors duration-300 ${isPending ? 'text-white/15' : 'text-white/40'}`}>
                    {stage.sub}
                  </div>
                </div>

                {/* State indicators */}
                <div className="flex-shrink-0">
                  {isCurrent && (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                  )}
                  {isDone && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="flex h-6 w-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 items-center justify-center"
                    >
                      <span className="text-emerald-400 text-[10px] font-bold">✓</span>
                    </motion.span>
                  )}
                  {isPending && (
                    <span className="h-2.5 w-2.5 rounded-full border border-white/15 inline-block" />
                  )}
                </div>
              </div>
            </motion.div>

            {/* Connector */}
            {i < PIPELINE_STAGES.length - 1 && (
              <div className="flex flex-col items-center my-1 h-7 relative">
                <div className="w-px h-full bg-white/8 absolute" />
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: isDone ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeIn' }}
                  style={{ originY: 0 }}
                  className={`w-px h-full absolute bg-gradient-to-b ${stage.color} opacity-70`}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Mock Data ──────────────────────────────────────────────────────────────

const AGENTS = [
  {
    id: 'discovery',
    name: 'Grant Discovery Agent',
    icon: '🔭',
    status: 'running',
    currentTask: 'Searching NSF, ANRF and UKRI',
    progress: 100,
    color: 'from-sky-500 to-blue-600',
    progressColor: 'from-sky-500 to-blue-500',
    metrics: [
      { value: '2,418', label: 'Scanned' },
      { value: '50+', label: 'DBs' },
      { value: '38s', label: 'Runtime' },
    ],
    log: [
      { time: '09:41:02', msg: 'Connected to NSF grants API' },
      { time: '09:41:18', msg: 'Fetched 842 results from ANRF' },
      { time: '09:41:44', msg: 'UKRI index complete — 1,576 records' },
    ],
  },
  {
    id: 'extraction',
    name: 'Extraction Agent',
    icon: '⚙️',
    status: 'running',
    currentTask: 'Reading grant webpages',
    progress: 100,
    color: 'from-violet-500 to-purple-600',
    progressColor: 'from-violet-500 to-purple-500',
    metrics: [
      { value: '2,418', label: 'Parsed' },
      { value: '97%', label: 'Success' },
      { value: '12s', label: 'Runtime' },
    ],
    log: [
      { time: '09:41:46', msg: 'Extracting eligibility criteria' },
      { time: '09:41:59', msg: 'Parsing deadline fields — 2,418 records' },
      { time: '09:42:07', msg: 'Normalization pipeline complete' },
    ],
  },
  {
    id: 'matching',
    name: 'Matching Agent',
    icon: '🎯',
    status: 'running',
    currentTask: 'Computing similarity scores',
    progress: 100,
    color: 'from-emerald-500 to-teal-600',
    progressColor: 'from-emerald-500 to-teal-500',
    metrics: [
      { value: '91%', label: 'Avg Match' },
      { value: '15', label: 'Top Grants' },
      { value: '8s', label: 'Runtime' },
    ],
    log: [
      { time: '09:42:09', msg: 'Embedding research profile vector' },
      { time: '09:42:14', msg: 'Computing cosine similarity — batch 1/4' },
      { time: '09:42:17', msg: 'Ranked top-15 grants by fit score' },
    ],
  },
  {
    id: 'planning',
    name: 'Planning Agent',
    icon: '🗂️',
    status: 'running',
    currentTask: 'Generating proposal roadmap',
    progress: 100,
    color: 'from-amber-500 to-orange-600',
    progressColor: 'from-amber-500 to-orange-500',
    metrics: [
      { value: '15', label: 'Plans' },
      { value: '3', label: 'Deadlines' },
      { value: '5s', label: 'Runtime' },
    ],
    log: [
      { time: '09:42:19', msg: 'Generating timeline for NSF-2024-BIO' },
      { time: '09:42:22', msg: 'Flagged 3 upcoming deadlines < 30 days' },
      { time: '09:42:24', msg: 'Roadmap export ready' },
    ],
  },
]

const SUMMARY_STATS = [
  {
    id: 'grants',
    value: '15',
    unit: 'Grants Found',
    icon: '🏆',
    color: 'from-brand-500/20 to-purple-600/10',
    border: 'border-brand-500/20',
    valueColor: 'text-brand-300',
  },
  {
    id: 'match',
    value: '91%',
    unit: 'Average Match',
    icon: '🎯',
    color: 'from-emerald-500/20 to-teal-600/10',
    border: 'border-emerald-500/20',
    valueColor: 'text-emerald-300',
  },
  {
    id: 'funding',
    value: '$2.3M',
    unit: 'Funding Available',
    icon: '💰',
    color: 'from-amber-500/20 to-orange-600/10',
    border: 'border-amber-500/20',
    valueColor: 'text-amber-300',
  },
  {
    id: 'deadlines',
    value: '3',
    unit: 'Upcoming Deadlines',
    icon: '⏰',
    color: 'from-red-500/20 to-rose-600/10',
    border: 'border-red-500/20',
    valueColor: 'text-red-300',
  },
]

// ─── Summary Card ────────────────────────────────────────────────────────────
function SummaryCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md"
    >
      {/* Top accent */}
      <div className="h-px w-full bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 opacity-70" />

      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Run Summary · Session #MC-2024-001
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SUMMARY_STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.08 }}
              className={`relative rounded-xl p-4 bg-gradient-to-br ${stat.color} border ${stat.border} overflow-hidden group`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`text-3xl font-extrabold tracking-tight ${stat.valueColor}`}>
                {stat.value}
              </div>
              <div className="text-[11px] text-white/40 mt-1 font-medium leading-tight">
                {stat.unit}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section heading ─────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      <span className="text-[10px] font-semibold tracking-widest text-white/25 uppercase flex-shrink-0">
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-white/10 to-transparent" />
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function MissionControl() {
  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand-600/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <MissionHeader />

        {/* Agent Cards */}
        <section className="mb-14">
          <SectionLabel>Active Agents</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {AGENTS.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
        </section>

        {/* Workflow + Summary layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start mb-14">
          {/* Workflow Timeline */}
          <section>
            <SectionLabel>Pipeline Flow</SectionLabel>
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-md p-6">
              <PipelineFlow />
            </div>
          </section>

          {/* Right panel: agent log feed */}
          <section>
            <SectionLabel>Live Agent Log</SectionLabel>
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-md p-5 font-mono text-xs space-y-1 max-h-[480px] overflow-y-auto">
              {[
                { time: '09:41:02', agent: 'discovery', level: 'INFO', msg: 'Agent initialised. Connecting to grant databases...' },
                { time: '09:41:04', agent: 'discovery', level: 'INFO', msg: 'Connected to NSF grants API — 842 records fetched' },
                { time: '09:41:18', agent: 'discovery', level: 'INFO', msg: 'ANRF database indexed — 576 new grants' },
                { time: '09:41:44', agent: 'discovery', level: 'SUCCESS', msg: 'UKRI index complete. Total: 2,418 grants discovered' },
                { time: '09:41:46', agent: 'extraction', level: 'INFO', msg: 'Extraction pipeline started on 2,418 records' },
                { time: '09:41:52', agent: 'extraction', level: 'WARN', msg: '73 grants missing deadline field — flagged for review' },
                { time: '09:41:59', agent: 'extraction', level: 'INFO', msg: 'Eligibility parsing complete — 97% success rate' },
                { time: '09:42:07', agent: 'extraction', level: 'SUCCESS', msg: 'Normalisation pipeline complete' },
                { time: '09:42:09', agent: 'matching', level: 'INFO', msg: 'Embedding research profile into vector space...' },
                { time: '09:42:11', agent: 'matching', level: 'INFO', msg: 'Computing cosine similarity — batch 1/4' },
                { time: '09:42:14', agent: 'matching', level: 'INFO', msg: 'Batch 4/4 complete — scoring finalised' },
                { time: '09:42:17', agent: 'matching', level: 'SUCCESS', msg: 'Top-15 grants ranked. Avg match score: 91%' },
                { time: '09:42:19', agent: 'planning', level: 'INFO', msg: 'Generating proposal roadmap for NSF-2024-BIO' },
                { time: '09:42:22', agent: 'planning', level: 'WARN', msg: '3 grants have deadlines within 30 days — priority flagged' },
                { time: '09:42:24', agent: 'planning', level: 'SUCCESS', msg: 'All 15 roadmaps generated. Pipeline complete ✓' },
              ].map((entry, i) => {
                const agentColors = {
                  discovery: 'text-sky-400',
                  extraction: 'text-violet-400',
                  matching: 'text-emerald-400',
                  planning: 'text-amber-400',
                }
                const levelColors = {
                  INFO: 'text-white/30',
                  WARN: 'text-amber-400',
                  SUCCESS: 'text-emerald-400',
                  ERROR: 'text-red-400',
                }
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex items-start gap-2 py-0.5 border-b border-white/[0.03] last:border-0"
                  >
                    <span className="text-white/20 flex-shrink-0 tabular-nums">{entry.time}</span>
                    <span className={`flex-shrink-0 w-20 truncate ${agentColors[entry.agent]}`}>
                      [{entry.agent}]
                    </span>
                    <span className={`flex-shrink-0 w-14 ${levelColors[entry.level]}`}>
                      {entry.level}
                    </span>
                    <span className="text-white/55 break-all">{entry.msg}</span>
                  </motion.div>
                )
              })}
            </div>
          </section>
        </div>

        {/* Summary Card */}
        <section>
          <SectionLabel>Run Summary</SectionLabel>
          <SummaryCard />
        </section>
      </main>
    </div>
  )
}
