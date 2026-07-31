import GrantCard from './GrantCard';
import EmptyState from '@/components/common/EmptyState';
import { Search } from 'lucide-react';

export default function GrantGrid({ grants, onBookmark, onCompare, onView }) {
  if (!grants || grants.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No grants found"
        description="Try adjusting your search terms or filter criteria to discover more grant opportunities."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {grants.map((grant) => (
        <GrantCard
          key={grant.id}
          grant={grant}
          onBookmark={onBookmark}
          onCompare={onCompare}
          onView={onView}
        />
      ))}
    </div>
  );
}
