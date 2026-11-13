"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Terminal, Eye, Ship, Cpu, Shield, Database } from "lucide-react";
import { ViduraCliDemo } from "@/components/demos/ViduraCliDemo";
import { BlinkHudDemo } from "@/components/demos/BlinkHudDemo";
import { VarunaSimDemo } from "@/components/demos/VarunaSimDemo";
import { NanoCoderDemo } from "@/components/demos/NanoCoderDemo";
import { KavachAuditDemo } from "@/components/demos/KavachAuditDemo";
import { CloverStreamDemo } from "@/components/demos/CloverStreamDemo";

const LAB_TABS = [
  {
    id: "vidura-cli",
    title: "1. VIDURA CLI",
    subtitle: "Permission-Gated Agent",
    icon: Terminal,
    color: "text-cobalt-600",
  },
  {
    id: "blink-hud",
    title: "2. BLINK Biometrics",
    subtitle: "Dual RGB/IR Failover",
    icon: Eye,
    color: "text-emerald-600",
  },
  {
    id: "varuna-sim",
    title: "3. VARUNA Voyage & Risk",
    subtitle: "MILP & 10k Monte Carlo",
    icon: Ship,
    color: "text-amber-600",
  },
  {
    id: "nanocoder-lab",
    title: "4. NanoCoder Lab",
    subtitle: "12.29M Transformer",
    icon: Cpu,
    color: "text-purple-600",
  },
  {
    id: "kavach-audit",
    title: "5. KavachAI Integrity",
    subtitle: "Perceptual Hash Audit",
    icon: Shield,
    color: "text-teal-600",
  },
  {
    id: "clover-stream",
    title: "6. Clover CRM",
    subtitle: "SSE Token Streamer",
    icon: Database,
    color: "text-emerald-600",
  },
];

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "vidura-cli";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && LAB_TABS.some((t) => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const renderActiveSimulator = () => {
    switch (activeTab) {
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
    <div className="w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-16 space-y-8 font-sans">
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-200/60 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-cobalt-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Interactive Labs</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-zinc-900 tracking-tight">
            Interactive Architecture Labs
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-4xl font-sans">
            Test-drive live browser simulations of Mohan&apos;s systems without installing runtime dependencies: permission-gated code generation, dual-sensor biometric failover, and maritime voyage optimization.
          </p>
        </div>

        {/* Tab Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {LAB_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? "bg-white/90 backdrop-blur-xl border-cobalt-600 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_4px_16px_-2px_rgba(37,99,235,0.18)]"
                    : "bg-white/55 hover:bg-white/80 backdrop-blur-md border-white/85 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${tab.color}`} />
                  {isActive && <span className="w-2 h-2 rounded-full bg-cobalt-600" />}
                </div>
                <div>
                  <div className={`text-xs font-bold font-heading ${isActive ? "text-zinc-900" : "text-zinc-700"}`}>
                    {tab.title}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 truncate mt-0.5">
                    {tab.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Frame */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
          <span>Active Sandbox Environment &middot; Browser Execution</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 pulse-emerald" />
            Deterministic Mode
          </span>
        </div>

        {renderActiveSimulator()}
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12 py-16 text-xs font-mono text-zinc-500">Loading interactive sandbox...</div>}>
      <PlaygroundContent />
    </Suspense>
  );
}
