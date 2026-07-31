// PublicationUpload.jsx — PDF upload, Google Scholar link, or ORCID
import { useRef } from 'react'
import { motion } from 'framer-motion'

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder-white/25 outline-none focus:border-brand-500/50 focus:bg-white/[0.08] transition-all duration-200'

export default function PublicationUpload({ data, onChange }) {
  const fileRef = useRef(null)
  const set     = (key, val) => onChange({ ...data, [key]: val })

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/8 p-5">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-sm">📚</div>
        <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Publications</h2>
      </div>

      <div className="space-y-4">
        {/* PDF upload */}
        <div>
          <p className="text-[11px] text-white/35 font-semibold uppercase tracking-widest mb-2">Upload PDF</p>
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => fileRef.current?.click()}
            className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-dashed border-white/10 hover:border-brand-500/40 hover:bg-white/[0.05] transition-all duration-200"
          >
            <span className="text-xl">📄</span>
            <div className="flex-1 min-w-0">
              {data.file
                ? <span className="text-sm text-emerald-400 font-medium truncate block">{data.file.name}</span>
                : <span className="text-sm text-white/30">Click to upload publication list (PDF)</span>
              }
            </div>
            {data.file && <span className="text-emerald-400 text-sm flex-shrink-0">✓</span>}
          </motion.div>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf"
            className="sr-only"
            onChange={(e) => set('file', e.target.files[0] ?? null)}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/8" />
          <span className="text-[10px] text-white/20">or link your profile</span>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Google Scholar */}
        <div>
          <label htmlFor="scholar-link" className="text-[11px] text-white/35 font-semibold uppercase tracking-widest block mb-2">
            Google Scholar URL
          </label>
          <input
            id="scholar-link"
            type="url"
            value={data.scholarUrl}
            onChange={(e) => set('scholarUrl', e.target.value)}
            placeholder="https://scholar.google.com/citations?user=…"
            className={inputCls}
          />
        </div>

        {/* ORCID */}
        <div>
          <label htmlFor="orcid" className="text-[11px] text-white/35 font-semibold uppercase tracking-widest block mb-2">
            ORCID iD
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 text-xs font-mono pointer-events-none">
              0000-
            </span>
            <input
              id="orcid"
              type="text"
              value={data.orcid}
              onChange={(e) => set('orcid', e.target.value)}
              placeholder="0000-0001-2345-6789"
              className={`${inputCls} pl-14 font-mono`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
