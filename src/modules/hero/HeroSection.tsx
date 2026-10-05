import React, { useState } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  Globe2, 
  RefreshCw, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
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
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Aurora Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 bg-nova-grid pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/90 border border-emerald-500/30 text-xs text-slate-800 dark:text-slate-300 shadow-sm hover:border-emerald-500/60 transition-colors">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">NOVA 2.0 PROTOCOL</span>
            <span className="text-slate-400 dark:text-slate-600">|</span>
            <span className="text-slate-700 dark:text-slate-300">Africa's Unified Real-Time Settlement Layer</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>

        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white mb-5 leading-[1.12]">
            Africa’s Financial <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-600 dark:from-emerald-400 dark:via-cyan-300 dark:to-amber-400">
              Operating System
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            NOVA connects African sovereign currencies, commercial switches, and global capital markets into a unified, sub-second monetary rail. Powered by predictive AI and institutional MPC security.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-7">
            <button
              onClick={onOpenSandbox}
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-sm hover:shadow transition-all duration-200 active:scale-95"
            >
              <Terminal className="w-3.5 h-3.5 text-slate-950" />
              <span>Launch Sandbox Console</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreNetwork}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md font-semibold text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/80 shadow-sm transition-all duration-200"
            >
              <Globe2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Explore Financial Network</span>
            </button>
          </div>
        </div>

        {/* Interactive Element: Live Corridor Settlement Simulator */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-xl p-[1px] bg-gradient-to-b from-emerald-500/30 via-cyan-500/10 to-transparent shadow-lg dark:shadow-2xl">
            <div className="rounded-xl bg-white dark:bg-[#0A111F]/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-5 sm:p-7">
              
              {/* Header Bar of Simulator */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      Live Corridor Velocity Engine
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        Interactive Demo
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Compare instantaneous NOVA finality versus legacy correspondent banking rails.
                    </p>
                  </div>
                </div>

                {/* Corridor Tabs */}
                <div className="flex items-center p-1 rounded-md bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setSelectedCorridor('lon-los')}
                    className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-all ${
                      selectedCorridor === 'lon-los'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    🇬🇧 London ⇄ 🇳🇬 Lagos
                  </button>
                  <button
                    onClick={() => setSelectedCorridor('nbo-los')}
                    className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-all ${
                      selectedCorridor === 'nbo-los'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    🇰🇪 Nairobi ⇄ 🇳🇬 Lagos
                  </button>
                  <button
                    onClick={() => setSelectedCorridor('acc-nbo')}
                    className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-all ${
                      selectedCorridor === 'acc-nbo'
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    🇬🇭 Accra ⇄ 🇰🇪 Nairobi
                  </button>
                </div>
              </div>

              {/* Corridor Route Visualizer */}
              <div className="py-5 my-2 relative">
                <div className="flex items-center justify-between gap-4">
                  
                  {/* Origin */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-inner">
                      {current.originFlag}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                        Origin Node
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{current.origin}</h4>
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{current.sampleAmount}</span>
                    </div>
                  </div>

                  {/* Dynamic Motion Channel */}
                  <div className="flex-1 px-4 relative flex flex-col items-center">
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full relative overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-400 rounded-full ${
                          isSimulating ? 'w-full animate-pulse transition-all duration-500' : 'w-full'
                        }`} 
                      />
                    </div>
                    
                    {/* Floating Packet */}
                    <div 
                      className={`absolute top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-emerald-500/80 shadow-md flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 dark:text-emerald-300 transition-all duration-500 ${
                        isSimulating ? 'scale-110 -translate-y-5' : ''
                      }`}
                    >
                      <Zap className="w-3 h-3 text-emerald-500 dark:text-emerald-400 animate-spin" />
                      <span>{current.pair}</span>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                        Settled Destination
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{current.dest}</h4>
                      <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">{current.settledAmount}</span>
                    </div>
                    <div className="w-11 h-11 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-inner">
                      {current.destFlag}
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Matrix: NOVA vs Legacy SWIFT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
                
                {/* NOVA Column */}
                <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300/80 dark:border-emerald-500/30 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Zap className="w-3.5 h-3.5" /> NOVA Protocol
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                      Settlement Final
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Settlement Speed</span>
                      <span className="font-bold text-slate-950 dark:text-white text-base flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> {current.novaTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Transaction Fee</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 text-base">
                        {current.novaFee}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Legacy SWIFT Column */}
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Legacy Rails (SWIFT)
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                      Slow & Costly
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Typical Latency</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-300 text-sm">
                        {current.swiftTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Friction & Spread</span>
                      <span className="font-semibold text-rose-600 dark:text-rose-400 text-xs">
                        {current.swiftFee}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Simulation Trigger */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3.5 border-t border-slate-200 dark:border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>
                    Direct institutional savings on this run:{' '}
                    <strong className="text-emerald-600 dark:text-emerald-300">{current.savings}</strong>
                  </span>
                </div>

                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-semibold text-xs text-slate-800 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 ${isSimulating ? 'animate-spin' : ''}`} />
                  <span>{isSimulating ? 'Settling Block on Consensus Rail...' : 'Simulate Settlement Pulse'}</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Hero Network Live Metrics Ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-10 max-w-5xl mx-auto">
          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">24h Settlement Volume</span>
            <div className="text-xl font-extrabold text-slate-950 dark:text-white font-mono">$428.4M+</div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +19.4% vs prev week
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Mean Finality</span>
            <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">380ms</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
              Deterministic BFT consensus
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Corridors Active</span>
            <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-300 font-mono">34 Rails</div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
              West, East, Southern & Europe
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Protocol SLA</span>
            <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">99.999%</div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3 h-3" /> High Availability SLA
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
