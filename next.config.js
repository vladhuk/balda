const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  maximumFileSizeToCacheInBytes: 3145728,
  skipWaiting: true,
  clientsClaim: true,
});

/**
 * @type {import('next').NextConfig}
 */
module.exports = withPWA({
  output: 'export',
  images: {
    unoptimized: true,
  },
});
