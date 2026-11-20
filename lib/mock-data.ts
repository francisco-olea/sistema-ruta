import type { DayRoutes, Client } from "./types"

export const COMPANY_NAME = "Soluciones Portátiles"

export const DAYS = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
] as const

export type DayName = (typeof DAYS)[number]

export const INITIAL_ROUTES: Record<string, DayRoutes> = {}

export const CLIENTS: Client[] = []
