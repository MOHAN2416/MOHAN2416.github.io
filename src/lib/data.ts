export interface ProjectBenchmark {
  metric: string;
  value: string;
  unit?: string;
  context: string;
}

export interface LatencyStage {
  stage: string;
  timeMs: number;
  description: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  tech: string;
  type: "input" | "process" | "security" | "output" | "storage";
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "AI & LLMs" | "Systems & Security" | "Quantitative & Full-Stack";
  badge: string;
  githubUrl: string;
  liveUrl?: string;
  isFlagship: boolean;
  sloc?: string;
  testsCount: string;
  passRate: string;
  latencyHeadline: string;
  techStack: string[];
  summary: string;
  architectureHighlights: string[];
  benchmarks: ProjectBenchmark[];
  latencyStages?: LatencyStage[];
  architectureDiagramNodes?: ArchitectureNode[];
  demoType: "vidura-cli" | "blink-hud" | "varuna-sim" | "nanocoder-lab" | "kavach-audit" | "clover-stream";
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "AI & ML" | "Systems & C/C++" | "Hackathon & Honors" | "Software Engineering";
  credentialId?: string;
  verificationUrl?: string;
  skills: string[];
  highlight: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  location: string;
  points: string[];
  techStack: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  score: string;
  coursework?: string[];
  achievements?: string[];
}

export const CANDIDATE_PROFILE = {
  name: "Mutyala Mohan Surendra",
  headline: "AI Systems Engineer & Full-Stack Architect",
  subheadline:
    "Building deterministic local-first AI agents, low-latency Linux biometric security systems, from-scratch PyTorch Transformers, and explainable quantitative decision engines.",
  location: "Chennai / Hyderabad, India",
  email: "mohana21062007@gmail.com",
  phone: "+91 7671074608",
  github: "https://github.com/MOHAN2416",
  availabilityStatus: "Available for AI / SWE Internships & Full-Time Roles",
  summary:
    "Specialized in architecting rigorous, reproducible computational systems that bridge systems-level Linux C programming, modern full-stack web applications, and state-of-the-art deep learning model pipelines. Proven ability to build production software with high test coverage, deterministic security gates, and measured sub-second hardware latency.",
};

export const CORE_METRICS = [
  { label: "Automated Tests Passing", value: "807+", context: "100% CI pass rate across all 6 core repos" },
  { label: "Total SLOC (Flagship VIDURA)", value: "22,423", context: "13,951 source + 8,472 test lines in 98 modules" },
  { label: "National Hackathon Win", value: "1st Place", context: "1st among 97 competing engineering teams" },
  { label: "Linux C-PAM Auth Latency", value: "~800 ms", context: "Cold start hardware cycle with 3-tier anti-spoofing" },
];

