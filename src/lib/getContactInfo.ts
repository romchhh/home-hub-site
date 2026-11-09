import { getContactInfoStored } from "@/lib/admin/queries";
import { isAdminDbEnabled } from "@/lib/adminDbEnabled";
import { buildContactInfo, type ContactInfo } from "@/lib/contactInfo";

/** Live showroom/contact facts from admin Settings when DB is on. */
export function getContactInfo(): ContactInfo {
  if (!isAdminDbEnabled()) return buildContactInfo();
  try {
    return buildContactInfo(getContactInfoStored());
  } catch {
    return buildContactInfo();
  }
}
