import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import SettingsForm from "@/components/admin/SettingsForm";
import { isAdminDbEnabled } from "@/lib/adminDbEnabled";
import {
  getContactInfoStored,
  getInquiryToEmailsSetting,
} from "@/lib/admin/queries";
import { mergeContactInfoStored } from "@/lib/contactInfo";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  const inquiryToEmails = isAdminDbEnabled() ? getInquiryToEmailsSetting() : "";
  const contact = isAdminDbEnabled()
    ? getContactInfoStored()
    : mergeContactInfoStored();
  const envFallback = process.env.INQUIRY_TO_EMAIL?.trim() || "";
  const siteUrl = getSiteUrl();

  return (
    <div data-tour="tour-settings-page">
      <PageBreadcrumb pageTitle="Settings" />
      <SettingsForm
        initialInquiryToEmails={inquiryToEmails}
        initialContact={contact}
        system={{
          siteUrl,
          emailFromConfigured: Boolean(process.env.EMAIL_FROM?.trim()),
          resendConfigured: Boolean(process.env.RESEND_API_KEY?.trim()),
          inquiryEnvFallback: envFallback,
          adminDbEnabled: isAdminDbEnabled(),
          feedXml: `${siteUrl}/feeds/products.xml`,
          feedJson: `${siteUrl}/feeds/products.json`,
        }}
      />
    </div>
  );
}
