import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/modules/shared/utils/cn';
import { RECENT_TRANSACTIONS, Transaction } from '@/data/novaData';
import { NewTransferModal } from './components/NewTransferModal';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export interface DashboardPageProps {
  user: {
    name: string;
    email: string;
    organization?: string;
    role?: string;
  };
  onSelectTransaction: (tx: Transaction) => void;
  onOpenSandbox?: () => void;
}

// Chart dataset with 7 days & 24h data points
const CHART_DATA_24H = [
  { time: '00:00', inflow: 28400, outflow: 12200 },
  { time: '03:00', inflow: 19800, outflow: 8500 },
  { time: '06:00', inflow: 42100, outflow: 18400 },
  { time: '09:00', inflow: 98500, outflow: 34200 },
  { time: '12:00', inflow: 145000, outflow: 62400 },
  { time: '15:00', inflow: 172000, outflow: 81500 },
  { time: '18:00', inflow: 189400, outflow: 54200 },
  { time: '21:00', inflow: 147400, outflow: 47000 },
];

const CHART_DATA_7D = [
  { time: 'Mon', inflow: 480000, outflow: 192000 },
  { time: 'Tue', inflow: 590000, outflow: 240000 },
  { time: 'Wed', inflow: 710000, outflow: 310000 },
  { time: 'Thu', inflow: 840000, outflow: 320000 },
  { time: 'Fri', inflow: 980000, outflow: 410000 },
  { time: 'Sat', inflow: 620000, outflow: 180000 },
  { time: 'Sun', inflow: 540000, outflow: 150000 },
];

const CHART_DATA_30D = [
  { time: 'Week 1', inflow: 2450000, outflow: 980000 },
  { time: 'Week 2', inflow: 3100000, outflow: 1240000 },
  { time: 'Week 3', inflow: 3840000, outflow: 1560000 },
  { time: 'Week 4', inflow: 4620000, outflow: 1840000 },
];

