// KeywordInput.jsx — Chip-style tag input
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function KeywordInput({ keywords, onChange }) {
  const [input, setInput] = useState('')

  const add = () => {
    const val = input.trim()
    if (val && !keywords.includes(val)) {
      onChange([...keywords, val])
    }
    setInput('')
  }

  const remove = (kw) => onChange(keywords.filter((k) => k !== kw))

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add() }
    if (e.key === 'Backspace' && !input && keywords.length) {
      remove(keywords[keywords.length - 1])
    }
  }

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/8 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-teal-500/20 flex items-center justify-center text-sm">🏷️</div>
        <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Keywords</h2>
      </div>

      {/* Chip input area */}
      <div
        className="min-h-[52px] flex flex-wrap gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 focus-within:border-brand-500/40 transition-colors duration-200 cursor-text"
        onClick={() => document.getElementById('keyword-input')?.focus()}
      >
        <AnimatePresence>
          {keywords.map((kw) => (
            <motion.span
              key={kw}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-xs text-brand-200 font-medium"
            >
              {kw}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(kw) }}
                className="text-brand-400 hover:text-white transition-colors text-[10px] leading-none"
              >
                ✕
              </button>
            </motion.span>
          ))}
        </AnimatePresence>

        <input
          id="keyword-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          onBlur={add}
          placeholder={keywords.length === 0 ? 'Type a keyword and press Enter…' : ''}
          className="flex-1 min-w-[140px] bg-transparent text-sm text-white placeholder-white/25 outline-none"
        />
      </div>

      <p className="mt-2 text-[10px] text-white/20">
        Press <kbd className="px-1 py-0.5 rounded border border-white/10 bg-white/5 text-white/25">Enter</kbd> or <kbd className="px-1 py-0.5 rounded border border-white/10 bg-white/5 text-white/25">,</kbd> to add · <kbd className="px-1 py-0.5 rounded border border-white/10 bg-white/5 text-white/25">Backspace</kbd> to remove last
      </p>
    </div>
  )
}
