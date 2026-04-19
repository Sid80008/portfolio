"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/lib/data/skills";
import SkillChip from "./SkillChip";

export default function SkillGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {skillsData.map((category, i) => (
        <motion.div 
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-8 rounded-3xl group hover:border-accent/30 transition-colors duration-500"
        >
          <h3 className="text-xl font-heading font-semibold text-white mb-8 flex items-center gap-4">
            <span className="w-10 h-0.5 bg-accent/50 group-hover:bg-accent transition-colors duration-300"></span>
            {category.category}
          </h3>
          <div className="flex flex-wrap gap-3">
            {category.items.map((skill, j) => (
              <SkillChip key={skill.name} name={skill.name} delay={(i * 0.1) + (j * 0.05)} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
