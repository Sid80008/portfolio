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
    title: "Web & Mobile Development",
    description: "7 completed projects across various domains, focusing on clean architecture and high performance.",
    category: "web",
    image: "/logo.png",
    link: "#",
    tech: ["Python", "Java", "Next.js", "SQL"]
  },
  {
    id: "p2",
    title: "Creative Design Portfolio",
    description: "Expert work in YouTube Thumbnails, Reel Covers, and Brand Identity. Currently focused on skill-building and high-quality creative assets.",
    category: "app",
    image: "/logo.png",
    link: "#",
    tech: ["Photoshop", "Premiere Pro", "DaVinci Resolve"]
  }
];

