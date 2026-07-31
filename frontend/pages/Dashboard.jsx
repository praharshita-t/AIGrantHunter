import { useDashboard } from '@/hooks/useDashboard';
import WelcomeSection from '@/components/dashboard/WelcomeSection';
import StatsGrid from '@/components/dashboard/StatsGrid';
import ChartsSection from '@/components/dashboard/ChartsSection';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingDeadlines from '@/components/dashboard/UpcomingDeadlines';

export default function Dashboard() {
  const { user, stats, activities, charts, deadlines } = useDashboard();

  return (
    <div className="space-y-6">
      <WelcomeSection user={user} />
      <StatsGrid stats={stats} />
      <ChartsSection charts={charts} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentActivity activities={activities} />
        <UpcomingDeadlines deadlines={deadlines} />
      </div>
    </div>
  );
}
