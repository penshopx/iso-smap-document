/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placeholder.com', 'example.com'],
  },
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrites yang dijalankan sebelum file
      ],
      afterFiles: [
        // Rewrites yang dijalankan setelah file
      ],
      fallback: [
        // Rewrites yang dijalankan jika tidak ada yang cocok
      ],
    }
  },
}

module.exports = nextConfig