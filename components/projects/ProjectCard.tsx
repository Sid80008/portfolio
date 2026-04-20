"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Github, 
  ExternalLink, 
  Layers
} from "lucide-react";
import { Project } from "@prisma/client";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
    >
      <div className="aspect-video bg-zinc-800/50 relative overflow-hidden">
        {project.imageUrl && (
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Github size={20} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest">
              <Layers size={12} />
              {project.category}
            </div>
            <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
          </div>
        </div>

        <p className="text-white/40 text-sm line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-white/30 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
