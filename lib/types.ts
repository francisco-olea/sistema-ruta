export type UserRole = "administrador" | "ruta"

export interface User {
  id: string
  username: string
  password?: string
  nombre: string
  role: UserRole
  rutaNumero: number
}

export type Estatus = "Pendiente" | "Listo" | "Cerrado" | "Material Estorbando" | "Notas"

export interface RouteStop {
  id: number
  cliente: string
  ubicacion: string
  notas: string
  estatus: Estatus
  evidencia1: string | null
  evidencia2: string | null
  evidencia3: string | null
  evidencia4: string | null
  evidencia5: string | null
  firma: string | null
  hora_firma: string | null
}

export interface DayRoutes {
  [day: string]: RouteStop[]
}

export interface Client {
  id: number
  nombre: string
  empresa: string
  telefono: string
  email: string
  direccion: string
  activo: boolean
}
