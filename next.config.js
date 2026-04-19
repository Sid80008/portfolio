/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Security Headers (applied globally via Next.js) ──────────────────────
  // These layer on top of what middleware.ts sets for API routes,
  // and cover page responses too.
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            // Tighten this further once you know all your external CDN/font sources
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://*.ingest.sentry.io https://vitals.vercel-insights.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // ─── Redirects ────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Redirect trailing slashes
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },

  // Recommended for production builds
  poweredByHeader: false,
  compress: true,
};

const { withSentryConfig } = require("@sentry/nextjs");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withSentryConfig(
  withBundleAnalyzer(nextConfig),
  {
    silent: true,
    org: "your-org",
    project: "your-project",
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    hideSourceMaps: true,
    disableLogger: true,
  }
);
