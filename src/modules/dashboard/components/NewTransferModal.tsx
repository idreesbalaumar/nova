import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { cn } from '@/modules/shared/utils/cn';
import { Transaction } from '@/data/novaData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface NewTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newTx: Transaction, amountNum: number, sourceCurrency: string) => void;
}

interface CurrencyOption {
  code: string;
  name: string;
  flag: string;
  rateToUsd: number;
  balance: string;
  numericBalance: number;
}

const SOURCE_CURRENCIES: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', rateToUsd: 1.0, balance: '$3,842,950.00', numericBalance: 3842950 },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rateToUsd: 1.28, balance: '£3,024,180.00', numericBalance: 3024180 },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', rateToUsd: 1.09, balance: '€2,650,400.00', numericBalance: 2650400 },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', rateToUsd: 0.00065, balance: '₦5,912,230,000.00', numericBalance: 5912230000 },
];

const DEST_CURRENCIES = [
  { code: 'NGN', name: 'Nigerian Naira', rail: 'NIBSS Instant', flag: '🇳🇬', rateFromUsd: 1540.20, corridor: 'Lagos Gateway' },
  { code: 'KES', name: 'Kenya Shilling', rail: 'M-Pesa / EAPS', flag: '🇰🇪', rateFromUsd: 129.60, corridor: 'Nairobi Switch' },
  { code: 'GHS', name: 'Ghanaian Cedi', rail: 'GhIPSS Instant', flag: '🇬🇭', rateFromUsd: 15.20, corridor: 'Accra Pool' },
  { code: 'ZAR', name: 'South African Rand', rail: 'SIRESS Real-time', flag: '🇿🇦', rateFromUsd: 17.85, corridor: 'Johannesburg Hub' },
  { code: 'EGP', name: 'Egyptian Pound', rail: 'InstaPay Rail', flag: '🇪🇬', rateFromUsd: 48.60, corridor: 'Cairo North Rail' },
  { code: 'GBP', name: 'British Pound', rail: 'Faster Payments', flag: '🇬🇧', rateFromUsd: 0.78, corridor: 'London Conduit' },
];

const QUICK_AMOUNTS = [5000, 25000, 50000, 100000];

