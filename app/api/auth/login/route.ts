import { NextResponse } from "next/server"
import { pool } from "@/lib/server/db"

export const runtime = "nodejs"

type LoginRequest = {
  username?: string
  password?: string
}

function mapUser(username: string, id: string) {
  const normalized = username.trim().toLowerCase()
  const routeMatch = normalized.match(/^ruta(\d+)$/)

  if (normalized === "admin") {
    return {
      id,
      username,
      nombre: "Administrador",
      role: "administrador" as const,
      rutaNumero: 0,
    }
  }

  if (routeMatch) {
    const routeNumber = Number(routeMatch[1])
    return {
      id,
      username,
      nombre: `Ruta ${routeNumber}`,
      role: "ruta" as const,
      rutaNumero: routeNumber,
    }
  }

  return {
    id,
    username,
    nombre: username,
    role: "ruta" as const,
    rutaNumero: 1,
  }
}

export async function POST(request: Request) {
  const body = (await request.json()) as LoginRequest

  if (!body.username || !body.password) {
    return NextResponse.json({ error: "Credenciales incompletas" }, { status: 400 })
  }

  const result = await pool.query<{
    id: string
    username: string
  }>(
    `
      SELECT id::text AS id, username
      FROM renta.usuarios
      WHERE username = $1 AND password_plain = $2
      LIMIT 1
    `,
    [body.username, body.password]
  )

  const row = result.rows[0]
  if (!row) {
    return NextResponse.json({ error: "Credenciales invalidas" }, { status: 401 })
  }

  return NextResponse.json({ user: mapUser(row.username, row.id) })
}
