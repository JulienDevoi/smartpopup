/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export settings for Vercel deployment
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove basePath and assetPrefix for standard Vercel deployment
}

module.exports = nextConfig
