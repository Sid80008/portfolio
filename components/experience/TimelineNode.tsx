"use client";

import { motion } from "framer-motion";
import { ExperienceNode } from "@/lib/data/experience";

export default function TimelineNode({ data, index }: { data: ExperienceNode, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group w-full mb-16 last:mb-0`}>
      <div className="absolute left-2 md:left-1/2 w-4 h-4 rounded-full border border-accent bg-background transform -translate-x-1/2 flex items-center justify-center z-10 group-hover:bg-accent group-hover:shadow-[0_0_20px_theme('colors.accent.DEFAULT')] transition-all duration-300">
          <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover:bg-white transition-colors duration-300"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className={`w-full pl-12 md:pl-0 md:w-[45%] ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'}`}
      >
        <div className="glass-card p-6 md:p-10 rounded-3xl group-hover:border-accent/40 transition-colors duration-500">
          <h3 className="text-2xl font-bold font-heading text-white mb-1">{data.role}</h3>
          <h4 className="text-lg text-white/40 mb-6">{data.company}</h4>
          
          <ul className={`space-y-4 mb-8 text-white/70 text-sm list-none`}>
             {data.description.map((desc, i) => (
               <li key={i} className={`relative ${isEven ? 'md:pr-6' : 'pl-6'}`}>
                 <span className={`absolute top-2 w-1.5 h-1.5 rounded-full bg-accent/50 ${isEven ? 'md:right-0 md:left-auto left-0' : 'left-0'}`}></span>
                 <span className={isEven ? 'md:text-right text-left inline-block' : ''}>{desc}</span>
               </li>
             ))}
          </ul>
          
          <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
            {data.tech.map(tech => (
              <span key={tech} className="text-xs font-mono px-3 py-1 rounded bg-white/5 border border-white/10 text-white/50">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
