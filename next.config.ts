import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    // MLS listing photos are served by Trestle's media CDN.
    remotePatterns: [
      { protocol: "https", hostname: "api.cotality.com" },
      { protocol: "https", hostname: "*.cotality.com" },
      { protocol: "https", hostname: "*.corelogic.com" },
    ],
  },
};

export default nextConfig;
