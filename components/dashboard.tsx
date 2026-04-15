"use client"

import { useState, useCallback } from "react"
import { useAuth } from "@/lib/auth-context"
import { useAppData } from "@/lib/data-context"
import { DAYS, COMPANY_NAME, type DayName } from "@/lib/mock-data"
import type { RouteStop } from "@/lib/types"
import { RouteTable } from "./route-table"
import { RouteDetail } from "./route-detail"
import { ClientsTable } from "./clients-table"
import {
  Droplets,
  Menu,
  X,
  LogOut,
  Calendar,
  Users,
  ChevronRight,
  Truck,
  Shield,
} from "lucide-react"

type View = "rutas" | "clientes"

export function Dashboard() {
  const { user, logout } = useAuth()
  const { routes, isLoading } = useAppData()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState<View>("rutas")
  const [selectedDay, setSelectedDay] = useState<DayName>("Lunes")
  const [selectedStop, setSelectedStop] = useState<RouteStop | null>(null)

  const rutaNumero = user!.role === "administrador" ? "1" : String(user!.rutaNumero)
  const dayStops = routes[rutaNumero]?.[selectedDay] || []

  const handleDaySelect = useCallback((day: DayName) => {
    setSelectedDay(day)
    setSelectedStop(null)
    setCurrentView("rutas")
    setSidebarOpen(false)
  }, [])

  const handleViewClients = useCallback(() => {
    setCurrentView("clientes")
    setSelectedStop(null)
    setSidebarOpen(false)
  }, [])

  const today = new Date()
  const dayIndex = today.getDay()
  const todayName = DAYS[dayIndex === 0 ? 6 : dayIndex - 1]

  if (isLoading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background text-muted-foreground">
        Cargando datos desde PostgreSQL...
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b border-sidebar-border p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary">
              <Droplets className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-sidebar-foreground">{COMPANY_NAME}</p>
              <p className="text-[10px] text-sidebar-foreground/60">Sistema de Rutas</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent lg:hidden"
            aria-label="Cerrar menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* User info */}
        <div className="border-b border-sidebar-border p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
              {user?.role === "administrador" ? (
                <Shield className="h-4 w-4 text-sidebar-primary" />
              ) : (
                <Truck className="h-4 w-4 text-sidebar-primary" />
              )}
            </div>
            <div>
              <p className={`text-sm font-semibold text-sidebar-foreground ${user?.role === "ruta" && user?.rutaNumero === 1 ? "italic" : ""}`}>
                {user?.nombre}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/50">
                {user?.role === "administrador" ? "Administrador" : `Ruta ${user?.rutaNumero}`}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          {/* Days */}
          <div className="mb-2">
            <p className="mb-2 flex items-center gap-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              <Calendar className="h-3 w-3" />
              Dias de la semana
            </p>
            <div className="flex flex-col gap-0.5">
              {DAYS.map((day) => {
                const isToday = day === todayName
                const isActive = currentView === "rutas" && selectedDay === day
                const dayStopsCount = routes[rutaNumero]?.[day]?.length || 0
                return (
                  <button
                    key={day}
                    onClick={() => handleDaySelect(day)}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isToday && !isActive ? "text-sidebar-primary" : ""}`}>
                        {day}
                      </span>
                      {isToday && (
                        <span className={`rounded px-1 text-[9px] font-bold ${
                          isActive
                            ? "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
                            : "bg-sidebar-primary/20 text-sidebar-primary"
                        }`}>
                          HOY
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs ${isActive ? "text-sidebar-primary-foreground/70" : "text-sidebar-foreground/40"}`}>
                        {dayStopsCount}
                      </span>
                      <ChevronRight className={`h-3 w-3 ${isActive ? "text-sidebar-primary-foreground/70" : "text-sidebar-foreground/30"}`} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Clients */}
          <div className="mt-4">
            <p className="mb-2 flex items-center gap-1.5 px-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              <Users className="h-3 w-3" />
              Gestion
            </p>
            <button
              onClick={handleViewClients}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                currentView === "clientes"
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
              }`}
            >
              <span className="font-medium">Clientes</span>
              <ChevronRight className="h-3 w-3 opacity-50" />
            </button>
          </div>
        </nav>

        {/* Logout */}
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card px-4 py-3 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex min-w-0 flex-1 flex-col">
            <h1 className="truncate text-base font-bold text-foreground">
              {COMPANY_NAME}
              {user?.role !== "administrador" && (
                <span className="ml-2 text-primary">
                  - Ruta {user?.rutaNumero}
                </span>
              )}
            </h1>
            <p className="text-xs text-muted-foreground">
              {currentView === "rutas"
                ? `${selectedDay} - ${dayStops.length} parada${dayStops.length !== 1 ? "s" : ""}`
                : "Directorio de clientes"}
            </p>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4">
          {currentView === "clientes" ? (
            <ClientsTable />
          ) : selectedStop ? (
            <RouteDetail
              stop={selectedStop}
              rutaNumero={rutaNumero}
              day={selectedDay}
              onBack={() => setSelectedStop(null)}
            />
          ) : (
            <RouteTable stops={dayStops} onSelect={setSelectedStop} />
          )}
        </div>
      </main>
    </div>
  )
}
