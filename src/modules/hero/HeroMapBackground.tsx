import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "../shared/utils/cn";

interface HeroMapBackgroundProps {
  isDarkMode?: boolean;
  className?: string;
}

interface FinancialNode {
  id: string;
  name: string;
  country: string;
  flag: string;
  x: number; // percentage or SVG coordinate
  y: number;
  amount?: string;
  isPrimary?: boolean;
}

interface TransactionArc {
  id: string;
  from: string;
  to: string;
  path: string;
  duration: number;
  delay: number;
  color: string;
  label: string;
}

export const HeroMapBackground: React.FC<HeroMapBackgroundProps> = ({
  isDarkMode = false,
  className,
}) => {
  // Financial Hubs centered over Africa & key global liquidity corridors
  const hubs: FinancialNode[] = [
    { id: "los", name: "Lagos", country: "Nigeria", flag: "🇳🇬", x: 440, y: 390, isPrimary: true, amount: "₦9.7M" },
    { id: "nbo", name: "Nairobi", country: "Kenya", flag: "🇰🇪", x: 640, y: 410, isPrimary: true, amount: "KES 1.2M" },
    { id: "acc", name: "Accra", country: "Ghana", flag: "🇬🇭", x: 390, y: 400, isPrimary: true, amount: "GH₵ 65k" },
    { id: "jnb", name: "Johannesburg", country: "South Africa", flag: "🇿🇦", x: 570, y: 630, isPrimary: true, amount: "ZAR 180k" },
    { id: "lon", name: "London", country: "UK", flag: "🇬🇧", x: 390, y: 70, amount: "£5,000" },
    { id: "dxb", name: "Dubai", country: "UAE", flag: "🇦🇪", x: 760, y: 160, amount: "$25,000" },
    { id: "cai", name: "Cairo", country: "Egypt", flag: "🇪🇬", x: 620, y: 170, amount: "EGP 320k" },
  ];

  // Active Transaction Corridors
  const transactionArcs: TransactionArc[] = [
    {
      id: "lon-los",
      from: "London",
      to: "Lagos",
      path: "M 390 70 Q 330 220 440 390",
      duration: 3.2,
      delay: 0,
      color: "#F59E0B", // African Gold
      label: "GBP ⇄ NGN",
    },
    {
      id: "los-nbo",
      from: "Lagos",
      to: "Nairobi",
      path: "M 440 390 Q 540 330 640 410",
      duration: 2.8,
      delay: 0.6,
      color: "#10B981", // African Emerald
      label: "NGN ⇄ KES",
    },
    {
      id: "acc-los",
      from: "Accra",
      to: "Lagos",
      path: "M 390 400 Q 415 385 440 390",
      duration: 2.0,
      delay: 1.2,
      color: "#F59E0B",
      label: "GHS ⇄ NGN",
    },
    {
      id: "nbo-jnb",
      from: "Nairobi",
      to: "Johannesburg",
      path: "M 640 410 Q 660 530 570 630",
      duration: 3.5,
      delay: 1.5,
      color: "#10B981",
      label: "KES ⇄ ZAR",
    },
    {
      id: "jnb-los",
      from: "Johannesburg",
      to: "Lagos",
      path: "M 570 630 Q 450 540 440 390",
      duration: 3.8,
      delay: 2.1,
      color: "#2563EB", // Cobalt Blue
      label: "ZAR ⇄ NGN",
    },
    {
      id: "dxb-nbo",
      from: "Dubai",
      to: "Nairobi",
      path: "M 760 160 Q 730 300 640 410",
      duration: 3.4,
      delay: 0.9,
      color: "#F59E0B",
      label: "USD ⇄ KES",
    },
  ];

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

      {/* 4. Live Transaction Flow Lines & City Hubs (SVG Layer) */}
      <svg
        viewBox="0 0 1000 750"
        className="absolute left-1/2 -translate-x-1/2 top-4 sm:top-6 md:top-8 w-[750px] sm:w-[920px] md:w-[1140px] lg:w-[1340px] h-auto max-w-none opacity-90 dark:opacity-85"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Laser Glow Filter */}
          <filter id="heroMapGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base Dashed Corridor Paths */}
        {transactionArcs.map((arc) => (
          <path
            key={`base-${arc.id}`}
            d={arc.path}
            fill="none"
            stroke={isDarkMode ? "rgba(255, 255, 255, 0.12)" : "rgba(217, 119, 6, 0.2)"}
            strokeWidth="1.5"
            strokeDasharray="5 7"
          />
        ))}

        {/* Animated Laser Beams along Transaction Lines */}
        {transactionArcs.map((arc) => (
          <g key={`flow-${arc.id}`}>
            {/* Glowing Flow Beam */}
            <motion.path
              d={arc.path}
              fill="none"
              stroke={arc.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#heroMapGlow)"
              initial={{ pathLength: 0.25, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                duration: arc.duration,
                repeat: Infinity,
                ease: "linear",
                delay: arc.delay,
              }}
            />

            {/* Bright Lead Spark */}
            <motion.path
              d={arc.path}
              fill="none"
              stroke={isDarkMode ? "#FFFFFF" : "#FFFBEB"}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0.08, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                duration: arc.duration,
                repeat: Infinity,
                ease: "linear",
                delay: arc.delay,
              }}
            />
          </g>
        ))}

        {/* Financial Hub Nodes */}
        {hubs.map((hub, idx) => (
          <g key={hub.id}>
            {/* Radar Pulse Ring */}
            <motion.circle
              cx={hub.x}
              cy={hub.y}
              r={hub.isPrimary ? 16 : 10}
              fill="none"
              stroke={hub.isPrimary ? "#F59E0B" : "#10B981"}
              strokeWidth="1.5"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: [0.6, 2.2], opacity: [0.8, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
                delay: idx * 0.3,
              }}
            />

            {/* Glowing Center Pin */}
            <circle
              cx={hub.x}
              cy={hub.y}
              r={hub.isPrimary ? 5.5 : 4}
              fill={hub.isPrimary ? "#F59E0B" : "#10B981"}
              stroke={isDarkMode ? "#0B0E14" : "#FFFFFF"}
              strokeWidth="1.75"
              filter="url(#heroMapGlow)"
            />

            {/* City Tag Label with Country Flag */}
            <g transform={`translate(${hub.x + 8}, ${hub.y - 8})`}>
              <rect
                x="0"
                y="-11"
                width={hub.name.length * 6.8 + 26}
                height="18"
                rx="4"
                fill={isDarkMode ? "rgba(11, 14, 20, 0.88)" : "rgba(255, 253, 249, 0.92)"}
                stroke={isDarkMode ? "rgba(245, 158, 11, 0.4)" : "rgba(217, 119, 6, 0.35)"}
                strokeWidth="0.75"
              />
              <text
                x="4"
                y="2"
                fill={isDarkMode ? "#E2E8F0" : "#1E293B"}
                fontSize="10"
                fontWeight="700"
                fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              >
                {hub.flag} {hub.name}
              </text>
            </g>
          </g>
        ))}

        {/* Live Network Throughput Badge Overlay */}
        <g transform="translate(180, 60)">
          <rect
            x="0"
            y="0"
            width="226"
            height="32"
            rx="16"
            fill={isDarkMode ? "rgba(11, 14, 20, 0.8)" : "rgba(255, 255, 255, 0.9)"}
            stroke={isDarkMode ? "rgba(245, 158, 11, 0.35)" : "rgba(217, 119, 6, 0.3)"}
            strokeWidth="1"
          />
          <circle cx="16" cy="16" r="4" fill="#10B981" />
          <motion.circle
            cx="16"
            cy="16"
            r="8"
            fill="none"
            stroke="#10B981"
            strokeWidth="1"
            animate={{ scale: [0.8, 1.8], opacity: [0.8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <text
            x="28"
            y="20"
            fill={isDarkMode ? "#CBD5E1" : "#334155"}
            fontSize="10.5"
            fontWeight="700"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          >
            Live African Settlement • 24,891 TPS
          </text>
        </g>
      </svg>
    </div>
  );
};

export default HeroMapBackground;
