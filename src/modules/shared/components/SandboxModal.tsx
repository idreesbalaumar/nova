import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Play, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  Cpu, 
  Zap,
  CheckCircle2
} from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-[#080D1A] border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              NOVA Developer Sandbox Console
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Staging v2.4
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Test sub-second settlement requests against simulated pan-African clearing nodes.
            </p>
          </div>
        </div>

        {/* Method & Endpoint Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => {
              setEndpoint('create_settlement');
              setResponseOutput(null);
            }}
            className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
              endpoint === 'create_settlement'
                ? 'bg-slate-900 border-emerald-500/80 text-emerald-400 font-bold shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-emerald-400 font-bold block mb-1">POST</span>
            /v2/settlements/execute
          </button>

          <button
            onClick={() => {
              setEndpoint('check_liquidity');
              setResponseOutput(null);
            }}
            className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
              endpoint === 'check_liquidity'
                ? 'bg-slate-900 border-cyan-500/80 text-cyan-400 font-bold shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-cyan-400 font-bold block mb-1">GET</span>
            /v2/corridors/liquidity
          </button>

          <button
            onClick={() => {
              setEndpoint('simulate_ai_hedge');
              setResponseOutput(null);
            }}
            className={`p-3 rounded-xl text-left border text-xs font-mono transition-all ${
              endpoint === 'simulate_ai_hedge'
                ? 'bg-slate-900 border-purple-500/80 text-purple-400 font-bold shadow-md'
                : 'bg-slate-950 border-slate-800 text-purple-400 hover:text-white'
            }`}
          >
            <span className="text-purple-400 font-bold block mb-1">POST</span>
            /v2/hedging/smart-route
          </button>
        </div>

        {/* Dynamic Parameters if create_settlement */}
        {endpoint === 'create_settlement' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-mono">Source Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
              >
                <option value="GBP">GBP (£)</option>
                <option value="USD">USD ($)</option>
                <option value="KES">KES (KSh)</option>
                <option value="GHS">GHS (GH₵)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-mono">Destination Node</label>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Sandbox Authenticated</span>
          </div>

          <button
            onClick={handleRunRequest}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Executing Consensus Block...' : 'Execute Request'}</span>
          </button>
        </div>

        {/* JSON Response Terminal Box */}
        <div className="relative rounded-2xl bg-black/90 border border-slate-800 p-4 font-mono text-xs overflow-hidden min-h-[200px] max-h-[300px] overflow-y-auto">
          {responseOutput ? (
            <>
              <button
                onClick={handleCopyResponse}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                title="Copy JSON"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <pre className="text-emerald-300 leading-relaxed whitespace-pre-wrap">
                {JSON.stringify(responseOutput, null, 2)}
              </pre>
            </>
          ) : (
            <div className="h-full min-h-[160px] flex flex-col items-center justify-center text-slate-500 text-center">
              <Terminal className="w-8 h-8 mb-2 opacity-40" />
              <span>Ready. Click "Execute Request" to dispatch payload to simulated NOVA consensus layer.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Deterministic Settlement SLA: &lt; 400ms
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
};
