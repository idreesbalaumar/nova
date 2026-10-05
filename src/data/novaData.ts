export interface NetworkNode {
  id: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  type: string;
  tps: string;
  latency: string;
  reserves: string;
  status: 'optimal' | 'high_volume' | 'calibrating';
  description: string;
  xPercent: number; // percentage in relative map canvas
  yPercent: number;
  svgX: number;
  svgY: number;
  badgeOffsetX: number;
  badgeOffsetY: number;
  badgeWidth?: number;
  connections: string[]; // node IDs it connects to
  activePairs: string[];
}

export const NETWORK_NODES: NetworkNode[] = [
  {
    id: 'lagos',
    name: 'Lagos Core Gateway',
    city: 'Lagos',
    country: 'Nigeria',
    flag: '🇳🇬',
    type: 'Tier-1 Clearing & Settlement Engine',
    tps: '18,420 TPS',
    latency: '24ms',
    reserves: '$284.5M',
    status: 'optimal',
    description: 'Direct integration with NIBSS & commercial banking switches. High-frequency routing for sub-Saharan Africa.',
    xPercent: 38.8,
    yPercent: 59.3,
    svgX: 422,
    svgY: 522,
    badgeOffsetX: -22,
    badgeOffsetY: 7,
    badgeWidth: 44,
    connections: ['abuja', 'accra', 'nairobi', 'london'],
    activePairs: ['NGN/USD', 'NGN/GBP', 'NGN/EUR', 'NGN/KES'],
  },
  {
    id: 'abuja',
    name: 'Abuja Sovereign Switch',
    city: 'Abuja',
    country: 'Nigeria',
    flag: '🇳🇬',
    type: 'Sovereign Liquidity & Regulatory Node',
    tps: '5,210 TPS',
    latency: '29ms',
    reserves: '$92.3M',
    status: 'optimal',
    description: 'Dedicated regulatory reporting gateway with real-time statutory compliance and central bank settlement rail.',
    xPercent: 41.2,
    yPercent: 54.5,
    svgX: 430,
    svgY: 508,
    badgeOffsetX: 7,
    badgeOffsetY: -15,
    badgeWidth: 44,
    connections: ['lagos', 'accra'],
    activePairs: ['NGN/USD', 'NGN/XOF'],
  },
  {
    id: 'accra',
    name: 'Accra Clearing Pool',
    city: 'Accra',
    country: 'Ghana',
    flag: '🇬🇭',
    type: 'West Africa Multilateral Rail',
    tps: '8,940 TPS',
    latency: '36ms',
    reserves: '$118.0M',
    status: 'optimal',
    description: 'GhIPSS direct inter-switch bridge supporting instant cross-border cedi settlement and mobile money interoperability.',
    xPercent: 33.2,
    yPercent: 57.6,
    svgX: 403,
    svgY: 517,
    badgeOffsetX: -48,
    badgeOffsetY: -7,
    badgeWidth: 44,
    connections: ['lagos', 'london'],
    activePairs: ['GHS/USD', 'GHS/NGN', 'GHS/EUR'],
  },
  {
    id: 'nairobi',
    name: 'Nairobi Silicon Savanna Switch',
    city: 'Nairobi',
    country: 'Kenya',
    flag: '🇰🇪',
    type: 'East Africa High-Speed Hub',
    tps: '14,600 TPS',
    latency: '31ms',
    reserves: '$198.4M',
    status: 'optimal',
    description: 'Instant mobile network operator bridge (M-Pesa, Airtel) with East African Payment System (EAPS) integration.',
    xPercent: 62.1,
    yPercent: 62.1,
    svgX: 501,
    svgY: 530,
    badgeOffsetX: 7,
    badgeOffsetY: -7,
    badgeWidth: 48,
    connections: ['lagos', 'london', 'kigali', 'johannesburg'],
    activePairs: ['KES/USD', 'KES/GBP', 'KES/NGN', 'KES/RWF'],
  },
  {
    id: 'kigali',
    name: 'Kigali Innovation Corridor',
    city: 'Kigali',
    country: 'Rwanda',
    flag: '🇷🇼',
    type: 'Pan-African Fintech Sandbox Rail',
    tps: '4,100 TPS',
    latency: '38ms',
    reserves: '$64.2M',
    status: 'optimal',
    description: 'High-speed automated compliance testing & digital asset liquidity bridge for Francophone & EAC corridors.',
    xPercent: 56.2,
    yPercent: 64.1,
    svgX: 481,
    svgY: 536,
    badgeOffsetX: -48,
    badgeOffsetY: 6,
    badgeWidth: 44,
    connections: ['nairobi'],
    activePairs: ['RWF/USD', 'RWF/KES'],
  },
  {
    id: 'johannesburg',
    name: 'Johannesburg SADC Hub',
    city: 'Johannesburg',
    country: 'South Africa',
    flag: '🇿🇦',
    type: 'Southern Africa Institutional Vault',
    tps: '12,800 TPS',
    latency: '52ms',
    reserves: '$210.8M',
    status: 'optimal',
    description: 'SADC Real-Time Gross Settlement System (SIRESS) and Rand-denominated treasury liquidity pipeline.',
    xPercent: 53.5,
    yPercent: 87.6,
    svgX: 472,
    svgY: 604,
    badgeOffsetX: -36,
    badgeOffsetY: 7,
    badgeWidth: 72,
    connections: ['nairobi', 'lagos', 'london'],
    activePairs: ['ZAR/USD', 'ZAR/GBP', 'ZAR/NGN'],
  },
  {
    id: 'london',
    name: 'London Global Conduit',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    type: 'Global FX Clearing & Treasury Conduit',
    tps: '26,500 TPS',
    latency: '112ms',
    reserves: '$450.0M',
    status: 'high_volume',
    description: 'Cross-continental settlement conduit connecting European capital markets directly with African liquidity nodes.',
    xPercent: 32.6,
    yPercent: 11.0,
    svgX: 401,
    svgY: 382,
    badgeOffsetX: -24,
    badgeOffsetY: -18,
    badgeWidth: 48,
    connections: ['lagos', 'nairobi', 'accra', 'johannesburg'],
    activePairs: ['GBP/NGN', 'GBP/KES', 'USD/NGN', 'EUR/GHS'],
  },
  {
    id: 'cairo',
    name: 'Cairo North Africa Rail',
    city: 'Cairo',
    country: 'Egypt',
    flag: '🇪🇬',
    type: 'North Africa & MENA Gateway',
    tps: '11,200 TPS',
    latency: '34ms',
    reserves: '$145.0M',
    status: 'optimal',
    description: 'Bilateral settlement bridge connecting North Africa and Arabian Gulf liquidity corridors into West & East Africa.',
    xPercent: 55.9,
    yPercent: 37.2,
    svgX: 480,
    svgY: 458,
    badgeOffsetX: 7,
    badgeOffsetY: -12,
    badgeWidth: 44,
    connections: ['lagos', 'nairobi', 'london'],
    activePairs: ['EGP/NGN', 'EGP/USD', 'EGP/KES'],
  },
];

