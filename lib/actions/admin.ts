'use server';

import { login, logout } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Handle admin login
 */
export async function authenticate(formData: FormData) {
  const passphrase = formData.get('passphrase') as string;
  const success = await login(passphrase);

  if (success) {
    redirect('/admin/dashboard');
  } else {
    return { error: 'Invalid passphrase' };
  }
}

/**
 * Handle admin logout
 */
export async function signout() {
  await logout();
  redirect('/admin/login');
}

/**
 * Get Dashboard Statistics
 */
export async function getDashboardStats() {
  const [inquiries, projects, skills, failedEmails] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.project.count(),
    prisma.skill.count(),
    prisma.contactMessage.count({ where: { deliveryStatus: 'FAILED' } }),
  ]);

  const recentInquiries = await prisma.contactMessage.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return {
    inquiries,
    projects,
    skills,
    failedEmails,
    recentInquiries,
  };
}

/**
 * Update Message Status
 */
export async function updateMessageStatus(id: string, status: 'READ' | 'ARCHIVED') {
  await prisma.contactMessage.update({
    where: { id },
    data: { status },
  });
  revalidatePath('/admin/messages');
}

/**
 * Delete Message
 */
export async function deleteMessage(id: string) {
  await prisma.contactMessage.delete({
    where: { id },
  });
  revalidatePath('/admin/messages');
}

/**
 * Portfolio Sync: Pull from static data files to DB
 */
export async function syncFromStatic() {
  const { projectsData } = await import('@/lib/data/projects');

  for (const p of projectsData) {
    await prisma.project.upsert({
      where: { slug: p.id },
      update: {
        title: p.title,
        description: p.description,
        category: 'WEB', // Prisma Category mapping
        tags: p.tech,
        liveUrl: p.link,
      },
      create: {
        slug: p.id,
        title: p.title,
        description: p.description,
        category: 'WEB',
        tags: p.tech,
        liveUrl: p.link,
      },
    });
  }
  
  revalidatePath('/admin/portfolio');
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath('/admin/portfolio');
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath('/admin/portfolio');
}
