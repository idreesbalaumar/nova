import React, { useState, useEffect, useCallback } from 'react';
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
import { LoginPage } from '@/modules/auth/LoginPage';
import { RegisterPage } from '@/modules/auth/RegisterPage';
import { Transaction } from '@/data/novaData';
import { Toaster, toast } from 'sonner';

export type AppRoute = 'home' | 'login' | 'register';

export default function App() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [activeRoute, setActiveRoute] = useState<AppRoute>(() => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('/login') || hash === '#login') return 'login';
    if (path.includes('/register') || hash === '#register') return 'register';
    return 'home';
  });

  // Initial simulated route hydration matching CarePortal
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
      window.scrollTo(0, 0);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Listen to popstate and hashchange for seamless client-side browser navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/login') || hash === '#login') {
        setActiveRoute('login');
      } else if (path.includes('/register') || hash === '#register') {
        setActiveRoute('register');
      } else {
        setActiveRoute('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = useCallback((route: AppRoute) => {
    setActiveRoute(route);
    const targetUrl = route === 'home' ? '/' : `/${route}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            borderRadius: '10px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          },
        }}
      />

      {/* Conditional Rendering Based on Route */}
      {activeRoute === 'login' ? (
        <LoginPage
          onNavigateHome={() => navigateTo('home')}
          onNavigateRegister={() => navigateTo('register')}
          onLoginSuccess={(user) => {
            toast.success(`Welcome back, ${user.name}! Connected to NOVA network.`);
            navigateTo('home');
          }}
        />
      ) : activeRoute === 'register' ? (
        <RegisterPage
          onNavigateHome={() => navigateTo('home')}
          onNavigateLogin={() => navigateTo('login')}
          onRegisterSuccess={(data) => {
            toast.success(`Account registered for ${data.businessName}! Welcome to NOVA.`);
            navigateTo('home');
          }}
        />
      ) : (
        <>
          {/* Navigation Header */}
          <Navbar 
            onOpenSandbox={() => setIsSandboxOpen(true)}
            onOpenLogin={() => navigateTo('login')}
            onOpenRegister={() => navigateTo('register')}
          />

          {/* Main Page Layout */}
          <main className="flex-1">
            {/* 1. Hero Experience */}
            <HeroSection 
              onOpenSandbox={() => setIsSandboxOpen(true)}
              onExploreNetwork={handleExploreNetwork}
              onOpenRegister={() => navigateTo('register')}
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
              onOpenRegister={() => navigateTo('register')}
            />
          </main>

          {/* Footer */}
          <Footer 
            onOpenLogin={() => navigateTo('login')}
            onOpenRegister={() => navigateTo('register')}
          />

          {/* Interactive Modals */}
          <ReceiptModal 
            transaction={selectedTransaction}
            onClose={() => setSelectedTransaction(null)}
          />

          <SandboxModal 
            isOpen={isSandboxOpen}
            onClose={() => setIsSandboxOpen(false)}
          />
        </>
      )}
    </div>
  );
}
