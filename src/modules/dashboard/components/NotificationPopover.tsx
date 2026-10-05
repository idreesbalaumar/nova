import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/modules/shared/utils/cn';

export interface DashboardNotification {
  id: string;
  type: 'payment' | 'swap' | 'system' | 'security' | 'compliance';
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const INITIAL_NOTIFICATIONS: DashboardNotification[] = [
  {
    id: 'n1',
    type: 'payment',
    title: 'Settlement Credited (£15,000 GBP)',
    message: 'London Gateway ➔ Lagos NGN Core clearing settled in 0.38s. Rate: 1 GBP = 1,940 NGN.',
    time: '4 mins ago',
    unread: true,
  },
  {
    id: 'n2',
    type: 'swap',
    title: 'Automated Liquidity Rebalance',
    message: 'Swapped ₦25,000,000 NGN to KES at 0.00% spread to support rising Nairobi outbound orders.',
    time: '28 mins ago',
    unread: true,
  },
  {
    id: 'n3',
    type: 'compliance',
    title: 'Statutory Proof Generated',
    message: 'CBN Form A and KRA e-invoicing declarations cryptographically verified for batch #NV-849201.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'n4',
    type: 'security',
    title: 'Real-Time Merkle Proof Validated',
    message: '3-of-5 MPC threshold signature verified on-chain. All reserves 100% backed.',
    time: '5 hours ago',
    unread: false,
  },
];

const getNotificationStyle = (type: string) => {
  switch (type) {
    case 'payment':
      return {
        icon: 'solar:card-send-bold-duotone',
        color: 'text-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-500/10',
      };
    case 'swap':
      return {
        icon: 'solar:refresh-circle-bold-duotone',
        color: 'text-cyan-500',
        bg: 'bg-cyan-50 dark:bg-cyan-500/10',
      };
    case 'compliance':
      return {
        icon: 'solar:document-text-bold-duotone',
        color: 'text-amber-500',
        bg: 'bg-amber-50 dark:bg-amber-500/10',
      };
    case 'security':
      return {
        icon: 'solar:shield-check-bold-duotone',
        color: 'text-violet-500',
        bg: 'bg-violet-50 dark:bg-violet-500/10',
      };
    default:
      return {
        icon: 'solar:bell-bold-duotone',
        color: 'text-amber-600',
        bg: 'bg-amber-50 dark:bg-amber-500/10',
      };
  }
};

export const NotificationPopover: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<DashboardNotification[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markItemAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 flex items-center justify-center shrink-0 rounded-full text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-all active:scale-95 border border-slate-200 dark:border-slate-700/70 shadow-2xs cursor-pointer"
        aria-label="View notifications"
      >
        <Icon icon="solar:bell-bold-duotone" className="w-4 h-4 text-slate-700 dark:text-slate-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex min-w-[15px] h-[15px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-bold text-white border-2 border-white dark:border-slate-900 shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Popover Panel (Matching Trackforte Franchise style) */}
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 p-0 overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-50 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Network Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-[340px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
              {notifications.map((notif) => {
                const style = getNotificationStyle(notif.type);
                return (
                  <div
                    key={notif.id}
                    onClick={() => markItemAsRead(notif.id)}
                    className={cn(
                      'p-3.5 cursor-pointer transition-colors flex gap-3 text-left',
                      notif.unread
                        ? 'bg-amber-50/40 dark:bg-amber-500/5 hover:bg-amber-50/70 dark:hover:bg-amber-500/10'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    )}
                  >
                    <div
                      className={cn(
                        'h-8 w-8 shrink-0 rounded-lg flex items-center justify-center mt-0.5',
                        style.bg,
                        style.color
                      )}
                    >
                      <Icon icon={style.icon} className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <p
                          className={cn(
                            'text-xs font-bold truncate tracking-tight',
                            notif.unread
                              ? 'text-slate-900 dark:text-white'
                              : 'text-slate-600 dark:text-slate-400'
                          )}
                        >
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                          {notif.time}
                        </span>
                      </div>
                      <p className="text-[11px] line-clamp-2 leading-relaxed text-slate-500 dark:text-slate-400">
                        {notif.message}
                      </p>
                    </div>

                    {notif.unread && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 text-center">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                All events verified via 256-bit cryptographic Merkle stream
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPopover;
