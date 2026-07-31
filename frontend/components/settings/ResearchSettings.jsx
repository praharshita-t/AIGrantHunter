import { useState } from 'react';
import { Target, DollarSign, Save } from 'lucide-react';
import Badge from '@/components/common/Badge';

export default function ResearchSettings({ prefs, onSave }) {
  const [form, setForm] = useState(prefs || {});
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (!newTag.trim()) return;
    setForm((prev) => ({
      ...prev,
      interests: [...(prev.interests || []), newTag.trim()],
    }));
    setNewTag('');
  };

  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests?.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        className="rounded-2xl border p-6 space-y-6"
        style={{
          background: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-primary)',
        }}
      >
        <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Research Preferences & Matching Criteria
        </h3>

        {/* Interests */}
        <div>
          <label className="mb-2 block text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Research Focus Areas / Keywords
          </label>

          <div className="flex flex-wrap gap-2 mb-3">
            {form.interests?.map((tag) => (
              <Badge key={tag} variant="blue" size="sm" className="gap-1 cursor-pointer">
                {tag}
                <span onClick={() => removeTag(tag)} className="ml-1 text-xs hover:text-red-400">
                  ×
                </span>
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-md">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add keyword (e.g. Robotics, Bioinformatics)"
              className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
              style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-primary)' }}
            />
            <button
              type="button"
              onClick={addTag}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500"
            >
              Add
            </button>
          </div>
        </div>

        {/* Preferred Agencies */}
        <div>
          <label className="mb-2 block text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Target Funding Agencies
          </label>
          <div className="flex flex-wrap gap-3">
            {['NSF', 'NIH', 'DOE', 'DARPA', 'NASA', 'DOD'].map((agency) => {
              const isSelected = form.preferredAgencies?.includes(agency);

              return (
                <button
                  type="button"
                  key={agency}
                  onClick={() => {
                    const current = form.preferredAgencies || [];
                    const next = isSelected
                      ? current.filter((a) => a !== agency)
                      : [...current, agency];
                    setForm((prev) => ({ ...prev, preferredAgencies: next }));
                  }}
                  className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${
                    isSelected ? 'bg-blue-600/20 text-blue-400 border-blue-500' : ''
                  }`}
                  style={{
                    background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--color-bg-secondary)',
                    borderColor: isSelected ? '#3b82f6' : 'var(--color-border-primary)',
                    color: isSelected ? '#3b82f6' : 'var(--color-text-secondary)',
                  }}
                >
                  {agency}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          <Save className="h-4 w-4" />
          Save Matching Preferences
        </button>
      </div>
    </form>
  );
}
