/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVER: "http://localhost:8000/",
    JWT_SECRET:
      "00qsgWvy7rjiwsAHAZTgei6opIxX2ObpjsH7u20dyIyW/6FN7Sswvkl2u0kHRzLG",
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
