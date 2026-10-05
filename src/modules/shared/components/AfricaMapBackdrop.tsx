import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

interface AfricaMapBackdropProps {
  className?: string;
  isDarkMode?: boolean;
}

export const AfricaMapBackdrop: React.FC<AfricaMapBackdropProps> = ({
  className,
  isDarkMode = false,
}) => {
  // Cities on the African Financial Network
  const financialHubs = [
    { name: "Lagos", cx: 160, cy: 195, country: "🇳🇬" },
    { name: "Accra", cx: 135, cy: 200, country: "🇬🇭" },
    { name: "Nairobi", cx: 275, cy: 225, country: "🇰🇪" },
    { name: "Johannesburg", cx: 235, cy: 345, country: "🇿🇦" },
    { name: "Cairo", cx: 245, cy: 75, country: "🇪🇬" },
    { name: "Kigali", cx: 245, cy: 240, country: "🇷🇼" },
  ];

  return (
    <div
      className={cn(
        "absolute pointer-events-none select-none overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 420"
        className="w-full h-full opacity-60 dark:opacity-40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* African Sun Gradient */}
          <linearGradient id="africaSunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity={isDarkMode ? 0.35 : 0.25} />
            <stop offset="45%" stopColor="#10B981" stopOpacity={isDarkMode ? 0.3 : 0.2} />
            <stop offset="85%" stopColor="#D97706" stopOpacity={isDarkMode ? 0.25 : 0.15} />
          </linearGradient>

          {/* Organic painted texture filter */}
          <filter id="africaGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stylized African Continent Silhouette Path */}
        <path
          d="M 120 20 
             C 170 15, 230 25, 270 45 
             C 290 60, 310 90, 300 120 
             C 285 140, 310 160, 335 180 
             C 345 200, 320 220, 290 235 
             C 275 255, 265 290, 255 330 
             C 245 370, 220 400, 200 410 
             C 185 390, 195 345, 185 320 
             C 170 300, 140 280, 145 250 
             C 150 230, 120 225, 90 220 
             C 65 210, 45 190, 50 160 
             C 55 130, 85 95, 95 65 
             C 105 40, 100 25, 120 20 Z"
          fill="url(#africaSunGrad)"
          stroke={isDarkMode ? "rgba(245, 158, 11, 0.3)" : "rgba(217, 119, 6, 0.25)"}
          strokeWidth="1.5"
          filter="url(#africaGlow)"
        />

        {/* Regional Flow Lines connecting hubs */}
        <path
          d="M 160 195 Q 215 190 275 225"
          stroke={isDarkMode ? "rgba(16, 185, 129, 0.5)" : "rgba(5, 150, 105, 0.45)"}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          d="M 135 200 Q 150 195 160 195"
          stroke={isDarkMode ? "rgba(245, 158, 11, 0.6)" : "rgba(217, 119, 6, 0.5)"}
          strokeWidth="1.5"
        />
        <path
          d="M 275 225 Q 260 280 235 345"
          stroke={isDarkMode ? "rgba(16, 185, 129, 0.4)" : "rgba(5, 150, 105, 0.35)"}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Pulsing Hub Points */}
        {financialHubs.map((hub, idx) => (
          <g key={hub.name}>
            <motion.circle
              cx={hub.cx}
              cy={hub.cy}
              r="8"
              fill={idx % 2 === 0 ? "#10B981" : "#F59E0B"}
              opacity="0.3"
              animate={{ r: [6, 14, 6], opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
            />
            <circle
              cx={hub.cx}
              cy={hub.cy}
              r="3.5"
              fill={idx % 2 === 0 ? "#10B981" : "#F59E0B"}
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default AfricaMapBackdrop;
