"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    // Only run if the user has fine pointing device and doesn't prefer reduced motion
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const pill = pillRef.current;
    
    if (!dot || !ring || !pill) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let isActive = true;

    // Instant tracking for the dot
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot) {
        dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
      }
    };

    // Smooth Lerp loop for the ring/pill
    const loop = () => {
      if (!isActive) return;
      rx += (mx - rx) * 0.12; // 12% lerp per frame -> approx 100ms lag
      ry += (my - ry) * 0.12;
      
      const translateStr = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
      if (ring) ring.style.transform = translateStr;
      if (pill) pill.style.transform = `${translateStr} scale(var(--pill-scale, 0))`;
      
      requestAnimationFrame(loop);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest("a, button, input, [role='button']")) {
        // Expand ring, hide dot
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.borderColor = "rgba(196, 192, 255, 0.8)";
        dot.style.opacity = "0";
        dot.style.width = "0";
        dot.style.height = "0";
      } else if (target.closest("[data-cursor='view']")) {
        // Show View Pill, hide ring and dot
        ring.style.opacity = "0";
        dot.style.opacity = "0";
        pill.style.setProperty("--pill-scale", "1");
      } else {
        // Reset
        ring.style.width = "32px";
        ring.style.height = "32px";
        ring.style.borderColor = "rgba(196, 192, 255, 0.5)";
        ring.style.opacity = "1";
        dot.style.opacity = "1";
        dot.style.width = "8px";
        dot.style.height = "8px";
        pill.style.setProperty("--pill-scale", "0");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    requestAnimationFrame(loop);

    setIsInteractive(true);

    return () => {
      isActive = false;
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isInteractive) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[100] transition-all duration-[300ms] ease-out mix-blend-difference"
        style={{ backgroundColor: "#c4c0ff" }}
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[90] transition-all duration-[500ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] mix-blend-difference"
        style={{ borderColor: "rgba(196, 192, 255, 0.5)" }}
      />
      <div 
        ref={pillRef} 
        className="fixed top-0 left-0 px-3 py-1.5 rounded-full pointer-events-none z-[100] font-mono text-[9px] uppercase tracking-widest text-background transition-transform duration-[300ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ backgroundColor: "#c4c0ff", "--pill-scale": 0 } as React.CSSProperties}
      >
        View →
      </div>
    </>
  );
}
