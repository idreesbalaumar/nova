import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Logo } from '@/modules/shared/components/Logo';
import { Alert } from '@/modules/shared/components/Alert';
import { cn } from '@/modules/shared/utils/cn';
import heroCenter from '@/assets/hero_center.jpg';

interface LoginPageProps {
  onNavigateHome: () => void;
  onNavigateRegister: () => void;
  onLoginSuccess?: (user: { name: string; email: string }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateHome,
  onNavigateRegister,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [shaking, setShaking] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const triggerShake = () => {
    setShaking(false);
    requestAnimationFrame(() => {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    });
  };

  const handleFillDemo = () => {
    setEmail('merchant@nova-finance.africa');
    setPassword('NovaSecure2026!');
    setFieldErrors({});
    setErrorMsg(null);
  };

  const validateLoginForm = () => {
    const errors: { email?: string; password?: string } = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      errors.email = 'Business email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errors.email = 'Please enter a valid work email address (e.g. name@company.africa).';
      }
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) {
      triggerShake();
      return;
    }

    setStatus('loading');
    setErrorMsg(null);

    // Simulated login flow with realistic authentication response
    setTimeout(() => {
      if (email.includes('error')) {
        setStatus('idle');
        setErrorMsg('Invalid email or password. Please verify your credentials.');
        triggerShake();
        return;
      }

      setStatus('success');
      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess({
            name: email.split('@')[0],
            email,
          });
        }
        onNavigateHome();
      }, 700);
    }, 1000);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      return;
    }
    setForgotSent(true);
  };

  return (
    <div className="min-h-screen flex font-sans relative bg-[#070A10] overflow-hidden selection:bg-amber-500/20 selection:text-amber-800">
      {/* Background Image on Left Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute top-0 bottom-0 left-0 w-[450px] xl:w-[500px] 2xl:w-[540px] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroCenter})` }}
      >
        {/* Deep dark overlay & vignette matching Charity Grants HQ with African Obsidian theme */}
        <div className="absolute inset-0 bg-[#070A10]/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A10]/90 via-[#070A10]/40 to-[#070A10]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent_60%)]" />
      </motion.div>

      {/* Left Sidebar Content */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col w-[400px] xl:w-[460px] 2xl:w-[500px] relative z-10 shrink-0 min-h-screen"
      >
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Top Logo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="px-8 pt-7 pb-4 flex items-center"
          >
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-3 select-none hover:opacity-90 transition-opacity text-left cursor-pointer"
              title="NOVA Home"
            >
              <Logo
                size="md"
                forceDark
                showDivider={true}
                className="gap-3.5"
                dividerClassName="h-7.5 bg-white/20"
                subtitle="Africa's Financial Operating System"
              />
            </button>
          </motion.div>

          {/* Value Proposition Highlights */}
          <div className="px-8 space-y-4 my-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-amber-300 font-medium">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Pan-African Settlement Rails</span>
            </div>

            <h1 className="text-2xl xl:text-3xl font-bold text-white tracking-tight leading-snug">
              Africa's Unified <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
                Financial Operating System
              </span>
            </h1>

            <p className="text-xs xl:text-sm text-slate-300/80 leading-relaxed max-w-sm">
              Empowering merchants, banks, and cross-border businesses with real-time liquidity, multi-currency wallets, and sub-second settlement.
            </p>

            {/* Currency Pill Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { code: 'NGN', label: '₦ Lagos' },
                { code: 'KES', label: 'KSh Nairobi' },
                { code: 'GHS', label: 'GH₵ Accra' },
                { code: 'ZAR', label: 'R Joburg' },
                { code: 'USD', label: '$ Global' },
                { code: 'GBP', label: '£ London' },
              ].map((c) => (
                <span
                  key={c.code}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-300 font-mono"
                >
                  {c.label}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial Glass Card at Bottom (Matching Charity Grants HQ) */}
          <div className="px-8 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl text-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/40">
                  <Icon icon="solar:verified-check-bold" className="h-3.5 w-3.5" />
                </span>
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-300">
                  Verified Merchant Partner
                </span>
              </div>
              <blockquote className="space-y-3">
                <p className="text-xs sm:text-[13px] font-normal leading-relaxed text-white/95">
                  &ldquo;NOVA unified our multi-currency treasury across Lagos, Nairobi, and London. Cross-border settlements that previously took days now clear in under two seconds with zero hidden conversion spread.&rdquo;
                </p>
                <footer className="pt-2 border-t border-white/15 text-[11px] text-white/70 flex items-center justify-between">
                  <span>&mdash; Amara Okonkwo</span>
                  <span className="text-amber-300 font-semibold">Afrigate Commerce</span>
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form Container */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col min-h-screen bg-[#FFFDF9] dark:bg-[#0B0E14] relative z-20 lg:rounded-tl-[32px] lg:rounded-bl-[32px] xl:rounded-tl-[38px] xl:rounded-bl-[38px] lg:shadow-[-25px_0_50px_-12px_rgba(0,0,0,0.5)] lg:border-l lg:border-amber-900/10 dark:lg:border-slate-800 transition-colors"
      >
        {/* Desktop Top Right: Back to Website Link */}
        <button
          onClick={onNavigateHome}
          className="absolute top-6 right-6 z-10 hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 transition-all border border-slate-200 dark:border-slate-700 shadow-2xs group cursor-pointer"
        >
          <Icon
            icon="solar:arrow-left-linear"
            className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
          />
          <span>Back to website</span>
        </button>

        {/* Mobile Header with Logo & Back Button */}
        <div className="lg:hidden p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 bg-[#FFFDF9]/90 dark:bg-[#0B0E14]/90 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onNavigateHome}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-sm active:scale-95 transition-all cursor-pointer"
              title="Back to Home"
            >
              <Icon icon="solar:arrow-left-linear" className="w-4 h-4 text-white" />
            </button>
            <Logo size="sm" clickable={false} />
          </div>
          <button
            onClick={onNavigateRegister}
            className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
          >
            Create Account
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-10 sm:px-6 md:px-10 lg:px-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: 30, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md sm:max-w-lg space-y-6 sm:space-y-7"
          >
            {/* Header Icon & Title */}
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 shadow-xs">
                <Icon
                  icon="solar:lock-keyhole-bold-duotone"
                  className="w-6 h-6 text-amber-600 dark:text-amber-400"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
                    Welcome{' '}
                    <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                      Back
                    </span>
                  </h2>

                  {/* Fast Demo Credentials Pill */}
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-700/50 rounded-full transition-colors cursor-pointer"
                    title="Click to fill test credentials"
                  >
                    <Icon icon="solar:magic-stick-3-bold" className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                    <span>Demo Auto-fill</span>
                  </button>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Enter your details to access your Pan-African financial workspace
                </p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleLogin}
              className={cn('space-y-4 sm:space-y-5', shaking && 'animate-shake')}
            >
              {/* Error Alert */}
              {errorMsg && (
                <Alert
                  type="error"
                  title="Sign In Failed"
                  message={errorMsg}
                  onClose={() => setErrorMsg(null)}
                />
              )}

              {/* Status Success Alert */}
              {status === 'success' && (
                <Alert
                  type="success"
                  title="Authenticated Successfully"
                  message="Connecting to your NOVA treasury console..."
                />
              )}

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-email"
                  className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Work Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Icon icon="solar:letter-bold-duotone" className="w-4 h-4" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="name@company.africa"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                      if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={cn(
                      'w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs',
                      fieldErrors.email
                        ? 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/20 text-rose-950 dark:text-rose-200'
                        : 'border-slate-300 dark:border-slate-700'
                    )}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
                    <Icon icon="solar:danger-circle-bold" className="w-3.5 h-3.5 shrink-0" />
                    <span>{fieldErrors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Icon icon="solar:lock-password-bold-duotone" className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your account password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg(null);
                      if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    className={cn(
                      'w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs',
                      fieldErrors.password
                        ? 'border-rose-400 bg-rose-50/50 dark:bg-rose-950/20 text-rose-950 dark:text-rose-200'
                        : 'border-slate-300 dark:border-slate-700'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <Icon icon="solar:eye-closed-bold" className="w-4 h-4" />
                    ) : (
                      <Icon icon="solar:eye-bold" className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400 flex items-center gap-1 mt-1">
                    <Icon icon="solar:danger-circle-bold" className="w-3.5 h-3.5 shrink-0" />
                    <span>{fieldErrors.password}</span>
                  </p>
                )}

                {/* Checkbox and Forgot Password Row */}
                <div className="flex items-center justify-between pt-1.5 text-xs">
                  <label
                    htmlFor="login-remember"
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                  >
                    <input
                      id="login-remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                    <span>Remember this device</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-amber-700 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 font-semibold transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={cn(
                  'flex w-full items-center justify-center gap-2 rounded-xl h-11 sm:h-12 text-xs sm:text-sm font-semibold text-white transition-all shadow-md active:scale-[0.99] cursor-pointer',
                  'bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:via-amber-700 hover:to-emerald-700 shadow-amber-900/10',
                  'disabled:opacity-60 disabled:cursor-not-allowed'
                )}
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <Icon icon="solar:spinner-line-duotone" className="w-4 h-4 animate-spin" />
                    Authenticating credentials...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Icon icon="solar:login-2-bold-duotone" className="w-4 h-4" />
                    Sign In to NOVA
                  </span>
                )}
              </button>
            </form>

            {/* Bottom Callout */}
            <div className="text-center pt-2">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Don't have an enterprise account?{' '}
                <button
                  type="button"
                  onClick={onNavigateRegister}
                  className="text-amber-700 dark:text-amber-400 font-bold hover:text-amber-900 dark:hover:text-amber-300 transition-colors underline-offset-4 hover:underline cursor-pointer"
                >
                  Open an Account
                </button>
              </p>
            </div>

            {/* Security Guarantee Badges */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-center gap-4 text-[11px] text-slate-400 dark:text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Icon icon="solar:shield-check-bold" className="w-3.5 h-3.5 text-emerald-500" />
                256-Bit Bank Grade SSL
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Icon icon="solar:lock-bold" className="w-3.5 h-3.5 text-amber-500" />
                SOC-2 & ISO 27001
              </span>
              <span>•</span>
              <span>NDPR & GDPR</span>
            </div>
          </motion.div>
        </div>

        {/* Footer Copyright */}
        <div className="text-center py-4 text-[10px] sm:text-xs text-slate-400 dark:text-slate-600 px-4">
          &copy; {new Date().getFullYear()} NOVA Financial Technologies Ltd. Pan-African Financial Operating System.
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      {forgotPasswordOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setForgotPasswordOpen(false);
                setForgotSent(false);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
            >
              <Icon icon="solar:close-circle-linear" className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
              <Icon icon="solar:key-minimalistic-square-bold-duotone" className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">Reset Password</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4 leading-relaxed">
              Enter your registered work email and we will send you a secure password reset link.
            </p>

            {forgotSent ? (
              <div className="space-y-4">
                <Alert
                  type="success"
                  title="Link Dispatched"
                  message={`Password reset instructions sent to ${forgotEmail}. Please check your inbox.`}
                />
                <button
                  type="button"
                  onClick={() => {
                    setForgotPasswordOpen(false);
                    setForgotSent(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="name@company.africa"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 text-white text-xs font-semibold cursor-pointer"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
