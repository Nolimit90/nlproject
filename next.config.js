/** @type {import('next').NextConfig} */
const nextConfig = {
  // Headers de sécurité pour Netlify
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  },
  
  // Optimisations de performance
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react']
  },
  
  // Compression des images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
  },
  
  // Optimisations de build
  swcMinify: true,
  compress: true,
  
  // Redirection pour Netlify
  trailingSlash: true
}

module.exports = nextConfig 