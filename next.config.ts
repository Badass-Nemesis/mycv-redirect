import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cataas.com',
        port: '',
        pathname: '/cat/**',
      },
    ],
  },
};

export default nextConfig;
