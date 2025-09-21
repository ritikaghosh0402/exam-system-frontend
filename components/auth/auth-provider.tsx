"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type UserRole = "STUDENT" | "ADMIN"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  logout: () => void
  loading: boolean
  adminLogin: (email: string, password: string, adminKey: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const storedUser = localStorage.getItem("exam-system-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("exam-system-user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Login failed")

      setUser(data.user)
      localStorage.setItem("exam-system-user", JSON.stringify(data.user))
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      const mockUser = {
        id: "google-" + Math.random().toString(36).substr(2, 9),
        email: "demo@gmail.com",
        name: "Demo User",
        role: "STUDENT" as UserRole,
      }
      setUser(mockUser)
      localStorage.setItem("exam-system-user", JSON.stringify(mockUser))
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }), // ✅ fixed: no hardcoding
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Registration failed")

      setUser(data.user)
      localStorage.setItem("exam-system-user", JSON.stringify(data.user))
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("exam-system-user")
  }

  const adminLogin = async (email: string, password: string, adminKey: string) => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, adminKey }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Admin login failed")

      setUser(data.user)
      localStorage.setItem("exam-system-user", JSON.stringify(data.user))
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loginWithGoogle,
        register,
        logout,
        loading,
        adminLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
