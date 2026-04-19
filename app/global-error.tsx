"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#080808",
          color: "#e8e8e8",
          gap: "1rem",
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600 }}>Something went wrong</h2>
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "999px",
              border: "none",
              backgroundColor: "#c4c0ff",
              color: "#1b1b22",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
