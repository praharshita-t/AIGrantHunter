import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  X,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/components/common/utils';

const iconMap = {
  LayoutDashboard,
  Search,
  CalendarCheck,
  Bell,
  Settings,
};

export default function Sidebar({
  links,
  user,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const sidebarContent = (
    <div className="flex h-full flex-col" style={{ background: 'var(--color-bg-secondary)' }}>
      {/* Logo */}
      <div
        className="flex h-16 items-center gap-3 border-b px-4"
        style={{ borderColor: 'var(--color-border-primary)' }}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <span
                className="whitespace-nowrap text-lg font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Grant<span className="text-blue-500">AI</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onMobileClose}
          className="ml-auto lg:hidden rounded-lg p-1.5 transition-colors hover:bg-white/10"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 p-3">
        {links.map((link) => {
          const Icon = iconMap[link.icon] || LayoutDashboard;
          const isActive = location.pathname === link.path;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onMobileClose}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                collapsed && 'justify-center px-2'
              )}
              style={{
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                background: isActive ? 'var(--color-bg-card-hover)' : 'transparent',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'var(--color-bg-card-hover)',
                    border: '1px solid var(--color-border-secondary)',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-3">
                <Icon
                  className={cn(
                    'h-[18px] w-[18px] shrink-0 transition-colors',
                    isActive ? 'text-blue-500' : ''
                  )}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {link.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>

              {collapsed && (
                <div
                  className="pointer-events-none absolute left-full ml-2 hidden rounded-lg px-2.5 py-1.5 text-xs font-medium opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block"
                  style={{
                    background: 'var(--color-bg-elevated)',
                    color: 'var(--color-text-primary)',
                    border: '1px solid var(--color-border-primary)',
                  }}
                >
                  {link.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div
        className="space-y-2 border-t p-3"
        style={{ borderColor: 'var(--color-border-primary)' }}
      >
        <button
          onClick={toggleTheme}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
            collapsed && 'justify-center px-2'
          )}
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-card-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          {theme === 'dark' ? (
            <Sun className="h-[18px] w-[18px] shrink-0" />
          ) : (
            <Moon className="h-[18px] w-[18px] shrink-0" />
          )}
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <div
          className={cn(
            'flex items-center gap-3 rounded-xl px-3 py-2.5',
            collapsed && 'justify-center px-2'
          )}
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
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="min-w-0 overflow-hidden"
              >
                <p
                  className="truncate text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {user?.name || 'Dr. Sarah Chen'}
                </p>
                <p
                  className="truncate text-xs"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  {user?.role || 'Principal Investigator'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
            collapsed && 'justify-center px-2'
          )}
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-bg-card-hover)';
            e.currentTarget.style.color = 'var(--color-error)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--color-text-secondary)';
          }}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <button
        onClick={onToggleCollapse}
        className="hidden lg:flex h-10 items-center justify-center border-t transition-colors"
        style={{
          borderColor: 'var(--color-border-primary)',
          color: 'var(--color-text-tertiary)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-bg-card-hover)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </div>
  );

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden lg:flex h-full shrink-0 flex-col border-r"
        style={{ borderColor: 'var(--color-border-primary)' }}
      >
        {sidebarContent}
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'var(--color-bg-overlay)' }}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden"
              style={{ boxShadow: 'var(--shadow-lg)' }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
