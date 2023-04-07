/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // https://image.tmdb.org/t/p/w1280/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
