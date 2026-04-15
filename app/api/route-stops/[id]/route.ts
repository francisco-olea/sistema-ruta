import { NextResponse } from "next/server"
import { pool } from "@/lib/server/db"

export const runtime = "nodejs"

type RouteStopUpdatePayload = {
  notas?: string
  estatus?: "Pendiente" | "Listo" | "Cerrado" | "Material Estorbando" | "Notas"
  evidencia1?: string | null
  evidencia2?: string | null
  evidencia3?: string | null
  evidencia4?: string | null
  evidencia5?: string | null
  firma?: string | null
  hora_firma?: string | null
}

function toDbStatus(
  estatus: RouteStopUpdatePayload["estatus"]
):
  | "pendiente"
  | "en_proceso"
  | "completado"
  | "cerrado"
  | "material_estorbando"
  | "notas" {
  switch (estatus) {
    case "Listo":
      return "completado"
    case "Pendiente":
      return "pendiente"
    case "Cerrado":
      return "cerrado"
    case "Material Estorbando":
      return "material_estorbando"
    case "Notas":
      return "notas"
    default:
      return "en_proceso"
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = (await request.json()) as RouteStopUpdatePayload
  const horaFirma =
    typeof body.hora_firma === "string" && body.hora_firma.trim() !== ""
      ? body.hora_firma.trim()
      : null

  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 })
  }

  await pool.query(
    `
      DO $$
      BEGIN
        BEGIN
          ALTER TYPE renta.estatus_ruta ADD VALUE IF NOT EXISTS 'cerrado';
        EXCEPTION WHEN duplicate_object THEN NULL;
        END;

        BEGIN
          ALTER TYPE renta.estatus_ruta ADD VALUE IF NOT EXISTS 'material_estorbando';
        EXCEPTION WHEN duplicate_object THEN NULL;
        END;

        BEGIN
          ALTER TYPE renta.estatus_ruta ADD VALUE IF NOT EXISTS 'notas';
        EXCEPTION WHEN duplicate_object THEN NULL;
        END;
      END
      $$;
    `
  )

  await pool.query(
    `
      UPDATE renta.registros_ruta
      SET
        notas = COALESCE($2, notas),
        estatus = COALESCE($3::renta.estatus_ruta, estatus),
        evidencia1 = $4,
        evidencia2 = $5,
        evidencia3 = $6,
        evidencia4 = $7,
        evidencia5 = $8,
        firma = $9,
        hora_firma = $10::time
      WHERE id = $1
    `,
    [
      Number(id),
      body.notas ?? null,
      body.estatus ? toDbStatus(body.estatus) : null,
      body.evidencia1 ?? null,
      body.evidencia2 ?? null,
      body.evidencia3 ?? null,
      body.evidencia4 ?? null,
      body.evidencia5 ?? null,
      body.firma ?? null,
      horaFirma,
    ]
  )

  return NextResponse.json({ ok: true })
}
