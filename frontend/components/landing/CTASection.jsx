import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: 'GrantAI found a €200K EU Horizon grant we would never have discovered manually. Application submitted in 3 weeks.',
    name: 'Dr. Sofia M.',
    role: 'Computational Biology · Cambridge',
    avatar: 'SM',
  },
  {
    quote: 'The AI matching is eerily accurate. Our lab\'s funding pipeline went from 2 grants to 11 in one semester.',
    name: 'Prof. James K.',
    role: 'Quantum Physics · MIT',
    avatar: 'JK',
  },
  {
    quote: 'Finally a tool that understands research. The planning agent saved us weeks of administrative work.',
    name: 'Dr. Priya R.',
    role: 'Neuroscience · Stanford',
    avatar: 'PR',
  },
]

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-28 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="glass rounded-2xl p-6"
            >
              <p className="text-white/70 text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/40">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-800/80 via-purple-900/60 to-surface-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,115,243,0.25)_0%,transparent_65%)]" />

          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0H0v40' fill='none' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-brand-500/30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center py-20 px-6">
            <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs font-medium text-brand-300 tracking-wide">
              <span className="text-brand-400">✦</span>
              No credit card required
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight">
              Ready to discover your<br />
              <span className="text-gradient">next research grant?</span>
            </h2>

            <p className="mt-6 text-white/50 text-lg max-w-xl leading-relaxed">
              Join 1,200+ researchers who use GrantAI to find, match and apply for grants faster than ever before.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
              <button
                id="cta-get-started"
                className="group px-10 py-4 rounded-xl font-semibold text-sm bg-brand-600 hover:bg-brand-500 text-white transition-all duration-200 glow-brand hover:scale-[1.04] active:scale-[0.98]"
              >
                Get started for free
                <span className="ml-2 group-hover:translate-x-0.5 inline-block transition-transform">→</span>
              </button>
              <button
                id="cta-view-demo"
                className="px-10 py-4 rounded-xl font-semibold text-sm glass text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                View demo
              </button>
            </div>

            {/* Stats row */}
            <div className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-4">
              {[
                { value: '1,200+', label: 'Active researchers' },
                { value: '$48M+', label: 'Funding discovered' },
                { value: '94%', label: 'Match accuracy' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-extrabold text-white">{s.value}</div>
                  <div className="text-xs text-white/40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center text-xs text-white/20">
        © {new Date().getFullYear()} GrantAI · Built for the future of research funding
      </div>
    </section>
  )
}
