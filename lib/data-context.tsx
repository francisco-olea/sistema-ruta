"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import type { RouteStop, DayRoutes, Client } from "@/lib/types"
import { INITIAL_ROUTES, CLIENTS } from "@/lib/mock-data"

interface AppDataContextType {
  routes: Record<string, DayRoutes>
  clients: Client[]
  isLoading: boolean
  updateRouteStop: (rutaNumero: string, day: string, stopId: number, data: Partial<RouteStop>) => Promise<void>
  addClient: (client: Omit<Client, "id">) => Promise<void>
  updateClient: (id: number, data: Partial<Client>) => void
}

const AppDataContext = createContext<AppDataContextType | null>(null)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [routes, setRoutes] = useState<Record<string, DayRoutes>>(INITIAL_ROUTES)
  const [clients, setClients] = useState<Client[]>(CLIENTS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const response = await fetch("/api/app-data", { cache: "no-store" })
        if (!response.ok) {
          throw new Error("No se pudo cargar la informacion")
        }

        const payload = (await response.json()) as {
          routes: Record<string, DayRoutes>
          clients: Client[]
        }

        if (!isMounted) return
        setRoutes(payload.routes)
        setClients(payload.clients)
      } catch (error) {
        console.error(error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  const updateRouteStop = useCallback(
    async (rutaNumero: string, day: string, stopId: number, data: Partial<RouteStop>) => {
      const response = await fetch(`/api/route-stops/${stopId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("No se pudo actualizar la parada")
      }

      setRoutes((prev) => {
        const updated = { ...prev }
        const dayStops = [...(updated[rutaNumero]?.[day] || [])]
        const idx = dayStops.findIndex((s) => s.id === stopId)
        if (idx !== -1) {
          dayStops[idx] = { ...dayStops[idx], ...data }
        }
        updated[rutaNumero] = { ...updated[rutaNumero], [day]: dayStops }
        return updated
      })
    },
    []
  )

  const addClient = useCallback(async (client: Omit<Client, "id">) => {
    const response = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(client),
    })

    if (!response.ok) {
      throw new Error("No se pudo agregar el cliente")
    }

    const payload = (await response.json()) as { client: Client }
    setClients((prev) => [...prev, payload.client])
  }, [])

  const updateClient = useCallback((id: number, data: Partial<Client>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)))
  }, [])

  return (
    <AppDataContext.Provider value={{ routes, clients, isLoading, updateRouteStop, addClient, updateClient }}>
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const context = useContext(AppDataContext)
  if (!context) throw new Error("useAppData must be used within AppDataProvider")
  return context
}
