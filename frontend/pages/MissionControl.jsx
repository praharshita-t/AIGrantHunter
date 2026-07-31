import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MissionHeader from '../components/mission-control/MissionHeader.jsx'
import AgentCard from '../components/mission-control/AgentCard.jsx'
import { generateDemoMatches } from '../services/demoRecommendationService.js'

// ─────────────────────────────────────────────────────────────────────────────
// DEMO MODE FLAG
// Set to true for a realistic 7-second scripted pipeline (no backend needed).
// Set to false to use the real streaming backend (Featherless AI).
// ─────────────────────────────────────────────────────────────────────────────
const DEMO_MODE = true

// ─── Pipeline stage definitions ───────────────────────────────────────────────
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
    id: 'extraction',
    label: 'Extraction Agent',
    sub: 'Parsing titles, funding & eligibility',
    icon: '⚙️',
    color: 'from-sky-500 to-blue-600',
    glow: 'rgba(14,165,233,0.4)',
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
    sub: 'All agents completed execution',
    icon: '✅',
    color: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.4)',
  },
]

// ─── Mock recommendations (demo data) ────────────────────────────────────────
const DEMO_MATCHES = [
  {
    id: 'demo_01',
    title: 'ANRF Early Career Research Grant',
    agency: 'ANRF',
    funding: '₹75,00,000',
    amount: '₹75,00,000',
    matchScore: 94,
    deadline: '2026-10-15',
    category: 'Top Recommended',
    country: 'India',
    tags: ['AI / ML', 'Healthcare', 'Early Career'],
    aiReason: 'Strong alignment with your AI and Healthcare research profile. ANRF prioritises interdisciplinary early career researchers.',
    whyMatched: 'Strong alignment with your AI and Healthcare research profile. ANRF prioritises interdisciplinary early career researchers.',
    priority: 'High',
  },
  {
    id: 'demo_02',
    title: 'NSF Smart Health Initiative',
    agency: 'NSF',
    funding: '$850,000',
    amount: '$850,000',
    matchScore: 91,
    deadline: '2026-12-30',
    category: 'Top Recommended',
    country: 'USA',
    tags: ['Digital Health', 'Machine Learning', 'NSF'],
    aiReason: 'Your research interests closely match digital health and machine learning focus areas of this NSF call.',
    whyMatched: 'Your research interests closely match digital health and machine learning focus areas of this NSF call.',
    priority: 'High',
  },
  {
    id: 'demo_03',
    title: 'UKRI Responsible AI Programme',
    agency: 'UKRI',
    funding: '£150,000',
    amount: '£150,000',
    matchScore: 87,
    deadline: '2026-11-30',
    category: 'Good Fit',
    country: 'United Kingdom',
    tags: ['Responsible AI', 'Ethics', 'UKRI'],
    aiReason: 'Suitable interdisciplinary funding opportunity covering AI ethics and safety — well aligned with your research keywords.',
    whyMatched: 'Suitable interdisciplinary funding opportunity covering AI ethics and safety — well aligned with your research keywords.',
    priority: 'High',
  },
  {
    id: 'demo_04',
    title: 'DST-SERB Core Research Grant',
    agency: 'DST-SERB',
    funding: '₹50,00,000',
    amount: '₹50,00,000',
    matchScore: 83,
    deadline: '2026-09-30',
    category: 'Good Fit',
    country: 'India',
    tags: ['Core Research', 'DST', 'Science'],
    aiReason: 'Good match for researchers with a strong publication record and focus on applied sciences.',
    whyMatched: 'Good match for researchers with a strong publication record and focus on applied sciences.',
    priority: 'Medium',
  },
  {
    id: 'demo_05',
    title: 'Horizon Europe ERC Starting Grant',
    agency: 'ERC',
    funding: '€1,500,000',
    amount: '€1,500,000',
    matchScore: 79,
    deadline: '2027-03-15',
    category: 'Stretch Opportunity',
    country: 'European Union',
    tags: ['ERC', 'Frontier Research', 'Europe'],
    aiReason: 'Ambitious grant for frontier research. Your profile is a partial match — consider collaborating with a European institution.',
    whyMatched: 'Ambitious grant for frontier research. Your profile is a partial match — consider collaborating with a European institution.',
    priority: 'Medium',
  },
]