export interface Transaction {
  id: string;
  timestamp: string;
  sender: string;
  recipient: string;
  originCity: string;
  originFlag: string;
  destCity: string;
  destFlag: string;
  sourceAmount: string;
  sourceCurrency: string;
  settledAmount: string;
  settledCurrency: string;
  targetAmount?: string;
  targetCurrency?: string;
  fxRate: string;
  status: 'settled' | 'clearing' | 'in_flight';
  latencyMs: number;
  hash: string;
  feeSaved: string;
  route?: string[];
  merkleProof?: string;
  complianceStatus?: 'verified' | 'flagged' | 'pending';
}

export const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_99214',
    timestamp: 'Just now',
    sender: 'Safaricom B2B Treasury',
    recipient: 'Access Bank Treasury',
    originCity: 'Nairobi',
    originFlag: '🇰🇪',
    destCity: 'Lagos',
    destFlag: '🇳🇬',
    sourceAmount: 'KES 42,500,000',
    sourceCurrency: 'KES',
    settledAmount: '₦488,750,000',
    settledCurrency: 'NGN',
    fxRate: '1 KES = 11.50 NGN',
    status: 'settled',
    latencyMs: 340,
    hash: '0x7f4a...92bc',
    feeSaved: '$4,280 saved vs SWIFT',
  },
  {
    id: 'tx_99213',
    timestamp: '14s ago',
    sender: 'Standard Chartered UK',
    recipient: 'Flutterwave Enterprise',
    originCity: 'London',
    originFlag: '🇬🇧',
    destCity: 'Lagos',
    destFlag: '🇳🇬',
    sourceAmount: '£850,000',
    sourceCurrency: 'GBP',
    settledAmount: '₦1,650,700,000',
    settledCurrency: 'NGN',
    fxRate: '1 GBP = 1,942 NGN',
    status: 'settled',
    latencyMs: 412,
    hash: '0x3c2e...b541',
    feeSaved: '$12,450 saved vs SWIFT',
  },
  {
    id: 'tx_99212',
    timestamp: '42s ago',
    sender: 'Ecobank Ghana CIB',
    recipient: 'Equity Bank Group',
    originCity: 'Accra',
    originFlag: '🇬🇭',
    destCity: 'Nairobi',
    destFlag: '🇰🇪',
    sourceAmount: 'GH₵ 3,200,000',
    sourceCurrency: 'GHS',
    settledAmount: 'KES 26,880,000',
    settledCurrency: 'KES',
    fxRate: '1 GHS = 8.40 KES',
    status: 'settled',
    latencyMs: 290,
    hash: '0x8891...fa20',
    feeSaved: '$2,190 saved vs SWIFT',
  },
  {
    id: 'tx_99211',
    timestamp: '1m ago',
    sender: 'British International Investment',
    recipient: 'Bank of Industry Sovereign Fund',
    originCity: 'London',
    originFlag: '🇬🇧',
    destCity: 'Abuja',
    destFlag: '🇳🇬',
    sourceAmount: '$2,400,000',
    sourceCurrency: 'USD',
    settledAmount: '₦3,571,200,000',
    settledCurrency: 'NGN',
    fxRate: '1 USD = 1,488 NGN',
    status: 'settled',
    latencyMs: 388,
    hash: '0x10ae...49c3',
    feeSaved: '$28,900 saved vs SWIFT',
  },
  {
    id: 'tx_99210',
    timestamp: '2m ago',
    sender: 'MTN Mobile Money FinTech',
    recipient: 'KCB Bank Rwanda',
    originCity: 'Nairobi',
    originFlag: '🇰🇪',
    destCity: 'Kigali',
    destFlag: '🇷🇼',
    sourceAmount: 'KES 18,000,000',
    sourceCurrency: 'KES',
    settledAmount: 'RWF 187,200,000',
    settledCurrency: 'RWF',
    fxRate: '1 KES = 10.40 RWF',
    status: 'settled',
    latencyMs: 195,
    hash: '0x44aa...dd19',
    feeSaved: '$1,650 saved vs SWIFT',
  },
  {
    id: 'tx_99209',
    timestamp: '3m ago',
    sender: 'Moniepoint Corporate',
    recipient: 'Rand Merchant Bank',
    originCity: 'Lagos',
    originFlag: '🇳🇬',
    destCity: 'Johannesburg',
    destFlag: '🇿🇦',
    sourceAmount: '₦820,000,000',
    sourceCurrency: 'NGN',
    settledAmount: 'ZAR 9,840,000',
    settledCurrency: 'ZAR',
    fxRate: '1 ZAR = 83.33 NGN',
    status: 'settled',
    latencyMs: 320,
    hash: '0x992b...e8f1',
    feeSaved: '$7,800 saved vs SWIFT',
  },
];

