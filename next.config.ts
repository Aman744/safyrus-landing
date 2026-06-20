import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your website is hosted at https://username.github.io/repo-name/
  // uncomment the line below and set your repository name:
  // basePath: '/safyrus-landing',
};

export default nextConfig;
