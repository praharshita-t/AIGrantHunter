import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, Moon, Sun, Menu, ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function TopNavigation({ user, unreadCount, onMobileMenuToggle }) {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    const handleScroll = () => {
      setScrolled(main.scrollTop > 10);
    };
    main.addEventListener('scroll', handleScroll);
    return () => main.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b px-4 sm:px-6 transition-all duration-300"
      style={{
        borderColor: 'var(--color-border-primary)',
        background: scrolled ? 'var(--color-surface-glass)' : 'var(--color-bg-secondary)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden rounded-lg p-2 transition-colors"
        style={{ color: 'var(--color-text-secondary)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-card-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors"
          style={{
            color: searchFocused ? 'var(--color-border-accent)' : 'var(--color-text-tertiary)',
          }}
        />
        <input
          type="text"
          placeholder="Search grants, tasks, settings..."
          className="w-full rounded-xl border py-2 pl-10 pr-4 text-sm transition-all duration-200 outline-none"
          style={{
            background: 'var(--color-bg-input)',
            borderColor: searchFocused ? 'var(--color-border-accent)' : 'var(--color-border-primary)',
            color: 'var(--color-text-primary)',
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <kbd
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md px-1.5 py-0.5 text-[10px] font-medium sm:inline-block"
          style={{
            background: 'var(--color-bg-tertiary)',
            color: 'var(--color-text-tertiary)',
            border: '1px solid var(--color-border-primary)',
          }}
        >
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-card-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        <button
          onClick={() => navigate('/notifications')}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-card-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <Bell className="h-[18px] w-[18px]" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white"
            >
              {unreadCount}
            </motion.span>
          )}
        </button>

        <div
          className="hidden sm:block h-6 w-px mx-1"
          style={{ background: 'var(--color-border-primary)' }}
        />

        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-card-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-semibold text-white">
            {user?.name
              ? user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
              : 'SC'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {user?.name || 'Dr. Sarah Chen'}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {user?.institution || 'Stanford University'}
            </p>
          </div>
          <ChevronDown
            className="hidden sm:block h-4 w-4"
            style={{ color: 'var(--color-text-tertiary)' }}
          />
        </button>
      </div>
    </header>
  );
}
