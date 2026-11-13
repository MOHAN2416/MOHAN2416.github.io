"use client";

import React from "react";
import Link from "next/link";
import { CANDIDATE_PROFILE, ENGINEERING_PILLARS, PROJECTS } from "@/lib/data";
import { ArrowRight, Terminal, Shield, Zap, BarChart3, GitBranch, ExternalLink, Trophy, Cpu } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";
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
    <div className="space-y-16 sm:space-y-24 py-10 sm:py-16">
      {/* 1. HIGH-IMPACT FULL-WIDTH ARCHITECTURAL HERO */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl space-y-6 pt-2 sm:pt-4">
          {/* Main Title: Staggered Word-by-Word Motion Reveal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-zinc-900 tracking-tight leading-[1.08]">
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
                className="inline-block mr-2.5 sm:mr-3.5"
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
            <h2 className="text-lg sm:text-2xl font-mono font-semibold bg-gradient-to-r from-cobalt-600 via-indigo-600 to-cobalt-600 bg-clip-text text-transparent animate-shimmer">
              {CANDIDATE_PROFILE.headline}
            </h2>
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-base sm:text-lg text-zinc-600 leading-relaxed font-sans max-w-3xl"
          >
            B.Tech Computer Science student at Amrita Vishwa Vidyapeetham (Chennai) building deterministic local-first LLM agents, low-latency Linux biometric authentication systems, and from-scratch PyTorch Transformers.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.42 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cobalt-600 hover:bg-cobalt-700 text-white font-semibold text-sm shadow-xs transition-all hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Engineering Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/playground"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-50 text-zinc-800 font-mono text-sm border border-zinc-200 shadow-xs transition-all hover:border-zinc-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Terminal className="w-4 h-4 text-cobalt-600" />
              <span>Launch Interactive Labs</span>
            </Link>

            <a
              href={CANDIDATE_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 font-mono text-sm border border-zinc-200 shadow-xs transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. 4 CORE ENGINEERING PILLARS (2x2 GRID WITH MOUSE SPOTLIGHT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-1 border-b border-zinc-200/80 pb-4">
          <div className="text-xs font-mono uppercase tracking-wider text-cobalt-600 font-bold">
            Systems Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900">
            Core Engineering Pillars
          </h2>
          <p className="text-sm text-zinc-600 max-w-2xl font-sans">
            Spanning low-level Linux C PAM kernel hooks, mixed-integer linear programming, and deep learning models implemented from raw tensor math.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {ENGINEERING_PILLARS.map((pillar, idx) => (
            <SpotlightCard key={idx} index={idx}>
              <div className="p-6 sm:p-7 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                      {getPillarIcon(pillar.iconName)}
                    </div>
                    <span className="text-xs font-mono font-semibold text-zinc-500">
                      {pillar.tagline}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold font-heading text-zinc-900">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="font-semibold text-zinc-700">Implementations:</span>
                  <span className="text-cobalt-600 font-medium">{pillar.featuredProjects.join(" · ")}</span>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 3. FEATURED FLAGSHIP PROJECTS PREVIEW (AUTHENTIC EMPIRICAL METRICS & UNCLIPPED SUB-LABELS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200/80 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-wider text-cobalt-600 font-bold">
              Production Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900">
              Featured Flagship Projects
            </h2>
            <p className="text-sm text-zinc-600 font-sans">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, idx) => (
            <SpotlightCard key={project.id} index={idx} data-cursor="view">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
                    {project.badge}
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-zinc-400 hover:text-zinc-900"
                    title="View GitHub"
                  >
                    <GitBranch className="w-4 h-4" />
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-heading text-zinc-900">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-cobalt-600 font-medium mt-1 leading-snug">
                    {project.tagline}
                  </div>
                  <p className="text-xs text-zinc-600 mt-2.5 leading-relaxed font-sans">
                    {project.summary}
                  </p>
                </div>

                {/* 3 Authentic Empirical Metrics with Natural Wrapping (Zero Truncation) */}
                <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-xs">
                  {project.cardMetrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 flex flex-col justify-between">
                      <div className="text-[9px] text-zinc-400 uppercase tracking-tight font-semibold">
                        {m.label}
                      </div>
                      <div className="font-bold text-zinc-900 mt-0.5 text-[11px] leading-tight">
                        {m.value}
                      </div>
                      <div className="text-[9px] text-zinc-500 mt-0.5 leading-tight">
                        {m.sub}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 text-zinc-600 border border-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-zinc-50/70 border-t border-zinc-100 flex items-center justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cobalt-600 hover:text-cobalt-700"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/playground?tab=${project.demoType}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-zinc-600 hover:text-zinc-900"
                >
                  <Terminal className="w-3 h-3 text-cobalt-600" />
                  <span>Sandbox</span>
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 4. EXPERIENCE & HACKATHON HIGHLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SpotlightCard>
          <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>National Hackathon Winner &amp; AI Industry Experience</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900">
                Proven Execution: 1st Place / 97 Teams &amp; LiveAI LLM Fine-Tuning
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                Awarded 1st place in the FLASH National Hackathon for the PillPal medication platform. Experience fine-tuning Llama and Mistral LLMs using Hugging Face PEFT/LoRA on GPU clusters.
              </p>
            </div>

            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono font-semibold shadow-xs shrink-0 self-start md:self-center transition-colors"
            >
              <span>View Experience &amp; Honors</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </SpotlightCard>
      </section>
    </div>
  );
}
