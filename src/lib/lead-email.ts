import { SITE } from "@/lib/constants";
import type { RenderedAlert } from "@/lib/alert-email";

/** Internal notification email for a new contact-form lead. */

export interface LeadSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interest?: string;
  message?: string;
  sourcePage?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function renderLeadEmail(lead: LeadSubmission): RenderedAlert {
  const name = `${lead.firstName} ${lead.lastName}`.trim();
  const subject = `New Lead: ${name}${lead.interest ? ` — ${lead.interest}` : ""}`;

  const rows = [
    ["Name", name],
    ["Email", lead.email],
    ["Phone", lead.phone || "—"],
    ["Interested in", lead.interest || "—"],
    ["Submitted from", lead.sourcePage || "/contact"],
  ]
    .map(
      ([label, value]) => `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #DBE4E7;font-family:'Geist Mono',Consolas,monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#6A858F;width:150px;vertical-align:top;">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid #DBE4E7;font-family:'Geist',Arial,sans-serif;font-size:15px;color:#070F13;">${esc(String(value))}</td>
      </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>New Lead — ${SITE.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@500&display=swap');
  body{margin:0;padding:0;width:100%!important;background:#EEF2F3;}
  img{border:0;display:block;}
</style>
</head>
<body style="margin:0;padding:0;background:#EEF2F3;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EEF2F3;">
    <tr><td align="center" style="padding:24px 12px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;">

        <tr><td align="center" style="background:#0A151A;border-radius:14px 14px 0 0;padding:22px 40px;">
          ${
            SITE.logo
              ? `<img src="${SITE_URL}${SITE.logo}" width="150" alt="${SITE.name}" style="height:30px;width:auto;">`
              : `<span style="font-family:Georgia,'Times New Roman',serif;font-size:20px;letter-spacing:4px;text-transform:uppercase;color:#ffffff;">${SITE.name}</span>`
          }
        </td></tr>
        <tr><td style="background:#22C3D5;height:3px;line-height:3px;font-size:0;">&nbsp;</td></tr>

        <tr><td style="background:#ffffff;padding:32px 40px 8px;">
          <p style="margin:0 0 12px;font-family:'Geist Mono',Consolas,monospace;font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:#119FB1;">New Website Lead</p>
          <h1 style="margin:0 0 20px;font-family:'Geist',Arial,sans-serif;font-size:28px;line-height:1.1;letter-spacing:-0.8px;color:#070F13;font-weight:600;">${esc(name)}</h1>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #DBE4E7;">${rows}</table>
        </td></tr>

        ${
          lead.message
            ? `<tr><td style="background:#ffffff;padding:20px 40px 8px;">
          <p style="margin:0 0 8px;font-family:'Geist Mono',Consolas,monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6A858F;">Message</p>
          <p style="margin:0;font-family:'Geist',Arial,sans-serif;font-size:15px;line-height:1.65;color:#436069;white-space:pre-wrap;">${esc(lead.message)}</p>
        </td></tr>`
            : ""
        }

        <tr><td align="center" style="background:#ffffff;padding:28px 40px 34px;">
          <a href="mailto:${esc(lead.email)}" style="background:#22C3D5;border-radius:999px;color:#04090B;display:inline-block;font-family:'Geist',Arial,sans-serif;font-size:15px;font-weight:600;line-height:50px;text-align:center;text-decoration:none;width:240px;">Reply to ${esc(lead.firstName)} &rarr;</a>
        </td></tr>

        <tr><td style="background:#0A151A;border-radius:0 0 14px 14px;padding:24px 40px;">
          <p style="margin:0;font-family:'Geist Mono',Consolas,monospace;font-size:11px;letter-spacing:1px;color:#6A858F;">Contact form lead · Reply promptly — speed wins listings</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}
