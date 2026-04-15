"use client"

import { useRef } from "react"
import { Camera, X, ImageIcon } from "lucide-react"

interface EvidenceCaptureProps {
  label: string
  value: string | null
  onChange: (data: string | null) => void
  disabled?: boolean
}

export function EvidenceCapture({ label, value, onChange, disabled = false }: EvidenceCaptureProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      onChange(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {value ? (
        <div className="group relative h-20 w-20 overflow-hidden rounded-lg border border-border">
          <img src={value} alt={label} className="h-full w-full object-cover" />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
              aria-label={`Eliminar ${label}`}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => !disabled && inputRef.current?.click()}
          disabled={disabled}
          className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-input bg-muted/50 text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
        >
          <Camera className="h-5 w-5" />
          <span className="text-[10px]">Foto</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleCapture}
        className="hidden"
        aria-label={`Capturar ${label}`}
      />
    </div>
  )
}

export function EvidenceGrid({
  evidencias,
  onChange,
  disabled = false,
}: {
  evidencias: (string | null)[]
  onChange: (index: number, value: string | null) => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
        <ImageIcon className="h-4 w-4 text-primary" />
        Evidencias
      </label>
      <div className="flex flex-wrap gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <EvidenceCapture
            key={i}
            label={`Evidencia ${i + 1}`}
            value={evidencias[i]}
            onChange={(val) => onChange(i, val)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}
