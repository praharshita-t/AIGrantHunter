// ProfileForm.jsx — Manual profile entry with comprehensive researcher fields
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const POSITIONS = [
  'Undergraduate Student',
  "Master's Student",
  'PhD Scholar',
  'Research Assistant',
  'Assistant Professor',
  'Associate Professor',
  'Professor',
  'Principal Investigator',
  'Scientist',
  'Industry Researcher',
  'Other',
]

const INSTITUTION_TYPES = [
  'University',
  'College',
  'Research Institute',
  'Government Lab',
  'Hospital',
  'Startup',
  'NGO',
  'Corporate R&D',
  'Other',
]

const DEGREES = [
  "Bachelor's",
  "Master's",
  'MPhil',
  'PhD',
  'PostDoc',
  'Other',
]

const EXPERIENCE_RANGES = [
  '0-2',
  '2-5',
  '5-10',
  '10+',
]

const ALL_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Venezuela", "Vietnam",
  "Yemen",
  "Zambia", "Zimbabwe",
]

function Field({ label, id, children }) {
  return (
    <div className="flex flex-col gap-1.5 relative">
      <label htmlFor={id} className="text-[11px] font-semibold text-white/40 uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder-white/25 outline-none focus:border-brand-500/50 focus:bg-white/[0.08] transition-all duration-200 cursor-pointer'

const optionCls = 'bg-white text-gray-900 font-medium py-1'

export default function ProfileForm({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val })

  const [countrySearch, setCountrySearch] = useState(data.country || '')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const filteredCountries = ALL_COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  )

  useEffect(() => {
    setCountrySearch(data.country || '')
  }, [data.country])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
            value={data.fullName || ''}
            onChange={(e) => set('fullName', e.target.value)}
            placeholder="Dr. Jane Smith"
            className={inputCls}
          />
        </Field>

        <Field label="Institution" id="institution">
          <input
            id="institution"
            type="text"
            value={data.institution || ''}
            onChange={(e) => set('institution', e.target.value)}
            placeholder="MIT, Stanford, IIT…"
            className={inputCls}
          />
        </Field>

        <Field label="Institution Type" id="institutionType">
          <select
            id="institutionType"
            value={data.institutionType || ''}
            onChange={(e) => set('institutionType', e.target.value)}
            className={`${inputCls} appearance-none`}
          >
            <option value="" disabled className="bg-white text-gray-400">Select Institution Type</option>
            {INSTITUTION_TYPES.map((t) => <option key={t} value={t} className={optionCls}>{t}</option>)}
          </select>
        </Field>

        <Field label="Highest Degree" id="highestDegree">
          <select
            id="highestDegree"
            value={data.highestDegree || ''}
            onChange={(e) => set('highestDegree', e.target.value)}
            className={`${inputCls} appearance-none`}
          >
            <option value="" disabled className="bg-white text-gray-400">Select Highest Degree</option>
            {DEGREES.map((d) => <option key={d} value={d} className={optionCls}>{d}</option>)}
          </select>
        </Field>

        <Field label="Country" id="country">
          <div ref={dropdownRef} className="relative">
            <input
              id="country"
              type="text"
              value={countrySearch}
              onChange={(e) => {
                setCountrySearch(e.target.value)
                setShowCountryDropdown(true)
              }}
              onFocus={() => setShowCountryDropdown(true)}
              placeholder="Type to search country..."
              className={inputCls}
            />
            <AnimatePresence>
              {showCountryDropdown && filteredCountries.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-xl border border-white/10 shadow-2xl p-1"
                  style={{ background: 'rgba(20, 20, 25, 0.95)', backdropFilter: 'blur(12px)' }}
                >
                  {filteredCountries.map((c) => (
                    <div
                      key={c}
                      onClick={() => {
                        set('country', c)
                        setCountrySearch(c)
                        setShowCountryDropdown(false)
                      }}
                      className="px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/[0.08] rounded-lg cursor-pointer transition-colors duration-150"
                    >
                      {c}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Field>

        <Field label="Department" id="department">
          <input
            id="department"
            type="text"
            value={data.department || ''}
            onChange={(e) => set('department', e.target.value)}
            placeholder="Computer Science, Biology…"
            className={inputCls}
          />
        </Field>

        <Field label="Academic Position" id="position">
          <select
            id="position"
            value={data.position || ''}
            onChange={(e) => set('position', e.target.value)}
            className={`${inputCls} appearance-none`}
          >
            <option value="" disabled className="bg-white text-gray-400">Select position</option>
            {POSITIONS.map((p) => <option key={p} value={p} className={optionCls}>{p}</option>)}
          </select>
        </Field>

        <Field label="Research Experience (Years)" id="experience">
          <select
            id="experience"
            value={data.experience || ''}
            onChange={(e) => set('experience', e.target.value)}
            className={`${inputCls} appearance-none`}
          >
            <option value="" disabled className="bg-white text-gray-400">Select Experience Range</option>
            {EXPERIENCE_RANGES.map((r) => <option key={r} value={r} className={optionCls}>{r} years</option>)}
          </select>
        </Field>
      </div>
    </motion.div>
  )
}
