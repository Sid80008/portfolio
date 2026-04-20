"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Send, 
  Cpu,
  Zap
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Project, Skill, Experience } from "@prisma/client";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { SearchParamsProvider } from "@/components/providers/SearchParamsProvider";

type View = "home" | "skills" | "projects" | "experience" | "contact";

interface MasterPortfolioProps {
  initialProjects?: Project[];
  initialSkills?: Skill[];
  initialExperiences?: Experience[];
}

// ─── 1. PARTICLE FIELD ──────────────────────────────────────────────────────

function Stardust() {
  const count = 75000;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    // Cosmic Palette
    const palette = [
        new THREE.Color("#A855F7"), // Purple
        new THREE.Color("#3B82F6"), // Blue
        new THREE.Color("#F59E0B"), // Amber
        new THREE.Color("#22D3EE"), // Cyan
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      const color = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const stardustRef = useRef<THREE.Points>(null!);
  useFrame((state, delta) => {
    if (stardustRef.current) {
      // Speed set to 0.9x
      stardustRef.current.rotation.x -= (delta * 0.9) / 20;
      stardustRef.current.rotation.y -= (delta * 0.9) / 25;
    }
  });

  return (
    <points ref={stardustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Particles({ isHovered }: { isHovered: boolean }) {
  const count = 2500;
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    // Color Palette for "Coloured Dust"
    const palette = [
        new THREE.Color("#A855F7"), // Purple
        new THREE.Color("#3B82F6"), // Blue
        new THREE.Color("#F59E0B"), // Amber
        new THREE.Color("#ffffff"), // Pure White
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // 70% Neutral/White, 30% Vibrant Dust
      const isDust = Math.random() > 0.7;
      const color = isDust 
        ? palette[Math.floor(Math.random() * 3)] 
        : palette[3];
        
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, []);

  const points = useRef<THREE.Points>(null!);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const posAttr = points.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      
      const factor = isHovered ? 0.02 : 0.05;
      posAttr[i * 3] += Math.sin(time + x) * factor;
      posAttr[i * 3 + 1] += Math.cos(time + y) * factor;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.y += 0.001;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}



// ─── 3. VIEWS ────────────────────────────────────────────────────────────────

const wrap = (children: React.ReactNode, key: string) => (
  <motion.div
    key={key}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="w-full"
  >
    {children}
  </motion.div>
);

// Home
function HomeView({ onNavigate, onHover }: { onNavigate: (v: View) => void, onHover: (h: boolean) => void }) {
  return wrap(
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-8"
      >
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-8">
            SIDDHARTH<br/>UMAJWAL
        </h1>
        <div className="flex flex-col items-center gap-6 mt-8">
            <span className="font-mono text-sm md:text-base uppercase tracking-[0.5em] text-white/40 font-bold">Creative Technologist</span>
            <div className="flex items-center justify-center gap-4 text-white/20 font-mono text-[10px] uppercase tracking-widest">
                <span className="flex items-center gap-2"><Cpu size={12}/> AI Integrated</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-2"><Zap size={12}/> High Performance</span>
            </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-white/40 max-w-xl text-lg mb-12 font-medium leading-relaxed"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        Engineering deep visual experiences through the intersection of advanced mathematics and premium design.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="flex flex-col md:flex-row items-center gap-4"
      >
        <button
          onClick={() => onNavigate("projects")}
          className="group px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center gap-3 hover:bg-white/90 active:scale-95 transition-all"
        >
          Explore Work <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => onNavigate("contact")}
          className="px-8 py-4 border border-white/10 hover:border-white/30 hover:bg-white/5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95"
        >
          Hire Me
        </button>
      </motion.div>
    </div>,
    "home"
  );
}

// Skills
function SkillsView({ skills }: { skills: Skill[] }) {
  const groupedSkills = useMemo(() => {
    const groups: Record<string, Skill[]> = {};
    skills.forEach(s => {
      if (!groups[s.category]) groups[s.category] = [];
      groups[s.category].push(s);
    });
    return groups;
  }, [skills]);

  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Expertise Stack</span>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 mt-4 italic">THE ARSENAL</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(groupedSkills).map(([category, items], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
            className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[32px] hover:border-white/30 transition-all duration-500"
          >
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-8">{category.replace('_', ' ')}</h3>
            <div className="flex flex-wrap gap-3">
              {items.map((skill) => (
                <div key={skill.id} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white hover:text-black transition-all duration-300">
                  {skill.name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>,
    "skills"
  );
}

// Projects
function ProjectsView({ projects }: { projects: Project[] }) {
  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 italic">SELECTED WORKS</h2>
        <p className="text-white/40 text-lg mb-12 max-w-2xl font-medium">A selection of premium interfaces and deep-engineering systems.</p>
      </motion.div>
      <Suspense fallback={<div className="animate-pulse py-20 text-center text-white/20 font-mono tracking-widest uppercase">Initializing Canvas...</div>}>
        <SearchParamsProvider>
          <ProjectGrid initialProjects={projects} />
        </SearchParamsProvider>
      </Suspense>
    </div>,
    "projects"
  );
}

// Experience
function ExperienceView({ experiences }: { experiences: Experience[] }) {
  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-16 italic">EVOLUTION</h2>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-white/30 via-white/5 to-transparent" />
        <div className="flex flex-col gap-16 pl-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -left-[57px] top-6 w-4 h-4 bg-white rounded-full transition-transform group-hover:scale-150" />
              <div className="bg-[#0a0a0a] border border-white/10 rounded-[32px] p-10 hover:border-white/30 transition-all duration-500">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-3xl font-black italic tracking-tighter mb-1">{exp.title}</h3>
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">{exp.org}</div>
                  </div>
                  <span className="font-mono text-xs text-white/20 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    {new Date(exp.startDate).getFullYear()} &mdash; {exp.current ? "PRESENT" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                  </span>
                </div>
                <p className="text-white/50 text-lg leading-relaxed max-w-3xl">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>,
    "experience"
  );
}

// Contact
function ContactView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (resp.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      {/* Upper Section: Text + Photo */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-16 mb-24">
        <div className="max-w-2xl">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 italic">LET&apos;S BUILD</h2>
          <p className="text-white/50 text-xl leading-relaxed font-medium">
            Ready to initiate a new project or collaboration? My system is currently open for high-engagement opportunities.
          </p>
        </div>
        <div className="relative w-72 h-72 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-white/5 rounded-[40px] rotate-6 border border-white/10" />
            <div className="absolute inset-0 bg-white/5 rounded-[40px] -rotate-3 border border-white/10" />
            <div className="relative w-full h-full bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img src="/myimage.png" alt="Siddharth" className="w-full h-full object-cover object-top opacity-80" />
            </div>
        </div>
      </div>

      {/* Lower Section: Full Width Form */}
      <div className="bg-[#0a0a0a] border border-white/10 p-12 lg:p-20 rounded-[48px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 ml-2">Identify Payload</label>
                    <input name="name" required type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 ml-2">Communication Channel</label>
                    <input name="email" required type="email" placeholder="email@address.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all" />
                </div>
            </div>
            <div className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30 ml-2">Signal Content</label>
                    <textarea name="message" required placeholder="Briefly describe your requirements..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 h-[168px] focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all resize-none" />
                </div>
            </div>
            
            <div className="md:col-span-2 flex flex-col items-center gap-6 mt-4">
                <button 
                  disabled={isSubmitting}
                  className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-white/90 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                    {isSubmitting ? 'Transmitting...' : 'Transmit Signal'} <Send size={16} />
                </button>
                {status === 'success' && <p className="text-emerald-400 font-mono text-[10px] uppercase tracking-widest">Signal transmitted successfully.</p>}
            </div>
        </form>
      </div>
    </div>,
    "contact"
  );
}

// ─── 4. MASTER ENGINE ────────────────────────────────────────────────────────

export default function MasterPortfolio({ 
  initialProjects = [], 
  initialSkills = [], 
  initialExperiences = [] 
}: MasterPortfolioProps) {
  const [view, setView] = useState<View>("home");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: "var(--font-space-grotesk, Inter, system-ui, sans-serif)" }}>
      <SiteCursor />

      {/* Persistent 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Stardust />
          <Particles isHovered={isHovered} />
        </Canvas>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full px-6 md:px-12 py-8 flex justify-between items-center z-50 mix-blend-difference">
        <button onClick={() => setView("home")} className="text-2xl font-black tracking-tighter hover:text-white/60 transition-colors italic">
          SID.
        </button>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.4em] font-mono text-white/30">
          {(["skills", "projects", "experience"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`hover:text-white transition-colors duration-500 relative py-2 ${view === v ? "text-white" : ""}`}
            >
              {v}
              {view === v && <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 w-full h-[1px] bg-white" />}
            </button>
          ))}
        </div>
        <button
          onClick={() => setView("contact")}
          className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${view === "contact" ? "bg-white text-black" : "border border-white/10 text-white/40 hover:border-white/30 hover:text-white"}`}
        >
          Initiate Contact
        </button>
      </nav>

      {/* Animated Views */}
      <main className="relative z-10 pt-24 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {view === "home" && <HomeView onNavigate={setView} onHover={setIsHovered} />}
            {view === "skills" && <SkillsView skills={initialSkills} />}
            {view === "projects" && <ProjectsView projects={initialProjects} />}
            {view === "experience" && <ExperienceView experiences={initialExperiences} />}
            {view === "contact" && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Subtle Noise */}
      <div className="fixed inset-0 pointer-events-none z-[80] opacity-[0.03] bg-[url('/noise.png')] bg-repeat" />
    </div>
  );
}
