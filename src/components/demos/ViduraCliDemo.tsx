"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Play, CheckCircle2, AlertCircle, RefreshCw, Shield, Database, Ban } from "lucide-react";

interface TerminalStep {
  text: string;
  type: "command" | "output" | "ast" | "diff" | "gate" | "verify" | "test" | "blocked";
}

const DEMO_PRESETS = [
  {
    id: "fix-bug",
    label: "Fix addition bug (Diff & /approve Gate)",
    cmd: "vidura refactor math_utils.py --verify",
    steps: [
      { text: "$ vidura refactor math_utils.py --verify", type: "command" as const },
      { text: "[ROUTER] Request evaluated: Selected Tier-1 (Local gemma4:e4b-it-qat)", type: "output" as const },
      { text: "[AST] Resolving symbols in 'math_utils.py'... Found 12 functions, 2 classes", type: "ast" as const },
      { text: "[SECURITY] Running regex secret redaction... 0 leaks. Safe to proceed.", type: "output" as const },
      {
        text: `--- a/math_utils.py
+++ b/math_utils.py
@@ -18,7 +18,7 @@ def compute_safe_sum(a: float, b: float) -> float:
-    return a - b  # [BUG] Subtraction inadvertently committed
+    return a + b  # [FIX] Correct arithmetic addition applied`,
        type: "diff" as const,
      },
      { text: "[PERMISSION GATE] CodeChangeProposal generated. Explicit human authorization required.", type: "gate" as const },
      { text: "ACTION NEEDED: Click '/approve' below to authorize disk synthesis and run test suite...", type: "output" as const },
    ],
  },
  {
    id: "symbol-lookup",
    label: "Inspect AST symbols (/symbol CodebaseManager)",
    cmd: "vidura symbol CodebaseManager",
    steps: [
      { text: "$ vidura symbol CodebaseManager", type: "command" as const },
      { text: "[AST REGISTRY] Querying persistent SQLite symbol registry...", type: "output" as const },
      {
        text: `Symbol: CodebaseManager
Type: class
Defined in: vidura/core/codebase.py:18-142
Methods:
  - __init__(self, root_path: Path) -> None
  - index_symbols(self) -> SymbolIndexResult (1,433 indexed)
  - resolve_hierarchy(self, symbol_name: str) -> List[ASTNode]
  - compute_disk_hash(self, file_path: Path) -> str [SHA-256]
Hybrid RAG Embedding: 128-dim SQLite vector match score: 0.9421 (45.44 ms retrieval)`,
        type: "ast" as const,
      },
      { text: "[BENCHMARK] AST symbol resolved in 14.2 ms with 0 disk writes.", type: "test" as const },
    ],
  },
  {
    id: "blocked-edit",
    label: "Attempt .env edit (Security Blacklist)",
    cmd: "vidura edit .env --set API_KEY=xyz",
    steps: [
      { text: "$ vidura edit .env --set API_KEY=xyz", type: "command" as const },
      { text: "[SECURITY GUARD] Inspecting target file against system blacklist...", type: "output" as const },
      {
        text: `[SECURITY BLACKLIST TRIGGERED]
Target file '.env' matches protected configuration pattern.
Blacklisted rules:
  - .*\\.env.*
  - .*id_rsa.*
  - .*\\.git/.*
  - /etc/.*`,
        type: "blocked" as const,
      },
      { text: "[REFUSED] Write proposal immediately rejected before model invocation. State committed to audit log.", type: "blocked" as const },
    ],
  },
];