export interface WalletBalance {
  currency: string;
  symbol: string;
  code: string;
  flag: string;
  balance: string;
  usdEquivalent: string;
  dayChangePercent: number;
  availableYield: string;
  reserveBacking: string;
}

export const MULTI_CURRENCY_WALLETS: WalletBalance[] = [
  {
    currency: 'US Dollar',
    symbol: '$',
    code: 'USD',
    flag: '🇺🇸',
    balance: '4,850,230.40',
    usdEquivalent: '$4,850,230.40',
    dayChangePercent: 3.2,
    availableYield: '5.4% APY',
    reserveBacking: '100% US Treasury T-Bills',
  },
  {
    currency: 'Nigerian Naira',
    symbol: '₦',
    code: 'NGN',
    flag: '🇳🇬',
    balance: '1,842,500,000.00',
    usdEquivalent: '$1,238,159.22',
    dayChangePercent: 8.7,
    availableYield: '14.8% APY',
    reserveBacking: 'CBN Repo & Commercial Paper',
  },
  {
    currency: 'Kenyan Shilling',
    symbol: 'KSh',
    code: 'KES',
    flag: '🇰🇪',
    balance: '184,200,000.00',
    usdEquivalent: '$1,423,500.00',
    dayChangePercent: 1.4,
    availableYield: '11.2% APY',
    reserveBacking: 'CBK Treasury Bonds',
  },
  {
    currency: 'Ghanaian Cedi',
    symbol: 'GH₵',
    code: 'GHS',
    flag: '🇬🇭',
    balance: '9,450,000.00',
    usdEquivalent: '$594,339.62',
    dayChangePercent: -0.6,
    availableYield: '18.1% APY',
    reserveBacking: 'Bank of Ghana Notes',
  },
  {
    currency: 'British Pound',
    symbol: '£',
    code: 'GBP',
    flag: '🇬🇧',
    balance: '1,420,000.00',
    usdEquivalent: '$1,846,000.00',
    dayChangePercent: 0.9,
    availableYield: '4.9% APY',
    reserveBacking: 'Bank of England Gilts',
  },
  {
    currency: 'South African Rand',
    symbol: 'R',
    code: 'ZAR',
    flag: '🇿🇦',
    balance: '18,500,000.00',
    usdEquivalent: '$1,048,158.64',
    dayChangePercent: 2.1,
    availableYield: '8.4% APY',
    reserveBacking: 'SARB Overnight Call',
  },
];

