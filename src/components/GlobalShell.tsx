"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ResumeModal } from "./ResumeModal";
import { CommandPalette } from "./CommandPalette";
import { AiAssistantDrawer } from "./AiAssistantDrawer";
import { Sparkles } from "lucide-react";

export function GlobalShell({ children }: { children: React.ReactNode }) {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // Global keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-zinc-900 font-sans selection:bg-cobalt-100 selection:text-cobalt-900">
      {/* Persistent Sticky Navbar */}
      <Navbar
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Page Route Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Clean Multi-Column Footer */}
      <Footer />

      {/* Light-Themed Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Floating AI Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      {/* Floating Bottom-Right Trigger Pill */}
      {!aiAssistantOpen && (
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="fixed bottom-5 right-5 z-40 px-3.5 py-2.5 rounded-full bg-white hover:bg-zinc-50 text-zinc-900 text-xs font-mono font-medium shadow-popover flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-zinc-200"
          title="Ask Mohan's AI Assistant"
        >
          <div className="w-5 h-5 rounded-full bg-cobalt-50 text-cobalt-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="font-semibold">Ask Mohan&apos;s AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-600 pulse-emerald" />
        </button>
      )}

      {/* Global Resume Viewer / PDF Export Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
