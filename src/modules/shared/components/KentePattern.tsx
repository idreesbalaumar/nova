import React from "react";
import { cn } from "../utils/cn";

interface KenteRibbonProps {
  className?: string;
  height?: number;
  orientation?: "horizontal" | "vertical";
}

/**
 * Authentic Ghanaian Kente Cloth geometric pattern
 * Recreated with SVG vector precision from traditional Asante & Ewe weave patterns:
 * - Gold / Ochre (#E5A93C, #F59E0B): Royalty, wealth, prosperity
 * - Emerald Green (#059669, #10B981): Growth, harvest, renewal
 * - Cobalt / Royal Blue (#1D4ED8, #2563EB): Harmony, peace, wisdom
 * - Terracotta / Crimson (#B91C1C, #C2410C): Vitality, ancestral strength
 * - Rich Ebony (#18181B): Grounding, maturity
 */
export const KenteRibbon: React.FC<KenteRibbonProps> = ({
  className,
  height = 8,
  orientation = "horizontal",
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden pointer-events-none select-none",
        orientation === "horizontal" ? "w-full" : "h-full",
        className
      )}
      style={{
        height: orientation === "horizontal" ? `${height}px` : "100%",
        width: orientation === "vertical" ? `${height}px` : "100%",
      }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 480 24"
      >
        <defs>
          <pattern
            id="kente-authentic-pattern"
            width="120"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            {/* Base Golden Warp Threads */}
            <rect width="120" height="24" fill="#F59E0B" />

            {/* Block 1: Emerald & Gold Chevrons */}
            <path
              d="M0 0 L15 12 L0 24 L8 24 L23 12 L8 0 Z"
              fill="#059669"
            />
            <path
              d="M15 0 L30 12 L15 24 L22 24 L37 12 L22 0 Z"
              fill="#1D4ED8"
            />

            {/* Central Diamond Unit */}
            <polygon
              points="45,12 55,2 65,12 55,22"
              fill="#18181B"
            />
            <polygon
              points="48,12 55,5 62,12 55,19"
              fill="#F59E0B"
            />
            <polygon
              points="51,12 55,8 59,12 55,16"
              fill="#059669"
            />

            {/* Vertical Loom Grid Stripes (Black & Terracotta) */}
            <rect x="70" y="0" width="3" height="24" fill="#18181B" />
            <rect x="75" y="0" width="3" height="24" fill="#B91C1C" />
            <rect x="80" y="0" width="3" height="24" fill="#059669" />
            <rect x="85" y="0" width="3" height="24" fill="#1D4ED8" />
            <rect x="90" y="0" width="3" height="24" fill="#18181B" />

            {/* Block 3: Inverted Stepped Chevrons */}
            <path
              d="M98 0 L108 12 L98 24 L103 24 L113 12 L103 0 Z"
              fill="#B91C1C"
            />
            <path
              d="M108 0 L118 12 L108 24 L114 24 L124 12 L114 0 Z"
              fill="#059669"
            />

            {/* Fine Horizontal Weft Weave Texture Lines */}
            <line x1="0" y1="4" x2="120" y2="4" stroke="#D97706" strokeWidth="0.75" opacity="0.6" />
            <line x1="0" y1="8" x2="120" y2="8" stroke="#78350F" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="12" x2="120" y2="12" stroke="#D97706" strokeWidth="0.75" opacity="0.6" />
            <line x1="0" y1="16" x2="120" y2="16" stroke="#78350F" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="20" x2="120" y2="20" stroke="#D97706" strokeWidth="0.75" opacity="0.6" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#kente-authentic-pattern)" />
      </svg>
    </div>
  );
};

export default KenteRibbon;
