"use client";

import React from "react";
import Link from "next/link";
import { CANDIDATE_PROFILE } from "@/lib/data";
import { GitBranch, Mail, Phone, MapPin, CheckCircle2, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/80 bg-white pt-12 pb-8 text-xs font-sans text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Multi-Column Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Identity & Bio */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-zinc-900 font-bold font-heading text-sm">
              <div className="w-5 h-5 rounded bg-zinc-900 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                MS
              </div>
              <span>{CANDIDATE_PROFILE.name}</span>
            </div>
            <p className="text-zinc-600 text-xs leading-relaxed max-w-md font-sans">
              {CANDIDATE_PROFILE.headline}. Building deterministic local-first LLM agents, Linux C-PAM biometric security suites, from-scratch PyTorch Transformers, and MILP operations research.
            </p>
            <div className="flex items-center gap-3 pt-1 text-zinc-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{CANDIDATE_PROFILE.location}</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2.5">
            <div className="text-zinc-900 font-semibold font-mono uppercase text-[11px] tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-zinc-600">
              <li>
                <Link href="/" className="hover:text-cobalt-600 transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cobalt-600 transition-colors">
                  Projects (6 Systems)
                </Link>
              </li>
              <li>
                <Link href="/playground" className="hover:text-cobalt-600 transition-colors">
                  Interactive Labs
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-cobalt-600 transition-colors">
                  Experience & Education
                </Link>
              </li>
              <li>
                <Link href="/credentials" className="hover:text-cobalt-600 transition-colors">
                  Credentials & Skills
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cobalt-600 transition-colors">
                  Recruiter Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & GitHub */}
          <div className="space-y-2.5">
            <div className="text-zinc-900 font-semibold font-mono uppercase text-[11px] tracking-wider">
              Direct Connect
            </div>
            <ul className="space-y-2 text-zinc-600 font-mono text-xs">
              <li>
                <a
                  href={`mailto:${CANDIDATE_PROFILE.email}`}
                  className="hover:text-cobalt-600 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="truncate">{CANDIDATE_PROFILE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CANDIDATE_PROFILE.phone}`}
                  className="hover:text-cobalt-600 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{CANDIDATE_PROFILE.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={CANDIDATE_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 transition-colors flex items-center gap-1.5"
                >
                  <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
                  <span>github.com/MOHAN2416</span>
                </a>
              </li>
              <li>
                <a
                  href={CANDIDATE_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cobalt-600 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  <span>linkedin.com/in/mohan-surendra</span>
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block mt-1 text-cobalt-600 font-sans font-semibold hover:underline"
                >
                  Schedule Technical Interview &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Vercel indicator */}
        <div className="pt-6 border-t border-zinc-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Mutyala Mohan Surendra. Editorial Light Engineering Showcase.
          </div>
          <div className="flex items-center gap-2 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Hydration Mismatch &middot; Vercel Serverless Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
