import React, { useState, useEffect } from 'react';
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
import { RouteSpinner } from '@/modules/shared/components/RouteSpinner';
import { Transaction } from '@/data/novaData';
import { Toaster } from 'sonner';

export default function App() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  // Initial simulated route hydration matching CarePortal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  const handleExploreNetwork = () => {
    const el = document.getElementById('network');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isInitialLoading) {
    return <RouteSpinner fullScreen={true} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#060A12] dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300 transition-colors duration-200">
      {/* Toast Notifications */}
      <Toaster 
        position="top-right" 
        richColors 
        closeButton
        toastOptions={{
          style: {
            borderRadius: '6px',
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
