"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ResumeModal } from "./ResumeModal";
import { CommandPalette } from "./CommandPalette";
import { AiAssistantDrawer } from "./AiAssistantDrawer";
import { CustomCursor } from "./CustomCursor";
import { InteractiveBackground } from "./InteractiveBackground";
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
    <div className="relative min-h-screen flex flex-col bg-transparent text-zinc-900 font-sans selection:bg-cobalt-100 selection:text-cobalt-900">
      {/* 1. Global Custom Cursor (Desktop-Only, Fluid Spring Inertia) */}
      <CustomCursor />

      {/* 2. Interactive Canvas Matrix & Ambient Mesh Orbs */}
      <InteractiveBackground />

      {/* 3. Persistent Sticky Navbar */}
      <Navbar
        onOpenResume={() => setResumeModalOpen(true)}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* 4. Main Page Route Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* 5. Clean Multi-Column Footer */}
      <Footer />

      {/* 6. Light-Themed Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* 7. Floating AI Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      {/* 8. Floating Bottom-Right Trigger Pill */}
      {!aiAssistantOpen && (
        <button
          onClick={() => setAiAssistantOpen(true)}
          className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-full bg-white/50 hover:bg-white/75 backdrop-blur-2xl backdrop-saturate-[180%] text-zinc-900 text-xs font-mono font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_12px_32px_-4px_rgba(15,23,42,0.12)] flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer border-t border-l border-white/95 border-r border-b border-white/50"
          title="Ask Mohan's AI Assistant"
        >
          <div className="w-5 h-5 rounded-full bg-cobalt-50 text-cobalt-600 flex items-center justify-center">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="font-semibold">Ask Mohan&apos;s AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-600 pulse-emerald" />
        </button>
      )}

      {/* 9. Global Resume Viewer / PDF Export Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </div>
  );
}
