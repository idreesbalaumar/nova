import React, { useState, useEffect } from 'react';
import {
  NETWORK_NODES,
  RECENT_TRANSACTIONS,
  NetworkNode,
  Transaction
} from '@/data/novaData';
import { Icon } from '@iconify/react';

interface NetworkMapSectionProps {
  onSelectTransaction: (tx: Transaction) => void;
}

export const NetworkMapSection: React.FC<NetworkMapSectionProps> = ({
  onSelectTransaction
}) => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(NETWORK_NODES[0]); // Lagos default
  const [filterMode, setFilterMode] = useState<'all' | 'cross_continental' | 'intra_africa'>('all');
  const [liveTransactions] = useState<Transaction[]>(RECENT_TRANSACTIONS);
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
    { from: 'london', to: 'lagos', color: '#10B981', label: 'GBP/NGN' },
    { from: 'london', to: 'nairobi', color: '#0EA5E9', label: 'GBP/KES' },
    { from: 'london', to: 'accra', color: '#F59E0B', label: 'EUR/GHS' },
    { from: 'london', to: 'cairo', color: '#F59E0B', label: 'GBP/EGP' },
    { from: 'cairo', to: 'lagos', color: '#10B981', label: 'EGP/NGN' },
    { from: 'cairo', to: 'nairobi', color: '#0EA5E9', label: 'EGP/KES' },
    { from: 'lagos', to: 'abuja', color: '#10B981', label: 'NGN Sovereign' },
    { from: 'lagos', to: 'accra', color: '#10B981', label: 'NGN/GHS' },
    { from: 'lagos', to: 'nairobi', color: '#0EA5E9', label: 'NGN/KES' },
    { from: 'nairobi', to: 'kigali', color: '#8B5CF6', label: 'KES/RWF' },
    { from: 'nairobi', to: 'johannesburg', color: '#EC4899', label: 'KES/ZAR' },
    { from: 'lagos', to: 'johannesburg', color: '#EC4899', label: 'NGN/ZAR' },
  ];

  const getNodeById = (id: string) => NETWORK_NODES.find((n) => n.id === id);

  return (
    <section id="network" className="relative py-20 bg-slate-100/70 dark:bg-[#070D18] border-t border-slate-200 dark:border-slate-800/80 overflow-hidden transition-colors">

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 w-[800px] h-[500px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2.5">
              <Icon icon="solar:radar-bold" className="w-3.5 h-3.5 animate-pulse text-amber-500" />
              <span>GLOBAL TO PAN-AFRICAN MESH</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              The African Financial Network
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mt-1.5">
              High-throughput monetary routing between major African financial powerhouses and the world's primary liquidity capitals.
            </p>
          </div>

          {/* Filter Corridor Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start md:self-auto shadow-sm">
            <span className="text-[11px] text-slate-500 font-medium px-2 flex items-center gap-1">
              <Icon icon="solar:filter-bold" className="w-3 h-3 text-amber-500" /> Rail:
            </span>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-all ${filterMode === 'all'
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
            >
              All Corridors
            </button>
            <button
              onClick={() => setFilterMode('cross_continental')}
              className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-all ${filterMode === 'cross_continental'
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
            >
              London ⇄ Africa
            </button>
            <button
              onClick={() => setFilterMode('intra_africa')}
              className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-all ${filterMode === 'intra_africa'
                  ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                }`}
            >
              Intra-African
            </button>
          </div>
        </div>

        {/* Interactive Network Map Canvas Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Main Visual Map Area (8 Cols) */}
          <div className="lg:col-span-8 relative rounded-xl bg-white dark:bg-[#091122] border border-slate-200 dark:border-white/10 p-4 sm:p-5 shadow-sm dark:shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-between">

            {/* Map Top Status HUD */}
            <div className="flex flex-wrap items-center justify-between gap-3 z-10">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700/80 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-slate-700 dark:text-slate-300 font-mono">Mesh Latency: <strong className="text-emerald-600 dark:text-emerald-400">28ms</strong></span>
              </div>

              <div className="flex items-center gap-3.5 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Optimal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  High Velocity
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Sovereign Rail
                </span>
              </div>
            </div>

            {/* Stylized African & European Network SVG Canvas */}
            <div className="relative w-full h-[400px] my-3 select-none">

              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450">
                <defs>
                  <linearGradient id="africaMeshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.14" />
                    <stop offset="45%" stopColor="#0EA5E9" stopOpacity="0.10" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.12" />
                  </linearGradient>

                  <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
                  </linearGradient>

                  <radialGradient id="lagosPulseGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="nairobiPulseGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.2" />
                  </radialGradient>

                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Coordinate Grid Background */}
                <g className="opacity-10 dark:opacity-20">
                  {[...Array(12)].map((_, i) => (
                    <line key={`v-${i}`} x1={i * 70} y1="0" x2={i * 70} y2="450" stroke="#0EA5E9" strokeWidth="0.5" strokeDasharray="3 3" />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} stroke="#0EA5E9" strokeWidth="0.5" strokeDasharray="3 3" />
                  ))}
                </g>

                {/* Equatorial & Tropic Reference Lines */}
                <line x1="160" y1="225" x2="680" y2="225" stroke="#10B981" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.3" />
                <text x="170" y="220" fill="#10B981" fontSize="8" opacity="0.6" fontFamily="monospace">0° EQUATOR</text>
                <text x="170" y="105" fill="#F59E0B" fontSize="8" opacity="0.5" fontFamily="monospace">23.5° N TROPIC OF CANCER</text>
                <text x="170" y="345" fill="#0EA5E9" fontSize="8" opacity="0.5" fontFamily="monospace">23.5° S TROPIC OF CAPRICORN</text>

                {/* Concentric Regional Coverage Rings (Lagos & Nairobi) */}
                <circle cx="352" cy="216" r="55" fill="url(#lagosPulseGrad)" />
                <circle cx="352" cy="216" r="105" fill="none" stroke="#10B981" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.35" />
                <circle cx="496" cy="234" r="45" fill="url(#nairobiPulseGrad)" />
                <circle cx="496" cy="234" r="85" fill="none" stroke="#0EA5E9" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.3" />

                {/* Focused African Continent Silhouette */}
                <g filter="url(#shadowFilter)">
                  {/* African Continental Landmass */}
                  <path
                    d="M 270 70 
                       C 320 60, 395 55, 465 75 
                       C 515 90, 560 110, 555 130 
                       C 550 145, 580 152, 620 165 
                       C 645 180, 635 200, 600 215 
                       C 580 225, 565 235, 550 258 
                       C 538 280, 530 315, 520 350 
                       C 505 390, 480 435, 455 455 
                       C 430 472, 405 468, 390 450 
                       C 378 430, 385 390, 378 360 
                       C 368 335, 340 315, 345 288 
                       C 350 265, 310 260, 275 255 
                       C 240 248, 208 225, 215 190 
                       C 222 155, 250 120, 260 95 
                       C 268 80, 265 72, 270 70 Z"
                    fill="url(#africaMeshGrad)"
                    stroke="currentColor"
                    className="text-emerald-500/40 dark:text-emerald-400/50"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* Madagascar Island */}
                  <path
                    d="M 555 330 C 565 310, 585 322, 580 355 C 576 385, 560 415, 550 410 C 542 400, 546 355, 555 330 Z"
                    fill="url(#africaMeshGrad)"
                    stroke="currentColor"
                    className="text-emerald-500/40 dark:text-emerald-400/50"
                    strokeWidth="1.2"
                  />

                  {/* Great African Rift Valley Line */}
                  <path
                    d="M 515 90 Q 500 160 496 234 Q 480 290 455 350"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1.2"
                    strokeDasharray="2 4"
                    opacity="0.6"
                  />

                  {/* Offshore British Isles (London Gateway at Top) */}
                  <path
                    d="M 330 35 C 342 30, 350 42, 345 58 C 340 70, 325 68, 330 35 Z"
                    className="fill-slate-100 dark:fill-white/10 stroke-slate-400 dark:stroke-white/20"
                    strokeWidth="1"
                  />
                </g>

                {/* Active Dynamic Corridors Arcs */}
                {connections.map((conn, idx) => {
                  const nodeA = getNodeById(conn.from);
                  const nodeB = getNodeById(conn.to);
                  if (!nodeA || !nodeB) return null;

                  const x1 = (nodeA.xPercent / 100) * 800;
                  const y1 = (nodeA.yPercent / 100) * 450;
                  const x2 = (nodeB.xPercent / 100) * 800;
                  const y2 = (nodeB.yPercent / 100) * 450;

                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2 - 35;

                  const isHighlighted = selectedNode.id === conn.from || selectedNode.id === conn.to;

                  const t = ((activePacketIndex + idx * 15) % 100) / 100;
                  const packetX = Math.pow(1 - t, 2) * x1 + 2 * (1 - t) * t * midX + Math.pow(t, 2) * x2;
                  const packetY = Math.pow(1 - t, 2) * y1 + 2 * (1 - t) * t * midY + Math.pow(t, 2) * y2;

                  return (
                    <g key={`conn-${idx}`}>
                      <path
                        d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                        fill="none"
                        stroke={isHighlighted ? conn.color : 'currentColor'}
                        className={isHighlighted ? '' : 'text-slate-300 dark:text-slate-700'}
                        strokeWidth={isHighlighted ? 2.5 : 1.2}
                        strokeDasharray={isHighlighted ? 'none' : '4 4'}
                        filter={isHighlighted ? 'url(#glow)' : undefined}
                      />
                      <circle
                        cx={packetX}
                        cy={packetY}
                        r={isHighlighted ? 4 : 2.5}
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
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-300 z-20"
                  >
                    <div className="relative flex items-center justify-center">
                      <div
                        className={`absolute w-10 h-10 rounded-full transition-all duration-300 ${isSelected
                            ? 'bg-emerald-400/30 scale-125 animate-ping'
                            : 'bg-cyan-500/10 group-hover:scale-110'
                          }`}
                      />

                      {/* Inner Node Pill with reduced roundness */}
                      <div
                        className={`relative px-2.5 py-1.5 rounded-md flex items-center gap-1.5 backdrop-blur-md shadow-sm transition-all duration-200 ${isSelected
                            ? 'bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 scale-105 ring-2 ring-emerald-400/40'
                            : 'bg-white dark:bg-slate-900/90 text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700/80 group-hover:border-cyan-500 group-hover:scale-105'
                          }`}
                      >
                        <span className="text-xs">{node.flag}</span>
                        <span className="text-xs font-bold font-mono tracking-tight">
                          {node.city}
                        </span>
                      </div>
                    </div>

                    {/* Node Mini Metric Badge */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-sm text-[10px] font-mono whitespace-nowrap transition-all duration-200 ${isSelected
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 block'
                          : 'hidden group-hover:block bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                        }`}
                    >
                      {node.tps} • {node.latency}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Bottom Corridors Quick Stats */}
            <div className="pt-3.5 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Icon icon="solar:cpu-bold" className="w-3.5 h-3.5 text-amber-500" />
                <span>Consensus Engine: <strong className="text-slate-800 dark:text-white">BFT PoS Rail v2.4</strong></span>
              </div>
              <div className="flex items-center gap-4">
                <span>Corridors Active: <strong className="text-emerald-600 dark:text-emerald-400">34 Pairs</strong></span>
                <span>Active Routing Hub: <strong className="text-cyan-600 dark:text-cyan-400">{selectedNode.city}</strong></span>
              </div>
            </div>

          </div>

          {/* Node Deep-Dive Telemetry Card (4 Cols) */}
          <div className="lg:col-span-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-5 shadow-sm dark:shadow-2xl">

            {/* Selected Node Details */}
            <div className="flex items-start justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl shadow-inner">
                  {selectedNode.flag}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">{selectedNode.city}</h3>
                    <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                      LIVE
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{selectedNode.country}</span>
                </div>
              </div>
            </div>

            {/* Classification & Role */}
            <div className="py-3.5">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block mb-1">
                Node Classification
              </span>
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                {selectedNode.type}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            {/* Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 py-3.5 border-t border-b border-slate-200 dark:border-slate-800">
              <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Peak Throughput</span>
                <span className="text-sm font-bold text-slate-950 dark:text-white font-mono">{selectedNode.tps}</span>
              </div>
              <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Clearing Latency</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">{selectedNode.latency}</span>
              </div>
              <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Reserves</span>
                <span className="text-sm font-bold text-cyan-600 dark:text-cyan-300 font-mono">{selectedNode.reserves}</span>
              </div>
              <div className="p-2.5 rounded-md bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mb-0.5">Node Health</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 100%
                </span>
              </div>
            </div>

            {/* Active Currency Pairs */}
            <div className="pt-3.5">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono block mb-2">
                Active FX Corridors
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.activePairs.map((pair) => (
                  <span
                    key={pair}
                    className="px-2 py-0.5 rounded-sm text-[11px] font-mono font-medium bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    {pair}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Real-Time Live Settlement Stream Ticker */}
        <div className="mt-10 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-5 shadow-sm dark:shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                Live Cross-Border Settlement Stream
              </h3>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Click any transaction to verify cryptographic proof & receipt
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                  <th className="pb-2.5 font-medium">Corridor</th>
                  <th className="pb-2.5 font-medium">Counterparty</th>
                  <th className="pb-2.5 font-medium">Source Amount</th>
                  <th className="pb-2.5 font-medium">Settled Amount</th>
                  <th className="pb-2.5 font-medium">Latency</th>
                  <th className="pb-2.5 font-medium">Status</th>
                  <th className="pb-2.5 font-medium text-right">Proof Hash</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                {liveTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => onSelectTransaction(tx)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                  >
                    <td className="py-2.5 font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{tx.originFlag}</span>
                      <span>{tx.originCity}</span>
                      <span className="text-slate-400">→</span>
                      <span>{tx.destFlag}</span>
                      <span>{tx.destCity}</span>
                    </td>
                    <td className="py-2.5 text-slate-700 dark:text-slate-300 font-sans">{tx.sender}</td>
                    <td className="py-2.5 text-slate-600 dark:text-slate-200">{tx.sourceAmount}</td>
                    <td className="py-2.5 text-emerald-600 dark:text-emerald-400 font-bold">{tx.settledAmount}</td>
                    <td className="py-2.5 text-slate-500 dark:text-slate-400">{tx.latencyMs}ms</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-cyan-600 dark:text-cyan-400 group-hover:underline flex items-center justify-end gap-1">
                      <span>{tx.hash}</span>
                      <Icon icon="solar:arrow-right-up-linear" className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
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
