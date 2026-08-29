export const CONTACT_EMAIL = "roysrinjani04@gmail.com";

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function parseContactPayload(input: unknown):
  | { ok: true; data: ContactPayload; spam: boolean }
  | { ok: false; error: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, error: "Invalid request." };
  }

  const body = input as Record<string, unknown>;
  const honeypot = asTrimmedString(body.website, 200);
  const name = asTrimmedString(body.name, 80);
  const email = asTrimmedString(body.email, 120).toLowerCase();
  const subject = asTrimmedString(body.subject, 120);
  const message = asTrimmedString(body.message, 2000);

  if (honeypot) {
    return {
      ok: true,
      spam: true,
      data: { name, email, subject, message },
    };
  }

  if (name.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (message.length < 10) {
    return { ok: false, error: "Please write a message of at least 10 characters." };
  }

  return {
    ok: true,
    spam: false,
    data: { name, email, subject, message },
  };
}
