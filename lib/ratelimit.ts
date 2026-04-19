/**
 * lib/ratelimit.ts
 * Rate limiting with Upstash Redis (production) + in-memory fallback (dev)
 */

// ─── Types ────────────────────────────────────────────────────────────────────
interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number; // Unix timestamp (ms) when the window resets
}

// ─── In-Memory Fallback (development / no Redis configured) ──────────────────
const inMemoryStore = new Map<string, { count: number; reset: number }>();

function inMemoryRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const entry = inMemoryStore.get(key);

  if (!entry || now > entry.reset) {
    inMemoryStore.set(key, { count: 1, reset: now + windowMs });
    return { success: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, reset: entry.reset };
  }

  entry.count += 1;
  return { success: true, remaining: limit - entry.count, reset: entry.reset };
}

// ─── Upstash Redis Rate Limit (production) ────────────────────────────────────
async function upstashRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    // Fall back to in-memory if Redis isn't configured
    return inMemoryRateLimit(key, limit, windowMs);
  }

  const windowSec = Math.ceil(windowMs / 1000);
  const now = Date.now();

  try {
    // Sliding window: INCR then set TTL on first hit
    const incrRes = await fetch(`${url}/incr/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!incrRes.ok) throw new Error("Redis INCR failed");

    const { result: count } = (await incrRes.json()) as { result: number };

    if (count === 1) {
      // Set expiry only on first request in this window
      await fetch(`${url}/expire/${encodeURIComponent(key)}/${windowSec}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
    }

    const ttlRes = await fetch(`${url}/ttl/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const { result: ttl } = (await ttlRes.json()) as { result: number };
    const reset = now + ttl * 1000;

    if (count > limit) {
      return { success: false, remaining: 0, reset };
    }

    return { success: true, remaining: limit - count, reset };
  } catch (err) {
    console.error("[ratelimit] Redis error, falling back to in-memory:", err);
    return inMemoryRateLimit(key, limit, windowMs);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Check rate limit for a given identifier.
 * @param identifier  Usually the caller's IP address
 * @param limit       Max requests allowed in the window (default 3)
 * @param windowMs    Window size in milliseconds (default 1 hour)
 */
export async function checkRateLimit(
  identifier: string,
  limit = 3,
  windowMs = 60 * 60 * 1000 // 1 hour
): Promise<RateLimitResult> {
  const key = `rl:contact:${identifier}`;
  return upstashRateLimit(key, limit, windowMs);
}
