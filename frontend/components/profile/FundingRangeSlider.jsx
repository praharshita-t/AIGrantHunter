// FundingRangeSlider.jsx — Dual-thumb range slider for min/max funding amount
import { motion } from 'framer-motion'

const MIN  = 0
const MAX  = 2000000
const STEP = 10000

function fmt(val) {
  if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
  if (val >= 1000)    return `$${(val / 1000).toFixed(0)}K`
  return `$${val}`
}

export default function FundingRangeSlider({ range, onChange }) {
  const [lo, hi] = range

  const setLo = (v) => {
    const val = Math.min(Number(v), hi - STEP)
    onChange([val, hi])
  }
  const setHi = (v) => {
    const val = Math.max(Number(v), lo + STEP)
    onChange([lo, val])
  }

  const leftPct  = ((lo - MIN) / (MAX - MIN)) * 100
  const rightPct = ((hi - MIN) / (MAX - MIN)) * 100

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/8 p-5">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm">💵</div>
        <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Funding Range</h2>
      </div>

      {/* Value display */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <div className="text-lg font-extrabold text-brand-300">{fmt(lo)}</div>
          <div className="text-[10px] text-white/30 mt-0.5">Minimum</div>
        </div>
        <div className="flex-1 mx-4 h-px bg-white/10" />
        <div className="text-center">
          <div className="text-lg font-extrabold text-emerald-300">{fmt(hi)}</div>
          <div className="text-[10px] text-white/30 mt-0.5">Maximum</div>
        </div>
      </div>

      {/* Track + thumbs */}
      <div className="relative h-6 flex items-center">
        {/* Full track */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-white/8" />

        {/* Active range fill */}
        <motion.div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-brand-500 to-emerald-500"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
          layout
          transition={{ duration: 0.05 }}
        />

        {/* Min thumb */}
        <input
          id="funding-min"
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={lo}
          onChange={(e) => setLo(e.target.value)}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
          style={{ pointerEvents: 'auto' }}
        />

        {/* Max thumb */}
        <input
          id="funding-max"
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={hi}
          onChange={(e) => setHi(e.target.value)}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* Visual thumb: min */}
        <div
          className="absolute w-5 h-5 rounded-full bg-brand-500 border-2 border-white shadow-lg z-10 pointer-events-none"
          style={{ left: `calc(${leftPct}% - 10px)` }}
        />
        {/* Visual thumb: max */}
        <div
          className="absolute w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-lg z-10 pointer-events-none"
          style={{ left: `calc(${rightPct}% - 10px)` }}
        />
      </div>

      {/* Tick labels */}
      <div className="flex justify-between mt-3 text-[10px] text-white/20">
        <span>$0</span>
        <span>$500K</span>
        <span>$1M</span>
        <span>$1.5M</span>
        <span>$2M+</span>
      </div>
    </div>
  )
}
