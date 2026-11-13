"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/data";
import { GitBranch, ArrowRight, Cpu, Shield, Ship, Layers } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="space-y-4 border-b border-zinc-200/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-cobalt-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Projects</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-zinc-900 tracking-tight">
            Production Engineering Showcase
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-3xl font-sans">
            Deep-dive case studies for all 6 production systems. Each project is backed by verified automated test suites, measured physical hardware latency, and public open-source repositories.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 pt-3 overflow-x-auto text-xs font-sans">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-zinc-900 text-white font-semibold shadow-xs"
                  : "bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Grid of 6 Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between overflow-hidden hover:border-zinc-300 hover:shadow-card transition-all"
          >
            <div className="p-6 sm:p-7 space-y-5">
              {/* Category & GitHub Icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
                    {getCategoryIcon(project.category)}
                    <span>{project.badge}</span>
                  </span>
                  <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                    &bull; {project.category}
                  </span>
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded text-zinc-400 hover:text-zinc-900 transition-colors"
                  title="View on GitHub"
                >
                  <GitBranch className="w-4 h-4" />
                </a>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="text-2xl font-bold font-heading text-zinc-900">
                  {project.title}
                </h2>
                <div className="text-xs font-mono font-medium text-cobalt-600 mt-1">
                  {project.tagline}
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 font-sans mt-3 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Top 3 Verified Benchmark Badges */}
              <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
                {project.cardMetrics.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-tight">{m.label}</div>
                    <div className="font-bold text-zinc-900 truncate mt-0.5 text-xs">
                      {m.value}
                    </div>
                    <div className="text-[10px] text-zinc-500 truncate mt-0.5">
                      {m.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100 text-zinc-700 border border-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-4 sm:p-5 bg-zinc-50/70 border-t border-zinc-100 flex items-center justify-between">
              <Link
                href={`/playground?tab=${project.demoType}`}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Test in Playground &rarr;
              </Link>

              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Open Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
