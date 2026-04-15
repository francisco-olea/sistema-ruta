"use client"

import { useState } from "react"
import { useAppData } from "@/lib/data-context"
import { useAuth } from "@/lib/auth-context"
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Building2,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react"
import type { Client } from "@/lib/types"

export function ClientsTable() {
  const { clients, addClient, isLoading } = useAppData()
  const { user } = useAuth()
  const [search, setSearch] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [isSavingClient, setIsSavingClient] = useState(false)

  const filtered = clients.filter(
    (c) =>
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.empresa.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddClient = async (client: Omit<Client, "id">) => {
    setIsSavingClient(true)
    try {
      await addClient(client)
      setShowAdd(false)
    } finally {
      setIsSavingClient(false)
    }
  }

  if (isLoading) {
    return <p className="py-8 text-center text-sm text-muted-foreground">Cargando clientes...</p>
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar cliente..."
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
        {user?.role === "administrador" && (
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex h-10 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Agregar</span>
          </button>
        )}
      </div>

      {showAdd && (
        <AddClientForm
          onAdd={handleAddClient}
          onCancel={() => setShowAdd(false)}
          isSubmitting={isSavingClient}
        />
      )}

      <div className="flex flex-col gap-2">
        {filtered.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No se encontraron clientes
          </p>
        )}
      </div>
    </div>
  )
}

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-card-foreground">{client.nombre}</p>
            <p className="text-xs text-muted-foreground">{client.empresa}</p>
          </div>
        </div>
        <span className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-semibold ${
          client.activo
            ? "bg-status-listo/15 text-status-listo"
            : "bg-status-cerrado/15 text-status-cerrado"
        }`}>
          {client.activo ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
          {client.activo ? "Activo" : "Inactivo"}
        </span>
      </div>
      <div className="mt-3 flex flex-col gap-1.5 pl-11">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Phone className="h-3 w-3" />
          {client.telefono}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Mail className="h-3 w-3" />
          {client.email}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {client.direccion}
        </div>
      </div>
    </div>
  )
}

function AddClientForm({
  onAdd,
  onCancel,
  isSubmitting,
}: {
  onAdd: (client: Omit<Client, "id">) => Promise<void>
  onCancel: () => void
  isSubmitting: boolean
}) {
  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    email: "",
    direccion: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onAdd({ ...form, activo: true })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
      <p className="text-sm font-semibold text-card-foreground">Nuevo Cliente</p>
      {(["nombre", "empresa", "telefono", "email", "direccion"] as const).map((field) => (
        <input
          key={field}
          type={field === "email" ? "email" : "text"}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
          required={field !== "email"}
          className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
        />
      ))}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 rounded-lg border border-border py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
