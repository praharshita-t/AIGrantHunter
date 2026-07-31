// EligibilitySection.jsx — Countries, domains, career level
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden:  { opacity: 0, y: 14 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } }),
}

function Tag({ label, color = 'bg-white/[0.06] border-white/10 text-white/55' }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${color}`}>
      {label}
    </span>
  )
}

export default function EligibilitySection({ eligibility, animIndex = 1 }) {
  return (
    <motion.div
      custom={animIndex}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="rounded-2xl bg-white/[0.04] border border-white/8 p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-brand-500/20 flex items-center justify-center text-sm">🌍</div>
        <h3 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Eligibility</h3>
      </div>

      {/* Countries */}
      <div className="mb-4">
        <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest mb-2">Eligible Countries</p>
        <div className="flex flex-wrap gap-1.5">
          {eligibility.countries.map((c) => (
            <Tag key={c} label={`🏳 ${c}`} color="bg-sky-500/10 border-sky-500/20 text-sky-300" />
          ))}
        </div>
      </div>

      {/* Research Domains */}
      <div className="mb-4">
        <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest mb-2">Research Domains</p>
        <div className="flex flex-wrap gap-1.5">
          {eligibility.domains.map((d) => (
            <Tag key={d} label={d} color="bg-violet-500/10 border-violet-500/20 text-violet-300" />
          ))}
        </div>
      </div>

      {/* Career Level */}
      <div>
        <p className="text-[10px] text-white/30 font-semibold uppercase tracking-widest mb-2">Career Level</p>
        <div className="flex flex-wrap gap-1.5">
          {eligibility.careerLevel.map((l) => (
            <Tag key={l} label={l} color="bg-amber-500/10 border-amber-500/20 text-amber-300" />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
