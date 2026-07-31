import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-600/20 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      {/* Badge */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-xs font-medium text-brand-300 tracking-wide"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
        </span>
        4 Autonomous AI Agents · Live
      </motion.div>

      {/* Headline */}
      <motion.h1
        custom={1}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.08] tracking-tight max-w-4xl"
      >
        Your{' '}
        <span className="text-gradient">AI Research</span>
        <br />
        Funding Team
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        custom={2}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed font-light"
      >
        Four autonomous AI agents discover, analyze, rank and prepare
        personalized research grants while you focus on research.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
      >
        <button
          id="hero-find-grants"
          onClick={() => navigate('/recommendations')}
          className="group relative px-8 py-3.5 rounded-xl font-semibold text-sm bg-brand-600 hover:bg-brand-500 text-white transition-all duration-200 glow-brand hover:scale-[1.03] active:scale-[0.98]"
        >
          <span className="relative z-10">Find Grants</span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <span className="relative z-10 ml-2 group-hover:translate-x-0.5 inline-block transition-transform">→</span>
        </button>

        <button
          id="hero-upload-profile"
          onClick={() => navigate('/profile')}
          className="px-8 py-3.5 rounded-xl font-semibold text-sm glass text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
        >
          Upload Research Profile
        </button>
      </motion.div>
    </section>
  )
}
