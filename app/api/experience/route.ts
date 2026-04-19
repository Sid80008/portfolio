import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { experienceData } from "@/lib/data/experience";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [
        { startDate: "desc" },
        { order: "asc" }
      ],
    });

    return NextResponse.json({ success: true, count: experiences.length, data: experiences });
  } catch (error) {
    // Fallback to static data if DB is unreachable
    console.error("DB unreachable, using static fallback:", String(error));
    return NextResponse.json({
      success: true,
      count: experienceData.length,
      data: experienceData,
      source: "static-fallback",
    });
  }
}
