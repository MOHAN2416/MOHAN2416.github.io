"use client";

import React, { useState, useEffect } from "react";
import { Command, GitBranch, FileText, Menu, X, Sparkles } from "lucide-react";
import { CANDIDATE_PROFILE } from "@/lib/data";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
  onOpenAiAssistant: () => void;
}

export function Navbar({ onOpenCommandPalette, onOpenResume, onOpenAiAssistant }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_LINKS = [
    { label: "Overview", href: "#overview" },
    { label: "Pillars", href: "#pillars" },
    { label: "Projects (6)", href: "#projects" },
    { label: "Architecture Lab", href: "#architecture" },
    { label: "Experience", href: "#experience" },
    { label: "Credentials", href: "#credentials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090E]/90 backdrop-blur-md border-b border-border/80 shadow-2xl py-3"
          : "bg-transparent py-4 sm:py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#overview" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-glow-indigo transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-[#0D1117] rounded-[11px] flex items-center justify-center text-blue-400 font-mono font-bold text-sm">
              MS
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-slate-100 tracking-tight font-sans group-hover:text-blue-400 transition-colors">
                Mutyala Mohan Surendra
              </span>
              <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Roles
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
              AI Systems Engineer & Full-Stack Architect
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center space-x-1 font-mono text-xs">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Cmd+K Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-border/80 shadow-sm transition-all cursor-pointer group hover:border-blue-500/50"
            title="Press Cmd+K to open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline text-slate-400 group-hover:text-slate-200">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* AI Twin Trigger Button */}
          <button
            onClick={onOpenAiAssistant}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-mono transition-all cursor-pointer hover:scale-105 active:scale-95"
            title="Ask Mohan's AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">AI Twin</span>
          </button>

          {/* Resume PDF Modal Button */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-border/80 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Resume</span>
          </button>

          {/* GitHub External */}
          <a
            href={CANDIDATE_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-100 border border-border/80 transition-colors"
            title="View GitHub Profile"
          >
            <GitBranch className="w-4 h-4 text-slate-300" />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-200 xl:hidden border border-border/70"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden px-4 pt-3 pb-5 bg-[#0D1117] border-b border-border/80 space-y-2 text-xs font-mono">
          <div className="px-3 py-1.5 text-[11px] text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {CANDIDATE_PROFILE.availabilityStatus}
          </div>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-border/60 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 flex items-center gap-2"
            >
              <Command className="w-3.5 h-3.5 text-blue-400" />
              <span>Command Palette (⌘K)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiAssistant();
              }}
              className="px-3 py-1.5 rounded bg-blue-600/30 text-blue-300 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Twin</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