export const NewTransferModal: React.FC<NewTransferModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [sourceCode, setSourceCode] = useState('USD');
  const [destCode, setDestCode] = useState('NGN');
  const [amount, setAmount] = useState('25000');
  const [beneficiaryName, setBeneficiaryName] = useState('Amina Adeyemi');
  const [accountNumber, setAccountNumber] = useState('0123984572');
  const [bankName, setBankName] = useState('Access Bank PLC');
  const [notes, setNotes] = useState('Pan-African Commercial Settlement');
  const [isProcessing, setIsProcessing] = useState(false);
  const [settlementStep, setSettlementStep] = useState<string>('');

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isProcessing) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isProcessing, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const sourceOption = SOURCE_CURRENCIES.find((c) => c.code === sourceCode) || SOURCE_CURRENCIES[0];
  const destOption = DEST_CURRENCIES.find((c) => c.code === destCode) || DEST_CURRENCIES[0];

  const numericAmount = parseFloat(amount) || 0;
  // Compute conversion
  const amountInUsd = numericAmount * sourceOption.rateToUsd;
  const convertedAmount = amountInUsd * destOption.rateFromUsd;
  const effectiveRate = destOption.rateFromUsd / sourceOption.rateToUsd;
  const swiftSavings = (amountInUsd * 0.035).toFixed(2);

  const getCurrencySymbol = (code: string) => {
    switch (code) {
      case 'NGN': return '₦';
      case 'KES': return 'KSh ';
      case 'GHS': return 'GH₵ ';
      case 'ZAR': return 'R ';
      case 'EGP': return 'E£ ';
      case 'GBP': return '£';
      case 'EUR': return '€';
      case 'USD':
      default: return '$';
    }
  };

  const handleAuthorize = () => {
    if (numericAmount <= 0) return;

    setIsProcessing(true);
    setSettlementStep('Routing through NOVA Smart Order Book...');

    setTimeout(() => {
      setSettlementStep('Locking liquidity across bilateral corridors (0.00% FX Spread)...');
    }, 280);

    setTimeout(() => {
      setSettlementStep('Generating Cryptographic Merkle State Root & Proof...');
    }, 560);

    setTimeout(() => {
      setIsProcessing(false);

      const newTx: Transaction = {
        id: `tx-nv-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: 'Just now',
        sender: `Afrigate Commerce (${sourceCode} Treasury)`,
        recipient: `${beneficiaryName} (${destOption.name})`,
        originCity: sourceOption.name.split(' ')[0],
        originFlag: sourceOption.flag,
        destCity: destOption.corridor,
        destFlag: destOption.flag,
        sourceCurrency: sourceCode,
        targetCurrency: destCode,
        sourceAmount: `${numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${sourceCode}`,
        targetAmount: `${convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${destCode}`,
        settledAmount: `${getCurrencySymbol(destCode)}${convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        settledCurrency: destCode,
        fxRate: `1 ${sourceCode} = ${effectiveRate.toFixed(2)} ${destCode}`,
        status: 'settled',
        latencyMs: 380,
        hash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        feeSaved: `$${swiftSavings} saved vs SWIFT`,
        route: [sourceOption.name.split(' ')[0], 'NOVA Zero-Spread Hub', destOption.corridor],
        merkleProof: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}...`,
        complianceStatus: 'verified',
      };

      onSuccess(newTx, numericAmount, sourceCode);
      onClose();
    }, 850);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
      {/* Full-screen Backdrop covering header, footer and entire screen */}
      <div
        className="fixed inset-0 bg-slate-950/75 dark:bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => !isProcessing && onClose()}
        aria-hidden="true"
      />

      {/* Wide Dialog Container with Trackforte Force-Password-Change signature look and feel */}
      <div
        className="relative z-10 w-[94%] sm:w-[92%] md:max-w-3xl lg:max-w-4xl max-h-[92dvh] rounded-[28px] bg-white dark:bg-slate-950 overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-slate-200/80 dark:border-slate-800/80 flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar (Trackforte signature style with NOVA amber-to-emerald gradient) */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-emerald-500 shrink-0" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 sm:pb-5 border-b border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-4 shrink-0">
          <div className="flex items-start gap-4">
            {/* Elevated Icon with glow ring (Trackforte signature style) */}
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 ring-1 ring-amber-200/60 dark:ring-amber-500/20 shadow-[0_8px_30px_-6px_rgba(217,119,6,0.15)] shrink-0">
              <Icon
                icon="solar:card-send-bold-duotone"
                width="28"
                height="28"
                className="text-amber-500 dark:text-amber-400"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Initiate Instant Cross-Border Settlement
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  0.38s Sub-Second SLA
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                Sub-second monetary execution across bilateral pan-African corridors with guaranteed 0.00% FX spread and cryptographic consensus proof.
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="h-9 w-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Responsive 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* ── LEFT COLUMN (lg:col-span-7): Source & Corridor Configuration ── */}
            <div className="lg:col-span-7 space-y-4">
              {/* Card 1: Source Treasury Wallet & Amount Input */}
              <div className="rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Icon icon="solar:wallet-money-bold-duotone" className="w-4 h-4 text-amber-500" />
                    <span>Source Treasury Wallet</span>
                  </label>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Avail: <strong className="text-emerald-600 dark:text-emerald-400">{sourceOption.balance}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                  <div className="sm:col-span-5">
                    <Select value={sourceCode} onValueChange={setSourceCode}>
                      <SelectTrigger className="h-11 rounded-xl bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 font-bold text-xs sm:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[150] rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                        {SOURCE_CURRENCIES.map((c) => (
                          <SelectItem key={c.code} value={c.code} className="cursor-pointer">
                            <span className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span className="font-bold">{c.code}</span>
                              <span className="text-slate-400 text-xs">({c.name})</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="sm:col-span-7 relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold text-sm">
                      {getCurrencySymbol(sourceCode)}
                    </div>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full h-11 pl-8 pr-3.5 text-sm font-mono font-bold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 shadow-2xs"
                    />
                  </div>
                </div>

                {/* Quick Preset Pills */}
                <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold mr-1">Quick:</span>
                  {QUICK_AMOUNTS.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val.toString())}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-all border cursor-pointer",
                        numericAmount === val
                          ? "bg-amber-500 text-white border-amber-500 shadow-xs"
                          : "bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-400"
                      )}
                    >
                      +{val >= 1000 ? `${val / 1000}k` : val}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAmount('100000')}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 transition-colors cursor-pointer ml-auto"
                  >
                    Max Allocation
                  </button>
                </div>
              </div>

              {/* Card 2: Destination Corridor & Payout (Trackforte Info Card signature) */}
              <div className="rounded-2xl bg-amber-50/80 dark:bg-amber-500/[0.06] border border-amber-200/60 dark:border-amber-500/15 p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <Icon icon="solar:routing-2-bold-duotone" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Destination Corridor & Settlement Rail</span>
                  </label>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    0.00% Zero-Spread SLA
                  </span>
                </div>

                <Select value={destCode} onValueChange={setDestCode}>
                  <SelectTrigger className="h-11 rounded-xl bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-700/80 font-bold text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[150] rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    {DEST_CURRENCIES.map((c) => (
                      <SelectItem key={c.code} value={c.code} className="cursor-pointer">
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span className="font-bold">{c.code}</span>
                          <span className="text-slate-500 dark:text-slate-400 text-xs">
                            — {c.name} ({c.rail})
                          </span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Big Payout Box */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-300/80 dark:border-amber-700/50 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Estimated Net Payout
                    </span>
                    <div className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                      {getCurrencySymbol(destCode)}
                      {convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block">
                      {destOption.corridor}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-end gap-1">
                      <Icon icon="solar:check-circle-bold" className="w-3 h-3" />
                      Instant Route
                    </span>
                  </div>
                </div>

                {/* Rates & Telemetry */}
                <div className="pt-1 text-[11px] text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Icon icon="solar:round-transfer-vertical-bold" className="w-3.5 h-3.5 text-amber-500" />
                    <span>Mid-Market: 1 {sourceCode} ≈ {effectiveRate.toFixed(2)} {destCode}</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md inline-block w-fit">
                    Est. ${swiftSavings} saved vs SWIFT
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN (lg:col-span-5): Beneficiary & Assurance Box ── */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Card 3: Beneficiary Details */}
              <div className="rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Icon icon="solar:user-id-bold-duotone" className="w-4 h-4 text-amber-500" />
                    <span>Beneficiary Credentials</span>
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">KYB Verified</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600 dark:text-slate-400">
                      Beneficiary Legal / Entity Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={beneficiaryName}
                        onChange={(e) => setBeneficiaryName(e.target.value)}
                        placeholder="e.g. Amina Adeyemi"
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600 dark:text-slate-400">
                      Account / Mobile Money Identifier
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="0123984572"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-600 dark:text-slate-400">
                      Settlement Rail / Bank Operator
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. Access Bank PLC / M-Pesa Switch"
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Card 4: Info Card (Exact Trackforte Info Card Pattern) */}
              <div className="rounded-2xl bg-amber-50/80 dark:bg-amber-500/[0.06] border border-amber-200/60 dark:border-amber-500/15 px-4 py-3.5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-500/15">
                    <Icon
                      icon="solar:shield-check-bold"
                      width="18"
                      className="text-amber-600 dark:text-amber-400"
                    />
                  </div>
                  <div className="space-y-1 text-[13px]">
                    <p className="font-semibold text-amber-800 dark:text-amber-300">
                      Cryptographic Assurance
                    </p>
                    <p className="text-amber-700/80 dark:text-amber-400/70 text-xs leading-relaxed">
                      Executed directly against bilateral liquidity pools. No correspondent banking delays, no hidden spread, and verified by Merkle root proof.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Bar (Trackforte style button & prompt) */}
        <div className="p-5 sm:p-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 shrink-0 bg-white dark:bg-slate-950">
          {isProcessing ? (
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 text-center animate-pulse">
              <div className="flex items-center justify-center gap-2 text-amber-400 text-xs sm:text-sm font-bold">
                <Icon icon="solar:spinner-line-duotone" className="w-5 h-5 animate-spin" />
                <span>Cryptographic Settlement In Progress...</span>
              </div>
              <p className="text-xs text-slate-300 font-mono">{settlementStep}</p>
            </div>
          ) : (
            <div>
              <div className="flex flex-col-reverse sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto h-12 px-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAuthorize}
                  className="w-full sm:flex-1 h-12 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-semibold text-sm sm:text-[15px] shadow-[0_4px_20px_-6px_rgba(217,119,6,0.5)] transition-all hover:shadow-[0_6px_24px_-6px_rgba(217,119,6,0.7)] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Icon icon="solar:lock-bold" className="w-4 h-4" />
                  <span>Authorize Instant Settlement ({getCurrencySymbol(sourceCode)}{numericAmount.toLocaleString()})</span>
                </button>
              </div>
              <p className="mt-3 text-center text-[12px] text-slate-400 dark:text-slate-500">
                Atomic settlement instruction broadcasted directly to NOVA bilateral liquidity pools
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default NewTransferModal;
