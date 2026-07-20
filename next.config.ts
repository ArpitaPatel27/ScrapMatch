import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow CSS imports from outside app/ directory (design-system tokens)
  // This is enabled by default in Next.js 14+
  
  // Strict mode for React
  reactStrictMode: true,

  // Image domains (for future use)
  images: {
    remotePatterns: [],
  },

  // No need for experimental CSS here since Next.js 14 handles it natively
};

export default nextConfig;
