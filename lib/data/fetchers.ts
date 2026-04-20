import { PrismaClient } from '@prisma/client';
import { unstable_cache } from 'next/cache';

const prisma = new PrismaClient();

/**
 * Fetch all projects from the database.
 * Cached to prevent redundant DB hits.
 */
export const getProjects = unstable_cache(
  async () => {
    return prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
  },
  ['projects-list'],
  { revalidate: 3600, tags: ['projects'] }
);

/**
 * Fetch all skills from the database.
 */
export const getSkills = unstable_cache(
  async () => {
    return prisma.skill.findMany({
      orderBy: [
        { category: 'asc' },
        { order: 'asc' }
      ],
    });
  },
  ['skills-list'],
  { revalidate: 3600, tags: ['skills'] }
);

/**
 * Fetch all experience nodes from the database.
 */
export const getExperiences = unstable_cache(
  async () => {
    return prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });
  },
  ['experience-list'],
  { revalidate: 3600, tags: ['experience'] }
);
