import { useState } from 'react';
import { settingsData as initialSettings } from '@/services/mockData';

export function useSettings() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'appearance', 'notifications', 'research', 'about'

  const updateProfile = (profileData) => {
    setSettings((prev) => ({ ...prev, profile: { ...prev.profile, ...profileData } }));
  };

  const updateAppearance = (appearanceData) => {
    setSettings((prev) => ({ ...prev, appearance: { ...prev.appearance, ...appearanceData } }));
  };

  const updateNotificationPrefs = (prefs) => {
    setSettings((prev) => ({ ...prev, notificationPrefs: { ...prev.notificationPrefs, ...prefs } }));
  };

  const updateResearchPrefs = (researchData) => {
    setSettings((prev) => ({ ...prev, researchPrefs: { ...prev.researchPrefs, ...researchData } }));
  };

  return {
    settings,
    activeTab,
    setActiveTab,
    updateProfile,
    updateAppearance,
    updateNotificationPrefs,
    updateResearchPrefs,
  };
}
