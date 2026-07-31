import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/common/AppLayout';
import Dashboard from '@/pages/Dashboard';
import DiscoverGrants from '@/pages/DiscoverGrants';
import Planner from '@/pages/Planner';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discover" element={<DiscoverGrants />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
