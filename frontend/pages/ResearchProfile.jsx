// ResearchProfile.jsx — Research Profile Upload page
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import UploadZone                from '../components/profile/UploadZone.jsx'
import ProfileForm               from '../components/profile/ProfileForm.jsx'
import ResearchInterestSelector  from '../components/profile/ResearchInterestSelector.jsx'
import KeywordInput              from '../components/profile/KeywordInput.jsx'
import PreviousGrantForm         from '../components/profile/PreviousGrantForm.jsx'
import PublicationUpload         from '../components/profile/PublicationUpload.jsx'
import FundingPreference         from '../components/profile/FundingPreference.jsx'
import FundingRangeSlider        from '../components/profile/FundingRangeSlider.jsx'
import AnalyzeButton             from '../components/profile/AnalyzeButton.jsx'

// ─── Initial state ────────────────────────────────────────────────────────────
const INITIAL = {
  uploads: { cv: null, resume: null, proposal: null, pubs: null },
  profile: {
    fullName: '', institution: '', country: '',
    department: '', position: '', experience: '',
    institutionType: '', highestDegree: '',
  },
  interests:      [],
  keywords:       [],
  previousGrants: [],
  publications:   { file: null, scholarUrl: '', orcid: '' },
  fundingTypes:   [],
  fundingRange:   [50000, 500000],
}

const INTERESTS_MAP = {
  ai: 'Artificial Intelligence',
  healthcare: 'Healthcare',
  cv: 'Computer Vision',
  cyber: 'Cybersecurity',
  quantum: 'Quantum Computing',
  nlp: 'Natural Language Processing',
  robotics: 'Robotics',
  climate: 'Climate Science',
  genomics: 'Genomics',
  materials: 'Materials Science'
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionLabel({ step, children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-6 h-6 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-[11px] font-bold text-brand-300 flex-shrink-0">
        {step}
      </div>
      <span className="text-xs font-semibold tracking-widest text-white/30 uppercase">{children}</span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ResearchProfile() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL)
  const [showManual, setShowManual] = useState(false)

  const merge = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleUploadFile = (type, file) =>
    merge('uploads', { ...form.uploads, [type]: file })

  const handleAnalyze = () => {
    const payload = {
      name: form.profile.fullName || "Dr. Lalit Prasad",
      institution: form.profile.institution || "IIT Delhi",
      career_stage: form.profile.position || form.profile.experience || "Researcher",
      research_areas: form.interests.length > 0 
        ? form.interests.map(id => INTERESTS_MAP[id] || id) 
        : ["Quantum Computing", "Artificial Intelligence"],
      skills: form.keywords.length > 0 ? form.keywords : ["Quantum Computing", "Artificial Intelligence"],
      publications: form.publications.scholarUrl ? [form.publications.scholarUrl] : [],
      preferred_countries: form.profile.country ? [form.profile.country] : [],
      institution_type: form.profile.institutionType || "University",
      research_experience: form.profile.experience || "2-5",
      highest_degree: form.profile.highestDegree || "PhD",
      funding_history: form.previousGrants || []
    }
    localStorage.setItem('pendingProfileAnalysis', JSON.stringify(payload))
    localStorage.setItem('userProfile', JSON.stringify({
      ...payload,
      email: form.profile.email || "lalit.prasad@iitd.ac.in",
      department: form.profile.department || "Physics",
      yearsOfExperience: form.profile.experience || "2-5"
    }))
    navigate('/mission-control')
  }

  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[420px] rounded-full bg-brand-600/10 blur-[130px]" />
        <div className="absolute bottom-0 right-1/3 w-[350px] h-[350px] rounded-full bg-purple-600/8 blur-[110px]" />
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* ── Page Header ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-white/25 mb-5">
            <span onClick={() => navigate('/')} className="hover:text-white cursor-pointer transition-colors">GrantAI</span>
            <span>/</span>
            <span onClick={() => navigate('/profile')} className="text-brand-400 cursor-pointer">research-profile</span>
          </div>

          <span className="text-xs font-semibold tracking-widest text-brand-400 uppercase">
            Step 1 of 2
          </span>
          <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Research Profile{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-300 to-purple-400">
              Upload
            </span>
          </h1>
          <p className="mt-2 text-white/40 text-base font-light">
            Upload your documents or manually enter your research profile. Our AI agents will analyze and match you with the most relevant grants.
          </p>
        </motion.div>

        {/* ── Staggered sections ────────────────────────────────────────── */}
        <div className="space-y-8">

          {/* 1 — Upload Documents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <SectionLabel step="1">Upload Documents</SectionLabel>
            <UploadZone
              files={form.uploads}
              onFile={handleUploadFile}
              onManual={() => setShowManual((v) => !v)}
            />
          </motion.div>

          {/* 2 — Manual Profile (conditional) */}
          <AnimatePresence>
            {showManual && (
              <motion.div
                key="manual"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <SectionLabel step="2">Personal &amp; Academic Details</SectionLabel>
                <ProfileForm
                  data={form.profile}
                  onChange={(val) => merge('profile', val)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3 — Research Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SectionLabel step={showManual ? '3' : '2'}>Research Interests</SectionLabel>
            <ResearchInterestSelector
              selected={form.interests}
              onChange={(val) => merge('interests', val)}
            />
          </motion.div>

          {/* 4 — Keywords */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <SectionLabel step={showManual ? '4' : '3'}>Keywords</SectionLabel>
            <KeywordInput
              keywords={form.keywords}
              onChange={(val) => merge('keywords', val)}
            />
          </motion.div>

          {/* 5 — Publications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionLabel step={showManual ? '5' : '4'}>Publications</SectionLabel>
            <PublicationUpload
              data={form.publications}
              onChange={(val) => merge('publications', val)}
            />
          </motion.div>

          {/* 6 — Previous Grants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <SectionLabel step={showManual ? '6' : '5'}>Previous Grants</SectionLabel>
            <PreviousGrantForm
              grants={form.previousGrants}
              onChange={(val) => merge('previousGrants', val)}
            />
          </motion.div>

          {/* 7 — Funding Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SectionLabel step={showManual ? '7' : '6'}>Funding Preferences</SectionLabel>
            <FundingPreference
              selected={form.fundingTypes}
              onChange={(val) => merge('fundingTypes', val)}
            />
          </motion.div>

          {/* 8 — Funding Range */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <SectionLabel step={showManual ? '8' : '7'}>Funding Range</SectionLabel>
            <FundingRangeSlider
              range={form.fundingRange}
              onChange={(val) => merge('fundingRange', val)}
              country={form.profile.country}
            />
          </motion.div>

          {/* ── Analyze CTA ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4 pb-8"
          >
            <AnalyzeButton onAnalyze={handleAnalyze} />
          </motion.div>

        </div>
      </main>
    </div>
  )
}
