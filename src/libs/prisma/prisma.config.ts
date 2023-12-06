import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.prisma = prisma

// Estanciamiento de modelos a client de Prisma
export const Users = prisma.users

export async function ModelDisconnet() {
    await prisma.$disconnect()
}
