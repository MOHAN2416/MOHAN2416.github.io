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

export interface CardMetric {
  label: string;
  value: string;
  sub: string;
}

export interface ProjectCaseStudy {
  problemStatement: string;
  architectureDiagramText: string;
  technicalImplementation: string[];
  benchmarksTable: {
    category: string;
    metric: string;
    value: string;
    verificationMethod: string;
  }[];
  repositoryStructure: string;
  limitations: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "AI Agents & LLMs" | "Systems & Security" | "Optimization & Full-Stack";
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
  cardMetrics: [CardMetric, CardMetric, CardMetric];
  latencyStages?: LatencyStage[];
  architectureDiagramNodes?: ArchitectureNode[];
  demoType: "vidura-cli" | "blink-hud" | "varuna-sim" | "nanocoder-lab" | "kavach-audit" | "clover-stream";
  caseStudy: ProjectCaseStudy;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: "AI & ML" | "Systems & C/C++" | "Hackathon & Honors" | "Software Engineering";
  credentialId?: string;
  verificationUrl?: string;
  filePath?: string;
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
  headline: "AI Systems Engineer & Full-Stack Developer",
  bio: "B.Tech Computer Science student at Amrita Vishwa Vidyapeetham (Chennai) building deterministic local-first LLM agents, Linux biometric security systems, and from-scratch PyTorch Transformers.",
  subheadline:
    "Engineering deterministic local-first AI agents, low-latency Linux biometric security systems, from-scratch PyTorch Transformers, and explainable quantitative decision engines.",
  location: "Chennai / Hyderabad, India",
  email: "mohana21062007@gmail.com",
  phone: "+91 7671074608",
  github: "https://github.com/MOHAN2416",
  linkedin: "https://linkedin.com/in/mohan-surendra",
  availabilityStatus: "Open to 2026 / 2027 AI Systems, Deep Learning, and Full-Stack Engineering Internships & Roles",
  summary:
    "Specialized in architecting rigorous, reproducible computational systems that bridge low-level Linux systems programming, modern full-stack web applications, and state-of-the-art deep learning model pipelines. Proven ability to build production software with high test coverage, deterministic security gates, and measured sub-second hardware latency.",
};

export const CORE_METRICS = [
  { label: "Largest AI Codebase", value: "22,423 SLOC", context: "Total SLOC in Flagship VIDURA (13,951 source + 8,472 test lines in 98 modules)" },
  { label: "Automated Pytest Suite", value: "456 / 456", context: "100% CI pass rate in 6.57s execution time across all modules" },
  { label: "Cold Biometric Latency", value: "~800 ms", context: "Native C-PAM Linux authentication cycle with 3-tier presentation attack detection" },
  { label: "National Hackathon Winner", value: "1st Place", context: "Ranked 1st Place overall among 97 competing engineering teams nationwide" },
];

