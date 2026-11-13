"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitBranch, FileText, Menu, X, ArrowRight, ExternalLink } from "lucide-react";
import { CANDIDATE_PROFILE } from "@/lib/data";

interface NavbarProps {
  onOpenResume?: () => void;
}

export function Navbar({ onOpenResume }: NavbarProps) {
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
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-zinc-200/80 shadow-xs py-3"
          : "bg-white/95 backdrop-blur-sm border-b border-zinc-200/60 py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-mono font-bold text-xs shadow-xs transition-transform group-hover:scale-105">
            MS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm sm:text-base text-zinc-900 tracking-tight font-heading group-hover:text-cobalt-600 transition-colors">
                Mutyala Mohan Surendra
              </span>
              <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 pulse-emerald" />
                Available for Roles
              </span>
            </div>
            <div className="text-[11px] text-zinc-500 hidden sm:block font-sans">
              AI Systems Engineer & Full-Stack Developer
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 font-sans text-xs">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  active
                    ? "text-cobalt-600 bg-cobalt-50/70 border border-cobalt-200/50"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Resume Action */}
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-mono border border-zinc-200 shadow-xs transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-500" />
            <span>Resume</span>
          </button>

          {/* GitHub Icon Link */}
          <a
            href={CANDIDATE_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 rounded-md bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 border border-zinc-200 shadow-xs transition-colors"
            title="GitHub Repository"
          >
            <GitBranch className="w-4 h-4" />
          </a>

          {/* Primary Cobalt Contact CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-cobalt-600 hover:bg-cobalt-700 text-white text-xs font-semibold shadow-xs transition-all hover:shadow-sm"
          >
            <span>Contact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md bg-white text-zinc-600 hover:text-zinc-900 lg:hidden border border-zinc-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-5 bg-white border-b border-zinc-200 space-y-2 text-xs font-sans shadow-sm">
          <div className="px-3 py-1.5 text-[11px] text-emerald-700 font-mono bg-emerald-50 rounded-md border border-emerald-200 flex items-center gap-1.5">
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
                  : "text-zinc-700 hover:bg-zinc-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume?.();
              }}
              className="px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-700 font-mono text-xs flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>
            <a
              href={CANDIDATE_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-700 font-mono text-xs flex items-center gap-1.5"
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
