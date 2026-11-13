"use client";

import React from "react";
import Link from "next/link";
import { CANDIDATE_PROFILE, ENGINEERING_PILLARS, PROJECTS } from "@/lib/data";
import { ArrowRight, Terminal, Shield, Zap, BarChart3, GitBranch, ExternalLink, Trophy, Cpu } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { motion } from "framer-motion";

export default function HomePage() {
  const featuredProjects = PROJECTS.filter((p) =>
    ["vidura", "nanocoder", "blink"].includes(p.slug)
  );

  const getPillarIcon = (name: string) => {
    switch (name) {
      case "Cpu":
        return <Cpu className="w-5 h-5 text-cobalt-600" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-emerald-600" />;
      case "Zap":
        return <Zap className="w-5 h-5 text-purple-600" />;
      case "BarChart3":
        return <BarChart3 className="w-5 h-5 text-amber-600" />;
      default:
        return <Terminal className="w-5 h-5 text-cobalt-600" />;
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 py-10 sm:py-16">
      {/* 1. HIGH-IMPACT WIDE ARCHITECTURAL HERO */}
      <section className="relative w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl space-y-7 pt-4 sm:pt-8">
          {/* Main Title: Staggered Word-by-Word Motion Reveal */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading text-zinc-900 tracking-tight leading-[1.05]">
            {CANDIDATE_PROFILE.name.split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-3 sm:mr-4"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle with Animated Gradient Shimmer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-mono font-semibold bg-gradient-to-r from-cobalt-600 via-indigo-600 to-cobalt-600 bg-clip-text text-transparent animate-shimmer">
              {CANDIDATE_PROFILE.headline}
            </h2>
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-lg sm:text-xl text-zinc-600 leading-relaxed font-sans max-w-4xl"
          >
            B.Tech Computer Science student at Amrita Vishwa Vidyapeetham (Chennai) building deterministic local-first LLM agents, low-latency Linux biometric authentication systems, and from-scratch PyTorch Transformers.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.42 }}
            className="flex flex-wrap items-center gap-3.5 pt-3"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-semibold text-sm shadow-[0_4px_14px_-2px_rgba(37,99,235,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Engineering Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/70 hover:bg-white/90 backdrop-blur-md text-zinc-800 font-mono text-sm border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_-2px_rgba(15,23,42,0.06)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Terminal className="w-4 h-4 text-cobalt-600" />
              <span>Launch Interactive Labs</span>
            </Link>

            <a
              href={CANDIDATE_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl bg-white/70 hover:bg-white/90 backdrop-blur-md text-zinc-600 hover:text-zinc-900 font-mono text-sm border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_-2px_rgba(15,23,42,0.06)] transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. 4 CORE ENGINEERING PILLARS (SPACIOUS 2-COLUMN GRID WITH 3D GLASS TILT & ROOMY P-8) */}
      <section className="w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12 space-y-8">
        <div className="space-y-1 border-b border-zinc-200/60 pb-4">
          <div className="text-xs font-mono uppercase tracking-wider text-cobalt-600 font-bold">
            Systems Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900">
            Core Engineering Pillars
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 max-w-3xl font-sans">
            Spanning low-level Linux C PAM kernel hooks, mixed-integer linear programming, and deep learning models implemented from raw tensor math.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ENGINEERING_PILLARS.map((pillar, idx) => (
            <GlassCard key={idx} index={idx} className="h-full flex flex-col">
              <div className="p-8 sm:p-9 flex flex-col h-full flex-1 justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-white/45 backdrop-blur-md border-t border-l border-white/90 border-r border-b border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                      {getPillarIcon(pillar.iconName)}
                    </div>
                    <span className="text-xs font-mono font-semibold text-zinc-600">
                      {pillar.tagline}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-heading text-zinc-900">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-800 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-zinc-200/50 flex items-center justify-between text-xs font-mono text-zinc-600">
                  <span className="font-semibold text-zinc-800">Implementations:</span>
                  <span className="text-cobalt-600 font-medium whitespace-nowrap">{pillar.featuredProjects.join(" · ")}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 3. FEATURED FLAGSHIP PROJECTS (WIDE 3-COLUMN GRID WITH FROSTED GLASS & P-7 PADDING) */}
      <section className="w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200/60 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-cobalt-600 font-bold">
              Production Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900">
              Featured Flagship Projects
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 font-sans">
              Selected systems built with uncompromising verification and empirical benchmarks.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-cobalt-600 hover:text-cobalt-700 hover:underline"
          >
            <span>View All 6 Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <GlassCard key={project.id} index={idx} data-cursor="view" className="h-full flex flex-col">
              <div className="p-7 sm:p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg text-[11px] font-mono font-medium bg-white/45 backdrop-blur-md text-zinc-900 border-t border-l border-white/95 border-r border-b border-white/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                    {project.badge}
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/45 hover:bg-white text-zinc-600 hover:text-zinc-950 transition-colors border-t border-l border-white/90 border-r border-b border-white/45 shadow-xs"
                    title="View GitHub"
                  >
                    <GitBranch className="w-4 h-4" />
                  </a>
                </div>

                <div className="mt-4">
                  <h3 className="text-2xl font-bold font-heading text-zinc-900">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-cobalt-600 font-semibold mt-1 leading-snug">
                    {project.tagline}
                  </div>
                  <p className="text-sm text-slate-800 mt-3 leading-relaxed font-sans min-h-[5rem]">
                    {project.summary}
                  </p>
                </div>

                {/* BOTTOM BLOCK: Wrap in mt-auto pt-5 container for perfect baseline alignment */}
                <div className="mt-auto pt-5 space-y-4">
                  {/* 3 Authentic Empirical Metrics in Recessed Frosted Sub-Glass Boxes */}
                  <div className="grid grid-cols-3 gap-2.5 font-mono text-xs">
                    {project.cardMetrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3 rounded-xl bg-white/35 backdrop-blur-md border border-white/75 shadow-[inset_0_1px_1px_rgba(255,255,255,0.85)] flex flex-col justify-between"
                      >
                        <div className="text-[10px] text-zinc-500 uppercase tracking-tight font-semibold">
                          {m.label}
                        </div>
                        <div className="font-bold text-zinc-950 mt-1 text-xs leading-tight">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-zinc-600 mt-0.5 leading-tight truncate">
                          {m.sub}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/40 backdrop-blur-md text-slate-800 border-t border-l border-white/85 border-r border-b border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="mt-auto p-4 sm:p-5 bg-white/25 backdrop-blur-md border-t border-white/60 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cobalt-600 hover:text-cobalt-700"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/playground?tab=${project.demoType}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-700 hover:text-zinc-950 px-2.5 py-1 rounded-md bg-white/40 hover:bg-white/60 border-t border-l border-white/80 border-r border-b border-white/40 shadow-xs"
                >
                  <Terminal className="w-3 h-3 text-cobalt-600" />
                  <span>Sandbox</span>
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 4. EXPERIENCE & HACKATHON HIGHLIGHT BANNER */}
      <section className="w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12">
        <GlassCard>
          <div className="p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3.5 max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-50/90 text-amber-800 border border-amber-200/80 shadow-xs">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>National Hackathon Winner &amp; AI Industry Experience</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900">
                Proven Execution: 1st Place / 97 Teams &amp; LiveAI LLM Fine-Tuning
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans">
                Awarded 1st place in the FLASH National Hackathon for the PillPal medication platform. Experience fine-tuning Llama and Mistral LLMs using Hugging Face PEFT/LoRA on GPU clusters.
              </p>
            </div>

            <Link
              href="/experience"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono font-semibold shadow-[0_4px_14px_-2px_rgba(15,23,42,0.35)] shrink-0 self-start md:self-center transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>View Experience &amp; Honors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
