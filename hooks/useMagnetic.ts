"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export const useMagnetic = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xTo = gsap.quickTo(ref.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(ref.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = ref.current!.getBoundingClientRect();
      xTo((clientX - (left + width / 2)) * 0.4);
      yTo((clientY - (top + height / 2)) * 0.4);
    };
    const mouseLeave = () => { xTo(0); yTo(0); };

    ref.current?.addEventListener("mousemove", mouseMove);
    ref.current?.addEventListener("mouseleave", mouseLeave);
    return () => {
      ref.current?.removeEventListener("mousemove", mouseMove);
      ref.current?.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return ref;
};
