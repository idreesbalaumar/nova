import React from 'react';
import { Transaction } from '@/data/novaData';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

interface ReceiptModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(transaction.hash);
    toast.success('Transaction Hash Copied');
  };

  const handleDownloadReceipt = () => {
    toast.success('Receipt Downloaded', {
      description: `Cryptographic audit receipt for ${transaction.id} saved.`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg rounded-xl bg-[#FFFDF9] dark:bg-[#080D1A] border border-amber-500/20 dark:border-white/10 shadow-2xl p-5 sm:p-7 overflow-hidden text-slate-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 blur-[90px] rounded-full pointer-events-none" />

        {/* Close Button with Iconify */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-slate-600 dark:text-slate-400 hover:text-amber-800 dark:hover:text-white transition-colors cursor-pointer"
        >
          <Icon icon="solar:close-circle-bold" className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3.5">
          <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <Icon icon="solar:check-circle-bold" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block">
              Consensus Finality Confirmed
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{transaction.id} • {transaction.timestamp}</span>
          </div>
        </div>

        {/* Settled Amount Card */}
        <div className="p-3.5 rounded-lg bg-amber-500/5 dark:bg-slate-900/90 border border-amber-500/20 dark:border-slate-800 text-center mb-5">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Settled Net Payout</span>
          <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono">
            {transaction.settledAmount}
          </div>
          <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold mt-0.5 inline-block">
            Converted from {transaction.sourceAmount} ({transaction.fxRate})
          </span>
        </div>

        {/* Corridor Movement Details */}
        <div className="space-y-2.5 py-1 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Origin Node</span>
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                <span>{transaction.originFlag}</span>
                <span>{transaction.originCity} Hub</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] block">{transaction.sender}</span>
            </div>
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <div className="text-right">
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Settled Destination</span>
              <span className="font-bold text-slate-900 dark:text-white flex items-center justify-end gap-1.5 mt-0.5">
                <span>{transaction.destFlag}</span>
                <span>{transaction.destCity} Hub</span>
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-[11px] block">{transaction.recipient}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Clearing Latency</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-xs flex items-center gap-1 mt-0.5">
                <Icon icon="solar:clock-circle-bold" className="w-3.5 h-3.5" /> {transaction.latencyMs}ms
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">SWIFT Savings</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 font-mono text-xs flex items-center gap-1 mt-0.5">
                {transaction.feeSaved}
              </span>
            </div>
          </div>

          {/* Cryptographic Proof Hash */}
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 dark:text-slate-500 block text-[10px] mb-0.5">Merkle Proof Hash (SHA-256)</span>
            <div className="flex items-center justify-between gap-2">
              <code className="text-[11px] font-mono text-slate-700 dark:text-slate-300 break-all">
                {transaction.hash}99ef1a80c29b47128e
              </code>
              <button
                onClick={handleCopyHash}
                className="p-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                title="Copy hash"
              >
                <Icon icon="solar:copy-bold" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2.5">
          <button
            onClick={handleDownloadReceipt}
            className="flex-1 py-2 rounded-md font-bold text-xs text-slate-800 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 cursor-pointer"
          >
            <Icon icon="solar:download-minimalistic-bold" className="w-3.5 h-3.5" />
            <span>Download Audit PDF</span>
          </button>
          
          <button
            onClick={onClose}
            className="py-2 px-6 rounded-md font-bold text-xs text-white bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 transition-all cursor-pointer shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
