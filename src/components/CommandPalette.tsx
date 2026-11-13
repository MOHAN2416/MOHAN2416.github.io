"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PROJECTS, CANDIDATE_PROFILE } from "@/lib/data";
import {
  Search,
  FileText,
  Terminal,
  ExternalLink,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
  Award,
  Check,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
}

interface CommandItem {
  id: string;
  category: "Projects" | "Interactive Labs" | "Quick Actions" | "Navigation";
  title: string;
  subtitle: string;
  badge?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette({ isOpen, onClose, onOpenResume }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedAction, setCopiedAction] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const allItems: CommandItem[] = [
    // Navigation
    {
      id: "nav-home",
      category: "Navigation",
      title: "Overview & Systems Architecture",
      subtitle: "Executive summary, 4 engineering pillars, and flagship metrics",
      icon: <Layers className="w-4 h-4 text-cobalt-600" />,
      action: () => router.push("/"),
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "All 6 Production Projects",
      subtitle: "Filterable directory with verified empirical benchmarks",
      icon: <Layers className="w-4 h-4 text-cobalt-600" />,
      action: () => router.push("/projects"),
    },
    {
      id: "nav-playground",
      category: "Navigation",
      title: "Interactive Systems Playground",
      subtitle: "Hands-on browser simulators for all 6 architectures",
      icon: <Terminal className="w-4 h-4 text-cobalt-600" />,
      action: () => router.push("/playground"),
    },
    {
      id: "nav-experience",
      category: "Navigation",
      title: "Experience & Education",
      subtitle: "LiveAI internship, B.Tech coursework, and 1st place hackathon",
      icon: <GraduationCap className="w-4 h-4 text-cobalt-600" />,
      action: () => router.push("/experience"),
    },
    {
      id: "nav-credentials",
      category: "Navigation",
      title: "Verified Credentials & Skills Matrix",
      subtitle: "8 verified certificates and technical skills taxonomy",
      icon: <Award className="w-4 h-4 text-cobalt-600" />,
      action: () => router.push("/credentials"),
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Recruiter Transmission & Contact",
      subtitle: "Schedule technical interview and direct channels",
      icon: <Mail className="w-4 h-4 text-cobalt-600" />,
      action: () => router.push("/contact"),
    },

    // 6 Flagship Projects
    ...PROJECTS.map((project) => ({
      id: `proj-${project.slug}`,
      category: "Projects" as const,
      title: `${project.title} — Case Study`,
      subtitle: project.tagline,
      badge: project.cardMetrics[0].value,
      icon: <FileText className="w-4 h-4 text-cobalt-600" />,
      action: () => router.push(`/projects/${project.slug}`),
    })),

    // 6 Interactive Labs
    ...PROJECTS.map((project) => ({
      id: `lab-${project.demoType}`,
      category: "Interactive Labs" as const,
      title: `${project.title} Interactive Sandbox`,
      subtitle: `Simulate ${project.badge} runtime in browser`,
      badge: project.demoType,
      icon: <Terminal className="w-4 h-4 text-emerald-600" />,
      action: () => router.push(`/playground?tab=${project.demoType}`),
    })),

    // Quick Actions
    {
      id: "act-resume-pdf",
      category: "Quick Actions",
      title: "Download Official Resume (PDF)",
      subtitle: "Direct download of verified CV (/Mutyala_Mohan_Surendra_Resume.pdf)",
      badge: "PDF",
      icon: <FileText className="w-4 h-4 text-cobalt-600" />,
      action: () => {
        window.open("/Mutyala_Mohan_Surendra_Resume.pdf", "_blank");
      },
    },
    {
      id: "act-resume-modal",
      category: "Quick Actions",
      title: "Inspect CV & Print Preview",
      subtitle: "Open in-app resume viewer modal",
      icon: <FileText className="w-4 h-4 text-zinc-600" />,
      action: () => {
        onClose();
        if (onOpenResume) onOpenResume();
      },
    },
    {
      id: "act-email",
      category: "Quick Actions",
      title: "Copy Email Address",
      subtitle: CANDIDATE_PROFILE.email,
      badge: "Copy",
      icon: <Mail className="w-4 h-4 text-zinc-600" />,
      action: () => {
        navigator.clipboard.writeText(CANDIDATE_PROFILE.email);
        setCopiedAction("Email copied!");
        setTimeout(() => setCopiedAction(null), 1800);
      },
    },
    {
      id: "act-phone",
      category: "Quick Actions",
      title: "Copy Phone Number",
      subtitle: CANDIDATE_PROFILE.phone,
      badge: "Copy",
      icon: <Phone className="w-4 h-4 text-zinc-600" />,
      action: () => {
        navigator.clipboard.writeText(CANDIDATE_PROFILE.phone);
        setCopiedAction("Phone copied!");
        setTimeout(() => setCopiedAction(null), 1800);
      },
    },
    {
      id: "act-github",
      category: "Quick Actions",
      title: "Open GitHub Profile",
      subtitle: "github.com/MOHAN2416",
      icon: <ExternalLink className="w-4 h-4 text-zinc-600" />,
      action: () => window.open(CANDIDATE_PROFILE.github, "_blank"),
    },
    {
      id: "act-linkedin",
      category: "Quick Actions",
      title: "Open LinkedIn Profile",
      subtitle: "linkedin.com/in/mohan-surendra",
      icon: <ExternalLink className="w-4 h-4 text-zinc-600" />,
      action: () => window.open(CANDIDATE_PROFILE.linkedin, "_blank"),
    },
  ];

