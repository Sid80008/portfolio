/**
 * app/api/contact/route.ts
 * POST /api/contact — Contact form submission handler.
 *
 * Pipeline:
 *  1. CORS pre-flight
 *  2. Parse + validate body (Zod)
 *  3. Honeypot check
 *  4. Rate limit (IP-based, 3 req/hour)
 *  5. Sanitize inputs
 *  6. Send notification email to Siddharth
 *  7. Send auto-reply to sender
 *  8. Return structured response
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/ratelimit";
import { sanitizeObject } from "@/lib/sanitize";
import { sendNotificationEmail, sendAutoReply } from "@/lib/email";
import { logger } from "@/lib/logger";
import prisma from "@/lib/db";

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const ContactSchema = z.object({
  name:     z.string().min(2,   "Name must be at least 2 characters").max(100, "Name too long"),
  email:    z.string().email("Invalid email address"),
  subject:  z.string().min(5,   "Subject must be at least 5 characters").max(200, "Subject too long"),
  message:  z.string().min(20,  "Message must be at least 20 characters").max(2000, "Message too long"),
  // Honeypot field — must be absent or empty
  website:  z.string().max(0, "Bot detected").optional(),
});

// ─── CORS Helpers ─────────────────────────────────────────────────────────────

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://siddharthumajwal.com";

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin === ALLOWED_ORIGIN || process.env.NODE_ENV === "development";
  return {
    "Access-Control-Allow-Origin":  allowed ? (origin ?? ALLOWED_ORIGIN) : ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age":       "86400",
  };
}

// ─── OPTIONS (pre-flight) ─────────────────────────────────────────────────────

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(req.headers.get("origin")),
  });
}

// ─── POST ─────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const cors   = corsHeaders(origin);

  // ── 1. Parse body ──────────────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body" },
      { status: 400, headers: cors }
    );
  }

  // ── 2. Validate with Zod ───────────────────────────────────────────────────
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    logger.warn("Contact form validation failed", { fieldErrors });
    return NextResponse.json(
      { success: false, error: "Validation failed", details: fieldErrors },
      { status: 422, headers: cors }
    );
  }

  const { name, email, subject, message, website } = parsed.data;

  // ── 3. Honeypot check ──────────────────────────────────────────────────────
  if (website && website.trim().length > 0) {
    logger.warn("Honeypot triggered — bot submission rejected", { ip: getIp(req) });
    // Return 200 to not tip off bots
    return NextResponse.json(
      { success: true, message: "Message sent" },
      { status: 200, headers: cors }
    );
  }

  // ── 4. Rate limiting ───────────────────────────────────────────────────────
  const ip = getIp(req);
  const rl = await checkRateLimit(ip, 3, 60 * 60 * 1000);

  if (!rl.success) {
    const resetIn = Math.ceil((rl.reset - Date.now()) / 1000 / 60);
    logger.warn("Rate limit exceeded", { ip });
    return NextResponse.json(
      {
        success: false,
        error: `Too many requests. Please try again in ${resetIn} minute${resetIn !== 1 ? "s" : ""}.`,
      },
      {
        status: 429,
        headers: {
          ...cors,
          "Retry-After":           String(Math.ceil((rl.reset - Date.now()) / 1000)),
          "X-RateLimit-Limit":     "3",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset":     String(rl.reset),
        },
      }
    );
  }

  // ── 5. Sanitize inputs ─────────────────────────────────────────────────────
  const safe = sanitizeObject({ name, email, subject, message });
  const timestamp = new Date().toUTCString();

  logger.info("Contact form submitted", {
    ip,
    email: safe.email,
    subject: safe.subject,
  });

  // ── 6. Save to Database ────────────────────────────────────────────────────
  try {
    await prisma.contactMessage.create({
      data: {
        name: safe.name,
        email: safe.email,
        subject: safe.subject,
        message: safe.message,
        ip,
        userAgent: req.headers.get("user-agent") || null,
      },
    });
  } catch (error) {
    logger.error("Failed to save contact message to DB", { error: String(error), ip });
    // We can decide not to fail the entire request, or we could fail it.
    // For now we just log it and proceed to email them, just in case DB is down.
  }

  // ── 7. Send notification to Siddharth ──────────────────────────────────────
  const notify = await sendNotificationEmail({
    ...safe,
    ip,
    timestamp,
  });

  if (!notify.success) {
    logger.error("Failed to send notification email", { error: notify.error, ip });
    return NextResponse.json(
      { success: false, error: "Failed to send message via email. Please try again later." },
      { status: 502, headers: cors }
    );
  }

  // ── 8. Send auto-reply (non-blocking — don't fail the request if this fails) ─
  sendAutoReply(safe.name, safe.email, safe.subject).catch((err) => {
    logger.error("Auto-reply failed (non-critical)", { error: String(err) });
  });

  // ── 9. Success ─────────────────────────────────────────────────────────────
  return NextResponse.json(
    { success: true, message: "Message sent! I'll reply within 24 hours." },
    {
      status: 200,
      headers: {
        ...cors,
        "X-RateLimit-Remaining": String(rl.remaining),
      },
    }
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}
