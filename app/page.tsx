"use client"

import { AuthProvider } from "@/lib/auth-context"
import { AppDataProvider } from "@/lib/data-context"
import { App } from "@/components/app"

export default function Page() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <App />
      </AppDataProvider>
    </AuthProvider>
  )
}
