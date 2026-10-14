import { Resend } from "resend";

export type InquiryPayload = {
  name: string;
  phone?: string;
  email?: string;
  model?: string;
  source?: string;
  message?: string;
};

export function getResendConfig(): { apiKey: string; from: string } | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.EMAIL_FROM?.trim();
  if (!apiKey || !from) return null;
  return { apiKey, from };
}

export function parseEmailList(raw: string): string[] {
  return raw
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s));
}

export function getEnvInquiryRecipients(): string[] {
  return parseEmailList(process.env.INQUIRY_TO_EMAIL || "");
}

export async function sendInquiryEmail(
  to: string[],
  payload: InquiryPayload,
): Promise<{ id?: string }> {
  const config = getResendConfig();
  if (!config) {
    throw new Error("Email is not configured (RESEND_API_KEY / EMAIL_FROM)");
  }
  if (to.length === 0) {
    throw new Error("No inquiry recipients configured");
  }

  const resend = new Resend(config.apiKey);
  const subjectParts = ["Home Hub inquiry"];
  if (payload.model?.trim()) subjectParts.push(payload.model.trim());
  const subject = subjectParts.join(" · ");

  const lines = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone?.trim() || "—"}`,
    `Email: ${payload.email?.trim() || "—"}`,
    `Door / interest: ${payload.model?.trim() || "—"}`,
    `Opened from: ${payload.source?.trim() || "—"}`,
  ];
  if (payload.message?.trim()) {
    lines.push("", "Message:", payload.message.trim());
  }

  const text = lines.join("\n");
  const html = `<pre style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:14px;line-height:1.5;white-space:pre-wrap">${escapeHtml(text)}</pre>`;

  const { data, error } = await resend.emails.send({
    from: config.from,
    to,
    replyTo: payload.email?.trim() || undefined,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message || "Failed to send inquiry email");
  }

  return { id: data?.id };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