  const filteredItems = allItems.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = filteredItems[selectedIndex];
      if (target) {
        target.action();
        if (target.id.startsWith("nav-") || target.id.startsWith("proj-") || target.id.startsWith("lab-")) {
          onClose();
        }
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-zinc-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white shadow-2xl overflow-hidden font-sans space-y-0"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 bg-zinc-50/60">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search projects, labs, actions, or routes... (Type to filter)"
            className="w-full bg-transparent text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none font-sans"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded text-zinc-400 hover:text-zinc-700"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-zinc-200 text-zinc-500 shadow-xs">
              ESC
            </kbd>
          )}
        </div>

        {/* Status Alert if Action Copied */}
        {copiedAction && (
          <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs font-mono flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{copiedAction}</span>
            </span>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500 space-y-1">
              <p>No matching commands found for &quot;{query}&quot;</p>
              <p className="text-[11px] text-zinc-400 font-mono">Try searching for &quot;vidura&quot;, &quot;resume&quot;, &quot;lab&quot;, or &quot;c++&quot;</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    if (item.id.startsWith("nav-") || item.id.startsWith("proj-") || item.id.startsWith("lab-")) {
                      onClose();
                    }
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors text-xs ${
                    isSelected
                      ? "bg-cobalt-50/80 text-zinc-900 border border-cobalt-200/60"
                      : "hover:bg-zinc-50 text-zinc-700 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg border shrink-0 ${
                        isSelected
                          ? "bg-white border-cobalt-200 text-cobalt-600"
                          : "bg-zinc-100/70 border-zinc-200 text-zinc-500"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-zinc-900 truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-zinc-100 text-zinc-600 border border-zinc-200 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pl-2">
                    <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? "text-cobalt-600 translate-x-0.5" : "text-zinc-300"
                      }`}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 bg-zinc-50 border-t border-zinc-200 flex flex-wrap items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-zinc-200 text-[10px]">↑↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-zinc-200 text-[10px]">↵</kbd>
              <span>Select</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-600">
            <Sparkles className="w-3 h-3 text-cobalt-600" />
            <span>Mutyala Mohan Surendra &middot; Portfolio</span>
          </div>
        </div>
      </div>
    </div>
  );
}
