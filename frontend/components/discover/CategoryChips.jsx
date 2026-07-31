import { motion } from 'framer-motion';

export default function CategoryChips({ categories, selectedCategory, onSelectCategory }) {
  if (!categories) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.name;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            className="relative flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all"
            style={{
              background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--color-bg-card)',
              color: isSelected ? '#3b82f6' : 'var(--color-text-secondary)',
              border: `1px solid ${isSelected ? 'rgba(59, 130, 246, 0.3)' : 'var(--color-border-primary)'}`,
            }}
          >
            <span>{cat.name}</span>
            <span
              className="rounded-full px-1.5 py-0.2 text-[10px]"
              style={{
                background: isSelected ? '#3b82f6' : 'var(--color-bg-tertiary)',
                color: isSelected ? '#ffffff' : 'var(--color-text-tertiary)',
              }}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
