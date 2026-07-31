import { useState, useMemo } from 'react';
import { discoverGrants, grantCategories } from '@/services/mockData';

export function useDiscoverGrants() {
  const [grants, setGrants] = useState(discoverGrants);
  const [categories] = useState(grantCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Grants');
  const [filters, setFilters] = useState({
    agency: 'all',
    fundingMin: '',
    fundingMax: '',
    country: 'all',
  });
  const [sortBy, setSortBy] = useState('matchScore');

  const toggleBookmark = (id) => {
    setGrants((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isBookmarked: !g.isBookmarked } : g))
    );
  };

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
        if (filters.agency !== 'all' && grant.agency.toLowerCase() !== filters.agency) {
          return false;
        }

        // Min Funding
        if (filters.fundingMin && grant.funding < Number(filters.fundingMin)) {
          return false;
        }

        // Max Funding
        if (filters.fundingMax && grant.funding > Number(filters.fundingMax)) {
          return false;
        }

        // Country filter
        if (filters.country !== 'all' && grant.country.toLowerCase() !== filters.country) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'matchScore') return b.matchScore - a.matchScore;
        if (sortBy === 'deadline') return new Date(a.deadline) - new Date(b.deadline);
        if (sortBy === 'funding_desc') return b.funding - a.funding;
        if (sortBy === 'funding_asc') return a.funding - b.funding;
        if (sortBy === 'recent') return new Date(b.postedDate) - new Date(a.postedDate);
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
