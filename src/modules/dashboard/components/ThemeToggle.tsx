import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/modules/shared/utils/cn";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("nova_theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("nova_theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "w-9 h-9 flex items-center justify-center rounded-full transition-all border border-slate-200 dark:border-slate-700/70 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 group relative shadow-2xs shrink-0 cursor-pointer",
        className
      )}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-label="Toggle color theme"
    >
      <div className="relative w-4 h-4 flex items-center justify-center overflow-hidden">
        {/* Sun Icon */}
        <div
          className={cn(
            "absolute transition-all duration-500 transform",
            isDark
              ? "translate-y-10 opacity-0 rotate-90"
              : "translate-y-0 opacity-100 rotate-0 text-amber-500"
          )}
        >
          <Icon icon="solar:sun-2-bold-duotone" className="w-4 h-4" />
        </div>

        {/* Moon Icon */}
        <div
          className={cn(
            "absolute transition-all duration-500 transform",
            !isDark
              ? "-translate-y-10 opacity-0 -rotate-90"
              : "translate-y-0 opacity-100 rotate-0 text-amber-400"
          )}
        >
          <Icon icon="solar:moon-bold-duotone" className="w-4 h-4" />
        </div>
      </div>

      {/* Tooltip hint for premium feel */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl border border-slate-800 z-50">
        {!isDark ? "Go Dark" : "Go Light"}
      </span>
    </button>
  );
};

export default ThemeToggle;
