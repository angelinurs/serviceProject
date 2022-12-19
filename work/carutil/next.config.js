/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // extra Image link allow
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakeimg.pl',
        port: '',
        pathname: '/**',
      },
    ],
  },

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