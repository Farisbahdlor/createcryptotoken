/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/firebase-messaging-sw.js',
          destination: '/firebase-messaging-sw.js',
        },
      ];
    },
};

export default nextConfig;