// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

declare global {
  // This prevents multiple instances of PrismaClient in development
  // Add PrismaClient as a global type
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma
