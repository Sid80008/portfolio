"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export default function SectionHeading({ title, subtitle, className }: { title: string, subtitle?: string, className?: string }) {
  return (
    <div className={cn("mb-16", className)}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-accent font-mono text-sm mb-3 uppercase tracking-[0.2em]"
      >
        {subtitle}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-white"
      >
        {title}
      </motion.h2>
    </div>
  );
}
