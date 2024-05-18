/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // SERVER: "http://localhost:8000/",
    SERVER: "https://eduverse-server-jii8.onrender.com/",
  },
  images: {
    remotePatterns: [
      {
        // hostname: "localhost",
        hostname: "eduverse-server-d6nq",
      },
    ],
  },
};

export default nextConfig;
