"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { COMPANY_NAME } from "@/lib/mock-data"
import { Droplets, Eye, EyeOff } from "lucide-react"

export function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    const success = await login(username, password)
    if (!success) {
      setError("Credenciales incorrectas")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-primary p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur-sm">
            <Droplets className="h-9 w-9 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary-foreground text-balance text-center">
            {COMPANY_NAME}
          </h1>
          <p className="text-sm text-primary-foreground/70">
            Servicio de Limpieza Portátil
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl bg-card p-6 shadow-xl"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-sm font-medium text-card-foreground">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-card-foreground">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
                className="h-10 w-full rounded-lg border border-input bg-background pr-10 pl-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 h-10 rounded-lg bg-primary font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? "Ingresando..." : "Iniciar Sesión"}
          </button>

          <div className="mt-2 rounded-lg bg-muted p-3">
            <p className="mb-1.5 text-xs font-semibold text-muted-foreground">Credenciales de prueba:</p>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <p><span className="font-medium text-foreground">Ruta 4:</span> ruta4 / ruta123</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
