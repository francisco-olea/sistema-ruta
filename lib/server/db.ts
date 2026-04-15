import { Pool } from "pg"

declare global {
  // eslint-disable-next-line no-var
  var __rutarentaPool: Pool | undefined
}

function createPool() {
  const sslMode = (process.env.PGSSLMODE ?? "disable").toLowerCase()
  const useSsl = sslMode === "require" || sslMode === "verify-ca" || sslMode === "verify-full"

  return new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: useSsl ? { rejectUnauthorized: sslMode !== "require" } : false,
  })
}

export const pool = global.__rutarentaPool ?? createPool()

if (process.env.NODE_ENV !== "production") {
  global.__rutarentaPool = pool
}