export const PROJECTS: Project[] = [
  {
    id: "vidura",
    slug: "vidura",
    title: "VIDURA",
    tagline: "Deterministic Engineering Discipline Meets Local-First Language Models",
    category: "AI Agents & LLMs",
    badge: "Flagship Agent #1",
    githubUrl: "https://github.com/MOHAN2416/VIDURA",
    isFlagship: true,
    sloc: "22,423 SLOC (13,951 src + 8,472 test)",
    testsCount: "456 / 456 Tests",
    passRate: "100% in 6.57s",
    latencyHeadline: "45.44 ms RAG Latency",
    techStack: ["Python 3.14", "Ollama", "Gemma 4", "Python AST", "SQLite Vector Index", "Pytest", "Argparse"],
    summary:
      "A deterministic, local-first autonomous developer agent that parses full codebase AST graphs, creates strict permission-gated code synthesis proposals, performs byte-for-byte disk verification, and executes sandboxed automated pytest runs before admitting changes.",
    cardMetrics: [
      { label: "Scale", value: "22,423 SLOC", sub: "98 Python modules" },
      { label: "Test Suite", value: "456 / 456 Passed", sub: "6.57s runtime" },
      { label: "RAG Latency", value: "45.44 ms", sub: "Top-K hybrid retrieval" },
    ],
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
      { id: "usr", label: "User Prompt", tech: "CLI / Interactive Prompt", type: "input", detail: "Accepts refactor or feature command" },
      { id: "ast", label: "AST Parser & Symbol Indexer", tech: "Python ast & SQLite", type: "process", detail: "Indexes 1,433 symbols across 98 modules" },
      { id: "router", label: "5-Tier Model Router", tech: "Ollama / Local Gemma 4", type: "security", detail: "Local-first with automatic regex secret redaction" },
      { id: "proposal", label: "Permission Gate", tech: "CodeChangeProposal", type: "security", detail: "Requires explicit /approve before write" },
      { id: "disk", label: "Byte Verification & Runner", tech: "SHA-256 + Pytest Sandbox", type: "storage", detail: "Verifies disk parity and runs test suite" },
    ],
    demoType: "vidura-cli",
    caseStudy: {
      problemStatement:
        "Modern LLM coding assistants operate as black-box probabilistic generators. When allowed to write directly to developer disks, they hallucinate phantom functions, leak secrets into cloud prompts, silently break existing unit tests, and lack deterministic auditability. VIDURA solves this by enforcing an uncompromising compiler-grade state machine where code generation is decoupled from disk execution.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                                 USER INPUT / CLI                                |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                  AST PARSER & SYMBOL REGISTRY (Python 3.14 ast)                 |
|   - 1,433 Indexed Symbols (175 Classes, 445 Functions, 602 Methods)              |
|   - 1,258 Code Chunks Indexed in 1.041s | Hybrid SQLite RAG Vector Store        |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                        5-TIER DETERMINISTIC MODEL ROUTER                        |
|   Tier 1: gemma4:e4b-it-qat (Local)  --> Tier 5: gemma4:31b-cloud               |
|   * Regex Security Filter: Redacts API keys & tokens before any cloud egress    |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                      PERMISSION GATE (CodeChangeProposal)                       |
|   - Formulates unified diff with blast radius analysis                          |
|   - BLOCKS write access until human issues explicit '/approve' command          |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                     DISK PARITY VERIFICATION & PYTEST RUNNER                    |
|   - Pre & Post SHA-256 hash comparison ensures exact byte-level parity          |
|   - AST Syntax Compilation Check (python -m py_compile)                         |
|   - Sandboxed Pytest Runner: 456 / 456 passing automated tests in 6.57s         |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Constructed a persistent SQLite symbol index storing AST node line bounds, docstrings, argument types, and 128-dim normalized embedding vectors.",
        "Implemented strict permission-gating via `CodeChangeProposal` dataclasses that generate diffs and freeze disk writes until human authorization tokens are verified.",
        "Engineered post-change byte-for-byte physical parity validation ensuring zero corrupt or incomplete file buffers reach the filesystem.",
        "Sandboxed the full 456-test regression suite to run inside an isolated subprocess with strict 10-second execution timeouts.",
      ],
      benchmarksTable: [
        { category: "Codebase Scale", metric: "Total SLOC", value: "22,423 lines", verificationMethod: "cloc across 98 Python modules" },
        { category: "Test Suite", metric: "Automated Tests", value: "456 / 456 (100%)", verificationMethod: "pytest in 6.57s" },
        { category: "AST Parsing", metric: "Indexed Symbols", value: "1,433 symbols", verificationMethod: "SQLite AST symbol resolver" },
        { category: "Retrieval", metric: "Hybrid RAG Latency", value: "45.44 ms", verificationMethod: "Vector cosine + keyword query" },
        { category: "System Footprint", metric: "Peak Process RSS", value: "112.93 MB", verificationMethod: "psutil resident set size measurement" },
      ],
      repositoryStructure: `vidura/
├── core/
│   ├── codebase.py          # AST symbol indexer and hierarchy resolution
│   ├── router.py            # 5-Tier deterministic model router with regex redaction
│   └── diff_engine.py       # Unified diff generation and blast-radius check
├── security/
│   ├── gate.py              # CodeChangeProposal permission authorization gate
│   ├── blacklist.py         # File blacklist (.env, keys, system files)
│   └── disk_verifier.py     # SHA-256 physical byte parity verification
├── rag/
│   └── vector_store.py      # SQLite 128-dim hybrid semantic search index
└── tests/                   # 456 automated test modules (8,472 SLOC)`,
      limitations: [
        "AST symbol indexing currently requires Python 3.12+ syntax compatibility; multi-language AST support (TypeScript, Rust) is planned.",
        "Local model inference requires an active Ollama instance with at least 8 GB system RAM.",
      ],
    },
  },
  {
    id: "nanocoder",
    slug: "nanocoder",
    title: "NanoCoder",
    tagline: "12.29M-Parameter Decoder-Only GPT Transformer Built From Scratch",
    category: "AI Agents & LLMs",
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
    cardMetrics: [
      { label: "Architecture", value: "12.29M Params", sub: "6-Layer Decoder GPT" },
      { label: "Benchmarks", value: "40 Eval Prompts", sub: "60% Bash / 45% AST valid" },
      { label: "CPU Latency", value: "21.48 ms/tok", sub: "46.6 tok/s on CPU" },
    ],
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
      { metric: "Validation Loss", value: "4.1002", context: "Out-of-sample code completion perplexity evaluation" },
      { metric: "Bash Syntax Validity", value: "60.0%", context: "Verified via bash -n syntax checker on generated scripts" },
      { metric: "Python AST Validity", value: "45.0%", context: "Verified via python ast.parse() syntax compilation" },
      { metric: "Loss Convergence", value: "8.37 -> 2.07", context: "5,000 step training run on NVIDIA T4 GPU" },
    ],
    demoType: "nanocoder-lab",
    caseStudy: {
      problemStatement:
        "Commercial code LLMs require persistent cloud connectivity, introduce non-trivial token billing, and abstract away fundamental transformer mechanics behind multi-thousand-line library wrappers. NanoCoder proves that a high-efficiency 12.29M parameter decoder model can be written, tokenized, trained, and executed locally on consumer CPUs for specialized code autocompletion.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                       CUSTOM 4,096-TOKEN BYTE-LEVEL BPE                         |
|   - Deterministic byte pair encoding trained on Python & Bash corpora          |
|   - 256 Token Context Window | Vocabulary Size: 4,096                           |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                         DECODER-ONLY TRANSFORMER STACK                          |
|   - 6 Transformer Layers | 6 Causal Multi-Head Attention Heads                  |
|   - d_model = 384 | d_ff = 1536 (4x expansion)                                  |
|   - Scaled Dot-Product Attention (PyTorch F.scaled_dot_product_attention)       |
|   - RMSNorm & Rotary / Learned Positional Embeddings                            |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                       INFERENCE & SYNTACTIC VERIFIERS                           |
|   - Throughput: 46.6 tokens/sec (21.48 ms / token on standard CPU)              |
|   - Bash Syntax Checker: bash -n validation (60.0% valid scripts)               |
|   - Python AST Compiler: ast.parse() validation (45.0% valid ASTs)              |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Implemented causal masked multi-head self-attention using PyTorch's native FlashAttention kernel with `bfloat16` precision.",
        "Trained a custom Byte-Level Byte Pair Encoding (BPE) tokenizer from raw bytes, ensuring zero out-of-vocabulary tokens on code.",
        "Engineered an AdamW optimizer schedule with linear warmup and cosine learning rate decay down to 10% of maximum learning rate.",
        "Built automated syntax validation harnesses evaluating generated completions against `ast.parse` and `bash -n`.",
      ],
      benchmarksTable: [
        { category: "Model Scale", metric: "Parameters", value: "12.29 Million", verificationMethod: "PyTorch parameter tensor count" },
        { category: "Inference Speed", metric: "Latency per Token", value: "21.48 ms", verificationMethod: "Measured on Intel Core i7 CPU" },
        { category: "Throughput", metric: "Generation Rate", value: "46.6 tokens / sec", verificationMethod: "End-to-end autoregressive loop" },
        { category: "Training Loss", metric: "Cross-Entropy Loss", value: "8.3789 -> 2.0731", verificationMethod: "5,000 steps on NVIDIA T4" },
        { category: "Validation", metric: "Validation Loss", value: "4.1002", verificationMethod: "Hold-out code evaluation set" },
      ],
      repositoryStructure: `nanocoder/
├── model/
│   ├── transformer.py      # 6-layer 6-head GPT architecture from scratch
│   ├── attention.py        # Scaled dot-product causal attention
│   └── tokenizer.py        # 4,096-token custom Byte-Level BPE
├── train/
│   ├── dataset.py          # Chunked token stream prefetching
│   └── trainer.py          # AdamW cosine LR scheduler with bfloat16
└── eval/
    └── syntax_check.py     # bash -n and ast.parse automated harnesses`,
      limitations: [
        "Context window is constrained to 256 tokens due to memory bounds during training runs.",
        "Complex multi-file logic is beyond the capacity of a 12.29M parameter model, targeting single-function completions.",
      ],
    },
  },
  {
    id: "blink",
    slug: "blink",
    title: "BLINK",
    tagline: "Native C-PAM & ONNX Runtime Biometric Facial Authentication for Linux",
    category: "Systems & Security",
    badge: "Flagship Systems #2",
    githubUrl: "https://github.com/MOHAN2416/BLINK",
    isFlagship: true,
    sloc: "3,840 SLOC (C + Python)",
    testsCount: "78 / 78 Tests",
    passRate: "100% Passing",
    latencyHeadline: "~800 ms Total Cold Auth",
    techStack: ["C (pam_blink.so)", "Python 3.12", "ONNX Runtime", "PySide6 & V4L2", "YuNet", "ArcFace 512-d", "MiniFASNetV2", "Systemd"],
    summary:
      "Native Linux biometric security suite integrating directly with PAM (sudo & GDM), combining AVX2-accelerated ONNX inference, 3-tier anti-spoofing (PAD), and AES-256-GCM encrypted embedding vaults.",
    cardMetrics: [
      { label: "Auth Latency", value: "~800 ms", sub: "< 15 ms fallback" },
      { label: "Test Suite", value: "78 Passing", sub: "Pytest + PAM" },
      { label: "Security", value: "3-Tier PAD", sub: "ONNX + 2D FFT" },
    ],
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
    caseStudy: {
      problemStatement:
        "Linux desktops lack an enterprise-grade, privacy-first biometric authentication standard equivalent to Apple TouchID or Windows Hello. Existing DIY scripts store raw photos on unencrypted paths, leak memory, freeze system sudo prompts when hardware fails, and fall victim to basic 2D phone screen photo spoofing attacks. BLINK solves this with a native C-PAM module, sub-second cold auth, and 3-tier anti-spoofing.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                        LINUX PAM HOOK (pam_blink.so in C)                       |
|   - Intercepts sudo & GDM authorization requests                               |
|   - Connects to /run/blink.sock with non-blocking 15ms timeout                 |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                       V4L2 HARDWARE CAMERA SENSOR MANAGER                       |
|   - Ambient luminance check:                                                    |
|     * Luminance >= 35 lux -> /dev/video0 (640x480 RGB Sensor)                   |
|     * Luminance < 35 lux  -> /dev/video2 (640x360 Zero-Light IR Sensor)         |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                   3-TIER PRESENTATION ATTACK DETECTION (PAD)                    |
|   Tier 1: MiniFASNetV2 ONNX anti-spoofing classifier                            |
|   Tier 2: 2D FFT Moiré high-frequency screen pattern detection                  |
|   Tier 3: Temporal EAR (Eye Aspect Ratio) natural blink validation              |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                       AES-256-GCM BIOMETRIC EMBEDDING VAULT                     |
|   - ArcFace 512-d normalized float32 extraction                                 |
|   - Constant-time cosine similarity comparison against encrypted template       |
|   - PAM_SUCCESS returned in ~800 ms total cold start cycle                      |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Wrote `pam_blink.so` in C using the POSIX PAM interface, handling socket timeouts gracefully to ensure zero lockout scenarios.",
        "Integrated ONNX Runtime with AVX2 SIMD optimizations for YuNet and ArcFace, achieving 32ms face detection and 65ms feature extraction.",
        "Engineered 2D Fast Fourier Transform (FFT) analysis detecting the characteristic high-frequency grid frequencies emitted by smartphone and tablet screens.",
        "Designed an AES-256-GCM encrypted database storing only normalized float32 embeddings; raw images are purged from volatile RAM immediately after feature extraction.",
      ],
      benchmarksTable: [
        { category: "Full Cycle", metric: "Total Cold Auth Latency", value: "~800 ms", verificationMethod: "Hardware timer from camera open to close" },
        { category: "Daemon Failure", metric: "Password Fallback Latency", value: "< 15 ms", verificationMethod: "Socket timeout benchmark" },
        { category: "Anti-Spoofing", metric: "PAD Rejection Rate", value: "99.4%", verificationMethod: "Tested against 2D printouts & 4K screens" },
        { category: "Test Suite", metric: "Automated Tests", value: "78 / 78 (100%)", verificationMethod: "Sandboxed PAM pytest harness" },
        { category: "Security", metric: "Disk Image Footprint", value: "0 bytes", verificationMethod: "Disk audit during active auth" },
      ],
      repositoryStructure: `blink/
├── pam/
│   ├── pam_blink.c         # Native Linux C PAM interface module
│   └── socket_client.c     # Non-blocking UNIX domain socket IPC
├── daemon/
│   ├── camera_v4l2.py      # Dynamic RGB / Zero-Light IR sensor failover
│   ├── pad_engine.py       # MiniFASNetV2 + 2D FFT Moiré detector
│   ├── onnx_inference.py   # Hardware-accelerated YuNet & ArcFace models
│   └── vault.py            # AES-256-GCM encrypted vector database
└── tests/
    └── test_pam_pipeline.py# 78 passing integration & attack tests`,
      limitations: [
        "Requires access to Linux V4L2 devices (`/dev/video*`); Windows and macOS are not supported.",
        "Zero-light IR failover requires hardware IR emitter cameras (common on modern ThinkPad/Dell enterprise laptops).",
      ],
    },
  },
  {
    id: "varuna",
    slug: "varuna",
    title: "VARUNA",
    tagline: "Explainable Dry-Bulk Ocean Freight Forecasting & MILP Fleet Optimization",
    category: "Optimization & Full-Stack",
    badge: "Flagship Quantitative #3",
    githubUrl: "https://github.com/MOHAN2416/VARUNA",
    isFlagship: true,
    sloc: "8,920 SLOC (FastAPI + React)",
    testsCount: "273 Tests (254 Pytest + 19 Vitest)",
    passRate: "100% Passing + 9 Smoke Groups",
    latencyHeadline: "176.99 ms 12-Step Decision Pipeline",
    techStack: ["FastAPI", "Pydantic v2", "SQLAlchemy", "SQLite", "Scikit-Learn (Ridge)", "SciPy HiGHS MILP", "NumPy", "Pandas", "React 18", "TypeScript", "Tailwind CSS"],
    summary:
      "An offline-first ocean freight decision engine combining machine learning rate forecasting, mixed-integer linear programming (MILP) fleet scheduling with the HiGHS solver, and 10,000-iteration Monte Carlo tail risk simulation.",
    cardMetrics: [
      { label: "Data Scale", value: "3,630 Ports", sub: "200 vessels, 9 corridors" },
      { label: "Test Suite", value: "273 Passing Tests", sub: "254 Pytest + 19 Vitest" },
      { label: "Decision Speed", value: "176.99 ms", sub: "HiGHS MILP + 10k Monte Carlo" },
    ],
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
    demoType: "varuna-sim",
    caseStudy: {
      problemStatement:
        "Global dry-bulk maritime logistics runs on opaque broker spreadsheets prone to human miscalculation. Chartering decisions for 80,000+ metric ton cargo voyages face multi-million dollar bunker fuel price volatility, strict physical berth draft limits, and complex vessel repositioning economics. VARUNA brings mathematical precision with instant MILP optimization and Monte Carlo risk quantification.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                        VOYAGE CHARTERING INQUIRY                                |
|   - Corridor: Hay Point (Australia) -> Paradip (India) | 80,000 MT Coal         |
|   - Laycan window, maximum allowable berth draft, discharge rate                |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                        RIDGE REGRESSION ML RATE ENGINE                          |
|   - Features: Bunker VLSFO, Baltic Dry Capesize Index (BCI), seasonality        |
|   - Test Accuracy: $3.94 / MT MAE | 8.52% sMAPE | Latency: 9.87 ms             |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                   HiGHS MIXED-INTEGER LINEAR PROGRAMMING (MILP)                 |
|   - scipy.optimize.milp solver evaluating 200 candidate vessels                 |
|   - Hard constraints: Draft <= 18.2m, DWT capacity, speed, canal beam           |
|   - Solves for global minimum landed cost in 128.73 ms                          |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                  10,000 VECTORIZED MONTE CARLO RISK SIMULATION                  |
|   - 10k iterations of bunker price volatility and weather delay demurrage       |
|   - 95% Value-at-Risk (VaR): $2,438,207 | 95% CVaR: $2,453,868                 |
|   - Vectorized NumPy execution completes in 36.57 ms                           |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Implemented regularized Ridge regression modeling dry bulk spot freight rates with 89.42% out-of-sample prediction interval coverage.",
        "Formulated the vessel chartering problem as a Mixed-Integer Linear Program solved via the HiGHS simplex and interior point engine.",
        "Engineered a vectorized NumPy Monte Carlo engine executing 10,000 stochastic voyage simulations in just 36.57 ms.",
        "Constructed a FastAPI backend with Pydantic v2 schemas validating port berth depths and cargo draft physical constraints.",
      ],
      benchmarksTable: [
        { category: "Rate Accuracy", metric: "Test MAE", value: "$3.94 / MT", verificationMethod: "Out-of-sample holdout test set" },
        { category: "Relative Error", metric: "sMAPE", value: "8.52%", verificationMethod: "Symmetric mean absolute percentage error" },
        { category: "MILP Solver", metric: "Optimization Time", value: "128.73 ms", verificationMethod: "SciPy HiGHS benchmark across 200 ships" },
        { category: "Risk Engine", metric: "10,000 Monte Carlo", value: "36.57 ms", verificationMethod: "Vectorized NumPy execution time" },
        { category: "Full Pipeline", metric: "12-Step Latency", value: "176.99 ms", verificationMethod: "End-to-end API roundtrip measurement" },
      ],
      repositoryStructure: `varuna/
├── api/
│   ├── routes.py           # FastAPI endpoints for rate & fleet allocation
│   └── schemas.py          # Pydantic v2 voyage request/response models
├── core/
│   ├── ml_forecaster.py    # Ridge regression freight rate model
│   ├── milp_solver.py      # HiGHS mixed-integer linear programming engine
│   └── monte_carlo.py      # Vectorized 10,000-iteration VaR/CVaR simulator
└── tests/
    ├── test_api.py         # 254 backend pytest test cases
    └── test_frontend.ts    # 19 Vitest UI component test cases`,
      limitations: [
        "Currently pre-configured for 9 major dry-bulk corridors; containerized cargo routes require alternative tariff indices.",
        "Weather routing uses historical seasonal swell distributions rather than live satellite AIS telemetry.",
      ],
    },
  },
  {
    id: "kavachai",
    slug: "kavachai",
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
    cardMetrics: [
      { label: "Detection", value: "Perceptual Hash", sub: "Full-page visual + DOM diff" },
      { label: "Integrity", value: "SHA-256 Chain", sub: "Tamper-evident audit log" },
      { label: "Runtime", value: "Playwright + AI", sub: "Node.js 20 LTS & React SPA" },
    ],
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
    caseStudy: {
      problemStatement:
        "High-value public portals and enterprise sites are frequent targets for silent defacement, unauthorized iframe injections, and crypto-mining scripts. Traditional uptime monitors only check HTTP 200 status codes, failing to notice when the visual content has been completely compromised. KavachAI uses headless rendering, perceptual image hashing, and cryptographically chained logs to detect tampering instantly.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                       PLAYWRIGHT HEADLESS CAPTURE WORKER                        |
|   - Renders DOM in headless Chromium with strict network sandboxing            |
|   - SSRF Protection: Automatically blocks 127.0.0.1 and 169.254.169.254        |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                      PERCEPTUAL IMAGE HASHING (pHash)                           |
|   - Computes DCT-based 64-bit visual hash fingerprint                         |
|   - Compares Hamming distance against signed baseline:                         |
|     * Distance <= 4: Normal dynamic render variation                            |
|     * Distance >= 8: DEFACEMENT ALERT TRIGGERED                                 |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                    TAMPER-EVIDENT CRYPTOGRAPHIC AUDIT LOG                       |
|   - Blocks linked via SHA-256: Hash = SHA256(index + timestamp + prev_hash)   |
|   - Immutable SQLite storage with 1-click ledger verification                  |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Implemented perceptual discrete cosine transform (DCT) image hashing comparing screenshots with configurable Hamming thresholds.",
        "Built strict outbound IP verification rejecting RFC 1918 private subnets and link-local cloud metadata addresses.",
        "Constructed a SHA-256 chained audit ledger ensuring security administrators can detect any post-facto database tampering.",
        "Packaged complete multi-worker crawler architecture into isolated Docker containers.",
      ],
      benchmarksTable: [
        { category: "Detection", metric: "pHash Threshold", value: "Hamming >= 8", verificationMethod: "Simulated defacement testbed" },
        { category: "Security", metric: "SSRF Block Rate", value: "100%", verificationMethod: "Automated penetration test suite" },
        { category: "Verification", metric: "Ledger Audit Time", value: "< 15 ms", verificationMethod: "SHA-256 cryptographic chain check" },
        { category: "Test Suite", metric: "Automated Tests", value: "54 / 54 (100%)", verificationMethod: "Jest and Playwright test suite" },
      ],
      repositoryStructure: `kavachai/
├── src/
│   ├── crawler/            # Playwright headless screenshot engine
│   ├── hashing/            # Discrete cosine transform perceptual hasher
│   ├── security/           # SSRF IP address range validator
│   └── audit/              # SHA-256 chained block logger
└── tests/                  # 54 passing security & regression tests`,
      limitations: [
        "Heavy animations or dynamic video backgrounds can elevate baseline Hamming distance, requiring masking rules.",
      ],
    },
  },
  {
    id: "clover-crm",
    slug: "clover-crm",
    title: "Clover CRM",
    tagline: "Autonomous Multi-Tenant Enterprise Hub with MySQL Audit Triggers & Local AI Streaming",
    category: "Optimization & Full-Stack",
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
    cardMetrics: [
      { label: "Concurrency", value: "MySQL Pool (5)", sub: "Row-level RBAC isolation" },
      { label: "Edge AI", value: "Qwen 2.5 3B", sub: "Real-time SSE token streaming" },
      { label: "Automation", value: "10s Watchdog", sub: "Native DB AFTER UPDATE triggers" },
    ],
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
    caseStudy: {
      problemStatement:
        "Enterprise customer relationship management platforms frequently suffer from compliance gaps, leaky multi-tenant boundaries, and sluggish AI integrations that buffer entire paragraphs before displaying results. Clover CRM demonstrates how native database triggers provide zero-overhead compliance logging while Server-Sent Events stream local AI tokens with sub-25ms responsiveness.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                       CLIENT WEB APPLICATION (React SPA)                        |
|   - Authenticated session with row-level tenant organization headers            |
|   - Real-time Server-Sent Events (SSE) reader                                  |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                         FLASK APPLICATION & CONNECTION POOL                     |
|   - Werkzeug PBKDF2 credential hashing with unique salts                        |
|   - Background pool watchdog preventing connection starvation                  |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                     NATIVE MYSQL COMPLIANCE AUDIT TRIGGERS                      |
|   - AFTER INSERT / UPDATE / DELETE triggers fire at SQL engine level            |
|   - Writes immutable snapshots to lead_audit_log in < 1 ms                      |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                    LOCAL AI SYNTHESIS (Qwen 2.5 3B Instruct)                    |
|   - Local Ollama token generator streamed chunk-by-chunk                        |
|   - Chunk delivery latency: < 25 ms per token chunk                             |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Implemented database-level triggers ensuring complete audit logging that cannot be bypassed even by direct ORM queries.",
        "Constructed an asynchronous generator yielding `text/event-stream` chunks from local Ollama endpoints.",
        "Built connection pool saturation monitors detecting slow queries and auto-reconnecting stalled sockets.",
        "Enforced row-level multi-tenancy where every SQL query is constrained by tenant organization predicates.",
      ],
      benchmarksTable: [
        { category: "Streaming", metric: "Chunk Latency", value: "< 25 ms", verificationMethod: "Network panel first-chunk measurement" },
        { category: "Audit Performance", metric: "Trigger Overhead", value: "< 0.8 ms", verificationMethod: "MySQL slow query log analysis" },
        { category: "Security", metric: "Tenant Isolation", value: "100% Segregated", verificationMethod: "Cross-tenant access test suite" },
        { category: "Test Suite", metric: "Automated Tests", value: "62 / 62 (100%)", verificationMethod: "Pytest unit & integration suite" },
      ],
      repositoryStructure: `clover_crm/
├── app/
│   ├── auth.py             # Multi-tenant PBKDF2 authentication
│   ├── stream.py           # SSE token streaming generator
│   └── leads.py            # Lead scoring & opportunity pipelines
├── db/
│   └── triggers.sql        # Native MySQL compliance audit triggers
└── tests/
    └── test_crm.py         # 62 passing test cases`,
      limitations: [
        "Production deployment requires a running MySQL 8.0+ instance with trigger privileges.",
      ],
    },
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "coursera-cpp-specialization",
    title: "Programming in C & C++ Specialization",
    issuer: "Coursera",
    date: "2024",
    category: "Systems & C/C++",
    credentialId: "JDZQIHG3188S",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/JDZQIHG3188S",
    filePath: "/certificates/Coursera JDZQIHG3188S c and c  .pdf",
    skills: ["C Systems Programming", "C++17/C++20", "Memory Management", "Pointers & Allocators", "POSIX APIs"],
    highlight: "Comprehensive specialization covering low-level pointers, dynamic memory allocation, and modular systems programming in C and modern C++.",
  },
  {
    id: "coursera-part-b",
    title: "C++ Programming: Pointer and Memory Management",
    issuer: "Coursera",
    date: "2024",
    category: "Systems & C/C++",
    credentialId: "XYECZ6PJCNPX",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/XYECZ6PJCNPX",
    filePath: "/certificates/Coursera XYECZ6PJCNPX part b.pdf",
    skills: ["Object-Oriented C++", "Pointers & Memory", "Standard Template Library (STL)", "Data Structures"],
    highlight: "Validated advanced C++ pointer arithmetic, memory management, template abstractions, and system resource discipline.",
  },
  {
    id: "coursera-sve5",
    title: "C++ Programming: Object Oriented Design & Data Structures",
    issuer: "Coursera",
    date: "2024",
    category: "Systems & C/C++",
    credentialId: "SVE5DITJ4HK6",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/SVE5DITJ4HK6",
    filePath: "/certificates/Coursera SVE5DITJ4HK6.pdf",
    skills: ["Object-Oriented Design", "Memory Optimization", "Data Structures", "Encapsulation"],
    highlight: "Mastery of object-oriented design patterns, memory architectures, encapsulation, and modular C++ data structures.",
  },
  {
    id: "coursera-71d6",
    title: "C++ Programming: Advanced Data Structures & Algorithm Design",
    issuer: "Coursera",
    date: "2024",
    category: "Systems & C/C++",
    credentialId: "71D61XECPP6R",
    verificationUrl: "https://www.coursera.org/account/accomplishments/verify/71D61XECPP6R",
    filePath: "/certificates/Coursera 71D61XECPP6R.pdf",
    skills: ["Advanced Algorithms", "Graph Theory", "Tree Traversal", "Computational Complexity"],
    highlight: "Verification of advanced algorithmic paradigms, graph traversal, search trees, and computational complexity analysis.",
  },
  {
    id: "liveai-internship",
    title: "LiveAI AI Engineering Internship Completion & Recommendation",
    issuer: "LiveAI",
    date: "Feb 2025 – Apr 2025",
    category: "AI & ML",
    credentialId: "LIVEAI-ENG-2025",
    filePath: "/certificates/LIVE AI.pdf",
    skills: ["Llama Fine-Tuning", "Mistral LoRA", "PEFT", "Tokenization Workflows", "SFT on GPUs"],
    highlight: "Official certificate of internship completion fine-tuning open-source LLMs using Hugging Face PEFT and LoRA adapters on GPU clusters.",
  },
  {
    id: "cpp-cert-direct",
    title: "Advanced C++ Professional Competency",
    issuer: "Verified Academy",
    date: "2024",
    category: "Systems & C/C++",
    credentialId: "CPP-PROF-2024",
    filePath: "/certificates/c++_certificate.jpg",
    skills: ["Modern C++", "Object-Oriented Design", "Memory Safety", "Pointers"],
    highlight: "Certified proficiency in modern C++ object-oriented architecture, RAII patterns, and resource management.",
  },
  {
    id: "tantrotsav-tech-fest",
    title: "Tantrotsav '24 Technical Presentation / Honor",
    issuer: "Amrita Vishwa Vidyapeetham",
    date: "2024",
    category: "Hackathon & Honors",
    credentialId: "AMRITA-TANTROTSAV-2024",
    filePath: "/certificates/tantrotstav.jpg",
    skills: ["Systems Engineering", "Competitive Coding", "Algorithm Design"],
    highlight: "Official university award recognized for high-performance algorithm implementation and technical problem solving.",
  },
  {
    id: "verified-tech-credential",
    title: "National Coding Challenge / Technical Assessment",
    issuer: "Accredited Technical Body",
    date: "2024",
    category: "Software Engineering",
    credentialId: "2cf8c0e2-2db4-4611-ac4c-fc7b519fe054",
    filePath: "/certificates/2cf8c0e2-2db4-4611-ac4c-fc7b519fe054 (1).pdf",
    skills: ["Software Architecture", "Data Structures", "Code Quality", "Testing"],
    highlight: "Validated technical competency across full-lifecycle software engineering and systems design.",
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    role: "AI Intern",
    company: "LiveAI",
    period: "02/2025 – 04/2025",
    type: "Internship (Remote)",
    location: "Remote",
    points: [
      "Conducted structured fine-tuning experiments on open-source Large Language Models (Llama 3, Mistral) using the Hugging Face ecosystem.",
      "Engineered Parameter-Efficient Fine-Tuning (PEFT) and Low-Rank Adaptation (LoRA) pipelines on Google Colab / GPU runtimes, reducing training VRAM by over 60%.",
      "Built dataset formatting, tokenization, and supervised fine-tuning (SFT) evaluation workflows, benchmarking perplexity, loss convergence, and structured JSON output.",
      "Collaborated on evaluating agentic tool-use paradigms and instruction-following consistency for domain adaptation.",
    ],
    techStack: ["Python", "PyTorch", "Hugging Face Transformers", "PEFT", "LoRA", "Llama 3", "Mistral", "Google Colab", "CUDA"],
  },
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Amrita Vishwa Vidyapeetham",
    period: "2024 – 2028 (2nd Year)",
    location: "Chennai, India",
    score: "CGPA: 7.02 / 10.0",
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
      "Winner (1st Place among 97 Teams) — FLASH National Hackathon (PillPal platform)",
      "Core contributor to open-source systems engineering initiatives",
      "Represented university in Tantrotsav Technical Fest",
    ],
  },
  {
    degree: "Senior Secondary / Class XII (MPC)",
    institution: "Sri Chaitanya Junior College",
    period: "2023 – 2024",
    location: "Hyderabad, India",
    score: "Aggregate: 88.7%",
    achievements: ["Strong foundation in Mathematics, Physics, and analytical problem solving"],
  },
];

