/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
