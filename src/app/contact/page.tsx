"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CANDIDATE_PROFILE } from "@/lib/data";
import { Mail, Phone, MapPin, GitBranch, Copy, Check, Send, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });

  const [lastSubmission, setLastSubmission] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    receiptId: string;
    timestamp: string;
    message: string;
  } | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedLinkedin, setCopiedLinkedin] = useState(false);

  const handleCopy = (text: string, type: "email" | "phone" | "linkedin") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === "phone") {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedLinkedin(true);
      setTimeout(() => setCopiedLinkedin(false), 2000);
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
        setErrorMessage(data.error || "Failed to submit inquiry.");
        setIsSubmitting(false);
        return;
      }

      setLastSubmission({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

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
      setErrorMessage("Network error occurred. Please verify your connection or email directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 font-sans">
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-200/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-cobalt-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Contact</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-zinc-900 tracking-tight">
            Recruiter Inquiry &amp; Technical Interview Scheduling
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl font-sans">
            Available for 2026 / 2027 AI Systems, Deep Learning, and Full-Stack Engineering Internships &amp; Roles. Transmissions are validated, acknowledged with receipt codes, and stored securely.
          </p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Channels */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 sm:p-7 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-5">
            <div>
              <h2 className="text-base font-bold font-heading text-zinc-900">
                Direct Channels
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Reach out directly via email, LinkedIn, phone, or schedule a technical discussion.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Email */}
              <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-white border border-zinc-200 text-cobalt-600">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">Candidate Email</div>
                    <div className="text-zinc-900 font-bold">{CANDIDATE_PROFILE.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(CANDIDATE_PROFILE.email, "email")}
                  className="p-1.5 rounded-md hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn */}
              <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-white border border-zinc-200 text-cobalt-600">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">LinkedIn Profile</div>
                    <a
                      href={CANDIDATE_PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cobalt-600 font-bold hover:underline"
                    >
                      linkedin.com/in/mohan-surendra
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(CANDIDATE_PROFILE.linkedin, "linkedin")}
                  className="p-1.5 rounded-md hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                  title="Copy LinkedIn URL"
                >
                  {copiedLinkedin ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-white border border-zinc-200 text-emerald-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase">Phone &amp; WhatsApp</div>
                    <div className="text-zinc-900 font-bold">{CANDIDATE_PROFILE.phone}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(CANDIDATE_PROFILE.phone, "phone")}
                  className="p-1.5 rounded-md hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center gap-3">
                <div className="p-2 rounded-md bg-white border border-zinc-200 text-zinc-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase">Primary Location</div>
                  <div className="text-zinc-900 font-bold">{CANDIDATE_PROFILE.location}</div>
                  <div className="text-[11px] text-zinc-500 font-sans mt-0.5">Open to on-site, hybrid, or remote relocation.</div>
                </div>
              </div>

              {/* GitHub */}
              <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center gap-3">
                <div className="p-2 rounded-md bg-white border border-zinc-200 text-zinc-700">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase">GitHub Profile</div>
                  <a
                    href={CANDIDATE_PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cobalt-600 font-bold hover:underline"
                  >
                    github.com/MOHAN2416
                  </a>
                </div>
              </div>
            </div>

            {/* Availability Box */}
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-sans text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>2026 / 2027 Engagement Scope</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Available for 2026 / 2027 AI Systems, Deep Learning, and Full-Stack Engineering Internships &amp; Roles.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Functional Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="text-xs font-mono font-semibold text-zinc-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 pulse-emerald" />
                <span>Recruiter Transmission Terminal</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">POST /api/contact</span>
            </div>

            {receipt ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-mono space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Message Recorded in System</span>
                </div>
                <p className="text-zinc-700 font-sans text-xs leading-relaxed">{receipt.message}</p>
                
                <div className="p-3.5 rounded-lg bg-white border border-emerald-200 text-[11px] space-y-1.5 font-mono">
                  <div>
                    <span className="text-zinc-500">Receipt Code:</span>{" "}
                    <strong className="text-emerald-700">{receipt.receiptId}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500">Timestamp:</span>{" "}
                    <span className="text-zinc-700">{receipt.timestamp}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Status:</span>{" "}
                    <span className="text-emerald-600 font-medium">Delivered to Mohan&apos;s Review Queue</span>
                  </div>
                </div>

                {/* 1-Click Mailto Fallback Action Button */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`mailto:${CANDIDATE_PROFILE.email}?subject=Recruiter Inquiry from ${encodeURIComponent(lastSubmission?.name || "Recruiter")}&body=Receipt ID: ${receipt.receiptId}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(lastSubmission?.message || "")}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cobalt-600 hover:bg-cobalt-700 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Email Client (1-Click Fallback)</span>
                  </a>

                  <button
                    onClick={() => setReceipt(null)}
                    className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-semibold border border-zinc-200 transition-all cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-zinc-700">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Sarah Chen"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-cobalt-500 focus:bg-white text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-zinc-700">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. schen@deepmind.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-cobalt-500 focus:bg-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-zinc-700">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Anthropic / Vercel"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-cobalt-500 focus:bg-white text-xs transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-zinc-700">Role / Opportunity Type</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. AI Systems Engineer"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-cobalt-500 focus:bg-white text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-zinc-700">Message &amp; Project Inquiries *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hi Mohan, we reviewed VIDURA and BLINK and would like to schedule a technical architecture interview..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-cobalt-500 focus:bg-white text-xs leading-relaxed transition-colors"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-400">
                    Direct SQLite &amp; Memory Logging
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-lg bg-cobalt-600 hover:bg-cobalt-700 text-white font-semibold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
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
  );
}
