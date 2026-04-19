export type ProjectCategory = 'all' | 'web' | 'app' | 'open-source';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  link: string;
  tech: string[];
}

export const projectsData: Project[] = [
  {
    id: "p1",
    title: "E-Commerce Platform Edge UI",
    description: "A highly performant e-commerce storefront supporting 10k+ concurrent users with edge rendering.",
    category: "web",
    image: "/images/placeholder-1.jpg",
    link: "#",
    tech: ["Next.js", "TypeScript", "Tailwind", "GSAP"]
  },
  {
    id: "p2",
    title: "Financial Dashboard",
    description: "Real-time market analytics dashboard with WebGL data visualization capabilities.",
    category: "app",
    image: "/images/placeholder-2.jpg",
    link: "#",
    tech: ["React", "Three.js", "Zustand", "WebSockets"]
  },
  {
    id: "p3",
    title: "React UI Component Library",
    description: "An accessible, tree-shakable component library used by 50+ internal teams.",
    category: "open-source",
    image: "/images/placeholder-3.jpg",
    link: "#",
    tech: ["React", "Radix UI", "Framer Motion", "Rollup"]
  },
  {
    id: "p4",
    title: "AI Study Assistant",
    description: "AI-powered scheduling and tuner integration with LLM backends.",
    category: "app",
    image: "/images/placeholder-4.jpg",
    link: "#",
    tech: ["React Native", "FastAPI", "Python", "Supabase"]
  }
];
