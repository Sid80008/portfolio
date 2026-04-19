import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { skillsData } from "@/lib/data/skills";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [
        { category: "asc" },
        { order: "asc" },
        { level: "desc" }
      ],
    });

    // Group by category for frontend consumption
    const grouped = skills.reduce((acc, skill) => {
      const cat = skill.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {} as Record<string, typeof skills>);

    return NextResponse.json({ success: true, count: skills.length, data: grouped });
  } catch (error) {
    // Fallback to static data if DB is unreachable
    console.error("DB unreachable, using static fallback:", String(error));
    return NextResponse.json({
      success: true,
      count: skillsData.length,
      data: skillsData,
      source: "static-fallback",
    });
  }
}
