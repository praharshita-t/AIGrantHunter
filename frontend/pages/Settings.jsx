import { useSettings } from '@/hooks/useSettings';
import PageHeader from '@/components/common/PageHeader';
import ProfileSettings from '@/components/settings/ProfileSettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import ResearchSettings from '@/components/settings/ResearchSettings';
import AboutSection from '@/components/settings/AboutSection';
import { User, Palette, Bell, Target, Info } from 'lucide-react';

export default function Settings() {
  const {
    settings,
    activeTab,
    setActiveTab,
    updateProfile,
    updateAppearance,
    updateNotificationPrefs,
    updateResearchPrefs,
  } = useSettings();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'research', label: 'Research Focus', icon: Target },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, research preferences, theme customization, and notification triggers."
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Navigation Sidebar inside Settings */}
        <div className="w-full lg:w-64 shrink-0">
          <div
            className="rounded-2xl border p-2 space-y-1"
            style={{
              background: 'var(--color-bg-card)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all text-left"
                  style={{
                    background: isActive ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                    color: isActive ? '#3b82f6' : 'var(--color-text-secondary)',
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <ProfileSettings profile={settings.profile} onSave={updateProfile} />
          )}
          {activeTab === 'appearance' && (
            <AppearanceSettings appearance={settings.appearance} onSave={updateAppearance} />
          )}
          {activeTab === 'notifications' && (
            <NotificationSettings prefs={settings.notificationPrefs} onSave={updateNotificationPrefs} />
          )}
          {activeTab === 'research' && (
            <ResearchSettings prefs={settings.researchPrefs} onSave={updateResearchPrefs} />
          )}
          {activeTab === 'about' && <AboutSection />}
        </div>
      </div>
    </div>
  );
}
