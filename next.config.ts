import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digibrandco.com',
      }, {
        protocol: 'https',
        hostname: 'hncore.website',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },],
  },
  // ... other configurationsimages:{domains:['cdn.dribbble.com','cdn.digibrandco.com']}
};

export default nextConfig;



