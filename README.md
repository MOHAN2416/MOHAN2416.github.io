# Mutyala Mohan Surendra — AI Systems Engineer & Full-Stack Architect Portfolio

> **Production-grade engineering showcase** combining high-craft dark-mode aesthetics, interactive system architecture visualizations, simulated live hardware/CLI testbeds, and a real SQLite persistence backend.

---

## ⚡ Quick Start & Setup

Ensure **Node.js 20+** is installed:

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# OR Build and run the optimized production server
npm run build
npm run start
```

Visit **`http://localhost:3000`** in your browser.

---

## 🏛️ Architecture & Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling & UI:** Tailwind CSS, Lucide Icons, Custom Precision Matrix & Dot Grids
- **Persistence & Telemetry:** SQLite (`portfolio.db` via `better-sqlite3`)
- **Visual Aesthetic:** *"Precision Systems Engineering"* — Obsidian/Carbon background (`#07090E`), Glassmorphic panels (`#0D1117`), Electric Indigo (`#3B82F6`), Cyber Emerald (`#10B981`), Amber (`#F59E0B`), and Geist Sans / Mono typography.

---

## 👤 Candidate Profile & Core Metadata

- **Name:** Mutyala Mohan Surendra
- **Headline:** AI Systems Engineer & Full-Stack Architect
- **Sub-headline:** Building deterministic local-first AI agents, low-latency Linux biometric security systems, from-scratch PyTorch Transformers, and explainable quantitative decision engines.
- **Location:** Chennai / Hyderabad, India
- **Email:** mohana21062007@gmail.com
- **Phone:** +91 7671074608
- **GitHub:** [github.com/MOHAN2416](https://github.com/MOHAN2416)
- **Education:**
  - **Amrita Vishwa Vidyapeetham, Chennai, India** — B.Tech in Computer Science & Engineering (2nd Year, 2024–2028), CGPA: 7.2.
  - **Sri Chaitanya Junior College, Hyderabad, India** — Class 12th MPC (2023–2024), Aggregate: 91.5%.
- **Industry Experience:**
  - **AI Intern @ LiveAI** (Feb 2025 – Apr 2025 | Remote): Open-source LLM fine-tuning (Llama, Mistral), PEFT, LoRA, GPU supervised fine-tuning (SFT) workflows.
- **Major Honors:**
  - 🏆 **Winner (1st Place among 97 Teams) — FLASH National Hackathon**: Medication adherence and automated prescription parsing platform.

---

## 🚀 The 6 Flagship Projects & Interactive Simulators

1. **VIDURA — Local-First Self-Developing AI Assistant (Flagship #1)**
   - *GitHub:* `https://github.com/MOHAN2416/VIDURA`
   - *Metrics:* `22,423` Total SLOC (`13,951` source + `8,472` test across `98` modules), `456/456` Passing Tests in `6.57s`, `1,433` Indexed AST Symbols, `45.44 ms` Hybrid RAG Retrieval, `112.93 MB` RSS.
   - *Interactive Simulator:* Full browser CLI terminal with presets (`/codebase`, `/symbol`, `/rag search`), `CodeChangeProposal` diff synthesis, `/approve` human gate, SHA-256 byte-parity disk verification, and 456-test animated pytest suite.

2. **BLINK — Biometric Facial Authentication Suite for Linux (Flagship #2)**
   - *GitHub:* `https://github.com/MOHAN2416/BLINK`
   - *Metrics:* `~800 ms` Cold Authentication Cycle, `< 15 ms` Password Fallback, 3-Tier Anti-Spoofing (MiniFASNetV2 + 2D FFT Moiré + Blink Tracking), `78/78` Tests, AES-256-GCM Embedding Vault.
   - *Interactive Simulator:* Ambient luminance slider with dynamic RGB (`/dev/video0`) to Zero-Light IR (`/dev/video2`) failover (&lt;35 lux threshold), animated frameless Eye HUD, and stage-by-stage millisecond breakdown.

3. **VARUNA — Maritime Freight Forecasting & MILP Decision-Support System (Flagship #3)**
   - *GitHub:* `https://github.com/MOHAN2416/VARUNA`
   - *Metrics:* `$3.94 / MT` Test MAE (8.52% sMAPE), `176.99 ms` Full 12-Step Pipeline Latency (9.87ms ML + 128.73ms HiGHS MILP + 36.57ms Monte Carlo), `10,000` Vectorized Monte Carlo Iterations (95% VaR: `$2,438,207`, 95% CVaR: `$2,453,868`), `273` Automated Tests.
   - *Interactive Simulator:* Pre-loaded Hay Point -> Paradip 80,000 MT Capesize coal benchmark, dynamic bunker fuel slider ($500-$850/MT), weather stress toggle, and interactive risk distribution curve.

4. **NanoCoder — 12.29M-Parameter GPT Transformer From Scratch**
   - *GitHub:* `https://github.com/MOHAN2416/NanoCoder`
   - *Metrics:* 12.29M trainable parameters (6 layers, 6 heads, 384 embed dim, 256 context window), `21.48 ms/tok` CPU inference (`46.6 tok/s`), bfloat16 FlashAttention, custom 4k Byte BPE tokenizer.
   - *Interactive Simulator:* Autoregressive step-by-step token generation with live sampling probability distributions, top-k entropy, and syntax verification (`ast.parse` & `bash -n`).

5. **KavachAI — Website Defacement & Vulnerability Monitor**
   - *GitHub:* `https://github.com/MOHAN2416/KavachAI`
   - *Metrics:* Perceptual image hashing (`pHash`), DOM AST diffing, SSRF mitigation, SHA-256 chained tamper-evident audit ledger, 54 tests.
   - *Interactive Simulator:* Interactive visual deviation slider (pHash Hamming distance) and live cryptographic audit chain verification button.

6. **Clover CRM — Autonomous Multi-Tenant Enterprise Data & Intelligence Hub**
   - *GitHub:* `https://github.com/MOHAN2416/CLOVER_CRM`
   - *Metrics:* Row-level multi-tenancy, native MySQL compliance audit triggers, background watchdog, local Qwen 2.5 3B SSE token streaming (`< 25 ms` chunk latency), 62 tests.
   - *Interactive Simulator:* Live Server-Sent Events (SSE) token stream with lead propensity scoring and database trigger audit inspection.

---

## 🔌 Functional Backend Endpoints

- **`POST /api/contact`**: Validates visitor/recruiter inquiries, performs client IP rate-limiting, persists records to `portfolio.db` (SQLite), and returns a unique receipt ID (`MMS-REC-YYYY-XXXX`).
- **`POST /api/ai-assistant`**: "Ask Mohan's AI Twin" deterministic RAG endpoint pre-loaded with repository documentation, resume details, and benchmark measurements.
- **`GET /api/telemetry`**: Increments live visitor impressions atomically, returns CI pass status (807 tests) and system telemetry.
- **`GET /api/projects`**: Returns structured metadata for all 6 projects.
- **`GET /api/certifications`**: Returns verified credentials metadata.

---

## ⌨️ Global Keyboard Navigation

- **`Cmd+K` / `Ctrl+K`**: Opens the universal Command Palette to search simulators, jump to sections, copy candidate contact details, or view the resume.
- **`Esc`**: Closes active modal drawers or command palettes.
