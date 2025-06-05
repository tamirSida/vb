/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    domains: [],
  },
  trailingSlash: true,
  output: 'export'
}

module.exports = nextConfig