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
import { DashboardLayout } from '@/modules/dashboard/DashboardLayout';
import { DashboardPage } from '@/modules/dashboard/DashboardPage';
import { Transaction } from '@/data/novaData';
import { Toaster, toast } from 'sonner';

export type AppRoute = 'home' | 'login' | 'register' | 'dashboard';

export interface AuthUser {
  name: string;
  email: string;
  organization?: string;
  role?: string;
}

const DEFAULT_DEMO_USER: AuthUser = {
  name: 'Amara Okonkwo',
  email: 'operations@afrigate-commerce.africa',
  organization: 'Afrigate Commerce Ltd',
  role: 'Head of Global Treasury',
};

export default function App() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  // Authenticated User State (saved in localStorage for persistent session)
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('nova_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [activeRoute, setActiveRoute] = useState<AppRoute>(() => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path.includes('/dashboard') || hash === '#dashboard') return 'dashboard';
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
      if (path.includes('/dashboard') || hash === '#dashboard') {
        setActiveRoute('dashboard');
      } else if (path.includes('/login') || hash === '#login') {
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

  const handleSignOut = () => {
    setAuthUser(null);
    localStorage.removeItem('nova_auth_user');
    toast.info('Signed out of NOVA workspace.');
    navigateTo('home');
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
            borderRadius: '12px',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          },
        }}
      />

      {/* Conditional Rendering Based on Route */}
      {activeRoute === 'dashboard' ? (
        <DashboardLayout
          user={authUser || DEFAULT_DEMO_USER}
          onSignOut={handleSignOut}
          onNavigateHome={() => navigateTo('home')}
        >
          <DashboardPage
            user={authUser || DEFAULT_DEMO_USER}
            onSelectTransaction={(tx) => setSelectedTransaction(tx)}
            onOpenSandbox={() => setIsSandboxOpen(true)}
          />
        </DashboardLayout>
      ) : activeRoute === 'login' ? (
        <LoginPage
          onNavigateHome={() => navigateTo('home')}
          onNavigateRegister={() => navigateTo('register')}
          onLoginSuccess={(user) => {
            const loggedInUser: AuthUser = {
              name: user.name || 'Amara Okonkwo',
              email: user.email,
              organization: (user as any).organization || 'Afrigate Commerce Ltd',
              role: (user as any).role || 'Head of Global Treasury',
            };
            setAuthUser(loggedInUser);
            localStorage.setItem('nova_auth_user', JSON.stringify(loggedInUser));
            toast.success(`Welcome back, ${loggedInUser.name}! Connected to NOVA network.`);
            navigateTo('dashboard');
          }}
        />
      ) : activeRoute === 'register' ? (
        <RegisterPage
          onNavigateHome={() => navigateTo('home')}
          onNavigateLogin={() => navigateTo('login')}
          onRegisterSuccess={(data) => {
            const registeredUser: AuthUser = {
              name: data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Amina Adeyemi',
              email: data.email || 'operations@afrigate-logistics.africa',
              organization: data.businessName || 'Afrigate Logistics Ltd',
              role: 'Lead Administrator',
            };
            setAuthUser(registeredUser);
            localStorage.setItem('nova_auth_user', JSON.stringify(registeredUser));
            toast.success(`Account registered for ${registeredUser.organization}! Welcome to NOVA.`);
            navigateTo('dashboard');
          }}
        />
      ) : (
        <>
          {/* Navigation Header */}
          <Navbar 
            onOpenSandbox={() => setIsSandboxOpen(true)}
            onOpenLogin={() => navigateTo('login')}
            onOpenRegister={() => navigateTo('register')}
            isLoggedIn={!!authUser}
            user={authUser}
            onSignOut={handleSignOut}
            onOpenDashboard={() => navigateTo('dashboard')}
          />

          {/* Main Page Layout */}
          <main className="flex-1">
            {/* 1. Hero Experience */}
            <HeroSection 
              onOpenSandbox={() => setIsSandboxOpen(true)}
              onExploreNetwork={handleExploreNetwork}
              onOpenRegister={() => navigateTo(authUser ? 'dashboard' : 'register')}
            />

            {/* 2. African Financial Network (Focused on Africa) */}
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
              onOpenRegister={() => navigateTo(authUser ? 'dashboard' : 'register')}
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

      {/* Global Receipt Modal available in Dashboard and Landing Page */}
      {activeRoute === 'dashboard' && (
        <ReceiptModal 
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}
