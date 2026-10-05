import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-[#03060C] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900 py-12 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-8 border-b border-slate-200 dark:border-slate-900">
          
          {/* Brand Info (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <Logo 
              variant="full" 
              size="md" 
              subtitle="Africa's Financial Operating System" 
              href="#home"
            />

            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-sm mt-2">
              Africa’s financial operating system. A unified monetary infrastructure enabling sub-second cross-border settlement, multi-currency liquidity rails, and AI-driven treasury operations.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                All Systems Operational • 24,891 TPS Active
              </span>
            </div>
          </div>

          {/* Column 1: Financial Network */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 dark:text-white uppercase tracking-wider font-mono text-[11px]">
              Financial Network
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a href="#network" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>🇳🇬 Lagos Hub</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-mono">18.4k TPS</span>
                </a>
              </li>
              <li>
                <a href="#network" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>🇳🇬 Abuja Sovereign Rail</span>
                  <span className="text-[10px] text-slate-400 font-mono">5.2k TPS</span>
                </a>
              </li>
              <li>
                <a href="#network" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>🇰🇪 Nairobi Switch</span>
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">14.6k TPS</span>
                </a>
              </li>
              <li>
                <a href="#network" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>🇬🇭 Accra Pool</span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">8.9k TPS</span>
                </a>
              </li>
              <li>
                <a href="#network" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>🇬🇧 London Gateway</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">26.5k TPS</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Platform & OS */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 dark:text-white uppercase tracking-wider font-mono text-[11px]">
              Platform Rails
            </h4>
            <ul className="space-y-1.5">
              <li><a href="#intelligence" className="hover:text-slate-950 dark:hover:text-white transition-colors">Multi-Currency Ledger</a></li>
              <li><a href="#intelligence" className="hover:text-slate-950 dark:hover:text-white transition-colors">Smart Order FX Router</a></li>
              <li><a href="#ai-assistant" className="hover:text-slate-950 dark:hover:text-white transition-colors">NOVA AI Copilot</a></li>
              <li><a href="#security" className="hover:text-slate-950 dark:hover:text-white transition-colors">3-of-5 MPC Custody</a></li>
              <li><a href="#security" className="hover:text-slate-950 dark:hover:text-white transition-colors">Cryptographic Merkle Proofs</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Regulatory */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-950 dark:text-white uppercase tracking-wider font-mono text-[11px]">
              Compliance & Specs
            </h4>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400">✓</span> Central Bank Regulatory Sandbox
              </li>
              <li className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400">✓</span> ISO/IEC 27001 Certified
              </li>
              <li className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400">✓</span> SOC 2 Type II Audited
              </li>
              <li className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400">✓</span> PCI-DSS Level 1 Gateway
              </li>
              <li className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400">✓</span> BFT Consensus Engine
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} NOVA Financial Technologies Limited. Africa's Financial Operating System.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Terms of Protocol</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Security Disclosures</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">Audit Certificate</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
