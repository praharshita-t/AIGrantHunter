// GrantDetails.jsx — Grant Details page matching backend planning response with Compliance Checklist & Outreach Email
import { useState } from 'react'
import { motion } from 'framer-motion'
import GrantDetailsDrawer from '../components/grant-details/GrantDetailsDrawer.jsx'

// ─── Mock Grant Data ──────────────────────────────────────────────────────────
const MOCK_GRANT = {
  id:          'nsf-bio-2024',
  title:       'NSF Biology Integration Grants 2024',
  agency:      'National Science Foundation (NSF)',
  category:    'Government',
  matchScore:  96,

  aiSummary:
    'This grant strongly aligns with your research interests in Artificial Intelligence, Machine Learning and Healthcare. The funding amount and eligibility criteria closely match your profile. Your recent publications on ML-driven protein folding align with 3 of the 4 priority areas stated by NSF.',

  funding: {
    amount:   '$500,000',
    duration: '3 Years',
    deadline: '15 September 2024',
  },

  eligibility: {
    countries:   ['United States', 'Canada', 'United Kingdom', 'Australia'],
    domains:     ['Computational Biology', 'Machine Learning', 'Genomics', 'Healthcare AI'],
    careerLevel: ['Early Career', 'Mid Career', 'Senior Researcher'],
  },

  timeline: {
    opens:    '1 June 2024',
    deadline: '15 September 2024',
    results:  'December 2024',
  },

  documents: [
    { name: 'Proposal',               required: true  },
    { name: 'CV',                     required: true  },
    { name: 'Budget Plan',            required: true  },
    { name: 'Recommendation Letter',  required: true  },
    { name: 'Ethics Statement',       required: false },
    { name: 'Data Management Plan',   required: false },
  ],

  requirements: [
    { label: 'Publications',        met: true,  note: '5 required · you have 12' },
    { label: 'Research Proposal',   met: true,  note: 'Template ready'           },
    { label: 'Budget Plan',         met: true,  note: 'Draft submitted'          },
    { label: 'Ethics Approval',     met: false, note: 'Pending review'           },
  ],

  complianceChecklist: [
    { id: 'c1', label: 'Eligibility Verified',           done: true,  note: 'Confirmed via profile criteria' },
    { id: 'c2', label: 'Required Documents Uploaded',    done: true,  note: 'CV & Proposal attached'         },
    { id: 'c3', label: 'Budget Proposal Pending',        done: false, note: 'Final review by finance department' },
    { id: 'c4', label: 'Letter of Recommendation Needed',done: false, note: 'Awaiting 1 reference letter'   },
    { id: 'c5', label: 'Institutional Affiliation Confirmed', done: true, note: 'Verified via university portal' },
    { id: 'c6', label: 'Ethics / IRB Approval Pending',  done: false, note: 'Submission queued for review' },
  ],

  outreachEmail: {
    recipient: 'NSF Program Director <grants-bio@nsf.gov>',
    subject: 'Inquiry Regarding NSF Biology Integration Grants 2024 — Application Intent',
    body: `Dear NSF Programme Officer,

I am writing to express my intent to apply for the NSF Biology Integration Grants 2024 (Award Number: BIO-2024-INT). I am an early-career researcher at the Department of Computational Biology, specialising in machine learning applications for genomics and protein structure prediction.

My research focuses on developing AI-driven frameworks for high-throughput genomic analysis, with specific emphasis on transformer-based models for protein folding and multi-omics data integration. Over the past four years, I have published 12 peer-reviewed articles in Nature Methods, Cell Systems, and Genome Research. Our preliminary results demonstrate a 34% improvement in protein function prediction accuracy over current benchmarks.

I would greatly appreciate any guidance on application priorities, evaluation criteria, or opportunities for a pre-submission consultation call. I am confident that our research programme aligns strongly with NSF's mission to advance biological integration through computational innovation.

Thank you for your time and consideration.

Sincerely,
Dr. Jane Smith
Assistant Professor, Computational Biology
University of Cambridge
jane.smith@cam.ac.uk | +44 1223 000 000`,
  },
}

// ─── Grant Summary Section Component ──────────────────────────────────────────
function GrantSummaryCard({ grant, onOpenDrawer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md overflow-hidden"
    >
      <div className="h-px w-full bg-gradient-to-r from-emerald-400 via-brand-400 to-purple-500 opacity-70" />

      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-500/25 text-[10px] font-semibold text-sky-300 uppercase tracking-widest">
            {grant.category}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-300">
            ✦ {grant.matchScore}% Match
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white leading-snug mb-1">{grant.title}</h2>
        <p className="text-xs text-white/40 font-medium mb-6">{grant.agency}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3.5">
            <div className="text-[10px] text-white/30 uppercase tracking-wider font-semibold mb-1">Funding Amount</div>
            <div className="text-xl font-extrabold text-emerald-400">{grant.funding.amount}</div>
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3.5">
            <div className="text-[10px] text-white/30 uppercase tracking-wider font-semibold mb-1">Duration</div>
            <div className="text-xl font-extrabold text-brand-300">{grant.funding.duration}</div>
          </div>
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-3.5">
            <div className="text-[10px] text-white/30 uppercase tracking-wider font-semibold mb-1">Application Deadline</div>
            <div className="text-lg font-bold text-white">{grant.funding.deadline}</div>
          </div>
        </div>

        {/* AI Summary Box */}
        <div className="rounded-xl bg-brand-500/[0.08] border border-brand-500/20 p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-brand-400 text-sm">✦</span>
            <h3 className="text-xs font-bold text-brand-300 uppercase tracking-wider">AI Summary</h3>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">{grant.aiSummary}</p>
        </div>

        <button
          id="open-grant-drawer-btn"
          onClick={onOpenDrawer}
          className="w-full py-3 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-all duration-200 shadow-lg hover:scale-[1.01]"
          style={{ boxShadow: '0 0 24px rgba(100,115,243,0.3)' }}
        >
          View Detailed Grant Drawer →
        </button>
      </div>
    </motion.div>
  )
}

