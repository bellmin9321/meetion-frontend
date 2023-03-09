/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,
  env: {
    LOCAL_BASE_URL: process.env.LOCAL_BASE_URL,
  },
}

module.exports = nextConfig
