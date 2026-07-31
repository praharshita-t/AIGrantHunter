import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import ResearchProfile from './pages/ResearchProfile.jsx'
import MissionControl from './pages/MissionControl.jsx'
import Recommendations from './pages/Recommendations.jsx'
import GrantDetails from './pages/GrantDetails.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<ResearchProfile />} />
        <Route path="/mission-control" element={<MissionControl />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/grant-details" element={<GrantDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
