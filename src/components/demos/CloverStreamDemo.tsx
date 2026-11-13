"use client";

import React, { useState } from "react";
import { Database, Zap, Users, ShieldAlert } from "lucide-react";

const SIMULATED_STREAM_CHUNKS = [
  "data: [ORGANIZATION_TENANT: org_9281_finance]\n",
  "data: [LEAD_SCORING] Analyzing enterprise opportunity for 'Apex Logistics Corp'...\n",
  "data: - Fleet Size: 450 Heavy Vehicles (Tier-1 Match)\n",
  "data: - Past Contract Run-rate: $1.42M ARR\n",
  "data: - Recent Activity: 14 API doc visits in past 72h\n",
  "data: [PROPENSITY_SCORE] 94.6% (High Confidence)\n",
  "data: [ACTION_PROPOSAL] Dispatch automated tailored pilot proposal with Capesize SLA terms.\n",
  "data: [AUDIT_TRIGGER] mysql.after_lead_update executed in 0.8ms (immutable ledger committed)\n",
  "data: [DONE]\n",
];

export function CloverStreamDemo() {
  const [streamText, setStreamText] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  const activeOrg = "org_9281_finance";

  const startStreaming = () => {
    setIsStreaming(true);
    setStreamText("");

    let index = 0;
    const interval = setInterval(() => {
      if (index < SIMULATED_STREAM_CHUNKS.length) {
        setStreamText((prev) => prev + SIMULATED_STREAM_CHUNKS[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 70);
  };

  return (
    <div className="rounded-xl border border-border/80 bg-[#090D13] p-4 md:p-6 shadow-2xl space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Database className="w-4 h-4" />
            </span>
            <h4 className="text-base font-semibold text-slate-100 font-mono">
              Clover CRM Multi-Tenant AI Engine & SSE Streamer
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Row-Level RBAC • Native MySQL Compliance Triggers • Local Qwen 2.5 3B SSE Token Streaming
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono">
            Chunk Latency: &lt; 25 ms
          </span>
          <span className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-mono">
            Triggers: Native Engine
          </span>
        </div>
      </div>

      {/* Tenant Selector & Connection Pool Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-lg bg-[#0D121B] border border-border/60 flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            Multi-Tenant Isolation:
          </span>
          <span className="text-cyan-300 font-semibold">{activeOrg}</span>
        </div>
        <div className="p-3 rounded-lg bg-[#0D121B] border border-border/60 flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            MySQL Connection Pool:
          </span>
          <span className="text-emerald-400 font-semibold">Healthy (18/20 idle)</span>
        </div>
      </div>

      {/* Simulated SSE Streaming Terminal Output */}
      <div className="p-4 rounded-xl bg-black/70 border border-border/80 font-mono text-xs leading-relaxed space-y-2">
        <div className="flex items-center justify-between text-slate-500 text-[11px] pb-1 border-b border-slate-800">
          <span>Server-Sent Events (SSE) Stream: /api/v1/leads/synthesize</span>
          <span>Model: Qwen 2.5 3B Instruct</span>
        </div>

        <pre className="text-emerald-300 whitespace-pre-wrap font-mono min-h-[140px] overflow-x-auto">
          {streamText || (
            <span className="text-slate-600">
              [IDLE] Click &apos;Stream Lead Synthesis&apos; to initiate local token streaming...
            </span>
          )}
          {isStreaming && <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-0.5" />}
        </pre>
      </div>

      {/* Trigger & Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
        <div className="text-slate-500 font-mono">
          Immutable audit triggers fire on every SQL modification
        </div>
        <button
          onClick={startStreaming}
          disabled={isStreaming}
          className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5" />
          {isStreaming ? "Streaming Tokens..." : "Stream Lead Synthesis (SSE)"}
        </button>
      </div>
    </div>
  );
}
