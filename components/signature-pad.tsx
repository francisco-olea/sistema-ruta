"use client"

import { useRef, useEffect, useState, useCallback } from "react"

interface SignaturePadProps {
  value: string | null
  onChange: (data: string | null) => void
  disabled?: boolean
}

export function SignaturePad({ value, onChange, disabled = false }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const getCoords = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.lineWidth = 2
    ctx.strokeStyle = "#1e3a5f"

    if (value) {
      const img = new window.Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height)
      }
      img.src = value
    }
  }, [value])

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    if (disabled) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return
    const { x, y } = getCoords(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing || disabled) return
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return
    const { x, y } = getCoords(e)
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      onChange(canvas.toDataURL("image/png"))
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr)
    onChange(null)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-input bg-card">
        <canvas
          ref={canvasRef}
          className="h-32 w-full cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!value && !isDrawing && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Firme aqui</p>
          </div>
        )}
      </div>
      {!disabled && (
        <button
          type="button"
          onClick={clearSignature}
          className="self-end text-xs text-muted-foreground hover:text-foreground"
        >
          Limpiar firma
        </button>
      )}
    </div>
  )
}
