import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: undefined,
      allowedOrigins: undefined,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'salmon-impressive-dove-574.mypinata.cloud',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
      }
    ],
  },
};

export default nextConfig;

