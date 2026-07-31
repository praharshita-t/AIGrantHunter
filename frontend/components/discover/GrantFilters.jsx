import { useState } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function GrantFilters({ onFilterChange, onSortChange }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    agency: 'all',
    fundingMin: '',
    fundingMax: '',
    country: 'all',
  });
  const [sort, setSort] = useState('matchScore');

  const agencies = ['All', 'NSF', 'NIH', 'DOE', 'DARPA', 'NASA', 'DOD', 'USDA'];
  const sortOptions = [
    { value: 'matchScore', label: 'Match Score' },
    { value: 'deadline', label: 'Deadline' },
    { value: 'funding_desc', label: 'Funding: High → Low' },
    { value: 'funding_asc', label: 'Funding: Low → High' },
    { value: 'recent', label: 'Most Recent' },
  ];

  const handleFilterUpdate = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleSortChange = (value) => {
    setSort(value);
    onSortChange?.(value);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200"
          style={{
            background: showFilters ? 'rgba(59, 130, 246, 0.1)' : 'var(--color-bg-input)',
            borderColor: showFilters ? 'rgba(59, 130, 246, 0.3)' : 'var(--color-border-primary)',
            color: showFilters ? '#3b82f6' : 'var(--color-text-secondary)',
          }}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>

        <div className="relative ml-auto">
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="appearance-none rounded-xl border py-2.5 pl-3 pr-8 text-sm font-medium outline-none transition-all"
            style={{
              background: 'var(--color-bg-input)',
              borderColor: 'var(--color-border-primary)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: 'var(--color-text-tertiary)' }}
          />
        </div>
      </div>

      {showFilters && (
        <div
          className="grid grid-cols-1 gap-3 rounded-2xl border p-4 sm:grid-cols-2 lg:grid-cols-4"
          style={{
            background: 'var(--color-bg-card)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
              Agency
            </label>
            <select
              value={filters.agency}
              onChange={(e) => handleFilterUpdate('agency', e.target.value)}
              className="w-full appearance-none rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                background: 'var(--color-bg-input)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              {agencies.map((a) => (
                <option key={a} value={a.toLowerCase()}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
              Min Funding ($)
            </label>
            <input
              type="number"
              value={filters.fundingMin}
              onChange={(e) => handleFilterUpdate('fundingMin', e.target.value)}
              placeholder="e.g. 100000"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                background: 'var(--color-bg-input)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
              Max Funding ($)
            </label>
            <input
              type="number"
              value={filters.fundingMax}
              onChange={(e) => handleFilterUpdate('fundingMax', e.target.value)}
              placeholder="e.g. 1000000"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                background: 'var(--color-bg-input)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
              Country
            </label>
            <select
              value={filters.country}
              onChange={(e) => handleFilterUpdate('country', e.target.value)}
              className="w-full appearance-none rounded-xl border px-3 py-2 text-sm outline-none"
              style={{
                background: 'var(--color-bg-input)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            >
              <option value="all">All Countries</option>
              <option value="usa">USA</option>
              <option value="uk">UK</option>
              <option value="eu">EU</option>
              <option value="canada">Canada</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
