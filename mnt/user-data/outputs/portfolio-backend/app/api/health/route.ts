/**
 * app/api/health/route.ts
 * GET /api/health — Uptime / health check endpoint.
 * Used by monitoring tools (UptimeRobot, Betterstack, etc.)
 */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge"; // Fastest cold start for a health check

export async function GET(_req: NextRequest) {
  const startMs = Date.now();

  const payload = {
    status:      "ok",
    timestamp:   new Date().toISOString(),
    environment: process.env.NODE_ENV ?? "unknown",
    region:      process.env.VERCEL_REGION ?? "local",
    version:     process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0",
    uptime_ms:   Date.now() - startMs, // Negligible here, useful if you add DB checks
    services: {
      email: process.env.RESEND_API_KEY ? "resend" : "nodemailer",
      ratelimit: process.env.UPSTASH_REDIS_REST_URL ? "redis" : "in-memory",
    },
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Content-Type":  "application/json",
    },
  });
}
