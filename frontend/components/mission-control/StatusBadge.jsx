// StatusBadge.jsx — Reusable status indicator pill
const STATUS_STYLES = {
  running: {
    dot: 'bg-emerald-400',
    ping: 'bg-emerald-400',
    pill: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    label: 'Running',
  },
  complete: {
    dot: 'bg-brand-400',
    ping: null,
    pill: 'bg-brand-500/10 border-brand-500/30 text-brand-300',
    label: 'Complete',
  },
  idle: {
    dot: 'bg-white/30',
    ping: null,
    pill: 'bg-white/5 border-white/10 text-white/40',
    label: 'Idle',
  },
  error: {
    dot: 'bg-red-400',
    ping: 'bg-red-400',
    pill: 'bg-red-500/10 border-red-500/30 text-red-300',
    label: 'Error',
  },
  queued: {
    dot: 'bg-amber-400',
    ping: null,
    pill: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    label: 'Queued',
  },
}

export default function StatusBadge({ status = 'idle', className = '' }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.idle

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold tracking-wide uppercase ${s.pill} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {s.ping && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${s.ping} opacity-75`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${s.dot}`} />
      </span>
      {s.label}
    </span>
  )
}
