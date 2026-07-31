// GrantCard.jsx — Premium glassmorphism grant card
import { motion } from 'framer-motion'
import MatchScore from './MatchScore.jsx'

const categoryColors = {
  Government:    'bg-sky-500/15 border-sky-500/30 text-sky-300',
  Industry:      'bg-violet-500/15 border-violet-500/30 text-violet-300',
  International: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
}

const cardVariants = {
  hidden:  { opacity: 0, y: 36, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
}

function Tag({ label }) {
  return (
    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[11px] text-white/55 font-medium">
      {label}
    </span>
  )
}

export default function GrantCard({ grant, index }) {
  const {
    id,
    title,
    agency,
    amount,
    matchScore,
    deadline,
    category,
    tags = [],
    aiReason,
  } = grant

  const catStyle = categoryColors[category] ?? 'bg-white/5 border-white/10 text-white/50'

  /* deadline urgency */
  const daysLeft = Math.round(
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24),
  )
  const isUrgent  = daysLeft >= 0 && daysLeft <= 30
  const isPast    = daysLeft < 0
  const deadlineLabel = isPast
    ? 'Closed'
    : isUrgent
    ? `${daysLeft}d left`
    : new Date(deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <motion.article
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="group relative rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 backdrop-blur-md overflow-hidden transition-colors duration-300"
    >
      {/* Top accent bar */}
      <div
        className="h-px w-full opacity-60"
        style={{
          background: `linear-gradient(to right, ${
            matchScore >= 90 ? '#34d399, #10b981' :
            matchScore >= 75 ? '#60a5fa, #6366f1' :
            '#fbbf24, #f59e0b'
          })`,
        }}
      />

      {/* Hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.03] to-transparent" />

      <div className="relative z-10 p-5">
        {/* Top row: category + match score */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wide ${catStyle}`}>
            {category}
          </span>
          <MatchScore score={matchScore} size={56} />
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white leading-snug mb-1 group-hover:text-brand-200 transition-colors duration-200">
          {title}
        </h3>

        {/* Agency */}
        <div className="text-xs text-white/40 mb-4 font-medium">{agency}</div>

        {/* Funding + Deadline row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <span className="text-base">💰</span>
            <div>
              <div className="text-sm font-bold text-white">{amount}</div>
              <div className="text-[10px] text-white/30">Funding</div>
            </div>
          </div>

          <div className="h-8 w-px bg-white/8" />

          <div className="flex items-center gap-1.5">
            <span className="text-base">📅</span>
            <div>
              <div className={`text-sm font-bold ${isUrgent ? 'text-red-400' : isPast ? 'text-white/25' : 'text-white'}`}>
                {deadlineLabel}
              </div>
              <div className="text-[10px] text-white/30">Deadline</div>
            </div>
          </div>

          {isUrgent && (
            <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-[10px] font-semibold text-red-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
              </span>
              Urgent
            </span>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((t) => <Tag key={t} label={t} />)}
          </div>
        )}

        {/* AI reason */}
        <div className="rounded-xl bg-brand-500/[0.07] border border-brand-500/20 p-3 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-brand-400 text-sm flex-shrink-0 mt-0.5">✦</span>
            <p className="text-xs text-white/55 leading-relaxed">{aiReason}</p>
          </div>
        </div>

        {/* View details button */}
        <button
          id={`grant-view-${id}`}
          className="w-full py-2.5 rounded-xl text-xs font-semibold bg-white/[0.05] border border-white/10 text-white/60 hover:bg-brand-600/80 hover:border-brand-500/60 hover:text-white transition-all duration-200 group-hover:shadow-lg"
        >
          View Details →
        </button>
      </div>
    </motion.article>
  )
}
