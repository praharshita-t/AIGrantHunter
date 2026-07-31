import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Check } from 'lucide-react';

export default function AppearanceSettings({ appearance, onSave }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="rounded-2xl border p-6 space-y-6"
      style={{
        background: 'var(--color-bg-card)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        Appearance & Theme
      </h3>

      {/* Theme selection cards */}
      <div>
        <label className="mb-3 block text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          Interface Mode
        </label>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
              theme === 'dark' ? 'border-blue-500 bg-blue-500/10' : ''
            }`}
            style={{
              borderColor: theme === 'dark' ? '#3b82f6' : 'var(--color-border-primary)',
              background: theme === 'dark' ? 'rgba(59, 130, 246, 0.08)' : 'var(--color-bg-secondary)',
            }}
          >
            <Moon className="h-6 w-6 text-blue-400" />
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Dark Mode
            </span>
            {theme === 'dark' && <Check className="h-4 w-4 text-blue-500" />}
          </button>

          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all ${
              theme === 'light' ? 'border-blue-500 bg-blue-500/10' : ''
            }`}
            style={{
              borderColor: theme === 'light' ? '#3b82f6' : 'var(--color-border-primary)',
              background: theme === 'light' ? 'rgba(59, 130, 246, 0.08)' : 'var(--color-bg-secondary)',
            }}
          >
            <Sun className="h-6 w-6 text-amber-500" />
            <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Light Mode
            </span>
            {theme === 'light' && <Check className="h-4 w-4 text-blue-500" />}
          </button>
        </div>
      </div>
    </div>
  );
}
