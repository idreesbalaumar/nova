import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Logo } from '@/modules/shared/components/Logo';
import { Alert } from '@/modules/shared/components/Alert';
import { cn } from '@/modules/shared/utils/cn';
import heroRight from '@/assets/hero_right.jpg';

interface RegisterPageProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onRegisterSuccess?: (accountData: any) => void;
}

const BUSINESS_CATEGORIES = [
  'Licensed Fintech / Payment Provider / MFB',
  'E-Commerce & Digital Marketplace',
  'Cross-Border Import / Export Enterprise',
  'Pan-African Corporate / Multinational',
  'Logistics & Supply Chain Platform',
  'Creator Economy & Freelance Agency',
];

const OPERATING_COUNTRIES = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', currency: 'GHS' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', currency: 'EGP' },
  { code: 'UK', name: 'United Kingdom / Diaspora', flag: '🇬🇧', currency: 'GBP' },
];

const VOLUME_TIERS = [
  'Under $50,000 / month',
  '$50,000 – $250,000 / month',
  '$250,000 – $1,000,000 / month',
  '$1,000,000+ / month (Enterprise Priority)',
];

const STEPS = [
  {
    id: 1,
    icon: 'solar:buildings-2-bold-duotone',
    title: 'Business Profile',
    description: 'Registered company & market',
  },
  {
    id: 2,
    icon: 'solar:letter-bold-duotone',
    title: 'Work Email & OTP',
    description: 'Instant 6-digit validation',
  },
  {
    id: 3,
    icon: 'solar:shield-user-bold-duotone',
    title: 'Admin & Corridors',
    description: 'Security & settlement rails',
  },
  {
    id: 4,
    icon: 'solar:verified-check-bold-duotone',
    title: 'Review & Activate',
    description: 'Verify details & launch',
  },
];

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onNavigateHome,
  onNavigateLogin,
  onRegisterSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [businessName, setBusinessName] = useState('');
  const [businessCategory, setBusinessCategory] = useState(BUSINESS_CATEGORIES[0]);
  const [country, setCountry] = useState(OPERATING_COUNTRIES[0].name);
  const [volumeTier, setVolumeTier] = useState(VOLUME_TIERS[1]);

  const [email, setEmail] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('+234');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCorridors, setSelectedCorridors] = useState<string[]>(['NGN', 'KES', 'USD', 'GBP']);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Status & Feedback
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [shaking, setShaking] = useState(false);

  // Cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const triggerShake = () => {
    setShaking(false);
    requestAnimationFrame(() => {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    });
  };

  const toggleCorridor = (code: string) => {
    if (selectedCorridors.includes(code)) {
      if (selectedCorridors.length > 1) {
        setSelectedCorridors(selectedCorridors.filter((c) => c !== code));
      }
    } else {
      setSelectedCorridors([...selectedCorridors, code]);
    }
  };

  // Demo auto-fill helpers
  const handleAutoFillDemo = () => {
    setBusinessName('Afrigate Global Logistics Ltd');
    setBusinessCategory(BUSINESS_CATEGORIES[1]);
    setCountry('Nigeria');
    setVolumeTier(VOLUME_TIERS[2]);
    setEmail('operations@afrigate-logistics.africa');
    setPhone('8091234567');
    setFirstName('Amina');
    setLastName('Adeyemi');
    setPassword('NovaAfricanOS#2026');
    setConfirmPassword('NovaAfricanOS#2026');
    setAgreeTerms(true);
    setEmailVerified(true);
    setOtpSent(true);
    setOtpCode('849201');
    setFieldErrors({});
    setErrorMsg(null);
    setInfoMsg('Demo credentials populated for fast testing!');
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const errors: Record<string, string> = {};
    if (!businessName.trim()) {
      errors.businessName = 'Registered company or entity name is required.';
    } else if (businessName.trim().length < 3) {
      errors.businessName = 'Company name must be at least 3 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 2 Validation & OTP
  const handleSendOtp = () => {
    const errors: Record<string, string> = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      errors.email = 'Corporate email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please provide a valid work email format.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      triggerShake();
      return;
    }

    setStatus('loading');
    setErrorMsg(null);

    setTimeout(() => {
      setStatus('idle');
      setOtpSent(true);
      setResendCooldown(60);
      setInfoMsg(`Verification code sent to ${trimmedEmail}. You can click "Auto-fill OTP" for testing.`);
    }, 700);
  };

  const handleVerifyOtp = () => {
    if (otpCode.length !== 6) {
      setFieldErrors({ otp: 'Please enter the complete 6-digit numeric verification code.' });
      triggerShake();
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('idle');
      setEmailVerified(true);
      setInfoMsg('Email address verified successfully!');
      setFieldErrors({});
      setCurrentStep(3);
    }, 600);
  };

  const validateStep2 = () => {
    if (!emailVerified) {
      if (!otpSent) {
        handleSendOtp();
      } else if (otpCode.length !== 6) {
        setFieldErrors({ otp: 'Please enter the 6-digit verification code.' });
        triggerShake();
      } else {
        handleVerifyOtp();
      }
      return false;
    }
    return true;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    const errors: Record<string, string> = {};
    if (!firstName.trim()) errors.firstName = 'Administrator first name is required.';
    if (!lastName.trim()) errors.lastName = 'Administrator last name is required.';

    if (!password) {
      errors.password = 'Account password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      errors.agreeTerms = 'You must agree to the Terms of Service & AML Compliance to proceed.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step Handlers
  const handleNext = () => {
    setErrorMsg(null);
    setInfoMsg(null);

    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
      else triggerShake();
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
      else triggerShake();
    }
  };

  const handleFinalSubmit = () => {
    setStatus('loading');
    setErrorMsg(null);

    setTimeout(() => {
      setStatus('success');
      if (onRegisterSuccess) {
        onRegisterSuccess({
          businessName,
          businessCategory,
          country,
          email,
          firstName,
          lastName,
          selectedCorridors,
        });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex font-sans relative bg-[#070A10] overflow-hidden selection:bg-amber-500/20 selection:text-amber-800">
      {/* Background Image on Left Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block absolute top-0 bottom-0 left-0 w-[450px] xl:w-[500px] 2xl:w-[540px] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${heroRight})` }}
      >
        <div className="absolute inset-0 bg-[#070A10]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A10]/95 via-[#070A10]/45 to-[#070A10]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_60%)]" />
      </motion.div>

      {/* Left Sidebar Content */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex flex-col w-[380px] xl:w-[440px] 2xl:w-[480px] relative z-10 shrink-0 min-h-screen"
      >
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Top Logo */}
          <div className="px-8 pt-7 pb-4 flex items-center">
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
          </div>

          {/* Stepper Navigation */}
          <div className="flex-1 flex flex-col justify-center px-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold mb-2">
                <Icon icon="solar:shield-check-bold" className="w-3.5 h-3.5" />
                <span>Instant Merchant Onboarding</span>
              </div>
              <h1 className="text-xl xl:text-2xl font-bold text-white tracking-tight">
                Enterprise Registration
              </h1>
              <p className="text-xs text-slate-300/80 mt-1 leading-relaxed">
                Configure your multi-currency business account & access Pan-African liquidity in minutes.
              </p>
            </div>

            {/* Stepper Items (Matching Charity Grants HQ) */}
            <nav className="space-y-0">
              {STEPS.map((step, index) => {
                const isCompleted = step.id < currentStep;
                const isActive = step.id === currentStep;
                const isLast = index === STEPS.length - 1;

                return (
                  <div key={step.id} className="flex gap-4">
                    {/* Icon + Connector Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300',
                          isCompleted && 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30',
                          isCompleted && isActive && 'ring-2 ring-emerald-300 shadow-emerald-500/40',
                          !isCompleted && isActive && 'bg-amber-500 text-white ring-2 ring-amber-300 shadow-md',
                          !isActive && !isCompleted && 'bg-white/10 text-white/50'
                        )}
                      >
                        {isCompleted ? (
                          <Icon icon="solar:check-circle-bold" className="w-5 h-5 text-white" />
                        ) : (
                          <Icon icon={step.icon} className="w-5 h-5" />
                        )}
                      </div>
                      {!isLast && (
                        <div
                          className={cn(
                            'w-[2px] h-8 my-1 rounded-full transition-all duration-300',
                            isCompleted ? 'bg-emerald-500' : 'bg-white/20'
                          )}
                        />
                      )}
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="pt-1">
                      <p
                        className={cn(
                          'text-xs xl:text-sm font-semibold transition-colors',
                          isActive ? 'text-white font-bold' : isCompleted ? 'text-white/95' : 'text-white/50'
                        )}
                      >
                        {step.title}
                      </p>
                      <p
                        className={cn(
                          'text-[11px] xl:text-xs mt-0.5 transition-colors',
                          isActive ? 'text-amber-200/90' : 'text-white/40'
                        )}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Security / Regulatory Badge */}
          <div className="px-8 pb-8">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-[11px] text-slate-300/80 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Icon icon="solar:shield-check-bold" className="w-4 h-4 text-emerald-400" />
                <span>Bank-Grade Central Bank Adherence</span>
              </div>
              <p className="text-[10.5px] leading-relaxed">
                Operating across licensed settlement nodes in Nigeria, Kenya, Ghana, and South Africa with zero hidden foreign exchange spread.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form Canvas */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col min-h-screen bg-[#FFFDF9] dark:bg-[#0B0E14] relative z-20 lg:rounded-tl-[32px] lg:rounded-bl-[32px] xl:rounded-tl-[38px] xl:rounded-bl-[38px] lg:shadow-[-25px_0_50px_-12px_rgba(0,0,0,0.5)] lg:border-l lg:border-amber-900/10 dark:lg:border-slate-800 transition-colors"
      >
        {/* Desktop Top Right: Back to Website Link & Auto-fill */}
        <div className="absolute top-6 right-6 z-30 hidden lg:flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900/80 transition-all border border-amber-300 dark:border-amber-700/60 shadow-2xs cursor-pointer"
            title="Populate test business information"
          >
            <Icon icon="solar:magic-stick-3-bold" className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Demo Auto-fill</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 transition-all border border-slate-200 dark:border-slate-700 shadow-2xs group cursor-pointer"
          >
            <Icon
              icon="solar:arrow-left-linear"
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
            />
            <span>Back to website</span>
          </button>
        </div>

        {/* Mobile Header with Step Progress */}
        <div className="lg:hidden p-3.5 sm:p-4 border-b border-slate-200/80 dark:border-slate-800 bg-[#FFFDF9]/90 dark:bg-[#0B0E14]/90 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onNavigateHome}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-emerald-600 text-white shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <Icon icon="solar:arrow-left-linear" className="w-4 h-4 text-white" />
            </button>
            <Logo size="sm" clickable={false} />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
              Step {currentStep} of 4
            </span>
            <button
              type="button"
              onClick={handleAutoFillDemo}
              className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold underline cursor-pointer"
            >
              Fill Demo
            </button>
          </div>
        </div>

        {/* Main Step Form Canvas */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 sm:px-6 md:px-10 lg:px-12 overflow-y-auto">
          <div className="w-full max-w-lg space-y-6">
            {/* Step Progress Line for Mobile & Tablet */}
            <div className="lg:hidden w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>

            {/* Notification Alerts */}
            {errorMsg && (
              <Alert
                type="error"
                title="Registration Notice"
                message={errorMsg}
                onClose={() => setErrorMsg(null)}
              />
            )}
            {infoMsg && (
              <Alert
                type="info"
                message={infoMsg}
                onClose={() => setInfoMsg(null)}
                autoClose={true}
              />
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* STEP 1: BUSINESS PROFILE */}
            {/* ───────────────────────────────────────────────────────────── */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn('space-y-5', shaking && 'animate-shake')}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 shadow-xs">
                    <Icon icon="solar:buildings-2-bold-duotone" className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
                      Business{' '}
                      <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                        Profile
                      </span>
                    </h2>
                    <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Tell us about your registered company and cross-border operations
                    </p>
                  </div>
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Registered Entity Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Icon icon="solar:shop-bold-duotone" className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Afrigate Logistics Global Ltd"
                      value={businessName}
                      onChange={(e) => {
                        setBusinessName(e.target.value);
                        if (fieldErrors.businessName) setFieldErrors((prev) => ({ ...prev, businessName: '' }));
                      }}
                      className={cn(
                        'w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs',
                        fieldErrors.businessName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 dark:border-slate-700'
                      )}
                    />
                  </div>
                  {fieldErrors.businessName && (
                    <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                      <Icon icon="solar:danger-circle-bold" className="w-3.5 h-3.5" />
                      <span>{fieldErrors.businessName}</span>
                    </p>
                  )}
                </div>

                {/* Category Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Business Model / Operating Category <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={businessCategory}
                      onChange={(e) => setBusinessCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs"
                    >
                      {BUSINESS_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Primary Operating Country */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Primary Regional Headquarters <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {OPERATING_COUNTRIES.map((c) => (
                      <button
                        type="button"
                        key={c.code}
                        onClick={() => setCountry(c.name)}
                        className={cn(
                          'flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-left',
                          country === c.name
                            ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-amber-900 dark:text-amber-200 shadow-xs ring-1 ring-amber-500'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        )}
                      >
                        <span className="text-base">{c.flag}</span>
                        <div className="min-w-0">
                          <p className="truncate leading-tight">{c.name.split('/')[0]}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{c.currency}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimated Monthly Cross-Border Volume */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Expected Monthly Settlement Volume
                  </label>
                  <select
                    value={volumeTier}
                    onChange={(e) => setVolumeTier(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs"
                  >
                    {VOLUME_TIERS.map((tier) => (
                      <option key={tier} value={tier}>
                        {tier}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Continue to Email Verification</span>
                  <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* STEP 2: WORK EMAIL & OTP */}
            {/* ───────────────────────────────────────────────────────────── */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn('space-y-5', shaking && 'animate-shake')}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 shadow-xs">
                    <Icon icon="solar:letter-bold-duotone" className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
                      Work Email &{' '}
                      <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                        Security OTP
                      </span>
                    </h2>
                    <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">
                      We verify business identities to ensure secure cross-border routing
                    </p>
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Corporate Work Email <span className="text-rose-500">*</span>
                    </label>
                    {emailVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <Icon icon="solar:verified-check-bold" className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Icon icon="solar:letter-bold-duotone" className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        disabled={emailVerified}
                        placeholder="operations@company.africa"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        className={cn(
                          'w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-2xs disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:opacity-80',
                          fieldErrors.email ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 dark:border-slate-700'
                        )}
                      />
                    </div>
                    {!emailVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={status === 'loading' || resendCooldown > 0}
                        className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                      >
                        {status === 'loading' ? (
                          <Icon icon="solar:spinner-line-duotone" className="w-4 h-4 animate-spin" />
                        ) : resendCooldown > 0 ? (
                          `${resendCooldown}s`
                        ) : otpSent ? (
                          'Resend'
                        ) : (
                          'Send OTP'
                        )}
                      </button>
                    )}
                  </div>
                  {fieldErrors.email && (
                    <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1 mt-1">
                      <Icon icon="solar:danger-circle-bold" className="w-3.5 h-3.5" />
                      <span>{fieldErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Primary Contact Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={phonePrefix}
                      onChange={(e) => setPhonePrefix(e.target.value)}
                      className="w-28 px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="+234">🇳🇬 +234</option>
                      <option value="+254">🇰🇪 +254</option>
                      <option value="+233">🇬🇭 +233</option>
                      <option value="+27">🇿🇦 +27</option>
                      <option value="+20">🇪🇬 +20</option>
                      <option value="+44">🇬🇧 +44</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="801 234 5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* 6-Digit OTP Input Box (Charity Grants Style) */}
                {otpSent && !emailVerified && (
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-amber-950 dark:text-amber-200">
                        Enter 6-Digit Code
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpCode('849201')}
                        className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                      >
                        Auto-fill code (849201)
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        placeholder="••••••"
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-center tracking-[0.5em] text-lg font-mono font-bold py-2.5 rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                    {fieldErrors.otp && (
                      <p className="text-[11px] font-medium text-rose-600 flex items-center gap-1">
                        <Icon icon="solar:danger-circle-bold" className="w-3.5 h-3.5" />
                        <span>{fieldErrors.otp}</span>
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Verify Code & Continue
                    </button>
                  </div>
                )}

                {/* Buttons Navigation */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>{emailVerified ? 'Continue to Admin Credentials' : 'Verify & Continue'}</span>
                    <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* STEP 3: ADMINISTRATOR & RAILS */}
            {/* ───────────────────────────────────────────────────────────── */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={cn('space-y-5', shaking && 'animate-shake')}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 shadow-xs">
                    <Icon icon="solar:shield-user-bold-duotone" className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
                      Admin &{' '}
                      <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                        Settlement Rails
                      </span>
                    </h2>
                    <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Create primary administrator account & select settlement corridors
                    </p>
                  </div>
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                      First Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Amina"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                    {fieldErrors.firstName && (
                      <p className="text-[11px] font-medium text-rose-600">{fieldErrors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Last Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Adeyemi"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                    {fieldErrors.lastName && (
                      <p className="text-[11px] font-medium text-rose-600">{fieldErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Target Currencies & Settlement Corridors */}
                <div className="space-y-2">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Primary Settlement Corridors (Select all needed)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { code: 'NGN', label: '🇳🇬 NGN (Nigeria Naira)' },
                      { code: 'KES', label: '🇰🇪 KES (Kenya Shilling)' },
                      { code: 'GHS', label: '🇬🇭 GHS (Ghana Cedi)' },
                      { code: 'ZAR', label: '🇿🇦 ZAR (South Africa Rand)' },
                      { code: 'USD', label: '🇺🇸 USD (US Dollar)' },
                      { code: 'GBP', label: '🇬🇧 GBP (British Pound)' },
                      { code: 'EUR', label: '🇪🇺 EUR (Euro)' },
                    ].map((corridor) => {
                      const isSelected = selectedCorridors.includes(corridor.code);
                      return (
                        <button
                          type="button"
                          key={corridor.code}
                          onClick={() => toggleCorridor(corridor.code)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5',
                            isSelected
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-300 font-bold ring-1 ring-emerald-500/50'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                          )}
                        >
                          <Icon
                            icon={isSelected ? 'solar:check-circle-bold' : 'solar:add-circle-linear'}
                            className="w-3.5 h-3.5"
                          />
                          <span>{corridor.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Password Fields */}
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Master Workspace Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Minimum 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                      >
                        <Icon icon={showPassword ? 'solar:eye-closed-bold' : 'solar:eye-bold'} className="w-4 h-4" />
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="text-[11px] font-medium text-rose-600">{fieldErrors.password}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
                    />
                    {fieldErrors.confirmPassword && (
                      <p className="text-[11px] font-medium text-rose-600">{fieldErrors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-400">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-amber-600 focus:ring-amber-500 cursor-pointer"
                    />
                    <span>
                      I certify I am authorized to bind this entity and agree to NOVA’s{' '}
                      <span className="text-amber-700 dark:text-amber-400 font-semibold underline">
                        Terms of Service
                      </span>
                      ,{' '}
                      <span className="text-amber-700 dark:text-amber-400 font-semibold underline">
                        AML/KYC Policy
                      </span>{' '}
                      and Data Privacy protocols.
                    </span>
                  </label>
                  {fieldErrors.agreeTerms && (
                    <p className="text-[11px] font-medium text-rose-600 mt-1">{fieldErrors.agreeTerms}</p>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>Review Account Details</span>
                    <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ───────────────────────────────────────────────────────────── */}
            {/* STEP 4: REVIEW & ACTIVATE */}
            {/* ───────────────────────────────────────────────────────────── */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400 shadow-xs">
                    <Icon icon="solar:verified-check-bold-duotone" className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white">
                      Review &{' '}
                      <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                        Activate
                      </span>
                    </h2>
                    <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Confirm your business configuration before provisioning your liquidity nodes
                    </p>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Entity Name
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{businessName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{businessCategory}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                      {country}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Lead Administrator</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {firstName} {lastName}
                      </p>
                      <p className="text-slate-500 text-[11px] truncate">{email}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Monthly Volume Tier</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{volumeTier}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1.5">
                      Active Settlement Corridors
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCorridors.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/60 text-[11px] font-mono font-bold text-amber-800 dark:text-amber-300"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Provisioning Notice */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-2.5">
                    <Icon icon="solar:code-square-bold" className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>
                      Instant sandbox API credentials (`nova_test_pk_...`) will be issued upon activation.
                    </span>
                  </div>
                </div>

                {/* Final Submit & Navigation */}
                <div className="space-y-3 pt-1">
                  <button
                    type="button"
                    disabled={status === 'loading' || status === 'success'}
                    onClick={handleFinalSubmit}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <Icon icon="solar:spinner-line-duotone" className="w-4 h-4 animate-spin" />
                        Provisioning Pan-African Liquidity Rails...
                      </span>
                    ) : status === 'success' ? (
                      <span className="flex items-center gap-2">
                        <Icon icon="solar:check-circle-bold" className="w-4 h-4" />
                        Workspace Activated!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Icon icon="solar:rocket-bold-duotone" className="w-4 h-4" />
                        Activate Account & Launch Console
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="w-full py-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white font-semibold transition-colors cursor-pointer"
                  >
                    Edit previous step
                  </button>
                </div>

                {/* Success Modal / Banner */}
                {status === 'success' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-center space-y-3 animate-in zoom-in-95">
                    <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <Icon icon="solar:check-circle-bold" className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                        Welcome to NOVA, {businessName}!
                      </h4>
                      <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                        Your multi-currency rails are active. You can now access your sandbox console.
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center pt-1">
                      <button
                        onClick={onNavigateHome}
                        className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 cursor-pointer"
                      >
                        Enter NOVA Workspace
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Bottom Switcher: Already Have Account? */}
            <div className="text-center pt-2">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Already have a verified NOVA account?{' '}
                <button
                  type="button"
                  onClick={onNavigateLogin}
                  className="text-amber-700 dark:text-amber-400 font-bold hover:text-amber-900 dark:hover:text-amber-300 transition-colors underline-offset-4 hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="text-center py-4 text-[10px] sm:text-xs text-slate-400 dark:text-slate-600 px-4">
          &copy; {new Date().getFullYear()} NOVA Financial Technologies Ltd. Pan-African Financial Operating System.
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
