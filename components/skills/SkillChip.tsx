"use client";

import { motion } from "framer-motion";

export default function SkillChip({ name, delay = 0 }: { name: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay, 
        type: "spring", 
        stiffness: 200, 
        damping: 10 
      }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/90 font-medium text-sm text-center cursor-none transition-colors hover:bg-accent/20 hover:border-accent/50 hover:text-white"
    >
      {name}
    </motion.div>
  );
}
