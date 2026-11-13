"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/lib/data";
import { GitBranch, Activity, Terminal, Shield, Cpu, Ship, CheckCircle2, ArrowRight } from "lucide-react";

interface ProjectsShowcaseProps {
  onInspectProject: (project: Project, tab?: "interactive" | "architecture" | "benchmarks") => void;
}

export function ProjectsShowcase({ onInspectProject }: ProjectsShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All (6)");

  const CATEGORIES = ["All (6)", "AI & LLMs", "Systems & Security", "Quantitative & Full-Stack"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === "All (6)") return true;
    return p.category === activeCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AI & LLMs":
        return <Cpu className="w-4 h-4 text-blue-400" />;
      case "Systems & Security":
        return <Shield className="w-4 h-4 text-emerald-400" />;
      case "Quantitative & Full-Stack":
        return <Ship className="w-4 h-4 text-amber-400" />;
      default:
        return <Activity className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="projects" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border/60">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Repositories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              Engineering Systems & Benchmarks
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans">
              Filterable showcase of 6 high-integrity systems featuring measured hardware latency profiles, full test suites, and interactive simulators.
            </p>
          </div>

          {/* Filter Category Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0D1117] border border-border/70 overflow-x-auto text-xs font-mono">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-blue-600/30 text-blue-300 border border-blue-500/50 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-[#0A0E15]/95 shadow-glass backdrop-blur-md ${
                project.isFlagship
                  ? "border-blue-500/30 hover:border-blue-500/60 hover:shadow-glow-indigo"
                  : "border-border/80 hover:border-border-glow hover:shadow-2xl"
              }`}
            >
              {/* Card Top Header */}
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/25 flex items-center gap-1">
                      {getCategoryIcon(project.category)}
                      <span>{project.badge}</span>
                    </span>
                    <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                      • {project.category}
                    </span>
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-border/80 transition-colors"
                    title={`View ${project.title} on GitHub`}
                  >
                    <GitBranch className="w-4 h-4" />
                  </a>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-400/90 font-mono mt-1">
                    {project.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mt-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Live Metric Pills Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {project.sloc && (
                    <div className="p-2.5 rounded-xl bg-[#0D121D] border border-border/60">
                      <div className="text-[10px] font-mono text-slate-500 uppercase">Scale</div>
                      <div className="text-xs font-mono font-bold text-slate-200 mt-0.5 truncate">
                        {project.sloc.split(" ")[0]} SLOC
                      </div>
                    </div>
                  )}

                  <div className="p-2.5 rounded-xl bg-[#0D121D] border border-border/60">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Test Suite</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{project.testsCount.split(" ")[0]} Tests</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0D121D] border border-border/60">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Latency</div>
                    <div className="text-xs font-mono font-bold text-cyan-400 mt-0.5 truncate">
                      {project.latencyHeadline.split(" ")[0]} {project.latencyHeadline.split(" ")[1]}
                    </div>
                  </div>
                </div>

                {/* Key Architecture Highlights */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">
                    Architectural Invariants:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400 font-sans">
                    {project.architectureHighlights.slice(0, 3).map((hl, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold shrink-0">›</span>
                        <span className="line-clamp-2">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 bg-[#0D1117] border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => onInspectProject(project, "architecture")}
                  className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-border/70 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                  <span>Inspect Architecture & Benchmarks</span>
                </button>

                <button
                  onClick={() => onInspectProject(project, "interactive")}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium flex items-center gap-1.5 shadow-md shadow-blue-950/40 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Launch Interactive Demo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
