import { NextRequest, NextResponse } from "next/server";
import { isAdminDbEnabled } from "@/lib/adminDbEnabled";
import { createInquiry } from "@/lib/admin/queries";
import { getInquiryRecipients } from "@/lib/inquiryRecipients";
import { getResendConfig, sendInquiryEmail } from "@/lib/notifyInquiry";

export async function POST(request: NextRequest) {
  try {
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

    const resendReady = Boolean(getResendConfig());
    const recipients = resendReady ? getInquiryRecipients() : [];
    const canEmail = resendReady && recipients.length > 0;
    const canArchive = isAdminDbEnabled();

    if (!canEmail && !canArchive) {
      return NextResponse.json(
        {
          error:
            "Inquiries are not configured (set Resend + recipients, or enable the admin database)",
        },
        { status: 503 },
      );
    }

    let emailId: string | undefined;
    let emailError: string | undefined;
    if (canEmail) {
      try {
        const sent = await sendInquiryEmail(recipients, payload);
        emailId = sent.id;
      } catch (e) {
        emailError = e instanceof Error ? e.message : "Failed to send email";
        console.error("[inquiries] email failed:", emailError);
      }
    }

    let inquiryId: number | undefined;
    let archiveError: string | undefined;
    if (canArchive) {
      try {
        inquiryId = createInquiry(payload);
      } catch (e) {
        archiveError = e instanceof Error ? e.message : "Failed to save inquiry";
        console.error("[inquiries] archive failed:", archiveError);
      }
    }

    // Success if at least one channel worked — leads are not lost when mail is down.
    if (emailId || inquiryId != null) {
      return NextResponse.json(
        {
          ok: true,
          emailId,
          id: inquiryId,
          emailDelivered: Boolean(emailId),
          ...(emailError && !emailId ? { emailWarning: emailError } : {}),
        },
        { status: 201 },
      );
    }

    return NextResponse.json(
      {
        error: emailError || archiveError || "Failed to submit inquiry",
      },
      { status: 500 },
    );
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to send inquiry" },
      { status: 500 },
    );
  }
}
