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

  // Subtle 3D tilt: rotateX from 3deg to -3deg, rotateY from -3deg to 3deg
  const rotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-3, 3]);

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
        initial={{ opacity: 0, y: 16 }}
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
        className={`group relative rounded-2xl bg-white/55 backdrop-blur-2xl backdrop-saturate-[180%] border border-white/85 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(255,255,255,0.4),0_10px_30px_-10px_rgba(15,23,42,0.08),0_4px_12px_-4px_rgba(37,99,235,0.05)] hover:bg-white/70 hover:border-white hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_20px_40px_-12px_rgba(15,23,42,0.12),0_8px_20px_-6px_rgba(37,99,235,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden ${className}`}
        {...props}
      >
        {/* Glossy specular light sheen overlay following cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(500px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.75), rgba(37, 99, 235, 0.06) 35%, transparent 65%)`,
          }}
        />

        {/* 3D Glass rim accent */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            border: `1.5px solid transparent`,
            backgroundImage: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.9), transparent 60%)`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Inner Card Content */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// Re-export as SpotlightCard for full backwards compatibility
export { GlassCard as SpotlightCard };
