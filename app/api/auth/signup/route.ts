import { NextResponse } from "next/server"
import { Prisma } from "@prisma/client"
import { hashPassword } from "@/lib/password"
import { prisma } from "@/lib/prisma"
import { createSession } from "@/lib/session"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const name = String(body?.name || "").trim()
  const email = String(body?.email || "").trim().toLowerCase()
  const phone = String(body?.phone || "").trim()
  const course = String(body?.course || "").trim()
  const password = String(body?.password || "")

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 })
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        course: course || null,
        passwordHash: hashPassword(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        course: true,
      },
    })

    await createSession(user.id)

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 })
    }

    return NextResponse.json({ error: "Unable to create account." }, { status: 500 })
  }
}
