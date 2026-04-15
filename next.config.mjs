/** @type {import('next').NextConfig} */
const devInstance = process.env.NEXT_DEV_INSTANCE

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  ...(devInstance ? { distDir: `.next-dev-${devInstance}` } : {}),
}

export default nextConfig
