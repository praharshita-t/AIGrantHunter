import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/landing/Hero.jsx'
import WorkflowPreview from '../components/landing/WorkflowPreview.jsx'
import FeatureCards from '../components/landing/FeatureCards.jsx'
import CTASection from '../components/landing/CTASection.jsx'

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate()

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5"
    >
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        className="flex items-center gap-2.5 cursor-pointer"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
          <span className="text-xs font-bold text-white">G</span>
        </div>
        <span className="font-bold text-white text-sm tracking-tight">GrantAI</span>
      </div>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-white/50">
        {['Features', 'How it works', 'Pricing', 'Docs'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="hover:text-white transition-colors duration-150"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <button
          id="nav-sign-in"
          onClick={() => navigate('/profile')}
          className="hidden sm:block text-xs font-medium text-white/50 hover:text-white transition-colors"
        >
          Sign in
        </button>
        <button
          id="nav-get-started"
          onClick={() => navigate('/profile')}
          className="text-xs font-semibold px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-all duration-150 hover:scale-[1.03]"
        >
          Get started
        </button>
      </div>
    </motion.header>
  )
}

// ─── Divider ────────────────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="h-px w-48 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

// ─── Landing Page ───────────────────────────────────────────────────────────
export default function Landing() {
  return (
    <div className="min-h-screen bg-surface-950 text-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <WorkflowPreview />
        <SectionDivider />
        <FeatureCards />
        <SectionDivider />
        <CTASection />
      </main>
    </div>
  )
}
