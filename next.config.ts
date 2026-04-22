import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.vercel-storage.com",
      },
    ],
  },
  cacheComponents: true,
  cacheLife: {
    categories: {
      stale: 3600,
      revalidate: 21600,
      expire: 86400,
    },
    products: {
      stale: 300,
      revalidate: 3600,
      expire: 86400,
    },
    featuredProducts: {
      stale: 300,
      revalidate: 3600,
      expire: 86400,
    },
    search: {
      stale: 60,
      revalidate: 600,
      expire: 86400,
    }

  }
};

export default nextConfig;
