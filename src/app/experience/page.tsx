"use client";

import React from "react";
import Link from "next/link";
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS } from "@/lib/data";
import { Briefcase, GraduationCap, Trophy, Calendar, MapPin, CheckCircle2, Award, ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export default function ExperienceEducationPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 font-sans">
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-200/80 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-cobalt-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Experience &amp; Education</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-zinc-900 tracking-tight">
            Track Record &amp; Academic Credentials
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl font-sans">
            Hands-on industry fine-tuning of open-source language models, a national 1st-place hackathon win out of 97 teams, and rigorous computer science coursework at Amrita Vishwa Vidyapeetham.
          </p>
        </div>
      </div>

      {/* FLASH Hackathon 1st Place Trophy Banner with Amber Spotlight */}
      <SpotlightCard
        spotlightColor="rgba(217, 119, 6, 0.09)"
        borderColor="rgba(217, 119, 6, 0.4)"
        className="bg-gradient-to-r from-amber-50/80 via-white to-amber-50/50 border-amber-200"
      >
        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 shrink-0">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-100 text-amber-900 border border-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>1st Place National Champion (1 / 97 Teams)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900">
                Winner (1st Place among 97 Teams) — FLASH National Hackathon
              </h2>
              <p className="text-xs sm:text-sm text-zinc-700 max-w-2xl font-sans leading-relaxed">
                Conceptualized, architected, and shipped <strong>PillPal</strong>—a full-stack medication adherence and automated prescription parsing platform under high-pressure 36-hour hackathon deadlines. Outperformed 96 competing university engineering teams nationwide on code architecture, deterministic parsing, and UX execution.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 md:border-l border-amber-200 pt-4 md:pt-0 md:pl-6 font-mono">
            <div className="text-left md:text-right">
              <div className="text-xs text-zinc-500 uppercase">Field of 97</div>
              <div className="text-2xl font-bold text-amber-900">Rank #1</div>
            </div>
            <div className="text-xs px-2.5 py-1 rounded bg-amber-200/70 text-amber-950 font-bold">
              Gold Trophy
            </div>
          </div>
        </div>
      </SpotlightCard>

      {/* Professional Experience Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5 text-xl font-bold font-heading text-zinc-900 border-b border-zinc-200/80 pb-3">
          <div className="p-2 rounded-lg bg-cobalt-50 text-cobalt-700 border border-cobalt-200">
            <Briefcase className="w-5 h-5" />
          </div>
          <h2>Professional Industry Experience</h2>
        </div>

        <div className="space-y-6">
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <SpotlightCard key={idx} index={idx}>
              <div className="p-6 sm:p-7 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100">
                  <div>
                    <h3 className="text-lg font-bold font-heading text-zinc-900">{item.role}</h3>
                    <div className="text-sm font-semibold text-cobalt-600 font-mono">{item.company}</div>
                  </div>
                  <div className="text-left sm:text-right text-xs font-mono text-zinc-500 space-y-0.5">
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1 text-zinc-500">
                      <MapPin className="w-3 h-3 text-zinc-400" />
                      <span>{item.location} &bull; {item.type}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 font-semibold">
                    Technologies &amp; Frameworks:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded text-xs font-mono bg-zinc-100 text-zinc-700 border border-zinc-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Academic Foundation Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5 text-xl font-bold font-heading text-zinc-900 border-b border-zinc-200/80 pb-3">
          <div className="p-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2>Academic Foundation</h2>
        </div>

        <div className="space-y-5">
          {EDUCATION_ITEMS.map((edu, idx) => (
            <SpotlightCard key={idx} index={idx}>
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-zinc-900">{edu.degree}</h3>
                    <div className="text-xs sm:text-sm text-purple-700 font-semibold font-mono">{edu.institution}</div>
                  </div>
                  <div className="text-left sm:text-right text-xs font-mono text-zinc-500 space-y-0.5">
                    <div className="text-emerald-700 font-bold">{edu.score}</div>
                    <div className="text-zinc-500">{edu.period} &bull; {edu.location}</div>
                  </div>
                </div>

                {edu.coursework && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                      Core Computer Science Coursework:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-100 text-zinc-700 border border-zinc-200"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {edu.achievements && (
                  <div className="pt-2 border-t border-zinc-100 space-y-1.5 text-xs text-zinc-600 font-sans">
                    {edu.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Bottom Link to Credentials */}
      <div className="pt-4 flex items-center justify-between border-t border-zinc-200">
        <Link
          href="/credentials"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cobalt-600 hover:text-cobalt-700"
        >
          <span>View Verified Certifications &amp; Skills Matrix</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
