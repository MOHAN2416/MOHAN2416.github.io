"use client";

import React, { useState } from "react";
import { Project } from "@/lib/data";
import { X, Cpu, Activity, Terminal, GitBranch, ExternalLink, CheckCircle2, Layers } from "lucide-react";
import { ViduraCliDemo } from "./demos/ViduraCliDemo";
import { BlinkHudDemo } from "./demos/BlinkHudDemo";
import { VarunaSimDemo } from "./demos/VarunaSimDemo";
import { NanoCoderDemo } from "./demos/NanoCoderDemo";
import { KavachAuditDemo } from "./demos/KavachAuditDemo";
import { CloverStreamDemo } from "./demos/CloverStreamDemo";

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
  defaultTab?: "interactive" | "architecture" | "benchmarks";
}

export function ArchitectureModal({ project, onClose, defaultTab = "interactive" }: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<"interactive" | "architecture" | "benchmarks">(defaultTab);

  if (!project) return null;

  const renderInteractiveDemo = () => {
    switch (project.demoType) {
      case "vidura-cli":
        return <ViduraCliDemo />;
      case "blink-hud":
        return <BlinkHudDemo />;
      case "varuna-sim":
        return <VarunaSimDemo />;
      case "nanocoder-lab":
        return <NanoCoderDemo />;
      case "kavach-audit":
        return <KavachAuditDemo />;
      case "clover-stream":
        return <CloverStreamDemo />;
      default:
        return <ViduraCliDemo />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl border border-border/80 bg-[#07090E] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-[#0D1117]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white font-mono">{project.title}</h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  {project.badge}
                </span>
                <span className="hidden sm:inline-block text-xs text-slate-500 font-mono">
                  • {project.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{project.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-border/60 transition-all"
            >
              <GitBranch className="w-3.5 h-3.5 text-blue-400" />
              <span>View GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-border/50 bg-[#0A0E15] text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab("interactive")}
            className={`px-4 py-2.5 rounded-t-lg border-b-2 font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "interactive"
                ? "border-blue-500 text-blue-300 bg-[#07090E]"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <Terminal className="w-4 h-4 text-blue-400" />
            <span>Interactive Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-4 py-2.5 rounded-t-lg border-b-2 font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "architecture"
                ? "border-blue-500 text-blue-300 bg-[#07090E]"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Architecture Flow & Nodes</span>
          </button>

          <button
            onClick={() => setActiveTab("benchmarks")}
            className={`px-4 py-2.5 rounded-t-lg border-b-2 font-medium flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "benchmarks"
                ? "border-blue-500 text-blue-300 bg-[#07090E]"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Hardware Benchmarks & Latency</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#07090E]">
          {/* TAB 1: INTERACTIVE SIMULATOR */}
          {activeTab === "interactive" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-blue-300 flex items-center justify-between">
                <span>
                  <strong>Interactive Sandbox:</strong> Live simulated execution environment running inside your browser without backend dependencies.
                </span>
                <span className="font-mono text-emerald-400 hidden sm:inline-block">Status: Deterministic Ready</span>
              </div>
              {renderInteractiveDemo()}
            </div>
          )}

          {/* TAB 2: ARCHITECTURE FLOW & NODES */}
          {activeTab === "architecture" && (
            <div className="space-y-6">
              {/* Architecture Nodes Flow Diagram */}
              {project.architectureDiagramNodes && project.architectureDiagramNodes.length > 0 && (
                <div className="p-5 rounded-xl bg-[#0B0F17] border border-border/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                      System Topology & Data Pipeline
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500">
                      {project.architectureDiagramNodes.length} Architectural Stages
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
                    {project.architectureDiagramNodes.map((node, nIdx) => (
                      <div
                        key={node.id}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between text-xs transition-all ${
                          node.type === "security"
                            ? "bg-amber-950/20 border-amber-500/40 text-amber-200"
                            : node.type === "storage"
                            ? "bg-purple-950/20 border-purple-500/40 text-purple-200"
                            : node.type === "input"
                            ? "bg-blue-950/20 border-blue-500/40 text-blue-200"
                            : "bg-[#0F1624] border-border/70 text-slate-200"
                        }`}
                      >
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                            Stage {nIdx + 1} • {node.type}
                          </div>
                          <div className="font-bold text-white font-mono">{node.label}</div>
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

              {/* Core Architectural Highlights */}
              <div className="p-5 rounded-xl bg-[#0B0F17] border border-border/80 space-y-3">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                  Engineering Safeguards & Invariants
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {project.architectureHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Chips */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400">Core Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-200 text-xs font-mono border border-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BENCHMARKS & LATENCY */}
          {activeTab === "benchmarks" && (
            <div className="space-y-6">
              {/* Latency Stage Breakdown Progress Bars */}
              {project.latencyStages && project.latencyStages.length > 0 && (
                <div className="p-5 rounded-xl bg-[#0B0F17] border border-border/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                      Stage Latency Breakdown (Physical Millisecond Measurements)
                    </h4>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      Total: {project.latencyHeadline}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {project.latencyStages.map((stage, idx) => {
                      const maxMs = Math.max(...project.latencyStages!.map((s) => s.timeMs));
                      const percentage = Math.max(10, Math.round((stage.timeMs / maxMs) * 100));

                      return (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-slate-300">{stage.stage}</span>
                            <span className="text-emerald-400 font-semibold">{stage.timeMs} ms</span>
                          </div>
                          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden flex">
                            <div
                              style={{ width: `${percentage}%` }}
                              className="bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                            />
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">{stage.description}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Benchmarks Table */}
              <div className="p-5 rounded-xl bg-[#0B0F17] border border-border/80 space-y-3">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
                  Empirical System Telemetry
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono text-left">
                    <thead>
                      <tr className="border-b border-border/70 text-slate-400">
                        <th className="py-2.5 px-3">Metric</th>
                        <th className="py-2.5 px-3">Measured Value</th>
                        <th className="py-2.5 px-3">Measurement Context & Methodology</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {project.benchmarks.map((bm, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/20">
                          <td className="py-2.5 px-3 text-slate-300 font-medium">{bm.metric}</td>
                          <td className="py-2.5 px-3 text-emerald-400 font-semibold">{bm.value}</td>
                          <td className="py-2.5 px-3 text-slate-400">{bm.context}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#0D1117] border-t border-border/60 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Verified 100% CI pass rate ({project.testsCount})</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
