"use client";

import React, { useState } from "react";
import { PROJECTS } from "@/lib/data";
import { Layers } from "lucide-react";
import { ViduraCliDemo } from "./demos/ViduraCliDemo";
import { BlinkHudDemo } from "./demos/BlinkHudDemo";
import { VarunaSimDemo } from "./demos/VarunaSimDemo";
import { NanoCoderDemo } from "./demos/NanoCoderDemo";

export function ArchitectureLab() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("vidura");

  const selectedProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  const renderActiveDemo = () => {
    switch (selectedProject.demoType) {
      case "vidura-cli":
        return <ViduraCliDemo />;
      case "blink-hud":
        return <BlinkHudDemo />;
      case "varuna-sim":
        return <VarunaSimDemo />;
      case "nanocoder-lab":
        return <NanoCoderDemo />;
      default:
        return <ViduraCliDemo />;
    }
  };

  return (
    <section id="architecture" className="py-16 md:py-24 relative bg-[#07090E]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border/60">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Interactive Simulation Lab</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              Architecture Lab & Hardware Testbeds
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans">
              Test-drive Mohan&apos;s systems live inside the browser: deterministic AST code synthesis, Linux PAM biometric pipelines, MILP voyage allocation, and from-scratch GPT attention.
            </p>
          </div>

          {/* Project Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0D1117] border border-border/70 overflow-x-auto text-xs font-mono">
            {PROJECTS.slice(0, 4).map((proj) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  selectedProjectId === proj.id
                    ? "bg-purple-600/30 text-purple-200 border border-purple-500/50 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
                }`}
              >
                <span>{proj.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Project Architecture Card & Interactive Embed */}
        <div className="space-y-6">
          {/* Architecture Pipeline Nodes */}
          {selectedProject.architectureDiagramNodes && (
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0B0F17] border border-border/80 shadow-glass space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  {selectedProject.title} End-to-End System Topology
                </span>
                <span className="text-emerald-400 font-medium">
                  CI Passing: {selectedProject.testsCount}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {selectedProject.architectureDiagramNodes.map((node, idx) => (
                  <div
                    key={node.id}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between text-xs transition-all ${
                      node.type === "security"
                        ? "bg-amber-950/20 border-amber-500/40 text-amber-200"
                        : node.type === "storage"
                        ? "bg-purple-950/20 border-purple-500/40 text-purple-200"
                        : node.type === "input"
                        ? "bg-blue-950/20 border-blue-500/40 text-blue-200"
                        : "bg-[#0D121B] border-border/70 text-slate-200"
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase">
                        Stage {idx + 1}
                      </div>
                      <div className="font-bold text-white font-mono mt-0.5">{node.label}</div>
                      <div className="text-[11px] text-blue-400 font-mono mt-0.5">{node.tech}</div>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-2 pt-2 border-t border-border/40 leading-snug">
                      {node.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Embedded Interactive Simulator */}
          <div className="rounded-2xl border border-border/80 bg-[#07090E] p-1 sm:p-2 shadow-2xl">
            {renderActiveDemo()}
          </div>
        </div>
      </div>
    </section>
  );
}
