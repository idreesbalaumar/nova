import React, { useState } from 'react';
import { 
  MULTI_CURRENCY_WALLETS, 
  VOLUME_CHART_DATA, 
  RECENT_TRANSACTIONS, 
  WalletBalance, 
  Transaction 
} from '@/data/novaData';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
} from 'recharts';
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpDown, 
  Search, 
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'sonner';

interface FinancialIntelligenceSectionProps {
  onSelectTransaction: (tx: Transaction) => void;
}

export const FinancialIntelligenceSection: React.FC<FinancialIntelligenceSectionProps> = ({
  onSelectTransaction,
}) => {
  const [selectedWallet, setSelectedWallet] = useState<WalletBalance>(MULTI_CURRENCY_WALLETS[0]);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '1y'>('24h');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'settled' | 'clearing'>('all');

  // FX Converter states
  const [sourceCurr, setSourceCurr] = useState('USD');
  const [targetCurr, setTargetCurr] = useState('NGN');
  const [sourceAmount, setSourceAmount] = useState('10000');

  const rates: Record<string, number> = {
    'USD-NGN': 1488.50,
    'USD-KES': 129.40,
    'USD-GHS': 15.90,
    'USD-GBP': 0.77,
    'GBP-NGN': 1942.20,
    'GBP-KES': 168.05,
    'KES-NGN': 11.50,
    'GHS-NGN': 93.60,
  };

  const getConversionRate = (from: string, to: string) => {
    if (from === to) return 1;
    const directKey = `${from}-${to}`;
    if (rates[directKey]) return rates[directKey];
    const reverseKey = `${to}-${from}`;
    if (rates[reverseKey]) return 1 / rates[reverseKey];
    return 1488.50;
  };

  const currentRate = getConversionRate(sourceCurr, targetCurr);
  const numericAmount = parseFloat(sourceAmount) || 0;
  const convertedResult = (numericAmount * currentRate).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const filteredTransactions = RECENT_TRANSACTIONS.filter((tx) => {
    const matchesSearch = 
      tx.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.originCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.destCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    toast.success('Ledger Export Generated', {
      description: 'Encrypted institutional CSV report downloaded for compliance audit.',
    });
  };

  return (
    <section id="intelligence" className="relative py-20 bg-white dark:bg-[#060A12] border-t border-slate-200 dark:border-slate-800/80 transition-colors">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-700 dark:text-cyan-400 mb-2.5">
              <Layers className="w-3.5 h-3.5" />
              <span>REAL-TIME TREASURY INTELLIGENCE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Multi-Currency Financial OS
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mt-1.5">
              Instant multi-currency balances, automated high-yield liquidity reserves, and institutional zero-spread FX routing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-slate-400 transition-all shadow-sm active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Export Audit Ledger</span>
            </button>
          </div>
        </div>

        {/* Multi-Currency Balances Bar */}
        <div className="mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5">
            Enterprise Liquidity Wallets (Select Currency)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {MULTI_CURRENCY_WALLETS.map((wallet) => {
              const isSelected = selectedWallet.code === wallet.code;

              return (
                <div
                  key={wallet.code}
                  onClick={() => setSelectedWallet(wallet)}
                  className={`p-3.5 rounded-lg cursor-pointer transition-all duration-200 border ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-emerald-500 shadow-sm dark:shadow-emerald-500/15 ring-1 ring-emerald-500'
                      : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-lg">{wallet.flag}</span>
                    <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-sm ${
                      wallet.dayChangePercent >= 0 
                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' 
                        : 'bg-rose-500/10 text-rose-700 dark:text-rose-400'
                    }`}>
                      {wallet.dayChangePercent >= 0 ? '+' : ''}{wallet.dayChangePercent}%
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                    {wallet.currency} ({wallet.code})
                  </span>
                  
                  <div className="text-sm font-bold text-slate-950 dark:text-white font-mono mt-0.5 truncate">
                    {wallet.symbol}{wallet.balance}
                  </div>

                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block mt-0.5">
                    ≈ {wallet.usdEquivalent}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Wallet Deep Dive Banner */}
        <div className="p-5 rounded-xl bg-gradient-to-r from-slate-50 via-emerald-50/30 to-slate-50 dark:from-slate-900 dark:via-[#0B1528] dark:to-slate-900 border border-slate-200 dark:border-white/10 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner">
              {selectedWallet.flag}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-950 dark:text-white font-mono">
                  {selectedWallet.symbol} {selectedWallet.balance}
                </h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  {selectedWallet.code} Active
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Yield: <strong className="text-emerald-600 dark:text-emerald-400">{selectedWallet.availableYield}</strong> • Reserve Backing: <span className="text-slate-700 dark:text-slate-300">{selectedWallet.reserveBacking}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block">USD Liquidity Peg</span>
              <span className="text-xs font-bold text-slate-950 dark:text-white font-mono">{selectedWallet.usdEquivalent}</span>
            </div>
            <button
              onClick={() => toast.success(`Automated yield compounding activated for ${selectedWallet.code}`)}
              className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-sm transition-all active:scale-95"
            >
              Rebalance Yield
            </button>
          </div>
        </div>

        {/* Charts & Interactive FX Routing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          
          {/* Real-Time Settlement Volume Chart (7 cols) */}
          <div className="lg:col-span-7 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 p-5 shadow-sm dark:shadow-xl flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Corridor Settlement Volume ($M)
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Hourly aggregated cross-border transaction throughput
                </span>
              </div>

              {/* Time Range Pills */}
              <div className="flex items-center p-0.5 rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                {(['24h', '7d', '30d', '1y'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeRange(t)}
                    className={`px-2 py-0.5 rounded-sm text-xs font-semibold uppercase font-mono transition-all ${
                      timeRange === t
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Area Graph */}
            <div className="w-full h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={VOLUME_CHART_DATA}>
                  <defs>
                    <linearGradient id="volumeGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="time" 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11} 
                    tickLine={false} 
                    tickFormatter={(v) => `$${v}M`} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0F172A', 
                      borderColor: '#334155', 
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '11px'
                    }} 
                    formatter={(val: any) => [`$${val} Million`, 'Volume']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#0EA5E9" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#volumeGlow)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3.5 border-t border-slate-200 dark:border-slate-800 text-xs font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">Peak TPS</span>
                <span className="font-bold text-slate-950 dark:text-white">26,500 TPS</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Avg Settlement</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">380ms</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Failure Rate</span>
                <span className="font-bold text-slate-950 dark:text-white">0.002%</span>
              </div>
            </div>
          </div>

          {/* Interactive Zero-Spread FX Corridor Calculator (5 cols) */}
          <div className="lg:col-span-5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 p-5 shadow-sm dark:shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Instant FX Corridor Engine
                </h3>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                  0% SPREAD
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                Institutional algorithmic pricing with direct central bank clearing routes.
              </p>

              {/* Source Input */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 mb-2">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                  <span>Send Amount</span>
                  <span>Balance: $4.85M</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={sourceAmount}
                    onChange={(e) => setSourceAmount(e.target.value)}
                    className="w-full bg-transparent text-lg font-bold text-slate-950 dark:text-white focus:outline-none font-mono"
                    placeholder="0.00"
                  />
                  <select
                    value={sourceCurr}
                    onChange={(e) => setSourceCurr(e.target.value)}
                    className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-xs font-bold font-mono focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="KES">KES (KSh)</option>
                    <option value="GHS">GHS (GH₵)</option>
                  </select>
                </div>
              </div>

              {/* Reverse Button */}
              <div className="flex justify-center -my-2 relative z-10">
                <button
                  onClick={() => {
                    const temp = sourceCurr;
                    setSourceCurr(targetCurr);
                    setTargetCurr(temp);
                  }}
                  className="w-7 h-7 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-emerald-500 transition-colors shadow-sm"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Target Output */}
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 mt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                  <span>Guaranteed Payout</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">1 {sourceCurr} = {currentRate.toFixed(2)} {targetCurr}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono truncate">
                    {convertedResult}
                  </div>
                  <select
                    value={targetCurr}
                    onChange={(e) => setTargetCurr(e.target.value)}
                    className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-md px-2 py-1 text-xs font-bold font-mono focus:outline-none"
                  >
                    <option value="NGN">NGN (₦)</option>
                    <option value="KES">KES (KSh)</option>
                    <option value="GHS">GHS (GH₵)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Conversion Details */}
            <div className="pt-4 mt-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Routing Rail:</span>
                <span className="text-slate-800 dark:text-slate-200 font-mono font-medium">NOVA Smart Order Router</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Settlement Guarantee:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">&lt; 380 Milliseconds</span>
              </div>
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Est. SWIFT Savings:</span>
                <span className="text-cyan-600 dark:text-cyan-300 font-mono font-bold">$1,280 vs Bank Wire</span>
              </div>

              <button
                onClick={() => toast.success(`Simulated FX settlement of ${sourceAmount} ${sourceCurr} to ${targetCurr} completed in 312ms!`)}
                className="w-full mt-2.5 py-2.5 rounded-md font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-sm active:scale-95 transition-all"
              >
                Execute Real-Time Corridor Swap
              </button>
            </div>
          </div>

        </div>

        {/* Filterable Financial Activity Ledger */}
        <div className="rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 p-5 shadow-sm dark:shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Enterprise Transaction Ledger
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live immutable record of settled high-velocity institutional transfers.
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by counterparty or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 w-52"
                />
              </div>

              <div className="flex items-center p-0.5 rounded-md bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-2 py-1 rounded-sm font-medium transition-all ${
                    statusFilter === 'all' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter('settled')}
                  className={`px-2 py-1 rounded-sm font-medium transition-all ${
                    statusFilter === 'settled' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Settled
                </button>
              </div>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-mono">
                  <th className="pb-2.5 font-medium">Time</th>
                  <th className="pb-2.5 font-medium">Corridor</th>
                  <th className="pb-2.5 font-medium">Sender</th>
                  <th className="pb-2.5 font-medium">Recipient</th>
                  <th className="pb-2.5 font-medium">Settled Amount</th>
                  <th className="pb-2.5 font-medium">FX Rate</th>
                  <th className="pb-2.5 font-medium">Savings vs SWIFT</th>
                  <th className="pb-2.5 font-medium text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                {filteredTransactions.map((tx) => (
                  <tr 
                    key={tx.id}
                    onClick={() => onSelectTransaction(tx)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 text-slate-500 dark:text-slate-400">{tx.timestamp}</td>
                    <td className="py-3 font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{tx.originFlag}</span>
                      <span>{tx.originCity}</span>
                      <span className="text-slate-400">→</span>
                      <span>{tx.destFlag}</span>
                      <span>{tx.destCity}</span>
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-sans">{tx.sender}</td>
                    <td className="py-3 text-slate-700 dark:text-slate-300 font-sans">{tx.recipient}</td>
                    <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">{tx.settledAmount}</td>
                    <td className="py-3 text-slate-500 dark:text-slate-400">{tx.fxRate}</td>
                    <td className="py-3 text-cyan-600 dark:text-cyan-300">{tx.feeSaved}</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded-sm text-[10px] font-bold bg-slate-100 hover:bg-emerald-50 dark:bg-slate-800 dark:hover:bg-emerald-500/20 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 transition-colors">
                        View Proof
                      </span>
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
