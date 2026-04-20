"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";

// --- TYPES ---
type View = "home" | "skills" | "projects" | "experience";

// --- 1. THE 3D CORE ---
function ParticleField({ isHovered }: { isHovered: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 800;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 15;
      col[i] = Math.random();
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { mouse } = state;
    const targetX = isHovered ? mouse.x * 8 : mouse.x * 2;
    const targetY = isHovered ? mouse.y * 8 : mouse.y * 2;
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, targetX, 0.05);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, targetY, 0.05);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// --- 2. CURSOR ---
function DemoCursor() {
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
      if (target.closest(".project-card")) {
        gsap.to(ring, { scale: 4, opacity: 0, duration: 0.3 });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
        setIsInteractive(false);
      } else if (target.closest("button, a")) {
        gsap.to(ring, { scale: 2, opacity: 1, duration: 0.3 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
        setIsInteractive(true);
      } else {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
        setIsInteractive(false);
      }
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
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]" />
      <div ref={ringRef} className="fixed top-0 left-0 w-8 h-8 border border-white/50 rounded-full pointer-events-none z-[9998]" />
    </>
  );
}

// --- 3. VIEWS ---
const HomeView = ({ onNavigate, onHover }: { onNavigate: (v: View) => void; onHover: (h: boolean) => void }) => (
  <motion.div
    key="home"
    initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
    animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
    exit={{ opacity: 0, clipPath: "inset(100% 0 0% 0)" }}
    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    className="flex flex-col items-center justify-center h-screen text-center px-8"
  >
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
    >
      <span className="text-sm font-mono text-white/60">🎬 DEMO — Option B: SPA Style</span>
    </motion.div>
    <h1
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="text-7xl md:text-9xl font-black tracking-tighter mb-4 cursor-default select-none"
    >
      SIDDHARTH <span className="text-white/30">DESIGN</span>
    </h1>
    <p className="text-white/50 text-xl mb-12 font-mono">Creative Technologist · Particles converge on hover ↑</p>
    <div className="flex gap-4 flex-wrap justify-center">
      {(["skills", "projects", "experience"] as View[]).map((v) => (
        <button
          key={v}
          onClick={() => onNavigate(v)}
          className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors capitalize font-mono text-sm"
        >
          {v}
        </button>
      ))}
    </div>
  </motion.div>
);

const SkillsView = () => {
  const skills = ["WebGL", "Three.js", "GSAP", "Framer Motion", "React", "Next.js", "TypeScript", "Python", "Figma", "Adobe Suite"];
  return (
    <motion.div
      key="skills"
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, clipPath: "inset(100% 0 0% 0)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="p-12 md:p-20 h-screen flex flex-col justify-center"
    >
      <motion.h2 initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-5xl md:text-6xl mb-12 font-black tracking-tighter">
        Expertise
      </motion.h2>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.6)" }}
            className="skill-chip px-8 py-3 rounded-full border border-white/20 text-lg md:text-xl cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const ProjectsView = () => {
  const projects = [
    { title: "Portfolio System", tag: "Next.js · WebGL" },
    { title: "Motion Engine", tag: "GSAP · Framer" },
    { title: "AI Assistant", tag: "Python · Genkit" },
    { title: "Brand Design", tag: "Figma · Adobe" },
  ];
  return (
    <motion.div
      key="projects"
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, clipPath: "inset(100% 0 0% 0)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="p-12 md:p-20 h-screen overflow-y-auto"
    >
      <motion.h2 initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-5xl md:text-6xl mb-12 font-black tracking-tighter">
        Selected Works
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            whileHover={{ y: -8, borderColor: "rgba(255,255,255,0.3)" }}
            className="project-card h-60 bg-white/5 rounded-2xl border border-white/10 p-8 flex flex-col justify-between group cursor-pointer overflow-hidden relative"
          >
            <span className="font-mono text-xs text-white/30 uppercase tracking-widest">{p.tag}</span>
            <h3 className="text-2xl md:text-3xl font-black group-hover:translate-x-2 transition-transform duration-300">{p.title}</h3>
            <span className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-mono uppercase tracking-widest text-white/60">View →</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ExperienceView = () => {
  const items = [
    { role: "Creative Director", org: "Freelance Studio", period: "2024 – Present" },
    { role: "Full Stack Developer", org: "NIT Hamirpur", period: "2023 – 2024" },
    { role: "Graphic Designer", org: "Agency Projects", period: "2022 – 2023" },
  ];
  return (
    <motion.div
      key="experience"
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      exit={{ opacity: 0, clipPath: "inset(100% 0 0% 0)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="p-12 md:p-20 h-screen relative overflow-auto"
    >
      <motion.h2 initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-5xl md:text-6xl mb-16 font-black tracking-tighter">
        Journey
      </motion.h2>
      <div className="relative">
        <div className="absolute left-0 top-0 w-[2px] h-full bg-white/10" />
        {items.map((item, i) => (
          <motion.div
            key={item.role}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="relative pl-10 mb-14"
          >
            <div className="w-4 h-4 bg-white rounded-full absolute -left-[7px] top-2 shadow-[0_0_15px_white]" />
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
              <h4 className="text-2xl font-black">{item.role}</h4>
              <p className="text-white/40 mt-1 font-mono text-sm">{item.org} · {item.period}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- 4. MASTER ENGINE ---
export default function DemoPage() {
  const [view, setView] = useState<View>("home");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden cursor-none" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
      <DemoCursor />

      {/* Persistent 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ParticleField isHovered={isHovered} />
        </Canvas>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full px-8 py-6 flex justify-between items-center z-50">
        <button onClick={() => setView("home")} className="text-xl font-black tracking-tighter hover:text-white/60 transition-colors">
          SID.
        </button>
        <div className="flex gap-6 md:gap-10 text-xs uppercase tracking-widest text-white/40">
          {(["home", "skills", "projects", "experience"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`hover:text-white transition-colors duration-300 ${view === v ? "text-white" : ""}`}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="text-xs font-mono text-white/20 hidden md:block">Option B</div>
      </nav>

      {/* Animated Views */}
      <main className="relative z-10 h-full w-full" onMouseEnter={view === "home" ? () => setIsHovered(true) : undefined} onMouseLeave={view === "home" ? () => setIsHovered(false) : undefined}>
        <AnimatePresence mode="wait">
          {view === "home" && <HomeView key="home" onNavigate={setView} onHover={setIsHovered} />}
          {view === "skills" && <SkillsView key="skills" />}
          {view === "projects" && <ProjectsView key="projects" />}
          {view === "experience" && <ExperienceView key="experience" />}
        </AnimatePresence>
      </main>

      {/* Badge */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
        <span className="text-xs font-mono text-white/60">← Back to your portfolio: <a href="http://localhost:3000" className="text-white underline">localhost:3000</a></span>
      </div>
    </div>
  );
}
