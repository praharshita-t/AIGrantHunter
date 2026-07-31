import { useState, useMemo, useEffect } from 'react';

export function useDiscoverGrants() {
  const [grants, setGrants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Grants');
  const [filters, setFilters] = useState({
    agency: 'all',
    fundingMin: '',
    fundingMax: '',
    country: 'all',
  });
  const [sortBy, setSortBy] = useState('matchScore');

  useEffect(() => {
    fetch('/api/grants/discover')
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'success' && data.grants) {
          const mapped = data.grants.map((g, i) => ({
            id: g.id || `grant-${i}`,
            title: g.title,
            agency: g.agency,
            amount: g.funding || 'Not Available',
            funding: g.funding || 'Not Available',
            matchScore: g.match_score || 0,
            deadline: g.deadline || '2026-10-15',
            category: g.agency && g.agency.toLowerCase().includes('nsf') ? 'Government' : 'International',
            tags: g.research_areas && g.research_areas.length > 0 ? g.research_areas : ['Research'],
            aiReason: g.why_this_grant && g.why_this_grant.length > 0 ? g.why_this_grant[0] : 'Scraped live by Discovery Agent.',
            whyMatched: g.why_this_grant ? g.why_this_grant.join(' ') : 'Scraped live.',
            country: g.country || 'Not Available',
            description: g.description || 'No description available.',
            isBookmarked: false,
          }));
          setGrants(mapped);
        }
      })
      .catch((err) => console.error('Error fetching live grants:', err));
  }, []);

  const toggleBookmark = (id) => {
    setGrants((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isBookmarked: !g.isBookmarked } : g))
    );
  };

  const categories = useMemo(() => {
    const counts = { 'All Grants': grants.length };
    grants.forEach(g => {
      (g.tags || []).forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts).map(([name, count], idx) => ({ id: `cat_${idx}`, name, count }));
  }, [grants]);

  const filteredGrants = useMemo(() => {
    return grants
      .filter((grant) => {
        // Search query
        if (
          searchQuery &&
          !grant.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !grant.agency.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !grant.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'All Grants') {
          if (!grant.tags.includes(selectedCategory)) {
            return false;
          }
        }

        // Agency filter
        if (filters.agency !== 'all' && grant.agency.toLowerCase() !== filters.agency.toLowerCase()) {
          return false;
        }

        // Min Funding
        if (filters.fundingMin) {
          const val = parseInt(grant.funding.replace(/[^0-9]/g, '')) || 0;
          if (val < Number(filters.fundingMin)) return false;
        }

        // Max Funding
        if (filters.fundingMax) {
          const val = parseInt(grant.funding.replace(/[^0-9]/g, '')) || 0;
          if (val > Number(filters.fundingMax)) return false;
        }

        // Country filter
        if (filters.country !== 'all' && grant.country.toLowerCase() !== filters.country.toLowerCase()) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'matchScore') return b.matchScore - a.matchScore;
        if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
        if (sortBy === 'funding_desc') {
          const valA = parseInt(a.funding.replace(/[^0-9]/g, '')) || 0;
          const valB = parseInt(b.funding.replace(/[^0-9]/g, '')) || 0;
          return valB - valA;
        }
        if (sortBy === 'funding_asc') {
          const valA = parseInt(a.funding.replace(/[^0-9]/g, '')) || 0;
          const valB = parseInt(b.funding.replace(/[^0-9]/g, '')) || 0;
          return valA - valB;
        }
        return 0;
      });
  }, [grants, searchQuery, selectedCategory, filters, sortBy]);

  return {
    grants: filteredGrants,
    totalCount: grants.length,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    toggleBookmark,
  };
}
