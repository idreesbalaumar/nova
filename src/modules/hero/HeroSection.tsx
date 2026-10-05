import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/modules/shared/utils/cn";
import { FinancialPulseBackground } from "./FinancialPulseBackground";
import { HeroVideoModal } from "./HeroVideoModal";
import heroLeft from "@/assets/hero_left.jpg";
import heroCenter from "@/assets/hero_center.jpg";
import heroRight from "@/assets/hero_right.jpg";

interface HeroSectionProps {
  onOpenSandbox: () => void;
  onExploreNetwork?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSandbox,
}) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Synchronize with html.dark class dynamically
  useEffect(() => {
    const updateTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Diverse African business leaders, entrepreneurs, and finance professionals
  const businessLeaders = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
  ];

  return (
    <>
      <section
        id="home"
        className={cn(
          "relative pt-20 sm:pt-24 md:pt-26 lg:pt-28 pb-8 sm:pb-10 lg:pb-12 overflow-hidden min-h-screen flex flex-col justify-start",
          isDarkMode
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
            : "bg-gradient-to-br from-emerald-50/70 via-slate-50 to-teal-50/60"
        )}
      >
        {/* Animated Financial Pulse Background - responsive position matching CarePortal */}
        <FinancialPulseBackground
          isDarkMode={isDarkMode}
          pulsePosition="top-[25%] sm:top-[28%] md:top-[40%] lg:top-[42%] xl:top-[44%]"
        />

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full my-auto mt-2 sm:mt-4 md:mt-6">
          <div className="relative text-center w-full max-w-4xl mx-auto pt-2 sm:pt-4 md:pt-6">
            
            {/* Diffused Frosted Glass Backdrop fading off away at edges (CarePortal signature) */}
            <div
              className={cn(
                "absolute inset-0 -inset-x-2 sm:-inset-x-6 md:-inset-x-10 lg:-inset-x-14 -inset-y-3 sm:-inset-y-5 md:-inset-y-6 rounded-[24px] sm:rounded-[36px] pointer-events-none -z-10",
                "backdrop-blur-md [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]",
                isDarkMode ? "bg-gray-900/40" : "bg-white/50"
              )}
              aria-hidden="true"
            />

            {/* Soft radial glass gradient layer ensuring text is crisp and readable */}
            <div
              className={cn(
                "absolute inset-0 -inset-x-4 sm:-inset-x-8 md:-inset-x-12 lg:-inset-x-16 -inset-y-4 sm:-inset-y-6 md:-inset-y-7 rounded-full pointer-events-none -z-10",
                isDarkMode
                  ? "bg-[radial-gradient(ellipse_at_center,rgba(17,24,39,0.85)_0%,rgba(17,24,39,0.5)_40%,transparent_75%)]"
                  : "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.6)_40%,transparent_75%)]"
              )}
              aria-hidden="true"
            />

            {/* User Avatars Social Proof Badge (CarePortal style) */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center mb-3 sm:mb-3.5 md:mb-4"
            >
              <div
                className={cn(
                  "inline-flex items-center gap-2 sm:gap-2.5 p-1 sm:p-1.5 pr-3.5 sm:pr-4.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-xs hover:shadow-md cursor-default",
                  isDarkMode
                    ? "bg-gray-900/80 border border-gray-800 hover:border-gray-700 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)]"
                    : "bg-white/90 border border-gray-200/90 hover:border-emerald-200 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)]"
                )}
              >
                {/* Overlapping Avatars Stack */}
                <div className="flex -space-x-2 items-center pl-0.5">
                  {businessLeaders.map((avatar, index) => (
                    <motion.img
                      key={index}
                      src={avatar}
                      alt={`African Business Partner ${index + 1}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25, delay: 0.08 + index * 0.08 }}
                      whileHover={{ scale: 1.15, zIndex: 10 }}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover shadow-xs relative transition-transform"
                    />
                  ))}
                </div>

                {/* Subtle vertical divider */}
                <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-0.5" />

                {/* Stars and Stat Text (User-friendly and credible) */}
                <div className="flex items-center gap-1.5 sm:gap-2 pr-0.5">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <span
                    className={cn(
                      "text-xs sm:text-[13px] whitespace-nowrap",
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    )}
                  >
                    <strong className="font-bold text-gray-900 dark:text-white mr-1">5,000+</strong>
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      African Businesses & Merchants
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Main Heading (Less technical, friendly & punchy) */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={cn(
                "text-[26px] sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[50px] font-bold tracking-tight mb-2 sm:mb-2.5 md:mb-3 px-2 sm:px-4 leading-[1.14]",
                isDarkMode
                  ? "text-white"
                  : "bg-gradient-to-l from-emerald-500 to-teal-800 bg-clip-text text-transparent"
              )}
            >
              <span className="block mb-0.5 sm:mb-1 lg:mb-1.5">Move Money Across Africa.</span>
              <span
                className={cn(
                  "block",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}
              >
                In Seconds, Not Days.
              </span>
            </motion.h1>

            {/* Subtitle (Plain, friendly consumer/business English) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className={cn(
                "text-xs sm:text-sm md:text-[15px] lg:text-base mb-4 sm:mb-5 md:mb-6 max-w-xs sm:max-w-md md:max-w-xl mx-auto leading-relaxed px-2 sm:px-4",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}
            >
              Send and receive business payments between Nigeria, Kenya, Ghana, the UK, and beyond in seconds. Real-time exchange rates, low flat fees, and instant delivery with Africa's modern financial network.
            </motion.p>

            {/* CTA Button (CarePortal style with motion hover) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex justify-center px-4 mb-4 sm:mb-5 md:mb-4"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <button
                  type="button"
                  onClick={onOpenSandbox}
                  className={cn(
                    "rounded-full px-6 sm:px-8 py-2.5 sm:py-3 shadow-lg text-xs sm:text-sm md:text-base font-semibold cursor-pointer transition-all duration-200",
                    isDarkMode
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
                      : "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white"
                  )}
                >
                  Get Started Free
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Tilted Image Cards - Responsive across mobile, tablet, and desktop */}
          <motion.div
            className="relative max-w-7xl mx-auto mt-3 sm:mt-4 lg:mt-4 px-2 sm:px-4 lg:px-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {/* Mobile: Stacked Layout with generous top spacing from CTA button */}
            <div className="block md:hidden space-y-4 sm:space-y-5 max-w-[340px] sm:max-w-lg mx-auto w-full pt-4 sm:pt-6 md:pt-0">
              
              {/* Center Card First on Mobile - Prominent Video Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full cursor-pointer"
                onClick={() => setVideoOpen(true)}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-4 sm:ring-6 ring-white/80 dark:ring-gray-800/80 group">
                  <img
                    src={heroCenter}
                    alt="African business partners in modern Nairobi office"
                    className="w-full aspect-[16/10] sm:aspect-[16/9] max-h-[260px] sm:max-h-[320px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 via-black/15 to-transparent">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoOpen(true);
                      }}
                      className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/65 active:bg-black/75 backdrop-blur-md border border-white/25 hover:border-white/45 shadow-[0_10px_35px_rgba(0,0,0,0.45)] text-white transition-all duration-300 cursor-pointer group/btn"
                      aria-label="Play video"
                    >
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 ml-0.5 text-white fill-white transition-transform duration-300 group-hover/btn:scale-105"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Floating status badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>London ⇄ Nairobi in 320ms</span>
                  </div>
                </div>
              </motion.div>

              {/* Side Cards on Mobile */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/50 dark:ring-gray-800/50">
                    <img
                      src={heroLeft}
                      alt="African businesswoman in Lagos checking instant payment"
                      className="w-full aspect-[4/3] max-h-[150px] sm:max-h-[190px] object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] text-white">
                      Instant Payouts
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg ring-2 ring-white/50 dark:ring-gray-800/50">
                    <img
                      src={heroRight}
                      alt="Accra collaborative financial operations team"
                      className="w-full aspect-[4/3] max-h-[150px] sm:max-h-[190px] object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[9px] text-white">
                      Real Exchange Rates
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Desktop & Tablet: Tilted Layout with scaled cards and centered main video card (CarePortal signature) */}
            <div className="hidden md:block relative h-[260px] md:h-[280px] lg:h-[350px] xl:h-[390px] max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto w-full">
              
              {/* Left Card - Tilted & Lowered */}
              <motion.div
                initial={{ opacity: 0, x: -80, rotate: -12 }}
                animate={{ opacity: 1, x: 0, rotate: -8 }}
                transition={{ duration: 0.7, delay: 0.45, type: "spring" }}
                className="absolute left-[0%] md:left-[0.5%] lg:left-[1.5%] xl:left-[3%] top-[64%] md:top-[64%] lg:top-[66%] xl:top-[68%] -translate-y-1/2 w-[190px] md:w-[210px] lg:w-[290px] xl:w-[350px] z-10"
                style={{ transformOrigin: "center center" }}
              >
                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl ring-4 lg:ring-6 ring-white/60 dark:ring-gray-800/60 transform hover:scale-105 transition-transform duration-300 group">
                  <img
                    src={heroLeft}
                    alt="African businesswoman in Lagos checking payment"
                    className="w-full h-[150px] md:h-[170px] lg:h-[240px] xl:h-[290px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Instant Business Payouts • Lagos</span>
                  </div>
                </div>
              </motion.div>

              {/* Center Card (Main Video Card) - Elevated higher than left and right */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
                className="absolute inset-x-0 top-[18%] md:top-[16%] lg:top-[18%] xl:top-[20%] -translate-y-1/2 flex justify-center z-30"
              >
                <div
                  className="w-[350px] md:w-[380px] lg:w-[520px] xl:w-[620px] cursor-pointer"
                  onClick={() => setVideoOpen(true)}
                >
                  <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-4 md:ring-6 lg:ring-[8px] xl:ring-[10px] ring-white/90 dark:ring-gray-800/90 transform hover:scale-[1.03] transition-transform duration-300 group">
                    <img
                      src={heroCenter}
                      alt="African business partners in modern Nairobi office"
                      className="w-full h-[210px] md:h-[230px] lg:h-[320px] xl:h-[380px] object-cover"
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/45 via-black/10 to-transparent">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setVideoOpen(true);
                        }}
                        className="relative z-10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-22 xl:h-22 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/65 active:bg-black/75 backdrop-blur-md border border-white/25 hover:border-white/45 shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-white transition-all duration-300 cursor-pointer group/btn"
                        aria-label="Play video demo"
                      >
                        <svg
                          className="w-6 h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 ml-1 text-white fill-white transition-transform duration-300 group-hover/btn:scale-105"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </motion.button>
                    </div>

                    {/* Gradient shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

                    {/* Center Card bottom overlay badge */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/55 backdrop-blur-md border border-white/15 text-xs text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-semibold text-white">London ⇄ Nairobi in 320ms</span>
                      </div>
                      <span className="text-[11px] text-emerald-300 font-mono hidden sm:inline">
                        Zero Hidden Fees
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Card - Tilted & Lowered */}
              <motion.div
                initial={{ opacity: 0, x: 80, rotate: 12 }}
                animate={{ opacity: 1, x: 0, rotate: 8 }}
                transition={{ duration: 0.7, delay: 0.55, type: "spring" }}
                className="absolute right-[0%] md:right-[0.5%] lg:right-[1.5%] xl:right-[3%] top-[64%] md:top-[64%] lg:top-[66%] xl:top-[68%] -translate-y-1/2 w-[190px] md:w-[210px] lg:w-[290px] xl:w-[350px] z-10"
                style={{ transformOrigin: "center center" }}
              >
                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl ring-4 lg:ring-6 ring-white/60 dark:ring-gray-800/60 transform hover:scale-105 transition-transform duration-300 group">
                  <img
                    src={heroRight}
                    alt="Collaborative financial operations team in Accra"
                    className="w-full h-[150px] md:h-[170px] lg:h-[240px] xl:h-[290px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Multi-Currency Accounts • Accra</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Presentation & Interactive Demo Modal (CarePortal pattern) */}
      <HeroVideoModal
        open={videoOpen}
        onOpenChange={setVideoOpen}
        videoId="1EiE4w2GsnQ"
        onOpenSandbox={onOpenSandbox}
      />
    </>
  );
};

export default HeroSection;
