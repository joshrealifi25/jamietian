import { NextRequest, NextResponse } from "next/server";
import { renderLeadEmail, type LeadSubmission } from "@/lib/lead-email";
import { sendAlert } from "@/lib/alert-email";

/**
 * Contact-form endpoint. Validates, applies light spam protection
 * (honeypot + per-IP rate limit), and emails the lead to the team via
 * Resend. Recipients: LEAD_TO_EMAILS, falling back to ALERT_TO_EMAILS.
 */

export const dynamic = "force-dynamic";

// Per-instance rate limiting — serverless instances are ephemeral, so this
// is a light brake on bursts, not a hard guarantee.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(ip) ?? []).filter(
    (t) => now - t < WINDOW_MS,
  );
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true }); // pretend success to bots
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions — please try again later." },
      { status: 429 },
    );
  }

  const str = (v: unknown, max = 500) =>
    typeof v === "string" ? v.trim().slice(0, max) : "";

  const lead: LeadSubmission = {
    firstName: str(body.firstName, 100),
    lastName: str(body.lastName, 100),
    email: str(body.email, 200),
    phone: str(body.phone, 50) || undefined,
    interest: str(body.interest, 100) || undefined,
    message: str(body.message, 5000) || undefined,
    sourcePage: str(body.sourcePage, 200) || undefined,
  };

  if (!lead.firstName || !lead.lastName || !EMAIL_RE.test(lead.email)) {
    return NextResponse.json(
      { error: "Please provide your name and a valid email address." },
      { status: 400 },
    );
  }

  const recipients = (
    process.env.LEAD_TO_EMAILS ??
    process.env.ALERT_TO_EMAILS ??
    ""
  )
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const rendered = renderLeadEmail(lead);
  const outcome = await sendAlert(
    rendered,
    recipients.length > 0 ? recipients : undefined,
  );

  if (!outcome.sent) {
    console.error("[contact] lead email failed:", outcome.detail, lead);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please call us instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
