import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/modules/shared/utils/cn';

export type AlertType = 'success' | 'info' | 'warning' | 'error';

export interface AlertProps {
  type: AlertType;
  title?: string;
  message: React.ReactNode;
  onClose?: () => void;
  className?: string;
  autoClose?: boolean;
  duration?: number;
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  className,
  autoClose = false,
  duration = 5000,
}) => {
  const [visible, setVisible] = useState(true);

  const handleClose = useCallback(() => {
    setVisible(false);
    if (onClose) onClose();
  }, [onClose]);

  useEffect(() => {
    if (!autoClose || duration <= 0) return;
    const timer = setTimeout(() => {
      handleClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [autoClose, duration, handleClose]);

  if (!visible) return null;

  const typeConfig: Record<
    AlertType,
    { bg: string; border: string; text: string; icon: string; iconColor: string }
  > = {
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-200 dark:border-emerald-800/60',
      text: 'text-emerald-900 dark:text-emerald-200',
      icon: 'solar:check-circle-bold',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    info: {
      bg: 'bg-sky-50 dark:bg-sky-950/40',
      border: 'border-sky-200 dark:border-sky-800/60',
      text: 'text-sky-900 dark:text-sky-200',
      icon: 'solar:info-circle-bold',
      iconColor: 'text-sky-600 dark:text-sky-400',
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-200 dark:border-amber-800/60',
      text: 'text-amber-900 dark:text-amber-200',
      icon: 'solar:danger-triangle-bold',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    error: {
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      border: 'border-rose-200 dark:border-rose-800/60',
      text: 'text-rose-900 dark:text-rose-200',
      icon: 'solar:danger-circle-bold',
      iconColor: 'text-rose-600 dark:text-rose-400',
    },
  };

  const config = typeConfig[type];

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all shadow-xs',
        config.bg,
        config.border,
        config.text,
        className
      )}
    >
      <Icon icon={config.icon} className={cn('w-5 h-5 shrink-0 mt-0.5', config.iconColor)} />
      <div className="flex-1 min-w-0 pr-6">
        {title && <h4 className="font-bold mb-0.5 tracking-tight">{title}</h4>}
        <div className="text-[12px] sm:text-xs opacity-90">{message}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 p-1 rounded-md opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-opacity cursor-pointer"
          aria-label="Dismiss alert"
        >
          <Icon icon="solar:close-circle-linear" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
