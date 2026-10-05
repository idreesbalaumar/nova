import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Logo } from '@/modules/shared/components/Logo';
import { NotificationPopover } from './components/NotificationPopover';
import { UserNav } from './components/UserNav';
import { cn } from '@/modules/shared/utils/cn';

export interface DashboardLayoutProps {
  user: {
    name: string;
    email: string;
    organization?: string;
    role?: string;
  };
  onSignOut: () => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  onSignOut,
  onNavigateHome,
  children,
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settlements' | 'corridors' | 'wallets' | 'insights'>('dashboard');
  const [isDark, setIsDark] = useState(false);

  // Sync theme
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nova_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nova_theme', 'dark');
      setIsDark(true);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'solar:widget-bold-duotone' },
    { id: 'settlements', label: 'Settlements & Payouts', icon: 'solar:card-send-bold-duotone' },
    { id: 'corridors', label: 'Corridors & FX', icon: 'solar:routing-2-bold-duotone' },
    { id: 'wallets', label: 'Multi-Currency Wallets', icon: 'solar:wallet-money-bold-duotone' },
    { id: 'insights', label: 'AI Intelligence', icon: 'solar:chart-square-bold-duotone' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
      {/* ── Top Sticky Header (Directly modeled after Trackforte Franchise Layout) ── */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Logo
                variant="full"
                size="sm"
                className="hover:scale-105 transition-transform"
                onClick={onNavigateHome}
                subtitle="Financial OS"
              />

              {/* Environment Tag */}
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                MAINNET LIVE
              </span>
            </div>

            {/* Navigation Tabs - Desktop (Matching Trackforte) */}
            <nav id="main-nav" className="hidden lg:flex items-center gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer',
                    activeTab === item.id
                      ? 'bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 border-amber-200 dark:border-amber-700/60 shadow-2xs'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  <Icon icon={item.icon} className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Profile & Actions */}
            <div className="flex items-center gap-2">
              {/* Mesh Telemetry Pill */}
              <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[11px]">
                  <strong>24,891</strong> TPS
                </span>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700/70 shadow-2xs cursor-pointer"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? (
                  <Icon icon="solar:sun-bold" className="w-4 h-4 text-amber-400" />
                ) : (
                  <Icon icon="solar:moon-bold" className="w-4 h-4 text-amber-700" />
                )}
              </button>

              {/* Notifications Popover */}
              <NotificationPopover />

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

              {/* User Dropdown Nav */}
              <UserNav
                user={user}
                onSignOut={onSignOut}
                onNavigateHome={onNavigateHome}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content Area with Breadcrumbs ── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5">
        {/* Breadcrumb Navigation (Trackforte Franchise style) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-medium">
          <button
            onClick={onNavigateHome}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Icon icon="solar:home-2-bold" className="w-3.5 h-3.5" />
            <span>NOVA</span>
          </button>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-300 font-bold">
            {activeTab === 'dashboard'
              ? 'Treasury Operations'
              : activeTab === 'settlements'
              ? 'Settlements & Payouts'
              : activeTab === 'corridors'
              ? 'African Corridors'
              : activeTab === 'wallets'
              ? 'Multi-Currency Wallets'
              : 'AI Intelligence'}
          </span>
        </nav>

        {children}
      </main>

      {/* ── Footer (Trackforte Style) ── */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80 py-5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} NOVA Financial Technologies Ltd. Pan-African Financial Operating System.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Bank-Grade 256-Bit SSL</span>
            <span>•</span>
            <span>ISO 27001 Certified</span>
            <span>•</span>
            <span>NDPR & GDPR Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
