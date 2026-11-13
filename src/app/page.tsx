import React from "react";
import Link from "next/link";
import { CANDIDATE_PROFILE, CORE_METRICS, ENGINEERING_PILLARS, PROJECTS } from "@/lib/data";
import { ArrowRight, Terminal, Shield, Zap, BarChart3, CheckCircle2, GitBranch, ExternalLink, Trophy, Cpu } from "lucide-react";

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
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Availability Badge */}
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 pulse-emerald" />
            {CANDIDATE_PROFILE.availabilityStatus}
          </span>
        </div>

        {/* Hero Headline & Bio */}
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-zinc-900 tracking-tight leading-[1.1]">
            {CANDIDATE_PROFILE.name}
          </h1>
          <h2 className="text-xl sm:text-2xl font-mono font-medium text-cobalt-600">
            {CANDIDATE_PROFILE.headline}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-sans">
            B.Tech Computer Science student at Amrita Vishwa Vidyapeetham (Chennai) building deterministic local-first LLM agents, Linux biometric authentication systems, and from-scratch PyTorch Transformers.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cobalt-600 hover:bg-cobalt-700 text-white font-semibold text-sm shadow-xs transition-all hover:shadow-sm"
          >
            <span>Explore Engineering Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/playground"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-50 text-zinc-800 font-mono text-sm border border-zinc-200 shadow-xs transition-all hover:border-zinc-300"
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
        </div>

        {/* 4-Card Key Metrics Strip */}
        <div className="pt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {CORE_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1 hover:border-zinc-300 transition-colors"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  {metric.label}
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-zinc-900 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs text-zinc-500 font-sans line-clamp-1">
                  {metric.context}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 4 CORE ENGINEERING PILLARS (2x2 GRID) */}
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
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between space-y-6 hover:border-zinc-300 hover:shadow-card transition-all"
            >
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
                <span className="text-cobalt-600">{pillar.featuredProjects.join(" · ")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED FLAGSHIP PROJECTS PREVIEW (3 CARDS ONLY) */}
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
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between overflow-hidden hover:border-zinc-300 hover:shadow-card transition-all"
            >
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
                  <div className="text-xs font-mono text-cobalt-600 font-medium mt-0.5 line-clamp-1">
                    {project.tagline}
                  </div>
                  <p className="text-xs text-zinc-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Top 2 Metric Badges */}
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200">
                    <div className="text-[10px] text-zinc-400 uppercase">Scale</div>
                    <div className="font-bold text-zinc-900 truncate mt-0.5">
                      {project.sloc ? project.sloc.split(" ")[0] + " SLOC" : project.benchmarks[0].value}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200">
                    <div className="text-[10px] text-zinc-400 uppercase">Verification</div>
                    <div className="font-bold text-emerald-700 truncate mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{project.testsCount.split(" ")[0]} Tests</span>
                    </div>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 text-zinc-600 border border-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-zinc-50/70 border-t border-zinc-100">
                <Link
                  href={`/projects/${project.slug}`}
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-cobalt-600 hover:text-cobalt-700"
                >
                  <span>Read Architecture Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXPERIENCE & HACKATHON HIGHLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-xl bg-white border border-zinc-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-50 text-amber-800 border border-amber-200">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>National Hackathon Winner & AI Industry Experience</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900">
              Proven Execution: 1st Place / 97 Teams & LiveAI LLM Fine-Tuning
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
              Awarded 1st place in the FLASH National Hackathon for the PillPal medication platform. Experience fine-tuning Llama and Mistral LLMs using Hugging Face PEFT/LoRA on GPU clusters.
            </p>
          </div>

          <Link
            href="/experience"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono font-semibold shadow-xs shrink-0 self-start md:self-center transition-colors"
          >
            <span>View Experience & Honors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
