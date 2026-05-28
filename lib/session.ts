import { createHash, randomBytes } from "crypto"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

const SESSION_COOKIE = "incrafto_session"
const SESSION_DAYS = 30

export type SafeUser = {
  id: string
  name: string
  email: string
  phone: string | null
  course: string | null
}

function hashToken(token: string) {
  const secret = process.env.SESSION_SECRET || "incrafto-local-dev-secret"
  return createHash("sha256").update(`${token}:${secret}`).digest("hex")
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)

  await prisma.session.create({
    data: {
      tokenHash: hashToken(token),
      userId,
      expiresAt,
    },
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  })
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (!token) {
    return null
  }

  const session = await prisma.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          course: true,
        },
      },
    },
  })

  if (!session || session.expiresAt <= new Date()) {
    await clearSession()
    return null
  }

  return session.user
}

export async function clearSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value

  if (token) {
    await prisma.session.deleteMany({
      where: { tokenHash: hashToken(token) },
    })
  }

  cookieStore.delete(SESSION_COOKIE)
}