export const VOLUME_CHART_DATA = [
  { time: '00:00', volume: 14.2, settlements: 1240, latency: 310 },
  { time: '03:00', volume: 8.9, settlements: 820, latency: 280 },
  { time: '06:00', volume: 22.4, settlements: 2190, latency: 330 },
  { time: '09:00', volume: 48.7, settlements: 4620, latency: 390 },
  { time: '12:00', volume: 64.1, settlements: 5800, latency: 420 },
  { time: '15:00', volume: 72.8, settlements: 6450, latency: 370 },
  { time: '18:00', volume: 55.3, settlements: 4980, latency: 340 },
  { time: '21:00', volume: 38.6, settlements: 3210, latency: 300 },
];

export const CORRIDOR_DISTRIBUTION_DATA = [
  { name: 'London ⇄ Lagos', value: 38, color: '#00F5A0' },
  { name: 'Nairobi ⇄ Lagos', value: 24, color: '#00D2FF' },
  { name: 'Accra ⇄ London', value: 16, color: '#FFB800' },
  { name: 'Nairobi ⇄ Kigali', value: 12, color: '#8B5CF6' },
  { name: 'Joburg ⇄ Lagos', value: 10, color: '#EC4899' },
];

export interface AIPromptSuggestion {
  id: string;
  title: string;
  category: 'Risk' | 'Optimization' | 'Anomaly' | 'Liquidity';
  prompt: string;
  response: {
    summary: string;
    details: string[];
    riskScore: 'Low' | 'Medium' | 'Elevated';
    recommendedAction: string;
    actionButtonText: string;
    impactMetric: string;
  };
}

export const AI_PROMPT_PRESETS: AIPromptSuggestion[] = [
  {
    id: 'anomaly_london_lagos',
    title: 'Surge in Lagos-London Volume',
    category: 'Anomaly',
    prompt: 'Detect unusual transaction patterns and settlement volume on the Lagos ⇄ London corridor over the last 4 hours.',
    response: {
      summary: 'NOVA AI detected a +148% surge in high-value settlements ($1.8M - $4.5M tier) between London institutional conduits and Tier-1 Nigerian banks between 09:30 and 11:45 UTC.',
      details: [
        'Root Cause: Sovereign debt coupon re-investment & multinational dividend repatriations clearing ahead of UK market close.',
        'Network Impact: Lagos liquidity pool utilization reached 84.2%. Dynamic buffer routing automatically diverted $14M via Accra auxiliary rails to preserve sub-400ms SLA.',
        'Fraud Risk: Zero anomalous signatures. All 14 transactions validated through 3-of-5 MPC threshold signatures with verified CBN Form A/M attestations.',
      ],
      riskScore: 'Low',
      recommendedAction: 'Inject $15M auxiliary liquidity into Lagos-London smart contract buffer to keep spreads under 0.04%.',
      actionButtonText: 'Auto-Rebalance Buffer',
      impactMetric: 'Saved ~$46,000 in slippage risk',
    },
  },
  {
    id: 'fx_exposure_kes',
    title: 'FX Hedging & KES Volatility',
    category: 'Optimization',
    prompt: 'Analyze current KES/USD foreign exchange exposure and suggest predictive hedging strategy for the next 7 days.',
    response: {
      summary: 'NOVA Predictive Treasury Engine forecasts mild volatility (+1.4% dispersion) for KES over the next 72 hours due to seasonal agricultural exports and CBK monetary policy announcements.',
      details: [
        'Current Unhedged Exposure: $2.14M equivalent in KES pending vendor settlement.',
        'NOVA Smart Hedging: Automated forward contracts at 129.20 strike can secure margin without locking cash collateral.',
        'Net Savings: Hedging now eliminates 94% of tail downside variance.',
      ],
      riskScore: 'Medium',
      recommendedAction: 'Execute zero-slippage automated forward hedge for $1.5M KES exposure via Nairobi liquidity pool.',
      actionButtonText: 'Execute Forward Hedge',
      impactMetric: 'Guarantees $31,500 protected margin',
    },
  },
  {
    id: 'latency_accra',
    title: '34% Drop in Accra Settlement Latency',
    category: 'Liquidity',
    prompt: 'Explain the 34% drop in Accra weekend settlement latency and evaluate counterparty routing efficiency.',
    response: {
      summary: 'NOVA AI analyzed GhIPSS gateway telemetry: Latency decreased from 58ms to 38ms following deployment of NOVA v2.4 P2P state channels across 8 Ghanaian retail institutions.',
      details: [
        'Throughput Gain: Instant settlement capacity increased from 4,500 TPS to 8,940 TPS.',
        'Routing Optimization: 92% of domestic transfers now finalize off-chain with deterministic zero-knowledge batch proofs.',
        'Cost Reduction: Counterparty interchange fees reduced by 41% across retail transactions.',
      ],
      riskScore: 'Low',
      recommendedAction: 'Enable universal instant zero-knowledge settlement for all cross-border GHS/NGN merchant payouts.',
      actionButtonText: 'Enable Universal Routing',
      impactMetric: 'Speed improved to 38ms',
    },
  },
  {
    id: 'working_capital_q4',
    title: 'Predict Q4 Cross-Border Liquidity',
    category: 'Risk',
    prompt: 'Predict cross-border working capital requirements across West and East Africa for Q4 peak trading season.',
    response: {
      summary: 'Machine learning forecast based on 3-year historical trade flows projects a +280% expansion in cross-border commerce across Nigeria, Kenya, and Ghana starting mid-October.',
      details: [
        'Projected Required Liquidity: $68M in revolving cross-border settlement pools.',
        'Critical Corridors: Lagos ⇄ Nairobi (fastest growing, +310% YoY) driven by tech & FMCG supply chains.',
        'Recommended Pre-funding: Staggered automated collateral allocation across 4 tranches to prevent idle capital drag.',
      ],
      riskScore: 'Elevated',
      recommendedAction: 'Generate institutional credit facility pre-allocation schedule across 5 partner commercial banks.',
      actionButtonText: 'Export Treasury Plan',
      impactMetric: 'Unlocks +$240M seasonal throughput',
    },
  },
];

