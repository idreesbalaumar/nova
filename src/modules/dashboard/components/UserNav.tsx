import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/modules/shared/utils/cn';
import { LogoutConfirmDialog } from './LogoutConfirmDialog';

export interface UserNavProps {
  user: {
    name: string;
    email: string;
    organization?: string;
    role?: string;
    avatarUrl?: string;
  };
  onSignOut: () => void;
  onNavigateHome: () => void;
  onNavigateDashboard?: () => void;
  onSelectTab?: (tab: string) => void;
  className?: string;
  subtitle?: string;
}

export const UserNav: React.FC<UserNavProps> = ({
  user,
  onSignOut,
  onNavigateHome,
  onNavigateDashboard,
  onSelectTab,
  className,
  subtitle,
}) => {
  const [open, setOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const displayName = user.name || 'Amara Okonkwo';
  const displaySubtitle = subtitle || user.organization || user.email;
  const initials = getInitials(displayName);

  const handleGoDashboard = () => {
    if (onSelectTab) {
      onSelectTab('dashboard');
    } else if (onNavigateDashboard) {
      onNavigateDashboard();
    }
  };

  const menuItems = [
    {
      label: 'Command Center',
      tabId: 'dashboard',
      icon: 'solar:widget-add-line-duotone',
      action: handleGoDashboard,
    },
    {
      label: 'Account Balances',
      tabId: 'balances',
      icon: 'solar:wallet-money-bold-duotone',
      action: () => onSelectTab && onSelectTab('balances'),
    },
    {
      label: 'Transactions Ledger',
      tabId: 'transactions',
      icon: 'solar:document-text-bold-duotone',
      action: () => onSelectTab && onSelectTab('transactions'),
    },
    {
      label: 'Revenue & Spending',
      tabId: 'revenue',
      icon: 'solar:chart-2-bold-duotone',
      action: () => onSelectTab && onSelectTab('revenue'),
    },
    {
      label: 'AI Copilot Insights',
      tabId: 'insights',
      icon: 'solar:stars-bold-duotone',
      action: () => onSelectTab && onSelectTab('insights'),
    },
    {
      label: 'Public Network Map',
      tabId: 'public',
      icon: 'solar:global-bold-duotone',
      action: onNavigateHome,
    },
  ];

  return (
    <>
      <div className={cn('relative', className)}>
        {/* Trigger Button (Directly modeled after Trackforte UserNav) */}
        <button
          id="user-nav-trigger"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 px-2 py-1.5 active:scale-95 transition-transform outline-none cursor-pointer"
          aria-label="User navigation menu"
        >
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-slate-900 dark:text-white leading-none tracking-tight">
              {displayName}
            </p>
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1 max-w-[150px] truncate">
              {displaySubtitle}
            </p>
          </div>

          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-500 via-amber-600 to-emerald-600 flex items-center justify-center text-white text-[12px] font-black shadow-sm border-2 border-white dark:border-slate-800 overflow-hidden">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            {/* Bottom-right badge with ChevronDown icon */}
            <div className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center w-4 h-4 bg-slate-500 dark:bg-slate-600 rounded-full border-[1.5px] border-white dark:border-slate-900 shadow-sm">
              <Icon
                icon="solar:alt-arrow-down-linear"
                className={cn('w-2.5 h-2.5 text-white transition-transform duration-200', open && 'rotate-180')}
              />
            </div>
          </div>
        </button>

        {/* Dropdown Menu Container */}
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

            <div className="absolute right-0 top-full mt-2 w-64 p-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95">
              {/* User info header */}
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {displayName}
                </p>
                <p className="text-[12px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {user.email}
                </p>

                {user.role && (
                  <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/80 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 font-mono tracking-tight">
                    <Icon icon="solar:shield-check-bold" className="w-3 h-3 text-emerald-500" />
                    <span>{user.role}</span>
                  </span>
                )}
              </div>

              {/* Menu items */}
              <div className="px-2 py-2 border-b border-slate-100 dark:border-slate-800">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setOpen(false);
                      item.action();
                    }}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all rounded-xl cursor-pointer outline-none text-left"
                  >
                    <Icon icon={item.icon} width="18" className="text-slate-400 dark:text-slate-500 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Log out item */}
              <div className="px-2 py-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    setLogoutDialogOpen(true);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all rounded-xl cursor-pointer outline-none text-left"
                >
                  <Icon icon="solar:logout-2-bold" className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Confirmation Dialog on Log Out */}
      <LogoutConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        onConfirm={onSignOut}
      />
    </>
  );
};

export default UserNav;
