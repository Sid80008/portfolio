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
    title: "Intelligence Hub",
    description: "A centralized dashboard for real-time data analytics and system monitoring. Built for high-volume signal processing.",
    category: "web",
    image: "/logo.png",
    link: "#",
    tech: ["Python", "Java", "Next.js", "PostgreSQL", "TailwindCSS"]
  },
  {
    id: "p2",
    title: "Creative Design Portfolio",
    description: "Premium visual assets including YouTube Thumbnails, Reel Covers, and Brand Identity. Designed for maximum engagement.",
    category: "app",
    image: "/logo.png",
    link: "#",
    tech: ["Photoshop", "Illustrator", "Blender", "AutoCAD", "Figma", "After Effects"]
  },
  {
    id: "p3",
    title: "Open Source Engine",
    description: "Contribution to core mathematical systems and animation libraries. Focused on performance optimization and developer tooling.",
    category: "open-source",
    image: "/logo.png",
    link: "#",
    tech: ["C++", "Three.js", "GLSL", "React Native"]
  }
];
