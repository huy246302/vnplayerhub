import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
    domains: ['your-supabase-storage-domain.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

export default nextConfig;
