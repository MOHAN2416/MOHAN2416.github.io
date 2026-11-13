"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    const SPACING = 28;
    const INFLUENCE_RADIUS = 160;

    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-initialize dot grid
      dots = [];
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * SPACING;
          const by = r * SPACING;
          dots.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      const activeDots: Dot[] = [];

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Compute vector from mouse to dot
        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE_RADIUS && dist > 0) {
          // Magnetic wave displacement
          const force = (1 - dist / INFLUENCE_RADIUS) * 14;
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * force;
          const pushY = Math.sin(angle) * force;

          dot.vx += (dot.baseX + pushX - dot.x) * 0.2;
          dot.vy += (dot.baseY + pushY - dot.y) * 0.2;
          activeDots.push(dot);
        } else {
          // Spring back to base position
          dot.vx += (dot.baseX - dot.x) * 0.1;
          dot.vy += (dot.baseY - dot.y) * 0.1;
        }

        dot.vx *= 0.75;
        dot.vy *= 0.75;
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Draw dot
        const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS);
        ctx.beginPath();

        if (proximity > 0) {
          // Illuminated dot (Cobalt or Emerald based on position)
          const isEmerald = (i % 7 === 0);
          const r = isEmerald ? 16 : 37;
          const g = isEmerald ? 185 : 99;
          const b = isEmerald ? 129 : 235;
          const alpha = 0.35 + proximity * 0.65;
          const radius = 1.3 + proximity * 1.5;

          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        } else {
          // Base static architectural dot
          ctx.arc(dot.x, dot.y, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(203, 213, 225, 0.65)";
        }

        ctx.fill();
      }

      // Draw faint connecting vector lines between active nearby nodes (< 65px)
      ctx.lineWidth = 0.8;
      for (let i = 0; i < activeDots.length; i++) {
        for (let j = i + 1; j < activeDots.length; j++) {
          const d1 = activeDots[i];
          const d2 = activeDots[j];
          const distNodes = Math.hypot(d1.x - d2.x, d1.y - d2.y);
          if (distNodes < 60) {
            const lineAlpha = (1 - distNodes / 60) * 0.25;
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none">
      {/* 1. Floating Ambient Mesh Radial Orbs (18s continuous fluid loop) */}
      <motion.div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-blue-200/40 via-blue-100/30 to-transparent blur-3xl pointer-events-none"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[35%] -right-[15%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-indigo-200/35 via-sky-100/30 to-transparent blur-3xl pointer-events-none"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-[10%] left-[20%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-emerald-100/40 via-teal-50/20 to-transparent blur-3xl pointer-events-none"
        animate={{
          x: [0, 35, -40, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.05, 0.96, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Interactive High-DPI HTML5 Architectural Canvas Matrix */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
