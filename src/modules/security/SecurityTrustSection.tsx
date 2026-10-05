import React, { useState } from 'react';
import { 
  SECURITY_SPECS, 
  AUDIT_LOG_STREAM 
} from '@/data/novaData';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';

export const SecurityTrustSection: React.FC = () => {
  const [isSigning, setIsSigning] = useState(false);
  const [verifiedBlocks, setVerifiedBlocks] = useState<Record<string, boolean>>({
    '#9,824,102': true,
  });

  const mpcShards = [
    { id: 1, name: 'Lagos Tier-1 HSM', location: 'Nigeria 🇳🇬' },
    { id: 2, name: 'London Sovereign Vault', location: 'United Kingdom 🇬🇧' },
    { id: 3, name: 'Frankfurt Secure Enclave', location: 'Germany 🇩🇪' },
    { id: 4, name: 'Nairobi Nitro Node', location: 'Kenya 🇰🇪' },
    { id: 5, name: 'Air-Gapped Cold Shard', location: 'Cold Storage 🧊' },
  ];

  const handleSimulateMpcSign = () => {
    setIsSigning(true);

    setTimeout(() => {
      setIsSigning(false);
      toast.success('3-of-5 MPC Quorum Achieved', {
        description: 'Zero-Knowledge signature synthesized without ever revealing the master private key.',
      });
    }, 900);
  };

  const handleVerifyBlock = (blockId: string) => {
    setVerifiedBlocks((prev) => ({ ...prev, [blockId]: true }));
    toast.success(`Cryptographic Proof Verified for ${blockId}`, {
      description: 'Merkle root matched canonical consensus state across all validator nodes.',
    });
  };

  return (
    <section id="security" className="relative py-20 bg-slate-100/70 dark:bg-[#070D18] border-t border-slate-200 dark:border-slate-800/80 overflow-hidden transition-colors">
      
      {/* Background Amber/Gold Aura */}
      <div className="absolute top-1/2 left-1/4 w-[700px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-emerald-500/5 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2.5">
              <Icon icon="solar:shield-check-bold" className="w-3.5 h-3.5" />
              <span>INSTITUTIONAL TRUST & CRYPTOGRAPHIC ASSURANCE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Sovereign-Grade Security
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xl mt-1.5">
              Built from first principles for central banks, sovereign wealth funds, and tier-1 financial institutions across Africa.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-md self-start md:self-auto shadow-sm">
            <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5 text-emerald-500" />
            <span>ISO 27001 • SOC 2 TYPE II • CBN COMPLIANT</span>
          </div>
        </div>

        {/* Visual Storytelling Element: Interactive MPC Threshold Signing Engine */}
        <div className="mb-12 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-5 sm:p-7 shadow-sm dark:shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 pb-5 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Icon icon="solar:key-bold" className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-slate-950 dark:text-white">
                  Multi-Party Computation (MPC) 3-of-5 Custody Visualizer
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl">
                Unlike legacy banks relying on single points of vulnerability, NOVA splits transaction authorization into 5 mathematical polynomial shards across 4 continents. <strong>No complete key ever exists in memory or disk.</strong>
              </p>
            </div>

            <button
              onClick={handleSimulateMpcSign}
              disabled={isSigning}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 shadow-sm active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Icon icon="solar:restart-bold" className={`w-3.5 h-3.5 ${isSigning ? 'animate-spin' : ''}`} />
              <span>{isSigning ? 'Synthesizing Quorum...' : 'Simulate 3-of-5 MPC Quorum'}</span>
            </button>
          </div>

          {/* Shards Interactive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 py-6">
            {mpcShards.map((shard, idx) => {
              const isParticipating = idx < 3;

              return (
                <div
                  key={shard.id}
                  className={`p-3.5 rounded-lg border transition-all duration-300 relative ${
                    isParticipating
                      ? 'bg-amber-50/60 dark:bg-slate-950/80 border-amber-400 dark:border-amber-500/50 shadow-sm ring-1 ring-amber-400/30'
                      : 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-60'
                  } ${isSigning && isParticipating ? 'animate-pulse border-amber-500' : ''}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Shard #{shard.id}
                    </span>
                    <Icon icon="solar:scanner-bold" className={`w-3.5 h-3.5 ${isParticipating ? 'text-amber-500' : 'text-slate-400'}`} />
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">{shard.name}</h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-2.5">{shard.location}</span>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400">Status</span>
                    <span className={isParticipating ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-400'}>
                      {isParticipating ? 'Quorum Signer' : 'Standby'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quorum Progress Bar */}
          <div className="pt-3.5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>
                Required Threshold: <strong className="text-slate-900 dark:text-white">3 of 5 Independent Shards</strong>
              </span>
            </div>
            <div className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <Icon icon="solar:check-circle-bold" className="w-3.5 h-3.5 text-emerald-500" />
              <span>Byzantine Fault Resilient • Quantum-Resistant Curve</span>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Institutional Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {SECURITY_SPECS.map((spec, idx) => (
            <div
              key={idx}
              className="p-5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 shadow-sm hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    {idx === 0 && <Icon icon="solar:shield-check-bold" className="w-4 h-4" />}
                    {idx === 1 && <Icon icon="solar:lock-bold" className="w-4 h-4" />}
                    {idx === 2 && <Icon icon="solar:banknotes-bold" className="w-4 h-4" />}
                    {idx === 3 && <Icon icon="solar:cpu-bold" className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {spec.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-0.5">{spec.title}</h3>
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-mono block mb-2">{spec.subtitle}</span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {spec.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Benchmark:</span>
                <span className="font-bold text-slate-950 dark:text-white">{spec.stat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Real-Time Immutable Merkle Audit Log */}
        <div className="rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-5 shadow-sm dark:shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-2">
                <Icon icon="solar:document-text-bold" className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Live Cryptographic Merkle Audit Stream
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Every settlement is timestamped with tamper-proof SHA-256 Merkle proofs distributed across sovereign validator nodes.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Consensus Finality: <strong className="text-emerald-600 dark:text-emerald-400">100% Validated</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="pb-2.5 font-medium">Consensus Block</th>
                  <th className="pb-2.5 font-medium">Timestamp</th>
                  <th className="pb-2.5 font-medium">Corridor</th>
                  <th className="pb-2.5 font-medium">Validator Node</th>
                  <th className="pb-2.5 font-medium">Merkle Root</th>
                  <th className="pb-2.5 font-medium text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {AUDIT_LOG_STREAM.map((log) => {
                  const isVerified = verifiedBlocks[log.block];

                  return (
                    <tr key={log.block} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 font-bold text-slate-900 dark:text-white">{log.block}</td>
                      <td className="py-2.5 text-slate-500 dark:text-slate-400">{log.timestamp}</td>
                      <td className="py-2.5 text-emerald-600 dark:text-emerald-400 font-bold">{log.corridor}</td>
                      <td className="py-2.5 text-slate-700 dark:text-slate-300 font-sans">{log.validator}</td>
                      <td className="py-2.5 text-cyan-600 dark:text-cyan-400">{log.merkleRoot}</td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => handleVerifyBlock(log.block)}
                          className={`px-2.5 py-0.5 rounded-sm text-[10px] font-bold transition-all ${
                            isVerified
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {isVerified ? '✓ Proof Verified' : 'Verify Proof'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
