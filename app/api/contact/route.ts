import { parseContactPayload } from "@/lib/contact";
import { sendContactEmail } from "@/lib/contact-email";
import { appendContactToWorkbook } from "@/lib/contact-sheet";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const recentByIp = new Map<string, number[]>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (recentByIp.get(ip) ?? []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    recentByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  recentByIp.set(ip, recent);
  return false;
}

function sheetsWebhookUrl() {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL?.trim();
  if (!url) return null;
  if (!url.startsWith("https://script.google.com/")) return null;
  return url;
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return Response.json(
      { ok: false, error: "Please wait a few minutes before sending another message." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = parseContactPayload(body);
  if (!parsed.ok) {
    return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  if (parsed.spam) {
    return Response.json({ ok: true });
  }

  let delivered = false;

  try {
    if (await sendContactEmail(parsed.data)) {
      delivered = true;
    }
  } catch (error) {
    console.error("Resend send error", error);
  }

  try {
    await appendContactToWorkbook(parsed.data);
    delivered = true;
  } catch (error) {
    console.error("Local spreadsheet write failed", error);
  }

  const webhookUrl = sheetsWebhookUrl();
  if (webhookUrl) {
    try {
      const sheetRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          spreadsheetId: process.env.GOOGLE_SHEETS_ID?.trim() || undefined,
          timestamp: new Date().toISOString(),
        }),
        redirect: "follow",
      });

      if (sheetRes.ok) {
        delivered = true;
      } else {
        const details = await sheetRes.text();
        console.error("Google Sheets webhook failed", sheetRes.status, details.slice(0, 500));
      }
    } catch (error) {
      console.error("Google Sheets webhook error", error);
    }
  }

  if (!delivered) {
    return Response.json(
      { ok: false, error: "Unable to send message right now." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
