import { createHash } from "node:crypto";
import { Resend } from "resend";
import { CONTACT_EMAIL, type ContactPayload } from "@/lib/contact";

const DEFAULT_FROM = "onboarding@resend.dev";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function idempotencyKey(data: ContactPayload) {
  const digest = createHash("sha256")
    .update(`${data.email}\n${data.subject}\n${data.message}`)
    .digest("hex")
    .slice(0, 32);
  return `contact/${digest}`;
}

export async function sendContactEmail(data: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return false;

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const to = process.env.CONTACT_TO_EMAIL?.trim() || CONTACT_EMAIL;
  const subject = data.subject
    ? `Portfolio: ${data.subject}`
    : `Portfolio message from ${data.name}`;

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.subject ? `Subject: ${data.subject}` : "",
    "",
    data.message,
  ]
    .filter((line) => line !== "")
    .join("\n");

  const html = `
    <div style="font-family:Georgia,serif;line-height:1.55;color:#111827">
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${
        data.subject
          ? `<p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>`
          : ""
      }
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>
  `;

  const { error } = await resend.emails.send(
    {
      from,
      to,
      replyTo: data.email,
      subject,
      text,
      html,
    },
    { idempotencyKey: idempotencyKey(data) },
  );

  if (error) {
    console.error("Resend send failed", error);
    return false;
  }

  return true;
}
