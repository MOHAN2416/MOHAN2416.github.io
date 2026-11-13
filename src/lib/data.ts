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
  headline: "Software & AI Developer",
  bio: "Computer Science student at Amrita Vishwa Vidyapeetham (Chennai). I build practical, reliable software—including offline AI coding helpers, instant face-unlock security for Linux laptops, and lightweight tools that run without expensive cloud servers.",
  subheadline:
    "Building practical, reliable software—including offline AI coding helpers, instant face-unlock security for Linux laptops, and lightweight tools that run without expensive cloud servers.",
  location: "Chennai / Hyderabad, India",
  email: "mohana21062007@gmail.com",
  phone: "+91 7671074608",
  github: "https://github.com/MOHAN2416",
  linkedin: "https://linkedin.com/in/mohan-surendra",
  availabilityStatus: "Open to 2026 / 2027 Software and AI Engineering Internships & Roles",
  summary:
    "Software and AI developer focused on building practical, reliable applications. Experience ranges from offline AI coding helpers and Linux biometric security to full-stack web platforms with verified automated testing and measured performance.",
};

export const CORE_METRICS = [
  { label: "Project Size", value: "22,423 Lines", context: "Total code in flagship VIDURA across 98 Python files" },
  { label: "Reliability", value: "456 / 456", context: "100% test pass rate in 6.57s execution time" },
  { label: "Face Unlock", value: "~800 ms", context: "Instant Linux login with 3-layer anti-spoofing check" },
  { label: "Hackathon Win", value: "1st Place", context: "Ranked 1st place among 97 competing engineering teams nationwide" },
];

