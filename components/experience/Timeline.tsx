"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/lib/data/experience";
import TimelineNode from "./TimelineNode";

export default function Timeline() {
  return (
    <div className="relative max-w-5xl mx-auto py-12">
      {/* Central Line */}
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent transform -translate-x-1/2 origin-top"
      />
      
      <div className="relative z-10 w-full mt-10">
        {experienceData.map((node, i) => (
          <TimelineNode key={node.id} data={node} index={i} />
        ))}
      </div>
    </div>
  );
}
