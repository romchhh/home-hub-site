import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  getInquiryToEmailsSetting,
  setInquiryToEmailsSetting,
} from "@/lib/admin/queries";
import { parseEmailList } from "@/lib/notifyInquiry";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  return NextResponse.json({
    inquiry_to_emails: getInquiryToEmailsSetting(),
  });
}

export async function PATCH(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    const raw = String(body.inquiry_to_emails ?? "").trim();
    const parsed = parseEmailList(raw);
    if (raw && parsed.length === 0) {
      return NextResponse.json(
        { error: "Enter at least one valid email address" },
        { status: 400 },
      );
    }
    // Normalize to comma-separated unique list
    const normalized = [...new Set(parsed)].join(", ");
    setInquiryToEmailsSetting(normalized);
    return NextResponse.json({ inquiry_to_emails: normalized });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save settings" },
      { status: 500 },
    );
  }
}
