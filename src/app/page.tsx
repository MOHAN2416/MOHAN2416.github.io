"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BentoPillars } from "@/components/BentoPillars";
import { ProjectsShowcase } from "@/components/ProjectsShowcase";
import { ArchitectureLab } from "@/components/ArchitectureLab";
import { ExperienceEducation } from "@/components/ExperienceEducation";
import { CertificationsVault } from "@/components/CertificationsVault";
import { ContactTerminal } from "@/components/ContactTerminal";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { ArchitectureModal } from "@/components/ArchitectureModal";
import { ResumeModal } from "@/components/ResumeModal";
import { AiAssistantDrawer } from "@/components/AiAssistantDrawer";
import { PROJECTS, Project } from "@/lib/data";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);
  const [modalDefaultTab, setModalDefaultTab] = useState<"interactive" | "architecture" | "benchmarks">("interactive");

  const handleInspectProject = (project: Project, tab: "interactive" | "architecture" | "benchmarks" = "interactive") => {
    setModalDefaultTab(tab);
    setInspectingProject(project);
  };

  const handleSelectProjectId = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (found) {
      handleInspectProject(found, "interactive");
    }
  };

  return (
    <main className="min-h-screen bg-[#07090E] text-slate-100 relative selection:bg-blue-600/30 selection:text-white">
      {/* Sticky Command-Bar Navbar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProjectDemo={handleSelectProjectId}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenViduraCli={() => handleSelectProjectId("vidura")}
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* 4 Core Engineering Pillars Bento Grid */}
      <BentoPillars onSelectProject={handleSelectProjectId} />

      {/* Filterable Engineering Systems & Benchmarks Showcase (6 Projects) */}
      <ProjectsShowcase onInspectProject={handleInspectProject} />

      {/* Interactive Simulation Lab */}
      <ArchitectureLab />

      {/* Experience, Education, & Hackathon Trophy Banner */}
      <ExperienceEducation />

      {/* Verified Credentials Vault */}
      <CertificationsVault />

      {/* Recruiter Contact Terminal (SQLite Connected) */}
      <ContactTerminal />

      {/* Footer */}
      <Footer
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenAiAssistant={() => setAiAssistantOpen(true)}
      />

      {/* Project Deep-Dive Inspection Modal */}
      <ArchitectureModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
        defaultTab={modalDefaultTab}
      />

      {/* Resume Viewer / PDF Export Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Floating Autonomous AI Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        onOpenProject={(pId) => handleSelectProjectId(pId)}
      />

      {/* Floating Bottom-Right Pill when AI Twin is closed */}
      {!aiAssistantOpen && (
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-mono font-medium shadow-glow-indigo flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-blue-400/30"
          title="Ask Mohan's AI Twin"
        >
          <Sparkles className="w-4 h-4 text-blue-200" />
          <span>Ask Mohan&apos;s AI Twin</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}
    </main>
  );
}
