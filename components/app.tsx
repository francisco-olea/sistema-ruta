"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { LoginPage } from "./login-page"
import { LoadingScreen } from "./loading-screen"
import { Dashboard } from "./dashboard"

export function App() {
  const { user, isLoading } = useAuth()
  const [showLoading, setShowLoading] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)

  if (isLoading && !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-primary text-primary-foreground">
        Restaurando sesion...
      </div>
    )
  }

  // When user just logged in, show loading screen
  if (user && !loadingDone) {
    if (!showLoading) {
      setShowLoading(true)
    }
    return <LoadingScreen onFinish={() => setLoadingDone(true)} />
  }

  if (!user) {
    return <LoginPage />
  }

  return <Dashboard />
}
