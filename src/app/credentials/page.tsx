"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CERTIFICATIONS, SKILL_CATEGORIES, Certification } from "@/lib/data";
import { Award, ShieldCheck, X, CheckCircle2, ArrowRight, ExternalLink, Download, Copy, Check, Eye } from "lucide-react";

const CATEGORIES = ["All (8)", "Systems & C/C++", "AI & ML", "Hackathon & Honors", "Software Engineering"];

export default function CredentialsPage() {
  const [activeCategory, setActiveCategory] = useState("All (8)");
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const filteredCerts = CERTIFICATIONS.filter((cert) => {
    if (activeCategory === "All (8)") return true;
    return cert.category === activeCategory;
  });

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const isPdf = (path?: string) => path?.toLowerCase().endsWith(".pdf");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 font-sans">
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-200/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-cobalt-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Credentials &amp; Skills</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-zinc-900 tracking-tight">
            Verified Credentials &amp; Technical Skills Matrix
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-3xl font-sans">
            Formal certifications and competency verifications covering C/C++ systems engineering, GPU language model fine-tuning, competitive algorithms, and full-stack software architecture.
          </p>
        </div>
      </div>

      {/* 1. Technical Skills Matrix */}
      <section className="space-y-6">
        <div className="space-y-1 border-b border-zinc-200/80 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900">
            Categorized Technical Skills Matrix
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-sans">
            Core toolsets, frameworks, compilers, and hardware targets utilized across production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-3 hover:border-zinc-300 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-cobalt-600" />
                <span>{cat.category}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-50 text-zinc-700 border border-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Verified Certifications Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200/80 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900">
              Verified Certifications Vault
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-sans">
              Click any certificate card or &quot;Preview Document&quot; to inspect authentic issuance documents and validated credentials.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-sans">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-zinc-900 text-white font-semibold shadow-xs"
                    : "bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="p-6 rounded-xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-zinc-300 hover:shadow-card transition-all cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified Credential</span>
                  </span>
                  <span className="font-mono text-zinc-400">{cert.date}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold font-heading text-zinc-900 group-hover:text-cobalt-600 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-500 mt-0.5">{cert.issuer}</div>
                  <p className="text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed font-sans">
                    {cert.highlight}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 space-y-3">
                {cert.credentialId && (
                  <div className="text-[11px] font-mono text-zinc-400 truncate flex items-center justify-between">
                    <span>ID: <strong className="text-zinc-800 font-semibold">{cert.credentialId}</strong></span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 text-zinc-600 border border-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-zinc-100 text-xs font-medium text-cobalt-600">
                  <span className="inline-flex items-center gap-1.5 font-semibold group-hover:underline">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Certificate</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-cobalt-600 transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Credential Inspection & Interactive Preview Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-zinc-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 shadow-2xl space-y-5 font-sans max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cobalt-50 border border-cobalt-200 text-cobalt-600">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-zinc-900 leading-snug">
                    {selectedCert.title}
                  </h3>
                  <div className="text-xs text-zinc-500 font-mono mt-0.5">
                    {selectedCert.issuer} &bull; Issued {selectedCert.date}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 cursor-pointer transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Viewer Frame with Fallback Card */}
            {selectedCert.filePath ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Certificate Preview:</span>
                  <a
                    href={selectedCert.filePath}
                    download
                    className="text-cobalt-600 hover:underline inline-flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Raw File</span>
                  </a>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 overflow-hidden flex items-center justify-center min-h-[380px] max-h-[520px]">
                  {isPdf(selectedCert.filePath) ? (
                    <iframe
                      src={selectedCert.filePath}
                      className="w-full h-[460px] rounded-lg border border-zinc-200 bg-white"
                      title={selectedCert.title}
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={selectedCert.filePath}
                      alt={selectedCert.title}
                      className="max-h-[460px] w-auto mx-auto object-contain rounded-lg border border-zinc-200 bg-white shadow-xs"
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 text-center space-y-3 font-sans">
                <div className="w-12 h-12 rounded-full bg-cobalt-50 text-cobalt-600 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-zinc-900">{selectedCert.title}</h4>
                  <p className="text-xs text-zinc-500 max-w-md mx-auto">
                    Verified electronic credential issued by {selectedCert.issuer}. Official authenticated record is verifiable on the portal below.
                  </p>
                </div>
              </div>
            )}

            {/* Details & Verification Actions */}
            <div className="space-y-3.5 text-xs text-zinc-700 pt-1">
              {/* Credential ID Card */}
              {selectedCert.credentialId && (
                <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between font-mono">
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-wider">
                      Verification Credential ID
                    </div>
                    <div className="font-bold text-zinc-900 text-sm">
                      {selectedCert.credentialId}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyId(selectedCert.credentialId || "")}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-mono border border-zinc-200 shadow-xs transition-colors cursor-pointer"
                  >
                    {copiedId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy ID</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <p className="leading-relaxed font-sans text-xs sm:text-sm text-zinc-600">
                {selectedCert.highlight}
              </p>

              {/* Competencies */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-mono font-bold text-zinc-900 uppercase">
                  Validated Competencies:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 text-xs font-mono border border-zinc-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100">
              <div>
                {selectedCert.verificationUrl && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>Verify on Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                {selectedCert.filePath && (
                  <a
                    href={selectedCert.filePath}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                )}

                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-mono font-semibold cursor-pointer transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Contact CTA */}
      <div className="p-6 rounded-xl bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
        <div>
          <div className="font-bold text-zinc-900 text-sm">Need authenticated copies or academic transcripts?</div>
          <p className="text-xs text-zinc-600 mt-0.5">Reach out via the contact form to request official credentials and letters of recommendation.</p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-semibold shadow-xs shrink-0"
        >
          <span>Contact Mohan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
