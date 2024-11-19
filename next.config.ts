import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: [
      "files.edgestone.dev"
    ]
  }
};

export default nextConfig;
