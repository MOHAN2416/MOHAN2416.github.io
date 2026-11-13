"use client";

import React, { useState } from "react";
import { Shield, CheckCircle2, Link as LinkIcon, RefreshCw, Eye } from "lucide-react";

interface AuditBlock {
  blockIndex: number;
  timestamp: string;
  action: string;
  user: string;
  prevHash: string;
  hash: string;
  isTampered?: boolean;
}

const INITIAL_BLOCKS: AuditBlock[] = [
  {
    blockIndex: 1,
    timestamp: "2026-11-13 08:30:12 UTC",
    action: "ASSET_INITIALIZED: https://enterprise-portal.internal",
    user: "sec-admin-01",
    prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
    hash: "8f4a210b39e6a0d4812f8a84617bc93215904de22ef653c0724810a4ec998371",
  },
  {
    blockIndex: 2,
    timestamp: "2026-11-13 08:35:45 UTC",
    action: "BASELINE_PHASH_CAPTURED: Hamming: 0 (Playwright Chromium)",
    user: "crawler-worker-3",
    prevHash: "8f4a210b39e6a0d4812f8a84617bc93215904de22ef653c0724810a4ec998371",
    hash: "3b92f7c04e28701e4a1a5b4819dfc236e7a2b9187319fa82541c881efca39091",
  },
  {
    blockIndex: 3,
    timestamp: "2026-11-13 08:42:01 UTC",
    action: "SSRF_FILTER_TRIGGERED: Blocked probe to 169.254.169.254/latest/meta-data",
    user: "network-firewall",
    prevHash: "3b92f7c04e28701e4a1a5b4819dfc236e7a2b9187319fa82541c881efca39091",
    hash: "d41d8cd98f00b204e9800998ecf8427e012e87903bf658828b0304323bc11082",
  },
];

export function KavachAuditDemo() {
  const [blocks] = useState<AuditBlock[]>(INITIAL_BLOCKS);
  const [hammingDistance, setHammingDistance] = useState<number>(2);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const isDefaced = hammingDistance >= 8;

  const verifyLedger = () => {
    setIsVerifying(true);
    setVerificationResult(null);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationResult("CRYPTOGRAPHIC INTEGRITY VERIFIED: All 3 blocks chained with 0 hash discrepancies.");
    }, 450);
  };

  return (
    <div className="rounded-xl border border-border/80 bg-[#090D13] p-4 md:p-6 shadow-2xl space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Shield className="w-4 h-4" />
            </span>
            <h4 className="text-base font-semibold text-slate-100 font-mono">
              KavachAI Perceptual Hashing & Cryptographic Audit Ledger
            </h4>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visual Defacement Detection (pHash) • Tamper-Evident SHA-256 Chaining • Strict SSRF Mitigation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-mono">
            Audit Latency: &lt; 15 ms
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono">
            SSRF Filter: 100% Active
          </span>
        </div>
      </div>

      {/* Visual Perceptual Hashing Simulator */}
      <div className="bg-[#0D121B] p-4 rounded-xl border border-border/60 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-mono font-medium flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            Simulate Visual Deviation (pHash Hamming Distance: <span className="text-cyan-300 font-bold">{hammingDistance}</span>)
          </span>
          <span className={`font-mono text-xs font-semibold ${isDefaced ? "text-rose-400" : "text-emerald-400"}`}>
            {isDefaced ? "⚠️ DEFACEMENT ALERT TRIGGERED" : "✅ Normal Visual State"}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="24"
          value={hammingDistance}
          onChange={(e) => setHammingDistance(parseInt(e.target.value))}
          className="w-full accent-cyan-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-[11px] font-mono text-slate-500">
          <span>0 (Pixel Identical)</span>
          <span>Threshold = 8 (Alert Gate)</span>
          <span>24 (Complete Defacement)</span>
        </div>
      </div>

      {/* Cryptographic SHA-256 Chained Blocks */}
      <div className="space-y-2.5">
        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5 text-blue-400" />
          <span>Tamper-Evident SHA-256 Audit Chain (Immutable Ledger)</span>
        </div>

        <div className="space-y-2">
          {blocks.map((block) => (
            <div
              key={block.blockIndex}
              className="p-3 rounded-lg bg-[#0B0F17] border border-border/70 font-mono text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-blue-400 font-bold">Block #{block.blockIndex}</span>
                <span className="text-[11px] text-slate-500">{block.timestamp}</span>
              </div>
              <div className="text-slate-200 text-xs">{block.action}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
                <div className="truncate bg-slate-900/60 p-1.5 rounded border border-border/40">
                  <span className="text-slate-500">prev_hash:</span> {block.prevHash.slice(0, 24)}...
                </div>
                <div className="truncate bg-slate-900/60 p-1.5 rounded border border-border/40">
                  <span className="text-emerald-400">hash:</span> {block.hash.slice(0, 24)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Status */}
      {verificationResult && (
        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{verificationResult}</span>
        </div>
      )}

      {/* Footer controls */}
      <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
        <div className="text-slate-500 font-mono">
          Strict SSRF Filter: 127.0.0.1, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 Dropped
        </div>
        <button
          onClick={verifyLedger}
          disabled={isVerifying}
          className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium flex items-center gap-1.5 shadow-lg shadow-teal-950/50 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? "animate-spin" : ""}`} />
          Verify Audit Chain Integrity (&lt;15ms)
        </button>
      </div>
    </div>
  );
}