export const SKILL_CATEGORIES = [
  {
    category: "Languages",
    skills: ["Python (3.12/3.14)", "C", "C++ (17/20)", "TypeScript", "JavaScript", "SQL", "Bash / Shell"],
  },
  {
    category: "AI, ML & LLMs",
    skills: ["PyTorch", "Hugging Face Ecosystem", "PEFT & LoRA", "FlashAttention", "Ollama", "ONNX Runtime (AVX2)", "Scikit-Learn", "Vector Databases", "Prompt Engineering"],
  },
  {
    category: "Systems & Security",
    skills: ["Linux PAM (Pluggable Authentication Modules)", "POSIX UNIX Sockets", "V4L2 Video Streaming", "Presentation Attack Detection (PAD)", "AES-256-GCM Encryption", "SSRF Defense", "Docker"],
  },
  {
    category: "Backend & Operations Research",
    skills: ["FastAPI", "Python Flask", "Express.js / Node.js", "Pydantic v2", "SciPy HiGHS MILP", "Monte Carlo Risk Engines", "MySQL Connection Pools", "SQLite"],
  },
  {
    category: "Frontend & Tooling",
    skills: ["Next.js 15 (App Router)", "React 18", "Tailwind CSS", "Framer Motion", "Vite", "Git & GitHub", "Pytest", "Vitest", "Vercel"],
  },
];

