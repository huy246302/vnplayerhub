import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 images: {
    domains: ['your-supabase-storage-domain.supabase.co'],
    remotePatterns: [
      new URL('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=500&fit=crop'),
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

export default nextConfig;
