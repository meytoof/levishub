import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // CV interactif caché : servi depuis public/cv/index.html, jamais indexé
  async rewrites() {
    return [{ source: "/cv", destination: "/cv/index.html" }];
  },
  async headers() {
    return [
      {
        source: "/cv/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
      {
        source: "/cv",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
    ],
  },
};

export default nextConfig;
