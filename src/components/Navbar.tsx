"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitBranch, FileText, Menu, X, ArrowRight, ExternalLink, Search } from "lucide-react";
import { CANDIDATE_PROFILE } from "@/lib/data";

interface NavbarProps {
  onOpenResume?: () => void;
  onOpenCommandPalette?: () => void;
}

export function Navbar({ onOpenResume, onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NAV_LINKS = [
    { label: "Overview", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Interactive Labs", href: "/playground" },
    { label: "Experience & Education", href: "/experience" },
    { label: "Credentials", href: "/credentials" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white/45 backdrop-blur-2xl backdrop-saturate-[180%] border-b border-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.06)] ${
        scrolled ? "py-3" : "py-3.5"
      }`}
    >
      <div className="w-full max-w-[1640px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-5">
        {/* Brand Monogram & Name (Left) */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-mono font-bold text-xs shadow-xs transition-transform group-hover:scale-105 shrink-0">
            MS
          </div>
          <div className="whitespace-nowrap">
            <span className="font-semibold text-sm sm:text-base text-zinc-900 tracking-tight font-heading group-hover:text-cobalt-600 transition-colors block whitespace-nowrap">
              Mutyala Mohan Surendra
            </span>
            <span className="text-[11px] text-zinc-600 hidden xl:block font-sans whitespace-nowrap">
              AI Systems Engineer & Full-Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Center with gap-7) */}
        <nav className="hidden lg:flex items-center gap-7 font-sans text-xs shrink-0">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                  active
                    ? "text-cobalt-600 bg-white/60 border-t border-l border-white/95 border-r border-b border-white/45 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_2px_8px_-2px_rgba(37,99,235,0.12)] font-semibold"
                    : "text-slate-700 hover:text-slate-950 hover:bg-white/40"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/45 hover:bg-white/70 backdrop-blur-md text-slate-700 hover:text-slate-950 border-t border-l border-white/90 border-r border-b border-white/50 text-xs font-mono shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all cursor-pointer"
            title="Open Command Palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-600 font-medium">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/80 border border-white/90 text-[10px] text-zinc-600 font-mono shadow-xs">
              ⌘K
            </kbd>
          </button>

          {/* Resume Action */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/45 hover:bg-white/70 backdrop-blur-md text-slate-800 text-xs font-mono border-t border-l border-white/90 border-r border-b border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-500" />
            <span>Resume</span>
          </button>

          {/* GitHub Icon Link */}
          <a
            href={CANDIDATE_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-xl bg-white/45 hover:bg-white/70 backdrop-blur-md text-slate-700 hover:text-slate-950 border-t border-l border-white/90 border-r border-b border-white/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] transition-colors"
            title="GitHub Repository"
          >
            <GitBranch className="w-4 h-4" />
          </a>

          {/* Primary Cobalt Contact CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-semibold shadow-[0_4px_12px_-2px_rgba(37,99,235,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Contact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl bg-white/45 text-zinc-700 hover:text-zinc-950 lg:hidden border border-white/80"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-5 bg-white/80 backdrop-blur-2xl border-b border-white/85 space-y-2 text-xs font-sans shadow-lg">
          <div className="px-3 py-1.5 text-[11px] text-emerald-700 font-mono bg-emerald-50/80 rounded-md border border-emerald-200/80 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 pulse-emerald" />
            {CANDIDATE_PROFILE.availabilityStatus}
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md font-medium ${
                isActive(link.href)
                  ? "bg-cobalt-50 text-cobalt-600 font-semibold"
                  : "text-zinc-700 hover:bg-white/60"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume?.();
              }}
              className="px-3 py-1.5 rounded-md bg-white/60 text-zinc-700 font-mono text-xs flex items-center gap-1.5 border border-white/80"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>
            <a
              href={CANDIDATE_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-white/60 text-zinc-700 font-mono text-xs flex items-center gap-1.5 border border-white/80"
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
