/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2'],
  },
  images: {
    // domains: [
    //   'localhost',
    //   'avatars.githubusercontent.com',
    //   'lh6.googleusercontent.com',
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh6.googleusercontent.com',
        port: '',
      },
    ],
  },
};
export default nextConfig;
