"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { SearchParamsProvider } from "@/components/layout/SearchParamsProvider";

gsap.registerPlugin(ScrollTrigger);

type View = "home" | "skills" | "projects" | "experience" | "contact";

// ─── 1. PARTICLE FIELD ──────────────────────────────────────────────────────
function Particles({ isHovered }: { isHovered: boolean }) {
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

// ─── 2. CURSOR ──────────────────────────────────────────────────────────────
function SiteCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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
      } else if (target.closest("button, a, input, textarea")) {
        gsap.to(ring, { scale: 2, opacity: 1, duration: 0.3 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
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

// ─── 3. VIEWS ────────────────────────────────────────────────────────────────
const wrap = (content: React.ReactNode, key: string) => (
  <motion.div
    key={key}
    initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
    animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
    exit={{ opacity: 0, clipPath: "inset(100% 0 0% 0)" }}
    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    className="w-full"
  >
    {content}
  </motion.div>
);

// Home
function HomeView({ onNavigate, onHover }: { onNavigate: (v: View) => void; onHover: (h: boolean) => void }) {
  return wrap(
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
      >
        <span className="text-sm font-mono text-white/60">Status: Available for opportunities</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        className="text-7xl md:text-9xl font-black tracking-tighter mb-4 cursor-default leading-none select-none"
      >
        SIDDHARTH <span className="text-white/20">UMAJWAL</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex items-center gap-4 mb-12"
      >
        <div className="h-px w-12 bg-white/30" />
        <p className="font-mono text-sm md:text-base text-white/50 uppercase tracking-widest">
          Creative Technologist <span className="text-white/20 mx-2">|</span> Freelancer <span className="text-white/20 mx-2">|</span> Athlete
        </p>
        <div className="h-px w-12 bg-white/30" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        className="flex gap-4 flex-wrap justify-center"
      >
        {(["skills", "projects", "experience"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => onNavigate(v)}
            className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors capitalize font-mono text-sm"
          >
            {v}
          </button>
        ))}
        <button
          onClick={() => onNavigate("contact")}
          className="px-6 py-2 bg-white text-black rounded-full hover:bg-white/80 transition-colors capitalize font-mono text-sm font-bold"
        >
          Hire Me
        </button>
      </motion.div>
    </div>,
    "home"
  );
}

// Skills
function SkillsView() {
  const domains = [
    {
      title: "Full-Stack Engineering",
      icon: "⌨️",
      description: "Architecting scalable backend services and responsive client architectures with strict typing.",
      skills: ["React 18 / Next.js 14", "TypeScript / Node.js", "PostgreSQL / Prisma", "GraphQL / REST APIs", "Tailwind CSS"],
    },
    {
      title: "Graphic Design",
      icon: "🎨",
      description: "Gaining hands-on experience through internships and personal projects.",
      skills: ["Adobe Illustrator", "Photoshop", "Figma", "Premiere Pro", "After Effects"],
    },
    {
      title: "Systems Architecture",
      icon: "🗂️",
      description: "Designing resilient cloud infrastructure, CI/CD pipelines, and microservice architectures.",
      skills: ["Docker / Cloud", "Vercel / AWS", "CI/CD Actions", "System Design", "Performance Optimization"],
    },
  ];

  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">The Arsenal</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 mt-2">Technical Mastery</h2>
        <p className="text-white/40 text-lg mb-12 max-w-2xl">
          A comprehensive overview of the languages, frameworks, and methodologies I deploy to engineer digital products.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {domains.map((domain, i) => (
          <motion.div
            key={domain.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            whileHover={{ y: -6, borderColor: "rgba(255,255,255,0.3)" }}
            className="skill-chip bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col gap-6"
          >
            <div className="text-3xl">{domain.icon}</div>
            <div>
              <h3 className="text-xl font-black mb-2">{domain.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{domain.description}</p>
            </div>
            <div className="h-px w-full bg-white/10" />
            <ul className="flex flex-col gap-2">
              {domain.skills.map((skill) => (
                <li key={skill} className="flex items-center gap-3 text-sm font-mono text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  {skill}
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

// Projects
function ProjectsView() {
  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">Selected Works</h2>
        <p className="text-white/40 text-lg mb-8 max-w-2xl">
          A curated intersection of deep engineering and premium visual design.
        </p>
      </motion.div>
      <Suspense fallback={<div className="animate-pulse py-20 text-center text-white/20 font-mono tracking-widest uppercase">Initializing Canvas...</div>}>
        <SearchParamsProvider>
          <ProjectGrid />
        </SearchParamsProvider>
      </Suspense>
    </div>,
    "projects"
  );
}

// Experience
function ExperienceView() {
  const experiences = [
    {
      role: "Internship & Personal Projects",
      description: "Gaining hands-on experience through internships and personal projects across full-stack engineering and design.",
      time: "2025 – Present",
    },
    {
      role: "Graphic Design",
      description: "Proficient in Adobe Illustrator, Photoshop, Figma, Premiere Pro, and After Effects. Delivering brand identities and multimedia assets.",
      time: "2025 – Present",
    },
  ];

  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">The Timeline</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 mt-2">Experience &amp; Evolution</h2>
        <p className="text-white/40 text-lg mb-12 max-w-2xl">
          A chronological mapping of my professional journey.
        </p>
      </motion.div>

      <div className="relative">
        <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
        <div className="flex flex-col gap-14 pl-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="relative"
            >
              <div className="absolute -left-[47px] top-5 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]" />
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md hover:border-white/30 transition-colors duration-500">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                  <h3 className="text-2xl font-black">{exp.role}</h3>
                  <span className="font-mono text-sm text-white/40">{exp.time}</span>
                </div>
                <p className="text-white/50 leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>,
    "experience"
  );
}

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactFormValues = z.infer<typeof contactSchema>;

// Contact / Hire Me
function ContactView() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed");
      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return wrap(
    <div className="min-h-[calc(100vh-80px)] px-6 md:px-16 py-16 max-w-7xl mx-auto w-full">
      {/* Top: Text + Photo */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-16">
        {/* Left: Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col gap-8 lg:w-1/2"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">Transmission</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
            Let&apos;s build<br />something<br /><span className="text-white/20">exceptional.</span>
          </h2>
          <p className="text-white/50 text-lg font-light leading-relaxed max-w-md">
            Whether it&apos;s a complex web application, a cinematic promotional site, or a scalable backend architecture—reach out.
          </p>
          <div className="flex flex-col gap-4 border-t border-white/10 pt-8">
            <a href="mailto:siddharthumajwal@gmail.com" className="font-mono text-sm text-white/50 hover:text-white transition-colors">
              📧 siddharthumajwal@gmail.com
            </a>
            <a href="tel:+918000819558" className="font-mono text-sm text-white/50 hover:text-white transition-colors">
              📞 +91 8000819558
            </a>
            <a href="https://instagram.com/professional.sid" target="_blank" rel="noopener noreferrer" className="font-mono text-sm text-white/50 hover:text-white transition-colors">
              📷 @professional.sid
            </a>
            <span className="font-mono text-sm text-white/50">📍 NIT Hamirpur, India / Remote</span>
          </div>
        </motion.div>

        {/* Right: Photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="lg:w-1/2 flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)]">
            <Image src="/myimage.png" alt="Siddharth Umajwal" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Bottom: Full-width Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="w-full bg-white/5 border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at top right, #c4c0ff 0%, transparent 60%)" }} />
        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Name */}
          <div className="relative group">
            <input type="text" id="name2" {...register("name")}
              className="w-full bg-transparent border-b-2 border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer"
              placeholder=" " />
            <label htmlFor="name2" className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs pointer-events-none">Name</label>
            {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="relative group">
            <input type="email" id="email2" {...register("email")}
              className="w-full bg-transparent border-b-2 border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer"
              placeholder=" " />
            <label htmlFor="email2" className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs pointer-events-none">Email</label>
            {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>}
          </div>

          {/* Subject - full width */}
          <div className="relative group md:col-span-2">
            <input type="text" id="subject2" {...register("subject")}
              className="w-full bg-transparent border-b-2 border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer"
              placeholder=" " />
            <label htmlFor="subject2" className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs pointer-events-none">Subject</label>
            {errors.subject && <p className="text-red-400 text-xs mt-2">{errors.subject.message}</p>}
          </div>

          {/* Message - full width */}
          <div className="relative group md:col-span-2">
            <textarea id="message2" rows={5} {...register("message")}
              className="w-full bg-transparent border-b-2 border-white/20 py-4 text-white focus:outline-none focus:border-white transition-colors peer resize-none"
              placeholder=" " />
            <label htmlFor="message2" className="absolute left-0 top-4 text-white/40 text-lg transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs pointer-events-none">Message</label>
            {errors.message && <p className="text-red-400 text-xs mt-2">{errors.message.message}</p>}
          </div>

          <div className="md:col-span-2 flex flex-col gap-4">
            {submitStatus === "success" && <p className="text-green-400 text-sm">Message transmitted successfully. I will reach out soon.</p>}
            {submitStatus === "error" && <p className="text-red-400 text-sm">Transmission failed. Please try again or use direct email.</p>}
            <button type="submit" disabled={isSubmitting}
              className="self-start px-10 py-4 bg-white text-black font-black rounded-full hover:bg-white/80 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? "Transmitting..." : "Initiate Link →"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>,
    "contact"
  );
}

// ─── 4. MASTER ENGINE ────────────────────────────────────────────────────────
export default function Home() {
  const [view, setView] = useState<View>("home");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden cursor-none" style={{ fontFamily: "var(--font-space-grotesk, Inter, system-ui, sans-serif)" }}>
      <SiteCursor />

      {/* Persistent 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Particles isHovered={isHovered} />
        </Canvas>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50">
        <button onClick={() => setView("home")} className="text-xl font-black tracking-tighter hover:text-white/60 transition-colors">
          SID.
        </button>
        <div className="flex gap-4 md:gap-8 text-xs uppercase tracking-widest text-white/40">
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
        <button
          onClick={() => setView("contact")}
          className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${view === "contact" ? "bg-white text-black" : "border border-white/20 text-white/60 hover:border-white/60 hover:text-white"}`}
        >
          Hire Me
        </button>
      </nav>

      {/* Animated Views */}
      <main className="relative z-10 pt-20 w-full" onMouseEnter={view === "home" ? () => setIsHovered(true) : undefined} onMouseLeave={view === "home" ? () => setIsHovered(false) : undefined}>
        <AnimatePresence mode="wait">
          {view === "home" && <HomeView key="home" onNavigate={setView} onHover={setIsHovered} />}
          {view === "skills" && <SkillsView key="skills" />}
          {view === "projects" && <ProjectsView key="projects" />}
          {view === "experience" && <ExperienceView key="experience" />}
          {view === "contact" && <ContactView key="contact" />}
        </AnimatePresence>
      </main>
    </div>
  );
}
