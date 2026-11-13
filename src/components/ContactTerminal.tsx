"use client";

import React, { useState } from "react";
import { CANDIDATE_PROFILE } from "@/lib/data";
import { Terminal, Send, CheckCircle2, AlertCircle, Copy, Check, Mail, Phone, MapPin, GitBranch, RefreshCw } from "lucide-react";

export function ContactTerminal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    receiptId: string;
    timestamp: string;
    message: string;
  } | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to submit message.");
        setIsSubmitting(false);
        return;
      }

      setReceipt({
        receiptId: data.receiptId,
        timestamp: data.timestamp,
        message: data.message,
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error occurred. Please verify connectivity or use direct email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 pb-2 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Direct Recruiter Channel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Initiate Contact & Interview Scheduling
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans">
            Ready to contribute to mission-critical AI systems, high-concurrency backends, and low-latency systems engineering. Messages are verified and persisted into a local SQLite ledger.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact & Recruiter Availability */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#0B0F17]/90 border border-border/80 shadow-glass space-y-4">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Candidate Channel Metadata</span>
              </h3>

              <div className="space-y-3 text-xs font-mono text-slate-300">
                <div className="p-3 rounded-xl bg-[#0D121B] border border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Direct Email</div>
                      <div className="text-slate-200">{CANDIDATE_PROFILE.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(CANDIDATE_PROFILE.email, "email")}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#0D121B] border border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">Phone & WhatsApp</div>
                      <div className="text-slate-200">{CANDIDATE_PROFILE.phone}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(CANDIDATE_PROFILE.phone, "phone")}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#0D121B] border border-border/60 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">Location</div>
                    <div className="text-slate-200">{CANDIDATE_PROFILE.location} (Open to Relocation)</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0D121B] border border-border/60 flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-purple-400 shrink-0" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase">GitHub Profile</div>
                    <a
                      href={CANDIDATE_PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      github.com/MOHAN2416
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/25 text-xs text-emerald-300 font-sans space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Immediate Availability</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Available for Summer / Fall 2025 AI Systems, Deep Learning, and Full-Stack Engineering internships, as well as full-time discussions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive SQLite Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#090D14] border border-border/80 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>POST /api/contact &rarr; portfolio.db</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Rate Limited & Encrypted</span>
              </div>

              {receipt ? (
                <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs font-mono space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message Recorded in SQLite Ledger</span>
                  </div>
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">{receipt.message}</p>
                  <div className="p-3 rounded-lg bg-black/60 border border-emerald-500/30 text-[11px] space-y-1">
                    <div>
                      <span className="text-slate-500">Verification Receipt ID:</span>{" "}
                      <span className="text-emerald-300 font-bold">{receipt.receiptId}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Timestamp:</span>{" "}
                      <span className="text-slate-300">{receipt.timestamp}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setReceipt(null)}
                    className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-slate-300 font-medium">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-border/80 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-slate-300 font-medium">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. elena@deepmind.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-border/80 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-slate-300 font-medium">Organization / Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Anthropic / Vercel"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-border/80 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-slate-300 font-medium">Target Role / Opportunity</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. AI Systems Engineer"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-border/80 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-slate-300 font-medium">Message & Opportunity Scope *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Mohan, we reviewed your work on VIDURA and BLINK and would love to schedule a technical screen..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1117] border border-border/80 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 font-mono text-xs leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      Dispatched with SHA-256 IP client validation
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs font-mono flex items-center gap-2 shadow-lg shadow-blue-950/50 transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Committing to SQLite...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
