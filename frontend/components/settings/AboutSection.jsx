import { Sparkles, Code2, ShieldCheck, Heart } from 'lucide-react';
import Badge from '@/components/common/Badge';

export default function AboutSection() {
  return (
    <div
      className="rounded-2xl border p-6 space-y-6"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
              GrantAI Platform
            </h3>
            <Badge variant="blue" size="xs">
              v1.0.0-hackathon
            </Badge>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            AI-Powered Research Grant Discovery Workspace
          </p>
        </div>
      </div>

      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        GrantAI streamlines research opportunity discovery, automated proposal planning, and deadline management for principal investigators and research universities worldwide.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-4 border-t" style={{ borderColor: 'var(--color-border-primary)' }}>
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-blue-500" />
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Modular Architecture
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            API-Ready Interface
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-rose-500" />
          <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Built for PIs & Researchers
          </span>
        </div>
      </div>
    </div>
  );
}
