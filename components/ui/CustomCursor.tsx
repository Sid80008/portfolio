"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xSet = gsap.quickSetter(dot, "x", "px");
    const ySet = gsap.quickSetter(dot, "y", "px");

    const move = (e: MouseEvent) => {
      xSet(e.clientX);
      ySet(e.clientY);
      gsap.to(ring, { x: e.clientX - 16, y: e.clientY - 16, duration: 0.15, ease: "power2.out" });
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = !!target.closest('button, a, .skill-chip, .project-card, [data-cursor="hover"]');
      setIsInteractive(interactive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className={`fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] transition-opacity duration-200 ${isInteractive ? 'opacity-0' : 'opacity-100'}`} 
      />
      <div 
        ref={ringRef} 
        className={`fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998] transition-transform duration-300 ${isInteractive ? 'scale-[2.5]' : 'scale-100'}`} 
      />
    </>
  );
};
