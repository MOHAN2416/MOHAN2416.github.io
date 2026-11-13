"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
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
    text: `Hi! I am **Mohan's AI Assistant**. I can answer any questions about his 6 projects, technical skills, coursework, and internship experience.

How can I help you learn more about Mohan?`,
    suggestedQuestions: [
      "Why should we hire Mohan for software or AI roles?",
      "How does VIDURA keep code running safely offline?",
      "How does BLINK stop photo spoofing during face login?",
      "How does VARUNA find the best shipping routes and costs?",
    ],
    timestamp: "Now",
  },
];

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiAssistantDrawer({ isOpen, onClose }: AiAssistantDrawerProps) {
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
      const res = await fetch("/api/assistant", {
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
        text: "Sorry, I ran into an issue finding that information. Please try one of the suggested questions below or ask about projects like VIDURA, BLINK, or VARUNA directly.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[460px] max-w-[480px] h-[580px] rounded-2xl border border-white/90 bg-white/75 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_20px_50px_-10px_rgba(15,23,42,0.18)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/60 backdrop-blur-md border-b border-white/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cobalt-50 border border-cobalt-200 text-cobalt-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-zinc-900 font-heading flex items-center gap-1.5">
              <span>Mohan&apos;s AI Assistant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 pulse-emerald" />
            </div>
            <div className="text-[11px] text-zinc-500 font-sans">
              Portfolio Assistant &middot; 6 Projects &amp; Work
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
          aria-label="Close assistant"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans bg-[#FAFAFA]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col space-y-1.5 ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
              {msg.role === "assistant" ? (
                <>
                  <Bot className="w-3 h-3 text-cobalt-600" />
                  <span>AI Twin</span>
                  {msg.category && <span>&middot; {msg.category}</span>}
                </>
              ) : (
                <>
                  <User className="w-3 h-3 text-zinc-500" />
                  <span>You</span>
                </>
              )}
              <span>&middot; {msg.timestamp}</span>
            </div>

            <div
              className={`p-3.5 rounded-xl max-w-[90%] leading-relaxed ${
                msg.role === "user"
                  ? "bg-cobalt-600 text-white rounded-tr-none font-medium shadow-xs"
                  : "bg-white text-zinc-800 border border-zinc-200 rounded-tl-none shadow-xs whitespace-pre-wrap"
              }`}
            >
              {msg.text}
            </div>

            {/* Relevant Project Quick Link */}
            {msg.relevantProjects && msg.relevantProjects.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {msg.relevantProjects.map((pSlug) => (
                  <Link
                    key={pSlug}
                    href={`/projects/${pSlug}`}
                    onClick={onClose}
                    className="px-2.5 py-1 rounded-md bg-cobalt-50 text-cobalt-700 border border-cobalt-200 text-[11px] font-mono flex items-center gap-1 hover:bg-cobalt-100 transition-colors"
                  >
                    <span>Read {pSlug.toUpperCase()} Case Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            )}

            {/* Suggested Follow-up Questions */}
            {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
              <div className="space-y-1 pt-1.5">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Suggested Prompts:
                </div>
                <div className="flex flex-wrap gap-1">
                  {msg.suggestedQuestions.map((sq, sqIdx) => (
                    <button
                      key={sqIdx}
                      onClick={() => handleSendMessage(sq)}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-[11px] font-sans text-left transition-colors cursor-pointer shadow-xs"
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
          <div className="flex items-center gap-2 text-xs font-mono text-cobalt-600 p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Finding details from Mohan&apos;s portfolio...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white/60 backdrop-blur-md border-t border-white/80">
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
            placeholder="Ask about Mohan's projects, skills, or experience..."
            className="flex-1 px-3.5 py-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-xs font-sans focus:outline-none focus:border-cobalt-500 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputQuery.trim()}
            className="p-2 rounded-lg bg-cobalt-600 hover:bg-cobalt-700 text-white disabled:opacity-40 shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
