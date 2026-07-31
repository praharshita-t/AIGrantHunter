import { useDiscoverGrants } from '@/hooks/useDiscoverGrants';
import PageHeader from '@/components/common/PageHeader';
import GrantSearchBar from '@/components/discover/GrantSearchBar';
import GrantFilters from '@/components/discover/GrantFilters';
import CategoryChips from '@/components/discover/CategoryChips';
import GrantGrid from '@/components/discover/GrantGrid';

export default function DiscoverGrants() {
  const {
    grants,
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
  } = useDiscoverGrants();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Discover Grants"
        subtitle={`Explore ${grants.length} funding opportunities curated for your research focus.`}
      />

      <GrantSearchBar onSearch={setSearchQuery} />

      <CategoryChips
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <GrantFilters
        onFilterChange={setFilters}
        onSortChange={setSortBy}
      />

      <GrantGrid
        grants={grants}
        onBookmark={toggleBookmark}
        onCompare={(grant) => console.log('Compare grant', grant)}
        onView={(grant) => console.log('View grant', grant)}
      />
    </div>
  );
}
