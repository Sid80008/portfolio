# 3D Animation & Motion Design Spec & Implementation

## 1. Motion Tokens & Principles

```css
/* app/globals.css */
:root {
  /* Durations */
  --duration-micro: 300ms;
  --duration-component: 500ms;
  --duration-page: 800ms;

  /* Easings */
  --ease-entrance: cubic-bezier(0.05, 0.7, 0.1, 1);
  --ease-transition: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.9, 0, 0.95, 0.1);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 2. Global Page Transitions (Framer Motion)
```tsx
// components/motion/PageTransition.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ clipPath: "inset(0 0 100% 0)", filter: "blur(10px)" }}
        animate={{ clipPath: "inset(0 0 0% 0)", filter: "blur(0px)" }}
        exit={{ x: "-100%", opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="w-full h-full relative"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

## 3. WebGL Particle Background (Home Page)
```tsx
// components/motion/ParticleBackground.tsx
"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  const count = 800;
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Slow drift drift
    pointsRef.current.rotation.y += 0.0005;
    pointsRef.current.rotation.x -= 0.0002;

    // Mouse Parallax
    const targetX = (mouse.x * viewport.width) / 20;
    const targetY = (mouse.y * viewport.height) / 20;
    
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" sizeAttenuation transparent opacity={0.6} />
    </points>
  );
};

export default function Home3D() {
  return (
    <div className="absolute inset-0 -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <fog attach="fog" args={["#000", 2, 10]} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
```

## 4. Custom Cursor System
```tsx
// components/motion/CustomCursor.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // Media query check - only run on fine pointers
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || 
       !window.matchMedia("(pointer: fine)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      // Dot is instant
      gsap.to(cursorDot.current, { x: e.clientX, y: e.clientY, duration: 0 });
      // Ring lags slightly
      gsap.to(cursorRing.current, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) {
        gsap.to(cursorRing.current, { scale: 1.5, background: "rgba(255,255,255,0.1)", duration: 0.3 });
        gsap.to(cursorDot.current, { opacity: 0, duration: 0.1 });
      }
      const projectCard = target.closest("[data-cursor='view']");
      if (projectCard) {
         setCursorText("View");
         gsap.to(cursorRing.current, { width: 64, height: 64, borderRadius: "32px", duration: 0.3 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
       setCursorText("");
       gsap.to(cursorRing.current, { scale: 1, width: 32, height: 32, background: "transparent", duration: 0.3 });
       gsap.to(cursorDot.current, { opacity: 1, duration: 0.1 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseover", handleMouseOver);
      document.addEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={cursorDot} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference" />
      <div ref={cursorRing} className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] font-bold tracking-widest text-white mix-blend-difference">
        {cursorText}
      </div>
    </>
  );
}
```

## 5. Skills & Projects Stagger (Framer Motion)
```tsx
// components/motion/StaggeredList.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export function AnimatedGrid({ items, renderItem }: { items: any[], renderItem: (item: any) => React.ReactNode }) {
  return (
    <motion.ul variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.li key={item.id} variants={itemVariants} exit="exit" layoutId={`project-${item.id}`}>
            {renderItem(item)}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
```

## 6. Experience GSAP Timeline SVG
```tsx
// components/motion/Timeline.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceTimeline({ nodes }: { nodes: string[] }) {
  const lineRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !containerRef.current) return;
    
    // SVG Line Draw
    const length = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
    
    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      }
    });

    // Node pulse/slide in (requires refs on DOM nodes)
    const elements = gsap.utils.toArray('.timeline-node') as HTMLElement[];
    elements.forEach((el, i) => {
      gsap.fromTo(el, 
        { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
        { 
          opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: "top 80%" }
        }
      );
    });

  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-20">
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-2" preserveAspectRatio="none">
         <path ref={lineRef} d="M1 0 L1 1000" stroke="#444" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      {nodes.map((node, i) => (
        <div key={i} className={`timeline-node flex w-full mb-12 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
          <div className="w-5/12 bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-shadow duration-500">
             {node}
          </div>
        </div>
      ))}
    </div>
  );
}
```
