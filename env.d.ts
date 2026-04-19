/**
 * types/env.d.ts
 * Type-safe environment variable declarations.
 * Gives autocomplete + compile-time safety for process.env.* usage.
 */

declare namespace NodeJS {
  interface ProcessEnv {
    // Site
    NEXT_PUBLIC_SITE_URL?: string;
    NEXT_PUBLIC_APP_VERSION?: string;
    NODE_ENV: "development" | "production" | "test";
    VERCEL_REGION?: string;

    // Email — Resend
    RESEND_API_KEY?: string;
    EMAIL_FROM?: string;
    EMAIL_TO?: string;

    // Email — Nodemailer / Gmail fallback
    GMAIL_USER?: string;
    GMAIL_APP_PASSWORD?: string;

    // Upstash Redis
    UPSTASH_REDIS_REST_URL?: string;
    UPSTASH_REDIS_REST_TOKEN?: string;
  }
}
