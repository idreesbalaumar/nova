import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Logo } from './Logo';
import { cn } from '@/modules/shared/utils/cn';
import { NotificationPopover } from '@/modules/dashboard/components/NotificationPopover';
import { UserNav } from '@/modules/dashboard/components/UserNav';

export interface NavbarProps {
  onOpenSandbox?: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  isLoggedIn?: boolean;
  onOpenDashboard?: () => void;
  user?: {
    name: string;
    email: string;
    organization?: string;
    role?: string;
  } | null;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenRegister,
  isLoggedIn = false,
  onOpenDashboard,
  user,
  onSignOut,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'network', 'intelligence', 'ai-assistant', 'security'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Sync theme on mount
    const saved = localStorage.getItem('nova_theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nova_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nova_theme', 'light');
    }
  };

  // ── 1. LOGGED IN: SYSTEM WORKSPACE HEADER ────────────────────────────
  if (isLoggedIn) {
    const systemNavItems = [
      { id: 'dashboard', label: 'Dashboard', icon: 'solar:widget-bold-duotone' },
      { id: 'settlements', label: 'Settlements & Payouts', icon: 'solar:card-send-bold-duotone' },
      { id: 'corridors', label: 'Corridors & FX', icon: 'solar:routing-2-bold-duotone' },
      { id: 'wallets', label: 'Wallets', icon: 'solar:wallet-money-bold-duotone' },
      { id: 'insights', label: 'AI Intelligence', icon: 'solar:chart-square-bold-duotone' },
    ];

    const currentUser = user || {
      name: 'Amara Okonkwo',
      email: 'merchant@nova-finance.africa',
      organization: 'Afrigate Commerce Ltd',
      role: 'Head of Global Treasury',
    };

    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm py-2.5 sm:py-3 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo + System Environment Badge */}
            <div className="flex items-center gap-3">
              <Logo
                variant="full"
                size="sm"
                className="hover:scale-105 transition-transform"
                onClick={onOpenDashboard}
                subtitle="Financial OS"
              />
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                MAINNET LIVE
              </span>
            </div>

            {/* System Navigation Tabs (Matching Trackforte System Layout) */}
            <nav id="system-nav" className="hidden lg:flex items-center gap-1.5">
              {systemNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onOpenDashboard?.()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <Icon icon={item.icon} className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Right Profile & Actions */}
            <div className="flex items-center gap-2">
              {/* Quick Action: Go to Console */}
              <button
                onClick={onOpenDashboard}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <Icon icon="solar:widget-bold" className="w-3.5 h-3.5" />
                <span>Console</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700/70 shadow-2xs cursor-pointer"
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDark ? (
                  <Icon icon="solar:sun-bold" className="w-4 h-4 text-amber-400" />
                ) : (
                  <Icon icon="solar:moon-bold" className="w-4 h-4 text-amber-700" />
                )}
              </button>

              {/* Notification Popover */}
              <NotificationPopover />

              <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

              {/* User Dropdown Nav */}
              <UserNav
                user={currentUser}
                onSignOut={onSignOut || (() => {})}
                onNavigateHome={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateDashboard={onOpenDashboard}
              />

              {/* Mobile hamburger */}
              <div className="lg:hidden ml-1">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 cursor-pointer"
                  aria-label="Toggle system menu"
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

          {/* Mobile System Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 p-3.5 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 backdrop-blur-2xl flex flex-col gap-2 shadow-xl animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{currentUser.organization}</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                  LIVE
                </span>
              </div>

              {systemNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard?.();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                >
                  <Icon icon={item.icon} className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{item.label}</span>
                </button>
              ))}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard?.();
                  }}
                  className="w-full py-2.5 rounded-lg text-center text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-emerald-600 shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Icon icon="solar:widget-bold" className="w-3.5 h-3.5" />
                  <span>Open Console</span>
                </button>
                {onSignOut && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignOut();
                    }}
                    className="w-full py-2 rounded-lg text-center text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center gap-1.5"
                  >
                    <Icon icon="solar:logout-2-bold-duotone" className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }

  // ── 2. LOGGED OUT: PUBLIC MARKETING NAVBAR ───────────────────────────
  const marketingNavItems = [
    { name: 'Network Map', path: '#network', id: 'network', icon: 'solar:global-bold' },
    { name: 'Treasury OS', path: '#intelligence', id: 'intelligence', icon: 'solar:wallet-money-bold' },
    { name: 'NOVA AI', path: '#ai-assistant', id: 'ai-assistant', icon: 'solar:magic-stick-3-bold' },
    { name: 'Security & Trust', path: '#security', id: 'security', icon: 'solar:shield-check-bold' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#070A13]/95 backdrop-blur-xl border-b border-amber-500/15 dark:border-white/10 shadow-sm py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo
              variant="full"
              size="md"
              rounded={true}
              subtitle="Africa's Financial Operating System"
              href="#home"
            />
          </div>

          {/* Center Navigation Pill */}
          <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs backdrop-blur-sm">
            {marketingNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 cursor-pointer',
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-400 shadow-2xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  <Icon icon={item.icon} className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-slate-600 transition-colors shadow-2xs cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Icon icon="solar:sun-bold" className="w-4 h-4 text-amber-400" />
              ) : (
                <Icon icon="solar:moon-bold" className="w-4 h-4 text-amber-700" />
              )}
            </button>

            {/* Sign In Button */}
            {onOpenLogin && (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-amber-800 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Icon icon="solar:login-2-linear" className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Open Account CTA */}
            {onOpenRegister && (
              <button
                onClick={onOpenRegister}
                className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 shadow-md shadow-amber-500/20 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <Icon icon="solar:user-plus-bold" className="w-3.5 h-3.5" />
                <span>Open Account</span>
                <Icon icon="solar:alt-arrow-right-linear" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              {isDark ? (
                <Icon icon="solar:sun-bold" className="w-4 h-4 text-amber-400" />
              ) : (
                <Icon icon="solar:moon-bold" className="w-4 h-4 text-amber-700" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <Icon icon="solar:close-circle-linear" className="w-5 h-5 text-amber-600" />
              ) : (
                <Icon icon="solar:hamburger-menu-linear" className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 backdrop-blur-2xl flex flex-col gap-1.5 shadow-xl animate-fade-in">
            {marketingNavItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
              >
                <Icon icon={item.icon} className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{item.name}</span>
              </a>
            ))}

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              {onOpenLogin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 flex items-center justify-center gap-1.5"
                >
                  <Icon icon="solar:login-2-linear" className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}

              {onOpenRegister && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-emerald-600 shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Icon icon="solar:user-plus-bold" className="w-3.5 h-3.5" />
                  <span>Open Account</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
