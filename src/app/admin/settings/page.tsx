import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import SettingsForm from "@/components/admin/SettingsForm";
import { isAdminDbEnabled } from "@/lib/adminDbEnabled";
import { getInquiryToEmailsSetting } from "@/lib/admin/queries";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  const inquiryToEmails = getInquiryToEmailsSetting();
  const envFallback = process.env.INQUIRY_TO_EMAIL?.trim() || "";
  const siteUrl = getSiteUrl();

  return (
    <div data-tour="tour-settings-page">
      <PageBreadcrumb pageTitle="Settings" />
      <SettingsForm
        initialInquiryToEmails={inquiryToEmails}
        envFallback={envFallback}
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
