"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  phone?: string | null
  course?: string | null
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; name?: string; error?: string }>
  register: (data: RegisterInput) => Promise<{ success: boolean; error?: string }>
  refreshUser: (user: User) => void
  logout: () => Promise<void>
}

type RegisterInput = {
  name: string
  email: string
  password: string
  phone?: string
  course?: string
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  refreshUser: () => {},
  logout: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        })
        const data = await response.json()

        if (mounted) {
          setUser(data.user)
        }
      } catch {
        if (mounted) {
          setUser(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadSession()

    return () => {
      mounted = false
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Invalid email or password." }
      }

      setUser(data.user)
      return { success: true, name: data.user.name }
    } catch {
      return { success: false, error: "Unable to sign in right now." }
    }
  }

  const register = async (input: RegisterInput) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(input),
      })
      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Unable to create account." }
      }

      setUser(data.user)
      return { success: true }
    } catch {
      return { success: false, error: "Unable to create account right now." }
    }
  }

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).catch(() => null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, refreshUser: setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
