import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "../shared/utils/cn";

interface HeroMapBackgroundProps {
  isDarkMode?: boolean;
  className?: string;
}

export const HeroMapBackground: React.FC<HeroMapBackgroundProps> = ({
  isDarkMode = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none select-none overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* 1. World Map Overlay Layer (Exact architecture from Charity Grants SuccessStories) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <div
          className="w-full h-full max-w-[1380px] mx-auto bg-center bg-no-repeat bg-contain opacity-25 sm:opacity-30 dark:opacity-20 transition-opacity transform scale-110 sm:scale-105"
          style={{
            backgroundImage: isDarkMode
              ? `url('/images/world-map.svg')`
              : `url('/images/world-map-dark.svg')`,
            maskImage:
              "radial-gradient(ellipse 80% 75% at 50% 50%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 75% at 50% 50%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* 2. Soft Ambient Radial Glow Backdrop */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-[12%] sm:top-[15%] w-[420px] sm:w-[680px] lg:w-[920px] h-[380px] sm:h-[540px] lg:h-[700px] rounded-full blur-3xl pointer-events-none -z-10",
          isDarkMode
            ? "bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-transparent"
            : "bg-gradient-to-br from-amber-200/40 via-emerald-100/35 to-amber-50/20"
        )}
      />

      {/* 3. Concentric Orbit Rings & Radial Spokes (SuccessStories signature network) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[8%] sm:top-[10%] md:top-[12%] w-[420px] sm:w-[580px] md:w-[720px] lg:w-[840px] aspect-square flex items-center justify-center pointer-events-none opacity-60 dark:opacity-40">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-amber-500/25 dark:border-amber-400/20" />
        {/* Middle Ring */}
        <div className="absolute w-[72%] h-[72%] rounded-full border border-emerald-500/25 dark:border-emerald-400/20" />
        {/* Inner Ring */}
        <div className="absolute w-[42%] h-[42%] rounded-full border border-amber-500/30 dark:border-amber-400/25" />

        {/* Radial Axis Spokes */}
        <div className="w-full h-px bg-amber-500/20 dark:bg-amber-400/15 absolute" />
        <div className="h-full w-px bg-amber-500/20 dark:bg-amber-400/15 absolute" />
        <div className="w-full h-px bg-emerald-500/20 dark:bg-emerald-400/15 absolute rotate-45" />
        <div className="w-full h-px bg-emerald-500/20 dark:bg-emerald-400/15 absolute -rotate-45" />

        {/* Center Translucent Hub with Core Emblem */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-amber-500/10 dark:bg-amber-400/10 backdrop-blur-xs border border-amber-500/25 flex items-center justify-center">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-emerald-500/15 dark:bg-emerald-400/15 backdrop-blur-sm border border-emerald-500/30 flex items-center justify-center">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Icon icon="solar:global-bold" className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMapBackground;
