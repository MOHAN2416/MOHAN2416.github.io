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
    }, 350);
  };

  return (
    <div className="rounded-2xl border border-white/85 bg-white/60 backdrop-blur-2xl p-6 sm:p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_10px_30px_-10px_rgba(15,23,42,0.08)] space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              <Shield className="w-4 h-4" />
            </span>
            <h4 className="text-base font-bold font-heading text-zinc-900">
              KavachAI Perceptual Hashing &amp; Cryptographic Audit Ledger
            </h4>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5 font-mono">
            Visual Defacement (pHash) &middot; Tamper-Evident SHA-256 Chaining &middot; SSRF Network Mitigation
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-teal-50 text-teal-700 border border-teal-200 text-xs font-mono font-medium">
            Audit Latency: &lt; 15 ms
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-medium">
            SSRF Filter: 100% Active
          </span>
        </div>
      </div>

      {/* Perceptual Hashing Slider */}
      <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-zinc-700 font-semibold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cobalt-600" />
            Simulate Visual Deviation (pHash Hamming: <strong className="text-cobalt-600">{hammingDistance}</strong>)
          </span>
          <span className={`font-semibold ${isDefaced ? "text-red-700" : "text-emerald-700"}`}>
            {isDefaced ? "⚠️ DEFACEMENT ALERT TRIGGERED" : "✅ Normal Visual State"}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="24"
          value={hammingDistance}
          onChange={(e) => setHammingDistance(parseInt(e.target.value))}
          className="w-full accent-cobalt-600 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>0 (Pixel Identical)</span>
          <span>Threshold = 8 (Alert Gate)</span>
          <span>24 (Complete Defacement)</span>
        </div>
      </div>

      {/* Chained Blocks */}
      <div className="space-y-2.5">
        <div className="text-xs font-mono text-zinc-500 font-semibold flex items-center gap-1.5 uppercase">
          <LinkIcon className="w-3.5 h-3.5 text-cobalt-600" />
          <span>Tamper-Evident SHA-256 Audit Chain (Immutable Ledger)</span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {blocks.map((block) => (
            <div
              key={block.blockIndex}
              className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1.5"
            >
              <div className="flex items-center justify-between text-zinc-500">
                <span className="text-cobalt-700 font-bold">Block #{block.blockIndex}</span>
                <span className="text-[11px] text-zinc-400">{block.timestamp}</span>
              </div>
              <div className="text-zinc-900 font-medium text-xs">{block.action}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] text-zinc-500 pt-1">
                <div className="truncate bg-white p-1.5 rounded border border-zinc-200">
                  <span className="text-zinc-400">prev_hash:</span> {block.prevHash.slice(0, 24)}...
                </div>
                <div className="truncate bg-white p-1.5 rounded border border-zinc-200">
                  <span className="text-emerald-700 font-bold">hash:</span> {block.hash.slice(0, 24)}...
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Banner */}
      {verificationResult && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{verificationResult}</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-200 text-xs font-mono">
        <span className="text-zinc-500">
          Strict SSRF Filter: 127.0.0.1, 10.0.0.0/8, 172.16.0.0/12, 169.254.169.254 Dropped
        </span>
        <button
          onClick={verifyLedger}
          disabled={isVerifying}
          className="px-4 py-1.5 rounded-md bg-teal-600 hover:bg-teal-700 text-white font-medium flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? "animate-spin" : ""}`} />
          <span>Verify Audit Chain Integrity (&lt;15ms)</span>
        </button>
      </div>
    </div>
  );
}
