"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { COMPANY_NAME } from "@/lib/mock-data"

export function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onFinish, 300)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-2xl bg-white p-2">
          <Image
            src="/logo%20sp.png"
            alt={`${COMPANY_NAME} logo`}
            width={512}
            height={512}
            className="h-full w-full object-contain"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-primary-foreground">
          {COMPANY_NAME}
        </h1>
        <p className="text-sm text-primary-foreground/70">Cargando sistema...</p>
      </div>
      <div className="w-48 overflow-hidden rounded-full bg-primary-foreground/20">
        <div
          className="h-1.5 rounded-full bg-primary-foreground transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
