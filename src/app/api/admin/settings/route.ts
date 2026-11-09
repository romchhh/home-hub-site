import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import {
  getContactInfoStored,
  getInquiryToEmailsSetting,
  setContactInfoStored,
  setInquiryToEmailsSetting,
} from "@/lib/admin/queries";
import {
  mergeContactInfoStored,
  type ContactInfoStored,
} from "@/lib/contactInfo";
import { parseEmailList } from "@/lib/notifyInquiry";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  return NextResponse.json({
    inquiry_to_emails: getInquiryToEmailsSetting(),
    contact: getContactInfoStored(),
  });
}

export async function PATCH(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    const response: {
      inquiry_to_emails?: string;
      contact?: ContactInfoStored;
    } = {};

    if (body.inquiry_to_emails !== undefined) {
      const raw = String(body.inquiry_to_emails ?? "").trim();
      const parsed = parseEmailList(raw);
      if (raw && parsed.length === 0) {
        return NextResponse.json(
          { error: "Enter at least one valid email address" },
          { status: 400 },
        );
      }
      const normalized = [...new Set(parsed)].join(", ");
      setInquiryToEmailsSetting(normalized);
      response.inquiry_to_emails = normalized;
    }

    if (body.contact !== undefined) {
      if (!body.contact || typeof body.contact !== "object") {
        return NextResponse.json(
          { error: "Invalid contact settings" },
          { status: 400 },
        );
      }
      const contact = mergeContactInfoStored(body.contact as Partial<ContactInfoStored>);
      if (!contact.email.includes("@")) {
        return NextResponse.json(
          { error: "Enter a valid showroom email" },
          { status: 400 },
        );
      }
      if (!contact.phone.trim()) {
        return NextResponse.json(
          { error: "Enter a phone number" },
          { status: 400 },
        );
      }
      if (!contact.addressLine1.trim() || !contact.addressLine2.trim()) {
        return NextResponse.json(
          { error: "Enter the full showroom address" },
          { status: 400 },
        );
      }
      setContactInfoStored(contact);
      response.contact = contact;
    }

    if (response.inquiry_to_emails === undefined && response.contact === undefined) {
      return NextResponse.json(
        { error: "Nothing to update" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      inquiry_to_emails:
        response.inquiry_to_emails ?? getInquiryToEmailsSetting(),
      contact: response.contact ?? getContactInfoStored(),
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to save settings" },
      { status: 500 },
    );
  }
}
