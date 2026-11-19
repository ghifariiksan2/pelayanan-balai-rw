import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pastikan file template ikut terbawa saat dipasang di Vercel.
  outputFileTracingIncludes: {
    "/portal": ["./private/**/*"],
    "/petugas": ["./private/**/*"],
  },
};

export default nextConfig;
