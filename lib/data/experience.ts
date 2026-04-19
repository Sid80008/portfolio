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
    company: "Personal & Academic Projects",
    date: "Ongoing",
    description: [
      "Completed 7 professional-grade websites and applications.",
      "Developing a deep portfolio of personal projects focused on scalability and depth.",
      "Integrating AI tools to optimize development workflows."
    ],
    tech: ["Python", "Java", "Next.js", "SQL", "DBMS"]
  },
  {
    id: "e2",
    role: "Creative Designer",
    company: "Freelance & Skill Building",
    date: "Current",
    description: [
      "Specializing in Graphic Designing with a focus on experience building.",
      "Expertise in creating YouTube Thumbnails, Reel Covers, and Branding assets.",
      "Working on small-scale creative tasks to refine visual storytelling techniques.",
      "Currently in non-monetized status, prioritizing skill acquisition and portfolio quality."
    ],
    tech: ["Photoshop", "Illustrator", "Premiere Pro", "DaVinci Resolve", "After Effects"]
  }
];

