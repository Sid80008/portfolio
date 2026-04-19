"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Years Experience", value: "6+" },
  { label: "Projects Delivered", value: "40+" },
  { label: "Open Source Commits", value: "1k+" },
  { label: "Tech Mastered", value: "15+" },
];

export default function StatsRow() {
  return (
    <section className="container mx-auto px-6 py-16 mb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-white/10 glass-card rounded-3xl p-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center justify-center text-center px-2 py-4"
          >
            <span className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 mb-3">
              {stat.value}
            </span>
            <span className="text-xs font-mono text-accent uppercase tracking-[0.15em]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
