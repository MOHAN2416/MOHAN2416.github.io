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
    }, 60);
  };

  return (
    <div className="rounded-2xl border border-white/85 bg-white/60 backdrop-blur-2xl p-6 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_10px_30px_-10px_rgba(15,23,42,0.08)] space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Database className="w-4 h-4" />
            </span>
            <h4 className="text-base font-bold font-heading text-zinc-900">
              Clover CRM Multi-Tenant AI Engine &amp; SSE Streamer
            </h4>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5 font-mono">
            Row-Level RBAC &middot; Native MySQL Compliance Triggers &middot; Local Qwen 2.5 3B SSE Token Streaming
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-medium">
            Chunk Latency: &lt; 25 ms
          </span>
          <span className="px-2.5 py-1 rounded bg-cobalt-50 text-cobalt-700 border border-cobalt-200 text-xs font-mono font-medium">
            Triggers: Native Engine
          </span>
        </div>
      </div>

      {/* Tenancy & Pool Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
          <span className="text-zinc-600 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-cobalt-600" />
            Multi-Tenant Isolation:
          </span>
          <span className="text-zinc-900 font-bold">{activeOrg}</span>
        </div>
        <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
          <span className="text-zinc-600 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
            MySQL Connection Pool:
          </span>
          <span className="text-emerald-700 font-bold">Healthy (18/20 idle)</span>
        </div>
      </div>

      {/* SSE Output Console */}
      <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 font-mono text-xs leading-relaxed space-y-2">
        <div className="flex items-center justify-between text-zinc-400 text-[11px] pb-1 border-b border-zinc-200">
          <span>Server-Sent Events (SSE) Stream: /api/v1/leads/synthesize</span>
          <span>Model: Qwen 2.5 3B Instruct</span>
        </div>

        <pre className="text-zinc-800 whitespace-pre-wrap font-mono min-h-[140px] overflow-x-auto">
          {streamText || (
            <span className="text-zinc-400">
              [IDLE] Click &apos;Stream Lead Synthesis&apos; to initiate local token streaming...
            </span>
          )}
          {isStreaming && <span className="inline-block w-2 h-4 bg-emerald-600 animate-pulse ml-0.5" />}
        </pre>
      </div>

      {/* Trigger & Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-xs font-mono">
        <span className="text-zinc-500">
          Immutable audit triggers fire on every SQL modification
        </span>
        <button
          onClick={startStreaming}
          disabled={isStreaming}
          className="px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{isStreaming ? "Streaming Tokens..." : "Stream Lead Synthesis (SSE)"}</span>
        </button>
      </div>
    </div>
  );
}
