"use client";

import React from "react";
import Link from "next/link";
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS } from "@/lib/data";
import { Briefcase, GraduationCap, Trophy, Calendar, MapPin, CheckCircle2, Award, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

export default function ExperienceEducationPage() {
  return (
    <div className="w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-16 space-y-12 font-sans">
      {/* Header */}
      <div className="space-y-4 border-b border-zinc-200/60 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-cobalt-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Experience &amp; Education</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-zinc-900 tracking-tight">
            Experience &amp; Education
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-4xl font-sans">
            Hands-on AI internship experience, a 1st-place national hackathon win, and Computer Science studies at Amrita Vishwa Vidyapeetham.
          </p>
        </div>
      </div>

      {/* FLASH Hackathon 1st Place Trophy Banner with 3D Frosted Glass */}
      <GlassCard className="bg-gradient-to-r from-amber-50/70 via-white/60 to-amber-50/40 border-amber-200/80">
        <div className="p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-start gap-5">
            <div className="p-3.5 rounded-2xl bg-amber-100/80 border border-amber-300/80 text-amber-800 shrink-0 shadow-xs">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-100/90 text-amber-900 border border-amber-300/80 shadow-xs">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>1st Place National Champion (1 / 97 Teams)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-zinc-900">
                Winner (1st Place among 97 Teams) — FLASH National Hackathon
              </h2>
              <p className="text-sm text-zinc-700 max-w-3xl font-sans leading-relaxed">
                Built and launched <strong>PillPal</strong>—a medication reminder and prescription reading platform under a 36-hour deadline. Won 1st place overall out of 97 university teams nationwide for clean software design and user experience.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 md:border-l border-amber-200/80 pt-4 md:pt-0 md:pl-8 font-mono">
            <div className="text-left md:text-right">
              <div className="text-xs text-zinc-500 uppercase tracking-wider">Field of 97</div>
              <div className="text-3xl font-bold text-amber-900">Rank #1</div>
            </div>
            <div className="text-xs px-3 py-1 rounded-lg bg-amber-200/80 text-amber-950 font-bold shadow-xs">
              Gold Trophy
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Professional Experience Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold font-heading text-zinc-900 border-b border-zinc-200/60 pb-3">
          <div className="p-2 rounded-xl bg-cobalt-50 text-cobalt-700 border border-cobalt-200/80 shadow-xs">
            <Briefcase className="w-5 h-5" />
          </div>
          <h2>Professional Experience</h2>
        </div>

        <div className="space-y-6">
          {EXPERIENCE_ITEMS.map((item, idx) => (
            <GlassCard key={idx} index={idx}>
              <div className="p-7 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200/50">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-zinc-900">{item.role}</h3>
                    <div className="text-sm font-semibold text-cobalt-600 font-mono mt-0.5">{item.company}</div>
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

                <ul className="space-y-3 text-sm text-zinc-700 font-sans leading-relaxed">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3">
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
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-white/40 backdrop-blur-md text-slate-800 border-t border-l border-white/85 border-r border-b border-white/40 shadow-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Academic Foundation Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-bold font-heading text-zinc-900 border-b border-zinc-200/60 pb-3">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/80 shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2>Education &amp; Studies</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {EDUCATION_ITEMS.map((edu, idx) => (
            <GlassCard key={idx} index={idx}>
              <div className="p-7 sm:p-8 space-y-5 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200/50">
                    <div>
                      <h3 className="text-lg font-bold font-heading text-zinc-900">{edu.degree}</h3>
                      <div className="text-xs sm:text-sm text-purple-700 font-semibold font-mono mt-0.5">{edu.institution}</div>
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
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/40 backdrop-blur-md text-slate-800 border-t border-l border-white/85 border-r border-b border-white/40 shadow-xs"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.achievements && (
                    <div className="pt-2 border-t border-zinc-200/50 space-y-2 text-xs text-zinc-600 font-sans">
                      {edu.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Bottom Link to Credentials */}
      <div className="pt-4 flex items-center justify-between border-t border-zinc-200/60">
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
