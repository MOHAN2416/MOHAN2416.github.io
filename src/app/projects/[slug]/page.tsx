import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/data";
import { ArrowLeft, ArrowRight, GitBranch, ExternalLink, Terminal, CheckCircle2, FileCode, AlertTriangle } from "lucide-react";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Case Study" };

  return {
    title: `${project.title} — Architecture Case Study | Mutyala Mohan Surendra`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];

  return (
    <article className="w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-16 space-y-12 font-sans">
      {/* 1. Header & Breadcrumb */}
      <div className="space-y-5 border-b border-zinc-200/60 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-cobalt-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-cobalt-600 transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">{project.title}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-lg text-[11px] font-mono font-medium bg-white/45 backdrop-blur-md text-zinc-900 border-t border-l border-white/95 border-r border-b border-white/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
              {project.badge}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              &bull; {project.category}
            </span>
            <span className="text-xs font-mono text-emerald-700 font-medium bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-200/80 shadow-xs">
              {project.testsCount} passing
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-zinc-900 tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl font-mono text-cobalt-600 font-medium leading-relaxed max-w-4xl">
            {project.tagline}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-semibold shadow-[0_4px_12px_-2px_rgba(15,23,42,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <GitBranch className="w-4 h-4" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          <Link
            href={`/playground?tab=${project.demoType}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/45 hover:bg-white/70 backdrop-blur-md text-cobalt-600 font-mono text-xs font-semibold border-t border-l border-white/90 border-r border-b border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Terminal className="w-4 h-4" />
            <span>Try Live Demo</span>
          </Link>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-lg text-xs font-mono bg-white/40 backdrop-blur-md text-slate-800 border-t border-l border-white/85 border-r border-b border-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Structured Breakdown in Plain English */}
      <div className="space-y-12 text-zinc-800 leading-relaxed">
        {/* Section 1: Problem Statement */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 flex items-center gap-2">
            <span className="text-cobalt-600 font-mono text-lg">01.</span>
            <span>Why I Built This</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-sans max-w-4xl">
            {project.caseStudy.problemStatement}
          </p>
        </section>

        {/* Section 2: How It Works */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 flex items-center gap-2">
            <span className="text-cobalt-600 font-mono text-lg">02.</span>
            <span>How It Works</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-3xl">
            A step-by-step diagram showing how data moves safely through the system:
          </p>

          <div className="p-6 sm:p-8 rounded-2xl bg-white/40 backdrop-blur-2xl border-t border-l border-white/95 border-r border-b border-white/45 shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_16px_36px_-8px_rgba(15,23,42,0.1)] overflow-x-auto">
            <pre className="font-mono text-xs sm:text-[13px] text-zinc-900 leading-relaxed whitespace-pre font-medium">
              {project.caseStudy.architectureDiagramText}
            </pre>
          </div>
        </section>

        {/* Section 3: Key Features & Implementation */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 flex items-center gap-2">
            <span className="text-cobalt-600 font-mono text-lg">03.</span>
            <span>Key Features &amp; Implementation</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.caseStudy.technicalImplementation.map((impl, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white/45 backdrop-blur-xl border-t border-l border-white/90 border-r border-b border-white/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_16px_-4px_rgba(15,23,42,0.05)] space-y-2.5"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Feature #{idx + 1}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {impl}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Key Results & Benchmarks */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 flex items-center gap-2">
              <span className="text-cobalt-600 font-mono text-lg">04.</span>
              <span>Key Results &amp; Benchmarks</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600">
              Real measured speed, test coverage, and performance benchmarks:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border-t border-l border-white/95 border-r border-b border-white/45 bg-white/40 backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_16px_36px_-8px_rgba(15,23,42,0.1)]">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-white/60 border-b border-zinc-200/60 text-zinc-700 font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-5">Test / Metric</th>
                  <th className="py-3.5 px-5">Result</th>
                  <th className="py-3.5 px-5">How It Was Tested</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/50">
                {project.caseStudy.benchmarksTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/60 transition-colors">
                    <td className="py-3.5 px-5 text-zinc-600">{row.category}</td>
                    <td className="py-3.5 px-5 font-bold text-zinc-900">{row.metric}</td>
                    <td className="py-3.5 px-5 font-bold text-cobalt-600">{row.value}</td>
                    <td className="py-3.5 px-5 text-slate-800 font-sans text-xs">{row.verificationMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Code Structure & Current Limits */}
        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 flex items-center gap-2">
            <span className="text-cobalt-600 font-mono text-lg">05.</span>
            <span>Code Structure &amp; Current Limits</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Repo Tree */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-white/40 backdrop-blur-2xl border-t border-l border-white/95 border-r border-b border-white/45 font-mono text-xs overflow-x-auto shadow-xs">
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-zinc-500" />
                <span>File Layout</span>
              </div>
              <pre className="text-zinc-900 leading-snug whitespace-pre font-medium">
                {project.caseStudy.repositoryStructure}
              </pre>
            </div>

            {/* Known Limitations */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white/45 backdrop-blur-xl border-t border-l border-white/90 border-r border-b border-white/45 shadow-xs space-y-3.5">
              <div className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Current Limitations</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-800 font-sans leading-relaxed">
                {project.caseStudy.limitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-zinc-400 font-bold">&bull;</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* 3. Bottom Previous / Next Pagination */}
      <div className="pt-8 border-t border-zinc-200/60 flex items-center justify-between gap-4 font-mono text-xs">
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group flex items-center gap-2 text-zinc-600 hover:text-cobalt-600 transition-colors p-3 rounded-xl hover:bg-white/60"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
          <div>
            <div className="text-[10px] text-zinc-400 uppercase">Previous Project</div>
            <div className="font-bold text-zinc-900 group-hover:text-cobalt-600">{prevProject.title}</div>
          </div>
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex items-center gap-2 text-right text-zinc-600 hover:text-cobalt-600 transition-colors p-3 rounded-xl hover:bg-white/60"
        >
          <div>
            <div className="text-[10px] text-zinc-400 uppercase">Next Project</div>
            <div className="font-bold text-zinc-900 group-hover:text-cobalt-600">{nextProject.title}</div>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
