// MissionHeader.jsx — Top header with live system clock and OS-style metadata
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function LiveClock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const hh = String(time.getHours()).padStart(2, '0')
  const mm = String(time.getMinutes()).padStart(2, '0')
  const ss = String(time.getSeconds()).padStart(2, '0')

  return (
    <span className="font-mono text-xs text-white/40 tabular-nums">
      {hh}:{mm}:{ss} UTC
    </span>
  )
}

const PILLS = [
  { label: 'System', value: 'Operational', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  { label: 'Agents', value: '4 / 4 Active', color: 'text-brand-300 bg-brand-500/10 border-brand-500/20' },
  { label: 'Session', value: '#MC-2024-001', color: 'text-white/40 bg-white/5 border-white/10' },
]

export default function MissionHeader() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10"
    >
      {/* Top metadata bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        {/* Left: breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-white/25">
          <span onClick={() => navigate('/')} className="hover:text-white cursor-pointer transition-colors">GrantAI</span>
          <span>/</span>
          <span onClick={() => navigate('/mission-control')} className="text-white/45 hover:text-white cursor-pointer transition-colors">mission-control</span>
          <span>/</span>
          <span className="text-brand-400">session-001</span>
        </div>

        {/* Right: live clock + system pills */}
        <div className="flex items-center gap-3 flex-wrap">
          <LiveClock />
          {PILLS.map((p) => (
            <span
              key={p.label}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-semibold ${p.color}`}
            >
              <span className="text-white/30 font-normal">{p.label}:</span>
              {p.value}
            </span>
          ))}
        </div>
      </div>

      {/* Main heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">G</span>
            </div>
            <span className="text-xs font-semibold text-brand-400 tracking-widest uppercase">
              Mission Control
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white"
          >
            Mission Control
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-2 text-white/40 text-base font-light max-w-xl"
          >
            Monitor every AI agent as it discovers and evaluates research grants.
          </motion.p>
        </div>

        {/* Run indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20 flex-shrink-0"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <div>
            <div className="text-xs font-semibold text-emerald-300">Pipeline Running</div>
            <div className="text-[10px] text-white/30 mt-0.5">All 4 agents operational</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
