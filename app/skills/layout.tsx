import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
  description: "Technical mastery of Siddharth Umajwal — React, Next.js, TypeScript, Three.js, GSAP, and full-stack architecture.",
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
