import React from 'react';
import { Logo } from './Logo';

export interface RouteSpinnerProps {
  fullScreen?: boolean;
}

export const RouteSpinner: React.FC<RouteSpinnerProps> = ({ fullScreen = true }) => {
  return (
    <div className={`flex items-center justify-center bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md z-50 ${fullScreen ? 'fixed inset-0' : 'py-12 w-full'}`}>
      <div className="flex flex-col justify-center items-center">
        {/* Animated Loader Container */}
        <div className="relative w-20 sm:w-24 h-20 sm:h-24">
          {/* Pulsating Background */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 dark:bg-emerald-500/10 animate-ping" />

          {/* Rotating Outer Ring with Brand Colors */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-emerald-500 dark:border-t-emerald-400 border-b-transparent border-l-cyan-500 dark:border-l-cyan-400 border-r-amber-400 dark:border-r-amber-300" />

          {/* Center Glow Effect */}
          <div className="absolute inset-2 rounded-full bg-white dark:bg-slate-900 shadow-md shadow-emerald-500/10 dark:shadow-none" />

          {/* Logo in the Center */}
          <div className="absolute inset-3 flex justify-center items-center rounded-full">
            <div className="bg-white dark:bg-slate-900 rounded-md p-1 shadow-xs">
              <Logo
                variant="icon"
                size={38}
                rounded={true}
                clickable={false}
              />
            </div>
          </div>
        </div>

        {/* Loading status message */}
        <div className="mt-4 flex flex-col items-center">
          <span className="text-xs font-bold font-mono tracking-wider text-slate-800 dark:text-slate-200 uppercase">
            Initializing NOVA Rail
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            Syncing BFT Consensus Nodes...
          </span>
        </div>
      </div>
    </div>
  );
};

export default RouteSpinner;
