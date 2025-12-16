import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: { LIBRARY_API_URL: process.env.LIBRARY_API_URL },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
