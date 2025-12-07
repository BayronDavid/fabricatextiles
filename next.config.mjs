/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow external images from placehold.co (used for placeholders)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  /* other config options here */
};

export default nextConfig;
