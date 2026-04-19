"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-cinematic ${
          scrolled
            ? "bg-surface-container/70 backdrop-blur-3xl shadow-2xl shadow-primary-container/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image 
                src="/logo.png" 
                alt="Siddharth Logo" 
                fill 
                className="object-contain"
                priority
              />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tighter text-on-surface font-headline hidden sm:block">
              Siddharth Umajwal
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-headline text-sm font-medium tracking-tight transition-cinematic scale-95 active:scale-90 ${
                    isActive
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <Link href="/contact" className="hidden md:flex items-center justify-center px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-on-primary font-headline text-sm font-semibold hover:opacity-90 transition-cinematic scale-95 active:scale-90 shadow-[0_0_40px_rgba(196,192,255,0.2)]">
            Hire Me
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-on-surface p-2"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-headline text-2xl font-medium ${
                  pathname === link.path ? "text-primary" : "text-on-surface"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-gradient-to-r from-primary to-secondary text-on-primary font-headline text-lg font-medium px-8 py-3 rounded-full"
            >
              Hire Me
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
