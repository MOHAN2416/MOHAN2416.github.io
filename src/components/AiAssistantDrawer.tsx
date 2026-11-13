"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, RefreshCw, ArrowRight } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  text: string;
  category?: string;
  suggestedQuestions?: string[];
  relevantProjects?: string[];
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    text: `Hello! I am **Mohan's Autonomous AI Twin**, pre-loaded with complete knowledge of his 6 production repositories, systems architectures, CI benchmarks, and research.

How can I help evaluate Mohan for your engineering team?`,
    suggestedQuestions: [
      "Why hire Mohan for an AI Systems role?",
      "How does VIDURA prevent unauthorized code execution?",
      "Explain BLINK's 3-tier presentation attack detection.",
      "Walk me through the VARUNA MILP & Monte Carlo pipeline.",
    ],
    timestamp: "Now",
  },
];

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: (projectId: string) => void;
}

export function AiAssistantDrawer({ isOpen, onClose, onOpenProject }: AiAssistantDrawerProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const q = (queryText || inputQuery).trim();
    if (!q || isLoading) return;

    const userMessage: Message = {
      role: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to query assistant");
      }

      const botMessage: Message = {
        role: "assistant",
        text: data.answer,
        category: data.category,
        suggestedQuestions: data.suggestedQuestions,
        relevantProjects: data.relevantProjects,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: Message = {
        role: "assistant",
        text: "I encountered a transient error querying Mohan's knowledge base. Please try selecting one of the suggested prompts or query about VIDURA, BLINK, or VARUNA directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[480px] max-w-[500px] h-[580px] rounded-2xl border border-blue-500/40 bg-[#090D14] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Drawer Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0D121D] border-b border-border/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
              <span>Mohan&apos;s AI Twin</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-slate-400 font-sans">
              Deterministic RAG • 6 Repos • Offline Ready
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans bg-[#070A0F]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col space-y-1.5 ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
              {msg.role === "assistant" ? (
                <>
                  <Bot className="w-3 h-3 text-blue-400" />
                  <span>AI Twin</span>
                  {msg.category && <span>• {msg.category}</span>}
                </>
              ) : (
                <>
                  <User className="w-3 h-3 text-slate-400" />
                  <span>You</span>
                </>
              )}
              <span>• {msg.timestamp}</span>
            </div>

            <div
              className={`p-3.5 rounded-2xl max-w-[90%] leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-tr-none font-medium"
                  : "bg-[#0D1117] text-slate-200 border border-border/70 rounded-tl-none whitespace-pre-wrap"
              }`}
            >
              {msg.text}
            </div>

            {/* Relevant Project Quick Link */}
            {msg.relevantProjects && msg.relevantProjects.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {msg.relevantProjects.map((pId) => (
                  <button
                    key={pId}
                    onClick={() => onOpenProject(pId)}
                    className="px-2.5 py-1 rounded bg-blue-950/40 text-blue-300 border border-blue-500/30 text-[10px] font-mono flex items-center gap-1 hover:bg-blue-900/50 transition-colors cursor-pointer"
                  >
                    <span>Inspect {pId.toUpperCase()} Sandbox</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </button>
                ))}
              </div>
            )}

            {/* Suggested Follow-up Questions */}
            {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
              <div className="space-y-1 pt-1.5">
                <div className="text-[10px] font-mono text-slate-500">Suggested Next Questions:</div>
                <div className="flex flex-wrap gap-1">
                  {msg.suggestedQuestions.map((sq, sqIdx) => (
                    <button
                      key={sqIdx}
                      onClick={() => handleSendMessage(sq)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-border/60 text-[10px] font-mono text-left transition-colors cursor-pointer"
                    >
                      {sq}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Scanning deterministic RAG index across 6 repos...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Footer */}
      <div className="p-3 bg-[#0D121D] border-t border-border/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about VIDURA, BLINK PAM, VARUNA MILP, LiveAI..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-[#070A0F] border border-border/70 text-slate-200 placeholder-slate-500 text-xs font-sans focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
