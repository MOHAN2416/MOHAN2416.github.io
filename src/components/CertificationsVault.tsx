"use client";

import React, { useState } from "react";
import { CERTIFICATIONS, Certification } from "@/lib/data";
import { Award, ShieldCheck, X } from "lucide-react";

export function CertificationsVault() {
  const [activeCategory, setActiveCategory] = useState<string>("All (7)");
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const CATEGORIES = ["All (7)", "AI & ML", "Systems & C/C++", "Hackathon & Honors", "Software Engineering"];

  const filteredCerts = CERTIFICATIONS.filter((cert) => {
    if (activeCategory === "All (7)") return true;
    return cert.category === activeCategory;
  });

  return (
    <section id="credentials" className="py-16 md:py-24 relative bg-[#07090E]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border/60">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Verified Credentials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
              Verified Credentials & Honors Vault
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans">
              Rigorous credentials spanning C/C++ systems programming, GPU LLM fine-tuning, competitive hackathons, and software engineering.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#0D1117] border border-border/70 overflow-x-auto text-xs font-mono">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="p-6 rounded-2xl bg-[#0B0F17]/90 border border-border/80 shadow-glass flex flex-col justify-between space-y-4 hover:border-emerald-500/40 hover:scale-[1.01] transition-all cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Verified</span>
                  </span>
                  <span className="text-xs font-mono text-slate-500">{cert.date}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white font-sans group-hover:text-emerald-300 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-xs text-blue-400 font-mono mt-0.5">{cert.issuer}</div>
                  <p className="text-xs text-slate-400 font-sans mt-2 line-clamp-2">
                    {cert.highlight}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/50 space-y-2">
                {cert.credentialId && (
                  <div className="text-[11px] font-mono text-slate-500 truncate">
                    ID: <span className="text-slate-300">{cert.credentialId}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-border/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credential Inspection Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-lg rounded-2xl border border-border/80 bg-[#0D1117] p-6 shadow-2xl space-y-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-mono">{selectedCert.title}</h3>
                    <div className="text-xs text-blue-400 font-mono">{selectedCert.issuer} • {selectedCert.date}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300 font-sans">
                <div className="p-3 rounded-xl bg-[#090D14] border border-border/70 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Official Verification ID</div>
                  <div className="font-mono text-emerald-400 font-bold">{selectedCert.credentialId || "VERIFIED-DIRECT"}</div>
                </div>

                <p className="leading-relaxed">{selectedCert.highlight}</p>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Core Competencies Validated:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-200 text-xs font-mono border border-border/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-border/60">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
