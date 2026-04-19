import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected works by Siddharth Umajwal — full-stack apps, creative development, and premium web experiences.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
