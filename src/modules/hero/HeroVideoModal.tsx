import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/modules/shared/utils/cn";

interface HeroVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId?: string;
  onOpenSandbox?: () => void;
}

export const HeroVideoModal: React.FC<HeroVideoModalProps> = ({
  open,
  onOpenChange,
  videoId = "pQpFebyALV0",
  onOpenSandbox,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"video" | "interactive">("video");

  // Interactive demo state
  const [demoAmount, setDemoAmount] = useState<number>(1000);
  const [demoStatus, setDemoStatus] = useState<"ready" | "processing" | "delivered">("ready");

  // Reset loading state whenever modal opens and set a safety fallback
  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setDemoStatus("ready");
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3500);

      // Handle Escape key
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onOpenChange(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [open, onOpenChange]);

  const handleSimulateTransfer = () => {
    setDemoStatus("processing");
    setTimeout(() => {
      setDemoStatus("delivered");
    }, 1200);
  };

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
        onClick={() => onOpenChange(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-4xl w-[94vw] sm:w-[90vw] md:w-[85vw] p-0 border-0 bg-transparent shadow-none overflow-visible"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating Close Button Outside Modal at Top-Right (CarePortal signature) with Iconify */}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              "absolute -top-11 sm:-top-9 md:-top-7 right-0 sm:-right-4 md:-right-7 lg:-right-9 z-50",
              "flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full",
              "text-white/80 hover:text-white bg-black/70 hover:bg-black/90 active:bg-black",
              "backdrop-blur-md border border-amber-400/30 hover:border-amber-400 shadow-xl",
              "transition-all duration-200 cursor-pointer group"
            )}
            aria-label="Close video"
          >
            <Icon icon="solar:close-circle-bold" className="w-4 h-4 text-amber-400 transition-transform duration-200 group-hover:scale-110" />
          </button>

          {/* Top Switcher: Video Tour vs Interactive Demo */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-white/95">
                NOVA in Action • Real-Time African Settlement
              </span>
            </div>
            
            <div className="inline-flex p-0.5 rounded-full bg-black/60 border border-amber-400/25 backdrop-blur-md text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("video")}
                className={cn(
                  "px-3 py-1 rounded-full font-medium transition-all duration-200",
                  activeTab === "video"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs font-semibold"
                    : "text-white/70 hover:text-white"
                )}
              >
                Video Tour
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("interactive")}
                className={cn(
                  "px-3 py-1 rounded-full font-medium transition-all duration-200",
                  activeTab === "interactive"
                    ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs font-semibold"
                    : "text-white/70 hover:text-white"
                )}
              >
                Interactive Transfer
              </button>
            </div>
          </div>

          {/* Main Modal Container */}
          <div className="relative w-full aspect-video bg-black/95 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-amber-400/30 shadow-[0_25px_60px_-15px_rgba(217,119,6,0.35)]">
            


            {activeTab === "video" ? (
              <>
                {/* Centered Loading Spinner */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-950 z-20">
                    <Icon icon="solar:spinner-line-duotone" className="w-10 h-10 text-amber-500 animate-spin" />
                    <span className="text-xs font-medium text-amber-200/80 tracking-wider">
                      Loading presentation...
                    </span>
                  </div>
                )}

                {/* Video Iframe */}
                <iframe
                  className={cn(
                    "w-full h-full border-0 transition-opacity duration-300",
                    isLoading ? "opacity-0" : "opacity-100"
                  )}
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="NOVA Financial OS Presentation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                />
              </>
            ) : (
              /* Interactive Transfer Walkthrough (Non-technical & User-Friendly) */
              <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F17] via-[#101522] to-[#0A0D15] p-4 sm:p-6 md:p-8 flex flex-col justify-between text-white overflow-y-auto">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-400/20 pb-3 mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>Send Money in Real-Time</span>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                          Instant Bank Deposit
                        </span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        See how easily African businesses pay suppliers, teams, and partners across borders.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-amber-200 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                      <Icon icon="solar:shield-check-bold" className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Bank-Grade Security</span>
                    </div>
                  </div>

                  {/* Transfer Form Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto my-auto">
                    {/* You Send */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-colors">
                      <span className="text-[11px] text-gray-400 font-medium block mb-1">You Send</span>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg font-bold text-amber-400">£</span>
                          <input
                            type="number"
                            value={demoAmount}
                            onChange={(e) => setDemoAmount(Number(e.target.value) || 0)}
                            className="bg-transparent text-xl sm:text-2xl font-bold w-28 text-white focus:outline-none"
                          />
                        </div>
                        <span className="px-2.5 py-1 rounded bg-white/10 text-xs font-semibold flex items-center gap-1">
                          <span>🇬🇧</span>
                          <span>GBP</span>
                        </span>
                      </div>
                    </div>

                    {/* Recipient Gets */}
                    <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/40 transition-colors">
                      <span className="text-[11px] text-gray-400 font-medium block mb-1">Recipient Gets</span>
                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-emerald-400">
                          ₦{(demoAmount * 1940).toLocaleString()}
                        </span>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1">
                          <span>🇳🇬</span>
                          <span>NGN</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="max-w-2xl mx-auto mt-3 p-3 rounded-lg bg-amber-950/20 border border-amber-500/25 text-xs flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Icon icon="solar:bolt-bold" className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-gray-300">Exchange Rate: <strong>1 GBP = 1,940 NGN</strong> (Real Market Rate)</span>
                    </div>
                    <div className="text-emerald-400 font-medium">
                      Zero hidden bank markup • Delivery time: <strong>320ms</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="max-w-2xl mx-auto w-full pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                  {demoStatus === "ready" && (
                    <>
                      <span className="text-xs text-gray-400">
                        Try the instant simulation right now.
                      </span>
                      <button
                        type="button"
                        onClick={handleSimulateTransfer}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <span>Send Test Payment</span>
                        <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  {demoStatus === "processing" && (
                    <div className="w-full py-2 flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium">
                      <Icon icon="solar:spinner-line-duotone" className="w-4 h-4 animate-spin text-emerald-400" />
                      <span>Sending funds directly into Lagos bank account...</span>
                    </div>
                  )}

                  {demoStatus === "delivered" && (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                        <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                        <span>Payment Delivered! Recipient notified in 380ms.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onOpenChange(false);
                          if (onOpenSandbox) onOpenSandbox();
                        }}
                        className="px-5 py-2 rounded-full bg-white text-gray-900 font-semibold text-xs hover:bg-amber-50 transition-colors flex items-center gap-1.5"
                      >
                        <span>Open Full Live Account</span>
                        <Icon icon="solar:arrow-right-linear" className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

export default HeroVideoModal;