export function ViduraCliDemo() {
  const [activePreset, setActivePreset] = useState(DEMO_PRESETS[0].id);
  const [lines, setLines] = useState<TerminalStep[]>(DEMO_PRESETS[0].steps);
  const [waitingForApprove, setWaitingForApprove] = useState(true);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const handleSelectPreset = (presetId: string) => {
    const selected = DEMO_PRESETS.find((p) => p.id === presetId);
    if (!selected) return;
    setActivePreset(presetId);
    setLines(selected.steps);
    setWaitingForApprove(presetId === "fix-bug");
    setIsRunningTests(false);
    setTestResult(null);
  };

  const handleApprove = () => {
    if (!waitingForApprove) return;
    setWaitingForApprove(false);
    setIsRunningTests(true);

    const newLines: TerminalStep[] = [
      ...lines,
      { text: "$ /approve", type: "command" },
      { text: "[GATE AUTHORIZED] Human token verified. Proceeding to disk synthesis...", type: "output" },
      { text: "[DISK VERIFY] Computing pre-change SHA-256 hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", type: "verify" },
      { text: "[BYTE PARITY] Target file written to disk. Physical byte parity: VERIFIED (100% match)", type: "verify" },
      { text: "[AST COMPILATION] Running python -m py_compile math_utils.py -> Syntax VALID", type: "ast" },
      { text: "[TEST RUNNER] Executing sandboxed pytest suite across 98 modules...", type: "output" },
    ];
    setLines(newLines);

    setTimeout(() => {
      setLines((prev) => [
        ...prev,
        {
          text: `============================= test session starts ==============================
platform linux -- Python 3.14.0, pytest-8.3.4, pluggy-1.5.0
rootdir: /vidura, configfile: pyproject.toml
collected 456 items

tests/test_ast.py ..................................................... [ 12%]
tests/test_gate.py .................................................... [ 24%]
tests/test_router.py .................................................. [ 36%]
tests/test_rag.py ..................................................... [ 48%]
tests/test_math_utils.py .............................................. [ 60%]
tests/test_disk_verify.py ............................................. [ 72%]
tests/test_experience.py .............................................. [ 84%]
tests/test_e2e_lifecycle.py ........................................... [100%]

======================== 456 passed in 6.57s =========================`,
          type: "test",
        },
        { text: "[VIDURA EXPERIENCE] Episode logged into SQLite (vidura.db). State committed.", type: "verify" },
      ]);
      setIsRunningTests(false);
      setTestResult("PASSED: 456 / 456 automated tests verified in 6.57s");
    }, 1100);
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-xs overflow-hidden font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 border-b border-zinc-200">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 text-xs text-zinc-600 font-sans font-medium flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cobalt-600" />
            vidura-interactive-cli (Python 3.14 &middot; Ollama Gemma 4)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-sans">
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
            <Shield className="w-3 h-3" /> Permission Gate Active
          </span>
          <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200 font-mono">
            <Database className="w-3 h-3" /> 1,433 AST Symbols
          </span>
        </div>
      </div>

      {/* Preset Selector Bar */}
      <div className="flex items-center gap-1.5 p-2 bg-zinc-100/60 border-b border-zinc-200 overflow-x-auto text-[11px] font-sans">
        <span className="text-zinc-500 text-xs px-2 whitespace-nowrap font-medium">Select Task:</span>
        {DEMO_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset.id)}
            className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 font-medium cursor-pointer ${
              activePreset === preset.id
                ? "bg-white text-cobalt-700 border border-zinc-300 shadow-xs"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-white/60 border border-transparent"
            }`}
          >
            <Play className="w-2.5 h-2.5 text-cobalt-600" />
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 md:p-5 h-80 md:h-96 overflow-y-auto space-y-2 text-zinc-800 leading-relaxed bg-[#FBFBFC]">
        {lines.map((line, idx) => {
          if (line.type === "command") {
            return (
              <div key={idx} className="text-cobalt-700 font-bold flex items-start gap-2">
                <span className="text-emerald-700 select-none">mohan@linux:~/vidura$</span>
                <span>{line.text.replace("$ ", "")}</span>
              </div>
            );
          }
          if (line.type === "diff") {
            return (
              <pre
                key={idx}
                className="p-3 my-2 rounded-lg bg-white border border-zinc-200 text-xs overflow-x-auto font-mono text-zinc-800 shadow-xs"
              >
                {line.text.split("\n").map((diffLine, dIdx) => (
                  <div
                    key={dIdx}
                    className={
                      diffLine.startsWith("+")
                        ? "text-emerald-800 bg-emerald-50 px-1 rounded font-semibold"
                        : diffLine.startsWith("-")
                        ? "text-red-700 bg-red-50 px-1 rounded font-semibold"
                        : diffLine.startsWith("@@")
                        ? "text-cobalt-700 font-bold"
                        : "text-zinc-600"
                    }
                  >
                    {diffLine}
                  </div>
                ))}
              </pre>
            );
          }
          if (line.type === "gate") {
            return (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-xs font-sans font-medium"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{line.text}</span>
                </div>
              </div>
            );
          }
          if (line.type === "blocked") {
            return (
              <div
                key={idx}
                className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs font-mono whitespace-pre-wrap leading-relaxed"
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Ban className="w-4 h-4 text-red-600" />
                  <span>Access Violation Intercepted</span>
                </div>
                {line.text}
              </div>
            );
          }
          if (line.type === "verify") {
            return (
              <div key={idx} className="text-emerald-700 flex items-start gap-2 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{line.text}</span>
              </div>
            );
          }
          if (line.type === "ast") {
            return (
              <pre
                key={idx}
                className="p-2.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 text-xs whitespace-pre-wrap font-mono shadow-xs"
              >
                {line.text}
              </pre>
            );
          }
          if (line.type === "test") {
            return (
              <pre
                key={idx}
                className="p-3 my-2 rounded-lg bg-zinc-900 text-emerald-400 text-xs font-mono whitespace-pre-wrap shadow-xs"
              >
                {line.text}
              </pre>
            );
          }
          return (
            <div key={idx} className="text-zinc-500 text-xs">
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer */}
      <div className="p-3 bg-zinc-50 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          {waitingForApprove ? (
            <span className="text-amber-800 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Awaiting explicit human `/approve` authorization gate...
            </span>
          ) : isRunningTests ? (
            <span className="text-cobalt-700 font-medium flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Verifying byte hash & running 456 pytest suite...
            </span>
          ) : testResult ? (
            <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {testResult}
            </span>
          ) : (
            <span className="text-zinc-500">Terminal ready. Click preset to test-drive.</span>
          )}
        </div>

        {waitingForApprove && (
          <button
            onClick={handleApprove}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Click to /approve CodeChangeProposal</span>
          </button>
        )}
      </div>
    </div>
  );
}
