import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Terminal, 
  Moon, 
  Sun, 
  Menu, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  onOpenSandbox: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSandbox }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nova_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nova_theme', 'light');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060A12]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-400 to-amber-400 p-[2px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#060A12] rounded-[10px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 font-extrabold text-xl tracking-tighter">
                  N
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  NOVA
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  OS
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">
                Pan-African Rail
              </span>
            </div>
          </a>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#network" 
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              Network Map
            </a>
            <a 
              href="#intelligence" 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              Treasury OS
            </a>
            <a 
              href="#ai-assistant" 
              className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors flex items-center gap-1.5"
            >
              <Cpu className="w-4 h-4 text-purple-400" />
              NOVA AI
            </a>
            <a 
              href="#security" 
              className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Security & Trust
            </a>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live Operational Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-mono text-[11px]">
                TPS: <strong className="text-emerald-400 font-bold">24,891</strong>
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-200" />}
            </button>

            {/* Sandbox CTA */}
            <button
              onClick={onOpenSandbox}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200 active:scale-95"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Sandbox</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-200" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-200 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 p-4 rounded-2xl bg-slate-900/95 border border-slate-800 backdrop-blur-2xl flex flex-col gap-3 shadow-2xl animate-fade-in">
            <a 
              href="#network" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              Financial Network Map
            </a>
            <a 
              href="#intelligence" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              Financial Intelligence & Wallets
            </a>
            <a 
              href="#ai-assistant" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-purple-400" />
              NOVA AI Financial Assistant
            </a>
            <a 
              href="#security" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Security Architecture & Trust
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSandbox();
              }}
              className="mt-2 w-full py-2.5 rounded-xl text-center text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-md flex items-center justify-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              Launch Developer Sandbox
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