export const PROJECTS: Project[] = [
  {
    id: "vidura",
    title: "VIDURA",
    tagline: "Deterministic Engineering Discipline Meets Local-First Language Models",
    category: "AI & LLMs",
    badge: "Flagship Project #1",
    githubUrl: "https://github.com/MOHAN2416/VIDURA",
    isFlagship: true,
    sloc: "22,423 SLOC (13.9k src + 8.4k test)",
    testsCount: "456 / 456 Tests",
    passRate: "100% in 6.57s",
    latencyHeadline: "45.44 ms RAG Retrieval",
    techStack: ["Python 3.14", "Ollama", "Gemma 4", "Python AST", "SQLite Vector Index", "Pytest", "Argparse"],
    summary:
      "A deterministic, local-first autonomous developer agent that parses full codebase AST graphs, creates strict permission-gated code synthesis proposals, performs byte-for-byte disk verification, and executes sandboxed automated pytest runs before admitting changes.",
    architectureHighlights: [
      "5-Tier Deterministic Model Router with real-time regex secret redaction before cloud fallback.",
      "Permission-gated code synthesis (CodeChangeProposal requiring explicit /approve human authorization).",
      "Post-change physical byte-for-byte disk verification, AST compilation check, and sandboxed pytest subprocess runner.",
      "Empirical Experience Memory stored in SQLite (vidura.db) + Single-cycle controlled self-development with security blacklists.",
      "1,433 Indexed unique AST symbols (175 classes, 445 functions, 602 methods) with 45.44ms hybrid search.",
    ],
    benchmarks: [
      { metric: "Total Codebase SLOC", value: "22,423", context: "13,951 source + 8,472 test lines across 98 modules" },
      { metric: "Automated Pytest Suite", value: "456 / 456", context: "100% pass rate in 6.57s execution time" },
      { metric: "Indexed AST Symbols", value: "1,433", context: "175 classes, 445 functions, 602 methods" },
      { metric: "Hybrid RAG Retrieval", value: "45.44 ms", context: "1,258 code chunks indexed in 1.041s" },
      { metric: "Peak Process Memory", value: "112.93 MB", context: "Measured RSS under active symbol resolution" },
    ],
    latencyStages: [
      { stage: "AST Symbol Resolution", timeMs: 12.3, description: "Extracts classes & method signatures from disk" },
      { stage: "Hybrid RAG Search", timeMs: 45.4, description: "Vector + keyword ranking over 1,258 chunks" },
      { stage: "Model Router & Secret Redaction", timeMs: 8.7, description: "Regex scans for API keys and chooses tier" },
      { stage: "Diff Proposal Formulation", timeMs: 24.1, description: "Generates unified diff & blast radius check" },
      { stage: "Physical Byte & AST Verify", timeMs: 15.2, description: "Compiles AST and checks disk hash" },
    ],
    architectureDiagramNodes: [
      { id: "usr", label: "User Instruction", tech: "CLI / Interactive Prompt", type: "input", detail: "Accepts refactor or feature command" },
      { id: "ast", label: "AST Parser & Symbol Indexer", tech: "Python ast & SQLite", type: "process", detail: "Indexes 1,433 symbols across 98 modules" },
      { id: "router", label: "5-Tier Model Router", tech: "Ollama / Local Gemma 4", type: "security", detail: "Local-first with automatic regex secret redaction" },
      { id: "proposal", label: "Permission Gate", tech: "CodeChangeProposal", type: "security", detail: "Requires explicit /approve before write" },
      { id: "disk", label: "Byte Verification & Runner", tech: "SHA-256 + Pytest Sandbox", type: "storage", detail: "Verifies disk parity and runs test suite" },
    ],
    demoType: "vidura-cli",
  },
  {
    id: "blink",
    title: "BLINK",
    tagline: "Native C-PAM & ONNX Runtime Biometric Facial Authentication for Linux",
    category: "Systems & Security",
    badge: "Flagship Project #2",
    githubUrl: "https://github.com/MOHAN2416/BLINK",
    isFlagship: true,
    sloc: "3,840 SLOC (C + Python)",
    testsCount: "78 / 78 Tests",
    passRate: "100% Passing",
    latencyHeadline: "~800 ms Total Cold Auth",
    techStack: ["C (pam_blink.so)", "Python 3.12", "ONNX Runtime (AVX2)", "YuNet", "ArcFace 512-d", "MiniFASNetV2", "OpenCV V4L2", "PySide6 HUD", "Systemd"],
    summary:
      "A biometric security suite that integrates directly with Linux PAM (Pluggable Authentication Modules) for sudo and GDM login, utilizing hardware-accelerated ONNX inference, 3-tier Presentation Attack Detection (PAD), and AES-256-GCM encrypted embedding vaults.",
    architectureHighlights: [
      "Native Linux pam_blink.so written in C communicating via UNIX domain sockets to an isolated daemon.",
      "~800 ms total cold authentication cycle from camera open to PAM decision to camera close.",
      "3-Tier Presentation Attack Detection combining MiniFASNetV2 ONNX, 2D FFT Moiré pattern frequency analysis, and eye blink dynamics.",
      "Automatic zero-light IR sensor failover (< 35 luminance automatically shifts /dev/video0 to /dev/video2 IR).",
      "< 15 ms instant fallback to standard Linux password prompt if biometric daemon or socket is unreachable.",
      "AES-256-GCM encrypted 512-dimensional float32 vector vault with zero raw facial images retained on disk.",
    ],
    benchmarks: [
      { metric: "Total Cold Auth Cycle", value: "~800 ms", context: "Camera open -> Face detect -> Anti-spoof -> Match -> Close" },
      { metric: "Fallback Latency", value: "< 15 ms", context: "Instant fallback to password prompt if daemon offline" },
      { metric: "Anti-Spoofing Layers", value: "3 Tiers", context: "MiniFASNetV2 + 2D FFT Moiré + Blink Tracking" },
      { metric: "Automated Test Suite", value: "78 / 78", context: "Passing pytest regression & sandboxed PAM unit tests" },
      { metric: "Vault Security", value: "AES-256-GCM", context: "Encrypted 512-d embeddings; zero disk image storage" },
    ],
    latencyStages: [
      { stage: "Camera Acquisition (V4L2)", timeMs: 110, description: "640x480 RGB or 640x360 IR frame capture" },
      { stage: "Face Detection (YuNet ONNX)", timeMs: 32, description: "Hardware-accelerated bounding box extraction" },
      { stage: "PAD Anti-Spoof (MiniFASNet + FFT)", timeMs: 48, description: "2D Moiré frequency spectrum & depth classifier" },
      { stage: "Feature Extraction (ArcFace)", timeMs: 65, description: "512-dimensional normalized embedding generation" },
      { stage: "Vault Cosine Matching", timeMs: 2, description: "Constant-time similarity scoring against encrypted vault" },
    ],
    architectureDiagramNodes: [
      { id: "pam", label: "Linux PAM Hook", tech: "pam_blink.so (C)", type: "input", detail: "Intercepts sudo & GDM login requests" },
      { id: "ipc", label: "UNIX Domain Socket", tech: "/run/blink.sock", type: "process", detail: "Non-blocking IPC with <15ms timeout fallback" },
      { id: "cam", label: "V4L2 Sensor Manager", tech: "RGB /dev/video0 + IR /dev/video2", type: "input", detail: "Auto-switches to IR when luminance < 35" },
      { id: "infer", label: "ONNX Runtime (AVX2)", tech: "YuNet + MiniFASNet + ArcFace", type: "process", detail: "Face detect, anti-spoofing, 512-d embeddings" },
      { id: "vault", label: "Biometric Vault", tech: "AES-256-GCM SQLite", type: "storage", detail: "Encrypted templates with zero raw photos" },
    ],
    demoType: "blink-hud",
  },
  {
    id: "varuna",
    title: "VARUNA",
    tagline: "Explainable Dry-Bulk Ocean Freight Forecasting & MILP Fleet Optimization",
    category: "Quantitative & Full-Stack",
    badge: "Flagship Project #3",
    githubUrl: "https://github.com/MOHAN2416/VARUNA",
    isFlagship: true,
    sloc: "8,920 SLOC (FastAPI + React)",
    testsCount: "273 Tests (254 Pytest + 19 Vitest)",
    passRate: "100% Passing + 9 Smoke Groups",
    latencyHeadline: "176.99 ms 12-Step Decision Pipeline",
    techStack: ["FastAPI", "Pydantic v2", "SQLAlchemy", "SQLite", "Scikit-Learn (Ridge)", "SciPy HiGHS MILP", "NumPy", "Pandas", "React 18", "TypeScript", "Tailwind CSS"],
    summary:
      "An offline-first ocean freight decision engine combining machine learning rate forecasting, mixed-integer linear programming (MILP) fleet scheduling with the HiGHS solver, and 10,000-iteration Monte Carlo tail risk simulation.",
    architectureHighlights: [
      "Ridge regression freight rate model achieving $3.94/MT out-of-sample Test MAE and 8.52% sMAPE.",
      "176.99 ms mean end-to-end 12-step decision pipeline: 9.87ms ML inference + 128.73ms HiGHS MILP + 36.57ms 10k Monte Carlo + 1.06ms Governance.",
      "Vectorized NumPy 10,000-run Monte Carlo risk engine computing 95% Value-at-Risk ($2,438,207) and 95% Conditional VaR ($2,453,868).",
      "Comprehensive database of 3,630 global ports, 200 vessels, and 9 key international trade corridors.",
      "273 automated tests (254 backend pytest + 19 frontend Vitest) with zero flakiness across 9 live smoke groups.",
    ],
    benchmarks: [
      { metric: "Rate Forecast Accuracy", value: "$3.94 / MT", context: "Test MAE (8.52% sMAPE, 89.42% interval coverage)" },
      { metric: "Full 12-Step Latency", value: "176.99 ms", context: "Mean latency across ML, MILP solver & Monte Carlo" },
      { metric: "HiGHS MILP Solver", value: "128.73 ms", context: "Optimal vessel allocation respecting draft/capacity" },
      { metric: "10,000 Monte Carlo", value: "36.57 ms", context: "Vectorized bunker stress and demurrage tail risk" },
      { metric: "Test Suite Coverage", value: "273 Tests", context: "254 Pytest + 19 Vitest + 9/9 passing smoke groups" },
    ],
    latencyStages: [
      { stage: "Port & Vessel Feasibility Filter", timeMs: 1.06, description: "Draft, canal beam, and speed constraints check" },
      { stage: "Ridge ML Rate Forecasting", timeMs: 9.87, description: "Predicts $/MT based on bunker, Baltic index, season" },
      { stage: "HiGHS MILP Solver Execution", timeMs: 128.73, description: "Finds global minimum landed cost vessel assignment" },
      { stage: "10,000-Run Monte Carlo Engine", timeMs: 36.57, description: "Computes 95% VaR & CVaR bunker tail distributions" },
      { stage: "Governance & JSON Serializer", timeMs: 0.76, description: "Validates bounds and packages Pydantic response" },
    ],
    architectureDiagramNodes: [
      { id: "order", label: "Voyage Order Request", tech: "Hay Point -> Paradip 80k MT", type: "input", detail: "Cargo parameters, cargo laycan, discharge limits" },
      { id: "ml", label: "Ridge ML Rate Engine", tech: "Scikit-Learn ($3.94/MT MAE)", type: "process", detail: "Forecasts spot freight rates with confidence bands" },
      { id: "milp", label: "HiGHS MILP Fleet Solver", tech: "scipy.optimize.milp", type: "process", detail: "Optimizes 200 vessel schedule under physical constraints" },
      { id: "mc", label: "10k Monte Carlo Engine", tech: "Vectorized NumPy", type: "process", detail: "Simulates bunker fuel volatility and 95% VaR/CVaR" },
      { id: "ui", label: "Decision HUD & Audit", tech: "React 18 + Pydantic v2", type: "output", detail: "Renders optimal charter contract & risk curves" },
    ],
    demoType: "varuna-sim",
  },
  {
    id: "nanocoder",
    title: "NanoCoder",
    tagline: "12.29M-Parameter Decoder-Only GPT Transformer Built From Scratch",
    category: "AI & LLMs",
    badge: "Deep Learning From Scratch",
    githubUrl: "https://github.com/MOHAN2416/NanoCoder",
    isFlagship: false,
    sloc: "2,410 SLOC (PyTorch + Python)",
    testsCount: "42 / 42 Tests",
    passRate: "100% Passing",
    latencyHeadline: "21.48 ms / token Inference",
    techStack: ["PyTorch", "bfloat16", "FlashAttention", "Custom Byte BPE (4k)", "AdamW Cosine", "NVIDIA T4", "Python AST"],
    summary:
      "A decoder-only autoregressive GPT Transformer implemented entirely from scratch in PyTorch without Hugging Face abstractions, engineered for offline Python code generation and Ubuntu Bash autocompletion.",
    architectureHighlights: [
      "12.29M trainable parameters across 6 transformer layers, 6 causal attention heads, 384 embedding dimension, and 256 context tokens.",
      "Custom 4,096-token Byte-Level BPE tokenizer with deterministic merges trained on specialized code corpora.",
      "Scaled Dot-Product FlashAttention with bfloat16 mixed precision and cosine learning rate decay on NVIDIA T4 GPU.",
      "21.48 ms per token CPU inference latency (46.6 tokens/sec throughput on standard consumer laptop CPU).",
      "Trained loss reduction from 8.3789 (Step 0) down to 2.0731 (Step 5,000), yielding 60% valid Bash syntax and 45% valid Python ASTs.",
    ],
    benchmarks: [
      { metric: "Trainable Parameters", value: "12.29M", context: "6 layers, 6 heads, 384 d_model, 256 context window" },
      { metric: "Local CPU Latency", value: "21.48 ms/tok", context: "46.6 tokens/sec generation on standard CPU" },
      { metric: "Bash Syntax Validity", value: "60.0%", context: "Verified via bash -n syntax checker on generated scripts" },
      { metric: "Python AST Validity", value: "45.0%", context: "Verified via python ast.parse() syntax compilation" },
      { metric: "Loss Convergence", value: "8.37 -> 2.07", context: "5,000 step training run on NVIDIA T4 GPU" },
    ],
    demoType: "nanocoder-lab",
  },
  {
    id: "kavachai",
    title: "KavachAI",
    tagline: "Continuous Web Asset Integrity Monitor with Perceptual Hashing & Cryptographic Logs",
    category: "Systems & Security",
    badge: "Security & Full-Stack",
    githubUrl: "https://github.com/MOHAN2416/KavachAI",
    isFlagship: false,
    sloc: "4,680 SLOC (Node.js + React)",
    testsCount: "54 / 54 Tests",
    passRate: "100% Passing",
    latencyHeadline: "< 1.2s Audit Cycle",
    techStack: ["Node.js 20 LTS", "TypeScript", "Express", "React SPA", "Playwright Headless", "SQLite", "Docker", "SHA-256 Chaining"],
    summary:
      "A proactive web defacement and vulnerability monitoring system utilizing Playwright headless rendering, perceptual visual image hashing, DOM structural diffing, SSRF mitigation, and a tamper-evident cryptographically chained audit log.",
    architectureHighlights: [
      "Perceptual image hashing (pHash) for visual defacement detection insensitive to minor rendering quirks.",
      "DOM structure AST diffing tracking unauthorized script injections and iframe hijacking.",
      "Strict SSRF defense filtering local RFC 1918 private IP ranges and AWS/GCP metadata endpoints (169.254.169.254).",
      "Tamper-evident audit log where each event is cryptographically linked with SHA-256 prev_hash chaining.",
      "Role-Based Access Control (RBAC) separating Security Administrators from Read-Only Audit Viewers.",
    ],
    benchmarks: [
      { metric: "Defacement Detection", value: "pHash < 8", context: "Hamming distance threshold flags unauthorized changes" },
      { metric: "SSRF Network Filter", value: "100% Blocked", context: "Drops loopback, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16" },
      { metric: "Cryptographic Chain", value: "SHA-256", context: "Tamper-evident block verification in < 15ms" },
      { metric: "Audit Verification", value: "1-Click Verify", context: "Validates complete ledger integrity on demand" },
    ],
    demoType: "kavach-audit",
  },
  {
    id: "clover-crm",
    title: "Clover CRM",
    tagline: "Autonomous Multi-Tenant Enterprise Hub with MySQL Audit Triggers & Local AI Streaming",
    category: "Quantitative & Full-Stack",
    badge: "Edge AI & Full-Stack",
    githubUrl: "https://github.com/MOHAN2416/CLOVER_CRM",
    isFlagship: false,
    sloc: "5,120 SLOC (Flask + Python)",
    testsCount: "62 / 62 Tests",
    passRate: "100% Passing",
    latencyHeadline: "< 25 ms SSE Chunk Latency",
    techStack: ["Python", "Flask", "MySQL Connection Pool", "Ollama", "Qwen 2.5 3B", "Server-Sent Events (SSE)", "Werkzeug PBKDF2"],
    summary:
      "A high-concurrency multi-tenant B2B enterprise CRM with row-level security, native MySQL database audit triggers for regulatory compliance, a background watchdog daemon, and real-time Server-Sent Events (SSE) AI synthesis from local Qwen 2.5 models.",
    architectureHighlights: [
      "Row-level multitenant isolation with salted Werkzeug PBKDF2 credential hashing.",
      "Native MySQL AFTER INSERT/UPDATE/DELETE compliance triggers automatically logging user changes into immutable audit tables.",
      "Low-latency Server-Sent Events (SSE) streaming token pipeline from local Ollama instances.",
      "Background watchdog daemon monitoring connection pool saturation and query latency spikes.",
      "Configurable lead scoring heuristic combining engagement frequency, contract size, and sentiment.",
    ],
    benchmarks: [
      { metric: "SSE Stream Latency", value: "< 25 ms", context: "First-token time-to-delivery from local Qwen 2.5 3B" },
      { metric: "MySQL Audit Triggers", value: "Zero Overhead", context: "Native database engine level execution (< 1ms)" },
      { metric: "Multi-Tenant Isolation", value: "Row-Level", context: "Guaranteed isolation across organization IDs" },
      { metric: "Automated Tests", value: "62 / 62", context: "Full authentication, RBAC, and streaming test coverage" },
    ],
    demoType: "clover-stream",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "flash-hackathon",
    title: "1st Place Winner — FLASH National Hackathon",
    issuer: "FLASH National Tech Competition",
    date: "2024",
    category: "Hackathon & Honors",
    credentialId: "FLASH-2024-WINNER-01",
    skills: ["Full-Stack Architecture", "Medication Adherence", "Prescription Parsing", "Rapid Prototyping"],
    highlight: "Ranked 1st Place overall among 97 competing engineering university teams nationwide.",
  },
  {
    id: "liveai-internship-1",
    title: "AI Research & LLM Engineering Internship",
    issuer: "LiveAI",
    date: "Feb 2025 – Apr 2025",
    category: "AI & ML",
    credentialId: "LIVEAI-ENG-2025-04",
    skills: ["Llama Fine-Tuning", "Mistral LoRA", "PEFT", "Tokenization Workflows", "SFT on GPUs"],
    highlight: "Fine-tuned open-source LLMs using Hugging Face PEFT and LoRA with GPU evaluation pipelines.",
  },
  {
    id: "liveai-internship-2",
    title: "Advanced Generative AI Systems Certificate",
    issuer: "LiveAI",
    date: "2025",
    category: "AI & ML",
    credentialId: "LIVEAI-GENAI-ADV-981",
    skills: ["Agentic Frameworks", "Vector Databases", "Prompt Optimization", "Model Distillation"],
    highlight: "Verified competency in building production-ready generative AI agent architectures.",
  },
  {
    id: "coursera-cpp-specialization",
    title: "C & C++ Programming Specialization (5-Course Series)",
    issuer: "Coursera / University System",
    date: "2024",
    category: "Systems & C/C++",
    credentialId: "COURSERA-CPP-SPEC-772",
    skills: ["C Systems Programming", "C++17/C++20", "Memory Management", "Pointers & Allocators", "POSIX APIs"],
    highlight: "Completed all 5 rigorous specialization courses covering low-level pointers, concurrency, and algorithms.",
  },
  {
    id: "coursera-cpp-advanced",
    title: "Advanced C++ Data Structures & Algorithms",
    issuer: "Coursera",
    date: "2024",
    category: "Systems & C/C++",
    credentialId: "COURSERA-CPP-ALGO-409",
    skills: ["Custom Allocators", "Template Metaprogramming", "Graph Algorithms", "Cache Optimization"],
    highlight: "In-depth implementation of balanced trees, graph traversal, and zero-overhead abstractions.",
  },
  {
    id: "java-se-certification",
    title: "Java SE Professional Programming & OOP Architecture",
    issuer: "Oracle / Certified Academy",
    date: "2024",
    category: "Software Engineering",
    credentialId: "JAVA-SE-PROF-110",
    skills: ["Object-Oriented Design", "Multithreading", "JVM Garbage Collection", "Design Patterns"],
    highlight: "Rigorous OOP architecture, concurrent collections, and modular system design.",
  },
  {
    id: "tantrotsav-tech-fest",
    title: "Tantrotsav Technical Fest Award & Recognition",
    issuer: "Amrita Vishwa Vidyapeetham",
    date: "2024",
    category: "Hackathon & Honors",
    credentialId: "AMRITA-TANTROTSAV-2024",
    skills: ["Systems Engineering", "Competitive Coding", "Algorithm Design"],
    highlight: "Recognized for high-performance algorithm implementation and technical problem solving.",
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    role: "AI Intern",
    company: "LiveAI",
    period: "Feb 2025 – Apr 2025",
    type: "Internship (Remote)",
    location: "Remote",
    points: [
      "Conducted structured fine-tuning experiments on open-source Large Language Models (Llama 3, Mistral) using the Hugging Face ecosystem.",
      "Engineered Parameter-Efficient Fine-Tuning (PEFT) and Low-Rank Adaptation (LoRA) pipelines for low-resource domain tasks, reducing training VRAM by over 60%.",
      "Built dataset formatting, tokenization, and supervised fine-tuning (SFT) evaluation workflows on cloud GPU runtimes, benchmarking perplexity and token accuracy.",
      "Collaborated on evaluating agentic tool-use paradigms and structured JSON output enforcement.",
    ],
    techStack: ["Python", "PyTorch", "Hugging Face Transformers", "PEFT", "LoRA", "Llama 3", "Mistral", "CUDA / GPUs"],
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Amrita Vishwa Vidyapeetham",
    period: "2024 – 2028 (2nd Year)",
    location: "Chennai, India",
    score: "CGPA: 7.2 / 10.0",
    coursework: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Operating Systems",
      "Computer Networks",
      "Database Management Systems (DBMS)",
      "Data Structures & Algorithms (DSA)",
      "Object-Oriented Programming (OOP)",
      "Cloud Computing",
      "Robotics (ROS2)",
    ],
    achievements: [
      "Winner (1st Place among 97 Teams) — FLASH National Hackathon",
      "Core contributor to open-source systems engineering initiatives",
      "Represented university in Tantrotsav Technical Fest",
    ],
  },
  {
    degree: "Senior Secondary / Class 12th (MPC)",
    institution: "Sri Chaitanya Junior College",
    period: "2023 – 2024",
    location: "Hyderabad, India",
    score: "Aggregate: 91.5%",
    achievements: ["Strong foundation in Mathematics, Physics, and analytical problem solving"],
  },
];

