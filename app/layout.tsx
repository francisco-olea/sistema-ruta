import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Soluciones Portátiles - Sistema de Rutas',
  description: 'Sistema de gestión de rutas para servicio de limpieza de baños portátiles en obras de construcción',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo%20sp.ico',
        type: 'image/x-icon',
      },
      {
        url: '/logo%20sp.png',
        type: 'image/png',
      },
    ],
    apple: '/logo%20sp.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
