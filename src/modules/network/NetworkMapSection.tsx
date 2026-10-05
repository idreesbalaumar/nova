import React, { useState, useEffect, useRef } from 'react';
import { 
  NETWORK_NODES, 
  RECENT_TRANSACTIONS, 
  NetworkNode, 
  Transaction 
} from '@/data/novaData';
import { 
  Activity, 
  Globe2, 
  Layers, 
  ArrowUpRight, 
  Zap, 
  ShieldCheck, 
  Radio, 
  Cpu, 
  Search,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface NetworkMapSectionProps {
  onSelectTransaction: (tx: Transaction) => void;
}

export const NetworkMapSection: React.FC<NetworkMapSectionProps> = ({ 
  onSelectTransaction 
}) => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(NETWORK_NODES[0]); // Lagos default
  const [filterMode, setFilterMode] = useState<'all' | 'cross_continental' | 'intra_africa'>('all');
  const [liveTransactions, setLiveTransactions] = useState<Transaction[]>(RECENT_TRANSACTIONS);
  const [activePacketIndex, setActivePacketIndex] = useState(0);

  // Pulse animation effect for animated packet simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePacketIndex((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Filter nodes or corridors
  const filteredNodes = NETWORK_NODES.filter((node) => {
    if (filterMode === 'cross_continental') {
      return ['london', 'lagos', 'nairobi', 'accra'].includes(node.id);
    }
    if (filterMode === 'intra_africa') {
      return node.id !== 'london';
    }
    return true;
  });

  // Calculate connection lines between nodes
  const connections = [
    { from: 'london', to: 'lagos', color: '#00F5A0', label: 'GBP/NGN' },
    { from: 'london', to: 'nairobi', color: '#00D2FF', label: 'GBP/KES' },
    { from: 'london', to: 'accra', color: '#FFB800', label: 'EUR/GHS' },
    { from: 'lagos', to: 'abuja', color: '#00F5A0', label: 'NGN Sovereign' },
    { from: 'lagos', to: 'accra', color: '#00F5A0', label: 'NGN/GHS' },
    { from: 'lagos', to: 'nairobi', color: '#00D2FF', label: 'NGN/KES' },
    { from: 'nairobi', to: 'kigali', color: '#8B5CF6', label: 'KES/RWF' },
    { from: 'nairobi', to: 'johannesburg', color: '#EC4899', label: 'KES/ZAR' },
    { from: 'lagos', to: 'johannesburg', color: '#EC4899', label: 'NGN/ZAR' },
  ];

  const getNodeById = (id: string) => NETWORK_NODES.find((n) => n.id === id);

  return (
    <section id="network" className="relative py-24 bg-[#070D18] border-t border-slate-800/80 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 w-[800px] h-[500px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>GLOBAL TO PAN-AFRICAN MESH</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              The African Financial Network
            </h2>
            <p className="text-slate-400 text-base max-w-xl mt-2">
              High-throughput monetary routing between major African financial powerhouses and the world's primary liquidity capitals.
            </p>
          </div>

          {/* Filter Corridor Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <span className="text-xs text-slate-500 font-medium px-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Rail:
            </span>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterMode === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Corridors
            </button>
            <button
              onClick={() => setFilterMode('cross_continental')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterMode === 'cross_continental'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              London ⇄ Africa
            </button>
            <button
              onClick={() => setFilterMode('intra_africa')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterMode === 'intra_africa'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Intra-African
            </button>
          </div>
        </div>

        {/* Interactive Network Map Canvas Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Map Area (8 Cols) */}
          <div className="lg:col-span-8 relative rounded-3xl bg-[#091122] border border-white/10 p-4 sm:p-6 shadow-2xl overflow-hidden min-h-[520px] flex flex-col justify-between">
            
            {/* Map Top Status HUD */}
            <div className="flex flex-wrap items-center justify-between gap-3 z-10">
              <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-slate-300 font-mono">Mesh Latency: <strong className="text-emerald-400">28ms</strong></span>
              </div>
              
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" /> 
                  Optimal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" /> 
                  High Velocity
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" /> 
                  Sovereign Rail
                </span>
              </div>
            </div>

            {/* Stylized African & European Network SVG Canvas */}
            <div className="relative w-full h-[420px] my-4 select-none">
              
              {/* Background Map Contours (Stylized Vector Shapes for Africa & UK) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450">
                <defs>
                  <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#00D2FF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFB800" stopOpacity="0.8" />
                  </linearGradient>
                  
                  {/* Glow filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Stylized Grid Background */}
                <g opacity="0.15">
                  {[...Array(12)].map((_, i) => (
                    <line key={`v-${i}`} x1={i * 70} y1="0" x2={i * 70} y2="450" stroke="#00D2FF" strokeWidth="0.5" strokeDasharray="3 3" />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} stroke="#00D2FF" strokeWidth="0.5" strokeDasharray="3 3" />
                  ))}
                </g>

                {/* Continental silhouette hints */}
                {/* Europe/UK hint at top */}
                <path
                  d="M 310 50 Q 340 70 370 60 Q 400 90 350 110 Q 300 80 310 50 Z"
                  fill="rgba(255, 255, 255, 0.02)"
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeWidth="1"
                />
                {/* African continent stylized polygon hint */}
                <path
                  d="M 270 140 Q 380 130 460 160 Q 550 200 520 280 Q 480 380 410 420 Q 380 380 360 300 Q 250 240 270 140 Z"
                  fill="rgba(0, 245, 160, 0.02)"
                  stroke="rgba(0, 245, 160, 0.1)"
                  strokeWidth="1.2"
                />

                {/* Active Dynamic Corridors Arcs */}
                {connections.map((conn, idx) => {
                  const nodeA = getNodeById(conn.from);
                  const nodeB = getNodeById(conn.to);
                  if (!nodeA || !nodeB) return null;

                  // Convert percentage to 800x450 scale
                  const x1 = (nodeA.xPercent / 100) * 800;
                  const y1 = (nodeA.yPercent / 100) * 450;
                  const x2 = (nodeB.xPercent / 100) * 800;
                  const y2 = (nodeB.yPercent / 100) * 450;

                  // Curvature control point
                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2 - 35; // curve upwards

                  const isHighlighted = 
                    selectedNode.id === conn.from || selectedNode.id === conn.to;

                  // Animated packet position along quadratic bezier
                  const t = ((activePacketIndex + idx * 15) % 100) / 100;
                  // Bezier formula: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
                  const packetX = Math.pow(1 - t, 2) * x1 + 2 * (1 - t) * t * midX + Math.pow(t, 2) * x2;
                  const packetY = Math.pow(1 - t, 2) * y1 + 2 * (1 - t) * t * midY + Math.pow(t, 2) * y2;

                  return (
                    <g key={`conn-${idx}`}>
                      {/* Arc Base Path */}
                      <path
                        d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                        fill="none"
                        stroke={isHighlighted ? conn.color : 'rgba(255, 255, 255, 0.15)'}
                        strokeWidth={isHighlighted ? 2.5 : 1.2}
                        strokeDasharray={isHighlighted ? 'none' : '4 4'}
                        filter={isHighlighted ? 'url(#glow)' : undefined}
                        className="transition-all duration-300"
                      />

                      {/* Moving Money Packet */}
                      <circle
                        cx={packetX}
                        cy={packetY}
                        r={isHighlighted ? 4.5 : 3}
                        fill={conn.color}
                        filter="url(#glow)"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Render City Nodes on Canvas */}
              {filteredNodes.map((node) => {
                const isSelected = selectedNode.id === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{
                      left: `${node.xPercent}%`,
                      top: `${node.yPercent}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-300 z-20`}
                  >
                    {/* Pulsing Outer Rings */}
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`absolute w-12 h-12 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-emerald-400/30 scale-125 animate-ping'
                            : 'bg-cyan-500/10 group-hover:scale-110 group-hover:bg-cyan-400/20'
                        }`}
                      />
                      
                      {/* Inner Node Pill */}
                      <div
                        className={`relative px-2.5 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950 scale-110 ring-4 ring-emerald-400/30 shadow-emerald-500/50'
                            : 'bg-slate-900/90 text-white border border-slate-700/80 group-hover:border-cyan-400 group-hover:scale-105'
                        }`}
                      >
                        <span className="text-sm">{node.flag}</span>
                        <span className="text-xs font-bold font-mono tracking-tight">
                          {node.city}
                        </span>
                      </div>
                    </div>

                    {/* Node Mini Metric Badge */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono whitespace-nowrap transition-all duration-300 ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 block'
                          : 'hidden group-hover:block bg-slate-900/90 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {node.tps} • {node.latency}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Bottom Corridors Quick Stats */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Consensus Engine: <strong className="text-white">BFT PoS Sub-Rail v2.4</strong></span>
              </div>
              <div className="flex items-center gap-4">
                <span>Corridors Active: <strong className="text-emerald-400">34 Pairs</strong></span>
                <span>Active Routing Hub: <strong className="text-cyan-400">{selectedNode.city}</strong></span>
              </div>
            </div>

          </div>

          {/* Node Deep-Dive Telemetry Card (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl bg-slate-900/90 border border-white/10 p-6 shadow-2xl backdrop-blur-xl">
            
            {/* Selected Node Details */}
            <div className="flex items-start justify-between gap-3 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shadow-lg">
                  {selectedNode.flag}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{selectedNode.city}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      LIVE NODE
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{selectedNode.country}</span>
                </div>
              </div>
            </div>

            {/* Classification & Role */}
            <div className="py-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block mb-1">
                Node Classification
              </span>
              <p className="text-sm font-semibold text-emerald-300">
                {selectedNode.type}
              </p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 border-t border-b border-slate-800">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Peak Throughput</span>
                <span className="text-base font-bold text-white font-mono">{selectedNode.tps}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Clearing Latency</span>
                <span className="text-base font-bold text-emerald-400 font-mono">{selectedNode.latency}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Liquidity Reserves</span>
                <span className="text-base font-bold text-cyan-300 font-mono">{selectedNode.reserves}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-0.5">Node Health</span>
                <span className="text-base font-bold text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100%
                </span>
              </div>
            </div>

            {/* Active Currency Pairs */}
            <div className="pt-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono block mb-2">
                Active FX Corridors on Node
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.activePairs.map((pair) => (
                  <span
                    key={pair}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-800/80 border border-slate-700 text-slate-200"
                  >
                    {pair}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Node Route Action */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                <span>Direct settlement ready</span>
                <span className="font-mono font-bold">Zero-Spread Rail</span>
              </div>
            </div>

          </div>

        </div>

        {/* Real-Time Live Settlement Stream Ticker */}
        <div className="mt-12 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Live Cross-Border Settlement Stream
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Click any transaction to verify cryptographic proof & receipt
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="pb-3 font-medium">Corridor</th>
                  <th className="pb-3 font-medium">Counterparty</th>
                  <th className="pb-3 font-medium">Source Amount</th>
                  <th className="pb-3 font-medium">Settled Amount</th>
                  <th className="pb-3 font-medium">Latency</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Proof Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {liveTransactions.map((tx) => (
                  <tr 
                    key={tx.id}
                    onClick={() => onSelectTransaction(tx)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 font-semibold text-white flex items-center gap-1.5">
                      <span>{tx.originFlag}</span>
                      <span>{tx.originCity}</span>
                      <span className="text-slate-500">→</span>
                      <span>{tx.destFlag}</span>
                      <span>{tx.destCity}</span>
                    </td>
                    <td className="py-3 text-slate-300 font-sans">{tx.sender}</td>
                    <td className="py-3 text-slate-200">{tx.sourceAmount}</td>
                    <td className="py-3 text-emerald-400 font-bold">{tx.settledAmount}</td>
                    <td className="py-3 text-slate-400">{tx.latencyMs}ms</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-right text-cyan-400 group-hover:text-cyan-300 flex items-center justify-end gap-1">
                      <span>{tx.hash}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
