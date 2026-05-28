"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, UserPlus, ArrowLeft, AlertCircle, CheckCircle2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"

export default function SignupPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    course: "",
    agreed: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  const courses = [
    "AI & Machine Learning",
    "Full Stack Development",
    "Data Science & Analytics",
    "3D Animation & VFX",
    "Digital Marketing",
    "Corporate Training",
  ]

  const passwordStrength = (pwd: string) => {
    if (pwd.length === 0) return { score: 0, label: "", color: "" }
    if (pwd.length < 6) return { score: 1, label: "Weak", color: "bg-destructive" }
    if (pwd.length < 10) return { score: 2, label: "Fair", color: "bg-accent" }
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return { score: 4, label: "Strong", color: "bg-chart-2" }
    return { score: 3, label: "Good", color: "bg-primary" }
  }

  const strength = passwordStrength(form.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (!form.agreed) {
      setError("Please accept the terms and conditions.")
      return
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)
    const result = await register({
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
      course: form.course,
    })
    if (result.success) {
      setSuccess(`Account created! Welcome, ${form.name}! Taking you home...`)
      setTimeout(() => router.push("/"), 1500)
    } else {
      setError(result.error || "Something went wrong. Please try again.")
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-gradient-to-br from-black via-zinc-950 to-black flex-col items-center justify-center p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-muted/40 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-muted/20 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 text-center max-w-sm">
          <Link href="/" className="inline-flex items-center gap-3 mb-10">
            <svg viewBox="0 0 50 50" className="h-12 w-12">
              <path d="M10 40 L25 10 L30 25" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M25 25 L40 25" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M35 20 L40 25 L35 30" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-3xl font-bold text-foreground">Incrafto</span>
          </Link>

          <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
            Start Your <span className="text-foreground">Journey</span> Today
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            Create your free account and get instant access to 50+ career-focused courses.
          </p>

          {/* Perks */}
          <div className="space-y-3 text-left">
            {[
              "Access to all free course previews",
              "Personalized learning dashboard",
              "Industry-recognized certificates",
              "1-on-1 mentorship sessions",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg py-8"
        >
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <svg viewBox="0 0 50 50" className="h-9 w-9">
              <path d="M10 40 L25 10 L30 25" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M25 25 L40 25" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M35 20 L40 25 L35 30" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-2xl font-bold text-foreground">Incrafto</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-8">Free forever. No credit card required.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Phone row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="signup-email" className="text-sm font-medium text-foreground">Email Address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            {/* Course interest */}
            <div className="space-y-2">
              <label htmlFor="course" className="text-sm font-medium text-foreground">Interested Course <span className="text-muted-foreground font-normal">(optional)</span></label>
              <select
                id="course"
                name="course"
                value={form.course}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-card text-muted-foreground">Select a course...</option>
                {courses.map((c) => (
                  <option key={c} value={c} className="bg-card">{c}</option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="signup-password" className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength indicator */}
              {form.password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength.score ? strength.color : "bg-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">Strength: <span className="text-foreground">{strength.label}</span></span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-destructive-foreground">Passwords do not match</p>
              )}
              {form.confirmPassword && form.password === form.confirmPassword && form.password.length > 0 && (
                <p className="text-xs text-foreground flex items-center gap-1">
                  <Check className="w-3 h-3" /> Passwords match
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                id="agreed"
                name="agreed"
                type="checkbox"
                checked={form.agreed}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 rounded border-border accent-primary cursor-pointer"
              />
              <label htmlFor="agreed" className="text-sm text-muted-foreground cursor-pointer">
                I agree to the{" "}
                <Link href="#" className="text-foreground hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link href="#" className="text-foreground hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {/* Error / Success */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-sm text-foreground"
              >
                <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-muted/50 border border-border text-sm text-foreground"
              >
                <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" />
                {success}
              </motion.div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-xl text-base font-semibold bg-primary hover:bg-primary/90 text-foreground-foreground transition-all shadow-lg hover:shadow-primary/25 hover:shadow-xl disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </span>
              )}
            </Button>
          </form>

          <p className="text-center mt-8 text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
