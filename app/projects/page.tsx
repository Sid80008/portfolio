import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected works by Siddharth Umajwal — full-stack apps, creative development, and premium web experiences.",
};

interface Project {
  title: string;
  category: string;
  description: string;
  link: string;
  image: string;
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      title: "Nexus Analytics",
      category: "Full-Stack App",
      description: "Real-time data visualization dashboard with WebSocket integration and predictive ML models running on the edge.",
      link: "#",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRJnojj5iNZ8uKA-KYfrYVrEaWaQ65bEt4d8v-dGz0hkcWnNLJqdFxsZgrn5W4-I0psk32jNpMdtSaRFJKKKc1K9hmpa4BS-1dTmWdwjF1Ff9Cgaht4833jUZaOWW9EouRgWw6CUPmfqGxGau8Lyh1zLcfOxbemgyUg6tiqYOdFlXiMlo1-qldzmKzmle4X0_nuLG4ecWdI4pmUFHbGuVGsnEb58zSjxFJRxN8iP8S0zw9m_Cb3Ja9yjao20hNzMnZej-hKcycC-Oa"
    },
    {
      title: "Aura Player",
      category: "React Native / Mobile",
      description: "Audiophile-grade music player with custom DSP algorithms and a gesture-driven glassmorphism interface.",
      link: "#",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDYhHHvDMFyD-o7cUACG8taniRbkoQrvJEuS1W6Or8GSBVk-bKJfilGclsAlOVSRbnkQOVk9FH-5lxVPXRYKXeZIrYG75DAvkWlf8a3VBlkxO30eJtEBvcUYULsQqhZBtY6SA0XTv6lEJ-Ijk-6f8aTPYRmeQ7mdo1PwDtqlR7hB8GvtJS-ECOIjx7ZTDPV6vV0hrFaMFWj2MoGVpbn3VOqKpVwwq-kFT_I0oX4Wa440StOhe0YcczkyA3mY7paQMf5cFzkMY-jfyh"
    },
    {
      title: "Lumina Storefront",
      category: "Headless E-Commerce",
      description: "Next.js 14 based storefront achieving 100 Lighthouse scores, integrated with Sanity CMS and Shopify backend.",
      link: "#",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWwb7AcQ4H8lRyeBLcp_RaET0MEbI-47_UYHHaEdw1m4DjSrvmpbv_AwXnxUCMz0WjnJn5irv26anPHO_ibdzc2nGJKNBYlY6MuMSaoT0W7BFLINFmeQ8igeN0RVB1xeRIhMq4hm15JF-Ljp8I_WkY0aHSxpwV9aU-KhArrvOAHPJXKF6B_sHp785zWzKSZoWA9Jeb_vK1lmBQWpQN2qf_Opu5FT4RrAJ3kN-l4K_Zgx0VdGIIRVWtq_pj6pTywwFZ3vU1kon_mL2y"
    }
  ];

  return (
    <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-16">
        <header className="flex flex-col gap-4">
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-on-surface">Selected Works</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl font-light">A curated intersection of deep engineering and premium visual design. Each project represents a specific architectural challenge solved.</p>
        </header>

        <div className="flex gap-4 border-b border-outline-variant pb-4 mb-4 overflow-x-auto no-scrollbar">
          <button className="px-4 py-2 font-mono text-sm tracking-widest uppercase border-b-2 border-primary text-primary whitespace-nowrap">All Work</button>
          <button className="px-4 py-2 font-mono text-sm tracking-widest uppercase text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-colors">Frontend</button>
          <button className="px-4 py-2 font-mono text-sm tracking-widest uppercase text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-colors">Full-Stack</button>
          <button className="px-4 py-2 font-mono text-sm tracking-widest uppercase text-on-surface-variant hover:text-on-surface whitespace-nowrap transition-colors">Creative Dev</button>
        </div>

        <div className="grid grid-cols-1 gap-24">
          {projects.map((project: Project, index: number) => (
            <article key={index} className="flex flex-col md:flex-row gap-8 md:gap-16 group">
              <div className="w-full md:w-3/5 h-[400px] md:h-[600px] relative rounded-2xl overflow-hidden bg-surface-container-high order-2 md:order-1">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  unoptimized
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="project-content w-full md:w-2/5 flex flex-col justify-center gap-6 order-1 md:order-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{project.category}</span>
                </div>
                <h2 className="font-headline text-4xl md:text-5xl font-semibold tracking-tight text-on-surface group-hover:text-primary transition-colors duration-500">
                  {project.title}
                </h2>
                <div className="h-[1px] w-full bg-outline-variant/30 my-2"></div>
                <p className="text-on-surface-variant text-base md:text-lg leading-relaxed font-light">
                  {project.description}
                </p>
                <div className="mt-8 flex gap-4">
                  <Link href={project.link} className="flex items-center justify-center p-4 rounded-full bg-surface-container-highest hover:bg-primary hover:text-on-primary text-on-surface transition-all duration-300 group/btn">
                    <span className="material-symbols-outlined transform group-hover/btn:-rotate-45 transition-transform duration-300">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
