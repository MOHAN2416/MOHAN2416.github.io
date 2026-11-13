"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal, Ship, Eye, Cpu, Shield, Database, FileText, Mail, Phone, ExternalLink, ArrowRight, X, Sparkles, Check } from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProjectDemo: (projectId: string) => void;
  onOpenResume: () => void;
  onOpenAiAssistant: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectProjectDemo,
  onOpenResume,
  onOpenAiAssistant,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger open is usually handled by parent, but if inside, toggle
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const COMMAND_ITEMS = [
    {
      group: "Interactive System Simulators",
      items: [
        {
          id: "vidura",
          label: "Run VIDURA CLI Terminal",
          desc: "Local-first AST resolution, diff synthesis, /approve gate",
          icon: Terminal,
          color: "text-blue-400",
          action: () => {
            onSelectProjectDemo("vidura");
            onClose();
          },
        },
        {
          id: "blink",
          label: "Launch BLINK Linux Biometric HUD",
          desc: "C-PAM pam_blink.so, ~800ms cold auth, IR sensor failover",
          icon: Eye,
          color: "text-emerald-400",
          action: () => {
            onSelectProjectDemo("blink");
            onClose();
          },
        },
        {
          id: "varuna",
          label: "Simulate VARUNA Voyage Chartering",
          desc: "HiGHS MILP fleet optimization & 10,000 Monte Carlo risk",
          icon: Ship,
          color: "text-amber-400",
          action: () => {
            onSelectProjectDemo("varuna");
            onClose();
          },
        },
        {
          id: "nanocoder",
          label: "Inspect NanoCoder Transformer Lab",
          desc: "12.29M parameters, bfloat16 FlashAttention, 21.48ms/tok",
          icon: Cpu,
          color: "text-purple-400",
          action: () => {
            onSelectProjectDemo("nanocoder");
            onClose();
          },
        },
        {
          id: "kavachai",
          label: "Verify KavachAI Cryptographic Audit Log",
          desc: "Perceptual hashing & SHA-256 tamper-evident chaining",
          icon: Shield,
          color: "text-teal-400",
          action: () => {
            onSelectProjectDemo("kavachai");
            onClose();
          },
        },
        {
          id: "clover-crm",
          label: "Stream Clover CRM Lead Intelligence",
          desc: "Multi-tenant MySQL audit triggers & local Qwen 2.5 SSE",
          icon: Database,
          color: "text-green-400",
          action: () => {
            onSelectProjectDemo("clover-crm");
            onClose();
          },
        },
      ],
    },
    {
      group: "Recruiter & Candidate Utilities",
      items: [
        {
          id: "ai-assistant",
          label: "Ask Mohan's Autonomous AI Twin",
          desc: "Deterministic answers on systems engineering & research",
          icon: Sparkles,
          color: "text-blue-400",
          action: () => {
            onOpenAiAssistant();
            onClose();
          },
        },
        {
          id: "resume",
          label: "View & Download Resume (PDF)",
          desc: "ATS-optimized curriculum vitae with full project metrics",
          icon: FileText,
          color: "text-slate-200",
          action: () => {
            onOpenResume();
            onClose();
          },
        },
        {
          id: "copy-email",
          label: "Copy Candidate Email",
          desc: "mohana21062007@gmail.com",
          icon: Mail,
          color: "text-emerald-400",
          action: () => copyToClipboard("mohana21062007@gmail.com", "email"),
        },
        {
          id: "copy-phone",
          label: "Copy Candidate Phone",
          desc: "+91 7671074608",
          icon: Phone,
          color: "text-cyan-400",
          action: () => copyToClipboard("+917671074608", "phone"),
        },
        {
          id: "github",
          label: "Open GitHub Profile",
          desc: "github.com/MOHAN2416 (807+ tests, 6 production repos)",
          icon: ExternalLink,
          color: "text-slate-400",
          action: () => {
            window.open("https://github.com/MOHAN2416", "_blank");
            onClose();
          },
        },
      ],
    },
    {
      group: "Portfolio Sections",
      items: [
        {
          id: "sec-overview",
          label: "Jump to Overview & Metrics",
          desc: "Hero, candidate headline, and CI telemetry strip",
          icon: ArrowRight,
          color: "text-slate-400",
          action: () => {
            document.getElementById("overview")?.scrollIntoView({ behavior: "smooth" });
            onClose();
          },
        },
        {
          id: "sec-pillars",
          label: "Jump to 4 Engineering Pillars",
          desc: "LLMs, Linux C-PAM, Quantitative ML, High-Concurrency",
          icon: ArrowRight,
          color: "text-slate-400",
          action: () => {
            document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth" });
            onClose();
          },
        },
        {
          id: "sec-projects",
          label: "Jump to Flagship Projects (6)",
          desc: "All 6 production systems with live metrics & code links",
          icon: ArrowRight,
          color: "text-slate-400",
          action: () => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            onClose();
          },
        },
        {
          id: "sec-experience",
          label: "Jump to Experience & Education",
          desc: "LiveAI Internship, Amrita University, FLASH 1st Place win",
          icon: ArrowRight,
          color: "text-slate-400",
          action: () => {
            document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
            onClose();
          },
        },
        {
          id: "sec-credentials",
          label: "Jump to Verified Credentials",
          desc: "Coursera C/C++, LiveAI, Java SE, Tantrotsav honors",
          icon: ArrowRight,
          color: "text-slate-400",
          action: () => {
            document.getElementById("credentials")?.scrollIntoView({ behavior: "smooth" });
            onClose();
          },
        },
        {
          id: "sec-contact",
          label: "Jump to Recruiter Contact Terminal",
          desc: "Send message directly to Mohan's SQLite backend",
          icon: ArrowRight,
          color: "text-slate-400",
          action: () => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            onClose();
          },
        },
      ],
    },
  ];

  const filteredGroups = COMMAND_ITEMS.map((grp) => {
    const matched = grp.items.filter(
      (item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase())
    );
    return { ...grp, items: matched };
  }).filter((grp) => grp.items.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl border border-border/80 bg-[#0D1117] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-border/60 bg-[#0A0E15]">
          <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search systems (e.g., 'vidura', 'monte carlo', 'resume', 'email')..."
            className="w-full bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-all ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="p-3 overflow-y-auto space-y-4 flex-1">
          {filteredGroups.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-slate-500">
              No matching commands or projects found for &quot;{query}&quot;
            </div>
          ) : (
            filteredGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  {group.group}
                </div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full px-3 py-2.5 rounded-xl hover:bg-slate-800/60 flex items-center justify-between text-left transition-all group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-slate-900 border border-border/60 ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-slate-200 font-mono group-hover:text-blue-300 transition-colors">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{item.desc}</div>
                        </div>
                      </div>

                      {copiedKey && (item.id === "copy-email" || item.id === "copy-phone") ? (
                        <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Copied!
                        </span>
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300 transition-transform group-hover:translate-x-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#080B10] border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">↑↓</kbd>
            <span>Select:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Enter</kbd>
            <span>Close:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Esc</kbd>
          </div>
          <span className="hidden sm:inline">Mutyala Mohan Surendra Portfolio OS</span>
        </div>
      </div>
    </div>
  );
}
