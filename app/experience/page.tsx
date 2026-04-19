"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      role: "Freelance Creative Developer",
      company: "Self-Employed",
      time: "2023 - Present",
      description: "Partnering with startups and boutique agencies to develop high-performance, visually striking digital platforms. Merging Three.js, GSAP, and Next.js to deliver award-winning experiences.",
      tech: ["WebGL", "Three.js", "Next.js", "GSAP"]
    },
    {
      role: "Lead UI Engineer",
      company: "NIT Hamirpur Tech Board",
      time: "2022 - 2023",
      description: "Spearheaded the complete redesign and architectural overhaul of the university's technical portal. Reduced load times by 60% and established a unified design system.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Figma"]
    },
    {
      role: "Frontend Developer Intern",
      company: "TechNova Solutions",
      time: "Summer 2022",
      description: "Developed responsive dashboard components for an enterprise SaaS product. Integrated complex data visualization libraries and improved state management.",
      tech: ["Vue.js", "Vuex", "SCSS", "D3.js"]
    }
  ];

  useGSAP(() => {
    // 1. Vertical Line Drawing Animation
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 20%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );

    // 2. Animate each experience block
    const items = gsap.utils.toArray<HTMLElement>(".experience-item");
    items.forEach((item) => {
      const node = item.querySelector(".timeline-node");
      const content = item.querySelector(".experience-content");
      const time = item.querySelector(".experience-time");

      // Slide in from right/fade for content
      gsap.fromTo(
        [content, time],
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Node scale up
      gsap.fromTo(
        node,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 3. Header parallax/reveal
    gsap.from(".header-content > *", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-16 md:gap-24">
        {/* Header Section */}
        <section className="header-content flex flex-col gap-6 md:w-3/4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-tertiary">The Timeline</span>
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-on-surface">Experience & Evolution</h1>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed max-w-2xl">
            A chronological mapping of my professional journey. From foundational UI development to leading complex architectural rebuilds.
          </p>
        </section>

        {/* Timeline Section */}
        <section className="timeline-section relative">
          {/* Vertical Line */}
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-8 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-secondary to-tertiary hidden sm:block origin-top"
          ></div>

          <div className="flex flex-col gap-16">
            {experiences.map((exp, index) => (
              <div key={index} className="experience-item relative flex flex-col sm:flex-row gap-8 sm:gap-16 group">
                {/* Timeline node */}
                <div className="timeline-node hidden sm:flex absolute left-4 md:left-8 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-surface border-2 border-primary z-10 shadow-[0_0_15px_rgba(196,192,255,0.6)]"></div>
                
                {/* Time alignment */}
                <div className="experience-time sm:w-1/4 sm:pl-16 pt-5">
                  <span className="font-mono text-sm tracking-widest text-on-surface-variant group-hover:text-primary transition-colors duration-300">{exp.time}</span>
                </div>

                {/* Content card */}
                <div className="experience-content sm:w-3/4 bg-surface-container-low border border-outline-variant/20 p-8 rounded-2xl flex flex-col gap-4 shadow-xl hover:border-outline-variant/60 hover:bg-surface-container transition-all duration-500">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-headline text-2xl md:text-3xl font-semibold text-on-surface">{exp.role}</h2>
                    <h3 className="font-mono text-sm text-secondary uppercase tracking-widest mt-1">{exp.company}</h3>
                  </div>
                  
                  <p className="text-on-surface-variant text-base leading-relaxed font-light mt-2">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-4">
                    {exp.tech.map((tech, tIndex) => (
                      <span key={tIndex} className="px-3 py-1 text-xs font-mono tracking-wider text-on-surface bg-surface-container-highest rounded border border-outline-variant/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
