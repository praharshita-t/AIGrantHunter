// UploadZone.jsx — Drag-and-drop / click-to-upload file zone
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const UPLOAD_TYPES = [
  { id: 'cv',        label: 'CV',                icon: '👤', accept: '.pdf,.doc,.docx' },
  { id: 'resume',    label: 'Resume',            icon: '📄', accept: '.pdf,.doc,.docx' },
  { id: 'proposal',  label: 'Research Proposal', icon: '🔬', accept: '.pdf,.doc,.docx' },
  { id: 'pubs',      label: 'Publications',      icon: '📚', accept: '.pdf,.zip' },
]

function SingleZone({ type, file, onFile }) {
  const inputRef  = useRef(null)
  const [drag, setDrag] = useState(false)

  const handle = (f) => { if (f) onFile(type.id, f) }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]) }}
      className={`relative cursor-pointer rounded-xl border-2 border-dashed p-4 flex flex-col items-center gap-2 transition-all duration-200 text-center select-none
        ${drag  ? 'border-brand-400 bg-brand-500/10' : 'border-white/10 bg-white/[0.03] hover:border-brand-500/40 hover:bg-white/[0.05]'}`}
    >
      <span className="text-2xl">{type.icon}</span>
      <span className="text-xs font-semibold text-white/60">{type.label}</span>
      {file
        ? <span className="text-[10px] text-emerald-400 font-medium truncate max-w-full px-1">{file.name}</span>
        : <span className="text-[10px] text-white/25">Drop or click</span>
      }
      <input
        ref={inputRef}
        type="file"
        accept={type.accept}
        className="sr-only"
        onChange={(e) => handle(e.target.files[0])}
      />
      {file && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 text-emerald-400 text-xs"
        >✓</motion.span>
      )}
    </motion.div>
  )
}

export default function UploadZone({ files, onFile, onManual }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/8 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-lg bg-brand-500/20 flex items-center justify-center text-sm">📁</div>
        <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Upload Documents</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {UPLOAD_TYPES.map((t) => (
          <SingleZone key={t.id} type={t} file={files[t.id]} onFile={onFile} />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/8" />
        <span className="text-[11px] text-white/25 font-medium">or</span>
        <div className="flex-1 h-px bg-white/8" />
      </div>

      <button
        id="manual-entry-toggle"
        onClick={onManual}
        className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold border border-white/10 bg-white/[0.03] text-white/50 hover:bg-white/[0.07] hover:text-white transition-all duration-200"
      >
        ✏️ Manually Enter Profile
      </button>
    </div>
  )
}
