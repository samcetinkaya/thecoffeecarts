/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // No basePath: the site is served from the root of its own domain.
};

module.exports = nextConfig;
