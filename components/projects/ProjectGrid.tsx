"use client";

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/lib/data/projects";
import ProjectCard from "./ProjectCard";
import FilterBar from "./FilterBar";

export default function ProjectGrid() {
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

  const filteredProjects = projectsData.filter(p => currentFilter === "all" || p.category === currentFilter);

  return (
    <div className="mt-12">
      <FilterBar />
      <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-white/40">No projects found in this category.</div>
      )}
    </div>
  );
}
