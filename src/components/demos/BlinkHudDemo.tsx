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
  { name: "Camera Acquisition (V4L2)", expectedMs: 110, status: "idle", details: "Frame capture from sensor stream" },
  { name: "Face Detection (YuNet ONNX)", expectedMs: 32, status: "idle", details: "AVX2 SIMD bounding box extraction" },
  { name: "Presentation Attack Detection", expectedMs: 48, status: "idle", details: "MiniFASNetV2 + 2D FFT Moiré spectrum" },
  { name: "Feature Extraction (ArcFace)", expectedMs: 65, status: "idle", details: "512-d float32 normalized embedding" },
  { name: "Vault Cosine Matching", expectedMs: 2, status: "idle", details: "AES-256-GCM encrypted database match" },
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
      }, 130);
    };

    runStage(0);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-xs space-y-6 font-sans">
      {/* Sensor Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Eye className="w-4 h-4" />
            </span>
            <h4 className="text-base font-bold font-heading text-zinc-900">
              BLINK Linux PAM Sensor &amp; Anti-Spoofing Pipeline
            </h4>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5 font-mono">
            Native C-PAM (<code>pam_blink.so</code>) &middot; Ubuntu 26.04 LTS &middot; GDM &amp; sudo
          </p>
        </div>

        <div className="flex items-center gap-3 bg-zinc-50 p-2.5 rounded-lg border border-zinc-200 text-xs">
          <Camera className={`w-4 h-4 ${isIrActive ? "text-amber-600" : "text-emerald-600"}`} />
          <div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Active Device</div>
            <div className={`font-mono font-bold ${isIrActive ? "text-amber-700" : "text-emerald-700"}`}>
              {activeDevice}
            </div>
          </div>
          {isIrActive && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-medium animate-pulse">
              IR Active
            </span>
          )}
        </div>
      </div>

      {/* Ambient Luminance Slider */}
      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-700 font-semibold flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            Ambient Luminance: <strong className="text-cobalt-600">{luminance} lux</strong>
          </span>
          <span className="text-zinc-500 text-[11px]">
            Threshold: &lt;35 lux triggers automatic IR camera failover
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Moon className="w-4 h-4 text-zinc-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={luminance}
            onChange={(e) => setLuminance(parseInt(e.target.value))}
            className="w-full accent-cobalt-600 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
          />
          <Sun className="w-4 h-4 text-amber-500" />
        </div>
      </div>

      {/* Visual Reticle & Latency Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Reticle */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-xl bg-zinc-50 border border-zinc-200 relative overflow-hidden">
          <div className="relative w-40 h-40 rounded-full border-2 border-dashed border-zinc-300 flex items-center justify-center">
            {isAuthenticating && (
              <div className="absolute inset-0 rounded-full border-2 border-cobalt-600 border-t-transparent animate-spin" />
            )}
            <div
              className={`w-28 h-28 rounded-full border ${
                authOutcome === "success"
                  ? "border-emerald-500 bg-emerald-50"
                  : isIrActive
                  ? "border-amber-400 bg-amber-50"
                  : "border-zinc-300 bg-white"
              } flex flex-col items-center justify-center transition-all duration-200 shadow-xs`}
            >
              <Eye
                className={`w-10 h-10 transition-all ${
                  authOutcome === "success"
                    ? "text-emerald-600 scale-110"
                    : isAuthenticating
                    ? "text-cobalt-600 scale-105 animate-pulse"
                    : isIrActive
                    ? "text-amber-600"
                    : "text-zinc-400"
                }`}
              />
              <span className="text-[10px] font-mono text-zinc-500 mt-1 font-semibold">
                {isAuthenticating ? "SCANNING" : authOutcome === "success" ? "MATCHED" : "READY"}
              </span>
            </div>
          </div>

          <div className="mt-4 text-center font-mono text-xs">
            <div className="text-zinc-600 font-semibold">$ sudo apt update</div>
            {isAuthenticating ? (
              <div className="text-cobalt-600 mt-1 flex items-center justify-center gap-1.5 animate-pulse font-medium">
                <RefreshCw className="w-3 h-3 animate-spin" />
                pam_authenticate: probing /run/blink.sock...
              </div>
            ) : authOutcome === "success" ? (
              <div className="text-emerald-700 mt-1 font-bold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                [PAM_SUCCESS] Sudo Authorized in {totalTime}ms
              </div>
            ) : authOutcome === "fallback" ? (
              <div className="text-amber-800 mt-1 font-semibold flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Daemon offline &rarr; Password fallback ({totalTime}ms)
              </div>
            ) : (
              <div className="text-zinc-400 mt-1">Awaiting sudo prompt trigger</div>
            )}
          </div>
        </div>

        {/* Stage Latency Breakdown */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 font-semibold uppercase">
            <span>Hardware Pipeline Stages</span>
            <span>Latency</span>
          </div>

          <div className="space-y-2">
            {stages.map((stage, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg border text-xs transition-all ${
                  stage.status === "running"
                    ? "bg-cobalt-50 border-cobalt-300 text-cobalt-900"
                    : stage.status === "passed"
                    ? "bg-emerald-50/70 border-emerald-300 text-emerald-900"
                    : "bg-white border-zinc-200 text-zinc-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {stage.status === "passed" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : stage.status === "running" ? (
                      <RefreshCw className="w-3.5 h-3.5 text-cobalt-600 animate-spin shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 shrink-0" />
                    )}
                    <span className="font-semibold text-zinc-800">{stage.name}</span>
                  </div>
                  <span className="font-mono font-bold">
                    {stage.measuredMs ? `~${stage.measuredMs} ms` : `~${stage.expectedMs} ms`}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500 ml-5 mt-0.5">{stage.details}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-200">
        <span className="text-xs text-zinc-500">
          Click button to run live Linux PAM authentication or simulate offline daemon:
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => runAuthentication(true)}
            disabled={isAuthenticating}
            className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-mono border border-zinc-300 transition-all cursor-pointer disabled:opacity-50"
          >
            Simulate Daemon Offline (&lt;15ms fallback)
          </button>
          <button
            onClick={() => runAuthentication(false)}
            disabled={isAuthenticating}
            className="px-4 py-1.5 rounded-lg bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Trigger Sudo Biometric Auth (~800ms)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
