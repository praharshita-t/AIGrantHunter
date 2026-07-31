import { useState, useEffect } from 'react';
import { dashboardData, currentUser } from '@/services/mockData';

export function useDashboard() {
  const [data, setData] = useState(dashboardData);
  const [user, setUser] = useState(currentUser);
  const [loading, setLoading] = useState(false);

  // Ready for backend integration:
  // useEffect(() => {
  //   fetchDashboardData().then(setData);
  // }, []);

  return {
    user,
    stats: data.stats,
    activities: data.activities,
    charts: data.charts,
    deadlines: data.deadlines,
    loading,
  };
}
