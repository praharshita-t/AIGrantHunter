import { useState, useEffect } from 'react';

export function useDashboard() {
  const [user] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : { name: 'Researcher', institution: 'Institution' };
  });

  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [charts, setCharts] = useState({
    funding: [],
    categories: [],
    matchDistribution: [],
    deadlineTimeline: [],
  });
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedMatches = localStorage.getItem('matches');
    if (savedMatches) {
      const matches = JSON.parse(savedMatches);

      if (matches.length > 0) {
        const highPriorityCount = matches.filter(m => m.priorityScore >= 80).length;

        const totalPotentialFunding = matches.reduce((acc, m) => {
          const valStr = m.funding || '';
          const cleanVal = parseInt(valStr.replace(/[^0-9]/g, '')) || 0;
          return acc + cleanVal;
        }, 0);

        const avgMatchScore = Math.round(
          matches.reduce((acc, m) => acc + (m.matchScore || 0), 0) / (matches.length || 1)
        );

        const currencySymbol = matches[0]?.funding?.includes('₹') ? '₹' : matches[0]?.funding?.includes('£') ? '£' : '$';

        // Stats cards
        setStats([
          {
            id: 'stat_01',
            title: 'Matching Grants',
            value: matches.length,
            trend: { value: 10, direction: 'up' },
            icon: 'Search',
            color: 'blue',
            description: 'Opportunities matching your profile',
          },
          {
            id: 'stat_02',
            title: 'High Priority',
            value: highPriorityCount,
            trend: { value: 4, direction: 'up' },
            icon: 'Zap',
            color: 'violet',
            description: 'Opportunities with >80% match score',
          },
          {
            id: 'stat_03',
            title: 'Avg Match Score',
            value: avgMatchScore,
            suffix: '%',
            trend: { value: 2.5, direction: 'up' },
            icon: 'Target',
            color: 'emerald',
            description: 'Semantic profile alignment',
          },
          {
            id: 'stat_04',
            title: 'Funding Potential',
            value: totalPotentialFunding,
            prefix: currencySymbol,
            format: 'currency',
            trend: { value: 5, direction: 'up' },
            icon: 'DollarSign',
            color: 'amber',
            description: 'Total available across matching grants',
          }
        ]);

        // Deadlines list (top 5)
        const sortedDeadlines = [...matches]
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          .slice(0, 5)
          .map((m, idx) => ({
            id: `dl_${idx}`,
            grantTitle: m.title,
            agency: m.agency,
            deadline: m.deadline,
            priority: m.priorityScore >= 80 ? 'high' : m.priorityScore >= 50 ? 'medium' : 'low',
            funding: m.funding,
            matchScore: m.matchScore
          }));
        setDeadlines(sortedDeadlines);

        // Chart 1: Funding by Agency
        const agencyFunding = {};
        matches.forEach(m => {
          const val = parseInt(m.funding.replace(/[^0-9]/g, '')) || 0;
          agencyFunding[m.agency] = (agencyFunding[m.agency] || 0) + val;
        });
        const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
        const fundingChart = Object.entries(agencyFunding).map(([name, value], idx) => ({
          name,
          value,
          fill: colors[idx % colors.length]
        }));

        // Chart 2: Match Distribution
        const dist = { '90–100%': 0, '80–89%': 0, '70–79%': 0, '<70%': 0 };
        matches.forEach(m => {
          if (m.matchScore >= 90) dist['90–100%']++;
          else if (m.matchScore >= 80) dist['80–89%']++;
          else if (m.matchScore >= 70) dist['70–79%']++;
          else dist['<70%']++;
        });
        const distChart = [
          { range: '90–100%', count: dist['90–100%'], fill: '#10b981' },
          { range: '80–89%', count: dist['80–89%'], fill: '#3b82f6' },
          { range: '70–79%', count: dist['70–79%'], fill: '#f59e0b' },
          { range: '<70%', count: dist['<70%'], fill: '#71717a' }
        ].filter(d => d.count > 0);

        setCharts({
          funding: fundingChart,
          categories: [
            { name: 'Artificial Intelligence', value: 40, fill: '#3b82f6' },
            { name: 'Genomics', value: 30, fill: '#8b5cf6' },
            { name: 'Quantum', value: 20, fill: '#06b6d4' },
            { name: 'Other', value: 10, fill: '#71717a' }
          ],
          matchDistribution: distChart,
          deadlineTimeline: []
        });

        // Dynamic Activities feed
        setActivities([
          {
            id: 'act_01',
            type: 'profile',
            title: 'Research Profile Analyzed',
            description: `AI completed analysis for researcher ${user.name} at ${user.institution}.`,
            timestamp: new Date().toISOString(),
            icon: 'Sparkles',
          },
          {
            id: 'act_02',
            type: 'match',
            title: `${matches.length} Matches Discovered`,
            description: `Pipeline complete. Discovered and ranked ${matches.length} matching grants with an average score of ${avgMatchScore}%.`,
            timestamp: new Date().toISOString(),
            icon: 'Target',
          },
          {
            id: 'act_03',
            type: 'planner',
            title: 'Planner Auto-Generated',
            description: `AI created custom application roadmaps for your top recommendations.`,
            timestamp: new Date().toISOString(),
            icon: 'CheckCircle',
          }
        ]);
      }
    }
    setLoading(false);
  }, [user]);

  return {
    user,
    stats,
    activities,
    charts,
    deadlines,
    loading,
  };
}
