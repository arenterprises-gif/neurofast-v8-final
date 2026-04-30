/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", process.env.NEXT_PUBLIC_APP_URL].filter(Boolean),
    },
  },
  serverExternalPackages: [
    "drizzle-orm",
    "postgres",
    "bullmq",
    "ioredis",
    "@upstash/redis",
    "@upstash/ratelimit",
    "@sentry/nextjs",
    "@supabase/supabase-js",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        perf_hooks: false,
        fs: false,
        dns: false,
        child_process: false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "img.clerk.com" },
    ],
  },
};

module.exports = nextConfig;
