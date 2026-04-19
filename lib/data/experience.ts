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
    role: "Full-Stack Development",
    company: "Internships & Personal Work",
    date: "",
    description: [
      "Gaining experience through internship and personal projects.",
      "7 completed websites/apps focusing on performance and modern UI."
    ],
    tech: ["Python", "Next.js", "Java", "SQL", "DBMS"]
  },
  {
    id: "e2",
    role: "Graphic Designing",
    company: "Creative Specialization",
    date: "",
    description: [
      "Professional work using Illustrator, Photoshop, Figma, Premiere Pro, and After Effects.",
      "Focused on high-quality visuals, branding assets, and video assets."
    ],
    tech: ["Illustrator", "Photoshop", "Figma", "Premiere Pro", "After Effects"]
  }
];



