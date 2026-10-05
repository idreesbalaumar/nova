import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

interface SandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SandboxModal: React.FC<SandboxModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [endpoint, setEndpoint] = useState<'create_settlement' | 'check_liquidity' | 'simulate_ai_hedge'>('create_settlement');
  const [currency, setCurrency] = useState('GBP');
  const [targetCurrency, setTargetCurrency] = useState('NGN');
  const [amount, setAmount] = useState('150000');
  const [isRunning, setIsRunning] = useState(false);
  const [responseOutput, setResponseOutput] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleRunRequest = () => {
    setIsRunning(true);
    setResponseOutput(null);

    setTimeout(() => {
      setIsRunning(false);

      if (endpoint === 'create_settlement') {
        setResponseOutput({
          status: 'SUCCESS_FINALIZED',
          statusCode: 200,
          settlementId: `stl_${Math.random().toString(36).substring(2, 10)}`,
          corridor: `${currency} → ${targetCurrency}`,
          sourceAmount: `${amount} ${currency}`,
          settledAmount: `${(parseFloat(amount) * 1942).toLocaleString()} ${targetCurrency}`,
          routingMethod: 'NOVA_ZERO_SPREAD_SMART_ROUTER',
          consensusProof: {
            bftBlock: 9824103,
            merkleRoot: '0x8f2a9c33...81e2',
            validatorSignatures: 12,
            mpcThreshold: '3-of-5 Validated',
          },
          telemetry: {
            latencyMs: 342,
            feeChargedUsd: 1.20,
            estimatedSwiftSavingsUsd: 2840.00,
          },
          timestamp: new Date().toISOString(),
        });
      } else if (endpoint === 'check_liquidity') {
        setResponseOutput({
          status: 'OK',
          statusCode: 200,
          activeNodes: [
            { city: 'Lagos', tps: '18,420', reservesUsd: '$284.5M', health: '100%' },
            { city: 'London', tps: '26,500', reservesUsd: '$450.0M', health: '100%' },
            { city: 'Nairobi', tps: '14,600', reservesUsd: '$198.4M', health: '100%' },
            { city: 'Accra', tps: '8,940', reservesUsd: '$118.0M', health: '100%' },
            { city: 'Abuja', tps: '5,210', reservesUsd: '$92.3M', health: '100%' },
          ],
          totalAggregatedReserves: '$1.14B',
          meanGlobalLatency: '34ms',
        });
      } else {
        setResponseOutput({
          status: 'HEDGE_SIMULATED',
          statusCode: 200,
          corridor: 'KES/USD',
          predictedVolatility7d: '1.4%',
          suggestedAction: 'EXECUTE_FORWARD_SWAP',
          recommendedStrikeRate: 129.20,
          slippageProtection: '100% Zero-Spread SLA',
          projectedMarginPreservationUsd: 31500.00,
        });
      }

      toast.success('Sandbox API Response: 200 OK');
    }, 700);
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(JSON.stringify(responseOutput, null, 2));
    setCopied(true);
    toast.success('JSON Response Copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl rounded-xl bg-white dark:bg-[#080D1A] border border-slate-200 dark:border-white/10 shadow-2xl p-5 sm:p-7 overflow-hidden text-slate-800 dark:text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <Icon icon="solar:close-circle-bold" className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
            <Icon icon="solar:code-square-bold" className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
              NOVA Developer Sandbox Console
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                Staging v2.4
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test sub-second settlement requests against simulated pan-African clearing nodes.
            </p>
          </div>
        </div>

        {/* Method & Endpoint Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
          <button
            onClick={() => {
              setEndpoint('create_settlement');
              setResponseOutput(null);
            }}
            className={`p-2.5 rounded-md text-left border text-xs font-mono transition-all ${
              endpoint === 'create_settlement'
                ? 'bg-emerald-50 dark:bg-slate-900 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-0.5">POST</span>
            /v2/settlements/execute
          </button>

          <button
            onClick={() => {
              setEndpoint('check_liquidity');
              setResponseOutput(null);
            }}
            className={`p-2.5 rounded-md text-left border text-xs font-mono transition-all ${
              endpoint === 'check_liquidity'
                ? 'bg-cyan-50 dark:bg-slate-900 border-cyan-500 text-cyan-700 dark:text-cyan-400 font-bold shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="text-cyan-600 dark:text-cyan-400 font-bold block mb-0.5">GET</span>
            /v2/corridors/liquidity
          </button>

          <button
            onClick={() => {
              setEndpoint('simulate_ai_hedge');
              setResponseOutput(null);
            }}
            className={`p-2.5 rounded-md text-left border text-xs font-mono transition-all ${
              endpoint === 'simulate_ai_hedge'
                ? 'bg-purple-50 dark:bg-slate-900 border-purple-500 text-purple-700 dark:text-purple-400 font-bold shadow-sm'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="text-purple-600 dark:text-purple-400 font-bold block mb-0.5">POST</span>
            /v2/hedging/smart-route
          </button>
        </div>

        {/* Dynamic Parameters if create_settlement */}
        {endpoint === 'create_settlement' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <label className="text-slate-500 dark:text-slate-400 block mb-1 font-mono">Source Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-900 dark:text-white font-mono focus:outline-none"
              >
                <option value="GBP">GBP (£)</option>
                <option value="USD">USD ($)</option>
                <option value="KES">KES (KSh)</option>
                <option value="GHS">GHS (GH₵)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-500 dark:text-slate-400 block mb-1 font-mono">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-900 dark:text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-500 dark:text-slate-400 block mb-1 font-mono">Destination Node</label>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-md px-2.5 py-1.5 text-slate-900 dark:text-white font-mono focus:outline-none"
              >
                <option value="NGN">Lagos Core (NGN)</option>
                <option value="KES">Nairobi Switch (KES)</option>
                <option value="GHS">Accra Pool (GHS)</option>
                <option value="RWF">Kigali Hub (RWF)</option>
              </select>
            </div>
          </div>
        )}

        {/* Trigger Button */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Sandbox Authenticated</span>
          </div>

          <button
            onClick={handleRunRequest}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-sm active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Icon icon="solar:play-bold" className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Executing Consensus Block...' : 'Execute Request'}</span>
          </button>
        </div>

        {/* JSON Response Terminal Box */}
        <div className="relative rounded-lg bg-black/95 border border-slate-800 p-4 font-mono text-xs overflow-hidden min-h-[190px] max-h-[280px] overflow-y-auto">
          {responseOutput ? (
            <>
              <button
                onClick={handleCopyResponse}
                className="absolute top-2.5 right-2.5 p-1 rounded bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                title="Copy JSON"
              >
                {copied ? <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5 text-emerald-400" /> : <Icon icon="solar:copy-bold" className="w-3.5 h-3.5" />}
              </button>
              <pre className="text-emerald-400 leading-relaxed whitespace-pre-wrap">
                {JSON.stringify(responseOutput, null, 2)}
              </pre>
            </>
          ) : (
            <div className="h-full min-h-[150px] flex flex-col items-center justify-center text-slate-500 text-center">
              <Icon icon="solar:code-square-bold" className="w-7 h-7 mb-1.5 opacity-40" />
              <span>Ready. Click "Execute Request" to dispatch payload to simulated NOVA consensus layer.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Deterministic Settlement SLA: &lt; 400ms
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white transition-colors border border-slate-300 dark:border-slate-700"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
};
