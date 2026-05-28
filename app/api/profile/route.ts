import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/session"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json({ error: "Please sign in to update your profile." }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const name = String(body?.name || "").trim()
  const phone = String(body?.phone || "").trim()
  const course = String(body?.course || "").trim()

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 })
  }

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: {
      name,
      phone: phone || null,
      course: course || null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      course: true,
    },
  })

  return NextResponse.json({ user })
}