// ─── Compliance Checklist Section Component ──────────────────────────────────
function ComplianceChecklistSection({ items }) {
  const [checklist, setChecklist] = useState(items)

  const toggleItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    )
  }

  const completedCount = checklist.filter((i) => i.done).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-sm font-bold">
            ✓
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Compliance Checklist</h2>
            <p className="text-xs text-white/40">Track required eligibility and document milestones</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
          {completedCount} of {checklist.length} Completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
          style={{ width: `${(completedCount / checklist.length) * 100}%` }}
        />
      </div>

      <div className="space-y-3">
        {checklist.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`cursor-pointer flex items-start gap-3.5 p-3.5 rounded-xl border transition-all duration-200 ${
              item.done
                ? 'bg-emerald-500/[0.06] border-emerald-500/20 text-white'
                : 'bg-white/[0.02] border-white/8 text-white/60 hover:border-white/15'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold mt-0.5 transition-all duration-200 ${
                item.done
                  ? 'bg-emerald-500 text-white'
                  : 'border border-white/30 text-transparent bg-transparent'
              }`}
            >
              {item.done ? '✓' : '☐'}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-xs font-semibold ${item.done ? 'text-white' : 'text-white/80'}`}>
                {item.done ? `✓ ${item.label}` : `☐ ${item.label}`}
              </div>
              {item.note && <p className="text-[11px] text-white/35 mt-0.5">{item.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Outreach Email Section Component ─────────────────────────────────────────
function OutreachEmailSection({ email }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const textToCopy = `Subject: ${email.subject}\nTo: ${email.recipient}\n\n${email.body}`
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md p-6"
    >
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-300 text-sm font-bold">
            ✉️
          </div>
          <div>
            <h2 className="text-base font-bold text-white">AI-Generated Outreach Email</h2>
            <p className="text-xs text-white/40">Ready-to-send draft for funding agency inquiries</p>
          </div>
        </div>

        <button
          id="copy-outreach-email-btn"
          onClick={handleCopy}
          className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 flex items-center gap-1.5 ${
            copied
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          {copied ? '✓ Copied to Clipboard!' : '📋 Copy Email'}
        </button>
      </div>

      {/* Email Container Box */}
      <div className="rounded-xl bg-surface-950 border border-white/10 overflow-hidden font-mono text-xs">
        {/* Email Header Metadata */}
        <div className="bg-white/[0.03] border-b border-white/10 p-3.5 space-y-1.5">
          <div className="flex items-center gap-2 text-white/40">
            <span className="w-16 font-semibold uppercase text-[10px]">To:</span>
            <span className="text-white/80 font-sans">{email.recipient}</span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <span className="w-16 font-semibold uppercase text-[10px]">Subject:</span>
            <span className="text-brand-300 font-sans font-medium">{email.subject}</span>
          </div>
        </div>

        {/* Email Body */}
        <div className="p-4 font-sans text-xs text-white/70 whitespace-pre-line leading-relaxed max-h-96 overflow-y-auto">
          {email.body}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function GrantDetails() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand-600/10 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[120px]" />
      </div>

      <main className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-semibold tracking-widest text-brand-400 uppercase">Grant Intelligence</span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Grant Details & Planning
          </h1>
          <p className="mt-2 text-white/40 text-sm max-w-xl mx-auto">
            Comprehensive grant breakdown, compliance roadmap, and automated agency outreach templates.
          </p>
        </motion.div>

        {/* 1. Grant Summary Section */}
        <section>
          <GrantSummaryCard grant={MOCK_GRANT} onOpenDrawer={() => setDrawerOpen(true)} />
        </section>

        {/* 2. Compliance Checklist Section */}
        <section>
          <ComplianceChecklistSection items={MOCK_GRANT.complianceChecklist} />
        </section>

        {/* 3. Outreach Email Section */}
        <section>
          <OutreachEmailSection email={MOCK_GRANT.outreachEmail} />
        </section>
      </main>

      {/* Drawer — only mounted when open */}
      {drawerOpen && (
        <GrantDetailsDrawer
          grant={MOCK_GRANT}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  )
}
