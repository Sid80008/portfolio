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
    role: "Full Stack Developer",
    company: "Development & Personal Projects",
    date: "",
    description: [
      "Projects (Websites & Apps): 7 completed",
      "Personal Projects: ongoing (focused on depth and expansion)",
      "Integrating AI tools to optimize development and automation workflows."
    ],
    tech: ["Python", "Java", "Next.js", "SQL", "DBMS"]
  },
  {
    id: "e2",
    role: "Creative Designer",
    company: "Freelance & Skill Building",
    date: "",
    description: [
      "Graphic Designing: in progress (experience-focused)",
      "YouTube Thumbnails & Reel Covers: in progress",
      "Posters & Branding: in progress",
      "Freelancing Status: Small-scale creative tasks for portfolio development (not monetized yet)"
    ],
    tech: ["Photoshop", "Illustrator", "Premiere Pro", "DaVinci Resolve", "After Effects"]
  }
];


