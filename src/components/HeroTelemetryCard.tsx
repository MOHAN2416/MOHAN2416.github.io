"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Terminal, Activity } from "lucide-react";

interface TelemetryProject {
  id: string;
  name: string;
  slug: string;
  badge: string;
  demoTab: string;
  testsBadge: string;
  pipelineStages: {
    label: string;
    sub: string;
    type: "input" | "process" | "security" | "output";
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
}

const TELEMETRY_DATA: Record<string, TelemetryProject> = {
  vidura: {
    id: "vidura",
    name: "VIDURA",
    slug: "vidura",
    badge: "Deterministic AI Agent",
    demoTab: "vidura-cli",
    testsBadge: "456 / 456 Tests Passed (6.57s)",
    pipelineStages: [
      { label: "AST Indexer", sub: "1,433 symbols in 98 modules", type: "input" },
      { label: "5-Tier Router", sub: "Regex API key sanitization", type: "security" },
      { label: "Permission Gate", sub: "Blocks write until /approve", type: "security" },
      { label: "Parity Engine", sub: "SHA-256 byte parity & pytest", type: "output" },
    ],
    metrics: [
      { label: "Codebase Scale", value: "22,423 SLOC" },
      { label: "Test Suite", value: "456 / 456 Passed" },
      { label: "RAG Latency", value: "45.44 ms" },
    ],
  },
  nanocoder: {
    id: "nanocoder",
    name: "NanoCoder",
    slug: "nanocoder",
    badge: "From-Scratch PyTorch GPT",
    demoTab: "nanocoder-lab",
    testsBadge: "12.29M Trainable Params",
    pipelineStages: [
      { label: "Byte BPE", sub: "4,096 custom code vocab", type: "input" },
      { label: "FlashAttention", sub: "6 layers · 6 heads · d=384", type: "process" },
      { label: "Inference Head", sub: "21.48 ms/tok on consumer CPU", type: "process" },
      { label: "Syntax Verifier", sub: "60% Bash / 45% AST valid", type: "output" },
    ],
    metrics: [
      { label: "Architecture", value: "12.29M Params" },
      { label: "Benchmarks", value: "40 Eval Prompts" },
      { label: "CPU Latency", value: "21.48 ms/tok" },
    ],
  },
  blink: {
    id: "blink",
    name: "BLINK",
    slug: "blink",
    badge: "Linux C-PAM Biometric Suite",
    demoTab: "blink-hud",
    testsBadge: "78 Passing Tests (Pytest + PAM)",
    pipelineStages: [
      { label: "V4L2 Sensor", sub: "RGB / <35 lux IR failover", type: "input" },
      { label: "3-Tier PAD", sub: "MiniFASNet + 2D FFT Moiré", type: "security" },
      { label: "ArcFace AVX2", sub: "512-d normalized embedding", type: "process" },
      { label: "C-PAM Gate", sub: "~800ms auth (<15ms fallback)", type: "output" },
    ],
    metrics: [
      { label: "Auth Latency", value: "~800 ms" },
      { label: "Test Suite", value: "78 Passing Tests" },
      { label: "Security", value: "3-Tier PAD" },
    ],
  },
};

export function HeroTelemetryCard() {
  const [activeKey, setActiveKey] = useState<"vidura" | "nanocoder" | "blink">("vidura");
  const project = TELEMETRY_DATA[activeKey];

  return (
    <div className="rounded-2xl bg-white border border-zinc-200/90 shadow-sm p-5 sm:p-6 space-y-5 hover:border-zinc-300 transition-all">
      {/* Top Bar with System Switcher */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cobalt-600 animate-pulse" />
          <span className="text-xs font-mono font-bold text-zinc-900 tracking-tight">
            Live Architecture Telemetry
          </span>
        </div>

        {/* 3-Way Switcher */}
        <div className="inline-flex p-0.5 rounded-lg bg-zinc-100 border border-zinc-200 text-[11px] font-mono">
          {(["vidura", "nanocoder", "blink"] as const).map((key) => {
            const isActive = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-zinc-900 shadow-xs border border-zinc-200/80"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {key.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected System Header & Verification Badge */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-zinc-900 font-heading">
              {project.name}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
              {project.badge}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{project.testsBadge}</span>
          </span>
        </div>
        <p className="text-xs text-zinc-500 font-sans">
          Deterministic execution pipeline with continuous regression verification.
        </p>
      </div>

      {/* 4-Stage Architecture Flow */}
      <div className="space-y-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
          Execution Pipeline
        </div>
        <div className="grid grid-cols-2 gap-2 font-mono">
          {project.pipelineStages.map((stage, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/80 space-y-0.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-800">
                  {stage.label}
                </span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-white text-zinc-500 border border-zinc-200">
                  Step {idx + 1}
                </span>
              </div>
              <div className="text-[10px] text-zinc-500 leading-tight">
                {stage.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Metric Pills */}
      <div className="grid grid-cols-3 gap-2 font-mono text-center pt-1 border-t border-zinc-100">
        {project.metrics.map((m, idx) => (
          <div key={idx} className="p-2 rounded-lg bg-zinc-50/70 border border-zinc-200/60">
            <div className="text-[9px] text-zinc-400 uppercase tracking-tight">{m.label}</div>
            <div className="text-xs font-bold text-zinc-900 mt-0.5 truncate">{m.value}</div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <span>Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          href={`/playground?tab=${project.demoTab}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cobalt-50 hover:bg-cobalt-100 text-cobalt-700 font-mono font-medium border border-cobalt-200 transition-colors"
        >
          <Terminal className="w-3.5 h-3.5 text-cobalt-600" />
          <span>Launch Sandbox</span>
        </Link>
      </div>
    </div>
  );
}