type Timeframe = '24h' | '7d' | '30d';

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  onSelectTransaction,
  onOpenSandbox,
}) => {
  const [now, setNow] = useState(new Date());
  const [timeframe, setTimeframe] = useState<Timeframe>('7d');
  const [activeCurrencyIndex, setActiveCurrencyIndex] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>(RECENT_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [txFilter, setTxFilter] = useState<'all' | 'inflow' | 'outflow' | 'swap'>('all');
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  // Balances
  const [usdBalance, setUsdBalance] = useState(3842950);
  const [todayInflow, setTodayInflow] = useState(842600);
  const [todayOutflow, setTodayOutflow] = useState(318450);

  // Live timer for welcome banner clock (matching Trackforte Franchise)
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = now.getHours();
  const isDaytime = hour >= 6 && hour < 19;

  // Multi-Currency Balance Display Converter
  const CURRENCY_BALANCES = useMemo(
    () => [
      { code: 'USD', symbol: '$', amount: usdBalance, label: 'US Dollar', flag: '🇺🇸' },
      { code: 'NGN', symbol: '₦', amount: usdBalance * 1540.2, label: 'Nigerian Naira', flag: '🇳🇬' },
      { code: 'KES', symbol: 'KSh', amount: usdBalance * 129.6, label: 'Kenyan Shilling', flag: '🇰🇪' },
      { code: 'GHS', symbol: 'GH₵', amount: usdBalance * 15.2, label: 'Ghanaian Cedi', flag: '🇬🇭' },
      { code: 'ZAR', symbol: 'R', amount: usdBalance * 17.85, label: 'South African Rand', flag: '🇿🇦' },
      { code: 'GBP', symbol: '£', amount: usdBalance * 0.78, label: 'British Pound', flag: '🇬🇧' },
    ],
    [usdBalance]
  );

  const activeCurrency = CURRENCY_BALANCES[activeCurrencyIndex];

  // Handle transfer success
  const handleTransferSuccess = (newTx: Transaction, numericAmount: number, sourceCurrency: string) => {
    setTransactions((prev) => [newTx, ...prev]);
    // Deduct amount
    if (sourceCurrency === 'USD') {
      setUsdBalance((prev) => prev - numericAmount);
    } else {
      setUsdBalance((prev) => prev - numericAmount * 0.00065);
    }
    setTodayOutflow((prev) => prev + numericAmount);
    onSelectTransaction(newTx);
  };

  // Filtered transactions
  const filteredTransactions = transactions.filter((tx) => {
    const destCurr = tx.targetCurrency || tx.settledCurrency || '';
    const matchesSearch =
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sourceCurrency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destCurr.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (txFilter === 'inflow') {
      return destCurr === 'NGN' || destCurr === 'KES';
    }
    if (txFilter === 'outflow') {
      return tx.sourceCurrency === 'USD' || tx.sourceCurrency === 'GBP';
    }
    if (txFilter === 'swap') {
      return tx.sourceCurrency !== destCurr;
    }
    return true;
  });

  const chartData =
    timeframe === '24h' ? CHART_DATA_24H : timeframe === '7d' ? CHART_DATA_7D : CHART_DATA_30D;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 font-sans pb-12">
      {/* ── 1. Welcome Banner (Directly styled after Trackforte Franchise) ── */}
      <div
        id="welcome-banner"
        className="relative rounded-2xl overflow-hidden shadow-xl border border-amber-900/10 dark:border-white/10"
      >
        <div className="relative px-5 sm:px-7 py-6 sm:py-8 bg-gradient-to-br from-[#070D18] via-[#0D1829] to-[#0A1220] text-white overflow-hidden">
          {/* Subtle Geometric Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Radial Warm Glow Accent */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-semibold text-amber-300 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>All Systems Operational • 28ms Avg Mesh Latency</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Welcome back, {user.name} 👋🏾
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-300/80 mt-1 leading-relaxed max-w-xl">
                {user.organization || 'Afrigate Commerce'} • Pan-African Treasury & Liquidity Operating Console
              </p>
            </div>

            {/* Live Clock with Day/Night Indicator (Trackforte Signature) */}
            <div className="hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 whitespace-nowrap flex-shrink-0">
              <div className="flex items-center gap-2">
                <Icon
                  icon={isDaytime ? 'solar:sun-2-bold-duotone' : 'solar:moon-bold-duotone'}
                  className={cn('w-4 h-4', isDaytime ? 'text-amber-300' : 'text-indigo-300')}
                />
                <span className="text-sm font-bold text-white tracking-tight font-mono tabular-nums">
                  {now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true,
                  })}
                </span>
              </div>
              <span className="w-px h-4 bg-white/15" />
              <span className="text-xs font-medium text-white/70">
                {now.toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Financial Metrics & Balance Grid ── */}
      <div id="stats-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Multi-Currency Balance */}
        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Icon icon="solar:wallet-money-bold-duotone" className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
              <Icon icon="solar:arrow-right-up-linear" className="w-3 h-3" />
              +18.4%
            </span>
          </div>

          <div className="mt-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Treasury Balance
            </p>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight font-mono tabular-nums">
              {activeCurrency.symbol}
              {activeCurrency.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>

          {/* Quick Currency Switcher Pills */}
          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            {CURRENCY_BALANCES.map((c, i) => (
              <button
                key={c.code}
                onClick={() => setActiveCurrencyIndex(i)}
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-bold font-mono transition-colors cursor-pointer',
                  activeCurrencyIndex === i
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                )}
                title={`Switch display to ${c.label}`}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>

        {/* Card 2: 24h Revenue / Inflows */}
        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Icon icon="solar:card-receive-bold-duotone" className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
              <Icon icon="solar:arrow-right-up-linear" className="w-3 h-3" />
              +24.2%
            </span>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              24h Inflow / Settlements
            </p>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight font-mono tabular-nums">
              ${todayInflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              1,284 incoming merchant settlements
            </p>
          </div>
        </div>

        {/* Card 3: 24h Disbursements / Outflows */}
        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
              <Icon icon="solar:card-send-bold-duotone" className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono">
              0.38s avg
            </span>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              24h Outflow / Payouts
            </p>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight font-mono tabular-nums">
              ${todayOutflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Sub-second mobile money & bank delivery
            </p>
          </div>
        </div>

        {/* Card 4: Spread Savings */}
        <div className="bg-white dark:bg-slate-900/90 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all">
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Icon icon="solar:shield-check-bold-duotone" className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
              0.00% Spread
            </span>
          </div>
          <div className="mt-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              FX Spread Savings (Month)
            </p>
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight font-mono tabular-nums">
              $42,180.00
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Saved vs traditional correspondent banks
            </p>
          </div>
        </div>
      </div>

      {/* ── 3. Charts & Visualizations Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Revenue & Outflow Trends */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-emerald-500" />
                Revenue & Outflow Velocity
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time settlement throughput across all bilateral African corridors
              </p>
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
              {(['24h', '7d', '30d'] as Timeframe[]).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={cn(
                    'px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                    timeframe === tf
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                  )}
                >
                  {tf === '24h' ? '24 Hours' : tf === '7d' ? '7 Days' : '30 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Area Chart */}
          <div className="h-64 sm:h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickLine={false}
                  tickFormatter={(val) => `$${val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : `${val / 1000}k`}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs font-mono space-y-1 border border-slate-700">
                          <p className="font-bold text-slate-300">{label}</p>
                          <p className="text-emerald-400">
                            Inflow: ${(payload[0].value as number)?.toLocaleString()}
                          </p>
                          <p className="text-amber-400">
                            Outflow: ${(payload[1].value as number)?.toLocaleString()}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="inflow"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#inflowGrad)"
                  name="Inflow"
                />
                <Area
                  type="monotone"
                  dataKey="outflow"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#outflowGrad)"
                  name="Outflow"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-semibold">
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              Settlement Inflows (+Credits)
            </span>
            <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              Merchant Payouts (-Disbursals)
            </span>
          </div>
        </div>

        {/* Side Card: Corridor Liquidity Distribution */}
        <div className="bg-white dark:bg-slate-900/90 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-1.5 h-4 rounded-full bg-amber-500" />
                Active Corridors Share
              </h3>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                100% Uptime
              </span>
            </div>

            <div className="space-y-3.5 mt-4">
              {[
                { name: 'Lagos ⇄ London', share: 38, amount: '$1.75M', color: 'bg-emerald-500', flag: '🇳🇬 ⇄ 🇬🇧' },
                { name: 'Lagos ⇄ Nairobi', share: 27, amount: '$1.24M', color: 'bg-cyan-500', flag: '🇳🇬 ⇄ 🇰🇪' },
                { name: 'Accra ⇄ Lagos', share: 19, amount: '$870k', color: 'bg-amber-500', flag: '🇬🇭 ⇄ 🇳🇬' },
                { name: 'Nairobi ⇄ Johannesburg', share: 16, amount: '$760k', color: 'bg-violet-500', flag: '🇰🇪 ⇄ 🇿🇦' },
              ].map((corridor) => (
                <div key={corridor.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <span className="text-xs">{corridor.flag}</span>
                      <span>{corridor.name}</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {corridor.amount} ({corridor.share}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full', corridor.color)} style={{ width: `${corridor.share}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setTransferModalOpen(true)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Icon icon="solar:routing-2-bold" className="w-4 h-4 text-amber-500" />
              <span>Configure Corridors</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 4. Main Activity & Insights Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Financial Transactions Table (2 Cols) */}
        <div id="recent-orders-card" className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-1.5 h-5 bg-gradient-to-b from-amber-500 to-emerald-600 rounded-full" />
              Financial Activity Stream
            </h2>

            {/* Filter Tabs matching Trackforte */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              {(['all', 'inflow', 'outflow', 'swap'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTxFilter(tab)}
                  className={cn(
                    'px-2.5 py-1 rounded-lg font-bold capitalize transition-colors cursor-pointer',
                    txFilter === tab
                      ? 'bg-amber-500 text-white shadow-2xs'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                  )}
                >
                  {tab === 'all' ? 'All' : tab === 'inflow' ? 'Credits' : tab === 'outflow' ? 'Debits' : 'Swaps'}
                </button>
              ))}
            </div>
          </div>

          {/* Transactions Table Card */}
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            {/* Search Input Bar */}
            <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Icon icon="solar:magnifer-linear" className="w-4 h-4 text-slate-400 ml-2" />
              <input
                type="text"
                placeholder="Search transaction by ID, counterparty, currency..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800">
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Ref ID
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Corridor & Merchant
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Latency & Route
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                    <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-xs">
                  {filteredTransactions.slice(0, 7).map((tx) => (
                    <tr
                      key={tx.id}
                      onClick={() => onSelectTransaction(tx)}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                    >
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-amber-700 dark:text-amber-400 group-hover:underline">
                          {tx.id.toUpperCase()}
                        </span>
                        <p className="text-[10px] text-slate-400 font-sans mt-0.5">{tx.timestamp}</p>
                      </td>

                      <td className="px-5 py-3.5 font-sans min-w-[180px]">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                          {tx.recipient}
                        </p>
                        <p className="text-[10px] text-slate-400 line-clamp-1">
                          From: {tx.sender}
                        </p>
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <Icon icon="solar:stopwatch-bold" className="w-3 h-3" />
                          {tx.latencyMs}ms
                        </span>
                        <p className="text-[10px] text-slate-400 font-sans line-clamp-1">
                          {tx.sourceCurrency} ➔ {tx.targetCurrency || tx.settledCurrency}
                        </p>
                      </td>

                      <td className="px-5 py-3.5 font-sans">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                          <Icon icon="solar:check-circle-bold" className="w-3 h-3" />
                          Settled
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-right font-mono font-bold">
                        <p className="text-slate-900 dark:text-white">
                          {tx.targetAmount || tx.settledAmount} {tx.targetCurrency || tx.settledCurrency}
                        </p>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ({tx.sourceAmount})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {Math.min(7, filteredTransactions.length)} of {filteredTransactions.length} recorded settlements</span>
              <button
                onClick={() => onSelectTransaction(transactions[0])}
                className="font-bold text-amber-600 hover:text-amber-700 dark:text-amber-400 cursor-pointer"
              >
                Inspect Sample Receipt →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Quick CTA, Insights & Quick Links (Matching Trackforte Franchise) */}
        <div className="space-y-6">
          {/* Quick Settlement CTA Card (Matching Trackforte's "Need more items? Create order" card) */}
          <div
            id="create-order-cta"
            className="p-6 rounded-2xl text-white shadow-xl shadow-amber-900/10 relative overflow-hidden group bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-600"
          >
            <Icon
              icon="solar:card-send-bold-duotone"
              className="absolute -bottom-6 -right-6 w-32 h-32 opacity-15 group-hover:scale-110 transition-transform"
            />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold mb-3">
              <Icon icon="solar:bolt-bold" className="w-3 h-3 text-amber-200" />
              Sub-second Corridor Delivery
            </span>
            <h3 className="text-lg font-bold mb-1 tracking-tight">
              Initiate Instant Transfer
            </h3>
            <p className="text-white/90 text-xs mb-5 leading-relaxed">
              Disburse cross-border payouts or settle merchant invoices with zero spread across Africa.
            </p>
            <button
              onClick={() => setTransferModalOpen(true)}
              className="bg-white text-slate-900 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Icon icon="solar:add-circle-bold" className="w-4 h-4 text-amber-600" />
              <span>New Settlement</span>
            </button>
          </div>

          {/* Useful Financial Insights Card (NOVA AI Engine) */}
          <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Icon icon="solar:stars-bold-duotone" className="w-4 h-4 text-amber-500" />
                <span>Useful Financial Insights</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                AI Copilot Active
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
                  <Icon icon="solar:chart-square-bold" className="w-3.5 h-3.5 text-amber-600" />
                  <span>High-Velocity Rate Opportunity</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  GBP/NGN mid-market rate is currently at a 30-day clearing peak. Auto-swap suggested for London receipts to capture optimum naira liquidity.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300">
                  <Icon icon="solar:routing-2-bold" className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero-Spread Bilateral Route</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  94.2% of your settlements today routed via direct bilateral rails, bypassing standard correspondent banking fees and saving $1,420.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                  <Icon icon="solar:document-text-bold" className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Statutory Compliance Attached</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  CBN Form A and Kenya Revenue Authority e-invoicing declarations are automatically archived and cryptographically stamped.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links Card (Directly from Trackforte Franchise) */}
          <div id="quick-links-card" className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="px-5 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Quick Shortcuts
              </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              <button
                onClick={() => setTransferModalOpen(true)}
                className="flex w-full items-center gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
              >
                <div className="h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                  <Icon icon="solar:card-send-bold-duotone" className="w-4 h-4" />
                </div>
                <span className="flex-1 text-left text-xs font-bold text-slate-800 dark:text-white">
                  Send Cross-Border Transfer
                </span>
                <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveCurrencyIndex((prev) => (prev + 1) % CURRENCY_BALANCES.length)}
                className="flex w-full items-center gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
              >
                <div className="h-8 w-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                  <Icon icon="solar:refresh-circle-bold-duotone" className="w-4 h-4" />
                </div>
                <span className="flex-1 text-left text-xs font-bold text-slate-800 dark:text-white">
                  Cycle Multi-Currency Display
                </span>
                <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('recent-orders-card');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex w-full items-center gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
              >
                <div className="h-8 w-8 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 flex items-center justify-center shrink-0 text-cyan-600 dark:text-cyan-400">
                  <Icon icon="solar:document-text-bold-duotone" className="w-4 h-4" />
                </div>
                <span className="flex-1 text-left text-xs font-bold text-slate-800 dark:text-white">
                  Audit & Merkle Proofs
                </span>
                <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {onOpenSandbox && (
                <button
                  onClick={onOpenSandbox}
                  className="flex w-full items-center gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-lg bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center shrink-0 text-violet-600 dark:text-violet-400">
                    <Icon icon="solar:code-square-bold-duotone" className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left text-xs font-bold text-slate-800 dark:text-white">
                    Developer Sandbox Console
                  </span>
                  <Icon icon="solar:alt-arrow-right-linear" className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. Interactive Transfer Modal ── */}
      <NewTransferModal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        onSuccess={handleTransferSuccess}
      />
    </div>
  );
};

export default DashboardPage;
