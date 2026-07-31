import { BrowserRouter, Routes, Route } from 'react-router-dom'

// ── AI workflow pages (frontend-ai-ui branch) ─────────────────────────────────
import Landing         from './pages/Landing.jsx'
import ResearchProfile from './pages/ResearchProfile.jsx'
import MissionControl  from './pages/MissionControl.jsx'
import Recommendations from './pages/Recommendations.jsx'
import GrantDetails    from './pages/GrantDetails.jsx'

// ── Dashboard / app pages (origin/main branch) ───────────────────────────────
import Dashboard      from './pages/Dashboard.jsx'
import DiscoverGrants from './pages/DiscoverGrants.jsx'
import Planner        from './pages/Planner.jsx'
import Notifications  from './pages/Notifications.jsx'
import Settings       from './pages/Settings.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AI workflow routes */}
        <Route path="/"                element={<Landing />} />
        <Route path="/profile"         element={<ResearchProfile />} />
        <Route path="/mission-control" element={<MissionControl />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/grant-details"   element={<GrantDetails />} />

        {/* Dashboard / app routes */}
        <Route path="/dashboard"       element={<Dashboard />} />
        <Route path="/discover"        element={<DiscoverGrants />} />
        <Route path="/planner"         element={<Planner />} />
        <Route path="/notifications"   element={<Notifications />} />
        <Route path="/settings"        element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}
