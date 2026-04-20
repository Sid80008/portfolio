"use client";

import { motion } from "framer-motion";
import { Project } from "@prisma/client";
import { ExternalLink, Code2 } from "lucide-react";

export default function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative rounded-3xl overflow-hidden bg-[#050505] border border-white/5 flex flex-col hover:border-white/20 transition-all duration-500"
    >
      <div className="h-56 sm:h-72 w-full bg-[#0a0a0a] relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] group-hover:scale-105 transition-transform duration-700 flex items-center justify-center">
            {/* Visual Abstract Motif */}
            <div className="w-32 h-32 rounded-full border border-white/5 absolute -left-10 -top-10 opacity-30 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="w-48 h-48 rounded-full border border-white/5 absolute -right-10 -bottom-10 opacity-30 group-hover:scale-150 transition-transform duration-1000 delay-100"></div>
            <span className="font-black text-4xl text-white/5 tracking-widest pointer-events-none select-none">{project.category.toUpperCase()}</span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
           <a href={project.liveUrl || "#"} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-background/50 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
             <ExternalLink size={16} />
           </a>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white/80 transition-colors uppercase tracking-tight">{project.title}</h3>
        <p className="text-white/40 mb-8 flex-1 leading-relaxed text-sm">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
