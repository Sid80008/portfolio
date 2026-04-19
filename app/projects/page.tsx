import { Metadata } from "next";
import ProjectGrid from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected works by Siddharth Umajwal — full-stack apps, creative development, and premium web experiences.",
};

export default function ProjectsPage() {
  return (
    <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-12">
        <header className="flex flex-col gap-4">
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-on-surface">Selected Works</h1>
          <p className="text-on-surface-variant text-lg max-w-2xl font-light">A curated intersection of deep engineering and premium visual design. Each project represents a specific architectural challenge solved.</p>
        </header>

        <ProjectGrid />
      </div>
    </main>
  );
}

