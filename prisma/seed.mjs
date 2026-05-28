import { PrismaClient } from "@prisma/client"
import { pbkdf2Sync, randomBytes } from "crypto"

const prisma = new PrismaClient()

const users = [
  { email: "student@incrafto.in", password: "student123", name: "Student User" },
  { email: "admin@incrafto.in", password: "admin123", name: "Admin User" },
  { email: "demo@incrafto.in", password: "demo123", name: "Demo User" },
]

function hashPassword(password) {
  const iterations = 310000
  const salt = randomBytes(16).toString("hex")
  const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("hex")

  return `${iterations}:${salt}:${hash}`
}

for (const user of users) {
  await prisma.user.upsert({
    where: { email: user.email },
    update: {
      name: user.name,
    },
    create: {
      name: user.name,
      email: user.email,
      passwordHash: hashPassword(user.password),
    },
  })
}

await prisma.$disconnect()

console.log("Seeded demo users.")
