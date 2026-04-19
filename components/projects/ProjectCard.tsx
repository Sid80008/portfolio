"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/data/projects";
import { ExternalLink, Code2 } from "lucide-react";

export default function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative rounded-3xl overflow-hidden glass-card flex flex-col hover:border-accent/30 transition-all duration-500"
    >
      <div className="h-56 sm:h-72 w-full bg-[#0a0a0a] relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple-900/30 group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
            {/* Visual Abstract Motif instead of image */}
            <div className="w-32 h-32 rounded-full border border-white/10 absolute -left-10 -top-10 opacity-30 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="w-48 h-48 rounded-full border border-accent/20 absolute -right-10 -bottom-10 opacity-30 group-hover:scale-150 transition-transform duration-1000 delay-100"></div>
            <span className="font-heading text-4xl text-white/20 font-black tracking-widest">{project.category.toUpperCase()}</span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
           <button className="p-2.5 bg-background/50 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors cursor-none">
             <Code2 size={16} />
           </button>
           <button className="p-2.5 bg-background/50 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors cursor-none">
             <ExternalLink size={16} />
           </button>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1 bg-gradient-to-b from-transparent to-background/50">
        <h3 className="text-2xl font-heading font-bold text-white mb-3 group-hover:text-accent transition-colors">{project.title}</h3>
        <p className="text-white/60 mb-8 flex-1 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map(tech => (
            <span key={tech} className="text-xs font-mono px-3 py-1.5 rounded bg-white/5 border border-white/10 text-white/70">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
