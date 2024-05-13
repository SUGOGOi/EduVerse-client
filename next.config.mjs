/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER: "http://localhost:8000/",
  },
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
