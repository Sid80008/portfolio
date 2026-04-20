"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Project, Skill, Experience } from "@prisma/client";
import { Particles } from "@/components/canvas/ParticleField";
import ProjectGrid from "@/components/projects/ProjectGrid";

type View = "home" | "skills" | "projects" | "experience" | "contact";

interface MasterPortfolioProps {
  initialProjects?: Project[];
  initialSkills?: Skill[];
  initialExperiences?: Experience[];
}

// ─── 1. SITE CURSOR ─────────────────────────────────────────────────────────
function SiteCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
      }}
      transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.5 }}
    >
      <div className="w-full h-full border border-white rounded-full flex items-center justify-center">
        <div className="w-1 h-1 bg-white rounded-full" />
      </div>
    </motion.div>
  );
}

// ─── 2. VIEW WRAPPER ────────────────────────────────────────────────────────
function wrap(children: React.ReactNode, id: string) {
  return (
    <motion.section
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="relative z-10"
    >
      {children}
    </motion.section>
  );
}

// ─── 3. RESILIENT SOCIAL ICONS (SVG) ─────────────────────────────────────────
const GithubSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterSVG = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

// ─── 4. SUB-VIEWS ──────────────────────────────────────────────────────────

function HomeView({ onNavigate, onHover }: { onNavigate: (v: View) => void; onHover: (h: boolean) => void }) {
  return wrap(
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-4"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/40 block mb-4">Integrated Creative Engineer</span>
        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] italic uppercase">
          Siddharth<br />
          <span className="text-white/20">Umajwal</span>
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-center gap-10 pt-12">
          <p className="text-white/40 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
            Architecting high-performance digital ecosystems where deep engineering meets premium visual aesthetics.
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={() => onNavigate("projects")}
              className="px-8 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full hover:bg-white/90 transition-all flex items-center gap-3 group cursor-none"
            >
              The Repository
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="px-8 py-4 border border-white/20 text-white font-black uppercase text-xs tracking-widest rounded-full hover:border-white/60 transition-all cursor-none"
            >
              Hire Me
            </button>
          </div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-10 left-16 flex gap-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
        <span>Neon DB Connected</span>
        <span>Resend Operational</span>
        <span>Sentry Live</span>
      </div>
    </div>,
    "home"
  );
}

function SkillsView({ skills }: { skills: Skill[] }) {
  const groupedSkills = useMemo(() => {
    const groups: Record<string, Skill[]> = {};
    skills.forEach(s => {
      const cat = s.category || "UNSPECIFIED";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s);
    });
    return groups;
  }, [skills]);

  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">The Arsenal</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 mt-2">Technical Mastery</h2>
        <p className="text-white/40 text-lg mb-12 max-w-2xl">
          A comprehensive overview of the specialized tools and languages I deploy.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedSkills).map(([category, items], i) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col gap-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-black uppercase tracking-widest text-white/80">{category.replace('_', ' ')}</h3>
            <div className="h-px w-full bg-white/10" />
            <ul className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <li key={skill.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/70">
                  {skill.name}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>,
    "skills"
  );
}

function ProjectsView({ projects }: { projects: Project[] }) {
  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">Selected Works</h2>
        <p className="text-white/40 text-lg mb-8 max-w-2xl">
          A curated intersection of deep engineering and premium visual design.
        </p>
      </motion.div>
      <Suspense fallback={<div className="animate-pulse py-20 text-center text-white/20 font-mono tracking-widest uppercase">Initializing Projects...</div>}>
          <ProjectGrid initialProjects={projects} />
      </Suspense>
    </div>,
    "projects"
  );
}

function ExperienceView({ experiences }: { experiences: Experience[] }) {
  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">The Timeline</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 mt-2">Experience &amp; Evolution</h2>
      </motion.div>

      <div className="relative mt-20">
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
        <div className="flex flex-col gap-14 pl-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="relative"
            >
              <div className="absolute -left-[47px] top-5 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]" />
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md hover:border-white/30 transition-colors duration-500">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <h3 className="text-2xl font-black uppercase italic">{exp.title}</h3>
                  <span className="font-mono text-sm text-white/40">
                    {new Date(exp.startDate).getFullYear()} – {exp.current ? "Present" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                  </span>
                </div>
                <p className="text-white/50 leading-relaxed max-w-3xl">{exp.description}</p>
                <div className="mt-4 text-xs font-mono text-white/20 uppercase tracking-[0.3em]">{exp.org}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>,
    "experience"
  );
}

function ContactView() {
  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl text-center space-y-8"
      >
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase underline decoration-white/10 underline-offset-8">Let&apos;s Work.</h2>
        <p className="text-white/40 text-xl font-medium">Ready to architect your next high-performance ecosystem?</p>
        <div className="pt-10 flex flex-col items-center gap-4">
          <a href="mailto:siddharthumajwal@gmail.com" className="text-3xl md:text-5xl font-black tracking-tight hover:text-white/60 transition-all lowercase cursor-none">
            siddharthumajwal@gmail.com
          </a>
          <div className="flex gap-10 pt-10 text-white/20">
             <a href="#" className="hover:text-white transition-colors cursor-none"><GithubSVG /></a>
             <a href="#" className="hover:text-white transition-colors cursor-none"><LinkedinSVG /></a>
             <a href="#" className="hover:text-white transition-colors cursor-none"><TwitterSVG /></a>
          </div>
        </div>
      </motion.div>
    </div>,
    "contact"
  );
}

// ─── 5. MASTER ENGINE ────────────────────────────────────────────────────────
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
          <Particles isHovered={isHovered} />
        </Canvas>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50">
        <button onClick={() => setView("home")} className="text-xl font-black tracking-tighter hover:text-white/60 transition-colors cursor-none">
          SID.
        </button>
        <div className="flex gap-4 md:gap-8 text-[10px] md:text-xs uppercase tracking-widest text-white/40 font-bold">
          {(["home", "skills", "projects", "experience"] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`hover:text-white transition-colors duration-300 cursor-none ${view === v ? "text-white" : ""}`}
            >
              {v}
            </button>
          ))}
        </div>
        <button
          onClick={() => setView("contact")}
          className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-colors duration-300 cursor-none ${view === "contact" ? "bg-white text-black underline underline-offset-4" : "border border-white/20 text-white/60 hover:border-white/60 hover:text-white"}`}
        >
          Hire Me
        </button>
      </nav>

      {/* Animated Views */}
      <main className="relative z-10 pt-20 w-full" onMouseEnter={view === "home" ? () => setIsHovered(true) : undefined} onMouseLeave={view === "home" ? () => setIsHovered(false) : undefined}>
        <AnimatePresence mode="wait">
          {view === "home" && <HomeView key="home" onNavigate={setView} onHover={setIsHovered} />}
          {view === "skills" && <SkillsView key="skills" skills={initialSkills} />}
          {view === "projects" && <ProjectsView key="projects" projects={initialProjects} />}
          {view === "experience" && <ExperienceView key="experience" experiences={initialExperiences} />}
          {view === "contact" && <ContactView key="contact" />}
        </AnimatePresence>
      </main>
    </div>
  );
}
