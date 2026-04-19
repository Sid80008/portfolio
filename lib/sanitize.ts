/**
 * lib/sanitize.ts
 * Strip HTML tags and dangerous characters from user-supplied strings.
 * Lightweight — no external dependency required.
 */

/**
 * Remove HTML tags, null bytes, and control characters from a string.
 * Safe to run on all text inputs before storage or rendering in email templates.
 */
export function sanitizeString(input: string): string {
  return (
    input
      // Strip HTML / XML tags
      .replace(/<[^>]*>/g, "")
      // Decode common HTML entities so they don't slip through encoded
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#x27;/gi, "'")
      .replace(/&#x2F;/gi, "/")
      // Remove null bytes and non-printable control chars (except \n, \r, \t)
      // eslint-disable-next-line no-control-regex
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      // Strip again after entity decoding (double-encoded tags)
      .replace(/<[^>]*>/g, "")
      .trim()
  );
}

/**
 * Sanitize all string values in an object shallowly.
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key of Object.keys(sanitized)) {
    if (typeof sanitized[key] === "string") {
      (sanitized as Record<string, unknown>)[key] = sanitizeString(
        sanitized[key] as string
      );
    }
  }
  return sanitized;
}

/**
 * Escape a string for safe inclusion inside an HTML attribute or element.
 * Used in email templates.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
