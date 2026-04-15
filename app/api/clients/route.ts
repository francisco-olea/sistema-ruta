import { NextResponse } from "next/server"
import { pool } from "@/lib/server/db"

export const runtime = "nodejs"

type ClientPayload = {
  nombre?: string
  empresa?: string
  telefono?: string
  email?: string
  direccion?: string
  activo?: boolean
}

export async function POST(request: Request) {
  const body = (await request.json()) as ClientPayload

  if (!body.nombre || !body.empresa || !body.telefono || !body.email || !body.direccion) {
    return NextResponse.json({ error: "Campos incompletos" }, { status: 400 })
  }

  const nextIdResult = await pool.query<{ next_id: number }>(
    "SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM renta.clientes"
  )
  const nextId = nextIdResult.rows[0].next_id

  await pool.query(
    `
      INSERT INTO renta.clientes
        (id, nombre, telefono, email, empresa, rfc, domicilio, created_at)
      VALUES
        ($1, $2, $3, $4, $5, '', $6, CURRENT_DATE)
    `,
    [nextId, body.nombre, body.telefono, body.email, body.empresa, body.direccion]
  )

  return NextResponse.json({
    client: {
      id: nextId,
      nombre: body.nombre,
      empresa: body.empresa,
      telefono: body.telefono,
      email: body.email,
      direccion: body.direccion,
      activo: body.activo ?? true,
    },
  })
}
