import React, { useState } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Star,
  Globe2,
  Lock
} from 'lucide-react';

interface HeroSectionProps {
  onOpenSandbox: () => void;
  onExploreNetwork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onOpenSandbox, 
  onExploreNetwork 
}) => {
  const [selectedCorridor, setSelectedCorridor] = useState<'lon-los' | 'nbo-los' | 'acc-nbo'>('lon-los');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);

  // Diverse institutional finance professionals
  const financialExecutives = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
  ];

  const corridors = {
    'lon-los': {
      origin: 'London',
      originFlag: '🇬🇧',
      dest: 'Lagos',
      destFlag: '🇳🇬',
      pair: 'GBP ⇄ NGN',
      sampleAmount: '£250,000',
      settledAmount: '₦485,500,000',
      novaTime: '380ms',
      swiftTime: '3 - 5 Days',
      novaFee: '$1.40',
      swiftFee: '$3,850 + 3.8% Spread',
      savings: '$3,848.60',
    },
    'nbo-los': {
      origin: 'Nairobi',
      originFlag: '🇰🇪',
      dest: 'Lagos',
      destFlag: '🇳🇬',
      pair: 'KES ⇄ NGN',
      sampleAmount: 'KES 50,000,000',
      settledAmount: '₦575,000,000',
      novaTime: '240ms',
      swiftTime: '2 - 4 Days',
      novaFee: '$0.85',
      swiftFee: '$2,100 + 4.2% Spread',
      savings: '$2,099.15',
    },
    'acc-nbo': {
      origin: 'Accra',
      originFlag: '🇬🇭',
      dest: 'Nairobi',
      destFlag: '🇰🇪',
      pair: 'GHS ⇄ KES',
      sampleAmount: 'GH₵ 2,000,000',
      settledAmount: 'KES 16,800,000',
      novaTime: '310ms',
      swiftTime: '3 Days',
      novaFee: '$0.90',
      swiftFee: '$1,480 + 3.5% Spread',
      savings: '$1,479.10',
    },
  };

  const current = corridors[selectedCorridor];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSimulationComplete(false);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
    }, 600);
  };

  return (
    <section 
      id="home" 
      className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 overflow-hidden min-h-screen flex flex-col justify-start bg-gradient-to-br from-emerald-50/40 via-slate-50 to-teal-50/30 dark:from-slate-950 dark:via-[#070D18] dark:to-slate-950"
    >
      {/* Diffused Frosted Glass Backdrop Layer (CarePortal signature) */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 backdrop-blur-md [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)] bg-white/40 dark:bg-gray-900/40"
        aria-hidden="true"
      />
      
      {/* Soft radial glass gradient layer */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.6)_40%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(6,10,18,0.85)_0%,rgba(6,10,18,0.5)_40%,transparent_75%)]"
        aria-hidden="true"
      />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-nova-grid pointer-events-none -z-10 opacity-60" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full my-auto">
        <div className="relative text-center w-full max-w-4xl mx-auto pt-2">
          
          {/* User Avatars Social Proof Badge (CarePortal style) */}
          <div className="flex items-center justify-center mb-4">
            <div className="inline-flex items-center gap-2 p-1 pr-4 rounded-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-sm transition-all cursor-default">
              {/* Overlapping Avatars Stack */}
              <div className="flex -space-x-2 items-center pl-0.5">
                {financialExecutives.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Financial Institution Partner ${index + 1}`}
                    className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover shadow-xs"
                  />
                ))}
              </div>

              {/* Subtle divider */}
              <div className="h-3.5 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />

              {/* Stars and Stat Text */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <strong className="font-bold text-slate-950 dark:text-white mr-1">500+</strong>
                  African Banks & Enterprises
                </span>
              </div>
            </div>
          </div>

          {/* Main Heading (CarePortal typography & gradient) */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight mb-3 px-2 leading-[1.14]">
            <span className="block mb-1 bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
              Transform African Settlement.
            </span>
            <span className="block text-slate-950 dark:text-white">
              The Next-Gen Financial OS.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed px-4 mb-6">
            Streamline cross-border liquidity, eliminate legacy correspondent banking friction, and execute deterministic sub-second settlements across Africa and global capital markets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={onOpenSandbox}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-sm hover:shadow transition-all duration-200 active:scale-95"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Developer Sandbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onExploreNetwork}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-xs transition-all duration-200"
            >
              <Globe2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Explore Financial Network</span>
            </button>
          </div>

        </div>

        {/* Product Window Mockup (CarePortal illustration window style) */}
        <div className="max-w-4xl mx-auto mt-2">
          <div className="rounded-xl border border-slate-300/80 dark:border-slate-800 bg-white dark:bg-[#0B1324] shadow-md dark:shadow-2xl overflow-hidden">
            
            {/* Window Title Bar */}
            <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              
              {/* Fake browser URL bar */}
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 w-72 max-w-full justify-center">
                <Lock className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                <span className="truncate">mesh.novafin.network/live-settlements</span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden sm:inline">BFT Mainnet</span>
              </div>
            </div>

            {/* Window Content: Live Corridor Simulator */}
            <div className="p-5 sm:p-7">
              {/* Header Bar of Simulator */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                    Live Corridor Velocity Engine
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      Sub-Second Finality
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Compare instantaneous NOVA clearing versus legacy correspondent banking rails.
                  </p>
                </div>

                {/* Corridor Tabs */}
                <div className="flex items-center p-0.5 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setSelectedCorridor('lon-los')}
                    className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-all ${
                      selectedCorridor === 'lon-los'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    🇬🇧 London ⇄ 🇳🇬 Lagos
                  </button>
                  <button
                    onClick={() => setSelectedCorridor('nbo-los')}
                    className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-all ${
                      selectedCorridor === 'nbo-los'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    🇰🇪 Nairobi ⇄ 🇳🇬 Lagos
                  </button>
                  <button
                    onClick={() => setSelectedCorridor('acc-nbo')}
                    className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-all ${
                      selectedCorridor === 'acc-nbo'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    🇬🇭 Accra ⇄ 🇰🇪 Nairobi
                  </button>
                </div>
              </div>

              {/* Corridor Route Visualizer */}
              <div className="py-4 my-1 relative">
                <div className="flex items-center justify-between gap-4">
                  {/* Origin */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-inner">
                      {current.originFlag}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                        Origin Node
                      </span>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-white">{current.origin}</h4>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{current.sampleAmount}</span>
                    </div>
                  </div>

                  {/* Dynamic Motion Channel */}
                  <div className="flex-1 px-3 relative flex flex-col items-center">
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full relative overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full ${
                          isSimulating ? 'w-full animate-pulse transition-all duration-500' : 'w-full'
                        }`} 
                      />
                    </div>
                    
                    {/* Floating Packet */}
                    <div 
                      className={`absolute top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-emerald-500/80 shadow-xs flex items-center gap-1 text-[10px] font-mono text-emerald-700 dark:text-emerald-300 transition-all duration-500 ${
                        isSimulating ? 'scale-110 -translate-y-4' : ''
                      }`}
                    >
                      <Zap className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-spin" />
                      <span>{current.pair}</span>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="flex items-center gap-2.5 text-right">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                        Settled Destination
                      </span>
                      <h4 className="text-xs font-bold text-slate-950 dark:text-white">{current.dest}</h4>
                      <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">{current.settledAmount}</span>
                    </div>
                    <div className="w-10 h-10 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-inner">
                      {current.destFlag}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Matrix: NOVA vs Legacy SWIFT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* NOVA Column */}
                <div className="p-3 rounded-md bg-emerald-50/70 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Zap className="w-3 h-3" /> NOVA Rail
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-900 dark:text-emerald-300">
                      Settlement Final
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Settlement Speed</span>
                      <span className="font-bold text-slate-950 dark:text-white text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> {current.novaTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Flat Rail Fee</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                        {current.novaFee}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legacy SWIFT Column */}
                <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Legacy Correspondent (SWIFT)
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Slow & Costly
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Latency</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-300 text-xs">
                        {current.swiftTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Friction & Spread</span>
                      <span className="font-semibold text-rose-600 dark:text-rose-400 text-xs">
                        {current.swiftFee}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Simulation Trigger */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>
                    Direct institutional savings on this run:{' '}
                    <strong className="text-emerald-700 dark:text-emerald-300">{current.savings}</strong>
                  </span>
                </div>

                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-md font-semibold text-xs text-slate-800 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 shadow-xs transition-all active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Settling Block on Consensus Rail...' : 'Simulate Settlement Pulse'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Hero Network Live Metrics Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-4xl mx-auto">
          <div className="p-3 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 shadow-xs">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">24h Settlement Volume</span>
            <div className="text-lg font-extrabold text-slate-950 dark:text-white font-mono">$428.4M+</div>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> +19.4% vs prev week
            </span>
          </div>

          <div className="p-3 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 shadow-xs">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Mean Finality</span>
            <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">380ms</div>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              Deterministic BFT consensus
            </span>
          </div>

          <div className="p-3 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 shadow-xs">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Corridors Active</span>
            <div className="text-lg font-extrabold text-cyan-600 dark:text-cyan-300 font-mono">34 Rails</div>
            <span className="text-[9px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
              West, East, Southern & Europe
            </span>
          </div>

          <div className="p-3 rounded-md bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 shadow-xs">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Protocol SLA</span>
            <div className="text-lg font-extrabold text-amber-600 dark:text-amber-400 font-mono">99.999%</div>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-2.5 h-2.5" /> High Availability SLA
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
