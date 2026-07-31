// MatchScore.jsx — Circular SVG progress ring with colour-coded score
import { motion } from 'framer-motion'

function scoreColor(score) {
  if (score >= 90) return { stroke: '#34d399', text: 'text-emerald-400', glow: 'rgba(52,211,153,0.5)' }
  if (score >= 75) return { stroke: '#60a5fa', text: 'text-blue-400',    glow: 'rgba(96,165,250,0.5)' }
  if (score >= 60) return { stroke: '#fbbf24', text: 'text-amber-400',   glow: 'rgba(251,191,36,0.5)' }
  return           { stroke: '#f87171', text: 'text-red-400',            glow: 'rgba(248,113,113,0.5)' }
}

export default function MatchScore({ score = 0, size = 64 }) {
  const radius   = (size - 8) / 2
  const circ     = 2 * Math.PI * radius
  const offset   = circ - (score / 100) * circ
  const { stroke, text, glow } = scoreColor(score)

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={4}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: `drop-shadow(0 0 6px ${glow})` }}
        />
      </svg>
      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-xs font-extrabold tabular-nums ${text}`}>{score}%</span>
      </div>
    </div>
  )
}
