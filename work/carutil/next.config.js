/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  async rewrites() {
    return [
      {
        destination: 'http://localhost:8080/rest/:path*',
        source: '/rest/:path*',
      },
    ];
  },
}

module.exports = nextConfig