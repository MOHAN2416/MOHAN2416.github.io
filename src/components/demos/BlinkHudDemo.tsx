"use client";

import React, { useState } from "react";
import { Eye, Camera, CheckCircle2, AlertTriangle, RefreshCw, Sun, Moon, Shield } from "lucide-react";

interface PipelineStageState {
  name: string;
  expectedMs: number;
  measuredMs?: number;
  status: "idle" | "running" | "passed" | "fallback";
  details: string;
}

const INITIAL_STAGES: PipelineStageState[] = [
  { name: "Camera Acquisition (V4L2)", expectedMs: 110, status: "idle", details: "Frame capture from sensor" },
  { name: "Face Detection (YuNet ONNX)", expectedMs: 32, status: "idle", details: "AVX2 SIMD bounding box" },
  { name: "Presentation Attack Detection", expectedMs: 48, status: "idle", details: "MiniFASNetV2 + 2D FFT Moiré" },
  { name: "Feature Extraction (ArcFace)", expectedMs: 65, status: "idle", details: "512-d float32 embedding" },
  { name: "Vault Cosine Matching", expectedMs: 2, status: "idle", details: "AES-256-GCM encrypted vault match" },
];

export function BlinkHudDemo() {
  const [luminance, setLuminance] = useState<number>(48);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [stages, setStages] = useState<PipelineStageState[]>(INITIAL_STAGES);
  const [totalTime, setTotalTime] = useState<number | null>(null);
  const [authOutcome, setAuthOutcome] = useState<"idle" | "success" | "fallback">("idle");

  const isIrActive = luminance < 35;
  const activeDevice = isIrActive ? "/dev/video2 (Zero-Light IR 640x360)" : "/dev/video0 (RGB Sensor 640x480)";

  const runAuthentication = (simulateOffline = false) => {
    setIsAuthenticating(true);
    setAuthOutcome("idle");
    setTotalTime(null);

    if (simulateOffline) {
      setTimeout(() => {
        setIsAuthenticating(false);
        setAuthOutcome("fallback");
        setTotalTime(12); // < 15ms fallback
      }, 150);
      return;
    }

    // Reset stages
    setStages(INITIAL_STAGES.map((s) => ({ ...s, status: "idle", measuredMs: undefined })));

    let cumulativeMs = 0;
    const runStage = (index: number) => {
      if (index >= INITIAL_STAGES.length) {
        setIsAuthenticating(false);
        setAuthOutcome("success");
        setTotalTime(Math.round(cumulativeMs + 540)); // Total cold auth cycle ~800ms
        return;
      }

      setStages((prev) =>
        prev.map((s, i) => (i === index ? { ...s, status: "running" } : s))
      );

      const jitter = (Math.random() - 0.5) * 6;
      const stageDuration = Math.round(INITIAL_STAGES[index].expectedMs + jitter);
      cumulativeMs += stageDuration;

      setTimeout(() => {
        setStages((prev) =>
          prev.map((s, i) =>
            i === index ? { ...s, status: "passed", measuredMs: stageDuration } : s
          )
        );
        runStage(index + 1);
      }, 140);
    };

    runStage(0);
  };

  return (
    <div className="rounded-xl border border-border/80 bg-[#090D13] p-4 md:p-6 shadow-2xl space-y-6 font-sans">
      {/* Top Header & Sensor Control */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Eye className="w-4 h-4" />
            </span>
            <h4 className="text-base font-semibold text-slate-100 font-mono">
              BLINK PAM Hardware & Sensor Pipeline Simulator
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Native C-PAM (<code className="text-blue-300">pam_blink.so</code>) • Ubuntu 26.04 LTS • GDM & sudo
          </p>
        </div>

        {/* Dynamic Sensor Status Badge */}
        <div className="flex items-center gap-3 bg-[#0D1117] p-2.5 rounded-lg border border-border/70 text-xs">
          <div className="flex items-center gap-2">
            <Camera className={`w-4 h-4 ${isIrActive ? "text-amber-400" : "text-emerald-400"}`} />
            <div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Active V4L2 Device</div>
              <div className={`font-mono font-medium ${isIrActive ? "text-amber-300" : "text-emerald-300"}`}>
                {activeDevice}
              </div>
            </div>
          </div>
          {isIrActive && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              Zero-Light IR Active
            </span>
          )}
        </div>
      </div>

      {/* Ambient Luminance Slider (Interactive Failover) */}
      <div className="bg-[#0D121B] p-4 rounded-xl border border-border/60 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 flex items-center gap-1.5 font-medium">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            Simulate Ambient Light (Luminance: <span className="font-mono text-cyan-300">{luminance} lux</span>)
          </span>
          <span className="text-slate-500 font-mono text-[11px]">
            Threshold: &lt;35 triggers instant IR camera failover
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Moon className="w-4 h-4 text-slate-500" />
          <input
            type="range"
            min="0"
            max="100"
            value={luminance}
            onChange={(e) => setLuminance(parseInt(e.target.value))}
            className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <Sun className="w-4 h-4 text-amber-400" />
        </div>
      </div>

      {/* Two Column Layout: Frameless HUD Eye Reticle & Stage Latency Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Visual Eye HUD */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-black/60 border border-border/70 relative overflow-hidden">
          {/* Circular Reticle */}
          <div className="relative w-44 h-44 rounded-full border-2 border-dashed border-blue-500/30 flex items-center justify-center">
            {/* Spinning radar arc */}
            {isAuthenticating && (
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
            )}
            {/* Inner Ring */}
            <div
              className={`w-32 h-32 rounded-full border ${
                authOutcome === "success"
                  ? "border-emerald-500/80 bg-emerald-950/20 shadow-glow-emerald"
                  : isIrActive
                  ? "border-amber-500/50 bg-amber-950/20"
                  : "border-blue-500/50 bg-blue-950/20"
              } flex flex-col items-center justify-center transition-all duration-300`}
            >
              <Eye
                className={`w-12 h-12 transition-all ${
                  authOutcome === "success"
                    ? "text-emerald-400 scale-110"
                    : isAuthenticating
                    ? "text-blue-400 scale-105 animate-pulse"
                    : isIrActive
                    ? "text-amber-400"
                    : "text-slate-400"
                }`}
              />
              <span className="text-[10px] font-mono text-slate-400 mt-1">
                {isAuthenticating ? "SCANNING" : authOutcome === "success" ? "MATCHED" : "READY"}
              </span>
            </div>
          </div>

          {/* Sudo Terminal Status */}
          <div className="mt-4 text-center font-mono text-xs">
            <div className="text-slate-400">$ sudo apt update</div>
            {isAuthenticating ? (
              <div className="text-cyan-400 mt-1 flex items-center justify-center gap-1.5 animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" />
                pam_authenticate: probing /run/blink.sock...
              </div>
            ) : authOutcome === "success" ? (
              <div className="text-emerald-400 mt-1 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                [PAM_SUCCESS] Sudo Granted in {totalTime}ms
              </div>
            ) : authOutcome === "fallback" ? (
              <div className="text-amber-400 mt-1 font-medium flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Daemon offline &rarr; Fallback to password prompt ({totalTime}ms)
              </div>
            ) : (
              <div className="text-slate-500 mt-1">Awaiting sudo authentication trigger</div>
            )}
          </div>
        </div>

        {/* Right Column: Stage Latency Breakdown */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Hardware Pipeline Stages</span>
            <span>Measured Latency</span>
          </div>

          <div className="space-y-2">
            {stages.map((stage, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border text-xs transition-all ${
                  stage.status === "running"
                    ? "bg-blue-950/30 border-blue-500/50 text-blue-200"
                    : stage.status === "passed"
                    ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
                    : "bg-[#0D1117] border-border/50 text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {stage.status === "passed" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : stage.status === "running" ? (
                      <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-600 shrink-0" />
                    )}
                    <span className="font-medium">{stage.name}</span>
                  </div>
                  <span className="font-mono font-semibold">
                    {stage.measuredMs ? `~${stage.measuredMs} ms` : `~${stage.expectedMs} ms`}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 ml-5 mt-0.5">{stage.details}</div>
              </div>
            ))}
          </div>

          {/* Quick Metrics Footer */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
            <div className="p-2 rounded bg-[#0D1117] border border-border/50 text-slate-400">
              <span className="text-slate-500">Anti-Spoofing:</span>{" "}
              <span className="text-emerald-400">3-Tier (MiniFASNet + 2D FFT)</span>
            </div>
            <div className="p-2 rounded bg-[#0D1117] border border-border/50 text-slate-400">
              <span className="text-slate-500">Vault Security:</span>{" "}
              <span className="text-cyan-400">AES-256-GCM (0 images saved)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
        <div className="text-xs text-slate-500">
          Click button to run live Linux PAM authentication or test daemon failure:
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => runAuthentication(true)}
            disabled={isAuthenticating}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-border/70 transition-all cursor-pointer disabled:opacity-50"
          >
            Simulate Daemon Offline (&lt;15ms fallback)
          </button>
          <button
            onClick={() => runAuthentication(false)}
            disabled={isAuthenticating}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-lg shadow-blue-950/50 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Shield className="w-3.5 h-3.5" />
            Trigger Sudo Biometric Auth (~800ms)
          </button>
        </div>
      </div>
    </div>
  );
}
