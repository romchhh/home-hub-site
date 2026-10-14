import { isAdminDbEnabled } from "@/lib/adminDbEnabled";
import { getInquiryToEmailsSetting } from "@/lib/admin/queries";
import { getEnvInquiryRecipients, parseEmailList } from "@/lib/notifyInquiry";

/** Recipients from admin Settings when DB is on; otherwise env fallback. */
export function getInquiryRecipients(): string[] {
  if (isAdminDbEnabled()) {
    try {
      const fromSettings = parseEmailList(getInquiryToEmailsSetting());
      if (fromSettings.length > 0) return fromSettings;
    } catch {
      // fall through to env
    }
  }
  return getEnvInquiryRecipients();
}
