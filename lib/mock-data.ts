import type { User, DayRoutes, Client } from "./types"

export const USERS: User[] = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    nombre: "Carlos Ramirez",
    role: "administrador",
    rutaNumero: 0,
  },
  {
    id: "2",
    username: "ruta1",
    password: "ruta123",
    nombre: "Nombre Apellido",
    role: "ruta",
    rutaNumero: 1,
  },
  {
    id: "3",
    username: "ruta2",
    password: "ruta123",
    nombre: "Jose Hernandez",
    role: "ruta",
    rutaNumero: 2,
  },
]

export const COMPANY_NAME = "Soluciones Portátiles"

export const DAYS = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
] as const

export type DayName = (typeof DAYS)[number]

function generateRoutes(): Record<string, DayRoutes> {
  const clientesRuta1 = [
    { cliente: "Constructora Alfa", ubicacion: "Av. Reforma 450, Col. Centro" },
    { cliente: "Inmobiliaria Beta", ubicacion: "Blvd. Industrial 120, Zona Norte" },
    { cliente: "Desarrollo Gamma", ubicacion: "Carr. Nacional Km 15, Parque Industrial" },
    { cliente: "Constructora Delta", ubicacion: "Calle Roble 89, Fracc. Los Pinos" },
    { cliente: "Grupo Epsilon", ubicacion: "Av. Universidad 300, Col. Educacion" },
    { cliente: "Infraestructura Zeta", ubicacion: "Periferico Sur 1500, Zona Residencial" },
    { cliente: "Cementos Omega", ubicacion: "Carr. Saltillo Km 8, Parque Ind. Norte" },
  ]

  const clientesRuta2 = [
    { cliente: "Vialidades MX", ubicacion: "Libramiento Oriente Km 3" },
    { cliente: "Residencial Luna", ubicacion: "Av. Las Americas 200, Col. Moderna" },
    { cliente: "Puentes y Caminos", ubicacion: "Carr. Panamericana Km 22" },
    { cliente: "Torre Monterrey", ubicacion: "Av. Constitucion 1800, Centro" },
    { cliente: "Constructora Sol", ubicacion: "Calle Hidalgo 56, Col. Obrera" },
    { cliente: "Fraccionamiento Rio", ubicacion: "Blvd. Rio Santa Catarina 900" },
  ]

  const routes: Record<string, DayRoutes> = {
    "1": {},
    "2": {},
  }

  let id = 1

  DAYS.forEach((day, dayIndex) => {
    const numStopsR1 = dayIndex < 5 ? Math.min(clientesRuta1.length, 4 + (dayIndex % 3)) : dayIndex === 5 ? 3 : 0
    const stopsR1 = clientesRuta1.slice(0, numStopsR1).map((c) => ({
      id: id++,
      cliente: c.cliente,
      ubicacion: c.ubicacion,
      notas: "",
      estatus: "Pendiente" as const,
      evidencia1: null,
      evidencia2: null,
      evidencia3: null,
      evidencia4: null,
      evidencia5: null,
      firma: null,
      hora_firma: null,
    }))
    routes["1"][day] = stopsR1

    const numStopsR2 = dayIndex < 5 ? Math.min(clientesRuta2.length, 3 + (dayIndex % 3)) : dayIndex === 5 ? 2 : 0
    const stopsR2 = clientesRuta2.slice(0, numStopsR2).map((c) => ({
      id: id++,
      cliente: c.cliente,
      ubicacion: c.ubicacion,
      notas: "",
      estatus: "Pendiente" as const,
      evidencia1: null,
      evidencia2: null,
      evidencia3: null,
      evidencia4: null,
      evidencia5: null,
      firma: null,
      hora_firma: null,
    }))
    routes["2"][day] = stopsR2
  })

  return routes
}

export const INITIAL_ROUTES = generateRoutes()

export const CLIENTS: Client[] = [
  { id: 1, nombre: "Ing. Roberto Garza", empresa: "Constructora Alfa", telefono: "811-234-5678", email: "rgarza@alfa.com", direccion: "Av. Reforma 450, Col. Centro", activo: true },
  { id: 2, nombre: "Lic. Ana Martinez", empresa: "Inmobiliaria Beta", telefono: "811-345-6789", email: "amartinez@beta.com", direccion: "Blvd. Industrial 120, Zona Norte", activo: true },
  { id: 3, nombre: "Arq. Pedro Salinas", empresa: "Desarrollo Gamma", telefono: "811-456-7890", email: "psalinas@gamma.com", direccion: "Carr. Nacional Km 15", activo: true },
  { id: 4, nombre: "Ing. Sofia Lopez", empresa: "Constructora Delta", telefono: "811-567-8901", email: "slopez@delta.com", direccion: "Calle Roble 89, Fracc. Los Pinos", activo: true },
  { id: 5, nombre: "Lic. Marco Rios", empresa: "Grupo Epsilon", telefono: "811-678-9012", email: "mrios@epsilon.com", direccion: "Av. Universidad 300", activo: true },
  { id: 6, nombre: "Ing. Laura Vega", empresa: "Infraestructura Zeta", telefono: "811-789-0123", email: "lvega@zeta.com", direccion: "Periferico Sur 1500", activo: false },
  { id: 7, nombre: "Arq. David Cruz", empresa: "Cementos Omega", telefono: "811-890-1234", email: "dcruz@omega.com", direccion: "Carr. Saltillo Km 8", activo: true },
  { id: 8, nombre: "Ing. Fernando Diaz", empresa: "Vialidades MX", telefono: "811-901-2345", email: "fdiaz@vialidades.com", direccion: "Libramiento Oriente Km 3", activo: true },
  { id: 9, nombre: "Lic. Carmen Ruiz", empresa: "Residencial Luna", telefono: "811-012-3456", email: "cruiz@luna.com", direccion: "Av. Las Americas 200", activo: true },
  { id: 10, nombre: "Ing. Raul Mendez", empresa: "Puentes y Caminos", telefono: "811-123-4567", email: "rmendez@pyc.com", direccion: "Carr. Panamericana Km 22", activo: true },
]
