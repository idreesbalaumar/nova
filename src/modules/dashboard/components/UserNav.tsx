import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/modules/shared/utils/cn';

export interface UserNavProps {
  user: {
    name: string;
    email: string;
    organization?: string;
    role?: string;
  };
  onSignOut: () => void;
  onNavigateHome: () => void;
  onNavigateDashboard?: () => void;
  className?: string;
}

export const UserNav: React.FC<UserNavProps> = ({
  user,
  onSignOut,
  onNavigateHome,
  onNavigateDashboard,
  className,
}) => {
  const [open, setOpen] = useState(false);

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(user.name || 'Amara Okonkwo');
  const orgName = user.organization || 'Afrigate Commerce Ltd';
  const roleName = user.role || 'Lead Treasury Administrator';

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 px-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-95 outline-none cursor-pointer"
        aria-label="User navigation menu"
      >
        <div className="hidden sm:block text-right">
          <p className="text-xs font-bold text-slate-800 dark:text-white leading-none tracking-tight">
            {user.name}
          </p>
          <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1 max-w-[140px] truncate">
            {orgName}
          </p>
        </div>

        <div className="relative">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-amber-500 via-amber-600 to-emerald-600 flex items-center justify-center text-white text-xs font-black shadow-md border-2 border-white dark:border-slate-800">
            {initials}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
        </div>

        <Icon
          icon="solar:alt-arrow-down-linear"
          className={cn(
            'w-3.5 h-3.5 text-slate-400 transition-transform duration-200 hidden sm:block',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-full mt-2 w-64 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-50 animate-in fade-in zoom-in-95">
            {/* Header info */}
            <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
              <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[10px] font-semibold text-amber-800 dark:text-amber-300">
                <Icon icon="solar:shield-check-bold" className="w-3 h-3 text-emerald-500" />
                <span>{roleName}</span>
              </div>
            </div>

            {/* Menu Links */}
            <div className="py-1.5 space-y-0.5">
              <button
                onClick={() => {
                  setOpen(false);
                  if (onNavigateDashboard) onNavigateDashboard();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
              >
                <Icon icon="solar:widget-bold-duotone" className="w-4 h-4 text-amber-500" />
                <span>Treasury Overview</span>
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  if (onNavigateDashboard) onNavigateDashboard();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
              >
                <Icon icon="solar:routing-2-bold-duotone" className="w-4 h-4 text-emerald-500" />
                <span>Corridors & Liquidity</span>
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  if (onNavigateDashboard) onNavigateDashboard();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
              >
                <Icon icon="solar:wallet-money-bold-duotone" className="w-4 h-4 text-cyan-500" />
                <span>Multi-Currency Wallets</span>
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  onNavigateHome();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
              >
                <Icon icon="solar:global-bold-duotone" className="w-4 h-4 text-indigo-500" />
                <span>Public Website</span>
              </button>
            </div>

            {/* Logout Divider */}
            <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setOpen(false);
                  onSignOut();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left cursor-pointer"
              >
                <Icon icon="solar:logout-2-bold-duotone" className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserNav;
