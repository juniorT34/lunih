import {PrismaClient} from '@prisma/client'
let prisma;
declare global {
    prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV==='development') global.prisma = prisma

export default prisma