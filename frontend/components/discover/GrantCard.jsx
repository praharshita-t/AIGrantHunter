import { motion } from 'framer-motion';
import { Bookmark, Sparkles, Calendar, DollarSign, Globe, ExternalLink } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { formatCurrency, daysUntil } from '@/components/common/utils';

export default function GrantCard({ grant, onBookmark, onCompare, onView }) {
  if (!grant) return null;

  const daysLeft = daysUntil(grant.deadline);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      className="group flex flex-col justify-between rounded-2xl border p-5 transition-all duration-300"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border-primary)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-secondary)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-primary)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div>
        {/* Top bar: Agency + Match Score + Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Badge variant="blue" size="sm">
              {grant.agency}
            </Badge>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500">
              <Sparkles className="h-3.5 w-3.5" />
              {grant.matchScore}% Match
            </div>
          </div>

          <button
            onClick={() => onBookmark?.(grant.id)}
            className="rounded-lg p-1.5 transition-colors hover:bg-white/10"
            style={{
              color: grant.isBookmarked ? '#f59e0b' : 'var(--color-text-tertiary)',
            }}
          >
            <Bookmark className="h-4 w-4" fill={grant.isBookmarked ? '#f59e0b' : 'none'} />
          </button>
        </div>

        {/* Title */}
        <h3
          className="text-base font-semibold tracking-tight line-clamp-2 mb-2"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {grant.title}
        </h3>

        {/* Description */}
        <p
          className="text-xs line-clamp-2 mb-4"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {grant.description}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 py-3 border-y mb-4" style={{ borderColor: 'var(--color-border-primary)' }}>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            <DollarSign className="h-3.5 w-3.5 text-blue-500" />
            <span className="font-semibold text-white">{formatCurrency(grant.funding)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            <Calendar className="h-3.5 w-3.5 text-amber-500" />
            <span>{daysLeft} days left</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            <Globe className="h-3.5 w-3.5 text-violet-500" />
            <span>{grant.country}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {grant.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-md px-2 py-0.5 text-[11px] font-medium"
              style={{
                background: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: 'var(--color-border-primary)' }}>
        <button
          onClick={() => onCompare?.(grant)}
          className="flex-1 rounded-xl border py-2 text-xs font-medium transition-colors hover:bg-white/5"
          style={{
            borderColor: 'var(--color-border-primary)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Compare
        </button>
        <button
          onClick={() => onView?.(grant)}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-500"
        >
          View Details
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}
