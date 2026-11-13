"use client";

import React, { useState } from "react";
import { CANDIDATE_PROFILE, EXPERIENCE_ITEMS, EDUCATION_ITEMS, PROJECTS, SKILL_CATEGORIES } from "@/lib/data";
import { X, Printer, Copy, Check, FileText, Download } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# ${CANDIDATE_PROFILE.name}
**${CANDIDATE_PROFILE.headline}**
Location: ${CANDIDATE_PROFILE.location} | Email: ${CANDIDATE_PROFILE.email} | Phone: ${CANDIDATE_PROFILE.phone} | GitHub: ${CANDIDATE_PROFILE.github}

---

## PROFESSIONAL SUMMARY
${CANDIDATE_PROFILE.summary}

---

## EDUCATION
- **Amrita Vishwa Vidyapeetham, Chennai, India** — B.Tech in Computer Science & Engineering (2024–2028), CGPA: 7.02/10.0
- **Sri Chaitanya Junior College, Hyderabad, India** — Class XII MPC (2023–2024), Aggregate: 88.7%

---

## PROFESSIONAL EXPERIENCE
- **AI Intern @ LiveAI** (02/2025 – 04/2025 | Remote)
  - Fine-tuned open-source LLMs (Llama 3, Mistral) using the Hugging Face ecosystem.
  - Implemented Parameter-Efficient Fine-Tuning (PEFT) and LoRA adapters on Google Colab/GPU runtimes, reducing VRAM by over 60%.
  - Built tokenization, dataset formatting, and supervised fine-tuning (SFT) evaluation workflows.

---

## MAJOR HONORS & AWARDS
- 🏆 **Winner (1st Place among 97 Teams) — FLASH National Hackathon (2024)**: Built PillPal medication adherence and prescription reminder platform.

---

## FLAGSHIP PROJECTS
1. **VIDURA** (https://github.com/MOHAN2416/VIDURA): Deterministic local-first self-developing AI assistant. 22,423 SLOC, 456/456 tests passing in 6.57s.
2. **NanoCoder** (https://github.com/MOHAN2416/NanoCoder): 12.29M-parameter decoder-only GPT transformer built from scratch in PyTorch with FlashAttention. 21.48 ms/token CPU inference.
3. **BLINK** (https://github.com/MOHAN2416/BLINK): Native C-PAM Linux biometric auth for Ubuntu 26.04. ~800ms cold auth, 3-tier presentation attack detection.
4. **VARUNA** (https://github.com/MOHAN2416/VARUNA): Maritime freight forecasting & HiGHS MILP fleet scheduler with 10k Monte Carlo engine. $3.94/MT MAE, 176.99ms pipeline.
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-zinc-900/40 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-white/90 bg-white/95 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] font-sans">
        {/* Controls Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-white/70 backdrop-blur-md border-b border-zinc-200/60">
          <div className="text-xs font-mono text-zinc-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-cobalt-600" />
            <span className="font-semibold">{CANDIDATE_PROFILE.name} — Curriculum Vitae</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Mutyala_Mohan_Surendra_Resume.pdf"
              download="Mutyala_Mohan_Surendra_Resume.pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono font-medium shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official PDF (/Mutyala_Mohan_Surendra_Resume.pdf)</span>
            </a>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-mono border border-zinc-200 shadow-xs transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
              <span>{copied ? "Copied!" : "Copy Markdown"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-medium shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-7 bg-white text-zinc-800 text-xs sm:text-sm leading-relaxed">
          {/* Header */}
          <div className="space-y-1.5 border-b border-zinc-200 pb-5">
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900 tracking-tight">
              {CANDIDATE_PROFILE.name}
            </h1>
            <div className="text-sm font-semibold text-cobalt-600 font-mono">
              {CANDIDATE_PROFILE.headline}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 font-mono pt-1">
              <span>{CANDIDATE_PROFILE.location}</span>
              <span>&bull;</span>
              <a href={`mailto:${CANDIDATE_PROFILE.email}`} className="text-cobalt-600 hover:underline">
                {CANDIDATE_PROFILE.email}
              </a>
              <span>&bull;</span>
              <span>{CANDIDATE_PROFILE.phone}</span>
              <span>&bull;</span>
              <a
                href={CANDIDATE_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-800 hover:underline font-semibold"
              >
                github.com/MOHAN2416
              </a>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cobalt-700">
              Executive Profile
            </h2>
            <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed">
              {CANDIDATE_PROFILE.summary}
            </p>
          </div>

          {/* Professional Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cobalt-700">
              Professional Experience
            </h2>
            {EXPERIENCE_ITEMS.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-baseline font-mono text-xs">
                  <span className="font-bold text-zinc-900 text-sm">{item.role} &mdash; {item.company}</span>
                  <span className="text-zinc-500">{item.period} | {item.location}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-zinc-700 text-xs pl-1">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cobalt-700">
              Education
            </h2>
            {EDUCATION_ITEMS.map((edu, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-baseline font-mono text-xs">
                  <span className="font-bold text-zinc-900 text-sm">{edu.degree}</span>
                  <span className="text-emerald-700 font-semibold">{edu.score}</span>
                </div>
                <div className="text-xs text-zinc-500 font-mono">
                  {edu.institution} &bull; {edu.period} &bull; {edu.location}
                </div>
                {edu.coursework && (
                  <div className="text-[11px] text-zinc-600 pt-0.5 font-mono">
                    <span className="text-zinc-400">Relevant Coursework:</span> {edu.coursework.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Honors & Hackathon */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cobalt-700">
              Honors & National Awards
            </h2>
            <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200 text-xs text-zinc-800 space-y-1">
              <div className="font-bold text-amber-800 font-mono text-sm">
                🏆 Winner (1st Place out of 97 Teams) — FLASH National Hackathon (2024)
              </div>
              <p className="text-zinc-700">
                Architected and deployed PillPal medication adherence and prescription tracking platform under 36-hour hackathon deadlines, ranking 1st among 97 competing engineering teams nationwide.
              </p>
            </div>
          </div>

          {/* Flagship Projects Highlights */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cobalt-700">
              Core Production Repositories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              {PROJECTS.map((p) => (
                <div key={p.id} className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900">{p.title}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">{p.testsCount}</span>
                  </div>
                  <div className="text-[11px] text-cobalt-600">{p.tagline}</div>
                  <div className="text-[10px] text-zinc-500 pt-1">
                    Tech: {p.techStack.slice(0, 4).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Matrix */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cobalt-700">
              Technical Skills Matrix
            </h2>
            <div className="space-y-1.5 text-xs font-mono">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-zinc-900 font-bold sm:w-44 shrink-0">{cat.category}:</span>
                  <span className="text-zinc-600">{cat.skills.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>Targeting: AI Systems Engineer, Deep Learning Researcher, Full-Stack Architect</span>
          <button
            onClick={onClose}
            className="text-zinc-600 hover:text-zinc-900 font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
