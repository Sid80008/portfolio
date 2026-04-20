"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2 });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2 });
    const ringXTo = gsap.quickTo(ringRef.current, "x", { duration: 0.4 });
    const ringYTo = gsap.quickTo(ringRef.current, "y", { duration: 0.4 });

    window.addEventListener("mousemove", (e) => {
      xTo(e.clientX); yTo(e.clientY);
      ringXTo(e.clientX); ringYTo(e.clientY);
    });

    const handleMouseEnter = () => {
      gsap.to(ringRef.current, { width: 80, height: 80, backgroundColor: "white", mixBlendMode: "difference", duration: 0.3 });
    };
    const handleMouseLeave = () => {
      gsap.to(ringRef.current, { width: 32, height: 32, backgroundColor: "transparent", duration: 0.3 });
    };

    document.querySelectorAll('[data-cursor="hover"]').forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div ref={ringRef} className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
    </>
  );
};
