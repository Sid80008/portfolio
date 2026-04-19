import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type GlobalWithPrisma = typeof globalThis & {
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
};

const prisma = (globalThis as GlobalWithPrisma).prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") (globalThis as GlobalWithPrisma).prismaGlobal = prisma
