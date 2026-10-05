import React, { useState } from 'react';
import { Navbar } from '@/modules/shared/components/Navbar';
import { HeroSection } from '@/modules/hero/HeroSection';
import { NetworkMapSection } from '@/modules/network/NetworkMapSection';
import { FinancialIntelligenceSection } from '@/modules/intelligence/FinancialIntelligenceSection';
import { NovaAiSection } from '@/modules/ai-assistant/NovaAiSection';
import { SecurityTrustSection } from '@/modules/security/SecurityTrustSection';
import { FinalCtaSection } from '@/modules/cta/FinalCtaSection';
import { Footer } from '@/modules/shared/components/Footer';
import { ReceiptModal } from '@/modules/shared/components/ReceiptModal';
import { SandboxModal } from '@/modules/shared/components/SandboxModal';
import { Transaction } from '@/data/novaData';
import { Toaster } from 'sonner';

export default function App() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);

  const handleExploreNetwork = () => {
    const el = document.getElementById('network');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060A12] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Toast Notifications */}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        theme="dark"
        toastOptions={{
          style: {
            background: '#0B132B',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          },
        }}
      />

      {/* Navigation Header */}
      <Navbar onOpenSandbox={() => setIsSandboxOpen(true)} />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Hero Experience */}
        <HeroSection 
          onOpenSandbox={() => setIsSandboxOpen(true)}
          onExploreNetwork={handleExploreNetwork}
        />

        {/* 2. African Financial Network */}
        <NetworkMapSection 
          onSelectTransaction={(tx) => setSelectedTransaction(tx)}
        />

        {/* 3. Financial Intelligence & Treasury OS */}
        <FinancialIntelligenceSection 
          onSelectTransaction={(tx) => setSelectedTransaction(tx)}
        />

        {/* 4. NOVA AI Financial Assistant */}
        <NovaAiSection />

        {/* 5. Security & Trust Architecture */}
        <SecurityTrustSection />

        {/* 6. Final CTA & Developer Sandbox */}
        <FinalCtaSection 
          onOpenSandbox={() => setIsSandboxOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ReceiptModal 
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />

      <SandboxModal 
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />
    </div>
  );
}
