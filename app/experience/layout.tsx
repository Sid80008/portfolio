import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional timeline of Siddharth Umajwal — freelance creative development, UI engineering, and frontend architecture.",
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
