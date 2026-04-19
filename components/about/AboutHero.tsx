"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutHero() {
  return (
    <section className="container mx-auto px-6 py-12 md:py-24 pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeading title="Engineering the Frontend." subtitle="About Me" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground flex flex-col gap-6"
          >
            <p className="text-lg leading-relaxed">
              I am a passionate Senior Frontend Engineer with over 6 years of experience building modern web applications. 
              My journey started with a fascination for crafting seamless user experiences, leading me to specialize in Next.js and the React ecosystem.
            </p>
            <p className="text-lg leading-relaxed">
              Whether it involves architecting scalable design systems, optimizing Web Vitals to 100, or incorporating WebGL/Three.js 
              for immersive interfaces, I thrive at the intersection of design and engineering.
            </p>
            <p className="text-lg leading-relaxed text-white/80 font-medium">
               &quot;Good design is obvious. Great design is transparent.&quot;
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden glass-card p-3 shadow-2xl"
        >
          {/* Aesthetic gradient placeholder replacing an actual image */}
          <div className="w-full h-full bg-gradient-to-br from-accent/20 via-[#111] to-pink-900/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
             <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-accent/30 rounded-full blur-[80px]"></div>
             <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-pink-500/20 rounded-full blur-[80px]"></div>
             
             {/* Typography pattern */}
             <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <span className="font-heading font-black text-9xl tracking-tighter -rotate-90">DEV<br/>ENG</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
