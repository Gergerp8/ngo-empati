/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Clickjacking protection
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Block MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Limit referrer leakage
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Lock down powerful browser features we don't use
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Force HTTPS for a year (safe once served over TLS in production)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
