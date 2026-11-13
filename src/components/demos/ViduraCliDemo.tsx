"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, Play, CheckCircle2, AlertCircle, RefreshCw, Shield, Database } from "lucide-react";

interface TerminalStep {
  text: string;
  type: "command" | "output" | "ast" | "diff" | "gate" | "verify" | "test";
  delayMs?: number;
}

const DEMO_PRESETS = [
  {
    id: "fix-bug",
    label: "CodeChangeProposal Gate",
    cmd: "vidura refactor math_utils.py --verify",
    steps: [
      { text: "$ vidura refactor math_utils.py --verify", type: "command" as const },
      { text: "[ROUTER] Evaluating request... Selected: Tier-1 (Local gemma4:e4b-it-qat)", type: "output" as const },
      { text: "[AST] Resolving symbols in 'math_utils.py'... Found 12 functions, 2 classes", type: "ast" as const },
      { text: "[SECURITY] Running regex secret redaction... 0 secrets detected. Safe to process.", type: "output" as const },
      {
        text: `--- a/math_utils.py
+++ b/math_utils.py
@@ -42,7 +42,7 @@ def compute_exponential_moving_average(series, alpha=0.1):
-    return [sum(series[:i+1]) / (i+1) for i in range(len(series))]
+    ema = [series[0]]
+    for val in series[1:]:
+        ema.append(alpha * val + (1.0 - alpha) * ema[-1])
+    return ema`,
        type: "diff" as const,
      },
      { text: "[PERMISSION GATE] CodeChangeProposal generated. Explicit human authorization required.", type: "gate" as const },
      { text: "ACTION NEEDED: Type or click '/approve' to grant write authorization...", type: "output" as const },
    ],
  },
  {
    id: "symbol-lookup",
    label: "/symbol CodebaseManager",
    cmd: "vidura symbol CodebaseManager",
    steps: [
      { text: "$ vidura symbol CodebaseManager", type: "command" as const },
      { text: "[AST INDEX] Querying SQLite AST symbol registry for 'CodebaseManager'...", type: "output" as const },
      {
        text: `Symbol: CodebaseManager
Type: class
Defined in: vidura/core/codebase.py:18-142
Methods:
  - __init__(self, root_path: Path) -> None
  - index_symbols(self) -> SymbolIndexResult (1,433 indexed)
  - resolve_hierarchy(self, symbol_name: str) -> List[ASTNode]
  - compute_disk_hash(self, file_path: Path) -> str [SHA-256]
Hybrid RAG Vector Match: 128-dim SQLite embedding score: 0.9421 (45.44 ms)`,
        type: "ast" as const,
      },
      { text: "[STATUS] Symbol resolved in 14.2 ms with 0 disk writes.", type: "test" as const },
    ],
  },
  {
    id: "rag-search",
    label: "/rag search permission gate",
    cmd: "vidura rag 'permission gate authorization'",
    steps: [
      { text: "$ vidura rag 'permission gate authorization'", type: "command" as const },
      { text: "[HYBRID RAG] Scanning 1,258 indexed code chunks across 98 Python modules...", type: "output" as const },
      {
        text: `Match 1 [Score: 0.961] vidura/security/gate.py:34
class PermissionGate:
    def verify_proposal(self, proposal: CodeChangeProposal) -> AuthorizationResult:
        if not proposal.human_approved:
            raise UnapprovedSynthesisException("Disk write blocked by permission gate")

Match 2 [Score: 0.884] vidura/cli/commands.py:112
def approve_proposal(proposal_id: str) -> None: ...`,
        type: "ast" as const,
      },
      { text: "[BENCHMARK] Hybrid retrieval completed in 45.44 ms (112.93 MB RSS Memory)", type: "test" as const },
    ],
  },
  {
    id: "codebase-summary",
    label: "/codebase summary",
    cmd: "vidura codebase --stats",
    steps: [
      { text: "$ vidura codebase --stats", type: "command" as const },
      {
        text: `================== VIDURA CODEBASE TELEMETRY ==================
Total Source Code:      13,951 SLOC
Total Test Code:         8,472 SLOC
Combined SLOC:          22,423 SLOC
Python Modules:             98 modules
AST Classes Indexed:       175 classes
AST Functions Indexed:     445 functions
AST Methods Indexed:       602 methods
Automated Tests:           456 / 456 passing (100% CI, 6.57s execution)
Vector Chunks in SQLite: 1,258 chunks (indexed in 1.041s)`,
        type: "ast" as const,
      },
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
    }, 1200);
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className="rounded-xl border border-border/80 bg-[#090D13] shadow-2xl overflow-hidden font-mono text-xs md:text-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0D1117] border-b border-border/60">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            vidura-interactive-cli (v1.2.0 • Python 3.14 • Ollama Gemma 4)
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-sans">
          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Shield className="w-3 h-3" /> Permission Gate Active
          </span>
          <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Database className="w-3 h-3" /> 1,433 AST Symbols
          </span>
        </div>
      </div>

      {/* Preset Selector Bar */}
      <div className="flex items-center gap-1.5 p-2 bg-[#0A0E14] border-b border-border/40 overflow-x-auto text-[11px] font-sans">
        <span className="text-slate-400 text-xs px-2 whitespace-nowrap">Presets:</span>
        {DEMO_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectPreset(preset.id)}
            className={`px-2.5 py-1 rounded transition-all whitespace-nowrap flex items-center gap-1 ${
              activePreset === preset.id
                ? "bg-blue-600/30 text-blue-300 border border-blue-500/50 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
            }`}
          >
            <Play className="w-2.5 h-2.5" />
            {preset.label}
          </button>
        ))}
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 md:p-5 h-80 md:h-96 overflow-y-auto space-y-2.5 text-slate-300 leading-relaxed bg-[#070A0F]">
        {lines.map((line, idx) => {
          if (line.type === "command") {
            return (
              <div key={idx} className="text-cyan-400 font-semibold flex items-start gap-2">
                <span className="text-emerald-400 select-none">mohan@arch-linux:~/vidura$</span>
                <span>{line.text.replace("$ ", "")}</span>
              </div>
            );
          }
          if (line.type === "diff") {
            return (
              <pre
                key={idx}
                className="p-3 my-2 rounded bg-black/60 border border-border/70 text-xs overflow-x-auto text-slate-300 font-mono"
              >
                {line.text.split("\n").map((diffLine, dIdx) => (
                  <div
                    key={dIdx}
                    className={
                      diffLine.startsWith("+")
                        ? "text-emerald-400 bg-emerald-950/30 px-1 rounded"
                        : diffLine.startsWith("-")
                        ? "text-red-400 bg-red-950/30 px-1 rounded"
                        : diffLine.startsWith("@@")
                        ? "text-cyan-400 font-bold"
                        : "text-slate-400"
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
                className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{line.text}</span>
                </div>
              </div>
            );
          }
          if (line.type === "verify") {
            return (
              <div key={idx} className="text-emerald-400 flex items-start gap-2 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{line.text}</span>
              </div>
            );
          }
          if (line.type === "ast") {
            return (
              <pre
                key={idx}
                className="p-2.5 rounded bg-blue-950/20 border border-blue-500/20 text-blue-300 text-xs whitespace-pre-wrap font-mono"
              >
                {line.text}
              </pre>
            );
          }
          if (line.type === "test") {
            return (
              <pre
                key={idx}
                className="p-3 my-2 rounded bg-black/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono whitespace-pre-wrap"
              >
                {line.text}
              </pre>
            );
          }
          return (
            <div key={idx} className="text-slate-400 text-xs">
              {line.text}
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Action Footer */}
      <div className="p-3 bg-[#0D1117] border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          {waitingForApprove ? (
            <span className="text-amber-400 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Waiting for explicit authorization gate...
            </span>
          ) : isRunningTests ? (
            <span className="text-cyan-400 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Verifying byte hash & running 456 pytest suite...
            </span>
          ) : testResult ? (
            <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {testResult}
            </span>
          ) : (
            <span className="text-slate-500">Terminal ready. Select preset or inspect AST.</span>
          )}
        </div>

        {waitingForApprove && (
          <button
            onClick={handleApprove}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <Shield className="w-3.5 h-3.5" />
            Click to /approve CodeChangeProposal
          </button>
        )}
      </div>
    </div>
  );
}
