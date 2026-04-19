import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { ProjectCategory } from "@prisma/client";
import { projectsData } from "@/lib/data/projects";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category")?.toUpperCase();

    // Validate category against the Prisma enum
    let categoryFilter: ProjectCategory | undefined = undefined;
    if (category && Object.values(ProjectCategory).includes(category as ProjectCategory)) {
      categoryFilter = category as ProjectCategory;
    }

    const projects = await prisma.project.findMany({
      where: categoryFilter ? { category: categoryFilter } : undefined,
      orderBy: [
        { featured: "desc" },
        { order: "asc" },
      ],
    });

    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    // Fallback to static data if DB is unreachable
    console.error("DB unreachable, using static fallback:", String(error));
    return NextResponse.json({
      success: true,
      count: projectsData.length,
      data: projectsData,
      source: "static-fallback",
    });
  }
}