export const PROJECTS: Project[] = [
  {
    id: "vidura",
    slug: "vidura",
    title: "VIDURA",
    tagline: "Offline AI Coding Assistant with Built-In Safety Checks",
    category: "AI Agents & LLMs",
    badge: "Flagship Project #1",
    githubUrl: "https://github.com/MOHAN2416/VIDURA",
    isFlagship: true,
    sloc: "22,423 Lines (98 Python files)",
    testsCount: "456 / 456 Tests",
    passRate: "100% in 6.57s",
    latencyHeadline: "45.44 ms Search Speed",
    techStack: ["Python 3.14", "Ollama", "Gemma 4", "Python AST", "SQLite Vector Index", "Pytest", "Argparse"],
    summary:
      "A private AI coding helper that reads your codebase, suggests bug fixes, and waits for your approval before editing any file—then runs automated tests to prove nothing broke.",
    cardMetrics: [
      { label: "PROJECT SIZE", value: "22,423 Lines", sub: "98 Python files" },
      { label: "RELIABILITY", value: "456 / 456 Passed", sub: "100% test pass rate" },
      { label: "SEARCH SPEED", value: "45.44 ms", sub: "Instant code lookup" },
    ],
    architectureHighlights: [
      "Offline AI router that automatically redacts API keys and secrets before any outside communication.",
      "Safety approval gate that requires you to review and type '/approve' before any file is saved.",
      "Byte-by-byte file validator and syntax compiler ensuring zero corrupted code reaches your disk.",
      "Built-in experience database that remembers past bug fixes and mistakes to improve future recommendations.",
      "Indexes 1,433 functions and classes across your project with instant 45.44ms search.",
    ],
    benchmarks: [
      { metric: "Total Codebase Size", value: "22,423 Lines", context: "13,951 source + 8,472 test lines across 98 files" },
      { metric: "Automated Test Suite", value: "456 / 456", context: "100% pass rate in 6.57s execution time" },
      { metric: "Indexed Code Symbols", value: "1,433", context: "175 classes, 445 functions, 602 methods" },
      { metric: "Search Speed", value: "45.44 ms", context: "1,258 code chunks indexed in 1.04s" },
      { metric: "Memory Footprint", value: "112.93 MB", context: "Lightweight RAM usage during active indexing" },
    ],
    latencyStages: [
      { stage: "Code Structure Scan", timeMs: 12.3, description: "Extracts functions and classes from disk" },
      { stage: "Fast Code Search", timeMs: 45.4, description: "Finds relevant snippets across 1,258 chunks" },
      { stage: "Secret Redaction Check", timeMs: 8.7, description: "Scans for secret tokens and chooses model" },
      { stage: "Proposed Fix Generation", timeMs: 24.1, description: "Prepares clear diff proposal for review" },
      { stage: "File Verification & Test", timeMs: 15.2, description: "Checks file integrity and runs tests" },
    ],
    architectureDiagramNodes: [
      { id: "usr", label: "User Prompt", tech: "Terminal / CLI", type: "input", detail: "Accepts your feature or bug fix request" },
      { id: "ast", label: "Code Indexer", tech: "Python ast & SQLite", type: "process", detail: "Indexes 1,433 symbols across 98 files" },
      { id: "router", label: "Local AI Model", tech: "Ollama / Gemma 4", type: "security", detail: "Runs offline and redacts sensitive keys" },
      { id: "proposal", label: "Safety Gate", tech: "Approval Gate", type: "security", detail: "Waits for your '/approve' command" },
      { id: "disk", label: "File Validator & Tests", tech: "Pytest Sandbox", type: "storage", detail: "Verifies file integrity and runs tests" },
    ],
    demoType: "vidura-cli",
    caseStudy: {
      problemStatement:
        "Cloud-based AI coding assistants can accidentally upload private company code or secret API keys over the internet, make unwanted changes without asking, and break existing code. VIDURA solves this by running completely offline on your computer. It inspects your project, writes a clear proposal of suggested edits, waits for you to type '/approve', and automatically tests everything before saving.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                                 USER INPUT / CLI                                |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                         FAST OFFLINE CODE INDEXER                               |
|   - Catalogs 1,433 functions, classes, and methods across 98 Python files       |
|   - Instant 45.44 ms search across 1,258 code snippets in a local SQLite database|
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                           LOCAL AI MODEL & PRIVACY SHIELD                       |
|   - Runs private AI models on your computer with zero cloud dependency          |
|   - Automatically redacts API keys and passwords before any outside data leaves |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                             HUMAN APPROVAL SAFETY GATE                          |
|   - Displays a clean, color-coded preview of exactly what will change           |
|   - Freezes disk writes until you review and type '/approve'                    |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                     AUTOMATED FILE VERIFICATION & TESTS                         |
|   - Verifies file contents byte-for-byte to ensure no corrupted edits           |
|   - Runs 456 automated tests in an isolated sandbox in 6.57 seconds             |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Built an offline search index that catalogs classes and functions so the AI understands your entire codebase in milliseconds.",
        "Designed a safety gate that pauses and displays a color-coded diff, requiring you to approve any change before it touches your files.",
        "Created a file validator that checks every modified file byte-for-byte to prevent corrupted or half-written code.",
        "Integrated an automated test runner that executes 456 tests inside an isolated sandbox in 6.57 seconds.",
      ],
      benchmarksTable: [
        { category: "Project Size", metric: "Total Lines", value: "22,423 lines", verificationMethod: "cloc across 98 Python files" },
        { category: "Test Suite", metric: "Automated Tests", value: "456 / 456 (100%)", verificationMethod: "pytest in 6.57s" },
        { category: "Code Indexing", metric: "Indexed Symbols", value: "1,433 symbols", verificationMethod: "SQLite symbol indexer" },
        { category: "Search Speed", metric: "Lookup Time", value: "45.44 ms", verificationMethod: "Local search benchmark" },
        { category: "RAM Usage", metric: "Memory Used", value: "112.93 MB", verificationMethod: "System memory monitor" },
      ],
      repositoryStructure: `vidura/
├── core/
│   ├── codebase.py          # Indexes project functions and classes
│   ├── router.py            # Local model manager and privacy shield
│   └── diff_engine.py       # Previews code changes clearly
├── security/
│   ├── gate.py              # Approval gate requiring '/approve'
│   ├── blacklist.py         # Protects .env files and passwords
│   └── disk_verifier.py     # Verifies files before saving
├── rag/
│   └── vector_store.py      # Fast local search index
└── tests/                   # 456 automated test files`,
      limitations: [
        "Works best with Python codebases; support for JavaScript, TypeScript, and Rust is in progress.",
        "Requires a computer with at least 8 GB of RAM to run the local AI model smoothly.",
      ],
    },
  },
  {
    id: "nanocoder",
    slug: "nanocoder",
    title: "NanoCoder",
    tagline: "Lightweight Offline Code Autocomplete Model",
    category: "AI Agents & LLMs",
    badge: "Trained From Scratch",
    githubUrl: "https://github.com/MOHAN2416/NanoCoder",
    isFlagship: false,
    sloc: "2,410 Lines (PyTorch + Python)",
    testsCount: "42 / 42 Tests",
    passRate: "100% Passing",
    latencyHeadline: "21.48 ms per token",
    techStack: ["PyTorch", "Python", "bfloat16", "FlashAttention", "Custom Byte BPE", "AdamW", "CUDA"],
    summary:
      "A compact AI model built from scratch in PyTorch that predicts and finishes Python code and Linux terminal commands directly on a normal laptop—no internet needed.",
    cardMetrics: [
      { label: "MODEL SIZE", value: "12.29M Params", sub: "Fits on a basic CPU" },
      { label: "BENCHMARKS", value: "40 Prompts", sub: "Python & Bash tested" },
      { label: "TYPING SPEED", value: "46.6 tok/sec", sub: "21.48 ms per token" },
    ],
    architectureHighlights: [
      "12.29 million parameters designed to fit inside standard laptop CPU memory with zero cloud servers.",
      "Custom 4,096-word vocabulary tailored specifically for Python syntax and Linux Bash terminal commands.",
      "Trained on an NVIDIA T4 GPU with loss dropping from 8.37 down to 2.07 over 5,000 training steps.",
      "Generates 46.6 words per second on standard CPUs with instant responsiveness.",
      "Produces 60% valid Bash scripts and 45% syntactically valid Python functions on automated benchmarks.",
    ],
    benchmarks: [
      { metric: "Model Parameters", value: "12.29 Million", context: "Lightweight 6-layer architecture" },
      { metric: "CPU Generation Speed", value: "46.6 tok/sec", context: "21.48 ms per generated token on standard CPU" },
      { metric: "Training Convergence", value: "8.37 -> 2.07", context: "Over 75% error reduction in 5,000 steps" },
      { metric: "Bash Command Validity", value: "60.0%", context: "Verified with automated bash syntax checks" },
      { metric: "Python Syntax Validity", value: "45.0%", context: "Verified with Python syntax parser tests" },
      { metric: "Evaluation Prompts", value: "40 Prompts", context: "Evaluated on real-world coding snippets" },
    ],
    demoType: "nanocoder-lab",
    caseStudy: {
      problemStatement:
        "Most AI code generators require huge cloud servers, fast internet connections, and expensive monthly subscriptions. NanoCoder was created to prove that a small, focused 12.29-million parameter AI model can be trained from scratch to autocomplete Python code and Linux commands right on a normal laptop CPU without any internet.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                       CUSTOM 4,096-WORD CODE VOCABULARY                         |
|   - Tailored tokenizer trained on real Python and Bash code snippets            |
|   - 256-word context memory designed for quick single-function autocompletes   |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                         6-LAYER PYTORCH NEURAL NETWORK                          |
|   - 12.29M parameters built entirely from scratch with raw math                 |
|   - Fast attention mechanisms running smoothly on standard CPUs                 |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                        INSTANT OFFLINE CODE GENERATION                          |
|   - Generates 46.6 words per second directly on your laptop                     |
|   - Automatically tests generated scripts for valid Python and Bash syntax      |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Built the core Transformer neural network from scratch in PyTorch using raw math and attention mechanisms.",
        "Trained a custom code vocabulary from scratch so the model understands Python and Bash syntax without wasting memory.",
        "Trained the model on an NVIDIA GPU using modern speedups, reducing prediction error by over 75% across 5,000 steps.",
        "Created automated testing scripts that verify generated code can be parsed and executed without errors.",
      ],
      benchmarksTable: [
        { category: "Model Size", metric: "Parameters", value: "12.29 Million", verificationMethod: "PyTorch tensor count" },
        { category: "Generation Speed", metric: "Speed per Token", value: "21.48 ms", verificationMethod: "Measured on standard CPU" },
        { category: "Throughput", metric: "Words per Second", value: "46.6 tokens/sec", verificationMethod: "Live generation benchmark" },
        { category: "Error Reduction", metric: "Training Loss", value: "8.37 -> 2.07", verificationMethod: "5,000 training steps" },
        { category: "Code Quality", metric: "Valid Syntax Rate", value: "60% Bash / 45% Python", verificationMethod: "Automated parser tests" },
      ],
      repositoryStructure: `nanocoder/
├── model/
│   ├── transformer.py      # Core neural network built from scratch
│   ├── attention.py        # Fast attention mechanism
│   └── tokenizer.py        # Custom 4,096-word code vocabulary
├── train/
│   ├── dataset.py          # Fast training data loader
│   └── trainer.py          # Model training and optimization loops
└── eval/
    └── syntax_check.py     # Automated syntax tests for Python & Bash`,
      limitations: [
        "Designed for short, single-function completions rather than writing entire multi-file software projects from scratch.",
        "Remembers up to 256 words (tokens) at a time to stay lightweight on basic laptops.",
      ],
    },
  },
  {
    id: "blink",
    slug: "blink",
    title: "BLINK",
    tagline: "Instant Face Unlock for Ubuntu Linux Laptops",
    category: "Systems & Security",
    badge: "Flagship Project #2",
    githubUrl: "https://github.com/MOHAN2416/BLINK",
    isFlagship: true,
    sloc: "3,840 Lines (C + Python)",
    testsCount: "78 / 78 Tests",
    passRate: "100% Passing",
    latencyHeadline: "~800 ms Total Unlock Speed",
    techStack: ["C (pam_blink.so)", "Python 3.12", "ONNX Runtime", "PySide6 & V4L2", "YuNet", "ArcFace 512-d", "MiniFASNetV2", "Systemd"],
    summary:
      "Hands-free face login for Ubuntu computers that unlocks your screen and terminal commands in under 1 second, works in the dark using infrared, and blocks fake photo attempts.",
    cardMetrics: [
      { label: "UNLOCK SPEED", value: "~800 ms", sub: "< 15 ms password backup" },
      { label: "RELIABILITY", value: "78 Tests Passed", sub: "Full camera & login suite" },
      { label: "SECURITY", value: "3-Layer Check", sub: "Blocks photo/screen fakes" },
    ],
    architectureHighlights: [
      "Native Linux login plugin written in C that connects directly to Ubuntu system authentication.",
      "Unlocks in under 1 second from webcam activation to identity confirmation.",
      "3-layer anti-spoofing check that spots phone screen glare, depth, and eye blinks.",
      "Automatic infrared night mode that turns on when ambient room light falls below 35 lux.",
      "Instant fail-safe fallback to standard password prompt in under 15ms if the camera is unavailable.",
      "AES-256 encryption protects face measurements with zero facial photographs stored on disk.",
    ],
    benchmarks: [
      { metric: "Total Cold Unlock", value: "~800 ms", context: "Camera open to face detection to unlock" },
      { metric: "Password Fallback", value: "< 15 ms", context: "Instant fallback to password if camera offline" },
      { metric: "Anti-Spoofing Layers", value: "3 Checks", context: "AI screen detector + light reflections + blink check" },
      { metric: "Automated Tests", value: "78 / 78", context: "100% pass rate across login & camera tests" },
      { metric: "Privacy Protection", value: "AES-256-GCM", context: "Encrypted face vectors; zero raw photos saved" },
    ],
    latencyStages: [
      { stage: "Camera Start & Frame Read", timeMs: 110, description: "Captures crisp camera frame" },
      { stage: "Face Detection", timeMs: 32, description: "Finds face position instantly" },
      { stage: "Anti-Spoofing Check", timeMs: 48, description: "Verifies you are a real living person" },
      { stage: "Face Identity Match", timeMs: 65, description: "Compares face to your saved profile" },
      { stage: "Unlock Confirmation", timeMs: 2, description: "Sends unlock signal to Ubuntu" },
    ],
    architectureDiagramNodes: [
      { id: "pam", label: "Ubuntu Login Hook", tech: "C Plugin", type: "input", detail: "Catches login and sudo password prompts" },
      { id: "ipc", label: "Fast Internal Channel", tech: "UNIX Socket", type: "process", detail: "Communicates with background service" },
      { id: "cam", label: "Webcam Manager", tech: "RGB + Night IR", type: "input", detail: "Switches to infrared in dark rooms" },
      { id: "infer", label: "Fast Face AI", tech: "ONNX Runtime", type: "process", detail: "Locates face and checks for spoofing" },
      { id: "vault", label: "Encrypted Vault", tech: "AES-256 Database", type: "storage", detail: "Stores encrypted face measurements" },
    ],
    demoType: "blink-hud",
    caseStudy: {
      problemStatement:
        "Linux laptops lack an easy, built-in face unlock system like Apple Face ID or Windows Hello. Existing DIY scripts freeze terminal password prompts if the camera fails and get tricked by photos on a smartphone. BLINK plugs straight into the Linux login system, unlocks your computer in less than a second, blocks photo fakes, and instantly reverts to your regular password if needed.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                        UBUNTU SYSTEM LOGIN HOOK (C Plugin)                      |
|   - Intercepts login screen and sudo terminal prompts                          |
|   - Instantly falls back to password in < 15ms if camera is covered            |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                         SMART WEBCAM & NIGHT VISION                             |
|   - Normal light: Uses standard webcam                                          |
|   - Dark rooms: Automatically switches to infrared camera sensor                |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                          3-LAYER ANTI-SPOOFING CHECK                            |
|   - Checks for phone screen glare, 3D face structure, and natural eye blinks    |
|   - Successfully blocks fake paper printouts and phone screen photos            |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                     ENCRYPTED PROFILE & INSTANT UNLOCK                          |
|   - Confirms identity against your encrypted profile in ~800 milliseconds       |
|   - Never saves raw photos to disk to protect your privacy                      |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Wrote a native C plugin that intercepts login and sudo password prompts without freezing the system.",
        "Integrated lightweight AI face-detection models that find faces in 32 milliseconds on normal CPUs.",
        "Created a 3-layer anti-cheat system that analyzes screen light reflections, 3D depth, and natural eye blinks to reject photo spoofing.",
        "Encrypted all facial measurements with bank-grade AES-256 encryption, storing zero raw photos on disk for complete privacy.",
      ],
      benchmarksTable: [
        { category: "Unlock Speed", metric: "Total Time", value: "~800 ms", verificationMethod: "Camera open to unlock signal" },
        { category: "Reliability", metric: "Password Fallback", value: "< 15 ms", verificationMethod: "Instant fallback if camera offline" },
        { category: "Security", metric: "Spoof Block Rate", value: "99.4%", verificationMethod: "Tested with photos and 4K screens" },
        { category: "Test Suite", metric: "Automated Tests", value: "78 / 78 (100%)", verificationMethod: "Automated camera & login tests" },
        { category: "Privacy", metric: "Photos Saved", value: "0 photos", verificationMethod: "File system privacy check" },
      ],
      repositoryStructure: `blink/
├── pam/
│   ├── pam_blink.c         # C plugin connecting to Ubuntu login
│   └── socket_client.c     # Fast communication channel
├── daemon/
│   ├── camera_v4l2.py      # Camera controller with auto night mode
│   ├── pad_engine.py       # 3-layer anti-spoofing checker
│   ├── onnx_inference.py   # Fast face detection models
│   └── vault.py            # Encrypted face profile storage
└── tests/
    └── test_pam_pipeline.py# 78 passing automated tests`,
      limitations: [
        "Built specifically for Linux (Ubuntu/Debian) webcams; Windows and macOS are not supported.",
        "Night unlock requires laptops with built-in infrared cameras (common on modern business laptops like ThinkPads and Dells).",
      ],
    },
  },
  {
    id: "varuna",
    slug: "varuna",
    title: "VARUNA",
    tagline: "Cargo Ship Cost Predictor & Route Planner",
    category: "Optimization & Full-Stack",
    badge: "Flagship Project #3",
    githubUrl: "https://github.com/MOHAN2416/VARUNA",
    isFlagship: true,
    sloc: "8,920 Lines (FastAPI + React)",
    testsCount: "273 Tests (254 Backend + 19 UI)",
    passRate: "100% Passing",
    latencyHeadline: "177 ms Route Decision Speed",
    techStack: ["FastAPI", "React 18", "TypeScript", "SciPy", "SQLite", "Python", "Tailwind CSS"],
    summary:
      "A web dashboard that forecasts ocean shipping prices, checks which cargo ships fit into specific ports, picks the lowest-cost vessel, and simulates 10,000 delay scenarios.",
    cardMetrics: [
      { label: "COVERAGE", value: "3,630 Ports", sub: "200 ships & 9 sea routes" },
      { label: "RELIABILITY", value: "273 Tests Passed", sub: "Backend & UI verified" },
      { label: "SPEED", value: "177 ms", sub: "Instant route decision" },
    ],
    architectureHighlights: [
      "Machine learning model that forecasts shipping rates within $3.94 per metric ton.",
      "Instant route optimizer that evaluates 200 cargo vessels and finds the lowest-cost match in 128 ms.",
      "Fast risk simulator running 10,000 delay and fuel scenarios in 36 ms.",
      "Includes a global database of 3,630 international sea ports and 9 major ocean shipping corridors.",
      "Backed by 273 verified automated tests across both backend APIs and web interface.",
    ],
    benchmarks: [
      { metric: "Rate Forecast Error", value: "$3.94 / MT", context: "Highly accurate rate predictions" },
      { metric: "Total Decision Time", value: "177 ms", context: "Instant full route and cost calculation" },
      { metric: "Ship Allocation Solver", value: "128 ms", context: "Checks 200 vessels against port limits" },
      { metric: "10,000 Risk Scenarios", value: "36 ms", context: "Simulates weather delays and fuel costs" },
      { metric: "Automated Test Suite", value: "273 Tests", context: "254 backend + 19 frontend passing tests" },
    ],
    latencyStages: [
      { stage: "Port Water Depth Check", timeMs: 1.06, description: "Ensures vessel fits port dimensions" },
      { stage: "Shipping Rate Forecast", timeMs: 9.87, description: "Predicts voyage price with AI" },
      { stage: "Cheapest Ship Match", timeMs: 128.73, description: "Picks lowest-cost available vessel" },
      { stage: "10,000 Risk Simulations", timeMs: 36.57, description: "Calculates potential weather delays" },
      { stage: "Dashboard Response", timeMs: 0.76, description: "Sends route recommendations to browser" },
    ],
    demoType: "varuna-sim",
    caseStudy: {
      problemStatement:
        "Planning international ocean shipping is risky because fuel prices fluctuate, weather causes port delays, and choosing the wrong vessel size can cost companies thousands of dollars per day. VARUNA analyzes historical cargo freight rates, matches ship sizes to port dimensions, calculates the cheapest travel route, and runs simulated weather risk checks.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                           SHIPPING REQUEST & PORT INPUT                         |
|   - Select cargo origin, destination port, and cargo weight (e.g. 80,000 tons)  |
|   - Automatically checks harbor depth and canal size limits                     |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                         AI FREIGHT RATE FORECASTER                              |
|   - Predicts ocean voyage price within $3.94 per metric ton                     |
|   - Factors in global fuel price trends and seasonal weather patterns           |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                       VESSEL OPTIMIZER & FLEET SCHEDULER                        |
|   - Scans 200 available cargo ships and assigns the cheapest vessel in 128 ms   |
|   - Guarantees ship dimensions fit target harbor berths                         |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                      10,000-SCENARIO RISK SIMULATION ENGINE                     |
|   - Simulates 10,000 potential weather delays and fuel price spikes in 36 ms    |
|   - Shows managers the realistic financial risk before booking                  |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Trained a machine learning model on historical shipping rates that predicts voyage prices within $3.94 per metric ton.",
        "Built a math solver that scans 200 available vessels and picks the lowest-cost ship that fits port depth constraints.",
        "Engineered a fast simulation engine that runs 10,000 simulated weather and fuel price scenarios in 36 milliseconds.",
        "Created a responsive web dashboard with FastAPI and React, backed by 273 automated tests.",
      ],
      benchmarksTable: [
        { category: "Rate Accuracy", metric: "Average Error", value: "$3.94 / MT", verificationMethod: "Tested on historical voyages" },
        { category: "Solver Speed", metric: "Calculation Time", value: "128 ms", verificationMethod: "200-vessel allocation test" },
        { category: "Risk Engine", metric: "10k Simulations", value: "36 ms", verificationMethod: "Fast simulation benchmark" },
        { category: "Total Speed", metric: "Full Response Time", value: "177 ms", verificationMethod: "End-to-end API test" },
        { category: "Test Suite", metric: "Automated Tests", value: "273 Tests (100%)", verificationMethod: "Full test suite pass" },
      ],
      repositoryStructure: `varuna/
├── api/
│   ├── routes.py           # Web API endpoints for routes and rates
│   └── schemas.py          # Port data validation models
├── core/
│   ├── ml_forecaster.py    # Shipping rate prediction model
│   ├── milp_solver.py      # Lowest-cost vessel allocation solver
│   └── monte_carlo.py      # 10,000-scenario risk simulator
└── tests/
    ├── test_api.py         # 254 backend automated tests
    └── test_frontend.ts    # 19 web interface tests`,
      limitations: [
        "Currently tuned for dry-bulk cargo (like grain, coal, and ore) rather than container box shipping.",
        "Uses seasonal weather patterns rather than real-time live satellite weather radar.",
      ],
    },
  },
  {
    id: "kavachai",
    slug: "kavachai",
    title: "KavachAI",
    tagline: "24/7 Website Security & Tamper Alert Monitor",
    category: "Systems & Security",
    badge: "Security & Web",
    githubUrl: "https://github.com/MOHAN2416/KavachAI",
    isFlagship: false,
    sloc: "4,680 Lines (Node.js + React)",
    testsCount: "54 / 54 Tests",
    passRate: "100% Passing",
    latencyHeadline: "< 1.2s Audit Cycle",
    techStack: ["Node.js", "React", "TypeScript", "Express", "Docker", "SQLite"],
    summary:
      "Automatically checks websites on a schedule, compares full-page screenshots to catch unauthorized changes or security gaps, explains the risk in plain English, and keeps a tamper-proof log.",
    cardMetrics: [
      { label: "VISUAL CHECK", value: "Screenshot Diff", sub: "Spots unauthorized edits" },
      { label: "ACTIVITY LOG", value: "Tamper-Proof", sub: "Verifiable history chain" },
      { label: "PLATFORM", value: "Web Dashboard", sub: "Node.js, React & Docker" },
    ],
    architectureHighlights: [
      "Automated web browser bot that captures full-length screenshots on a scheduled timeline.",
      "Visual comparison system that flags unexpected text and layout defacements immediately.",
      "Detects hidden script injections and unauthorized iframe redirects.",
      "Tamper-proof activity ledger where past alerts cannot be secretly altered or erased.",
      "Clean web dashboard with user accounts separating administrators from view-only staff.",
    ],
    benchmarks: [
      { metric: "Visual Defacement Check", value: "< 1.2s", context: "Full-page screenshot and visual diff" },
      { metric: "Security Network Filter", value: "100% Blocked", context: "Stops bot from scanning internal networks" },
      { metric: "Audit Verification", value: "< 15 ms", context: "Instant tamper-proof history check" },
      { metric: "Automated Tests", value: "54 / 54", context: "100% test pass rate across bot and dashboard" },
    ],
    demoType: "kavach-audit",
    caseStudy: {
      problemStatement:
        "Websites can be quietly hacked, defaced, or injected with malicious ads without triggering standard website uptime alerts. KavachAI continuously takes screenshots of your pages in the background, flags any visual or text tampering, explains the security risk in simple plain English, and stores an immutable history log that hackers cannot secretly erase.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                        AUTOMATED SCREENSHOT CAPTURE BOT                         |
|   - Opens web pages in a sandboxed browser on a schedule                        |
|   - Captures full-page screenshots with strict security firewalls               |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                        VISUAL COMPARISON & DEFACEMENT SCAN                      |
|   - Compares new screenshots against your approved baseline image               |
|   - Instantly triggers an alert if unexpected text or layout changes occur      |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                         TAMPER-PROOF AUDIT LOG LEDGER                           |
|   - Stores every security event in a cryptographically locked database          |
|   - Prevents hackers from hiding their tracks by editing past history logs      |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Configured an automated browser bot that navigates to web pages on a schedule and captures full-length screenshots.",
        "Built an image-comparison algorithm that spots visual defacements and unauthorized layout edits immediately.",
        "Created a secure audit log where every alert is cryptographically locked, making it impossible to secretly delete history.",
        "Implemented automatic network filters to ensure the monitoring bot cannot be tricked into scanning internal private networks.",
      ],
      benchmarksTable: [
        { category: "Defacement Detection", metric: "Detection Speed", value: "< 1.2s", verificationMethod: "Screenshot diff testbed" },
        { category: "Network Safety", metric: "Private IP Blocking", value: "100%", verificationMethod: "Security penetration tests" },
        { category: "Ledger Speed", metric: "History Verification", value: "< 15 ms", verificationMethod: "Audit log integrity check" },
        { category: "Test Suite", metric: "Automated Tests", value: "54 / 54 (100%)", verificationMethod: "Automated test suite" },
      ],
      repositoryStructure: `kavachai/
├── src/
│   ├── crawler/            # Automated screenshot capture bot
│   ├── hashing/            # Visual image comparison engine
│   ├── security/           # Network firewall filters
│   └── audit/              # Tamper-proof activity ledger
└── tests/                  # 54 passing automated tests`,
      limitations: [
        "Sites with fast-moving video backgrounds or rotating photo banners may require custom ignore zones to avoid false alarms.",
      ],
    },
  },
  {
    id: "clover-crm",
    slug: "clover-crm",
    title: "Clover CRM",
    tagline: "Smart Sales & Customer Tracking Platform",
    category: "Optimization & Full-Stack",
    badge: "Web App & AI",
    githubUrl: "https://github.com/MOHAN2416/CLOVER_CRM",
    isFlagship: false,
    sloc: "5,120 Lines (Flask + Python)",
    testsCount: "62 / 62 Tests",
    passRate: "100% Passing",
    latencyHeadline: "< 25 ms Live AI Streaming",
    techStack: ["Python", "Flask", "MySQL", "React", "Ollama", "Server-Sent Events"],
    summary:
      "A multi-user customer dashboard that keeps each salesperson's leads private, automatically logs status updates, alerts staff about overdue tasks, and drafts outreach emails live with AI.",
    cardMetrics: [
      { label: "PRIVACY", value: "Per-User Leads", sub: "Isolated sales workspaces" },
      { label: "AI WRITER", value: "Live Streaming", sub: "Drafts emails word-by-word" },
      { label: "AUTOMATION", value: "10s Watchdog", sub: "Auto overdue-task alerts" },
    ],
    architectureHighlights: [
      "Strict data privacy ensuring sales representatives can only view their own assigned customer accounts.",
      "Database triggers automatically record a complete audit trail whenever lead info or deals are edited.",
      "Live AI email writing assistant that streams replies to your browser word-by-word in under 25 milliseconds.",
      "Background watchdog service that checks for overdue tasks and reminders every 10 seconds.",
      "Smart lead scoring system that prioritizes the most promising business deals for your team.",
    ],
    benchmarks: [
      { metric: "AI Stream Latency", value: "< 25 ms", context: "Instant first-word response in browser" },
      { metric: "Database Audit Logging", value: "< 1 ms", context: "Instant background update records" },
      { metric: "Lead Privacy Segregation", value: "100%", context: "Full workspace data isolation" },
      { metric: "Automated Tests", value: "62 / 62", context: "100% test pass rate across app" },
    ],
    demoType: "clover-stream",
    caseStudy: {
      problemStatement:
        "Sales teams often struggle with messy spreadsheets, salespeople accidentally seeing each other's private accounts, and clunky AI tools that pause for 10 seconds before generating answers. Clover CRM gives each team member a secure private portal, logs customer interactions automatically in a database, alerts reps when follow-up calls are overdue, and streams AI email suggestions word-by-word instantly.",
      architectureDiagramText: `+---------------------------------------------------------------------------------+
|                       WEB DASHBOARD & SALES REP PORTAL                          |
|   - Log in to your private workspace with protected account views               |
|   - View customer deals, contact histories, and upcoming reminders              |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                         AUTOMATIC DATABASE AUDIT LOGS                           |
|   - Automatically records a permanent timestamped log whenever a deal changes   |
|   - Prevents accidental data loss or dispute over account ownership             |
+---------------------------------------------------------------------------------+
                                         |
                                         v
+---------------------------------------------------------------------------------+
|                          LIVE STREAMING AI WRITING HELPER                       |
|   - Generates personalized customer outreach emails word-by-word in real time   |
|   - Delivers first text chunk in under 25 milliseconds                          |
+---------------------------------------------------------------------------------+`,
      technicalImplementation: [
        "Engineered strict user permissions so sales reps only see their own assigned customer accounts.",
        "Used native database triggers that automatically record an audit trail whenever an account or deal status changes.",
        "Built an instant AI assistant that streams suggested emails and customer summaries directly to the browser without lag.",
        "Created a background task monitor that checks for overdue client follow-ups every 10 seconds.",
      ],
      benchmarksTable: [
        { category: "AI Assistant", metric: "First Word Speed", value: "< 25 ms", verificationMethod: "Browser network test" },
        { category: "Audit Logging", metric: "Database Speed", value: "< 0.8 ms", verificationMethod: "Database trigger latency" },
        { category: "Data Privacy", metric: "Account Isolation", value: "100%", verificationMethod: "Cross-account access tests" },
        { category: "Test Suite", metric: "Automated Tests", value: "62 / 62 (100%)", verificationMethod: "Full test suite pass" },
      ],
      repositoryStructure: `clover_crm/
├── app/
│   ├── auth.py             # User login and privacy permissions
│   ├── stream.py           # Real-time AI text streaming
│   └── leads.py            # Customer lead scoring and pipeline
├── db/
│   └── triggers.sql        # Automatic database audit triggers
└── tests/
    └── test_crm.py         # 62 automated test cases`,
      limitations: [
        "Requires a MySQL database server running with database trigger permissions.",
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
    highlight: "Hands-on certification covering low-level pointers, computer memory management, and structured software development in C and modern C++.",
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
    highlight: "Validated skills in memory allocation, pointer manipulation, and writing clean, crash-resistant C++ code.",
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
    highlight: "Practical mastery of modular object-oriented software design, reusable data structures, and memory efficiency.",
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
    highlight: "Verification of efficient algorithm design, graph traversal, search trees, and writing fast, optimized software.",
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
    highlight: "Official certificate of internship completion fine-tuning open-source language models on GPU clusters with high training efficiency.",
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
    highlight: "Certified proficiency in modern C++ object-oriented architecture and safe system resource management.",
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
    highlight: "Validated technical competency across practical software engineering, data structures, and code testing.",
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
      "Fine-tuned open-source AI models (Llama and Mistral) to make them faster and more accurate on specialized company tasks.",
      "Used modern training techniques (PEFT and LoRA) to cut GPU memory usage by over 60%, allowing models to train on low-cost hardware.",
      "Built automated pipelines to clean data, evaluate model answers, and ensure AI outputs consistently followed required formats.",
      "Benchmarked prompt instructions and model speed to ensure reliable performance in production tools.",
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
      "Core contributor to open-source software and developer tools",
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
    category: "Programming Languages",
    skills: ["Python (3.12/3.14)", "C", "C++ (17/20)", "TypeScript", "JavaScript", "SQL", "Bash / Shell"],
  },
  {
    category: "AI & Machine Learning",
    skills: ["PyTorch", "Hugging Face", "Model Fine-Tuning (LoRA)", "FlashAttention", "Ollama", "ONNX Runtime", "Scikit-Learn", "Vector Databases", "Prompt Engineering"],
  },
  {
    category: "Linux & Security",
    skills: ["Linux PAM Login Hooks", "UNIX Sockets", "Webcam Video Streams (V4L2)", "Anti-Spoofing Checks", "AES-256 Encryption", "Web Security (SSRF Defense)", "Docker"],
  },
  {
    category: "Backend & Databases",
    skills: ["FastAPI", "Python Flask", "Express.js / Node.js", "Pydantic v2", "Math Solvers (SciPy)", "Risk Simulation", "MySQL Database Pools", "SQLite"],
  },
  {
    category: "Web & Developer Tools",
    skills: ["Next.js 15", "React 18", "Tailwind CSS", "Framer Motion", "Vite", "Git & GitHub", "Automated Testing (Pytest)", "Vitest", "Vercel"],
  },
];

export const ENGINEERING_PILLARS = [
  {
    title: "Safe & Offline AI Helpers",
    iconName: "Cpu",
    tagline: "Private & Tested Code Generation",
    description:
      "Building AI tools that run privately on your own computer without internet, ask for permission before editing files, and test their own changes.",
    featuredProjects: ["VIDURA", "NanoCoder"],
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    title: "Fast & Secure Face Login",
    iconName: "Shield",
    tagline: "Under-1-Second Linux Unlock",
    description:
      "Creating Windows-Hello-style face unlock for Ubuntu laptops that logs you in under 1 second—even in total darkness—and blocks photo or screen fakes.",
    featuredProjects: ["BLINK", "KavachAI"],
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
  },
  {
    title: "Lightweight AI from Scratch",
    iconName: "Zap",
    tagline: "Runs Fast on Standard Laptops",
    description:
      "Training compact code-autocomplete models from the ground up so they run smoothly on standard laptops without needing cloud GPUs.",
    featuredProjects: ["NanoCoder"],
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    title: "Web Apps & Smart Cost Planners",
    iconName: "BarChart3",
    tagline: "Lead Tracking & Sea Route Calculators",
    description:
      "Building full-stack web platforms that help businesses manage customer leads and choose the lowest-cost ocean shipping routes.",
    featuredProjects: ["VARUNA", "Clover CRM"],
    color: "bg-amber-50 border-amber-200 text-amber-700",
  },
];
