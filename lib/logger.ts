import * as Sentry from "@sentry/nextjs";

type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  ts: string;        // ISO timestamp
  msg: string;
  [key: string]: unknown;
}

function log(level: LogLevel, msg: string, meta: Record<string, unknown> = {}): void {
  const entry: LogEntry = {
    level,
    ts: new Date().toISOString(),
    msg,
    ...meta,
  };
  
  // Use console.error for warn/error so they surface in Vercel logs
  const fn = level === "info" ? console.log : console.error;
  fn(JSON.stringify(entry));

  // Professional monitoring: Report errors to Sentry
  if (level === "error") {
    const error = meta.error instanceof Error ? meta.error : new Error(msg);
    Sentry.captureException(error, {
      extra: meta,
      tags: { level },
    });
  }
}

export const logger = {
  info:  (msg: string, meta?: Record<string, unknown>) => log("info",  msg, meta),
  warn:  (msg: string, meta?: Record<string, unknown>) => log("warn",  msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => log("error", msg, meta),
};