// ─── Pipeline Flow component ──────────────────────────────────────────────────
function PipelineFlow({ active }) {
  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      {PIPELINE_STAGES.map((stage, i) => {
        const isDone    = active > i
        const isCurrent = active === i
        const isPending = active < i

        return (
          <div key={stage.id} className="relative flex flex-col items-center w-full">
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
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-base flex-shrink-0 shadow-md transition-all duration-300
                    ${isPending ? 'opacity-30 grayscale' : 'opacity-100'}`}
                >
                  {stage.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold transition-colors duration-300 ${isPending ? 'text-white/25' : 'text-white'}`}>
                    {stage.label}
                  </div>
                  <div className={`text-[11px] transition-colors duration-300 ${isPending ? 'text-white/15' : 'text-white/40'}`}>
                    {stage.sub}
                  </div>
                </div>

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

// ─── Summary Card ─────────────────────────────────────────────────────────────
function SummaryCard({ stats }) {
  const displayStats = [
    {
      id: 'grants',
      value: stats.grantsFound.toString(),
      unit: 'Grants Found',
      icon: '🏆',
      color: 'from-brand-500/20 to-purple-600/10',
      border: 'border-brand-500/20',
      valueColor: 'text-brand-300',
    },
    {
      id: 'match',
      value: `${stats.avgMatch}%`,
      unit: 'Average Match',
      icon: '🎯',
      color: 'from-emerald-500/20 to-teal-600/10',
      border: 'border-emerald-500/20',
      valueColor: 'text-emerald-300',
    },
    {
      id: 'funding',
      value: stats.funding,
      unit: 'Top Funding',
      icon: '💰',
      color: 'from-amber-500/20 to-orange-600/10',
      border: 'border-amber-500/20',
      valueColor: 'text-amber-300',
    },
    {
      id: 'priority',
      value: stats.highPriority.toString(),
      unit: 'High Priority',
      icon: '⏰',
      color: 'from-red-500/20 to-rose-600/10',
      border: 'border-red-500/20',
      valueColor: 'text-red-300',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-md"
    >
      <div className="h-px w-full bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 opacity-70" />

      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">
            Run Summary · Session #MC-2026-001
            {DEMO_MODE && <span className="ml-2 text-amber-400/60">[DEMO]</span>}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {displayStats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
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

// ─── Section heading ──────────────────────────────────────────────────────────
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MissionControl() {
  const navigate = useNavigate()
  const logEndRef = useRef(null)

  // Pipeline step: 0=profile, 1=discovery, 2=extraction, 3=matching, 4=planning, 5=completed
  const [activeStep, setActiveStep] = useState(0)
  const [logs, setLogs] = useState([])
  const [finished, setFinished] = useState(false)
  const [agentsProgress, setAgentsProgress] = useState({
    discovery: 0,
    extraction: 0,
    matching: 0,
    planning: 0,
  })
  const [stats, setStats] = useState({
    grantsFound: 0,
    avgMatch: 0,
    funding: '—',
    highPriority: 0,
  })

  // Dynamic agent card metrics (updated per stage)
  const [agentMetrics, setAgentMetrics] = useState({
    discovery:  { value1: '—',   label1: 'Discovered', value2: '—',    label2: 'Sources',    value3: '—',   label3: 'Runtime', task: 'Pending' },
    extraction: { value1: '—',   label1: 'Parsed',     value2: '—',    label2: 'Normalized', value3: '—',   label3: 'Runtime', task: 'Pending' },
    matching:   { value1: '—',   label1: 'Best Match', value2: '—',    label2: 'Scored',     value3: '—',   label3: 'Runtime', task: 'Pending' },
    planning:   { value1: '—',   label1: 'Tasks',      value2: '—',    label2: 'Priority',   value3: '—',   label3: 'Runtime', task: 'Pending' },
  })

  const addLog = (agent, level, msg) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false })
    setLogs((prev) => [...prev, { time, agent, level, msg }])
  }

  // Auto-scroll log to bottom
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  useEffect(() => {
    const saved = localStorage.getItem('pendingProfileAnalysis')
    if (!saved) {
      addLog('system', 'INFO', 'No pending profile found — loading cached data.')
      setFinished(true)
      setActiveStep(5)
      setStats({ grantsFound: 24, avgMatch: 88, funding: '₹75,00,000', highPriority: 2 })
      return
    }

    const payload = JSON.parse(saved)
    addLog('profile', 'SUCCESS', `Profile received for ${payload.name || 'Researcher'}.`)
    addLog('profile', 'INFO', 'Starting autonomous agent pipeline…')

    if (DEMO_MODE) {
      runDemoPipeline(payload)
    } else {
      runRealPipeline(payload)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ─── DEMO PIPELINE ──────────────────────────────────────────────────────────
  async function runDemoPipeline(payload) {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms))
    const logDelay = 280  // ms between each log line

    try {
      // ── Stage 1: Discovery ────────────────────────────────────────────────
      setActiveStep(1)
      setAgentMetrics((m) => ({
        ...m,
        discovery: { ...m.discovery, task: 'Searching 3 portals…' },
      }))

      const discoveryLogs = [
        ['discovery', 'INFO',    'Connecting to NSF portal…'],
        ['discovery', 'INFO',    'Found 12 active grants'],
        ['discovery', 'INFO',    'Connecting to ANRF portal…'],
        ['discovery', 'INFO',    'Found 7 active grants'],
        ['discovery', 'INFO',    'Connecting to UKRI portal…'],
        ['discovery', 'INFO',    'Found 5 active grants'],
        ['discovery', 'SUCCESS', '✓ 24 grants discovered'],
      ]
      for (const [agent, level, msg] of discoveryLogs) {
        await delay(logDelay)
        addLog(agent, level, msg)
        setAgentsProgress((p) => ({ ...p, discovery: Math.min((p.discovery || 0) + 14, 100) }))
      }
      setAgentsProgress((p) => ({ ...p, discovery: 100 }))
      setAgentMetrics((m) => ({
        ...m,
        discovery: { value1: '24', label1: 'Discovered', value2: '3', label2: 'Sources', value3: '1.5s', label3: 'Runtime', task: 'Complete' },
      }))

      await delay(300)

      // ── Stage 2: Extraction ───────────────────────────────────────────────
      setActiveStep(2)
      setAgentMetrics((m) => ({
        ...m,
        extraction: { ...m.extraction, task: 'Parsing 24 grants…' },
      }))

      const extractionLogs = [
        ['extraction', 'INFO',    'Extracting titles…'],
        ['extraction', 'INFO',    'Funding parsed'],
        ['extraction', 'INFO',    'Deadlines standardized'],
        ['extraction', 'INFO',    'Eligibility mapped'],
        ['extraction', 'INFO',    'Research areas classified'],
        ['extraction', 'SUCCESS', '✓ 24 grants normalized'],
      ]
      for (const [agent, level, msg] of extractionLogs) {
        await delay(logDelay)
        addLog(agent, level, msg)
        setAgentsProgress((p) => ({ ...p, extraction: Math.min((p.extraction || 0) + 17, 100) }))
      }
      setAgentsProgress((p) => ({ ...p, extraction: 100 }))
      setAgentMetrics((m) => ({
        ...m,
        extraction: { value1: '24', label1: 'Parsed', value2: '100%', label2: 'Normalized', value3: '1.5s', label3: 'Runtime', task: 'Complete' },
      }))

      await delay(300)

      // ── Stage 3: Matching ─────────────────────────────────────────────────
      setActiveStep(3)
      setAgentMetrics((m) => ({
        ...m,
        matching: { ...m.matching, task: 'Computing similarity…' },
      }))

      const matchingLogs = [
        ['matching', 'INFO',    'Profile embedding created'],
        ['matching', 'INFO',    'Comparing with 24 grants'],
        ['matching', 'INFO',    'Calculating similarity scores'],
        ['matching', 'INFO',    'Top grant confidence: 94%'],
        ['matching', 'SUCCESS', '✓ Ranking complete'],
      ]
      for (const [agent, level, msg] of matchingLogs) {
        await delay(logDelay)
        addLog(agent, level, msg)
        setAgentsProgress((p) => ({ ...p, matching: Math.min((p.matching || 0) + 20, 100) }))
      }
      setAgentsProgress((p) => ({ ...p, matching: 100 }))
      setAgentMetrics((m) => ({
        ...m,
        matching: { value1: '94%', label1: 'Best Match', value2: '24', label2: 'Scored', value3: '2s', label3: 'Runtime', task: 'Complete' },
      }))

      await delay(300)

      // ── Stage 4: Planning ─────────────────────────────────────────────────
      setActiveStep(4)
      setAgentMetrics((m) => ({
        ...m,
        planning: { ...m.planning, task: 'Generating roadmap…' },
      }))

      const planningLogs = [
        ['planning', 'INFO',    'Generating AI summary'],
        ['planning', 'INFO',    'Creating application roadmap'],
        ['planning', 'INFO',    'Preparing eligibility explanation'],
        ['planning', 'SUCCESS', '✓ Recommendations ready'],
      ]
      for (const [agent, level, msg] of planningLogs) {
        await delay(logDelay)
        addLog(agent, level, msg)
        setAgentsProgress((p) => ({ ...p, planning: Math.min((p.planning || 0) + 25, 100) }))
      }
      setAgentsProgress((p) => ({ ...p, planning: 100 }))
      setAgentMetrics((m) => ({
        ...m,
        planning: { value1: '6', label1: 'Tasks', value2: '2 High', label2: 'Priority', value3: '3s', label3: 'Runtime', task: 'Complete' },
      }))

      // ── Finalise ──────────────────────────────────────────────────────────
      // Write dynamic mock matches based on user profile selections to localStorage
      const dynamicMatches = generateDemoMatches(payload)
      localStorage.setItem('matches', JSON.stringify(dynamicMatches))

      // Write planner tasks
      const topMatch = dynamicMatches[0]
      const plannerTasks = [
        `Review eligibility guidelines for ${topMatch.title}`,
        'Draft research proposal aligned with your profile',
        'Request support letters from collaborating institutions',
        `Formulate budget justification for ${topMatch.funding}`,
        'Prepare CV and publication list',
        `Final review and submit to ${topMatch.agency}`,
      ].map((item, i) => ({
        id: `task_${i}`,
        title: item,
        grantRef: topMatch.title,
        status: i === 0 ? 'done' : i < 3 ? 'in_progress' : 'todo',
        priority: 'high',
        category: `Milestone ${i + 1}`,
        dueDate: topMatch.deadline,
        description: item,
        subtasks: [
          { id: `sub_${i}_1`, title: 'Prepare draft', completed: i === 0 },
          { id: `sub_${i}_2`, title: 'Get review', completed: false },
        ],
      }))
      localStorage.setItem('plannerTasks', JSON.stringify(plannerTasks))

      const avgScore = Math.round(
        dynamicMatches.reduce((s, m) => s + m.matchScore, 0) / dynamicMatches.length
      )

      setStats({
        grantsFound: dynamicMatches.length,
        avgMatch: avgScore,
        funding: topMatch.funding,
        highPriority: dynamicMatches.filter((m) => m.category === 'Top Recommended' || m.priority === 'High').length,
      })

      await delay(300)
      addLog('system', 'SUCCESS', 'Pipeline execution complete ✓ Ranked recommendations ready.')
      setActiveStep(5)
      setFinished(true)
      localStorage.removeItem('pendingProfileAnalysis')
    } catch (err) {
      addLog('system', 'ERROR', `Demo pipeline error: ${err.message}`)
      setActiveStep(5)
      setFinished(true)
    }
  }

  // ─── REAL PIPELINE (backend streaming) ──────────────────────────────────────
  async function runRealPipeline(payload) {
    try {
      const response = await fetch('/api/pipeline/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) throw new Error(`Pipeline failed: ${response.status}`)

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = ''

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          const clean = line.trim()
          if (!clean.startsWith('data:')) continue
          const dataStr = clean.substring(5).trim()
          if (!dataStr) continue
          try {
            const event = JSON.parse(dataStr)
            if (event.event === 'log') {
              addLog(event.stage, event.level, event.message)
            } else if (event.event === 'progress') {
              const stageMap = { profile: 0, discovery: 1, extraction: 2, matching: 3, planning: 4 }
              if (stageMap[event.stage] !== undefined) setActiveStep(stageMap[event.stage])
              setAgentsProgress((p) => ({ ...p, [event.stage]: event.progress }))
            } else if (event.event === 'summary') {
              setStats({
                grantsFound: event.stats.grantsFound,
                avgMatch: event.stats.avgMatch,
                funding: event.stats.funding,
                highPriority: event.stats.highPriority || 0,
              })
              localStorage.setItem('matches', JSON.stringify(event.matches))
            } else if (event.event === 'complete') {
              setActiveStep(5)
              setFinished(true)
              addLog('system', 'SUCCESS', 'Pipeline execution complete ✓ Recommendations ready.')
              localStorage.removeItem('pendingProfileAnalysis')
            }
          } catch (e) {
            console.error('Parse error:', e)
          }
        }
      }
    } catch (err) {
      addLog('system', 'ERROR', `Pipeline error: ${err.message}`)
      setActiveStep(5)
      setFinished(true)
    }
  }

  // ─── Agent cards ──────────────────────────────────────────────────────────
  const displayAgents = [
    {
      id: 'discovery',
      name: 'Grant Discovery Agent',
      icon: '🔭',
      status: activeStep === 1 ? 'running' : activeStep > 1 ? 'completed' : 'idle',
      currentTask: agentMetrics.discovery.task,
      progress: agentsProgress.discovery,
      color: 'from-sky-500 to-blue-600',
      progressColor: 'from-sky-500 to-blue-500',
      metrics: [
        { value: agentMetrics.discovery.value1, label: agentMetrics.discovery.label1 },
        { value: agentMetrics.discovery.value2, label: agentMetrics.discovery.label2 },
        { value: agentMetrics.discovery.value3, label: agentMetrics.discovery.label3 },
      ],
      log: [
        { time: '', msg: 'NSF · ANRF · UKRI portals' },
      ],
    },
    {
      id: 'extraction',
      name: 'Extraction Agent',
      icon: '⚙️',
      status: activeStep === 2 ? 'running' : activeStep > 2 ? 'completed' : 'idle',
      currentTask: agentMetrics.extraction.task,
      progress: agentsProgress.extraction,
      color: 'from-violet-500 to-purple-600',
      progressColor: 'from-violet-500 to-purple-500',
      metrics: [
        { value: agentMetrics.extraction.value1, label: agentMetrics.extraction.label1 },
        { value: agentMetrics.extraction.value2, label: agentMetrics.extraction.label2 },
        { value: agentMetrics.extraction.value3, label: agentMetrics.extraction.label3 },
      ],
      log: [
        { time: '', msg: 'Titles · Funding · Eligibility' },
      ],
    },
    {
      id: 'matching',
      name: 'Matching Agent',
      icon: '🎯',
      status: activeStep === 3 ? 'running' : activeStep > 3 ? 'completed' : 'idle',
      currentTask: agentMetrics.matching.task,
      progress: agentsProgress.matching,
      color: 'from-emerald-500 to-teal-600',
      progressColor: 'from-emerald-500 to-teal-500',
      metrics: [
        { value: agentMetrics.matching.value1, label: agentMetrics.matching.label1 },
        { value: agentMetrics.matching.value2, label: agentMetrics.matching.label2 },
        { value: agentMetrics.matching.value3, label: agentMetrics.matching.label3 },
      ],
      log: [
        { time: '', msg: 'Semantic vector scoring' },
      ],
    },
    {
      id: 'planning',
      name: 'Planning Agent',
      icon: '🗂️',
      status: activeStep === 4 ? 'running' : activeStep > 4 ? 'completed' : 'idle',
      currentTask: agentMetrics.planning.task,
      progress: agentsProgress.planning,
      color: 'from-amber-500 to-orange-600',
      progressColor: 'from-amber-500 to-orange-500',
      metrics: [
        { value: agentMetrics.planning.value1, label: agentMetrics.planning.label1 },
        { value: agentMetrics.planning.value2, label: agentMetrics.planning.label2 },
        { value: agentMetrics.planning.value3, label: agentMetrics.planning.label3 },
      ],
      log: [
        { time: '', msg: 'Proposal roadmap & checklist' },
      ],
    },
  ]

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand-600/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MissionHeader />

        {/* Complete CTA banner */}
        <AnimatePresence>
          {finished && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 rounded-2xl border border-brand-500/30 bg-brand-500/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="text-left">
                <h4 className="text-lg font-bold text-white">Analysis Complete! 🚀</h4>
                <p className="text-sm text-white/60">
                  Matched you with {stats.grantsFound} grants · Avg score {stats.avgMatch}% · {stats.highPriority} high priority
                  {DEMO_MODE && <span className="ml-2 text-amber-400/60 text-xs">(demo mode)</span>}
                </p>
              </div>
              <button
                onClick={() => navigate('/recommendations')}
                className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold shadow-lg shadow-brand-500/20 transition-all active:scale-95"
              >
                View Recommendations →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agent Cards */}
        <section className="mb-14">
          <SectionLabel>Active Agents</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {displayAgents.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </div>
        </section>

        {/* Pipeline + Log */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 items-start mb-14">
          <section>
            <SectionLabel>Pipeline Flow</SectionLabel>
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-md p-6">
              <PipelineFlow active={activeStep} />
            </div>
          </section>

          <section>
            <SectionLabel>Live Agent Log</SectionLabel>
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-md p-5 font-mono text-xs space-y-1 max-h-[480px] overflow-y-auto">
              {logs.map((entry, i) => {
                const agentColors = {
                  profile:    'text-sky-400',
                  discovery:  'text-violet-400',
                  extraction: 'text-blue-400',
                  matching:   'text-emerald-400',
                  planning:   'text-amber-400',
                  system:     'text-gray-400',
                }
                const levelColors = {
                  INFO:    'text-white/30',
                  WARN:    'text-amber-400',
                  SUCCESS: 'text-emerald-400',
                  ERROR:   'text-red-400',
                }
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-2 py-0.5 border-b border-white/[0.03] last:border-0"
                  >
                    <span className="text-white/20 flex-shrink-0 tabular-nums">{entry.time}</span>
                    <span className={`flex-shrink-0 w-22 truncate ${agentColors[entry.agent] || 'text-white'}`}>
                      [{entry.agent}]
                    </span>
                    <span className={`flex-shrink-0 w-14 ${levelColors[entry.level]}`}>
                      {entry.level}
                    </span>
                    <span className="text-white/55 break-all">{entry.msg}</span>
                  </motion.div>
                )
              })}
              <div ref={logEndRef} />
            </div>
          </section>
        </div>

        {/* Summary */}
        <section>
          <SectionLabel>Run Summary</SectionLabel>
          <SummaryCard stats={stats} />
        </section>
      </main>
    </div>
  )
}
