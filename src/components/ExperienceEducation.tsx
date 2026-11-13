"use client";

import React from "react";
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS } from "@/lib/data";
import { Briefcase, GraduationCap, Trophy, Calendar, MapPin, Award, CheckCircle2 } from "lucide-react";

export function ExperienceEducation() {
  return (
    <section id="experience" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 pb-2 border-b border-border/60">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
            Industry Experience & Academic Foundation
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-sans">
            Rigorous foundations in deep learning, operating systems, and systems-level development combined with real-world industry AI fine-tuning experience.
          </p>
        </div>

        {/* FLASH Hackathon 1st Place Trophy Banner */}
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-amber-950/30 via-[#0E1524] to-blue-950/30 border border-amber-500/40 shadow-glow-amber relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Award className="w-3.5 h-3.5" /> 1st Place National Champion
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                  Winner (1st Place among 97 Teams) — FLASH National Hackathon
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl font-sans leading-relaxed">
                  Engineered and deployed a production-grade full-stack medication adherence and automated prescription parsing platform under competitive 36-hour hackathon constraints. Outperformed 96 competing university engineering teams nationwide on architecture, deterministic parsing, and UX execution.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between gap-2 border-t md:border-t-0 md:border-l border-border/60 pt-4 md:pt-0 md:pl-6">
              <div className="text-left md:text-right font-mono">
                <div className="text-xs text-slate-400">Competing Teams</div>
                <div className="text-2xl font-extrabold text-amber-400 font-mono">97 Teams</div>
              </div>
              <div className="text-left md:text-right font-mono">
                <div className="text-xs text-slate-400">Award Rank</div>
                <div className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  Rank #1 Gold
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Professional Experience Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-lg font-bold text-white font-sans">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <span>Industry Experience</span>
            </div>

            <div className="space-y-4">
              {EXPERIENCE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0B0F17]/90 border border-border/80 shadow-glass space-y-4 hover:border-blue-500/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/50">
                    <div>
                      <h4 className="text-lg font-bold text-white font-mono">{item.role}</h4>
                      <div className="text-sm text-blue-400 font-semibold">{item.company}</div>
                    </div>
                    <div className="text-left sm:text-right text-xs font-mono text-slate-400 space-y-0.5">
                      <div className="flex items-center sm:justify-end gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end gap-1 text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location} • {item.type}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-300 font-sans leading-relaxed">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <div className="text-[11px] font-mono text-slate-500 uppercase mb-1.5">Technologies:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-blue-300 border border-blue-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Foundation Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-lg font-bold text-white font-sans">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span>Academic Foundation</span>
            </div>

            <div className="space-y-4">
              {EDUCATION_ITEMS.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#0B0F17]/90 border border-border/80 shadow-glass space-y-4 hover:border-purple-500/30 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/50">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white font-mono">{edu.degree}</h4>
                      <div className="text-xs sm:text-sm text-purple-400 font-semibold">{edu.institution}</div>
                    </div>
                    <div className="text-left sm:text-right text-xs font-mono text-slate-400 space-y-0.5">
                      <div className="text-emerald-400 font-bold">{edu.score}</div>
                      <div className="text-slate-500">{edu.period} • {edu.location}</div>
                    </div>
                  </div>

                  {edu.coursework && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                        Core Computer Science Coursework:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 text-slate-300 border border-border/60"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.achievements && (
                    <div className="pt-2 border-t border-border/40 space-y-1.5 text-xs text-slate-400 font-sans">
                      {edu.achievements.map((ach, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
