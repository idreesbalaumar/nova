import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void | Promise<void>;
}

export const LogoutConfirmDialog: React.FC<LogoutConfirmDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await onConfirm();
    } finally {
      setIsLoggingOut(false);
      onOpenChange(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isLoggingOut && onOpenChange(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-[360px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10"
          >
            <div className="p-6 pb-5 text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center ring-1 ring-rose-100 dark:ring-rose-500/20 mb-3.5">
                <Icon
                  icon="solar:logout-2-bold-duotone"
                  className="w-7 h-7 text-rose-600 dark:text-rose-400"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Sign out?
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5">
                You'll need to sign in again to access your African treasury workspace and manage cross-border settlements.
              </p>
            </div>

            <div className="flex border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => onOpenChange(false)}
                className="flex-1 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-r border-slate-100 dark:border-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleLogout}
                className="flex-1 px-4 py-3 text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoggingOut ? (
                  <>
                    <Icon icon="solar:restart-bold" className="w-4 h-4 animate-spin" />
                    <span>Signing out…</span>
                  </>
                ) : (
                  <>
                    <Icon icon="solar:logout-2-bold" className="w-4 h-4" />
                    <span>Sign out</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default LogoutConfirmDialog;
