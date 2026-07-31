// AnalyzeButton.jsx — CTA button that logs form data to console
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnalyzeButton({ onAnalyze }) {
  const [state, setState] = useState('idle') // idle | loading | done

  const handleClick = async () => {
    setState('loading')
    await new Promise((r) => setTimeout(r, 1800)) // simulate brief processing
    onAnalyze()
    setState('done')
    setTimeout(() => setState('idle'), 3000)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        id="analyze-profile-btn"
        type="button"
        onClick={handleClick}
        disabled={state === 'loading'}
        whileHover={state === 'idle' ? { scale: 1.03 } : {}}
        whileTap={state === 'idle' ? { scale: 0.97 } : {}}
        className={`relative w-full max-w-md py-4 rounded-2xl text-sm font-bold overflow-hidden transition-all duration-300
          ${state === 'done'
            ? 'bg-emerald-600 text-white'
            : 'bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-70'
          }`}
        style={state === 'idle' ? { boxShadow: '0 0 40px rgba(100,115,243,0.4)' } : {}}
      >
        {/* Shimmer on idle */}
        {state === 'idle' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'linear', repeatDelay: 1 }}
          />
        )}

        {/* Spinner on loading */}
        <AnimatePresence mode="wait">
          {state === 'loading' && (
            <motion.div
              key="spinner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Analyzing profile…
            </motion.div>
          )}

          {state === 'done' && (
            <motion.div
              key="done"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2"
            >
              <span>✓</span> Profile Analyzed!
            </motion.div>
          )}

          {state === 'idle' && (
            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              🔬 Analyze My Profile
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="text-[11px] text-white/20 text-center">
        Your data is processed locally — no information is sent to a server.
      </p>
    </div>
  )
}
