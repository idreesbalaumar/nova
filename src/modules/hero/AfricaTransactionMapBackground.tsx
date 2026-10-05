import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "../shared/utils/cn";

interface AfricaTransactionMapBackgroundProps {
  isDarkMode?: boolean;
  className?: string;
}

interface HubNode {
  id: string;
  name: string;
  country: string;
  flag: string;
  x: number;
  y: number;
  isPrimary?: boolean;
}

interface CorridorArc {
  id: string;
  from: string;
  to: string;
  d: string;
  amount: string;
  currencyPair: string;
  duration: number;
  delay: number;
  color: string;
}

export const AfricaTransactionMapBackground: React.FC<AfricaTransactionMapBackgroundProps> = ({
  isDarkMode = false,
  className,
}) => {
  // Key African and Global Financial Hubs
  const hubs: HubNode[] = [
    { id: "los", name: "Lagos", country: "Nigeria", flag: "🇳🇬", x: 420, y: 370, isPrimary: true },
    { id: "nbo", name: "Nairobi", country: "Kenya", flag: "🇰🇪", x: 620, y: 390, isPrimary: true },
    { id: "acc", name: "Accra", country: "Ghana", flag: "🇬🇭", x: 370, y: 380, isPrimary: true },
    { id: "jnb", name: "Johannesburg", country: "South Africa", flag: "🇿🇦", x: 550, y: 610, isPrimary: true },
    { id: "cai", name: "Cairo", country: "Egypt", flag: "🇪🇬", x: 600, y: 140 },
    { id: "kgl", name: "Kigali", country: "Rwanda", flag: "🇷🇼", x: 570, y: 420 },
    { id: "lon", name: "London", country: "UK Corridor", flag: "🇬🇧", x: 370, y: 40 },
    { id: "dxb", name: "Dubai", country: "UAE Corridor", flag: "🇦🇪", x: 740, y: 130 },
  ];

  // Active Transaction Corridors across the African continent
  const corridors: CorridorArc[] = [
    {
      id: "lon-los",
      from: "London",
      to: "Lagos",
      d: "M 370 40 Q 320 200 420 370",
      amount: "£5,000 → ₦9.7M",
      currencyPair: "GBP ⇄ NGN",
      duration: 3.2,
      delay: 0,
      color: "#F59E0B", // Gold
    },
    {
      id: "los-nbo",
      from: "Lagos",
      to: "Nairobi",
      d: "M 420 370 Q 520 310 620 390",
      amount: "₦14,500,000",
      currencyPair: "NGN ⇄ KES",
      duration: 2.8,
      delay: 0.5,
      color: "#10B981", // Emerald
    },
    {
      id: "acc-los",
      from: "Accra",
      to: "Lagos",
      d: "M 370 380 Q 395 365 420 370",
      amount: "GH₵ 65,000",
      currencyPair: "GHS ⇄ NGN",
      duration: 2.0,
      delay: 1.0,
      color: "#F59E0B",
    },
    {
      id: "nbo-jnb",
      from: "Nairobi",
      to: "Johannesburg",
      d: "M 620 390 Q 640 510 550 610",
      amount: "KES 1,200,000",
      currencyPair: "KES ⇄ ZAR",
      duration: 3.5,
      delay: 1.4,
      color: "#10B981",
    },
    {
      id: "jnb-los",
      from: "Johannesburg",
      to: "Lagos",
      d: "M 550 610 Q 430 520 420 370",
      amount: "ZAR 180,000",
      currencyPair: "ZAR ⇄ NGN",
      duration: 3.8,
      delay: 2.0,
      color: "#2563EB", // Royal Blue
    },
    {
      id: "dxb-nbo",
      from: "Dubai",
      to: "Nairobi",
      d: "M 740 130 Q 710 270 620 390",
      amount: "$25,000",
      currencyPair: "USD ⇄ KES",
      duration: 3.4,
      delay: 0.8,
      color: "#F59E0B",
    },
    {
      id: "cai-los",
      from: "Cairo",
      to: "Lagos",
      d: "M 600 140 Q 490 230 420 370",
      amount: "EGP 320,000",
      currencyPair: "EGP ⇄ NGN",
      duration: 3.0,
      delay: 1.7,
      color: "#10B981",
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
      {/* Warm Ambient Radial Backdrop Glow */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-[10%] sm:top-[12%] md:top-[16%] w-[380px] sm:w-[580px] md:w-[780px] lg:w-[980px] h-[350px] sm:h-[480px] md:h-[620px] rounded-full blur-3xl pointer-events-none -z-10",
          isDarkMode
            ? "bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-transparent"
            : "bg-gradient-to-br from-amber-200/40 via-emerald-100/35 to-amber-50/20"
        )}
      />

      {/* SVG African Map with Animated Transaction Arcs */}
      <svg
        viewBox="0 0 1000 750"
        className="absolute left-1/2 -translate-x-1/2 top-4 sm:top-6 md:top-8 w-[750px] sm:w-[900px] md:w-[1100px] lg:w-[1300px] h-auto max-w-none opacity-85 dark:opacity-80"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* African Continental Sun Gradient */}
          <linearGradient id="africaFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              stopColor={isDarkMode ? "#F59E0B" : "#F59E0B"}
              stopOpacity={isDarkMode ? 0.14 : 0.08}
            />
            <stop
              offset="50%"
              stopColor={isDarkMode ? "#10B981" : "#059669"}
              stopOpacity={isDarkMode ? 0.12 : 0.07}
            />
            <stop
              offset="100%"
              stopColor={isDarkMode ? "#D97706" : "#D97706"}
              stopOpacity={isDarkMode ? 0.10 : 0.05}
            />
          </linearGradient>

          {/* Golden Pulse Glow Filter */}
          <filter id="transactionGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Subtler Map Outline Filter */}
          <filter id="continentShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ========================================================================= */}
        {/* 1. Authentic African Continent Silhouette (Detailed Geographic Contour)  */}
        {/* ========================================================================= */}
        <g filter="url(#continentShadow)">
          {/* Main Continental Landmass */}
          <path
            d="M 330 110 
               C 390 95, 480 90, 560 115 
               C 620 135, 680 160, 675 190 
               C 670 210, 710 220, 755 240 
               C 780 260, 770 290, 730 310 
               C 700 325, 680 340, 665 370 
               C 650 400, 640 450, 625 500 
               C 610 560, 580 630, 545 660 
               C 515 685, 480 680, 465 650 
               C 450 620, 460 560, 450 515 
               C 435 480, 400 450, 405 410 
               C 410 380, 360 375, 310 365 
               C 270 355, 230 320, 240 270 
               C 250 220, 290 170, 305 135 
               C 315 118, 315 110, 330 110 Z"
            fill="url(#africaFillGrad)"
            stroke={isDarkMode ? "rgba(245, 158, 11, 0.35)" : "rgba(217, 119, 6, 0.3)"}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* Madagascar Island */}
          <path
            d="M 685 470 
               C 695 460, 715 480, 725 510 
               C 735 540, 730 580, 710 610 
               C 695 620, 680 590, 675 560 
               C 670 530, 675 480, 685 470 Z"
            fill="url(#africaFillGrad)"
            stroke={isDarkMode ? "rgba(16, 185, 129, 0.35)" : "rgba(5, 150, 105, 0.3)"}
            strokeWidth="1.5"
          />

          {/* Regional Terrain Lat/Long Guidance Grid lines (Subtle) */}
          <path
            d="M 240 270 Q 480 250 755 240"
            stroke={isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(217, 119, 6, 0.08)"}
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <path
            d="M 310 365 Q 500 370 665 370"
            stroke={isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(217, 119, 6, 0.08)"}
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <path
            d="M 450 515 Q 540 505 625 500"
            stroke={isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(217, 119, 6, 0.08)"}
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </g>

        {/* ========================================================================= */}
        {/* 2. Static Base Transaction Arcs (Dotted Corridors)                        */}
        {/* ========================================================================= */}
        {corridors.map((c) => (
          <g key={`track-${c.id}`}>
            <path
              d={c.d}
              fill="none"
              stroke={
                isDarkMode
                  ? "rgba(255, 255, 255, 0.12)"
                  : "rgba(217, 119, 6, 0.18)"
              }
              strokeWidth="1.5"
              strokeDasharray="5 7"
            />
          </g>
        ))}

        {/* ========================================================================= */}
        {/* 3. Animated Flowing Laser Beams & Currency Packets along Corridors        */}
        {/* ========================================================================= */}
        {corridors.map((c) => (
          <g key={`anim-${c.id}`}>
            {/* Glowing Traveling Beam Streak */}
            <motion.path
              d={c.d}
              fill="none"
              stroke={c.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#transactionGlow)"
              initial={{ pathLength: 0.25, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                duration: c.duration,
                repeat: Infinity,
                ease: "linear",
                delay: c.delay,
              }}
            />

            {/* Bright Lead Core Particle */}
            <motion.path
              d={c.d}
              fill="none"
              stroke={isDarkMode ? "#FFFFFF" : "#FFFBEB"}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0.08, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                duration: c.duration,
                repeat: Infinity,
                ease: "linear",
                delay: c.delay,
              }}
            />
          </g>
        ))}

        {/* ========================================================================= */}
        {/* 4. Financial Hub Nodes (Cities, Flags, & Concentric Radar Rings)          */}
        {/* ========================================================================= */}
        {hubs.map((hub, idx) => (
          <g key={hub.id} className="cursor-pointer">
            {/* Pulsing Concentric Radar Ring */}
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

            {/* Glowing Halo */}
            <circle
              cx={hub.x}
              cy={hub.y}
              r={hub.isPrimary ? 9 : 6}
              fill={hub.isPrimary ? "#F59E0B" : "#10B981"}
              opacity={isDarkMode ? 0.35 : 0.25}
              filter="url(#transactionGlow)"
            />

            {/* Center Node Pin */}
            <circle
              cx={hub.x}
              cy={hub.y}
              r={hub.isPrimary ? 5 : 3.5}
              fill={hub.isPrimary ? "#F59E0B" : "#10B981"}
              stroke={isDarkMode ? "#0B0E14" : "#FFFFFF"}
              strokeWidth="1.75"
            />

            {/* City Name Badge Label */}
            <g transform={`translate(${hub.x + 8}, ${hub.y - 8})`}>
              <rect
                x="0"
                y="-11"
                width={hub.name.length * 6.5 + 24}
                height="17"
                rx="4"
                fill={isDarkMode ? "rgba(11, 14, 20, 0.85)" : "rgba(255, 253, 249, 0.9)"}
                stroke={isDarkMode ? "rgba(245, 158, 11, 0.35)" : "rgba(217, 119, 6, 0.35)"}
                strokeWidth="0.75"
              />
              <text
                x="4"
                y="1"
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

        {/* Live Network Status Indicator Overlay in Upper Corner */}
        <g transform="translate(180, 60)">
          <rect
            x="0"
            y="0"
            width="220"
            height="32"
            rx="16"
            fill={isDarkMode ? "rgba(11, 14, 20, 0.75)" : "rgba(255, 255, 255, 0.85)"}
            stroke={isDarkMode ? "rgba(245, 158, 11, 0.3)" : "rgba(217, 119, 6, 0.25)"}
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
            fontSize="10"
            fontWeight="600"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          >
            Live Settlement Mesh • 24,891 TPS
          </text>
        </g>
      </svg>
    </div>
  );
};

export default AfricaTransactionMapBackground;
