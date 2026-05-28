"use client"

import { useEffect, useMemo, useState, type ElementType } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, CalendarDays, CheckCircle2, Mail, Phone, Save, ShieldCheck, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/incrafto/header"
import { Footer } from "@/components/incrafto/footer"
import { useAuth } from "@/lib/auth-context"

const courses = [
  "AI & Machine Learning",
  "Full Stack Development",
  "Data Science & Analytics",
  "3D Animation & VFX",
  "Digital Marketing",
  "Corporate Training",
]

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading, refreshUser } = useAuth()
  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [loading, router, user])

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        phone: user.phone || "",
        course: user.course || "",
      })
    }
  }, [user])

  const initials = useMemo(() => {
    if (!user?.name) return "IN"

    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }, [user?.name])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    setSuccess("")
    setSaving(true)

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Unable to update profile.")
        return
      }

      refreshUser(data.user)
      setSuccess("Profile updated successfully.")
    } catch {
      setError("Unable to update profile right now.")
    } finally {
      setSaving(false)
    }
  }

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <section className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="h-10 w-10 rounded-full border-2 border-muted border-t-foreground animate-spin" />
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-2xl bg-foreground text-background flex items-center justify-center text-2xl font-bold">
                {initials}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Student Profile</p>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground mt-2">{user.name}</h1>
                <p className="text-muted-foreground mt-2">{user.email}</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground w-fit">
              <ShieldCheck className="h-4 w-4" />
              Verified student account
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">Personal Details</h2>
                <p className="text-muted-foreground mt-1">Keep your learning profile accurate and up to date.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">Full Name</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full rounded-lg bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">Email Address</span>
                <input
                  value={user.email}
                  disabled
                  className="w-full rounded-lg bg-muted/40 border border-border px-4 py-3 text-muted-foreground cursor-not-allowed"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">Phone Number</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg bg-background border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-foreground">Interested Course</span>
                <select
                  value={form.course}
                  onChange={(event) => setForm((prev) => ({ ...prev, course: event.target.value }))}
                  className="w-full rounded-lg bg-background border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </label>
            </div>

            {error && (
              <div className="mt-6 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-foreground">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4" />
                {success}
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <Button type="submit" disabled={saving} className="rounded-lg px-6">
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>

          <aside className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Account Summary</h2>
              <div className="mt-5 space-y-4">
                <ProfileRow icon={UserRound} label="Name" value={user.name} />
                <ProfileRow icon={Mail} label="Email" value={user.email} />
                <ProfileRow icon={Phone} label="Phone" value={user.phone || "Not added"} />
                <ProfileRow icon={BookOpen} label="Course" value={user.course || "Not selected"} />
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground">Learning Status</h2>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-muted/40 p-3">
                  <span className="text-muted-foreground">Profile</span>
                  <span className="text-foreground font-medium">{user.phone && user.course ? "Complete" : "Needs details"}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/40 p-3">
                  <span className="text-muted-foreground">Enrollment</span>
                  <span className="text-foreground font-medium">Pending</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/40 p-3">
                  <span className="text-muted-foreground">Counseling</span>
                  <span className="text-foreground font-medium">Available</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <CalendarDays className="h-5 w-5" />
                <p className="text-sm">Your account is connected to the InCrafto backend and protected with a server session.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function ProfileRow({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
        <Icon className="h-4 w-4 text-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground mt-1 break-words">{value}</p>
      </div>
    </div>
  )
}
