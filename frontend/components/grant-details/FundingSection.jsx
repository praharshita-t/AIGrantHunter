// FundingSection.jsx — Amount, Duration, Deadline details
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } }),
}

function FundingRow({ icon, label, value, highlight }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
      <div className="flex items-center gap-2.5 text-sm text-white/50">
        <span className="text-base">{icon}</span>
        {label}
      </div>
      <span className={`text-sm font-semibold ${highlight ? 'text-emerald-400' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}

export default function FundingSection({ funding, animIndex = 0 }) {
  return (
    <motion.div
      custom={animIndex}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="rounded-2xl bg-white/[0.04] border border-white/8 p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm">💰</div>
        <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Funding</h3>
      </div>
      <FundingRow icon="💵" label="Total Amount"   value={funding.amount}   highlight />
      <FundingRow icon="📆" label="Duration"        value={funding.duration} />
      <FundingRow icon="⏰" label="Application Deadline" value={funding.deadline} />
    </motion.div>
  )
}
