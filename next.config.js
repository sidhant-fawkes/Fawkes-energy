/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Enable compression
  compress: true,
}

module.exports = nextConfig
