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
import { Logo } from './Logo';

interface NavbarProps {
  onOpenSandbox: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSandbox }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false); // Light mode default
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'network', 'intelligence', 'ai-assistant', 'security'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Sync theme on mount
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

  const navItems = [
    { name: 'Home', path: '#home', id: 'home', icon: Activity },
    { name: 'Network Map', path: '#network', id: 'network', icon: Activity },
    { name: 'Treasury OS', path: '#intelligence', id: 'intelligence', icon: Layers },
    { name: 'NOVA AI', path: '#ai-assistant', id: 'ai-assistant', icon: Cpu },
    { name: 'Security & Trust', path: '#security', id: 'security', icon: ShieldCheck },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#060A12]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 shadow-sm py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo with CarePortal-style layout & nano banana generated asset */}
          <div className="flex items-center gap-2">
            <Logo
              variant="full"
              size="md"
              rounded={true}
              subtitle="Africa's Financial Operating System"
              href="#home"
            />
          </div>

          {/* Center Links with subtle active pill */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-md bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Live Operational Status */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs shadow-xs">
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
              className="p-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 transition-colors shadow-xs"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Sandbox CTA */}
            <button
              onClick={onOpenSandbox}
              className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-sm transition-all duration-200 active:scale-95"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Sandbox Console</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-3.5 rounded-lg bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 backdrop-blur-2xl flex flex-col gap-1.5 shadow-xl animate-fade-in">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={item.path} 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
              >
                <item.icon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSandbox();
              }}
              className="mt-2 w-full py-2.5 rounded-md text-center text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-sm flex items-center justify-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5" />
              Launch Developer Sandbox
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
