// FundingRangeSlider.jsx — Country-aware dual-thumb range slider using reusable countryConfig
import { useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCountryConfig } from '../../config/countryConfig.js'

export default function FundingRangeSlider({ range, onChange, country }) {
  const cfg = useMemo(() => getCountryConfig(country), [country])

  // Reset range when country (and hence currency) changes
  useEffect(() => {
    onChange(cfg.defaultRange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country])

  const [lo, hi] = range
  const { min: MIN, max: MAX, step: STEP, fmt, ticks } = cfg

  const clampedLo = Math.min(Math.max(lo, MIN), MAX)
  const clampedHi = Math.min(Math.max(hi, MIN), MAX)

  const setLo = (v) => {
    const val = Math.min(Number(v), clampedHi - STEP)
    onChange([val, clampedHi])
  }
  const setHi = (v) => {
    const val = Math.max(Number(v), clampedLo + STEP)
    onChange([clampedLo, val])
  }

  const leftPct  = ((clampedLo - MIN) / (MAX - MIN)) * 100
  const rightPct = ((clampedHi - MIN) / (MAX - MIN)) * 100

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/8 p-5">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm">💵</div>
        <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Funding Range</h2>
        {country && (
          <span className="ml-auto text-[10px] text-white/20 font-mono tracking-widest">{cfg.symbol}</span>
        )}
      </div>

      {/* Value display */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <div className="text-lg font-extrabold text-brand-300">{fmt(clampedLo)}</div>
          <div className="text-[10px] text-white/30 mt-0.5">Minimum</div>
        </div>
        <div className="flex-1 mx-4 h-px bg-white/10" />
        <div className="text-center">
          <div className="text-lg font-extrabold text-emerald-300">{fmt(clampedHi)}</div>
          <div className="text-[10px] text-white/30 mt-0.5">Maximum</div>
        </div>
      </div>

      {/* Track + thumbs */}
      <div className="relative h-6 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-white/8" />

        <motion.div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-brand-500 to-emerald-500"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
          layout
          transition={{ duration: 0.05 }}
        />

        <input
          id="funding-min"
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={clampedLo}
          onChange={(e) => setLo(e.target.value)}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
          style={{ pointerEvents: 'auto' }}
        />

        <input
          id="funding-max"
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={clampedHi}
          onChange={(e) => setHi(e.target.value)}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
        />

        <div
          className="absolute w-5 h-5 rounded-full bg-brand-500 border-2 border-white shadow-lg z-10 pointer-events-none"
          style={{ left: `calc(${leftPct}% - 10px)` }}
        />
        <div
          className="absolute w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-lg z-10 pointer-events-none"
          style={{ left: `calc(${rightPct}% - 10px)` }}
        />
      </div>

      {/* Tick labels */}
      <div className="flex justify-between mt-3 text-[10px] text-white/20">
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  )
}
