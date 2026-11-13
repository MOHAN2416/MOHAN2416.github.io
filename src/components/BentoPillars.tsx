"use client";

import React from "react";
import { ENGINEERING_PILLARS } from "@/lib/data";
import { Cpu, Shield, BarChart3, Layers, ArrowUpRight } from "lucide-react";

interface BentoPillarsProps {
  onSelectProject: (projectId: string) => void;
}

export function BentoPillars({ onSelectProject }: BentoPillarsProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu":
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-emerald-400" />;
      case "BarChart3":
        return <BarChart3 className="w-5 h-5 text-amber-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-purple-400" />;
      default:
        return <Cpu className="w-5 h-5 text-blue-400" />;
    }
  };

  const getTargetId = (projectName: string) => {
    if (projectName.includes("VIDURA")) return "vidura";
    if (projectName.includes("NanoCoder")) return "nanocoder";
    if (projectName.includes("BLINK")) return "blink";
    if (projectName.includes("Kavach")) return "kavachai";
    if (projectName.includes("VARUNA")) return "varuna";
    if (projectName.includes("Clover")) return "clover-crm";
    return "vidura";
  };

  return (
    <section id="pillars" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Systems Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Engineering Depth Across 4 Core Pillars
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans">
            From low-level Linux C PAM kernel modules to state-of-the-art PyTorch attention mechanisms and linear optimization algorithms.
          </p>
        </div>

        {/* Bento 4-Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {ENGINEERING_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-2xl bg-[#0B0F17]/90 border ${pillar.borderColor} shadow-glass backdrop-blur-md flex flex-col justify-between space-y-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-border/80">
                    {getIcon(pillar.iconName)}
                  </div>
                  <span className={`text-xs font-mono font-medium ${pillar.textColor}`}>
                    {pillar.tagline}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-sans">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Projects Chips in Pillar */}
              <div className="pt-4 border-t border-border/50 space-y-2">
                <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  Featured Implementations:
                </div>
                <div className="flex flex-wrap gap-2">
                  {pillar.featuredProjects.map((proj, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => onSelectProject(getTargetId(proj))}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-border/70 text-xs font-mono transition-all cursor-pointer group"
                    >
                      <span>{proj}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
