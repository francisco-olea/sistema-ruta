import { NextResponse } from "next/server"
import { pool } from "@/lib/server/db"

export const runtime = "nodejs"

type RouteStatus =
  | "pendiente"
  | "en_proceso"
  | "completado"
  | "cerrado"
  | "material_estorbando"
  | "notas"

type RouteStopResponse = {
  id: number
  cliente: string
  ubicacion: string
  notas: string
  estatus: "Pendiente" | "Listo" | "Cerrado" | "Material Estorbando" | "Notas"
  evidencia1: string | null
  evidencia2: string | null
  evidencia3: string | null
  evidencia4: string | null
  evidencia5: string | null
  firma: string | null
  hora_firma: string | null
}

function toUiStatus(estatus: RouteStatus) {
  switch (estatus) {
    case "completado":
      return "Listo"
    case "pendiente":
      return "Pendiente"
    case "cerrado":
      return "Cerrado"
    case "material_estorbando":
      return "Material Estorbando"
    case "notas":
    case "en_proceso":
      return "Notas"
    default:
      return "Pendiente"
  }
}

export async function GET() {
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
        estatus = CASE
          WHEN notas LIKE '__RR_STATUS__:cerrado%' THEN 'cerrado'::renta.estatus_ruta
          WHEN notas LIKE '__RR_STATUS__:material_estorbando%' THEN 'material_estorbando'::renta.estatus_ruta
          WHEN notas LIKE '__RR_STATUS__:notas%' THEN 'notas'::renta.estatus_ruta
          ELSE estatus
        END,
        notas = regexp_replace(notas, '^__RR_STATUS__:[^\n]*\n?', '')
      WHERE notas LIKE '__RR_STATUS__:%'
    `
  )

  await pool.query(
    `
      WITH source_days AS (
        SELECT
          o.id AS orden_id,
          o.cliente_nombre AS cliente,
          o.domicilio AS ubicacion,
          COALESCE(o.notas, '') AS notas,
          CASE
            WHEN o.estado = 'terminado' THEN 'completado'::renta.estatus_ruta
            WHEN o.estado = 'cancelado' THEN 'en_proceso'::renta.estatus_ruta
            ELSE 'pendiente'::renta.estatus_ruta
          END AS estatus,
          o.ruta,
          CASE
            WHEN LOWER(BTRIM(day_token.raw_day)) = 'lunes' THEN 'Lunes'
            WHEN LOWER(BTRIM(day_token.raw_day)) = 'martes' THEN 'Martes'
            WHEN LOWER(BTRIM(day_token.raw_day)) IN ('miercoles', 'miércoles') THEN 'Miercoles'
            WHEN LOWER(BTRIM(day_token.raw_day)) = 'jueves' THEN 'Jueves'
            WHEN LOWER(BTRIM(day_token.raw_day)) = 'viernes' THEN 'Viernes'
            WHEN LOWER(BTRIM(day_token.raw_day)) IN ('sabado', 'sábado') THEN 'Sabado'
            WHEN LOWER(BTRIM(day_token.raw_day)) = 'domingo' THEN 'Domingo'
            ELSE 'Lunes'
          END AS dia
        FROM renta.ordenes o
        CROSS JOIN LATERAL regexp_split_to_table(COALESCE(NULLIF(o.frecuencia, ''), 'Lunes'), ',') AS day_token(raw_day)
      ),
      missing_days AS (
        SELECT s.*
        FROM source_days s
        WHERE NOT EXISTS (
          SELECT 1
          FROM renta.registros_ruta r
          WHERE r.orden_id = s.orden_id AND r.dia = s.dia
        )
      )
      INSERT INTO renta.registros_ruta
        (
          id,
          orden_id,
          cliente,
          ubicacion,
          notas,
          estatus,
          ruta,
          dia,
          fecha
        )
      SELECT
        COALESCE((SELECT MAX(id) FROM renta.registros_ruta), 0) + ROW_NUMBER() OVER (ORDER BY orden_id, dia) AS id,
        orden_id,
        cliente,
        ubicacion,
        notas,
        estatus,
        ruta,
        dia,
        CURRENT_DATE AS fecha
      FROM missing_days
    `
  )

  const [clientsResult, routesResult] = await Promise.all([
    pool.query<{
      id: number
      nombre: string
      empresa: string
      telefono: string | null
      email: string | null
      domicilio: string
    }>(
      `
        SELECT id, nombre, empresa, telefono, email, domicilio
        FROM renta.clientes
        ORDER BY id ASC
      `
    ),
    pool.query<{
      id: number
      cliente: string
      ubicacion: string
      notas: string
      estatus: RouteStatus
      evidencia1: string | null
      evidencia2: string | null
      evidencia3: string | null
      evidencia4: string | null
      evidencia5: string | null
      firma: string | null
      hora_firma: string | null
      ruta: number
      dia: string
    }>(
      `
        SELECT
          id,
          cliente,
          ubicacion,
          notas,
          estatus,
          evidencia1,
          evidencia2,
          evidencia3,
          evidencia4,
          evidencia5,
          firma,
          TO_CHAR(hora_firma, 'HH24:MI') AS hora_firma,
          ruta,
          dia
        FROM renta.registros_ruta
        ORDER BY ruta ASC, dia ASC, id ASC
      `
    ),
  ])

  const clients = clientsResult.rows.map((row) => ({
    id: row.id,
    nombre: row.nombre,
    empresa: row.empresa,
    telefono: row.telefono ?? "",
    email: row.email ?? "",
    direccion: row.domicilio,
    activo: true,
  }))

  const routes: Record<string, Record<string, RouteStopResponse[]>> = {}
  for (const row of routesResult.rows) {
    const routeKey = String(row.ruta)
    if (!routes[routeKey]) {
      routes[routeKey] = {}
    }
    if (!routes[routeKey][row.dia]) {
      routes[routeKey][row.dia] = []
    }

    routes[routeKey][row.dia].push({
      id: row.id,
      cliente: row.cliente,
      ubicacion: row.ubicacion,
      notas: row.notas ?? "",
      estatus: toUiStatus(row.estatus),
      evidencia1: row.evidencia1,
      evidencia2: row.evidencia2,
      evidencia3: row.evidencia3,
      evidencia4: row.evidencia4,
      evidencia5: row.evidencia5,
      firma: row.firma,
      hora_firma: row.hora_firma,
    })
  }

  return NextResponse.json({ clients, routes })
}
