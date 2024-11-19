import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
