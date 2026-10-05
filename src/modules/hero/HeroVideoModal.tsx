import React, { useState, useEffect } from "react";
import { Loader2, X, Play, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
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
  videoId = "1EiE4w2GsnQ",
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

  if (!open) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
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
          {/* Floating Close Button Outside Modal at Top-Right (CarePortal signature) */}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(
              "absolute -top-11 sm:-top-9 md:-top-7 right-0 sm:-right-4 md:-right-7 lg:-right-9 z-50",
              "flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full",
              "text-white/80 hover:text-white bg-black/60 hover:bg-black/85 active:bg-black",
              "backdrop-blur-md border border-white/20 hover:border-white/40 shadow-xl",
              "transition-all duration-200 cursor-pointer group"
            )}
            aria-label="Close video"
          >
            <X className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
          </button>

          {/* Top Switcher: Video Tour vs Interactive Demo */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-white/90">
                NOVA in Action • Experience Instant Settlement
              </span>
            </div>
            
            <div className="inline-flex p-0.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("video")}
                className={cn(
                  "px-3 py-1 rounded-full font-medium transition-all duration-200",
                  activeTab === "video"
                    ? "bg-emerald-600 text-white shadow-xs"
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
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-white/70 hover:text-white"
                )}
              >
                Interactive Transfer
              </button>
            </div>
          </div>

          {/* Main Modal Container */}
          <div className="relative w-full aspect-video bg-black/95 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
            {activeTab === "video" ? (
              <>
                {/* Centered Loading Spinner */}
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-950 z-20">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                    <span className="text-xs font-medium text-gray-400 tracking-wider">
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
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#060D1A] to-slate-900 p-4 sm:p-6 md:p-8 flex flex-col justify-between text-white overflow-y-auto">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>Send Money in Real-Time</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Instant Bank Deposit
                        </span>
                      </h3>
                      <p className="text-xs text-gray-400">
                        See how easy it is to pay suppliers, partners, and teams across borders.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Bank-Grade Security</span>
                    </div>
                  </div>

                  {/* Transfer Form Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto my-auto">
                    {/* You Send */}
                    <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[11px] text-gray-400 font-medium block mb-1">You Send</span>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg font-bold">£</span>
                          <input
                            type="number"
                            value={demoAmount}
                            onChange={(e) => setDemoAmount(Number(e.target.value) || 0)}
                            className="bg-transparent text-xl sm:text-2xl font-bold w-28 text-white focus:outline-none"
                          />
                        </div>
                        <span className="px-2 py-1 rounded bg-white/10 text-xs font-semibold">
                          🇬🇧 GBP
                        </span>
                      </div>
                    </div>

                    {/* Recipient Gets */}
                    <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[11px] text-gray-400 font-medium block mb-1">Recipient Gets</span>
                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-emerald-400">
                          ₦{(demoAmount * 1940).toLocaleString()}
                        </span>
                        <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                          🇳🇬 NGN
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="max-w-2xl mx-auto mt-3 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
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
                        Try the test simulation right now.
                      </span>
                      <button
                        type="button"
                        onClick={handleSimulateTransfer}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md active:scale-95"
                      >
                        Send Test Payment
                      </button>
                    </>
                  )}

                  {demoStatus === "processing" && (
                    <div className="w-full py-2 flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending funds directly into Lagos bank account...</span>
                    </div>
                  )}

                  {demoStatus === "delivered" && (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Payment Delivered! Recipient notified in 380ms.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onOpenChange(false);
                          if (onOpenSandbox) onOpenSandbox();
                        }}
                        className="px-5 py-2 rounded-full bg-white text-gray-900 font-semibold text-xs hover:bg-gray-100 transition-colors"
                      >
                        Open Full Live Account
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default HeroVideoModal;
