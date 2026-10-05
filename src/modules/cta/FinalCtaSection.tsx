import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

interface FinalCtaSectionProps {
  onOpenSandbox: () => void;
  onOpenRegister?: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenSandbox, onOpenRegister }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'typescript' | 'python' | 'curl'>('typescript');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const sandboxApiKey = 'nova_live_sec_78f192b0c4e1a09d3';

  const codeSnippets = {
    typescript: `import { NovaClient } from '@nova-fin/sdk';

const nova = new NovaClient({
  apiKey: process.env.NOVA_API_KEY,
  environment: 'production-mainnet',
});

// Settle cross-border transfer from London to Lagos in < 400ms
const settlement = await nova.settlements.create({
  source: { currency: 'GBP', amount: 250_000, accountId: 'act_lon_09' },
  destination: { currency: 'NGN', accountId: 'act_los_tier1' },
  routing: 'instant-zero-spread',
  complianceAttestation: 'CBN-Form-A-Verified',
});

console.log(\`Settled: \${settlement.settledAmount} NGN in \${settlement.latencyMs}ms\`);`,

    python: `from nova_fin import NovaClient

nova = NovaClient(
    api_key="nova_live_sec_78f192b0c4e1a09d3",
    environment="production-mainnet"
)

# Execute sub-second cross-border liquidity transfer
transfer = nova.settlements.create(
    source_currency="USD",
    source_amount=500_000,
    destination_currency="KES",
    destination_node="nairobi-switch",
    mode="instant_consensus"
)

print(f"Finalized in {transfer.latency_ms}ms with zero FX spread.")`,

    curl: `curl -X POST https://api.novafin.network/v2/settlements \\
  -H "Authorization: Bearer nova_live_sec_78f192b0c4e1a09d3" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sourceCurrency": "GBP",
    "targetCurrency": "NGN",
    "amount": 100000,
    "destinationNode": "lagos-core",
    "guaranteedRate": true
  }'`,
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(sandboxApiKey);
    setCopiedKey(true);
    toast.success('Sandbox API Key Copied!', {
      description: 'Use this key to authenticate against NOVA staging nodes.',
    });
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[selectedLanguage]);
    setCopiedCode(true);
    toast.success('Integration Code Copied!');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="relative py-24 bg-[#FFFDF9] dark:bg-[#05080F] border-t border-amber-500/20 dark:border-slate-800/80 overflow-hidden transition-colors">
      
      {/* Background Gradient Auroras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-amber-500/10 via-emerald-500/10 to-amber-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-slate-900 border border-amber-500/30 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-5 shadow-sm">
            <Icon icon="solar:magic-stick-3-bold" className="w-3.5 h-3.5 text-amber-500" />
            <span>JOIN THE NEXT GENERATION OF AFRICAN COMMERCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            Build on Africa's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 dark:from-amber-400 dark:via-yellow-300 dark:to-emerald-400">
              Financial Operating System
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base mt-5 leading-relaxed">
            Whether you are a commercial bank, multinational enterprise, or high-growth merchant, NOVA provides the sub-second settlement rails you need to scale across Africa and beyond.
          </p>
        </div>

        {/* Interactive Developer Sandbox Integration Box */}
        <div className="max-w-4xl mx-auto rounded-xl bg-white dark:bg-slate-900/90 border border-amber-500/20 dark:border-white/10 shadow-lg dark:shadow-2xl overflow-hidden backdrop-blur-2xl">
          
          {/* Header Bar with Live API Key Generator */}
          <div className="p-5 bg-amber-500/5 dark:bg-slate-950/90 border-b border-amber-500/20 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Instant Sandbox Authentication Key
              </span>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-sm border border-amber-500/20 dark:border-slate-800">
                  {sandboxApiKey}
                </code>
                <button
                  onClick={handleCopyKey}
                  className="p-1.5 rounded-sm bg-white dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors border border-slate-300 dark:border-slate-700 cursor-pointer"
                  title="Copy key"
                >
                  {copiedKey ? (
                    <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Icon icon="solar:copy-bold" className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Language Switcher Tabs */}
            <div className="flex items-center p-0.5 rounded-md bg-white dark:bg-slate-900 border border-amber-500/20 dark:border-slate-800">
              {(['typescript', 'python', 'curl'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-semibold uppercase font-mono transition-all cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-amber-500 dark:bg-amber-500 text-white dark:text-slate-950 shadow-sm font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-amber-800 dark:hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Code Body */}
          <div className="p-5 bg-[#0B1020] relative group">
            <button
              onClick={handleCopyCode}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5 border border-slate-700 shadow-sm cursor-pointer"
            >
              {copiedCode ? (
                <Icon icon="solar:check-circle-bold" className="w-3 h-3 text-emerald-400" />
              ) : (
                <Icon icon="solar:copy-bold" className="w-3 h-3" />
              )}
              <span>{copiedCode ? 'Copied' : 'Copy'}</span>
            </button>

            <pre className="font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed selection:bg-amber-500/20">
              <code>{codeSnippets[selectedLanguage]}</code>
            </pre>
          </div>

          {/* Action Footer */}
          <div className="p-5 bg-slate-100 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <Icon icon="solar:shield-check-bold" className="w-4 h-4" /> Sandbox Live
              </span>
              <span>Zero Backend Required</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              {onOpenRegister && (
                <button
                  onClick={onOpenRegister}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-bold text-xs text-slate-800 dark:text-white bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  <Icon icon="solar:user-plus-bold" className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Open Production Account</span>
                </button>
              )}
              <button
                onClick={onOpenSandbox}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-bold text-xs text-white bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Icon icon="solar:code-square-bold" className="w-4 h-4" />
                <span>Open Interactive Sandbox</span>
                <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCtaSection;
