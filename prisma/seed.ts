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
      title: 'YouTube Thumbnails',
      slug: 'youtube-thumbnails',
      description: 'High-conversion thumbnails for educational and tech channels',
      category: ProjectCategory.DESIGN,
      tags: ['Photoshop', 'Branding'],
      featured: true,
      order: 1,
    },
    {
      title: 'UPSC Dashboard App',
      slug: 'upsc-dashboard',
      description: 'Personalized preparation tracker app for UPSC aspirants',
      category: ProjectCategory.APP,
      tags: ['React Native', 'UI/UX'],
      featured: true,
      order: 2,
    },
    {
      title: 'Brand Identity',
      slug: 'brand-identity',
      description: 'Logo and visual identity for modern startups',
      category: ProjectCategory.DESIGN,
      tags: ['Illustrator', 'Design'],
      featured: false,
      order: 3,
    },
    {
      title: 'Posters & Campaign',
      slug: 'posters-campaign',
      description: 'Creative posters for college festivals and events',
      category: ProjectCategory.DESIGN,
      tags: ['Photoshop', 'Typography'],
      featured: false,
      order: 4,
    },
    {
      title: 'Personal Web Project',
      slug: 'personal-web',
      description: 'Interactive creative portfolio using Next.js and Three.js',
      category: ProjectCategory.WEB,
      tags: ['React', 'Next.js', 'Tailwind'],
      featured: true,
      order: 5,
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
  await prisma.experience.deleteMany({}) // Reset since there's no unique unique key to upsert neatly
  
  await prisma.experience.createMany({
    data: [
      {
        title: 'Freelance Graphic Designer',
        org: 'Self-Employed',
        type: 'freelance',
        description: 'Creating thumbnails, branding, and digital assets. Proficient in Photoshop and Illustrator.',
        startDate: new Date('2022-01-01'),
        current: true,
        order: 1,
      },
      {
        title: 'B.Tech student',
        org: 'NIT Hamirpur',
        type: 'college',
        description: 'Pursuing Bachelor of Technology with hands-on coding (C++, Python) and database management experience.',
        startDate: new Date('2023-08-01'),
        current: true,
        order: 2,
      },
      {
        title: 'High School (12th)',
        org: 'JNV',
        type: 'school',
        description: 'Completed higher secondary education.',
        startDate: new Date('2021-04-01'),
        endDate: new Date('2023-03-31'),
        current: false,
        order: 3,
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
