import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

await prisma.$executeRawUnsafe(`
  CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "course" TEXT,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`)

await prisma.$executeRawUnsafe(`
  CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email")
`)

await prisma.$executeRawUnsafe(`
  CREATE TABLE IF NOT EXISTS "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User" ("id")
      ON DELETE CASCADE ON UPDATE CASCADE
  )
`)

await prisma.$executeRawUnsafe(`
  CREATE UNIQUE INDEX IF NOT EXISTS "Session_tokenHash_key" ON "Session"("tokenHash")
`)

await prisma.$executeRawUnsafe(`
  CREATE INDEX IF NOT EXISTS "Session_userId_idx" ON "Session"("userId")
`)

await prisma.$executeRawUnsafe(`
  CREATE INDEX IF NOT EXISTS "Session_expiresAt_idx" ON "Session"("expiresAt")
`)

await prisma.$disconnect()

console.log("SQLite database is ready.")
