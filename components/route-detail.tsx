"use client"

import { useState } from "react"
import type { RouteStop, Estatus } from "@/lib/types"
import { useAppData } from "@/lib/data-context"
import { SignaturePad } from "./signature-pad"
import { EvidenceGrid } from "./evidence-capture"
import {
  MapPin,
  User,
  ClipboardList,
  Clock,
  ChevronLeft,
  Save,
  CheckCircle2,
} from "lucide-react"

interface RouteDetailProps {
  stop: RouteStop
  rutaNumero: string
  day: string
  onBack: () => void
}

const ESTATUS_OPTIONS: Estatus[] = [
  "Pendiente",
  "Listo",
  "Cerrado",
  "Material Estorbando",
  "Notas",
]

export function RouteDetail({ stop, rutaNumero, day, onBack }: RouteDetailProps) {
  const { updateRouteStop } = useAppData()
  const [notas, setNotas] = useState(stop.notas)
  const [estatus, setEstatus] = useState<Estatus>(stop.estatus)
  const [evidencias, setEvidencias] = useState<(string | null)[]>([
    stop.evidencia1,
    stop.evidencia2,
    stop.evidencia3,
    stop.evidencia4,
    stop.evidencia5,
  ])
  const [firma, setFirma] = useState<string | null>(stop.firma)
  const [saved, setSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleEvidenciaChange = (index: number, value: string | null) => {
    setEvidencias((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    const now = new Date()
    const horaFirma = firma && !stop.hora_firma
      ? now.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })
      : stop.hora_firma

    try {
      await updateRouteStop(rutaNumero, day, stop.id, {
        notas,
        estatus,
        evidencia1: evidencias[0],
        evidencia2: evidencias[1],
        evidencia3: evidencias[2],
        evidencia4: evidencias[3],
        evidencia5: evidencias[4],
        firma,
        hora_firma: horaFirma,
      })

      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        onBack()
      }, 1200)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 pb-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1 self-start text-sm font-medium text-primary hover:underline"
      >
        <ChevronLeft className="h-4 w-4" />
        Volver a la ruta
      </button>

      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-card-foreground">
          Detalle de parada #{stop.id}
        </h2>

        {/* Read-only fields */}
        <div className="mb-4 flex flex-col gap-3">
          <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
            <User className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">Cliente</p>
              <p className="text-sm font-medium text-card-foreground">{stop.cliente}</p>
            </div>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-medium text-muted-foreground">Ubicacion</p>
              <p className="text-sm text-card-foreground">{stop.ubicacion}</p>
            </div>
          </div>
          {stop.hora_firma && (
            <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Hora de firma</p>
                <p className="text-sm text-card-foreground">{stop.hora_firma}</p>
              </div>
            </div>
          )}
        </div>

        {/* Editable fields */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-card-foreground flex items-center gap-1.5">
              <ClipboardList className="h-4 w-4 text-primary" />
              Estatus
            </label>
            <div className="flex flex-wrap gap-2">
              {ESTATUS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setEstatus(opt)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                    estatus === opt
                      ? opt === "Listo"
                        ? "bg-status-listo text-primary-foreground"
                        : opt === "Cerrado" || opt === "Material Estorbando"
                        ? "bg-status-cerrado text-primary-foreground"
                        : opt === "Notas"
                        ? "bg-status-notas text-primary-foreground"
                        : "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="notas" className="text-sm font-medium text-card-foreground">
              Notas
            </label>
            <textarea
              id="notas"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              rows={3}
              placeholder="Escriba notas adicionales..."
              className="rounded-lg border border-input bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
          </div>

          <EvidenceGrid
            evidencias={evidencias}
            onChange={handleEvidenciaChange}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-card-foreground">Firma del encargado</label>
            <SignaturePad value={firma} onChange={setFirma} />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saved || isSaving}
        className={`flex h-12 items-center justify-center gap-2 rounded-xl font-medium text-primary-foreground transition-colors ${
          saved || isSaving
            ? "bg-status-listo"
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {saved ? (
          <>
            <CheckCircle2 className="h-5 w-5" />
            Guardado
          </>
        ) : isSaving ? (
          <>
            <Save className="h-5 w-5" />
            Guardando...
          </>
        ) : (
          <>
            <Save className="h-5 w-5" />
            Guardar
          </>
        )}
      </button>
    </div>
  )
}
