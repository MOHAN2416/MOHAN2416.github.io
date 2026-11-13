"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedMetricNumberProps {
  value: string;
}

export function AnimatedMetricNumber({ value }: AnimatedMetricNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Parse numeric targets and format patterns
    if (value.includes("22,423")) {
      const target = 22423;
      const start = 0;
      const duration = 1200;
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out expo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(start + (target - start) * ease);
        setDisplayValue(`${current.toLocaleString("en-US")} SLOC`);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setDisplayValue("22,423 SLOC");
        }
      };
      requestAnimationFrame(update);
    } else if (value.includes("456 / 456")) {
      const target = 456;
      const duration = 1000;
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(target * ease);
        setDisplayValue(`${current} / 456`);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setDisplayValue("456 / 456");
        }
      };
      requestAnimationFrame(update);
    } else if (value.includes("800 ms")) {
      const target = 800;
      const duration = 1000;
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(target * ease);
        setDisplayValue(`~${current} ms`);

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          setDisplayValue("~800 ms");
        }
      };
      requestAnimationFrame(update);
    } else if (value.includes("1st Place")) {
      setDisplayValue("1st Place");
    } else {
      setDisplayValue(value);
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}</span>;
}
