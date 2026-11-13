"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { GitBranch, ArrowRight, Cpu, Shield, Ship, Layers } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

const CATEGORIES = ["All (6)", "AI Agents & LLMs", "Systems & Security", "Optimization & Full-Stack"];

export default function ProjectsDirectoryPage() {
  const [activeCategory, setActiveCategory] = useState("All (6)");

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === "All (6)") return true;
    return p.category === activeCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI Agents & LLMs":
        return <Cpu className="w-3.5 h-3.5 text-cobalt-600" />;
      case "Systems & Security":
        return <Shield className="w-3.5 h-3.5 text-emerald-600" />;
      case "Optimization & Full-Stack":
        return <Ship className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-zinc-500" />;
    }
  };

  return (
    <div className="w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="space-y-4 border-b border-zinc-200/60 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-cobalt-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Projects</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-zinc-900 tracking-tight">
            Featured Projects Showcase
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-4xl font-sans">
            Explore all 6 projects with interactive simulations, verified test results, and public open-source repositories on GitHub.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 pt-3 overflow-x-auto text-xs font-sans">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white font-semibold shadow-[0_2px_8px_-2px_rgba(15,23,42,0.3)]"
                  : "bg-white/60 hover:bg-white/90 backdrop-blur-md text-zinc-700 border border-white/85 shadow-xs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Wide Grid Across 1640px Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <GlassCard
            key={project.id}
            index={idx}
            data-cursor="view"
            className="h-full flex flex-col"
          >
            <div className="p-7 sm:p-8 flex flex-col flex-1">
              {/* Category & GitHub Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono font-medium bg-white/45 backdrop-blur-md text-zinc-900 border-t border-l border-white/95 border-r border-b border-white/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                    {getCategoryIcon(project.category)}
                    <span>{project.badge}</span>
                  </span>
                  <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
                    &bull; {project.category}
                  </span>
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/45 hover:bg-white text-zinc-600 hover:text-zinc-950 transition-colors border-t border-l border-white/90 border-r border-b border-white/45 shadow-xs"
                  title="View on GitHub"
                >
                  <GitBranch className="w-4 h-4" />
                </a>
              </div>

              {/* Title & Tagline */}
              <div className="mt-4">
                <h2 className="text-2xl font-bold font-heading text-zinc-900">
                  {project.title}
                </h2>
                <div className="text-xs font-mono font-semibold text-cobalt-600 mt-1">
                  {project.tagline}
                </div>
                <p className="text-xs sm:text-sm text-slate-800 font-sans mt-3 leading-relaxed min-h-[5rem]">
                  {project.summary}
                </p>
              </div>

              {/* BOTTOM BLOCK: Wrap in mt-auto pt-5 container so all metrics, chips, and links align */}
              <div className="mt-auto pt-5 space-y-4">
                {/* Top 3 Verified Benchmark Badges in Recessed Frosted Sub-Glass Boxes */}
                <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
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

                {/* Tech Stack Chips (concise 4 pills) */}
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
                href={`/playground?tab=${project.demoType}`}
                className="text-xs font-mono text-zinc-700 hover:text-zinc-950 transition-colors px-2.5 py-1 rounded-md bg-white/40 hover:bg-white/60 border-t border-l border-white/80 border-r border-b border-white/40 shadow-xs"
              >
                Try Live Demo &rarr;
              </Link>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-semibold shadow-[0_2px_8px_-2px_rgba(37,99,235,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
