import React from "react";
import { cn } from "../utils/cn";

interface AfricanBrushStrokeProps {
  className?: string;
  variant?: "gold" | "emerald" | "terracotta" | "cobalt";
  style?: React.CSSProperties;
}

export const AfricanBrushStroke: React.FC<AfricanBrushStrokeProps> = ({
  className,
  variant = "gold",
  style,
}) => {
  const colors = {
    gold: {
      primary: "#F59E0B",
      secondary: "#D97706",
      accent: "#FEF08A",
    },
    emerald: {
      primary: "#10B981",
      secondary: "#059669",
      accent: "#A7F3D0",
    },
    terracotta: {
      primary: "#EA580C",
      secondary: "#C2410C",
      accent: "#FED7AA",
    },
    cobalt: {
      primary: "#2563EB",
      secondary: "#1D4ED8",
      accent: "#BFDBFE",
    },
  };

  const c = colors[variant];

  return (
    <svg
      className={cn("pointer-events-none select-none", className)}
      viewBox="0 0 320 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`brushGrad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={c.secondary} stopOpacity="0.85" />
          <stop offset="40%" stopColor={c.primary} stopOpacity="0.95" />
          <stop offset="70%" stopColor={c.accent} stopOpacity="0.8" />
          <stop offset="100%" stopColor={c.primary} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      
      {/* Textured organic paint bristle stroke path */}
      <path
        d="M6 32 C 35 18, 90 28, 145 22 C 200 16, 260 26, 312 28 C 305 38, 255 46, 195 44 C 135 42, 75 48, 14 42 C 4 39, 3 35, 6 32 Z"
        fill={`url(#brushGrad-${variant})`}
      />
      {/* Secondary bristle streaks */}
      <path
        d="M18 19 C 55 12, 120 18, 180 14 C 230 10, 275 16, 305 22 C 298 25, 265 24, 210 23 C 150 22, 90 26, 28 25 Z"
        fill={c.primary}
        opacity="0.6"
      />
      <path
        d="M35 44 C 85 46, 145 42, 205 45 C 245 47, 280 43, 298 39 C 275 48, 215 51, 155 49 C 95 47, 55 49, 35 44 Z"
        fill={c.secondary}
        opacity="0.7"
      />
    </svg>
  );
};

export default AfricanBrushStroke;
