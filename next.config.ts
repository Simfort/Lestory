import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      { protocol: "https", hostname: "yadi.sk" },
      { protocol: "https", hostname: "disk.yandex.ru" },
      { protocol: "https", hostname: "downloader.disk.yandex.ru" },
    ],
  },
  allowedDevOrigins: ["http://localhost:3000", "https://github.com"],
  reactStrictMode: false,
};

export default nextConfig;
