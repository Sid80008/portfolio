/**
 * lib/email.ts
 * Email delivery via Resend API (preferred) with Nodemailer/Gmail fallback.
 * Contains all HTML email templates.
 */

import { escapeHtml } from "./sanitize";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
  timestamp: string;
}

interface SendResult {
  success: boolean;
  error?: string;
}

// ─── HTML Templates ───────────────────────────────────────────────────────────

function buildNotificationEmail(payload: ContactEmailPayload): string {
  const { name, email, subject, message, ip, timestamp } = payload;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid #2a2a2a;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:32px 40px;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Portfolio Contact</p>
              <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;">New Message Received</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <!-- Sender Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#111;border-radius:8px;padding:20px;border-left:3px solid #6366f1;">
                    <p style="margin:0 0 4px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">From</p>
                    <p style="margin:0;font-size:18px;color:#fff;font-weight:600;">${escapeHtml(name)}</p>
                    <a href="mailto:${escapeHtml(email)}" style="color:#818cf8;font-size:14px;text-decoration:none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
              </table>

              <!-- Subject -->
              <p style="margin:0 0 6px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Subject</p>
              <p style="margin:0 0 24px;font-size:16px;color:#e5e7eb;font-weight:500;background:#111;padding:14px 16px;border-radius:6px;">${escapeHtml(subject)}</p>

              <!-- Message -->
              <p style="margin:0 0 6px;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <div style="background:#111;border-radius:8px;padding:20px;margin-bottom:28px;">
                <p style="margin:0;font-size:15px;color:#d1d5db;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
              </div>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td>
                    <a href="mailto:${escapeHtml(email)}?subject=Re: ${escapeHtml(subject)}"
                       style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
                      ↩ Reply to ${escapeHtml(name)}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Metadata -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #2a2a2a;padding-top:20px;">
                <tr>
                  <td style="font-size:12px;color:#555;">
                    <p style="margin:0 0 4px;">🕒 <strong style="color:#666;">Timestamp:</strong> ${escapeHtml(timestamp)}</p>
                    <p style="margin:0;">🌐 <strong style="color:#666;">Sender IP:</strong> ${escapeHtml(ip)}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111;padding:20px 40px;border-top:1px solid #2a2a2a;">
              <p style="margin:0;font-size:12px;color:#444;text-align:center;">
                Delivered by your Portfolio Contact System · siddharthumajwal.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildAutoReplyEmail(name: string, subject: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thanks for reaching out</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid #2a2a2a;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:40px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700;">Message Received!</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:15px;">I'll get back to you shortly.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;font-size:16px;color:#d1d5db;line-height:1.6;">
                Hey <strong style="color:#fff;">${escapeHtml(name)}</strong> 👋
              </p>
              <p style="margin:0 0 16px;font-size:15px;color:#9ca3af;line-height:1.7;">
                Thank you for reaching out through my portfolio. I've received your message regarding
                <strong style="color:#a5b4fc;">"${escapeHtml(subject)}"</strong> and will review it as soon as possible.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#9ca3af;line-height:1.7;">
                I typically respond within <strong style="color:#fff;">24 hours</strong>. If your matter is urgent, feel free to connect with me on LinkedIn.
              </p>

              <!-- What to expect box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border-radius:10px;padding:24px;margin-bottom:32px;">
                <tr>
                  <td>
                    <p style="margin:0 0 16px;font-size:13px;color:#6366f1;text-transform:uppercase;letter-spacing:1px;font-weight:600;">What happens next</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #1e1e1e;">
                          <p style="margin:0;font-size:14px;color:#9ca3af;">📨 &nbsp;Your message is in my inbox</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #1e1e1e;">
                          <p style="margin:0;font-size:14px;color:#9ca3af;">🧐 &nbsp;I'll read and review it carefully</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <p style="margin:0;font-size:14px;color:#9ca3af;">💬 &nbsp;You'll hear back within 24 hours</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:15px;color:#6b7280;">
                Cheers,<br/>
                <strong style="color:#fff;font-size:16px;">Siddharth Umajwal</strong><br/>
                <span style="color:#6366f1;font-size:13px;">Full-Stack Developer</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111;padding:20px 40px;border-top:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0 0 8px;font-size:12px;color:#444;">
                This is an automated reply — please do not respond to this email.
              </p>
              <p style="margin:0;font-size:12px;color:#333;">
                © ${new Date().getFullYear()} Siddharth Umajwal · siddharthumajwal.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Resend Sender ────────────────────────────────────────────────────────────

async function sendViaResend(
  to: string,
  subject: string,
  html: string
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "portfolio@siddharthumajwal.com";

  if (!apiKey) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const body = await res.text();
    return { success: false, error: `Resend error ${res.status}: ${body}` };
  }

  return { success: true };
}

// ─── Nodemailer Fallback ──────────────────────────────────────────────────────

async function sendViaNodemailer(
  to: string,
  subject: string,
  html: string
): Promise<SendResult> {
  // Dynamically imported so it's only bundled server-side
  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.default.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // App password, not account password
    },
  });

  try {
    await transporter.sendMail({
      from: `"Siddharth Portfolio" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

// ─── Unified Sender ───────────────────────────────────────────────────────────

async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<SendResult> {
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(to, subject, html);
  }
  return sendViaNodemailer(to, subject, html);
}

// ─── Public Functions ─────────────────────────────────────────────────────────

/**
 * Send notification email to Siddharth with full submission details.
 */
export async function sendNotificationEmail(
  payload: ContactEmailPayload
): Promise<SendResult> {
  const to = process.env.EMAIL_TO ?? "siddharthumajwal@gmail.com";
  const subject = `[Portfolio] New message from ${payload.name}: ${payload.subject}`;
  const html = buildNotificationEmail(payload);
  return sendEmail(to, subject, html);
}

/**
 * Send branded auto-reply acknowledgement to the form submitter.
 */
export async function sendAutoReply(
  name: string,
  email: string,
  subject: string
): Promise<SendResult> {
  const replySubject = `Re: ${subject} — Thanks for reaching out!`;
  const html = buildAutoReplyEmail(name, subject);
  return sendEmail(email, replySubject, html);
}
