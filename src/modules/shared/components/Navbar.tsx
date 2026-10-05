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
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  onOpenSandbox: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSandbox }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false); // Light mode default
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Sync theme on mount (default is light)
    const saved = localStorage.getItem('nova_theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

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
          ? 'bg-white/90 dark:bg-[#060A12]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-sm dark:shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-md bg-gradient-to-tr from-emerald-500 via-cyan-400 to-amber-400 p-[2px] shadow-sm shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-900 rounded-[4px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300 font-extrabold text-lg tracking-tighter">
                  N
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                  NOVA
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  OS
                </span>
              </div>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 tracking-wider uppercase font-mono">
                Pan-African Rail
              </span>
            </div>
          </a>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-7">
            <a 
              href="#network" 
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              Network Map
            </a>
            <a 
              href="#intelligence" 
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
              Treasury OS
            </a>
            <a 
              href="#ai-assistant" 
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
              NOVA AI
            </a>
            <a 
              href="#security" 
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              Security & Trust
            </a>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live Operational Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-700/60 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                TPS: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">24,891</strong>
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              className="p-2 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-700/50 border border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Sandbox CTA */}
            <button
              onClick={onOpenSandbox}
              className="group relative inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-500 dark:to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 shadow-sm hover:shadow transition-all duration-200 active:scale-95"
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
              className="p-2 rounded-md bg-slate-100 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-slate-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 backdrop-blur-2xl flex flex-col gap-2 shadow-xl animate-fade-in">
            <a 
              href="#network" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <Activity className="w-4 h-4 text-emerald-500" />
              Financial Network Map
            </a>
            <a 
              href="#intelligence" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-cyan-500" />
              Financial Intelligence & Wallets
            </a>
            <a 
              href="#ai-assistant" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-purple-500" />
              NOVA AI Financial Assistant
            </a>
            <a 
              href="#security" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Security Architecture & Trust
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSandbox();
              }}
              className="mt-2 w-full py-2.5 rounded-md text-center text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 shadow-md flex items-center justify-center gap-2"
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
