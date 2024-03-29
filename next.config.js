/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  swcMinify: true, 
  env: {
    LOCAL_BASE_URL: process.env.LOCAL_BASE_URL,
    AWS_BASE_URL: process.env.AWS_BASE_URL
  },
  images: {
    loader: 'akamai',
    path: '/',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/AGNmyxYqqEdCdDDi7YxJOpWQ8ySyBO_tlTh5fqZgHQUAdQ=s96-c',
      },
      {
        protocol: 'https',
        hostname: 'phinf.pstatic.net',
        port: '',
        pathname: '/contact/20200309_52/1583734886909vxeE7_JPEG/profileImage.jpg',
      },
    ],
  },
}

module.exports = nextConfig
