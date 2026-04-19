"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const domains = [
    {
      title: "Full-Stack Engineering",
      icon: "code_blocks",
      description: "Architecting scalable backend services and responsive client architectures with strict typing.",
      skills: ["React 18 / Next.js 14", "TypeScript / Node.js", "PostgreSQL / Prisma", "GraphQL / REST APIs", "Tailwind CSS"]
    },
    {
      title: "Graphic Design",
      icon: "palette",
      description: "Gaining hands-on experience through internships and personal projects",
      skills: ["Adobe Illustrator", "Photoshop", "Figma", "Premiere Pro", "After Effects"]
    },
    {
      title: "Systems Architecture",
      icon: "account_tree",
      description: "Designing resilient cloud infrastructure, CI/CD pipelines, and microservice architectures.",
      skills: ["Docker / Cloud", "Vercel / AWS", "CI/CD Actions", "System Design", "Performance Optimization"]
    }
  ];

  useGSAP(() => {
    // 1. Initial Header Animation
    gsap.from(".header-content > *", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    });

    // 2. Batched Skill Card Entrance
    ScrollTrigger.batch(".skill-card", {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "back.out(1.4)",
          overwrite: true,
        });
      },
      onLeaveBack: (batch) => {
        gsap.to(batch, {
          opacity: 0,
          y: 30,
          overwrite: true,
        });
      },
      start: "top 90%",
    });

    // 3. Banner Reveal
    gsap.from(".banner-section", {
      scrollTrigger: {
        trigger: ".banner-section",
        start: "top 85%",
      },
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-16 md:gap-24">
        {/* Header Section */}
        <section className="header-content flex flex-col gap-6 md:w-3/4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary">The Arsenal</span>
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-on-surface">Technical Mastery</h1>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-2xl">
            A comprehensive overview of the languages, frameworks, and methodologies I deploy to engineer digital products. Proficiency across the entire stack, from database schemas to WebGL shaders.
          </p>
        </section>

        {/* Skills Matrix */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((domain, index) => (
            <div
              key={index}
              className="skill-card opacity-0 translate-y-8 bg-surface-container-low border border-outline-variant/20 p-8 rounded-2xl flex flex-col gap-6 shadow-[0_0_40px_rgba(31,31,37,0.5)] hover:border-outline-variant/60 transition-colors duration-500"
            >
              <div className="h-12 w-12 rounded-full bg-surface-container-highest flex items-center justify-center border border-outline-variant/30 text-primary">
                <span className="material-symbols-outlined text-2xl">{domain.icon}</span>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="font-headline text-2xl font-semibold text-on-surface tracking-tight">{domain.title}</h2>
                <p className="text-on-surface-variant text-sm font-light leading-relaxed">{domain.description}</p>
              </div>
              <div className="h-[1px] w-full bg-outline-variant/20 my-2"></div>
              <ul className="flex flex-col gap-3 mt-auto">
                {domain.skills.map((skill, sIndex) => (
                  <li key={sIndex} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary"></span>
                    <span className="font-mono text-sm text-on-surface tracking-wide">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Bottom Banner */}
        <section className="banner-section bg-gradient-to-br from-surface-container-highest to-surface-container-low border border-outline-variant/30 rounded-2xl p-10 md:p-16 flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle at right bottom, #8781ff 0%, transparent 60%)" }}></div>
          <div className="relative z-10 flex flex-col gap-4 max-w-xl text-center md:text-left">
            <h3 className="font-headline text-3xl md:text-4xl font-semibold text-on-surface tracking-tight">Evolving Constantly</h3>
            <p className="text-on-surface-variant text-base">The tech stack is always secondary to problem-solving. I am continuously learning and adapting to the best tools for the architectural requirement.</p>
          </div>
          <div className="relative z-10 hidden md:flex gap-4">
            <div className="animate-spin-slow opacity-20">
              <span className="material-symbols-outlined text-9xl text-primary">change_history</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