export const SECURITY_SPECS = [
  {
    icon: 'ShieldCheck',
    title: 'Multi-Party Computation (MPC)',
    subtitle: 'Threshold Cryptography',
    description: 'Private keys never exist in full anywhere. 3-of-5 threshold signing shards distributed across hardware security modules in Frankfurt, Lagos, London, and Johannesburg.',
    stat: '3-of-5 Shards',
    badge: 'Hardware HSM',
  },
  {
    icon: 'Lock',
    title: 'Zero-Knowledge Proofs',
    subtitle: 'Confidential Auditing',
    description: 'Institutional privacy with regulatory compliance. Counterparties verify settlement finality and solvency without exposing confidential balance or trade data.',
    stat: 'ZK-SNARKs',
    badge: 'Provable Solvency',
  },
  {
    icon: 'Landmark',
    title: 'Sovereign Bank Compliance',
    subtitle: 'Central Bank Integrations',
    description: 'Built-in real-time regulatory compliance engine aligning natively with Central Bank of Nigeria (CBN), Bank of Ghana, and Central Bank of Kenya supervisory standards.',
    stat: '100% Compliant',
    badge: 'Tier-1 Regulated',
  },
  {
    icon: 'Cpu',
    title: 'Sub-Millisecond BFT Engine',
    subtitle: 'Byzantine Fault Tolerance',
    description: 'High-performance consensus layer processing 40,000+ operations per second with deterministic finality under 400 milliseconds, resistant to network partitioning.',
    stat: '< 400ms Finality',
    badge: '40k TPS Rail',
  },
];

export const AUDIT_LOG_STREAM = [
  {
    block: '#9,824,102',
    timestamp: '12:49:02 UTC',
    corridor: 'LOS → LON',
    merkleRoot: '0x8f2a9c33...81e2',
    status: 'Verified',
    validator: 'Validator-Nairobi-04',
  },
  {
    block: '#9,824,101',
    timestamp: '12:48:58 UTC',
    corridor: 'ACC → LOS',
    merkleRoot: '0x17b44d90...45c9',
    status: 'Verified',
    validator: 'Validator-Lagos-01',
  },
  {
    block: '#9,824,100',
    timestamp: '12:48:54 UTC',
    corridor: 'LON → NBO',
    merkleRoot: '0xaa9031ef...3371',
    status: 'Verified',
    validator: 'Validator-London-02',
  },
  {
    block: '#9,824,099',
    timestamp: '12:48:50 UTC',
    corridor: 'JNB → LOS',
    merkleRoot: '0x44cd8801...99bc',
    status: 'Verified',
    validator: 'Validator-Johannesburg-03',
  },
];
