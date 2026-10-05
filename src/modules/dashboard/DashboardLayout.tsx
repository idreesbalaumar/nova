import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Logo } from '@/modules/shared/components/Logo';
import { NotificationPopover } from './components/NotificationPopover';
import { UserNav } from './components/UserNav';
import { cn } from '@/modules/shared/utils/cn';

export type DashboardTab = 'dashboard' | 'balances' | 'transactions' | 'revenue' | 'insights';

export interface DashboardLayoutProps {
  user: {
    name: string;
    email: string;
    organization?: string;
    role?: string;
  };
  onSignOut: () => void;
  onNavigateHome: () => void;
  activeTab?: DashboardTab;
  onSelectTab?: (tab: DashboardTab) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  onSignOut,
  onNavigateHome,
  activeTab: externalTab,
  onSelectTab: externalSetTab,
  children,
}) => {
  const [internalTab, setInternalTab] = useState<DashboardTab>('dashboard');
  const activeTab = externalTab !== undefined ? externalTab : internalTab;
  const setActiveTab = externalSetTab !== undefined ? externalSetTab : setInternalTab;
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { id: 'dashboard' as const, label: 'Dashboard', icon: 'solar:widget-bold-duotone' },
    { id: 'balances' as const, label: 'Account Balances', icon: 'solar:wallet-money-bold-duotone' },
    { id: 'transactions' as const, label: 'Transactions', icon: 'solar:card-send-bold-duotone' },
    { id: 'revenue' as const, label: 'Revenue & Spending', icon: 'solar:chart-2-bold-duotone' },
    { id: 'insights' as const, label: 'Financial Insights', icon: 'solar:stars-bold-duotone' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
      {/* ── Top Sticky Header (Directly modeled after Trackforte Franchise Layout) ── */}
      <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Logo
                variant="full"
                size="sm"
                className="hover:scale-105 transition-transform"
                onClick={onNavigateHome}
                subtitle="Financial OS"
              />

              {/* Environment Tag */}
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                MAINNET LIVE
              </span>
            </div>

            {/* Navigation Tabs - Desktop (Matching Trackforte) */}
            <nav id="main-nav" className="hidden lg:flex items-center gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
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

              {/* Mobile hamburger menu */}
              <div className="lg:hidden ml-1">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer"
                  aria-label="Toggle dashboard menu"
                >
                  {mobileMenuOpen ? (
                    <Icon icon="solar:close-circle-linear" className="w-5 h-5 text-amber-600" />
                  ) : (
                    <Icon icon="solar:hamburger-menu-linear" className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-3 space-y-1 animate-in fade-in slide-in-from-top-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left',
                  activeTab === item.id
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 border border-amber-200 dark:border-amber-700/60'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                <Icon icon={item.icon} className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
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
          <button
            onClick={() => setActiveTab('dashboard')}
            className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            Treasury
          </button>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-200 font-bold">
            {activeTab === 'dashboard'
              ? 'Executive Command Center'
              : activeTab === 'balances'
              ? 'Multi-Currency Accounts'
              : activeTab === 'transactions'
              ? 'Settlement Stream & Ledger'
              : activeTab === 'revenue'
              ? 'Revenue & Cashflow Analytics'
              : 'AI Intelligence & Insights'}
          </span>
        </nav>

        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<any>, { activeTab, setActiveTab })
          : children}
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
