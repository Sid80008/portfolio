"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  // Page Transition: Vertical Clip-Path Reveal
  return (
    <>
      <motion.div
        key="curtain-wipe"
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        exit={{ clipPath: "inset(100% 0 0% 0)" }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="w-full h-full relative"
      >
        {children}
      </motion.div>
    </>
  );
}
