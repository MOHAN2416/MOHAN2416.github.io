"use client";

import React, { useState } from "react";
import { CANDIDATE_PROFILE, CORE_METRICS } from "@/lib/data";
import { Terminal, ArrowRight, FileText, GitBranch, MapPin, Mail, Phone, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";

interface HeroProps {
  onOpenViduraCli: () => void;
  onOpenResume: () => void;
  onOpenAiAssistant: () => void;
}

export function Hero({ onOpenViduraCli, onOpenResume, onOpenAiAssistant }: HeroProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CANDIDATE_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="overview" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background Grid & Spotlights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-gradient-to-br from-emerald-500/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Availability Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1424] border border-blue-500/30 text-blue-300 text-xs font-mono shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{CANDIDATE_PROFILE.availabilityStatus}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-border/80 text-slate-400 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{CANDIDATE_PROFILE.location}</span>
          </div>
        </div>

        {/* Main Headline & Identity */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans leading-[1.08]">
            Mutyala Mohan Surendra
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent font-mono tracking-tight">
            {CANDIDATE_PROFILE.headline}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed max-w-3xl">
            {CANDIDATE_PROFILE.subheadline}
          </p>
        </div>

        {/* Quick Contact & Profile Pills */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-400 pt-1">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-border/80 transition-all cursor-pointer group"
          >
            <Mail className="w-3.5 h-3.5 text-blue-400" />
            <span>{copiedEmail ? "Email Copied!" : CANDIDATE_PROFILE.email}</span>
          </button>

          <a
            href={`tel:${CANDIDATE_PROFILE.phone}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-border/80 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{CANDIDATE_PROFILE.phone}</span>
          </a>

          <a
            href={CANDIDATE_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-border/80 transition-all group"
          >
            <GitBranch className="w-3.5 h-3.5 text-purple-400" />
            <span>github.com/MOHAN2416</span>
            <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-slate-300" />
          </a>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <a
            href="#projects"
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm font-sans flex items-center gap-2 shadow-lg shadow-blue-900/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Explore Flagship Systems</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenViduraCli}
            className="px-5 py-3 rounded-xl bg-[#0D1424] hover:bg-[#121B30] text-blue-300 font-mono text-xs sm:text-sm border border-blue-500/40 flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>Launch Interactive CLI</span>
          </button>

          <button
            onClick={onOpenResume}
            className="px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-mono text-xs sm:text-sm border border-border/80 flex items-center gap-2 transition-all cursor-pointer"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>View Resume (PDF)</span>
          </button>

          <button
            onClick={onOpenAiAssistant}
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-950/40 to-indigo-950/40 hover:from-blue-900/50 hover:to-indigo-900/50 text-blue-200 font-mono text-xs sm:text-sm border border-blue-500/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Ask Mohan&apos;s AI Twin</span>
          </button>
        </div>

        {/* Live Metric Counter Strip */}
        <div className="pt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {CORE_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#0B0F17]/90 border border-border/80 shadow-glass backdrop-blur-md space-y-1 hover:border-blue-500/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    {metric.label}
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight group-hover:text-blue-400 transition-colors">
                  {metric.value}
                </div>
                <div className="text-[11px] text-slate-500 font-sans line-clamp-1">
                  {metric.context}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
