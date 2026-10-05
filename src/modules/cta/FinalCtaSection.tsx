import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight, 
  Code2, 
  Building2, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface FinalCtaSectionProps {
  onOpenSandbox: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenSandbox }) => {
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
    <section className="relative py-28 bg-[#05080F] border-t border-slate-800/80 overflow-hidden">
      
      {/* Background Gradient Auroras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-amber-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-6 shadow-lg shadow-emerald-500/5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE NEXT GENERATION OF AFRICAN COMMERCE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Build on Africa's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-amber-400">
              Financial Operating System
            </span>
          </h2>

          <p className="text-slate-300 text-lg mt-6 leading-relaxed">
            Whether you are a commercial bank, multinational enterprise, or high-growth fintech, NOVA provides the sub-second settlement rails you need to scale across Africa and beyond.
          </p>
        </div>

        {/* Interactive Developer Sandbox Integration Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-2xl">
          
          {/* Header Bar with Live API Key Generator */}
          <div className="p-6 bg-slate-950/90 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Instant Sandbox Authentication Key
              </span>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono text-emerald-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                  {sandboxApiKey}
                </code>
                <button
                  onClick={handleCopyKey}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy key"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Language Switcher Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
              {(['typescript', 'python', 'curl'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase font-mono transition-all ${
                    selectedLanguage === lang
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Code Body */}
          <div className="p-6 bg-[#040711] relative group">
            <button
              onClick={handleCopyCode}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5 border border-slate-700 shadow-md"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
            </button>

            <pre className="font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed selection:bg-emerald-500/20">
              <code>{codeSnippets[selectedLanguage]}</code>
            </pre>
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" /> 100% Mock Sandbox Ready
              </span>
              <span>Zero Backend Required</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenSandbox}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 active:scale-95 transition-all"
              >
                <Terminal className="w-4 h-4" />
                <span>Open Interactive Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
