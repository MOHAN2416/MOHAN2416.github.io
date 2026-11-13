"use client";

import React, { useState } from "react";
import { CANDIDATE_PROFILE, EXPERIENCE_ITEMS, EDUCATION_ITEMS, PROJECTS } from "@/lib/data";
import { X, Printer, Copy, Check } from "lucide-react";

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
- **Amrita Vishwa Vidyapeetham, Chennai, India** — B.Tech in Computer Science & Engineering (2024–2028), CGPA: 7.2
- **Sri Chaitanya Junior College, Hyderabad, India** — Class 12th MPC (2023–2024), Aggregate: 91.5%

---

## EXPERIENCE
- **AI Intern @ LiveAI** (Feb 2025 – Apr 2025 | Remote)
  - Conducted structured experiments fine-tuning open-source LLMs (Llama, Mistral) using Hugging Face PEFT and LoRA.
  - Engineered tokenization and supervised fine-tuning (SFT) evaluation pipelines on GPU runtimes.

---

## MAJOR AWARDS
- 🏆 **Winner (1st Place among 97 Teams) — FLASH National Hackathon (2024)**: Built a full-stack medication adherence platform.

---

## FLAGSHIP PROJECTS
1. **VIDURA** (https://github.com/MOHAN2416/VIDURA): Local-first self-developing AI assistant. 22,423 SLOC, 456/456 tests passing in 6.57s.
2. **BLINK** (https://github.com/MOHAN2416/BLINK): Native C-PAM Linux biometric auth for Ubuntu 26.04. ~800ms cold auth, 3-tier anti-spoofing.
3. **VARUNA** (https://github.com/MOHAN2416/VARUNA): Maritime freight forecasting & HiGHS MILP fleet scheduler with 10k Monte Carlo engine. $3.94/MT MAE, 176ms pipeline.
4. **NanoCoder** (https://github.com/MOHAN2416/NanoCoder): 12.29M-parameter GPT transformer built from scratch in PyTorch with FlashAttention.
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-border/80 bg-[#0D1117] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#0A0E15] border-b border-border/60">
          <div className="text-xs font-mono text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Curriculum Vitae • Mutyala Mohan Surendra</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-border/60 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Markdown!" : "Copy Markdown"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono transition-all cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Surface */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-[#090D13] text-slate-200 font-sans text-xs sm:text-sm">
          {/* Header Identity */}
          <div className="space-y-2 border-b border-border/60 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
              {CANDIDATE_PROFILE.name}
            </h1>
            <div className="text-base font-semibold text-blue-400 font-mono">
              {CANDIDATE_PROFILE.headline}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono pt-1">
              <span>{CANDIDATE_PROFILE.location}</span>
              <span>•</span>
              <a href={`mailto:${CANDIDATE_PROFILE.email}`} className="text-blue-300 hover:underline">
                {CANDIDATE_PROFILE.email}
              </a>
              <span>•</span>
              <span>{CANDIDATE_PROFILE.phone}</span>
              <span>•</span>
              <a
                href={CANDIDATE_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:underline"
              >
                github.com/MOHAN2416
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Professional Summary
            </h2>
            <p className="text-slate-300 leading-relaxed font-sans text-xs sm:text-sm">
              {CANDIDATE_PROFILE.summary}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Professional Experience
            </h2>
            {EXPERIENCE_ITEMS.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-baseline font-mono text-xs">
                  <span className="font-bold text-white text-sm">{item.role} — {item.company}</span>
                  <span className="text-slate-400">{item.period} | {item.location}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs pl-1">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="leading-relaxed">{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Education
            </h2>
            {EDUCATION_ITEMS.map((edu, idx) => (
              <div key={idx} className="space-y-1 font-sans">
                <div className="flex justify-between items-baseline font-mono text-xs">
                  <span className="font-bold text-white text-sm">{edu.degree}</span>
                  <span className="text-emerald-400 font-semibold">{edu.score}</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {edu.institution} • {edu.period} • {edu.location}
                </div>
                {edu.coursework && (
                  <div className="text-[11px] text-slate-400 pt-1 font-mono">
                    <span className="text-slate-500">Key Coursework:</span> {edu.coursework.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Honors & Hackathon Win */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Honors & Hackathon Wins
            </h2>
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-slate-300 space-y-1 font-sans">
              <div className="font-bold text-amber-300 font-mono text-sm">
                🏆 Winner (1st Place among 97 Teams) — FLASH National Hackathon (2024)
              </div>
              <p>
                Engineered and shipped a full-stack medication adherence and automated prescription parsing platform under 36-hour competitive hackathon deadlines, ranking #1 out of 97 university teams nationwide.
              </p>
            </div>
          </div>

          {/* Flagship Projects Highlights */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Selected Technical Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              {PROJECTS.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-[#0D121B] border border-border/70 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{p.title}</span>
                    <span className="text-[10px] text-emerald-400">{p.testsCount}</span>
                  </div>
                  <div className="text-[11px] text-blue-300">{p.tagline}</div>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Tech: {p.techStack.slice(0, 4).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#0A0E15] border-t border-border/60 flex items-center justify-between text-xs font-mono text-slate-500">
          <span>Targeting: AI Systems Engineer, Deep Learning Researcher, Full-Stack Architect</span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
