"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export const Timeline = () => {
  const pathRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pathRef.current,
      { strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: "#timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
        }
      }
    );
  }, []);

  return (
    <div id="timeline-container" className="relative py-40">
      <svg className="absolute left-1/2 -translate-x-1/2 h-full w-2" viewBox="0 0 2 1000">
        <path ref={pathRef} d="M1 0V1000" stroke="white" strokeWidth="2" strokeDasharray="1000" />
      </svg>
    </div>
  );
};
