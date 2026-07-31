import { useState } from 'react';
import { Bell, Mail, Smartphone, Save } from 'lucide-react';

export default function NotificationSettings({ prefs, onSave }) {
  const [settings, setSettings] = useState(prefs || {});

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.(settings);
  };

  const options = [
    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive deadline and match digests via email', icon: Mail },
    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Real-time browser notifications for grant updates', icon: Smartphone },
    { key: 'deadlineReminders', label: 'Deadline Reminders', desc: 'Alerts when saved grant deadlines are approaching', icon: Bell },
    { key: 'newGrantAlerts', label: 'New Grant Alerts', desc: 'Instant notifications when high-match grants appear', icon: Bell },
    { key: 'weeklyDigest', label: 'Weekly Summary Digest', desc: 'Curated weekly email containing top opportunities', icon: Mail },
  ];

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
          Notification Preferences
        </h3>

        <div className="space-y-3">
          {options.map((opt) => (
            <div
              key={opt.key}
              className="flex items-center justify-between rounded-xl border p-4"
              style={{
                background: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <opt.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {opt.label}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {opt.desc}
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={!!settings[opt.key]}
                onChange={() => toggleSetting(opt.key)}
                className="h-5 w-5 rounded accent-blue-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        >
          <Save className="h-4 w-4" />
          Save Preferences
        </button>
      </div>
    </form>
  );
}
