/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/popup' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/popup' : '',
}

module.exports = nextConfig
