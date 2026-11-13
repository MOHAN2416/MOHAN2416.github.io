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
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 font-sans">
      {/* 1. Header & Breadcrumb */}
      <div className="space-y-5 border-b border-zinc-200/80 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <Link href="/" className="hover:text-cobalt-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-cobalt-600 transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">{project.title}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-100 text-zinc-800 border border-zinc-200">
              {project.badge}
            </span>
            <span className="text-xs font-mono text-zinc-500">
              &bull; {project.category}
            </span>
            <span className="text-xs font-mono text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {project.testsCount} passing
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-zinc-900 tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg font-mono text-cobalt-600 font-medium leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-semibold shadow-xs transition-colors"
          >
            <GitBranch className="w-4 h-4" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>

          <Link
            href={`/playground?tab=${project.demoType}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white hover:bg-zinc-50 text-cobalt-600 font-mono text-xs font-semibold border border-zinc-200 shadow-xs transition-colors hover:border-zinc-300"
          >
            <Terminal className="w-4 h-4" />
            <span>Test in Interactive Playground</span>
          </Link>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-100 text-zinc-700 border border-zinc-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 2. Structured Engineering Breakdown */}
      <div className="space-y-12 text-zinc-800 leading-relaxed">
        {/* Section 1: Problem Statement */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 flex items-center gap-2">
            <span className="text-cobalt-600 font-mono text-lg">01.</span>
            <span>Problem Statement &amp; Motivation</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
            {project.caseStudy.problemStatement}
          </p>
        </section>

        {/* Section 2: System Architecture */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 flex items-center gap-2">
            <span className="text-cobalt-600 font-mono text-lg">02.</span>
            <span>System Architecture</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            End-to-end dataflow pipeline enforcing deterministic gates, non-blocking execution, and verification invariants:
          </p>

          <div className="p-4 sm:p-6 rounded-xl bg-[#F4F4F5] border border-zinc-200 shadow-xs overflow-x-auto">
            <pre className="font-mono text-xs sm:text-[13px] text-zinc-800 leading-relaxed whitespace-pre font-medium">
              {project.caseStudy.architectureDiagramText}
            </pre>
          </div>
        </section>

        {/* Section 3: Core Technical Implementation */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 flex items-center gap-2">
            <span className="text-cobalt-600 font-mono text-lg">03.</span>
            <span>Core Technical Implementation</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.caseStudy.technicalImplementation.map((impl, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Invariant Stage #{idx + 1}</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {impl}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Measured Benchmarks & Verification Table */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 flex items-center gap-2">
              <span className="text-cobalt-600 font-mono text-lg">04.</span>
              <span>Empirical Hardware Benchmarks &amp; Verification</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600">
              Measured physical latency, memory footprint, and test suite verification numbers:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-xs">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Subsystem</th>
                  <th className="py-3 px-4">Metric</th>
                  <th className="py-3 px-4">Measured Value</th>
                  <th className="py-3 px-4">Methodology &amp; Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {project.caseStudy.benchmarksTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="py-3 px-4 text-zinc-500">{row.category}</td>
                    <td className="py-3 px-4 font-bold text-zinc-900">{row.metric}</td>
                    <td className="py-3 px-4 font-bold text-cobalt-600">{row.value}</td>
                    <td className="py-3 px-4 text-zinc-600 font-sans text-xs">{row.verificationMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Repository Structure & Limitations */}
        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-zinc-900 flex items-center gap-2">
            <span className="text-cobalt-600 font-mono text-lg">05.</span>
            <span>Repository Structure &amp; Known Limitations</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Repo Tree */}
            <div className="lg:col-span-7 p-4 sm:p-5 rounded-xl bg-[#F4F4F5] border border-zinc-200 font-mono text-xs overflow-x-auto">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-zinc-500" />
                <span>Codebase Tree</span>
              </div>
              <pre className="text-zinc-800 leading-snug whitespace-pre">
                {project.caseStudy.repositoryStructure}
              </pre>
            </div>

            {/* Known Limitations */}
            <div className="lg:col-span-5 p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-3">
              <div className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Engineering Boundary Conditions</span>
              </div>
              <ul className="space-y-2 text-xs text-zinc-600 font-sans leading-relaxed">
                {project.caseStudy.limitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-2">
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
      <div className="pt-8 border-t border-zinc-200 flex items-center justify-between gap-4 font-mono text-xs">
        <Link
          href={`/projects/${prevProject.slug}`}
          className="group flex items-center gap-2 text-zinc-600 hover:text-cobalt-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:-translate-x-1 transition-transform" />
          <div>
            <div className="text-[10px] text-zinc-400 uppercase">Previous Project</div>
            <div className="font-bold text-zinc-900 group-hover:text-cobalt-600">{prevProject.title}</div>
          </div>
        </Link>

        <Link
          href={`/projects/${nextProject.slug}`}
          className="group flex items-center gap-2 text-right text-zinc-600 hover:text-cobalt-600 transition-colors"
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
