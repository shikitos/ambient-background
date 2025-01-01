import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      }
    ],
    unoptimized: true
  },
  output: 'export',
  basePath: '/ambient-background'
};

export default nextConfig;
