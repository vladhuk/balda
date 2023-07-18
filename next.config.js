const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  maximumFileSizeToCacheInBytes: 3145728,
});

/**
 * @type {import('next').NextConfig}
 */
module.exports = withPWA({
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
});
