"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hoveredState, setHoveredState] = useState<"default" | "pointer" | "view">("default");
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const hasInitialized = useRef(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics: stiffness: 420, damping: 28, mass: 0.4 for tight, crisp architectural tracking
  const springConfig = { stiffness: 420, damping: 28, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasInitialized.current) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        smoothX.set(e.clientX);
        smoothY.set(e.clientY);
        hasInitialized.current = true;
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }

      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for project card view state first
      const isExternalOrAction = target.closest("a[target='_blank'], button:not([data-cursor='view'])") !== null;
      const isView = target.closest('[data-cursor="view"]') !== null;

      if (isExternalOrAction) {
        setHoveredState("pointer");
      } else if (isView) {
        setHoveredState("view");
      } else {
        const isInteractive =
          target.closest("a, button, input, textarea, select, [role='button'], [data-cursor='pointer'], .cursor-pointer") !==
          null;
        setHoveredState(isInteractive ? "pointer" : "default");
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, smoothX, smoothY, visible]);

  if (!enabled || !visible) return null;

  const isView = hoveredState === "view";
  const isPointer = hoveredState === "pointer";

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center select-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        filter: "none",
        boxShadow: "none",
      }}
      animate={{
        width: isView ? 76 : isPointer ? 40 : 24,
        height: isView ? 26 : isPointer ? 40 : 24,
        borderRadius: 9999,
        borderColor: isView ? "#18181B" : isPointer ? "#2563EB" : "#18181B",
        borderWidth: "1.5px",
        borderStyle: "solid",
        backgroundColor: isView
          ? "#18181B"
          : isPointer
          ? "rgba(37, 99, 235, 0.06)"
          : "transparent",
        scale: isMouseDown ? 0.85 : 1,
      }}
      transition={{
        width: { duration: 0.16, ease: "easeOut" },
        height: { duration: 0.16, ease: "easeOut" },
        borderRadius: { duration: 0.16 },
        borderColor: { duration: 0.12 },
        backgroundColor: { duration: 0.12 },
        scale: { duration: 0.08 },
      }}
    >
      {isView && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.1 }}
          className="text-[10px] font-mono font-medium tracking-wider text-white whitespace-nowrap px-2 select-none"
        >
          OPEN ↗
        </motion.span>
      )}
    </motion.div>
  );
}
