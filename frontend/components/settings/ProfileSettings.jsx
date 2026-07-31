import { useState } from 'react';
import { User, Mail, Building, Globe, Award, Save } from 'lucide-react';

export default function ProfileSettings({ profile, onSave }) {
  const [form, setForm] = useState(profile || {});

  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        className="rounded-2xl border p-6 space-y-4"
        style={{
          background: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-primary)',
        }}
      >
        <h3 className="text-base font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Researcher Profile
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: 'var(--color-text-tertiary)' }} />
              <input
                type="text"
                value={form.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none"
                style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-primary)' }}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: 'var(--color-text-tertiary)' }} />
              <input
                type="email"
                value={form.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none"
                style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-primary)' }}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              Institution
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: 'var(--color-text-tertiary)' }} />
              <input
                type="text"
                value={form.institution || ''}
                onChange={(e) => handleChange('institution', e.target.value)}
                className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none"
                style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-primary)' }}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              Department
            </label>
            <input
              type="text"
              value={form.department || ''}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-primary)' }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              ORCID iD
            </label>
            <div className="relative">
              <Award className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: 'var(--color-text-tertiary)' }} />
              <input
                type="text"
                value={form.orcid || ''}
                onChange={(e) => handleChange('orcid', e.target.value)}
                className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none"
                style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-primary)' }}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
              Personal Website
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: 'var(--color-text-tertiary)' }} />
              <input
                type="url"
                value={form.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full rounded-xl border py-2.5 pl-10 pr-3 text-sm outline-none"
                style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-primary)' }}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
            Research Biography
          </label>
          <textarea
            rows={3}
            value={form.bio || ''}
            onChange={(e) => handleChange('bio', e.target.value)}
            className="w-full rounded-xl border p-3 text-sm outline-none"
            style={{ background: 'var(--color-bg-input)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-primary)' }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          <Save className="h-4 w-4" />
          Save Profile
        </button>
      </div>
    </form>
  );
}
