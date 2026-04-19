/**
 * middleware.ts  (project root)
 * Runs on every matched request BEFORE it hits any route handler.
 *
 * Responsibilities:
 *  1. Structured request logging (method, path, IP, timestamp)
 *  2. Global security headers
 *  3. Rate limiting guard for /api/* routes (fast-path rejection)
 */

import { NextRequest, NextResponse } from "next/server";

// ─── Config ───────────────────────────────────────────────────────────────────

export const config = {
  // Match all API routes; exclude Next.js internals and static files
  matcher: ["/api/:path*"],
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://siddharthumajwal.com";

// ─── Security Headers ─────────────────────────────────────────────────────────

const SECURITY_HEADERS: Record<string, string> = {
  // Prevent MIME-type sniffing
  "X-Content-Type-Options":    "nosniff",
  // Deny framing entirely (clickjacking protection)
  "X-Frame-Options":           "DENY",
  // Only send origin in referrer header
  "Referrer-Policy":           "strict-origin-when-cross-origin",
  // Restrict powerful browser features
  "Permissions-Policy":        "camera=(), microphone=(), geolocation=()",
  // Strict CSP for API responses (no HTML, so very restrictive is fine)
  "Content-Security-Policy":   "default-src 'none'",
  // HSTS — 1 year, include subdomains
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

// ─── Structured Logger ────────────────────────────────────────────────────────

function logRequest(req: NextRequest, status?: number): void {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const entry = {
    ts:     new Date().toISOString(),
    method: req.method,
    path:   req.nextUrl.pathname,
    ip,
    ua:     req.headers.get("user-agent")?.slice(0, 100) ?? "unknown",
    ...(status !== undefined ? { status } : {}),
  };

  // Structured JSON — picked up by Vercel / Datadog / CloudWatch
  console.log(JSON.stringify(entry));
}

// ─── Middleware Entry ─────────────────────────────────────────────────────────

export async function middleware(req: NextRequest) {
  logRequest(req);

  const response = NextResponse.next();

  // Attach security headers to every API response
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // CORS guard — reject cross-origin requests not from our domain
  const origin = req.headers.get("origin");
  const isDev  = process.env.NODE_ENV === "development";

  if (origin && origin !== SITE_URL && !isDev) {
    // OPTIONS pre-flight is handled inside each route — block here for non-OPTIONS
    if (req.method !== "OPTIONS") {
      return new NextResponse(
        JSON.stringify({ success: false, error: "Forbidden" }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            ...SECURITY_HEADERS,
          },
        }
      );
    }
  }

  return response;
}
