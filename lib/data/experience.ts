export interface ExperienceNode {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string[];
  tech: string[];
}

export const experienceData: ExperienceNode[] = [
  {
    id: "e1",
    role: "Senior Frontend Engineer",
    company: "Vercel / Google (Simulated)",
    date: "2023 - Present",
    description: [
      "Architected and implemented enterprise-scale Micro-Frontends using Next.js 14.",
      "Optimized Core Web Vitals to achieve absolute 100/100 Lighthouse scores across the product suite.",
      "Mentored a team of 5+ mid-level engineers in React performance and State Management."
    ],
    tech: ["Next.js 14", "RSC", "TypeScript", "Tailwind CSS"]
  },
  {
    id: "e2",
    role: "Frontend Engineer",
    company: "Tech Disruptors Inc.",
    date: "2020 - 2023",
    description: [
      "Built a real-time collaborative workspace utilizing Yjs and WebSockets.",
      "Reduced bundle size by 45% by introducing dynamic imports and tree-shaking strategies.",
      "Led the migration from monolithic REST APIs to Apollo GraphQL."
    ],
    tech: ["React 18", "GraphQL", "Zustand", "Framer Motion"]
  },
  {
    id: "e3",
    role: "UI Engineer",
    company: "Design Agency Studio",
    date: "2018 - 2020",
    description: [
      "Translated high-fidelity Figma designs into pixel-perfect CSS/HTML.",
      "Integrated WebGL animations to create award-winning landing pages.",
      "Developed a custom design system token library used across 10 client projects."
    ],
    tech: ["JavaScript", "SCSS", "Three.js", "GSAP"]
  }
];
