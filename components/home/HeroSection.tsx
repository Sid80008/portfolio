"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <ParticleCanvas />
      
      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-block mb-6 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-md"
        >
          <span className="text-sm font-mono text-accent">Status: Available for opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tighter mb-6"
        >
          Building Digital <br />
          <span className="text-gradient hover:scale-105 inline-block transition-transform duration-500">Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
        >
          Senior Frontend Engineer specializing in Next.js, React, and performance-first architecture. I turn complex problems into elegant, scaleable solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/projects"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-accent px-8 font-medium text-white duration-300 hover:bg-white focus:bg-white focus:text-black hover:text-black hover:shadow-[0_0_20px_theme('colors.accent.DEFAULT')]"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="flex items-center gap-2 relative z-10 transition-colors">
              View Work <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/contact"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-white/20 bg-white/5 px-8 font-medium text-white duration-300 hover:bg-white/10"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
