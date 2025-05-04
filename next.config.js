// Example next.config.mjs structure
const nextConfig = {
  // Core settings
  reactStrictMode: true,
  swcMinify: true,
  
  // Output settings
  output: 'standalone', // or other options
  
  // Environment variables
  env: {
    // Custom environment variables
  },
  
  // Redirects and rewrites
  async redirects() { ... },
  async rewrites() { ... },
  
  // Image optimization
  images: {
    domains: ['...'],
    remotePatterns: [...],
  },
  
  // Internationalization
  i18n: { ... },
  
  // Experimental features
  experimental: { ... },
  
  // Webpack configuration
  webpack: (config, { isServer }) => { ... },
};

export default nextConfig;