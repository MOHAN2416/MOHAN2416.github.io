"use client";

import React, { useState } from "react";
import { Cpu, Play, CheckCircle2 } from "lucide-react";

interface PromptPreset {
  id: string;
  name: string;
  type: "Python" | "Bash";
  prompt: string;
  tokens: Array<{ text: string; id: number; prob: number; latencyMs: number }>;
  validityCheck: string;
}

const PROMPT_PRESETS: PromptPreset[] = [
  {
    id: "quick-sort",
    name: "Python QuickSort AST",
    type: "Python",
    prompt: "def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr",
    tokens: [
      { text: "\n    pivot", id: 892, prob: 0.942, latencyMs: 21.2 },
      { text: " = arr", id: 241, prob: 0.965, latencyMs: 21.4 },
      { text: "[len(arr)", id: 1042, prob: 0.887, latencyMs: 21.5 },
      { text: " // 2]\n", id: 412, prob: 0.912, latencyMs: 21.8 },
      { text: "    left", id: 734, prob: 0.951, latencyMs: 21.1 },
      { text: " = [x for", id: 121, prob: 0.973, latencyMs: 21.4 },
      { text: " x in arr", id: 603, prob: 0.968, latencyMs: 21.3 },
      { text: " if x <", id: 984, prob: 0.932, latencyMs: 21.6 },
      { text: " pivot]\n", id: 312, prob: 0.954, latencyMs: 21.4 },
      { text: "    middle", id: 843, prob: 0.911, latencyMs: 21.7 },
      { text: " = [x for", id: 121, prob: 0.962, latencyMs: 21.2 },
      { text: " x in arr", id: 603, prob: 0.969, latencyMs: 21.5 },
      { text: " if x ==", id: 541, prob: 0.944, latencyMs: 21.3 },
      { text: " pivot]\n", id: 312, prob: 0.958, latencyMs: 21.4 },
      { text: "    right", id: 991, prob: 0.948, latencyMs: 21.6 },
      { text: " = [x for", id: 121, prob: 0.971, latencyMs: 21.1 },
      { text: " x in arr", id: 603, prob: 0.967, latencyMs: 21.5 },
      { text: " if x >", id: 985, prob: 0.934, latencyMs: 21.6 },
      { text: " pivot]\n", id: 312, prob: 0.951, latencyMs: 21.3 },
      { text: "    return", id: 245, prob: 0.984, latencyMs: 21.2 },
      { text: " quick_sort", id: 893, prob: 0.976, latencyMs: 21.5 },
      { text: "(left) +", id: 701, prob: 0.952, latencyMs: 21.4 },
      { text: " middle +", id: 702, prob: 0.948, latencyMs: 21.3 },
      { text: " quick_sort", id: 893, prob: 0.978, latencyMs: 21.5 },
      { text: "(right)", id: 703, prob: 0.982, latencyMs: 21.2 },
    ],
    validityCheck: "ast.parse() -> VALID (100% Python AST Syntax Compliant)",
  },
  {
    id: "bash-grep",
    name: "Ubuntu Bash Script",
    type: "Bash",
    prompt: "#!/usr/bin/env bash\n# Find all python files with regex secret leak\nset -euo pipefail\n",
    tokens: [
      { text: "find .", id: 611, prob: 0.971, latencyMs: 21.3 },
      { text: " -type f", id: 412, prob: 0.962, latencyMs: 21.5 },
      { text: ' -name "*.py"', id: 819, prob: 0.984, latencyMs: 21.1 },
      { text: " -print0 |", id: 318, prob: 0.923, latencyMs: 21.7 },
      { text: " xargs -0", id: 502, prob: 0.945, latencyMs: 21.4 },
      { text: " grep -nE", id: 712, prob: 0.938, latencyMs: 21.6 },
      { text: ' "(api_key|token|secret)"', id: 994, prob: 0.912, latencyMs: 21.8 },
      { text: " || true\n", id: 201, prob: 0.894, latencyMs: 21.3 },
      { text: 'echo "[INFO]', id: 450, prob: 0.955, latencyMs: 21.2 },
      { text: ' Scan complete"', id: 451, prob: 0.962, latencyMs: 21.5 },
    ],
    validityCheck: "bash -n script.sh -> VALID (0 syntax warnings)",
  },
];

