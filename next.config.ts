import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env:{LIBRARY_API_URL: process.env.LIBRARY_API_URL,
  }
};

export default nextConfig;
