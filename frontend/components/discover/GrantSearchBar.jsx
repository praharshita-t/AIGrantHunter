import { Search } from 'lucide-react';
import { useState } from 'react';

export default function GrantSearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
        style={{ color: 'var(--color-text-tertiary)' }}
      />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search grants by title, agency, keyword..."
        className="w-full rounded-2xl border py-3.5 pl-12 pr-4 text-sm outline-none transition-all duration-200"
        style={{
          background: 'var(--color-bg-input)',
          borderColor: 'var(--color-border-primary)',
          color: 'var(--color-text-primary)',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--color-border-primary)')}
      />
    </div>
  );
}
