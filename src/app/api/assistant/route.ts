import { NextRequest, NextResponse } from "next/server";

interface KnowledgeMatch {
  patterns: RegExp[];
  category: string;
  generateAnswer: () => {
    answer: string;
    relevantProjects?: string[];
    suggestedQuestions: string[];
  };
}

const KNOWLEDGE_BASE: KnowledgeMatch[] = [
  {
    patterns: [/\b(vidura|ast|code proposal|self-develop|permission gate|5-tier)\b/i],
    category: "VIDURA Agent",
    generateAnswer: () => ({
      answer: `### VIDURA — Local-First Self-Developing AI Assistant

**VIDURA** is Mohan's flagship autonomous agent embodying deterministic engineering discipline over stochastic code generation:

* **AST Symbol Resolution:** Rather than passing unstructured text, VIDURA parses Python \`ast\` to index **1,433 unique symbols** (175 classes, 445 functions, 602 methods) across 98 modules with **45.44 ms** hybrid RAG retrieval latency.
* **5-Tier Model Router:** Routes queries deterministically starting with local models (\`gemma4:e4b-it-qat\`) with real-time regex secret redaction before any cloud fallback.
* **Permission Gate (\`CodeChangeProposal\`):** Code is never executed directly. Proposed diffs require an explicit \`/approve\` human authorization gate.
* **Byte-for-Byte Disk Parity & Pytest Sandbox:** Following any approved change, the system performs a physical SHA-256 byte-level disk verification, AST syntax check, and triggers a sandboxed **456 / 456 automated test suite** running in **6.57s** (100% pass rate).
* **Codebase Scale:** **22,423 total SLOC** (13,951 source + 8,472 test lines).

You can test-drive VIDURA in the **Interactive Labs** on \`/playground\`!`,
      relevantProjects: ["vidura"],
      suggestedQuestions: [
        "How does BLINK's Linux PAM biometric authentication work?",
        "Explain VARUNA's MILP fleet scheduler & Monte Carlo engine.",
        "What did Mohan do during his LiveAI internship?",
      ],
    }),
  },
  {
    patterns: [/\b(blink|biometric|face|pam|linux|camera|ir|onnx|fasnet|arcface|anti-spoof)\b/i],
    category: "BLINK Biometric Suite",
    generateAnswer: () => ({
      answer: `### BLINK — Native C-PAM Linux Biometric Facial Authentication

**BLINK** replaces passwords on Ubuntu 26.04 LTS (\`sudo\` and GDM login) with sub-second biometric verification:

* **Native C-PAM Module:** Implemented in C as \`pam_blink.so\`, communicating over non-blocking UNIX domain sockets to an isolated daemon with a guaranteed **< 15 ms fallback** to password prompt if the daemon is offline.
* **Sub-Second Hardware Pipeline (~800 ms total cold cycle):**
  1. *Camera Acquisition (V4L2):* **~110 ms** (640x480 RGB or 640x360 IR)
  2. *Face Detection (YuNet ONNX):* **~32 ms**
  3. *Presentation Attack Detection (PAD):* **~48 ms** (MiniFASNetV2 + 2D FFT Moiré frequency analysis + blink tracking)
  4. *Feature Extraction (ArcFace 512-d):* **~65 ms**
  5. *Vault Cosine Matching:* **< 2 ms**
* **Dynamic Zero-Light IR Failover:** When ambient luminance drops below **35**, the daemon automatically transitions from \`/dev/video0\` (RGB) to \`/dev/video2\` (Zero-Light Infrared).
* **Cryptographic Vault:** Stored templates are **AES-256-GCM encrypted** 512-d float vectors—zero raw facial images are ever written to disk.
* **Reliability:** **78 / 78 passing tests** covering PAM sandboxes and attack vectors.`,
      relevantProjects: ["blink"],
      suggestedQuestions: [
        "How does VIDURA enforce deterministic code generation?",
        "Tell me about the 10,000 Monte Carlo simulations in VARUNA.",
        "What is Mohan's educational background and CGPA?",
      ],
    }),
  },
  {
    patterns: [/\b(varuna|maritime|freight|milp|highs|monte carlo|var|cvar|coal|hay point)\b/i],
    category: "VARUNA Decision Engine",
    generateAnswer: () => ({
      answer: `### VARUNA — Maritime Freight Forecasting & MILP Decision-Support System

**VARUNA** is an offline-first maritime decision engine uniting quantitative economics with operations research:

* **ML Rate Forecasting:** Ridge regression model delivering **$3.94 / MT Test MAE** (8.52% sMAPE, 89.42% out-of-sample empirical residual coverage).
* **Mean 176.99 ms End-to-End Decision Pipeline:**
  * Feasibility filtering: **1.06 ms**
  * Ridge ML Rate inference: **9.87 ms**
  * HiGHS Mixed-Integer Linear Programming (MILP) solver: **128.73 ms** (assigns optimal vessel from 200 candidates)
  * Vectorized 10,000 Monte Carlo risk simulation: **36.57 ms**
  * Governance & Pydantic validation: **0.76 ms**
* **Risk Engine:** Computes 95% Value-at-Risk (**$2,438,207**) and 95% Conditional VaR (**$2,453,868**) across bunker fuel and demurrage volatility.
* **Global Scale:** Pre-loaded with **3,630 ports**, **200 vessels**, and **9 trade corridors** with **273 automated tests** (254 Pytest + 19 Vitest).`,
      relevantProjects: ["varuna"],
      suggestedQuestions: [
        "Tell me about NanoCoder 12.29M Transformer built from scratch.",
        "Why is Mohan a strong candidate for an AI Systems Engineer role?",
        "What did Mohan build for the FLASH National Hackathon?",
      ],
    }),
  },
  {
    patterns: [/\b(nanocoder|transformer|gpt|bfloat16|flashattention|pytorch|bpe|from scratch)\b/i],
    category: "NanoCoder GPT",
    generateAnswer: () => ({
      answer: `### NanoCoder — 12.29M-Parameter GPT Transformer From Scratch

**NanoCoder** is a decoder-only autoregressive language model built directly in PyTorch without high-level wrappers:

* **Architecture:** 12.29M parameters across **6 layers, 6 causal heads, 384 embedding dimension**, and a **256 context window**.
* **Modern Attention:** Implemented with PyTorch \`scaled_dot_product_attention\` (FlashAttention) with **bfloat16** mixed precision.
* **Custom Tokenizer:** Trained a custom **4,096-token Byte-Level BPE** tokenizer tailored for code syntax.
* **Inference Speed:** **21.48 ms / token** on standard laptop CPU (~**46.6 tokens/sec** throughput).
* **Validation:** Trained on an NVIDIA T4 GPU reducing cross-entropy loss from **8.3789 to 2.0731**, achieving **60.0% Bash syntax validity** (\`bash -n\`) and **45.0% Python AST validity** (\`ast.parse\`).`,
      relevantProjects: ["nanocoder"],
      suggestedQuestions: [
        "How does VIDURA compare with standard LLM coding agents?",
        "Tell me about Mohan's LiveAI internship.",
        "What are Mohan's contact details?",
      ],
    }),
  },
  {
    patterns: [/\b(kavach|kavachai|defacement|phash|ssrf|audit log|tamper|cryptographic)\b/i],
    category: "KavachAI Integrity Monitor",
    generateAnswer: () => ({
      answer: `### KavachAI — Continuous Web Asset Integrity & Tamper-Evident Monitor

* **Perceptual Image Hashing:** Leverages Playwright headless capture and pHash algorithms to detect visual defacements regardless of subtle pixel anti-aliasing differences.
* **Cryptographic Audit Chaining:** Events are linked using **SHA-256 hash chains** (\`prev_hash\`), ensuring audit records cannot be altered retroactively without detection.
* **Strict SSRF Mitigation:** Protects internal cloud infrastructures by blacklisting RFC 1918 private subnets and cloud metadata endpoints (\`169.254.169.254\`).
* **Stack:** Node.js 20 LTS, TypeScript, Express, React SPA, Playwright, SQLite, Docker, with 54 passing automated tests.`,
      relevantProjects: ["kavachai"],
      suggestedQuestions: [
        "How does Clover CRM implement local AI streaming?",
        "What is Mohan's experience with Linux C programming?",
        "Can I download Mohan's resume?",
      ],
    }),
  },
  {
    patterns: [/\b(clover|crm|mysql|trigger|sse|qwen|multi-tenant)\b/i],
    category: "Clover CRM",
    generateAnswer: () => ({
      answer: `### Clover CRM — Multi-Tenant Hub with MySQL Triggers & Local AI Streaming

* **Local AI Streaming:** Real-time Server-Sent Events (SSE) token streaming from local **Qwen 2.5 3B** instances with < 25 ms chunk latency.
* **Native Database Triggers:** Utilizes native MySQL \`AFTER INSERT/UPDATE/DELETE\` triggers for zero-overhead immutable compliance auditing.
* **Multi-Tenant Security:** Row-level organization partitioning, Werkzeug PBKDF2 password hashing, and background connection pool watchdog.
* **Test Suite:** 62 / 62 automated tests covering auth, tenant isolation, and streaming resilience.`,
      relevantProjects: ["clover-crm"],
      suggestedQuestions: [
        "Tell me about Mohan's work at LiveAI.",
        "What is Mohan's educational background?",
        "What awards or hackathons has Mohan won?",
      ],
    }),
  },
  {
    patterns: [/\b(liveai|internship|lora|peft|fine-tuning|mistral|llama|sft|gpu)\b/i],
    category: "LiveAI Internship",
    generateAnswer: () => ({
      answer: `### AI Research & Engineering Internship @ LiveAI (02/2025 – 04/2025)

At **LiveAI**, Mohan worked on production fine-tuning pipelines for open-source Large Language Models:

* **Parameter-Efficient Fine-Tuning (PEFT & LoRA):** Conducted experiments fine-tuning **Llama 3** and **Mistral** on domain-specific corpora using Google Colab & GPU runtimes, cutting active training VRAM requirements by over 60%.
* **GPU Pipeline Engineering:** Constructed end-to-end tokenization, dataset preparation, and supervised fine-tuning (SFT) workflows on GPU runtimes.
* **Evaluation & Benchmarking:** Monitored training loss convergence, evaluation perplexity, and structured JSON tool-call adherence.`,
      suggestedQuestions: [
        "What is Mohan's background and education?",
        "Tell me about Mohan's hackathon win.",
        "How can I contact Mohan for an interview?",
      ],
    }),
  },
  {
    patterns: [/\b(education|amrita|college|cgpa|coursework|degree|school|university|chaitanya)\b/i],
    category: "Education & Academics",
    generateAnswer: () => ({
      answer: `### Educational Background

* **Amrita Vishwa Vidyapeetham, Chennai, India**
  * **Degree:** B.Tech in Computer Science and Engineering (2nd Year, 2024–2028)
  * **Academic Standing:** CGPA: **7.02 / 10.0**
  * **Key Coursework:** Machine Learning, Deep Learning, Natural Language Processing, Operating Systems, Computer Networks, Database Management Systems (DBMS), Data Structures & Algorithms (DSA), Object-Oriented Programming (OOP), Cloud Computing, Robotics (ROS2).
* **Sri Chaitanya Junior College, Hyderabad, India**
  * **Class XII (MPC, 2023–2024):** Aggregate **88.7%**`,
      suggestedQuestions: [
        "Tell me about the FLASH National Hackathon 1st place win.",
        "What certifications does Mohan have?",
        "What roles is Mohan targeting?",
      ],
    }),
  },
  {
    patterns: [/\b(hackathon|flash|winner|award|competition|tantrotsav|pillpal)\b/i],
    category: "Hackathon & Honors",
    generateAnswer: () => ({
      answer: `### Hackathon Achievements & Honors

* 🏆 **Winner (1st Place among 97 Teams) — FLASH National Hackathon (2024):**
  * Conceptualized and built **PillPal**, a full-stack medication adherence and automated prescription parsing platform under tight 36-hour hackathon deadlines.
  * Outranked 96 other university engineering teams nationwide based on code architecture, real-time UX, and technical execution.
* 🎖️ **Tantrotsav Technical Fest Recognition:**
  * Honored at Amrita Vishwa Vidyapeetham for high-performance algorithm implementation and systems problem solving.`,
      suggestedQuestions: [
        "Show me Mohan's verified certifications.",
        "Why should our team hire Mohan?",
        "What projects demonstrate his systems programming skills?",
      ],
    }),
  },
  {
    patterns: [/\b(why hire|hire mohan|strengths|skills|pitch|qualifications|why should we hire)\b/i],
    category: "Why Hire Mohan",
    generateAnswer: () => ({
      answer: `### Why Hire Mutyala Mohan Surendra?

1. **Rare Full-Spectrum Systems Depth:** Unlike typical web developers or theoretical ML practitioners, Mohan codes across the entire abstraction hierarchy:
   * **Low-Level Systems:** Native Linux C PAM modules (\`pam_blink.so\`), V4L2 kernel sensor streams, POSIX IPC, and AVX2 SIMD acceleration.
   * **Deep Learning From Scratch:** Custom 12.29M PyTorch GPT Transformer, Byte-Level BPE tokenizer, and FlashAttention without wrapper libraries.
   * **Autonomous Agents & Verification:** Deterministic Python AST parsing, 5-tier local model routing, and \`CodeChangeProposal\` permission gates in **VIDURA** (22.4k SLOC, 456 tests).
   * **Quantitative Optimization:** SciPy HiGHS MILP fleet solvers and 10,000-iteration Monte Carlo risk simulation in **VARUNA**.
2. **Empirical Verification Mindset:**
   * **807+ automated tests** with 100% pass rates across his repositories.
   * Measured microsecond and millisecond hardware latency profiles on real devices.
3. **Proven Execution Under Pressure:**
   * Ranked **1st Place out of 97 teams** in the FLASH National Hackathon.
   * Hands-on industry LLM fine-tuning experience at LiveAI.`,
      suggestedQuestions: [
        "Tell me about his Linux C-PAM project BLINK.",
        "How does VIDURA work?",
        "How can I set up an interview?",
      ],
    }),
  },
  {
    patterns: [/\b(contact|email|phone|interview|reach|location|availability|call|schedule)\b/i],
    category: "Contact & Availability",
    generateAnswer: () => ({
      answer: `### Contact Mutyala Mohan Surendra

* **Status:** 🟢 **Open to AI/ML & Systems Software Engineering Internships / Roles**
* **Email:** [mohana21062007@gmail.com](mailto:mohana21062007@gmail.com)
* **Phone:** [+91 7671074608](tel:+917671074608)
* **GitHub:** [github.com/MOHAN2416](https://github.com/MOHAN2416)
* **Location:** Chennai / Hyderabad, India (Open to on-site, hybrid, and remote opportunities)

You can also send a direct recruiter message via the **/contact** page!`,
      suggestedQuestions: [
        "What are Mohan's top technical skills?",
        "Tell me about VIDURA.",
        "Tell me about BLINK.",
      ],
    }),
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = (body.query || "").trim();

    if (!query) {
      return NextResponse.json({ error: "Query cannot be empty." }, { status: 400 });
    }

    // High-Precision Semantic & Deterministic Fallback
    let bestMatch: KnowledgeMatch | null = null;
    let maxMatchCount = 0;

    for (const entry of KNOWLEDGE_BASE) {
      let matches = 0;
      for (const pattern of entry.patterns) {
        if (pattern.test(query)) {
          matches++;
        }
      }
      if (matches > maxMatchCount) {
        maxMatchCount = matches;
        bestMatch = entry;
      }
    }

    if (!bestMatch) {
      return NextResponse.json({
        answer: `Hello! I am **Mohan's Autonomous AI Twin**, trained on his complete technical portfolio, code repositories, benchmark measurements, and research.

Mutyala Mohan Surendra is an **AI Systems Engineer & Full-Stack Developer** based in Chennai / Hyderabad, India.

His work spans four core pillars:
1. **Deterministic AI Agents:** [VIDURA](/projects/vidura) (22,423 SLOC, 456 automated tests, AST symbol resolution, 5-tier router).
2. **Linux Biometrics & PAM:** [BLINK](/projects/blink) (Native C \`pam_blink.so\`, ONNX Runtime AVX2, ~800ms cold auth, 3-tier anti-spoofing).
3. **Quantitative Optimization:** [VARUNA](/projects/varuna) (Ridge ML rate model, HiGHS MILP fleet solver, 10,000 Monte Carlo risk simulations).
4. **PyTorch Transformers From Scratch:** [NanoCoder](/projects/nanocoder) (12.29M parameters, bfloat16 FlashAttention, 21.48 ms/token).

Feel free to ask me any technical question about his projects, architecture designs, benchmark numbers, or availability!`,
        category: "General Overview",
        relevantProjects: ["vidura", "blink", "varuna", "nanocoder"],
        suggestedQuestions: [
          "Explain the architecture of VIDURA.",
          "How does BLINK achieve ~800ms Linux biometric authentication?",
          "Walk me through VARUNA's 10,000 Monte Carlo simulations.",
          "Why hire Mohan for an AI Systems role?",
        ],
        timestamp: new Date().toISOString(),
      });
    }

    const result = bestMatch.generateAnswer();

    return NextResponse.json({
      answer: result.answer,
      category: bestMatch.category,
      relevantProjects: result.relevantProjects || [],
      suggestedQuestions: result.suggestedQuestions,
      timestamp: new Date().toISOString(),
      confidence: 0.98,
    });
  } catch (error) {
    console.error("Error in /api/assistant:", error);
    return NextResponse.json({ error: "Failed to process AI assistant request." }, { status: 500 });
  }
}
