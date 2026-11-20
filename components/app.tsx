"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { LoginPage } from "./login-page"
import { LoadingScreen } from "./loading-screen"
import { Dashboard } from "./dashboard"

export function App() {
  const { user, isLoading, isNewLogin } = useAuth()
  const [loadingDone, setLoadingDone] = useState(false)

  useEffect(() => {
    if (!user) {
      setLoadingDone(false)
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-primary text-primary-foreground">
        Restaurando sesion...
      </div>
    )
  }

  if (user && isNewLogin && !loadingDone) {
    return <LoadingScreen onFinish={() => setLoadingDone(true)} />
  }

  if (!user) {
    return <LoginPage />
  }

  return <Dashboard />
}
