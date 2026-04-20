import { PrismaClient, ProjectCategory, SkillCategory } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding portfolio database...')

  // 1. Seed Skills
  const skills = [
    // Programming
    { name: 'Python', category: SkillCategory.PROGRAMMING, level: 4, order: 1 },
    { name: 'Java', category: SkillCategory.PROGRAMMING, level: 3, order: 2 },
    { name: 'C', category: SkillCategory.PROGRAMMING, level: 4, order: 3 },
    { name: 'C++', category: SkillCategory.PROGRAMMING, level: 4, order: 4 },
    // Web
    { name: 'HTML', category: SkillCategory.WEB, level: 5, order: 1 },
    { name: 'CSS', category: SkillCategory.WEB, level: 5, order: 2 },
    { name: 'JSON', category: SkillCategory.WEB, level: 4, order: 3 },
    // Database
    { name: 'DBMS', category: SkillCategory.DATABASE, level: 4, order: 1 },
    { name: 'SQL', category: SkillCategory.DATABASE, level: 4, order: 2 },
    // Creative tools
    { name: 'Photoshop', category: SkillCategory.CREATIVE, level: 5, order: 1 },
    { name: 'Illustrator', category: SkillCategory.CREATIVE, level: 4, order: 2 },
    { name: 'Premiere Pro', category: SkillCategory.CREATIVE, level: 4, order: 3 },
    { name: 'DaVinci Resolve', category: SkillCategory.CREATIVE, level: 3, order: 4 },
    { name: 'After Effects', category: SkillCategory.CREATIVE, level: 3, order: 5 },
    // AI
    { name: 'AI Tools', category: SkillCategory.AI_TOOLS, level: 5, order: 1 },
  ]

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: skill,
      create: skill,
    })
  }

  // 2. Seed Projects
  const projects = [
    {
      title: 'Web & Mobile Development',
      slug: 'web-mobile-dev',
      description: '7+ completed professional projects across fintech and education, focusing on high-performance architectures.',
      category: ProjectCategory.WEB,
      tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
      featured: true,
      order: 1,
    },
    {
      title: 'Creative Design Portfolio',
      slug: 'creative-design',
      description: 'Premium branding and high-conversion assets for global creators. Expert in Photoshop and After Effects.',
      category: ProjectCategory.DESIGN,
      tags: ['Photoshop', 'Branding', 'Premiere Pro'],
      featured: true,
      order: 2,
    },
    {
      title: 'UPSC Preparation System',
      slug: 'upsc-system',
      description: 'A data-driven tracking and scheduling app for competitive examination aspirants.',
      category: ProjectCategory.APP,
      tags: ['React Native', 'Supabase', 'Mobile'],
      featured: true,
      order: 3,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    })
  }

  // 3. Seed Experience
  await prisma.experience.deleteMany({}) 
  
  await prisma.experience.createMany({
    data: [
      {
        title: 'Internship & Personal Projects',
        org: 'Full-Stack Engineering',
        type: 'freelance',
        description: 'Gaining hands-on experience through internships and personal projects across full-stack engineering and design.',
        startDate: new Date('2025-01-01'),
        current: true,
        order: 1,
      },
      {
        title: 'Creative Design & Branding',
        org: 'Freelance',
        type: 'freelance',
        description: 'Proficient in Adobe Illustrator, Photoshop, Figma, Premiere Pro, and After Effects. Delivering brand identities and multimedia assets.',
        startDate: new Date('2025-01-01'),
        current: true,
        order: 2,
      },
    ]
  })

  console.log('Seeding completed.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
