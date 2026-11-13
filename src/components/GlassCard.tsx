"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  index?: number;
}

export function GlassCard({
  children,
  className = "",
  enableTilt = true,
  index = 0,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Normalized cursor coordinates (-0.5 to 0.5)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Spring physics for buttery-smooth 3D inertia
  const springX = useSpring(normX, { stiffness: 260, damping: 24 });
  const springY = useSpring(normY, { stiffness: 260, damping: 24 });

  // Subtle 3D tilt: rotateX from 3.5deg to -3.5deg, rotateY from -3.5deg to 3.5deg
  const rotateX = useTransform(springY, [-0.5, 0.5], [3.5, -3.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3.5, 3.5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    if (enableTilt) {
      const nX = x / rect.width - 0.5;
      const nY = y / rect.height - 0.5;
      normX.set(nX);
      normY.set(nY);
    }
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    normX.set(0);
    normY.set(0);
  };

  return (
    <div className="perspective-[1200px] h-full w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{
          duration: 0.45,
          delay: Math.min(index * 0.05, 0.25),
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          rotateX: enableTilt ? rotateX : 0,
          rotateY: enableTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
          ...props.style,
        }}
        className={`group relative rounded-2xl bg-white/35 backdrop-blur-2xl backdrop-saturate-[200%] border-t border-l border-white/95 border-r border-b border-white/45 shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(37,99,235,0.08),0_16px_36px_-8px_rgba(15,23,42,0.12),0_4px_12px_-2px_rgba(37,99,235,0.08)] hover:bg-white/45 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(37,99,235,0.12),0_24px_48px_-10px_rgba(15,23,42,0.16),0_6px_16px_-2px_rgba(37,99,235,0.12)] hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col ${className}`}
        {...props}
      >
        {/* Layer 1: Diagonal Glossy Surface Sheen (Always Visible, Even Without Hover) */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-90 rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.22) 38%, rgba(255, 255, 255, 0.04) 65%, rgba(255, 255, 255, 0.28) 100%)",
          }}
        />

        {/* Layer 2: Interactive Glossy Cursor Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.85), rgba(147, 197, 253, 0.15) 40%, transparent 70%)`,
          }}
        />

        {/* Layer 3: 3D Beveled Specular Rim Lighting */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            border: `1.5px solid transparent`,
            backgroundImage: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.95), transparent 60%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Layer 4: Inner Card Content */}
        <div className="relative z-10 w-full h-full flex flex-col flex-1 justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Re-export as SpotlightCard for full backwards compatibility
export { GlassCard as SpotlightCard };
