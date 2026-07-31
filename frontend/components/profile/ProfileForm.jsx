// ProfileForm.jsx — Manual profile entry: name, institution, country, dept, position, experience
import { motion } from 'framer-motion'

const POSITIONS = [
  'PhD Student', 'Postdoctoral Researcher', 'Assistant Professor',
  'Associate Professor', 'Professor', 'Research Scientist', 'Industry Researcher',
]

const COUNTRIES = [
  'United States', 'United Kingdom', 'India', 'Germany', 'Canada',
  'Australia', 'France', 'Netherlands', 'Singapore', 'Other',
]

function Field({ label, id, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder-white/25 outline-none focus:border-brand-500/50 focus:bg-white/[0.08] transition-all duration-200'

export default function ProfileForm({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val })

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-2xl bg-white/[0.04] border border-white/8 p-5"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 rounded-lg bg-sky-500/20 flex items-center justify-center text-sm">👤</div>
        <h2 className="text-xs font-semibold tracking-widest text-white/40 uppercase">Personal &amp; Academic Details</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full Name" id="fullName">
          <input
            id="fullName"
            type="text"
            value={data.fullName}
            onChange={(e) => set('fullName', e.target.value)}
            placeholder="Dr. Jane Smith"
            className={inputCls}
          />
        </Field>

        <Field label="Institution" id="institution">
          <input
            id="institution"
            type="text"
            value={data.institution}
            onChange={(e) => set('institution', e.target.value)}
            placeholder="MIT, Stanford, IIT…"
            className={inputCls}
          />
        </Field>

        <Field label="Country" id="country">
          <select
            id="country"
            value={data.country}
            onChange={(e) => set('country', e.target.value)}
            className={`${inputCls} appearance-none`}
          >
            <option value="" disabled>Select country</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Department" id="department">
          <input
            id="department"
            type="text"
            value={data.department}
            onChange={(e) => set('department', e.target.value)}
            placeholder="Computer Science, Biology…"
            className={inputCls}
          />
        </Field>

        <Field label="Academic Position" id="position">
          <select
            id="position"
            value={data.position}
            onChange={(e) => set('position', e.target.value)}
            className={`${inputCls} appearance-none`}
          >
            <option value="" disabled>Select position</option>
            {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>

        <Field label="Years of Experience" id="experience">
          <input
            id="experience"
            type="number"
            min="0"
            max="50"
            value={data.experience}
            onChange={(e) => set('experience', e.target.value)}
            placeholder="e.g. 7"
            className={inputCls}
          />
        </Field>
      </div>
    </motion.div>
  )
}
