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
      answer: `### VIDURA — Offline AI Coding Assistant

**VIDURA** is an AI coding assistant that runs completely on your own computer without sending your code or secrets to the cloud:

* **Understands Real Code Structure:** Instead of guessing from raw text, VIDURA maps out Python functions, classes, and methods directly so it knows exactly how your project fits together.
* **Smart Model Choice:** It runs small, fast local models first, and automatically hides sensitive API keys and passwords before ever talking to the cloud.
* **Safety First (Approval Gate):** It never changes or runs code behind your back. Every edit is shown as an easy-to-read proposal that you must review and approve first.
* **Automated Safety Checks:** Once approved, it verifies every file and automatically runs all 456 project tests in under 7 seconds to guarantee nothing broke.
* **Project Scale:** Built with **22,423 lines of code** across 98 Python files.

Try it out in the **Live Demos** on \`/playground\`!`,
      relevantProjects: ["vidura"],
      suggestedQuestions: [
        "How does BLINK's Linux face login work?",
        "Explain VARUNA's shipping route and cost planner.",
        "What did Mohan work on during his LiveAI internship?",
      ],
    }),
  },
  {
    patterns: [/\b(blink|biometric|face|pam|linux|camera|ir|onnx|fasnet|arcface|anti-spoof)\b/i],
    category: "BLINK Face Login",
    generateAnswer: () => ({
      answer: `### BLINK — Fast Face Login for Linux

**BLINK** lets Linux users log in and run system commands using their face instead of typing passwords:

* **Works with Linux System Logins:** Plugs directly into standard Linux login screens (GDM) and terminal commands (\`sudo\`). If the camera is unavailable, it instantly switches back to normal password login in less than 15 milliseconds.
* **Fast Face Unlock (~800 ms total cycle):**
  1. *Camera Capture:* Opens camera and snaps an image (~110 ms)
  2. *Finds Your Face:* Locates your face in the frame (~32 ms)
  3. *Stops Fake Faces:* Checks if you are a real person instead of a phone screen or printed photo (~48 ms)
  4. *Checks Identity:* Matches your face features against your profile (~65 ms)
  5. *Instant Unlock:* Confirms match in under 2 ms
* **Works in the Dark:** If the room is dark, it switches automatically to an infrared camera.
* **Safe & Private:** Never saves raw photos to disk. It only stores encrypted math numbers using military-grade AES-256 encryption.
* **Tested & Reliable:** Covered by **78 automated tests** checking security and fake-face detection.`,
      relevantProjects: ["blink"],
      suggestedQuestions: [
        "How does VIDURA keep code running safely offline?",
        "Tell me about the shipping route simulator in VARUNA.",
        "What is Mohan's educational background?",
      ],
    }),
  },
  {
    patterns: [/\b(varuna|maritime|freight|milp|highs|monte carlo|var|cvar|coal|hay point)\b/i],
    category: "VARUNA Shipping Planner",
    generateAnswer: () => ({
      answer: `### VARUNA — Shipping Cost Predictor & Route Planner

**VARUNA** helps maritime shipping companies find the cheapest cargo routes and manage fuel price risks:

* **Predicts Freight Rates:** Uses machine learning to forecast shipping costs accurately across major global trade routes.
* **Instant Decision Pipeline (~177 ms):**
  * Checks route feasibility in ~1 ms.
  * Predicts market rates in ~10 ms.
  * Tests 200 candidate ships to pick the single most profitable vessel in ~128 ms.
  * Runs 10,000 what-if scenarios in ~37 ms to check fuel price and delay risks.
* **Risk Management:** Estimates the worst-case financial losses so charterers know their maximum budget risk before booking.
* **Global Scale:** Pre-loaded with **3,630 ports**, **200 cargo vessels**, and **9 international trade corridors**, backed by **273 automated tests**.`,
      relevantProjects: ["varuna"],
      suggestedQuestions: [
        "Tell me about NanoCoder, the small AI model built from scratch.",
        "Why should we hire Mohan for software or AI engineering roles?",
        "What did Mohan build to win the FLASH National Hackathon?",
      ],
    }),
  },
  {
    patterns: [/\b(nanocoder|transformer|gpt|bfloat16|flashattention|pytorch|bpe|from scratch)\b/i],
    category: "NanoCoder AI Model",
    generateAnswer: () => ({
      answer: `### NanoCoder — Lightweight Code AI Model Built from Scratch

**NanoCoder** is a compact AI coding model built from the ground up using PyTorch without relying on pre-built libraries:

* **Compact Architecture:** 12.29 million parameters across 6 transformer layers and a 256-word context window.
* **Modern AI Tech:** Uses FlashAttention and mixed-precision math so it trains faster and uses minimal memory.
* **Custom Vocabulary:** Trained with a custom 4,096-token vocabulary designed specifically for programming languages like Python and Bash.
* **Fast on Normal Laptops:** Generates code at **21.48 ms per token** (~46 tokens per second) directly on a regular computer processor without needing a dedicated graphics card.
* **Tested on Real Code:** Generates syntactically correct Bash commands 60% of the time and valid Python code 45% of the time.`,
      relevantProjects: ["nanocoder"],
      suggestedQuestions: [
        "How does VIDURA keep code safe while running offline?",
        "Tell me about Mohan's LiveAI internship.",
        "How can I contact Mohan?",
      ],
    }),
  },
  {
    patterns: [/\b(kavach|kavachai|defacement|phash|ssrf|audit log|tamper|cryptographic)\b/i],
    category: "KavachAI Website Monitor",
    generateAnswer: () => ({
      answer: `### KavachAI — Website Security & Defacement Monitor

**KavachAI** watches websites continuously to alert administrators if a site gets hacked, defaced, or altered:

* **Visual Comparison:** Takes screenshots of web pages and uses visual image hashing to detect unauthorized design or content changes even if pixels shift slightly.
* **Tamper-Proof Audit History:** Links every event log using cryptographic SHA-256 chains, making it impossible for attackers to secretly modify past logs.
* **Network Attack Protection:** Blocks requests to private networks and internal cloud metadata so attackers cannot use the monitor to snoop on internal servers.
* **Stack:** Built with Node.js, TypeScript, Express, React, Playwright, SQLite, and Docker, with **54 passing automated tests**.`,
      relevantProjects: ["kavachai"],
      suggestedQuestions: [
        "How does Clover CRM stream AI suggestions in real time?",
        "What is Mohan's experience with C and Linux programming?",
        "Can I download Mohan's resume?",
      ],
    }),
  },
  {
    patterns: [/\b(clover|crm|mysql|trigger|sse|qwen|multi-tenant)\b/i],
    category: "Clover CRM",
    generateAnswer: () => ({
      answer: `### Clover CRM — Multi-Company Sales Hub with Live AI Assistant

**Clover CRM** is a customer relationship manager with built-in live AI assistance:

* **Live AI Email & Note Drafting:** Streams AI responses word-by-word in real time (under 25 ms per chunk) using a local 3-billion-parameter model to help draft customer follow-ups quickly.
* **Automatic Audit Tracking:** Uses native database triggers inside MySQL to automatically record every change to contacts and deals with zero speed penalty.
* **Company Data Separation:** Ensures each business's data is strictly isolated with row-level security and strong password encryption.
* **Tested & Reliable:** Covered by **62 automated tests** for authentication, security, and live AI streaming.`,
      relevantProjects: ["clover-crm"],
      suggestedQuestions: [
        "Tell me about Mohan's AI internship at LiveAI.",
        "What is Mohan's educational background?",
        "What awards has Mohan won?",
      ],
    }),
  },
  {
    patterns: [/\b(liveai|internship|lora|peft|fine-tuning|mistral|llama|sft|gpu)\b/i],
    category: "LiveAI Internship",
    generateAnswer: () => ({
      answer: `### AI Research & Engineering Internship @ LiveAI (Feb 2025 – Apr 2025)

During his internship at **LiveAI**, Mohan trained and fine-tuned open-source AI language models:

* **Efficient Model Fine-Tuning:** Fine-tuned **Llama 3** and **Mistral** models on specialized datasets using techniques that cut GPU memory usage by over 60%.
* **Automated Data Pipelines:** Built automated workflows on GPUs to clean, format, and tokenize datasets for AI training.
* **Quality & Accuracy Checks:** Monitored training progress to ensure the models followed instructions accurately and produced clean, structured outputs.`,
      suggestedQuestions: [
        "What is Mohan's background and college education?",
        "Tell me about Mohan's national hackathon win.",
        "How can I contact Mohan?",
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
  * **Grade:** CGPA: **7.02 / 10.0**
  * **Key Subjects:** Machine Learning, Deep Learning, Natural Language Processing, Operating Systems, Computer Networks, Databases (DBMS), Data Structures & Algorithms, Object-Oriented Programming, Cloud Computing, and Robotics.
* **Sri Chaitanya Junior College, Hyderabad, India**
  * **High School (Math, Physics, Chemistry, 2023–2024):** **88.7%**`,
      suggestedQuestions: [
        "Tell me about the 1st place national hackathon win.",
        "What certificates has Mohan earned?",
        "What types of roles is Mohan looking for?",
      ],
    }),
  },
  {
    patterns: [/\b(hackathon|flash|winner|award|competition|tantrotsav|pillpal)\b/i],
    category: "Hackathons & Awards",
    generateAnswer: () => ({
      answer: `### Hackathon Achievements & Awards

* 🏆 **1st Place Winner (out of 97 Teams) — FLASH National Hackathon (2024):**
  * Designed and built **PillPal**, a medicine reminder and automatic prescription reader app within a tight 36-hour deadline.
  * Ranked #1 out of 97 university teams across India for reliable code architecture, clean user experience, and practical real-world impact.
* 🎖️ **Tantrotsav Technical Fest Recognition:**
  * Recognized at Amrita Vishwa Vidyapeetham for fast problem solving and algorithms.`,
      suggestedQuestions: [
        "What certifications does Mohan have?",
        "Why should our team hire Mohan?",
        "What projects show his systems programming skills?",
      ],
    }),
  },
  {
    patterns: [/\b(why hire|hire mohan|strengths|skills|pitch|qualifications|why should we hire)\b/i],
    category: "Why Hire Mohan",
    generateAnswer: () => ({
      answer: `### Why Hire Mutyala Mohan Surendra?

1. **Builds Across the Whole Stack:**
   * **Low-Level Systems:** Native Linux C modules (\`pam_blink.so\`), camera drivers, and fast hardware acceleration in **BLINK**.
   * **AI from the Ground Up:** Built a 12.29M-parameter GPT model in PyTorch from scratch (**NanoCoder**).
   * **Safe AI Helpers:** Built **VIDURA** (22,423 lines of code, 456 tests), an AI assistant that checks code safety offline.
   * **Smart Business Software:** Built freight planners (**VARUNA**) and customer management platforms (**Clover CRM**).
2. **Commitment to Thorough Testing:**
   * Over **800 automated tests** passing across his projects with 100% pass rates.
   * Measures real speeds and latency on actual hardware rather than making estimates.
3. **Proven Execution:**
   * Won **1st place out of 97 teams** in a national hackathon.
   * Practical industry experience fine-tuning AI models during his internship at LiveAI.`,
      suggestedQuestions: [
        "Tell me about his Linux face login project BLINK.",
        "How does VIDURA work?",
        "How can I set up an interview with Mohan?",
      ],
    }),
  },
  {
    patterns: [/\b(contact|email|phone|interview|reach|location|availability|call|schedule)\b/i],
    category: "Contact & Availability",
    generateAnswer: () => ({
      answer: `### Contact Information & Availability

* **Status:** 🟢 **Open to 2026 / 2027 Software & AI Engineering Internships & Roles**
* **Email:** [mohana21062007@gmail.com](mailto:mohana21062007@gmail.com)
* **Phone:** [+91 7671074608](tel:+917671074608)
* **GitHub:** [github.com/MOHAN2416](https://github.com/MOHAN2416)
* **Location:** Chennai / Hyderabad, India (Open to on-site, hybrid, and remote work)

You can also send a direct message on the **/contact** page!`,
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

    // Optional LLM enhancement if key is provided in environment
    if (process.env.GEMINI_API_KEY) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are Mohan's AI Assistant for his developer portfolio. Answer in clear, plain everyday English. Ground your answers strictly in his verified projects (VIDURA: 22,423 SLOC offline agent, 456 tests; NanoCoder: 12.29M PyTorch model; BLINK: ~800ms Linux face unlock; VARUNA: 177ms freight route planner; KavachAI: tamper-proof monitor; Clover CRM: sales hub).

User Query: ${query}`
                    }
                  ]
                }
              ],
              generationConfig: { maxOutputTokens: 400, temperature: 0.2 },
            }),
            signal: AbortSignal.timeout(4000),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText && generatedText.trim().length > 20) {
            return NextResponse.json({
              answer: generatedText.trim(),
              category: bestMatch ? bestMatch.category : "AI Assistant",
              relevantProjects: bestMatch?.generateAnswer().relevantProjects || ["vidura", "blink"],
              suggestedQuestions: bestMatch?.generateAnswer().suggestedQuestions || [
                "How does VIDURA keep code running safely offline?",
                "How does BLINK log into Linux using your face in ~800 ms?",
                "Tell me about Mohan's LiveAI internship.",
              ],
              timestamp: new Date().toISOString(),
              confidence: 0.99,
            });
          }
        }
      } catch {
        // Seamless fallback to deterministic answers
      }
    }

    if (!bestMatch) {
      return NextResponse.json({
        answer: `Hello! I am **Mohan's AI Assistant**. I can answer any questions about his projects, skills, education, and internship experience.

Mutyala Mohan Surendra is a **Software & AI Developer** based in Chennai and Hyderabad, India.

Here are a few highlights of his work:
1. **Safe Offline AI Coding:** [VIDURA](/projects/vidura) — An AI coding assistant with 22,423 lines of code and 456 automated tests that runs safely offline.
2. **Fast Face Login for Linux:** [BLINK](/projects/blink) — Unlocks Linux systems with your face in ~800 milliseconds and stops fake photo spoofing.
3. **Shipping Routes & Cost Planner:** [VARUNA](/projects/varuna) — Predicts freight costs and tests 10,000 risk scenarios in ~177 milliseconds.
4. **AI Model Built from Scratch:** [NanoCoder](/projects/nanocoder) — A lightweight 12.29-million parameter AI coding model built in PyTorch.

Feel free to ask any question about his projects, skills, or internship availability!`,
        category: "General Overview",
        relevantProjects: ["vidura", "blink", "varuna", "nanocoder"],
        suggestedQuestions: [
          "How does VIDURA keep code running safely offline?",
          "How does BLINK log into Linux using your face in ~800 ms?",
          "How does VARUNA find the best shipping routes?",
          "Why should we hire Mohan for software or AI roles?",
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