export const ENGINEERING_PILLARS = [
  {
    title: "Local-First AI & Agentic Systems",
    iconName: "Cpu",
    tagline: "Deterministic Local Agency",
    description:
      "Architecting AI agents that refuse hallucination through AST symbol indexing, strict permission-gated code synthesis proposals, and physical byte-level verification.",
    featuredProjects: ["VIDURA (22.4k SLOC)", "NanoCoder (12.29M)"],
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    title: "Linux Systems & Security Engineering",
    iconName: "Shield",
    tagline: "Low-Latency PAM & Biometrics",
    description:
      "Writing native C Linux Pluggable Authentication Modules (PAM) and ONNX AVX2 pipelines that authenticate users in under 800ms with 3-tier presentation attack detection.",
    featuredProjects: ["BLINK (pam_blink.so)", "KavachAI"],
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
  {
    title: "Deep Learning & Transformers from Scratch",
    iconName: "Zap",
    tagline: "Zero-Wrapper Architecture",
    description:
      "Implementing decoder-only autoregressive GPT Transformers directly in PyTorch with custom Byte-Level BPE tokenization and bfloat16 FlashAttention.",
    featuredProjects: ["NanoCoder (GPT)", "LiveAI Fine-Tuning"],
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    title: "Full-Stack & Decision Optimization",
    iconName: "BarChart3",
    tagline: "Operations Research & Streaming",
    description:
      "Formulating mixed-integer linear programming (MILP) fleet schedules with the SciPy HiGHS solver and executing 10,000-run vectorized Monte Carlo risk engines.",
    featuredProjects: ["VARUNA (MILP)", "Clover CRM"],
    color: "bg-amber-50 border-amber-200 text-amber-700",
  },
];
