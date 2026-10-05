# NOVA — Africa's Financial Operating System
> **"Africa's financial infrastructure for the next generation."**  
> Built for the 60-Minute AI Frontend Challenge.

---

## 🌍 Executive Overview

**NOVA** is not a traditional retail bank. It is the unified, sub-second monetary operating system engineered to interconnect African sovereign currencies (NGN, KES, GHS, ZAR), regional clearing switches (NIBSS, GhIPSS, KEPSS), and global institutional capital conduits (London, Frankfurt, New York).

- **Mean Finality:** 380ms (BFT Consensus Rail)
- **Peak Throughput:** 26,500 TPS
- **24h Volume:** $428.4M+
- **FX Spread:** 0.00% Zero-Spread Algorithmic Smart Routing
- **Security:** 3-of-5 Multi-Party Computation (MPC) Threshold Custody

---

## 🚀 Live Demo & Local Run Instructions

The application runs locally on Vite + React 19 + TypeScript + Tailwind CSS.

```bash
cd /Users/idrisbalaumar/Documents/projects/nova

# Start the dev server
yarn dev # or ./node_modules/.bin/vite --port 5180
```

Open your browser to: **[http://localhost:5180/](http://localhost:5180/)**

---

## 🎯 The 6 Core Missions Implemented

### 1️⃣ Hero Experience
- **Branding & Positioning:** High-impact typography, neon aurora halos, African geometric circuit aesthetics.
- **Corridor Velocity Engine (Interactive Demo):** Allows instant toggling between `London ⇄ Lagos`, `Nairobi ⇄ Lagos`, and `Accra ⇄ Nairobi`.
- **Side-by-Side Benchmark:** Demonstrates NOVA’s **380ms finality & $1.40 fee** versus SWIFT’s **3–5 days & $3,850 + 3.8% spread**.
- **Interactive Trigger:** "Simulate Settlement Pulse" dispatches animated packets with live cryptographic hash generation.

### 2️⃣ 🌍 African Financial Network (Dynamic Topology Map)
- **High-Velocity Hubs Included:**
  - 🇳🇬 **Lagos Core Gateway** (Tier-1 Clearing, 18,420 TPS, 24ms latency)
  - 🇳🇬 **Abuja Sovereign Rail** (Regulatory Node, 5,210 TPS, 29ms latency)
  - 🇬🇭 **Accra Clearing Pool** (West Africa Rail, 8,940 TPS, 36ms latency)
  - 🇰🇪 **Nairobi Switch** (Silicon Savanna Hub, 14,600 TPS, 31ms latency)
  - 🇬🇧 **London Gateway** (Global Treasury Conduit, 26,500 TPS, 112ms latency)
  - Plus **Kigali** (Rwanda) & **Johannesburg** (South Africa)
- **Living Network Visualization:** Continuous particle pulses along curved geodesic bezier arcs.
- **Node Deep-Dive:** Click on any node to view real-time reserve balances, corridor pairs, and telemetry.
- **Live Settlement Ticker:** Click on any streaming transaction to open the cryptographic receipt modal.

### 3️⃣ 📊 Financial Intelligence & Multi-Currency Treasury OS
- **Multi-Currency Ledgers:** Live toggle between `USD ($)`, `NGN (₦)`, `KES (KSh)`, `GHS (GH₵)`, `GBP (£)`, and `ZAR (R)`.
- **Yield Reserves:** Highlights dynamic yield accruals (e.g. 14.8% APY on NGN overnight repo) and 100% reserve backing proofs.
- **Volume & Throughput Visualizations:** Interactive Recharts area chart with time range filters (`24h`, `7d`, `30d`, `1y`).
- **Instant FX Corridor Calculator:** Converts between cross-border pairs with guaranteed zero-spread algorithmic rates and SWIFT savings calculators.
- **Transaction Ledger:** Live searchable and filterable table with audit receipt verification.

### 4️⃣ 🤖 NOVA AI (Autonomous Financial Copilot)
- **Heuristic Intelligence Engine:** Continuous monitoring of liquidity buffers, FX volatility, counterparty settlement risk, and anomaly detection.
- **4 Preset Intelligence Scenarios:**
  1. *Anomaly Detection:* Surge in Lagos-London settlement volume (+148% detection).
  2. *Predictive FX Hedging:* 7-day volatility analysis on KES/USD with forward strike contract recommendations.
  3. *Latency Optimization:* Explaining 34% drop in Accra weekend settlement times.
  4. *Liquidity Forecasting:* Q4 peak cross-border working capital projection across West and East Africa.
- **Interactive Conversational Input:** Users can type custom natural language queries and receive real-time streaming answers.
- **Actionable Triggers:** Buttons directly execute simulated autonomous treasury actions (`Rebalance Buffer`, `Execute Forward Hedge`).

### 5️⃣ 🔐 Security, Trust & Cryptographic Compliance
- **Multi-Party Computation (MPC) 3-of-5 Custody Visualizer:** Shows the 5 distributed polynomial shards across Lagos, London, Frankfurt, Nairobi, and an air-gapped cold shard. Click *"Simulate 3-of-5 MPC Quorum"* to test threshold signing.
- **Zero-Knowledge Proofs:** Demonstrates provable solvency and confidential auditing.
- **Real-Time Cryptographic Merkle Audit Log:** Interactive audit stream with a clickable *"Verify Proof"* button that validates SHA-256 Merkle proofs against canonical validator signatures.
- **Regulatory Compliance:** Central Bank of Nigeria (CBN), Bank of Ghana, Central Bank of Kenya, ISO 27001, SOC 2 Type II, PCI DSS Level 1.

### 6️⃣ 🚀 Final Call-to-Action & Developer Sandbox
- **Instant Sandbox API Key Generator:** Live copyable credential (`nova_live_sec_...`).
- **Multi-Language SDK Snippets:** Switch between TypeScript, Python, and cURL to view 3-line cross-border settlement implementations.
- **Interactive Sandbox Modal:** Test live simulated API requests (`POST /v2/settlements/execute`, `GET /v2/corridors/liquidity`, `POST /v2/hedging/smart-route`) and view instantaneous 200 OK JSON responses.

---

## 🏗️ Architecture & Conventions

Adheres strictly to the professional modular architecture of `trackforte-admin`:
```
src/
├── app.tsx                         # Root app orchestrator & layout
├── main.tsx                        # DOM mount & styles injection
├── data/
│   └── novaData.ts                 # Type-safe models & realistic mock data
├── modules/
│   ├── shared/
│   │   ├── components/             # Navbar, Footer, ReceiptModal, SandboxModal
│   │   ├── styles/global.css       # Design tokens, cyber grid, aurora glows
│   │   └── utils/cn.ts             # Tailwind class merging
│   ├── hero/
│   │   └── HeroSection.tsx         # Hero experience & corridor velocity engine
│   ├── network/
│   │   └── NetworkMapSection.tsx   # African & Global financial network map
│   ├── intelligence/
│   │   └── FinancialIntelligenceSection.tsx # Treasury OS, FX router, Recharts
│   ├── ai-assistant/
│   │   └── NovaAiSection.tsx       # AI copilot, scenario presets, interactive chat
│   ├── security/
│   │   └── SecurityTrustSection.tsx# MPC 3-of-5 visualizer, Merkle audit stream
│   └── cta/
│       └── FinalCtaSection.tsx     # Developer sandbox & SDK previews
```
