"use client"

import type { RouteStop, Estatus } from "@/lib/types"
import { MapPin, ChevronRight } from "lucide-react"

interface RouteTableProps {
  stops: RouteStop[]
  onSelect: (stop: RouteStop) => void
}

function getStatusColor(estatus: Estatus) {
  switch (estatus) {
    case "Listo":
      return "bg-status-listo/15 border-status-listo text-status-listo"
    case "Cerrado":
    case "Material Estorbando":
      return "bg-status-cerrado/15 border-status-cerrado text-status-cerrado"
    case "Notas":
      return "bg-status-notas/15 border-status-notas text-status-notas"
    default:
      return "bg-muted border-border text-muted-foreground"
  }
}

function getRowHighlight(estatus: Estatus) {
  switch (estatus) {
    case "Listo":
      return "border-l-4 border-l-status-listo bg-status-listo/5"
    case "Cerrado":
    case "Material Estorbando":
      return "border-l-4 border-l-status-cerrado bg-status-cerrado/5"
    case "Notas":
      return "border-l-4 border-l-status-notas bg-status-notas/5"
    default:
      return "border-l-4 border-l-transparent"
  }
}

export function RouteTable({ stops, onSelect }: RouteTableProps) {
  if (stops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <MapPin className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">
          No hay paradas asignadas para este dia
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {stops.map((stop) => (
        <button
          key={stop.id}
          onClick={() => onSelect(stop)}
          className={`flex items-center gap-3 rounded-xl border bg-card p-3 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.99] ${getRowHighlight(stop.estatus)}`}
        >
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                {stop.id}
              </span>
              <p className="truncate text-sm font-semibold text-card-foreground">
                {stop.cliente}
              </p>
            </div>
            <div className="flex items-center gap-1.5 pl-8">
              <MapPin className="h-3 w-3 shrink-0 text-muted-foreground" />
              <p className="truncate text-xs text-muted-foreground">
                {stop.ubicacion}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`rounded-lg border px-2 py-0.5 text-[10px] font-semibold ${getStatusColor(stop.estatus)}`}
            >
              {stop.estatus}
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </button>
      ))}
    </div>
  )
}
