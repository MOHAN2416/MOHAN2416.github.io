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
    const SPACING = 36;
    const INFLUENCE_RADIUS = 165;

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
          // Illuminated in Cobalt (#2563EB)
          const alpha = 0.5 + proximity * 0.5;
          const radius = 1.3 + proximity * 1.6;

          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(37, 99, 235, ${alpha})`;
        } else {
          // Base fine architectural dot
          ctx.arc(dot.x, dot.y, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(71, 85, 105, 0.22)";
        }

        ctx.fill();
      }

      // Draw faint connecting vector lines between active nearby nodes (< 60px)
      ctx.lineWidth = 0.8;
      for (let i = 0; i < activeDots.length; i++) {
        for (let j = i + 1; j < activeDots.length; j++) {
          const d1 = activeDots[i];
          const d2 = activeDots[j];
          const distNodes = Math.hypot(d1.x - d2.x, d1.y - d2.y);
          if (distNodes < 60) {
            const lineAlpha = (1 - distNodes / 60) * 0.3;
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
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none bg-gradient-to-br from-[#DCE6F7] via-[#E4E9F8] to-[#D8E8F0]">
      {/* Ambient Gradient Mesh Refraction Ribbon */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#93C5FD]/45 via-[#A5B4FC]/40 to-[#6EE7B7]/35 blur-[90px] opacity-70 pointer-events-none" />

      {/* 5 High-Contrast Translucent Color Ribbons & Orbs (blur-[90px], enriched vibrancy) */}

      {/* 1. Vibrant Glacial Cyan (#7DD3FC) at top-left */}
      <motion.div
        className="absolute -top-[5%] left-[5%] w-[540px] h-[540px] rounded-full bg-gradient-to-br from-[#7DD3FC] via-[#38BDF8] to-[#93C5FD] blur-[90px] opacity-90 pointer-events-none"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -35, 25, 0],
          scale: [1, 1.08, 0.94, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 2. Rich Periwinkle Cobalt (#93C5FD / #818CF8) at top-right */}
      <motion.div
        className="absolute top-[8%] right-[8%] w-[580px] h-[580px] rounded-full bg-gradient-to-br from-[#93C5FD] via-[#818CF8] to-[#A5B4FC] blur-[90px] opacity-90 pointer-events-none"
        animate={{
          x: [0, -45, 30, 0],
          y: [0, 35, -30, 0],
          scale: [1, 0.95, 1.07, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3. Luminous Mint Emerald (#6EE7B7) at center-left */}
      <motion.div
        className="absolute top-[40%] left-[10%] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#6EE7B7] via-[#34D399] to-[#7DD3FC] blur-[90px] opacity-85 pointer-events-none"
        animate={{
          x: [0, 35, -40, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.06, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 4. Soft Violet Orchid (#C4B5FD) at center-right */}
      <motion.div
        className="absolute top-[52%] right-[8%] w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#C4B5FD] via-[#A78BFA] to-[#93C5FD] blur-[90px] opacity-90 pointer-events-none"
        animate={{
          x: [0, -35, 35, 0],
          y: [0, 40, -25, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 23,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 5. Sky Azure (#60A5FA) at bottom-center */}
      <motion.div
        className="absolute bottom-[5%] left-[28%] w-[620px] h-[460px] rounded-full bg-gradient-to-br from-[#60A5FA] via-[#818CF8] to-[#6EE7B7] blur-[90px] opacity-85 pointer-events-none"
        animate={{
          x: [0, 45, -35, 0],
          y: [0, -25, 35, 0],
          scale: [1, 1.05, 0.96, 1],
        }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Crisp Architectural Technical Blueprint Grid (48px lines in rgba(37, 99, 235, 0.11)) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(37, 99, 235, 0.11) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(37, 99, 235, 0.11) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Interactive Fine Dot-Grid Canvas Matrix with Magnetic Cursor Waves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
