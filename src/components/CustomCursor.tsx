"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoveredState, setHoveredState] = useState<"default" | "pointer" | "view">("default");
  const [visible, setVisible] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer trailing ring
  const springConfig = { stiffness: 250, damping: 22 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isView = target.closest('[data-cursor="view"]') !== null;
      if (isView) {
        setHoveredState("view");
        return;
      }

      const isInteractive =
        target.closest("a, button, input, textarea, select, [role='button'], [data-cursor='pointer'], .cursor-pointer") !==
        null;

      if (isInteractive) {
        setHoveredState("pointer");
      } else {
        setHoveredState("default");
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, visible]);

  if (!enabled || !visible) return null;

  const isView = hoveredState === "view";
  const isPointer = hoveredState === "pointer";

  const ringSize = isView ? 64 : isPointer ? 54 : 36;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. Inner Precision Dot (8px) - Tracks instantaneously */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cobalt-600 shadow-xs pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isView ? 0 : isPointer ? 0.6 : 1,
          opacity: isView ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 2. Outer Magnetic Trailing Ring (36px / 54px / 64px) - Smooth spring interpolation */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none backdrop-blur-[2px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: ringSize,
          height: ringSize,
        }}
        animate={{
          borderColor: isView
            ? "rgba(37, 99, 235, 0.8)"
            : isPointer
            ? "rgba(37, 99, 235, 0.6)"
            : "rgba(37, 99, 235, 0.35)",
          backgroundColor: isView
            ? "rgba(37, 99, 235, 0.12)"
            : isPointer
            ? "rgba(37, 99, 235, 0.08)"
            : "rgba(37, 99, 235, 0)",
          borderWidth: isView ? "1.5px" : "1.5px",
        }}
        transition={{ duration: 0.2 }}
      >
        {isView && (
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono font-bold tracking-widest text-cobalt-700"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
