import React, { useState, useEffect } from 'react';
import {
  NETWORK_NODES,
  RECENT_TRANSACTIONS,
  NetworkNode,
  Transaction
} from '@/data/novaData';
import { AFRICA_MAP_FEATURES } from './africaMapData';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { cn } from '../shared/utils/cn';

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
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Filter nodes or corridors
  const filteredNodes = NETWORK_NODES.filter((node) => {
    if (filterMode === 'cross_continental') {
      return ['london', 'lagos', 'nairobi', 'accra', 'cairo'].includes(node.id);
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

  const filteredConnections = connections.filter((conn) => {
    if (filterMode === 'cross_continental') {
      return conn.from === 'london' || conn.to === 'london';
    }
    if (filterMode === 'intra_africa') {
      return conn.from !== 'london' && conn.to !== 'london';
    }
    return true;
  });

  const getNodeById = (id: string) => NETWORK_NODES.find((n) => n.id === id);

  // Helper to compute great-circle aerodynamic curve between two nodes
  const getArcGeometry = (nodeA: NetworkNode, nodeB: NetworkNode) => {
    const x1 = nodeA.svgX;
    const y1 = nodeA.svgY;
    const x2 = nodeB.svgX;
    const y2 = nodeB.svgY;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const bend = Math.min(14, dist * 0.12);
    const nx = -dy / dist;
    const ny = dx / dist;
    const ctrlX = midX + nx * bend;
    const ctrlY = midY + ny * bend;
    const pathD = `M ${x1} ${y1} Q ${ctrlX} ${ctrlY} ${x2} ${y2}`;
    return { x1, y1, x2, y2, ctrlX, ctrlY, pathD };
  };

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
          <div className="lg:col-span-8 relative rounded-xl bg-white dark:bg-[#091122] border border-slate-200 dark:border-white/10 p-4 sm:p-5 shadow-sm dark:shadow-2xl overflow-hidden min-h-[520px] flex flex-col justify-between">

            {/* Map Top Status HUD */}
            <div className="flex flex-wrap items-center justify-between gap-3 z-10 mb-2">
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

            {/* Authentic Africa-Focused High-Fidelity Vector Network Canvas */}
            <div className="relative w-full h-[460px] sm:h-[490px] my-1 select-none flex items-center justify-center">

              <svg
                className="w-full h-full"
                viewBox="290 350 340 290"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Glowing Laser Filter */}
                  <filter id="meshGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Badge Drop Shadow */}
                  <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="130%">
                    <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.25" />
                  </filter>

                  {/* Radial Pulse Gradients */}
                  <radialGradient id="lagosPulseGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="nairobiPulseGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Coordinate Grid Background */}
                <g className="opacity-15 dark:opacity-20 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={290 + i * 25}
                      y1="350"
                      x2={290 + i * 25}
                      y2="640"
                      stroke="#0EA5E9"
                      strokeWidth="0.3"
                      strokeDasharray="2 3"
                    />
                  ))}
                  {[...Array(12)].map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="290"
                      y1={350 + i * 25}
                      x2="630"
                      y2={350 + i * 25}
                      stroke="#0EA5E9"
                      strokeWidth="0.3"
                      strokeDasharray="2 3"
                    />
                  ))}
                </g>

                {/* Equatorial & Tropic Reference Lines */}
                <line x1="295" y1="445" x2="625" y2="445" stroke="#F59E0B" strokeWidth="0.45" strokeDasharray="3 4" opacity="0.35" />
                <text x="296" y="442" fill="#F59E0B" fontSize="4.2" opacity="0.6" fontFamily="monospace">23.5° N TROPIC OF CANCER</text>

                <line x1="295" y1="530" x2="625" y2="530" stroke="#10B981" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
                <text x="296" y="527" fill="#10B981" fontSize="4.2" opacity="0.75" fontFamily="monospace">0° EQUATOR</text>

                <line x1="295" y1="595" x2="625" y2="595" stroke="#0EA5E9" strokeWidth="0.45" strokeDasharray="3 4" opacity="0.35" />
                <text x="296" y="592" fill="#0EA5E9" fontSize="4.2" opacity="0.6" fontFamily="monospace">23.5° S TROPIC OF CAPRICORN</text>

                {/* Regional Coverage Sonar Rings */}
                <circle cx="422" cy="522" r="18" fill="url(#lagosPulseGrad)" className="pointer-events-none" />
                <circle cx="422" cy="522" r="38" fill="none" stroke="#10B981" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.4" className="pointer-events-none" />
                <circle cx="501" cy="530" r="16" fill="url(#nairobiPulseGrad)" className="pointer-events-none" />
                <circle cx="501" cy="530" r="34" fill="none" stroke="#0EA5E9" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.4" className="pointer-events-none" />

                {/* Authentic African Continent Vector Map */}
                <g className="africa-countries pointer-events-none">
                  {AFRICA_MAP_FEATURES.map((feature) => {
                    const isNetworkCountry = ['ng', 'ke', 'gh', 'za', 'eg', 'rw', 'gb'].includes(feature.id);
                    const isSelectedCountry =
                      ((selectedNode.id === 'lagos' || selectedNode.id === 'abuja') && feature.id === 'ng') ||
                      (selectedNode.id === 'nairobi' && feature.id === 'ke') ||
                      (selectedNode.id === 'accra' && feature.id === 'gh') ||
                      (selectedNode.id === 'johannesburg' && feature.id === 'za') ||
                      (selectedNode.id === 'cairo' && feature.id === 'eg') ||
                      (selectedNode.id === 'kigali' && feature.id === 'rw') ||
                      (selectedNode.id === 'london' && feature.id === 'gb');

                    return (
                      <g key={feature.id} id={`country-${feature.id}`}>
                        {feature.paths.map((pathD, pIdx) => (
                          <path
                            key={pIdx}
                            d={pathD}
                            className={cn(
                              "transition-all duration-300",
                              isSelectedCountry
                                ? "fill-emerald-500/25 stroke-emerald-400 stroke-[0.9]"
                                : isNetworkCountry
                                ? "fill-emerald-500/10 dark:fill-emerald-400/10 stroke-emerald-600/35 dark:stroke-emerald-400/35 stroke-[0.6]"
                                : "fill-slate-200/50 dark:fill-slate-800/40 stroke-slate-300 dark:stroke-slate-700/60 stroke-[0.35]"
                            )}
                          />
                        ))}
                      </g>
                    );
                  })}
                </g>

                {/* Active Dynamic Corridors Arcs */}
                {filteredConnections.map((conn, idx) => {
                  const nodeA = getNodeById(conn.from);
                  const nodeB = getNodeById(conn.to);
                  if (!nodeA || !nodeB) return null;

                  const { x1, y1, x2, y2, ctrlX, ctrlY, pathD } = getArcGeometry(nodeA, nodeB);
                  const isHighlighted = selectedNode.id === conn.from || selectedNode.id === conn.to;

                  // Compute moving packet along bezier curve
                  const t = ((activePacketIndex + idx * 12) % 100) / 100;
                  const packetX = Math.pow(1 - t, 2) * x1 + 2 * (1 - t) * t * ctrlX + Math.pow(t, 2) * x2;
                  const packetY = Math.pow(1 - t, 2) * y1 + 2 * (1 - t) * t * ctrlY + Math.pow(t, 2) * y2;

                  return (
                    <g key={`conn-${idx}`} className="pointer-events-none">
                      {/* Base Corridor Path */}
                      <path
                        d={pathD}
                        fill="none"
                        stroke={isHighlighted ? conn.color : 'currentColor'}
                        className={isHighlighted ? 'opacity-90' : 'text-slate-300 dark:text-slate-700/80 opacity-40'}
                        strokeWidth={isHighlighted ? 1.4 : 0.6}
                        strokeDasharray={isHighlighted ? 'none' : '2 3'}
                        filter={isHighlighted ? 'url(#meshGlow)' : undefined}
                      />

                      {/* Moving Pulse Packet */}
                      <circle
                        cx={packetX}
                        cy={packetY}
                        r={isHighlighted ? 2.2 : 1.4}
                        fill={isHighlighted ? conn.color : '#94A3B8'}
                        filter={isHighlighted ? 'url(#meshGlow)' : undefined}
                      />
                    </g>
                  );
                })}

                {/* Interactive Financial Node Radar Pins & Non-Colliding Badges */}
                {filteredNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const badgeW = node.badgeWidth || 44;
                  const badgeH = 13.5;
                  const bx = node.svgX + node.badgeOffsetX;
                  const by = node.svgY + node.badgeOffsetY;

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className="cursor-pointer group pointer-events-auto"
                      role="button"
                      tabIndex={0}
                    >
                      {/* Radar Pulse Wave on node anchor */}
                      <motion.circle
                        cx={node.svgX}
                        cy={node.svgY}
                        r={isSelected ? 9 : 6}
                        fill="none"
                        stroke={isSelected ? '#10B981' : '#0EA5E9'}
                        strokeWidth="0.8"
                        initial={{ scale: 0.6, opacity: 0.9 }}
                        animate={{ scale: [0.6, 2.2], opacity: [0.9, 0] }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />

                      {/* Center Glowing Pin Point */}
                      <circle
                        cx={node.svgX}
                        cy={node.svgY}
                        r={isSelected ? 3.2 : 2.2}
                        fill={isSelected ? '#10B981' : '#0EA5E9'}
                        stroke="#FFFFFF"
                        strokeWidth="0.8"
                        filter="url(#meshGlow)"
                      />

                      {/* Leader Line to Badge if offset is significant */}
                      {(Math.abs(node.badgeOffsetX) > 8 || Math.abs(node.badgeOffsetY) > 8) && (
                        <line
                          x1={node.svgX}
                          y1={node.svgY}
                          x2={bx + (node.badgeOffsetX < 0 ? badgeW : 0)}
                          y2={by + badgeH / 2}
                          stroke={isSelected ? '#10B981' : 'rgba(148, 163, 184, 0.45)'}
                          strokeWidth="0.4"
                          strokeDasharray="1.5 1.5"
                        />
                      )}

                      {/* Sleek City Badge Container */}
                      <rect
                        x={bx}
                        y={by}
                        width={badgeW}
                        height={badgeH}
                        rx="3.5"
                        className={cn(
                          "transition-all duration-200",
                          isSelected
                            ? "fill-emerald-600 dark:fill-emerald-500 stroke-emerald-300 dark:stroke-emerald-200"
                            : "fill-white/95 dark:fill-slate-900/95 stroke-slate-300 dark:stroke-slate-700/90 group-hover:stroke-cyan-400"
                        )}
                        strokeWidth={isSelected ? '0.9' : '0.45'}
                        filter="url(#badgeShadow)"
                      />

                      {/* Flag and City Name Label */}
                      <text
                        x={bx + badgeW / 2}
                        y={by + badgeH / 2 + 2}
                        textAnchor="middle"
                        fontSize="5.6"
                        fontWeight="700"
                        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                        className={cn(
                          "pointer-events-none select-none",
                          isSelected
                            ? "fill-white dark:fill-slate-950 font-extrabold"
                            : "fill-slate-800 dark:fill-slate-100 font-bold"
                        )}
                      >
                        {node.flag} {node.city}
                      </text>

                      {/* Active Sub-Badge Indicator for Selected Node */}
                      {isSelected && (
                        <g className="pointer-events-none">
                          <rect
                            x={bx}
                            y={by + badgeH + 1.4}
                            width={badgeW}
                            height="8"
                            rx="2"
                            fill="rgba(16, 185, 129, 0.16)"
                            stroke="rgba(16, 185, 129, 0.5)"
                            strokeWidth="0.4"
                          />
                          <text
                            x={bx + badgeW / 2}
                            y={by + badgeH + 6.8}
                            textAnchor="middle"
                            fontSize="4"
                            fontWeight="700"
                            fontFamily="monospace"
                            fill="#10B981"
                          >
                            {node.tps} • {node.latency}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

              </svg>

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
