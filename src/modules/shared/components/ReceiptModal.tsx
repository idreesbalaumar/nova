import React from 'react';
import { Transaction } from '@/data/novaData';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Copy, 
  Download, 
} from 'lucide-react';
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
        className="relative w-full max-w-lg rounded-xl bg-white dark:bg-[#080D1A] border border-slate-200 dark:border-white/10 shadow-2xl p-5 sm:p-7 overflow-hidden text-slate-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3.5">
          <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block">
              Consensus Finality Confirmed
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{transaction.id} • {transaction.timestamp}</span>
          </div>
        </div>

        {/* Settled Amount Card */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-center mb-5">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-0.5">Settled Net Payout</span>
          <div className="text-2xl font-extrabold text-slate-950 dark:text-white font-mono">
            {transaction.settledAmount}
          </div>
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5 inline-block">
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
            <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
                <Clock className="w-3.5 h-3.5" /> {transaction.latencyMs}ms
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 dark:text-slate-500 block text-[10px]">SWIFT Savings</span>
              <span className="font-bold text-cyan-700 dark:text-cyan-300 font-mono text-xs flex items-center gap-1 mt-0.5">
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
                className="p-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                title="Copy hash"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2.5">
          <button
            onClick={handleDownloadReceipt}
            className="flex-1 py-2 rounded-md font-bold text-xs text-slate-800 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Audit PDF</span>
          </button>
          
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-md font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
