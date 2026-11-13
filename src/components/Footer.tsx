"use client";

import React, { useEffect, useState } from "react";
import { CANDIDATE_PROFILE } from "@/lib/data";
import { Terminal, GitBranch, ArrowUp, Sparkles, Command } from "lucide-react";

interface FooterProps {
  onOpenCommandPalette: () => void;
  onOpenAiAssistant: () => void;
}

export function Footer({ onOpenCommandPalette, onOpenAiAssistant }: FooterProps) {
  const [visitorCount, setVisitorCount] = useState<number>(1843);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Fetch live telemetry
    fetch("/api/telemetry?view=false")
      .then((res) => res.json())
      .then((data) => {
        if (data.visitorCount) {
          setVisitorCount(data.visitorCount);
        }
      })
      .catch((err) => console.error(err));

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata", hour12: false }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/80 bg-[#07090E] pt-12 pb-8 relative text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Telemetry Strip */}
        <div className="p-4 rounded-2xl bg-[#0B0F17] border border-border/70 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM TELEMETRY: ONLINE
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">
              CI Pass Rate: <span className="text-emerald-400 font-bold">100% (807 Tests)</span>
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300">
              Visitor Impressions: <span className="text-cyan-400 font-bold">{visitorCount}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500">Local Time:</span>
            <span className="text-slate-300 font-bold">{currentTime || "09:30:00 IST"}</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors ml-2 cursor-pointer"
              title="Return to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Footer Navigation & Identity */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          {/* Col 1: Identity */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>{CANDIDATE_PROFILE.name}</span>
            </div>
            <p className="text-slate-400 font-sans text-xs leading-relaxed max-w-md">
              {CANDIDATE_PROFILE.headline}. Engineering deterministic AI agents, low-latency Linux biometric security suites, and explainable quantitative operations research.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={onOpenCommandPalette}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-border/70 text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Command className="w-3 h-3 text-blue-400" />
                <span>Command Palette (⌘K)</span>
              </button>
              <button
                onClick={onOpenAiAssistant}
                className="px-2.5 py-1 rounded-md bg-blue-950/40 border border-blue-500/30 text-blue-300 hover:text-blue-100 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span>Ask AI Twin</span>
              </button>
            </div>
          </div>

          {/* Col 2: Flagship Systems */}
          <div className="space-y-2">
            <div className="text-slate-200 font-bold uppercase text-[11px] tracking-wider">
              Flagship Systems
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">
                  VIDURA (22.4k SLOC Agent)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-emerald-400 transition-colors">
                  BLINK (~800ms C-PAM)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-400 transition-colors">
                  VARUNA (HiGHS MILP 176ms)
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-purple-400 transition-colors">
                  NanoCoder (12.29M Transformer)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="space-y-2">
            <div className="text-slate-200 font-bold uppercase text-[11px] tracking-wider">
              Direct Connect
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href={`mailto:${CANDIDATE_PROFILE.email}`} className="hover:text-white transition-colors">
                  {CANDIDATE_PROFILE.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CANDIDATE_PROFILE.phone}`} className="hover:text-white transition-colors">
                  {CANDIDATE_PROFILE.phone}
                </a>
              </li>
              <li>
                <a
                  href={CANDIDATE_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <GitBranch className="w-3 h-3" />
                  <span>github.com/MOHAN2416</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Send Recruiter Message
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Security note */}
        <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Mutyala Mohan Surendra. Engineered with Next.js 15, Tailwind CSS, & SQLite.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Deterministic Local Execution • Zero External Analytics Trackers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