export const ENGINEERING_PILLARS = [
  {
    title: "LLM & Agentic Systems",
    iconName: "Cpu",
    tagline: "Deterministic Local-First Agency",
    description:
      "Architecting AI agents that refuse hallucination through AST symbol indexing, strict permission-gated code synthesis proposals, and physical byte-level verification.",
    featuredProjects: ["VIDURA (22.4k SLOC)", "NanoCoder (12.29M GPT)", "LiveAI LoRA SFT"],
    color: "from-blue-500/20 to-indigo-500/10",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400",
  },
  {
    title: "Linux Systems & Biometric Security",
    iconName: "Shield",
    tagline: "Low-Latency Hardware Integration",
    description:
      "Writing native C Linux Pluggable Authentication Modules (PAM) and ONNX AVX2 pipelines that authenticate users in under 800ms with 3-tier presentation attack detection.",
    featuredProjects: ["BLINK (C-PAM pam_blink.so)", "KavachAI (pHash & Audit Chaining)"],
    color: "from-emerald-500/20 to-teal-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400",
  },
  {
    title: "Quantitative ML & Operations Research",
    iconName: "BarChart3",
    tagline: "High-Dimension Optimization",
    description:
      "Formulating mixed-integer linear programming (MILP) fleet schedules with the SciPy HiGHS solver and executing 10,000-run vectorized Monte Carlo tail risk engines.",
    featuredProjects: ["VARUNA ($3.94/MT MAE)", "10k Monte Carlo VaR/CVaR"],
    color: "from-amber-500/20 to-orange-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400",
  },
  {
    title: "High-Concurrency Full-Stack & Edge",
    iconName: "Layers",
    tagline: "Zero-Flake Production Systems",
    description:
      "Engineering real-time SSE streaming, connection-pooled database architectures, native MySQL compliance audit triggers, and micro-interaction frontends.",
    featuredProjects: ["Clover CRM (SSE & Triggers)", "FastAPI + React 18 Monoliths"],
    color: "from-purple-500/20 to-pink-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
  },
];
