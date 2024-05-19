/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2'],
  },
  images: {
    domains: [
      'localhost',
      'avatars.githubusercontent.com',
      'lh6.googleusercontent.com',
    ],
  },
};
export default nextConfig;
