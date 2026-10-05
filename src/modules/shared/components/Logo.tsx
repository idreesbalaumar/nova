import React, { useState } from 'react';
import { cn } from '@/modules/shared/utils/cn';

export type LogoVariant = 'full' | 'icon' | 'text';

export interface LogoProps {
  /** Display variant: 'full' (icon + text), 'icon' (image only), 'text' (text only) */
  variant?: LogoVariant;
  /** Size preset or custom pixel size for the icon */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Show the app name next to the icon */
  showText?: boolean;
  /** Optional subtitle text below or beside the name */
  subtitle?: string;
  /** Additional CSS classes for the root wrapper */
  className?: string;
  /** Additional CSS classes for the icon/image */
  iconClassName?: string;
  /** Additional CSS classes for the text */
  textClassName?: string;
  /** Whether to use the rounded container style */
  rounded?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Force white text for dark backgrounds */
  forceDark?: boolean;
  /** Optional link destination URL */
  href?: string;
  /** Whether to show a vertical line separator divider between icon and text */
  showDivider?: boolean;
  /** Additional CSS classes for the divider line */
  dividerClassName?: string;
  /** Whether the logo is clickable */
  clickable?: boolean;
  /** Whether to render a white background container behind the logo */
  whiteBg?: boolean;
}

const DEFAULT_TITLE = 'NOVA';
const DEFAULT_SUBTITLE = "Africa's Financial Operating System";

const SIZE_MAP = {
  xs: { icon: 22, text: 'text-sm', subtitle: 'text-[7px]', gap: 'gap-1.5', spacing: '-space-y-0.5', dividerOffset: '-ml-0.5', textOffset: '-ml-0.5' },
  sm: { icon: 28, text: 'text-base', subtitle: 'text-[8px]', gap: 'gap-2', spacing: '-space-y-1', dividerOffset: '-ml-0.5', textOffset: '-ml-0.5' },
  md: { icon: 36, text: 'text-xl', subtitle: 'text-[8.5px]', gap: 'gap-2.5', spacing: '-space-y-1', dividerOffset: '-ml-0.5', textOffset: '-ml-0.5' },
  lg: { icon: 44, text: 'text-2xl', subtitle: 'text-[10px]', gap: 'gap-2.5', spacing: '-space-y-1.5', dividerOffset: '-ml-0.5', textOffset: '-ml-0.5' },
  xl: { icon: 56, text: 'text-3xl', subtitle: 'text-[11px]', gap: 'gap-3', spacing: '-space-y-2', dividerOffset: '-ml-0.5', textOffset: '-ml-0.5' },
} as const;

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  showText,
  subtitle,
  className,
  iconClassName,
  textClassName,
  rounded = true,
  onClick,
  forceDark = false,
  href = '#',
  showDivider = true,
  dividerClassName,
  clickable = true,
  whiteBg = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const sizeConfig = typeof size === 'string' ? SIZE_MAP[size] : null;
  const iconPx = sizeConfig ? sizeConfig.icon : size;
  const containerPx = whiteBg ? (iconPx as number) + 6 : iconPx;
  const textClass = sizeConfig ? sizeConfig.text : 'text-xl';
  const subtitleClass = sizeConfig ? sizeConfig.subtitle : 'text-[8.5px]';
  const gapClass = sizeConfig ? sizeConfig.gap : 'gap-2.5';
  const spacingClass = sizeConfig ? sizeConfig.spacing : '-space-y-1';
  const dividerOffsetClass = sizeConfig ? sizeConfig.dividerOffset : '-ml-0.5';

  const shouldShowText = showText ?? variant !== 'icon';
  const showIcon = variant !== 'text';
  const textOffsetClass = showIcon && showDivider ? (sizeConfig ? sizeConfig.textOffset : '-ml-0.5') : '';

  const logoSrc = '/logo.jpg';

  const content = (
    <div
      className={cn(
        'flex items-center select-none transition-all min-w-0',
        gapClass,
        clickable ? 'cursor-pointer' : 'cursor-default',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {showIcon && (
        <div
          className={cn(
            'relative flex items-center justify-center shrink-0 aspect-square transition-all overflow-hidden',
            whiteBg
              ? 'bg-white shadow-xs ring-1 ring-black/5 p-0.5 rounded-md'
              : rounded && 'rounded-md'
          )}
          style={{
            width: containerPx,
            height: containerPx,
            minWidth: containerPx,
            minHeight: containerPx,
            maxWidth: containerPx,
            maxHeight: containerPx,
          }}
        >
          {/* Subtle placeholder while image loads */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300',
              isLoaded ? 'opacity-0 scale-95' : 'opacity-100 scale-100 bg-emerald-500/10'
            )}
          >
            <span
              className="font-black font-sans leading-none text-emerald-600 dark:text-emerald-400 select-none italic"
              style={{ fontSize: `${Math.max(10, Math.round((iconPx as number) * 0.55))}px` }}
            >
              N
            </span>
          </div>

          <img
            src={logoSrc}
            alt="NOVA OS Logo"
            width={iconPx}
            height={iconPx}
            loading="eager"
            decoding="async"
            className={cn(
              'shrink-0 object-cover w-full h-full relative z-10 transition-opacity duration-300 aspect-square',
              rounded && 'rounded-md',
              iconClassName
            )}
            onLoad={(e) => {
              e.currentTarget.style.opacity = '1';
              setIsLoaded(true);
            }}
            onError={(e) => {
              setIsLoaded(true);
            }}
            style={{ opacity: 0 }}
          />
        </div>
      )}

      {showIcon && shouldShowText && showDivider && (
        <div
          className={cn(
            'w-px shrink-0 rounded-full transition-colors translate-y-[1px]',
            dividerOffsetClass,
            forceDark ? 'bg-white/30' : 'bg-slate-300 dark:bg-slate-700',
            dividerClassName
          )}
          style={{ height: `${Math.round((iconPx as number) * 0.9)}px` }}
          aria-hidden="true"
        />
      )}

      {shouldShowText && (
        <div className={cn('flex flex-col justify-center min-w-0 flex-1 overflow-hidden', spacingClass, textOffsetClass)}>
          <div className="flex items-center leading-none min-w-0 w-full overflow-hidden">
            <span
              title={DEFAULT_TITLE}
              className={cn(
                'font-extrabold font-sans tracking-wide leading-none truncate block',
                textClass,
                textClassName
              )}
            >
              <span className={forceDark ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}>
                NOVA
              </span>
              <span className={forceDark ? 'text-white/90' : 'text-slate-800 dark:text-slate-200 ml-1 font-mono text-[0.75em]'}>
                OS
              </span>
            </span>
          </div>

          <span
            title={subtitle ?? DEFAULT_SUBTITLE}
            className={cn(
              'truncate block w-full leading-none font-medium font-sans tracking-normal -mt-0.5',
              forceDark ? 'text-white/70' : 'text-slate-500 dark:text-slate-400',
              subtitleClass
            )}
          >
            {subtitle ?? DEFAULT_SUBTITLE}
          </span>
        </div>
      )}
    </div>
  );

  if (href && clickable) {
    return (
      <a
        href={href}
        className="flex items-center hover:opacity-95 hover:scale-[1.01] transition-all cursor-pointer min-w-0 overflow-hidden"
      >
        {content}
      </a>
    );
  }

  return content;
};

export default Logo;
