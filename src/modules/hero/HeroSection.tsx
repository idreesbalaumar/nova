import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { cn } from "@/modules/shared/utils/cn";
import { HeroMapBackground } from "./HeroMapBackground";
import { HeroVideoModal } from "./HeroVideoModal";
import { AfricanBrushStroke } from "../shared/components/AfricanBrushStroke";
import heroLeft from "@/assets/hero_left.jpg";
import heroCenter from "@/assets/hero_center.jpg";
import heroRight from "@/assets/hero_right.jpg";

interface HeroSectionProps {
  onOpenSandbox: () => void;
  onExploreNetwork?: () => void;
  onOpenRegister?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenSandbox,
  onOpenRegister,
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

  // Diverse African business leaders, entrepreneurs, and merchants
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
          "relative pt-20 sm:pt-24 md:pt-26 lg:pt-28 pb-10 sm:pb-12 lg:pb-16 overflow-hidden min-h-screen flex flex-col justify-start transition-colors duration-300",
          isDarkMode
            ? "bg-gradient-to-br from-[#0B0E14] via-[#10141E] to-[#0A0D14]"
            : "bg-gradient-to-br from-[#FFFDF9] via-[#FAF7F2] to-[#F5EFE6]"
        )}
      >

        {/* Animated Map Background with African Settlement Lines & Constellation Orbits (inspired by Charity Grants SuccessStories) */}
        <HeroMapBackground
          isDarkMode={isDarkMode}
          className="z-0"
        />

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full my-auto mt-2 sm:mt-4 md:mt-6">
          <div className="relative text-center w-full max-w-4xl mx-auto pt-2 sm:pt-4 md:pt-6">
            
            {/* Diffused Frosted Glass Backdrop fading off at edges (CarePortal signature) */}
            <div
              className={cn(
                "absolute inset-0 -inset-x-2 sm:-inset-x-6 md:-inset-x-10 lg:-inset-x-14 -inset-y-3 sm:-inset-y-5 md:-inset-y-6 rounded-[24px] sm:rounded-[36px] pointer-events-none -z-10",
                "backdrop-blur-md [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]",
                isDarkMode ? "bg-gray-900/50" : "bg-white/60"
              )}
              aria-hidden="true"
            />

            {/* Soft radial glass gradient layer */}
            <div
              className={cn(
                "absolute inset-0 -inset-x-4 sm:-inset-x-8 md:-inset-x-12 lg:-inset-x-16 -inset-y-4 sm:-inset-y-6 md:-inset-y-7 rounded-full pointer-events-none -z-10",
                isDarkMode
                  ? "bg-[radial-gradient(ellipse_at_center,rgba(16,20,30,0.88)_0%,rgba(16,20,30,0.5)_40%,transparent_75%)]"
                  : "bg-[radial-gradient(ellipse_at_center,rgba(255,253,249,0.94)_0%,rgba(255,253,249,0.65)_40%,transparent_75%)]"
              )}
              aria-hidden="true"
            />

            {/* User Avatars Social Proof Badge with African Gold and Emerald Accents */}
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
                    ? "bg-[#141A26]/90 border border-amber-500/30 hover:border-amber-400/50 shadow-[0_4px_20px_-4px_rgba(245,158,11,0.15)]"
                    : "bg-[#FFFDF9]/95 border border-amber-300/80 hover:border-amber-400 shadow-[0_2px_14px_-2px_rgba(217,119,6,0.12),0_1px_3px_rgba(0,0,0,0.03)]"
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
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full ring-2 ring-amber-400 dark:ring-amber-500 object-cover shadow-xs relative transition-transform"
                    />
                  ))}
                </div>

                {/* Subtle vertical divider with African Gold tint */}
                <div className="h-4 w-px bg-amber-300 dark:bg-amber-600/60 mx-0.5" />

                {/* Stars and Stat Text using Iconify */}
                <div className="flex items-center gap-1.5 sm:gap-2 pr-0.5">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        icon="solar:star-bold"
                        className="w-3.5 h-3.5 text-amber-500"
                      />
                    ))}
                  </div>

                  <span
                    className={cn(
                      "text-xs sm:text-[13px] whitespace-nowrap",
                      isDarkMode ? "text-gray-200" : "text-gray-800"
                    )}
                  >
                    <strong className="font-bold text-amber-600 dark:text-amber-400 mr-1">5,000+</strong>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      African Businesses & Merchants
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Main Heading with Authentic African Highlighter Accent (Kalypsia editorial style) */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[26px] sm:text-3xl md:text-4xl lg:text-[46px] xl:text-[52px] font-extrabold tracking-tight mb-2 sm:mb-2.5 md:mb-3 px-2 sm:px-4 leading-[1.14]"
            >
              <span className="block mb-0.5 sm:mb-1 lg:mb-1.5">
                Move Money Across{" "}
                <span className="relative inline-block text-amber-600 dark:text-amber-400">
                  Africa
                  {/* Handcrafted warm gold highlighter stroke (Kalypsia reference) */}
                  <svg
                    className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-3 sm:h-3.5 text-amber-400/50 dark:text-amber-400/40 -z-10"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2,8 C25,2 75,3 98,7 C75,11 25,12 2,8 Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                .
              </span>
              <span
                className={cn(
                  "block bg-gradient-to-r from-emerald-600 via-teal-700 to-amber-700 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-400 bg-clip-text text-transparent"
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
                isDarkMode ? "text-gray-300" : "text-gray-700"
              )}
            >
              Send and receive business payments between Nigeria, Kenya, Ghana, the UK, and beyond in seconds. Real-time exchange rates, low flat fees, and instant delivery with Africa's modern financial network.
            </motion.p>

            {/* CTA Button with Warm African Gold to Emerald Gradient */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-3 px-4 mb-4 sm:mb-5 md:mb-4"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <button
                  type="button"
                  onClick={onOpenRegister || onOpenSandbox}
                  className="rounded-full px-7 sm:px-9 py-2.5 sm:py-3 shadow-lg shadow-amber-500/20 text-xs sm:text-sm md:text-base font-bold cursor-pointer transition-all duration-200 bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white flex items-center gap-2"
                >
                  <span>Get Started Free</span>
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Tilted Image Cards with African Painterly Brush Strokes */}
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
                className="w-full cursor-pointer relative"
                onClick={() => setVideoOpen(true)}
              >
                {/* Organic Gold Painterly Brush Accent (Kalypsia style) */}
                <div className="absolute -top-3 -right-2 w-32 h-10 -z-10 opacity-70">
                  <AfricanBrushStroke variant="gold" />
                </div>

                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-4 sm:ring-6 ring-amber-400/80 dark:ring-amber-500/70 group">
                  <img
                    src={heroCenter}
                    alt="African business partners in modern Nairobi office"
                    className="w-full aspect-[16/10] sm:aspect-[16/9] max-h-[260px] sm:max-h-[320px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/55 via-black/20 to-transparent">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setVideoOpen(true);
                      }}
                      className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/75 active:bg-black backdrop-blur-md border border-amber-400/40 hover:border-amber-400 shadow-[0_10px_35px_rgba(0,0,0,0.5)] text-white transition-all duration-300 cursor-pointer group/btn"
                      aria-label="Play video"
                    >
                      <Icon
                        icon="solar:play-bold"
                        className="w-6 h-6 sm:w-7 sm:h-7 ml-0.5 text-amber-400 transition-transform duration-300 group-hover/btn:scale-110"
                      />
                    </motion.button>
                  </div>

                  {/* Floating status badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/30 text-[10px] text-white flex items-center gap-1.5">
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
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg ring-2 ring-emerald-500/50 dark:ring-emerald-400/40">
                    <img
                      src={heroLeft}
                      alt="African businesswoman in Lagos checking instant payment"
                      className="w-full aspect-[4/3] max-h-[150px] sm:max-h-[190px] object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] text-white flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Instant Payouts</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                >
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg ring-2 ring-amber-500/50 dark:ring-amber-400/40">
                    <img
                      src={heroRight}
                      alt="Accra collaborative financial operations team"
                      className="w-full aspect-[4/3] max-h-[150px] sm:max-h-[190px] object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] text-white flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      <span>Real Exchange Rates</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Desktop & Tablet: Tilted Layout with scaled cards and centered main video card (CarePortal signature) */}
            <div className="hidden md:block relative h-[260px] md:h-[280px] lg:h-[350px] xl:h-[390px] max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto w-full">
              
              {/* Left Card - Tilted & Lowered with Emerald Painterly Accent */}
              <motion.div
                initial={{ opacity: 0, x: -80, rotate: -12 }}
                animate={{ opacity: 1, x: 0, rotate: -8 }}
                transition={{ duration: 0.7, delay: 0.45, type: "spring" }}
                className="absolute left-[0%] md:left-[0.5%] lg:left-[1.5%] xl:left-[3%] top-[64%] md:top-[64%] lg:top-[66%] xl:top-[68%] -translate-y-1/2 w-[190px] md:w-[210px] lg:w-[290px] xl:w-[350px] z-10"
                style={{ transformOrigin: "center center" }}
              >
                {/* Organic Emerald Brush Accent (Kalypsia style) */}
                <div className="absolute -top-4 -left-3 w-40 h-10 -z-10 opacity-75">
                  <AfricanBrushStroke variant="emerald" />
                </div>

                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl ring-4 lg:ring-6 ring-emerald-500/70 dark:ring-emerald-400/60 transform hover:scale-105 transition-transform duration-300 group">
                  <img
                    src={heroLeft}
                    alt="African businesswoman in Lagos checking payment"
                    className="w-full h-[150px] md:h-[170px] lg:h-[240px] xl:h-[290px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-emerald-400/40 text-[10px] text-white flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Instant Business Payouts • Lagos</span>
                  </div>
                </div>
              </motion.div>

              {/* Center Card (Main Video Card) - Elevated higher with Gold Painterly Accent */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
                className="absolute inset-x-0 top-[18%] md:top-[16%] lg:top-[18%] xl:top-[20%] -translate-y-1/2 flex justify-center z-30"
              >
                {/* Organic Gold Brush Accent Framing Center Card */}
                <div className="absolute -top-5 left-1/4 w-60 h-12 -z-10 opacity-80">
                  <AfricanBrushStroke variant="gold" />
                </div>

                <div
                  className="w-[350px] md:w-[380px] lg:w-[520px] xl:w-[620px] cursor-pointer"
                  onClick={() => setVideoOpen(true)}
                >
                  <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(217,119,6,0.3)] ring-4 md:ring-6 lg:ring-[8px] xl:ring-[10px] ring-amber-400/90 dark:ring-amber-500/80 transform hover:scale-[1.03] transition-transform duration-300 group">
                    <img
                      src={heroCenter}
                      alt="African business partners in modern Nairobi office"
                      className="w-full h-[210px] md:h-[230px] lg:h-[320px] xl:h-[380px] object-cover"
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
                        className="relative z-10 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-22 xl:h-22 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/75 active:bg-black backdrop-blur-md border border-amber-400/50 hover:border-amber-400 shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-white transition-all duration-300 cursor-pointer group/btn"
                        aria-label="Play video demo"
                      >
                        <Icon
                          icon="solar:play-bold"
                          className="w-6 h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 xl:w-10 xl:h-10 ml-1 text-amber-400 transition-transform duration-300 group-hover/btn:scale-110"
                        />
                      </motion.button>
                    </div>

                    {/* Gradient shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

                    {/* Center Card bottom overlay badge with Kente micro-pattern */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-amber-400/30 text-xs text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-semibold text-white">London ⇄ Nairobi in 320ms</span>
                      </div>
                      <span className="text-[11px] text-amber-300 font-semibold hidden sm:inline">
                        Zero Hidden Fees
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Card - Tilted & Lowered with Terracotta / Amber Brush Accent */}
              <motion.div
                initial={{ opacity: 0, x: 80, rotate: 12 }}
                animate={{ opacity: 1, x: 0, rotate: 8 }}
                transition={{ duration: 0.7, delay: 0.55, type: "spring" }}
                className="absolute right-[0%] md:right-[0.5%] lg:right-[1.5%] xl:right-[3%] top-[64%] md:top-[64%] lg:top-[66%] xl:top-[68%] -translate-y-1/2 w-[190px] md:w-[210px] lg:w-[290px] xl:w-[350px] z-10"
                style={{ transformOrigin: "center center" }}
              >
                {/* Organic Terracotta Brush Accent (Kalypsia style) */}
                <div className="absolute -top-4 -right-3 w-40 h-10 -z-10 opacity-75">
                  <AfricanBrushStroke variant="terracotta" />
                </div>

                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl ring-4 lg:ring-6 ring-amber-500/70 dark:ring-amber-400/60 transform hover:scale-105 transition-transform duration-300 group">
                  <img
                    src={heroRight}
                    alt="Collaborative financial operations team in Accra"
                    className="w-full h-[150px] md:h-[170px] lg:h-[240px] xl:h-[290px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 text-[10px] text-white flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
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
        videoId="pQpFebyALV0"
        onOpenSandbox={onOpenSandbox}
      />
    </>
  );
};

export default HeroSection;
