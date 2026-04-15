"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { User } from "@/lib/types"

const AUTH_USER_STORAGE_KEY = "rutarenta.auth.user"
const TEST_USER: User = {
  id: "4",
  username: "ruta4",
  nombre: "Ruta 4",
  role: "ruta",
  rutaNumero: 4,
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem(AUTH_USER_STORAGE_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User)
      } catch {
        localStorage.removeItem(AUTH_USER_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true)

    const normalizedUsername = username.trim().toLowerCase()
    const isValid = normalizedUsername === "ruta4" && password === "ruta123"
    if (!isValid) {
      setIsLoading(false)
      return false
    }

    setUser(TEST_USER)
    localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(TEST_USER))

    setIsLoading(false)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_USER_STORAGE_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
