import { SITE } from "@/lib/constants";

/**
 * Minimal Resend transport for internal notification emails (contact-form
 * leads). Configure:
 *   RESEND_API_KEY    — Resend API key
 *   ALERT_TO_EMAILS   — default recipients, comma-separated
 *   ALERT_FROM_EMAIL  — optional verified sender, e.g.
 *                       "Jamie Tian Leads <leads@jamietian.com>"
 */

export interface RenderedAlert {
  subject: string;
  html: string;
}

export async function sendAlert(
  alert: RenderedAlert,
  toOverride?: string[],
): Promise<{ sent: boolean; detail: string }> {
  const key = process.env.RESEND_API_KEY;
  const to = (
    toOverride ?? (process.env.ALERT_TO_EMAILS ?? "").split(",")
  )
    .map((s) => s.trim())
    .filter(Boolean);
  if (!key) return { sent: false, detail: "RESEND_API_KEY not set" };
  if (to.length === 0) return { sent: false, detail: "ALERT_TO_EMAILS not set" };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.ALERT_FROM_EMAIL ??
        `${SITE.name} <onboarding@resend.dev>`,
      to,
      subject: alert.subject,
      html: alert.html,
    }),
  });
  if (!res.ok) {
    return { sent: false, detail: `Resend ${res.status}: ${(await res.text()).slice(0, 200)}` };
  }
  return { sent: true, detail: `sent to ${to.length} recipient(s)` };
}
