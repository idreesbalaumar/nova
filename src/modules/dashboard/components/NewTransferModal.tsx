import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@iconify/react';
import { cn } from '@/modules/shared/utils/cn';
import { Transaction } from '@/data/novaData';

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
}

const SOURCE_CURRENCIES: CurrencyOption[] = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸', rateToUsd: 1.0, balance: '$3,842,950.00' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rateToUsd: 1.28, balance: '£3,024,180.00' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', rateToUsd: 1.09, balance: '€2,650,400.00' },
  { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬', rateToUsd: 0.00065, balance: '₦5,912,230,000.00' },
];

const DEST_CURRENCIES = [
  { code: 'NGN', name: 'Nigerian Naira (NIBSS Instant)', flag: '🇳🇬', rateFromUsd: 1540.20, corridor: 'Lagos Gateway' },
  { code: 'KES', name: 'Kenya Shilling (M-Pesa / EAPS)', flag: '🇰🇪', rateFromUsd: 129.60, corridor: 'Nairobi Switch' },
  { code: 'GHS', name: 'Ghanaian Cedi (GhIPSS Instant)', flag: '🇬🇭', rateFromUsd: 15.20, corridor: 'Accra Pool' },
  { code: 'ZAR', name: 'South African Rand (SIRESS Real-time)', flag: '🇿🇦', rateFromUsd: 17.85, corridor: 'Johannesburg Hub' },
  { code: 'EGP', name: 'Egyptian Pound (InstaPay Rail)', flag: '🇪🇬', rateFromUsd: 48.60, corridor: 'Cairo North Rail' },
  { code: 'GBP', name: 'British Pound (Faster Payments / CHAPS)', flag: '🇬🇧', rateFromUsd: 0.78, corridor: 'London Conduit' },
];

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
  const [notes, setNotes] = useState('Q4 Pan-African Merchant Inventory Settlement');
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

  const handleAuthorize = () => {
    if (numericAmount <= 0) return;

    setIsProcessing(true);
    setSettlementStep('Routing through NOVA Smart Order Book...');

    setTimeout(() => {
      setSettlementStep('Locking liquidity across bilateral corridors (0.00% Spread)...');
    }, 250);

    setTimeout(() => {
      setSettlementStep('Generating Cryptographic Merkle State Root & Proof...');
    }, 500);

    setTimeout(() => {
      setIsProcessing(false);

      const effectiveRate = sourceOption.rateToUsd * destOption.rateFromUsd;
      const newTx: Transaction = {
        id: `tx-nv-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: 'Just now',
        sender: `Afrigate Commerce (${sourceCode} Treasury)`,
        recipient: `${beneficiaryName} (${destOption.name.split(' ')[0]})`,
        originCity: sourceOption.name.split(' ')[0],
        originFlag: sourceOption.flag,
        destCity: destOption.corridor,
        destFlag: destOption.flag,
        sourceCurrency: sourceCode,
        targetCurrency: destCode,
        sourceAmount: `${numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${sourceCode}`,
        targetAmount: `${convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${destCode}`,
        settledAmount: `${convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${destCode}`,
        settledCurrency: destCode,
        fxRate: `1 ${sourceCode} = ${effectiveRate.toFixed(2)} ${destCode}`,
        status: 'settled',
        latencyMs: 380,
        hash: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        feeSaved: `$${(numericAmount * 0.035).toFixed(2)} saved vs SWIFT`,
        route: [sourceOption.name.split(' ')[0], 'NOVA Zero-Spread Hub', destOption.corridor],
        merkleProof: `0x${Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}...`,
        complianceStatus: 'verified',
      };

      onSuccess(newTx, numericAmount, sourceCode);
      onClose();
    }, 850);
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      {/* Full-screen Backdrop covering header, footer and entire screen */}
      <div
        className="fixed inset-0 bg-slate-950/75 dark:bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => !isProcessing && onClose()}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
              <Icon icon="solar:card-send-bold-duotone" className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Initiate Instant Cross-Border Settlement
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sub-second monetary execution with 0.00% foreign exchange spread
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="py-4 space-y-4">
          {/* Source Currency & Available Balance */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Source Treasury Wallet
              </label>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                Avail: <strong className="text-emerald-600 dark:text-emerald-400">{sourceOption.balance}</strong>
              </span>
            </div>
            <div className="flex gap-2">
              <select
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                className="w-32 px-3 py-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              >
                {SOURCE_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <div className="relative flex-1">
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Destination Corridor & Computed Amount */}
          <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <Icon icon="solar:routing-2-bold" className="w-3.5 h-3.5 text-emerald-500" />
                <span>Destination Corridor & Payout</span>
              </label>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wider">
                Instant Settlement (0.38s)
              </span>
            </div>
            <div className="flex gap-2">
              <select
                value={destCode}
                onChange={(e) => setDestCode(e.target.value)}
                className="w-32 px-3 py-2 text-xs font-bold rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              >
                {DEST_CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <div className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-700/80 flex items-center justify-between">
                <span className="text-sm font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                  {destOption.code === 'NGN' ? '₦' : destOption.code === 'KES' ? 'KSh' : destOption.code === 'GHS' ? 'GH₵' : destOption.code === 'ZAR' ? 'R' : destOption.code === 'GBP' ? '£' : '$'}
                  {convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] font-mono text-slate-400 font-bold">
                  {destOption.code}
                </span>
              </div>
            </div>
            <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Mid-Market Rate: 1 {sourceCode} ≈ {(destOption.rateFromUsd / sourceOption.rateToUsd).toFixed(2)} {destCode}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Spread: 0.00%</span>
            </div>
          </div>

          {/* Beneficiary Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Beneficiary Name
              </label>
              <input
                type="text"
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                placeholder="e.g. Amina Adeyemi"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Account / Mobile Money Number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="0123456789"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
              />
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Settlement Rail / Bank Operator
              </label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. Access Bank PLC / M-Pesa B2B Switch"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Processing State or Submit */}
        {isProcessing ? (
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2 text-center animate-pulse">
            <div className="flex items-center justify-center gap-2 text-amber-400 text-xs font-bold">
              <Icon icon="solar:spinner-line-duotone" className="w-5 h-5 animate-spin" />
              <span>Cryptographic Settlement In Progress...</span>
            </div>
            <p className="text-[11px] text-slate-300 font-mono">{settlementStep}</p>
          </div>
        ) : (
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAuthorize}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Icon icon="solar:lock-bold" className="w-4 h-4" />
              <span>Authorize Instant Settlement</span>
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default NewTransferModal;
