/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BASE_URL}/:path*`
      }
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
