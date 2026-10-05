import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/modules/shared/utils/cn";

interface FinancialPulseBackgroundProps {
  isDarkMode?: boolean;
  className?: string;
  pulsePosition?: string;
}

export const FinancialPulseBackground: React.FC<FinancialPulseBackgroundProps> = ({
  isDarkMode = false,
  className,
  pulsePosition = "top-1/2",
}) => {
  // Financial liquidity pulse wave path definition across a 1440x320 coordinate space
  // Simulates market momentum, cross-border velocity, and instant payment settlement
  const pulsePath =
    "M 0 160 " +
    // Baseline to Flow 1
    "L 180 160 " +
    // Flow 1: Pre-surge curve
    "C 195 152, 210 152, 225 160 " +
    "L 248 160 " +
    // Velocity Spike (Payment initiated & validated)
    "L 258 168 " +
    "L 272 65 " +
    "L 286 195 " +
    "L 298 160 " +
    // Settlement curve
    "C 314 142, 342 142, 358 160 " +
    // Segment between Flow 1 and Flow 2
    "L 580 160 " +
    // Flow 2 (Center Hero): High-volume cross-border surge
    "C 596 150, 612 150, 628 160 " +
    "L 652 160 " +
    // High instant settlement peak
    "L 662 172 " +
    "L 678 50 " +
    "L 694 205 " +
    "L 708 160 " +
    // Return to equilibrium
    "C 726 138, 756 138, 774 160 " +
    // Segment between Flow 2 and Flow 3
    "L 1000 160 " +
    // Flow 3: Regional disbursement
    "C 1016 152, 1032 152, 1048 160 " +
    "L 1072 160 " +
    // Swift confirmation spike
    "L 1082 168 " +
    "L 1096 65 " +
    "L 1110 195 " +
    "L 1122 160 " +
    // Completed transfer curve
    "C 1138 142, 1166 142, 1182 160 " +
    // Baseline to End
    "L 1440 160";

  // Secondary harmonic wave (subtler echo pulse slightly shifted)
  const secondaryPath =
    "M 0 175 " +
    "L 220 175 " +
    "C 232 168, 244 168, 256 175 " +
    "L 276 175 " +
    "L 284 182 " +
    "L 296 95 " +
    "L 308 202 " +
    "L 318 175 " +
    "C 332 160, 354 160, 368 175 " +
    "L 620 175 " +
    "C 634 167, 648 167, 662 175 " +
    "L 682 175 " +
    "L 690 184 " +
    "L 704 70 " +
    "L 718 210 " +
    "L 730 175 " +
    "C 746 156, 770 156, 786 175 " +
    "L 1040 175 " +
    "C 1054 168, 1068 168, 1082 175 " +
    "L 1102 175 " +
    "L 1110 182 " +
    "L 1122 95 " +
    "L 1134 202 " +
    "L 1144 175 " +
    "C 1158 160, 1180 160, 1194 175 " +
    "L 1440 175";

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none",
        className
      )}
      aria-hidden="true"
    >
      {/* Ambient Pulsing Glow Orbs in Pan-African Emerald & Gold tones */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[420px] md:w-[540px] lg:w-[680px] h-[180px] sm:h-[240px] md:h-[290px] lg:h-[360px] pointer-events-none",
          pulsePosition
        )}
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1.02, 1.2, 1],
            opacity: isDarkMode ? [0.15, 0.28, 0.18, 0.32, 0.15] : [0.25, 0.45, 0.3, 0.5, 0.25],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            "w-full h-full rounded-full blur-3xl",
            isDarkMode
              ? "bg-gradient-to-r from-emerald-500/25 via-teal-400/20 to-amber-500/20"
              : "bg-gradient-to-r from-emerald-200/50 via-teal-200/40 to-amber-100/60"
          )}
        />
      </div>

      {/* Subtle Financial Pulse Rings in the Center */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none",
          pulsePosition
        )}
      >
        <motion.div
          animate={{
            scale: [0.8, 1.8],
            opacity: isDarkMode ? [0.35, 0] : [0.45, 0],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className={cn(
            "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border",
            isDarkMode ? "border-emerald-400/40" : "border-emerald-500/40"
          )}
        />
        <motion.div
          animate={{
            scale: [0.8, 2.3],
            opacity: isDarkMode ? [0.25, 0] : [0.35, 0],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: 0.35,
            ease: "easeOut",
          }}
          className={cn(
            "absolute w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border",
            isDarkMode ? "border-emerald-400/30" : "border-teal-500/30"
          )}
        />
      </div>

      {/* SVG Pulse Line Canvas */}
      <svg
        className={cn(
          "absolute left-0 w-full h-[180px] sm:h-[240px] md:h-[300px] lg:h-[360px] xl:h-[400px] opacity-90 -translate-y-1/2",
          pulsePosition
        )}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle financial network telemetry grid pattern */}
          <pattern
            id="financial-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={
                isDarkMode ? "rgba(255, 255, 255, 0.03)" : "rgba(16, 185, 129, 0.06)"
              }
              strokeWidth="1"
            />
            {/* Small intersection node */}
            <circle
              cx="40"
              cy="0"
              r="0.75"
              fill={
                isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(16, 185, 129, 0.12)"
              }
            />
          </pattern>

          {/* Glowing pulse line gradient using NOVA Emerald (#059669 / #10B981) */}
          <linearGradient id="financialGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDarkMode ? "#10B981" : "#059669"} stopOpacity="0" />
            <stop offset="20%" stopColor={isDarkMode ? "#34D399" : "#10B981"} stopOpacity="0.4" />
            <stop offset="50%" stopColor={isDarkMode ? "#6EE7B7" : "#047857"} stopOpacity="1" />
            <stop offset="80%" stopColor={isDarkMode ? "#34D399" : "#10B981"} stopOpacity="0.4" />
            <stop offset="100%" stopColor={isDarkMode ? "#10B981" : "#059669"} stopOpacity="0" />
          </linearGradient>

          {/* Soft blur filter for financial glowing laser effect */}
          <filter id="financialGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Telemetry background grid overlay */}
        <rect width="100%" height="100%" fill="url(#financial-grid)" />

        {/* 1. Static Ambient Background Track */}
        <path
          d={pulsePath}
          fill="none"
          stroke={
            isDarkMode
              ? "rgba(16, 185, 129, 0.2)"
              : "rgba(5, 150, 105, 0.18)"
          }
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 2. Secondary Echo Wave (Delicate harmonic rhythm) */}
        <motion.path
          d={secondaryPath}
          fill="none"
          stroke={
            isDarkMode
              ? "rgba(45, 212, 191, 0.16)"
              : "rgba(13, 148, 136, 0.14)"
          }
          strokeWidth="1"
          strokeDasharray="4 8"
          animate={{
            strokeDashoffset: [0, -120],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* 3. Glowing Pulse Beam Trace Layer */}
        <motion.path
          d={pulsePath}
          fill="none"
          stroke={isDarkMode ? "#10B981" : "#059669"}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#financialGlow)"
          initial={{ pathLength: 0.18, pathOffset: 0, opacity: 0 }}
          animate={{
            pathOffset: [0, 1],
            opacity: [0.35, 0.9, 1, 0.9, 0.35],
          }}
          transition={{
            pathOffset: {
              duration: 3.2,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />

        {/* 4. Sharp Bright Pulse Core Layer */}
        <motion.path
          d={pulsePath}
          fill="none"
          stroke={isDarkMode ? "#A7F3D0" : "#065F46"}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.14, pathOffset: 0 }}
          animate={{
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* 5. Traveling Settlement Blip (Pulsing Dot) */}
        <motion.g
          animate={{
            x: [-100, 1540],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle
            cx="0"
            cy="160"
            r="4.5"
            fill={isDarkMode ? "#6EE7B7" : "#047857"}
            filter="url(#financialGlow)"
          />
          <circle
            cx="0"
            cy="160"
            r="9"
            fill="none"
            stroke={isDarkMode ? "#34D399" : "#10B981"}
            strokeWidth="1.5"
            opacity="0.8"
          />
        </motion.g>
      </svg>

      {/* Vignette / Edge Fade Masks to softly fade the pulse line on sides */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-24 sm:w-44 pointer-events-none bg-gradient-to-r",
          isDarkMode
            ? "from-gray-900 to-transparent"
            : "from-emerald-50/80 to-transparent"
        )}
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-24 sm:w-44 pointer-events-none bg-gradient-to-l",
          isDarkMode
            ? "from-gray-900 to-transparent"
            : "from-teal-50/80 to-transparent"
        )}
      />
    </div>
  );
};

export default FinancialPulseBackground;
