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
    }, 40);
  };

  const currentGeneratedTokens = activePreset.tokens.slice(0, generatedCount);

  return (
    <div className="rounded-2xl border border-white/85 bg-white/60 backdrop-blur-2xl p-6 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_10px_30px_-10px_rgba(15,23,42,0.08)] space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              <Cpu className="w-4 h-4" />
            </span>
            <h4 className="text-base font-bold font-heading text-zinc-900">
              NanoCoder 12.29M AI Model Code Generation Lab
            </h4>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5 font-mono">
            PyTorch from scratch &middot; 6 Layers &middot; 6 Heads &middot; bfloat16 FlashAttention &middot; Custom 4k BPE
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-purple-50 text-purple-700 border border-purple-200 text-xs font-mono font-medium">
            21.48 ms/tok (46.6 tok/s CPU)
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-medium">
            Loss: 8.37 &rarr; 2.07
          </span>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="flex items-center gap-2 text-xs font-sans">
        <span className="text-zinc-500 font-medium">Corpus Prompt:</span>
        {PROMPT_PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActivePreset(p);
              setGeneratedCount(0);
            }}
            className={`px-3 py-1.5 rounded-md border text-xs font-mono font-medium transition-colors cursor-pointer ${
              activePreset.id === p.id
                ? "bg-zinc-900 text-white border-zinc-900 shadow-xs"
                : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Token Generation Box */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 font-mono text-xs leading-relaxed space-y-3">
        <div className="flex items-center justify-between text-zinc-500 text-[11px] pb-2 border-b border-zinc-200">
          <span>Prompt Context (256 window)</span>
          <span>
            Tokens generated: {generatedCount} / {activePreset.tokens.length}
          </span>
        </div>

        <pre className="text-zinc-700 overflow-x-auto whitespace-pre-wrap font-mono min-h-[140px]">
          <span className="text-zinc-500">{activePreset.prompt}</span>
          <span className="text-purple-700 font-bold">
            {currentGeneratedTokens.map((t) => t.text).join("")}
          </span>
          {isGenerating && <span className="inline-block w-2 h-4 bg-purple-600 animate-pulse ml-0.5" />}
        </pre>

        {generatedCount === activePreset.tokens.length && (
          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{activePreset.validityCheck}</span>
          </div>
        )}
      </div>

      {/* Token Inspector */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-mono text-zinc-500 flex items-center justify-between">
          <span>Top-K Sampling (K=40, Temp=0.7)</span>
          <span>FlashAttention bfloat16: ACTIVE</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-[10px] font-mono">
          {activePreset.tokens.slice(0, 6).map((tok, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-lg border ${
                idx < generatedCount
                  ? "bg-purple-50 border-purple-200 text-purple-900 font-semibold"
                  : "bg-white border-zinc-200 text-zinc-400"
              }`}
            >
              <div className="truncate">{tok.text.trim() || "\\n"}</div>
              <div className="text-zinc-400">ID: {tok.id}</div>
              <div className="text-emerald-700">P: {(tok.prob * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-xs font-mono">
        <span className="text-zinc-500">
          Zero high-level wrappers &middot; Pure PyTorch F.scaled_dot_product_attention
        </span>
        <button
          onClick={startGeneration}
          disabled={isGenerating}
          className="px-4 py-1.5 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-medium flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isGenerating ? "Synthesizing Tokens..." : "Generate Autoregressively"}</span>
        </button>
      </div>
    </div>
  );
}
