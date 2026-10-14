import { NextRequest, NextResponse } from "next/server";
import { isAdminDbEnabled } from "@/lib/adminDbEnabled";
import { createInquiry } from "@/lib/admin/queries";
import { getInquiryRecipients } from "@/lib/inquiryRecipients";
import { getResendConfig, sendInquiryEmail } from "@/lib/notifyInquiry";

export async function POST(request: NextRequest) {
  try {
    if (!getResendConfig()) {
      return NextResponse.json(
        { error: "Email delivery is not configured" },
        { status: 503 },
      );
    }

    const recipients = getInquiryRecipients();
    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No inquiry recipients configured" },
        { status: 503 },
      );
    }

    const body = await request.json();
    const name = String(body.name || "").trim();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const payload = {
      name,
      phone: String(body.phone || "").trim(),
      email: String(body.email || "").trim(),
      model: String(body.model || "").trim(),
      source: String(body.source || "").trim(),
      message: String(body.message || "").trim(),
    };

    const sent = await sendInquiryEmail(recipients, payload);

    let inquiryId: number | undefined;
    if (isAdminDbEnabled()) {
      try {
        inquiryId = createInquiry(payload);
      } catch {
        // Email already sent — do not fail the request if local archive fails
      }
    }

    return NextResponse.json(
      { ok: true, emailId: sent.id, id: inquiryId },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to send inquiry" },
      { status: 500 },
    );
  }
}