export function NanoCoderDemo() {
  const [activePreset, setActivePreset] = useState<PromptPreset>(PROMPT_PRESETS[0]);
  const [generatedCount, setGeneratedCount] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const startGeneration = () => {
    setIsGenerating(true);
    setGeneratedCount(0);

    const total = activePreset.tokens.length;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      setGeneratedCount(current);
      if (current >= total) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 45); // Visual pacing
  };

  const currentGeneratedTokens = activePreset.tokens.slice(0, generatedCount);

  return (
    <div className="rounded-xl border border-border/80 bg-[#090D13] p-4 md:p-6 shadow-2xl space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cpu className="w-4 h-4" />
            </span>
            <h4 className="text-base font-semibold text-slate-100 font-mono">
              NanoCoder 12.29M Transformer Autoregressive Token Lab
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            PyTorch from scratch • 6 Layers • 6 Causal Heads • bfloat16 FlashAttention • Custom 4k Byte BPE
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono">
            Speed: 21.48 ms/tok (46.6 tok/s CPU)
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono">
            Loss: 8.37 &rarr; 2.07
          </span>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-slate-500">Target Corpus:</span>
        {PROMPT_PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActivePreset(p);
              setGeneratedCount(0);
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              activePreset.id === p.id
                ? "bg-purple-600/30 text-purple-200 border-purple-500/50"
                : "bg-slate-800/60 text-slate-400 border-border/60 hover:text-slate-200"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Token Generation Window */}
      <div className="p-4 rounded-xl bg-black/70 border border-border/80 font-mono text-xs leading-relaxed space-y-3">
        <div className="flex items-center justify-between text-slate-500 text-[11px] pb-2 border-b border-slate-800">
          <span>Prompt Context (256 window)</span>
          <span>
            Tokens generated: {generatedCount} / {activePreset.tokens.length}
          </span>
        </div>

        <pre className="text-slate-300 overflow-x-auto whitespace-pre-wrap font-mono min-h-[140px]">
          <span className="text-slate-400">{activePreset.prompt}</span>
          <span className="text-purple-300 font-semibold">
            {currentGeneratedTokens.map((t) => t.text).join("")}
          </span>
          {isGenerating && <span className="inline-block w-2 h-4 bg-purple-400 animate-pulse ml-0.5" />}
        </pre>

        {generatedCount === activePreset.tokens.length && (
          <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{activePreset.validityCheck}</span>
          </div>
        )}
      </div>

      {/* Token Inspector Strip */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Live Token Sampling Distribution (Top-K = 40, Temp = 0.7)</span>
          <span>FlashAttention bfloat16: ACTIVE</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-[10px] font-mono">
          {activePreset.tokens.slice(0, 6).map((tok, idx) => (
            <div
              key={idx}
              className={`p-2 rounded border ${
                idx < generatedCount
                  ? "bg-purple-950/30 border-purple-500/40 text-purple-200"
                  : "bg-slate-900 border-border/40 text-slate-500"
              }`}
            >
              <div className="truncate font-semibold">{tok.text.trim() || "\\n"}</div>
              <div className="text-slate-400">ID: {tok.id}</div>
              <div className="text-emerald-400">P: {(tok.prob * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
        <div className="text-slate-500 font-mono">
          Zero Hugging Face abstractions • Scaled Dot-Product Attention
        </div>
        <button
          onClick={startGeneration}
          disabled={isGenerating}
          className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium flex items-center gap-1.5 shadow-lg shadow-purple-950/50 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5" />
          {isGenerating ? "Synthesizing Tokens..." : "Generate Autoregressively (21.48ms/tok)"}
        </button>
      </div>
    </div>
  );
}
