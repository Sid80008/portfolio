/**
 * middleware.ts  (project root)
 * Runs on every matched request BEFORE it hits any route handler.
 */

import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth/session";

// ─── Config ───────────────────────────────────────────────────────────────────

export const config = {
  // Match all API routes and Admin routes; exclude Next.js internals and static files
  matcher: ["/api/:path*", "/admin/:path*"],
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://siddharthumajwal.com";

// ─── Security Headers ─────────────────────────────────────────────────────────

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options":    "nosniff",
  "X-Frame-Options":           "DENY",
  "Referrer-Policy":           "strict-origin-when-cross-origin",
  "Permissions-Policy":        "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy":   "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;",
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

  console.log(JSON.stringify(entry));
}

// ─── Middleware Entry ─────────────────────────────────────────────────────────

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // 1. Log Request
  logRequest(req);

  // 2. Admin Protection (Pages and APIs)
  const isAdminPath = path.startsWith("/admin") && path !== "/admin/login";
  const isAdminApi = path.startsWith("/api/admin") && path !== "/api/admin/login";

  if (isAdminPath || isAdminApi) {
    const sessionCookie = req.cookies.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie).catch(() => null) : null;

    if (!session) {
      if (isAdminApi) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // 3. Main Response Logic
  const response = NextResponse.next();

  // Attach security headers to every API response
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }

  // CORS guard
  const origin = req.headers.get("origin");
  const isDev  = process.env.NODE_ENV === "development";

  if (origin && origin !== SITE_URL && !isDev) {
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
