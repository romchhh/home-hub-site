"use client";

import { useState } from "react";

type SystemInfo = {
  siteUrl: string;
  emailFromConfigured: boolean;
  resendConfigured: boolean;
  inquiryEnvFallback: string;
  adminDbEnabled: boolean;
  feedXml: string;
  feedJson: string;
};

export default function SettingsForm({
  initialInquiryToEmails,
  envFallback,
  system,
}: {
  initialInquiryToEmails: string;
  envFallback: string;
  system: SystemInfo;
}) {
  const [emails, setEmails] = useState(initialInquiryToEmails);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiry_to_emails: emails }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Failed to save");
        return;
      }
      setEmails(data.inquiry_to_emails || "");
      setMessage("Settings saved.");
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <form onSubmit={onSubmit} className="space-y-6 lg:col-span-3">
        <div
          data-tour="tour-settings-emails"
          className="rounded-2xl border border-gray-200 bg-white p-6"
        >
          <h2 className="text-base font-semibold text-gray-900">Inquiry emails</h2>
          <p className="mt-1 text-sm text-gray-500">
            Addresses that receive contact-form submissions via Resend. Separate
            with commas or new lines. If empty, the server falls back to{" "}
            <code className="rounded bg-gray-100 px-1 text-xs">INQUIRY_TO_EMAIL</code>
            {envFallback ? (
              <>
                {" "}
                (<span className="text-gray-700">{envFallback}</span>).
              </>
            ) : (
              " (not set in env)."
            )}
          </p>
          <label className="mt-4 block">
            <span className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase">
              Recipients
            </span>
            <textarea
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              rows={4}
              placeholder="hello@homehub.se, sales@homehub.se"
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#3c2412] focus:ring-3 focus:ring-[#3c2412]/12"
            />
          </label>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#3c2412] px-4 py-2.5 text-sm font-medium text-[#f5ebe0] disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save settings"}
            </button>
            {message ? (
              <span className="text-sm text-green-700" role="status">
                {message}
              </span>
            ) : null}
            {error ? (
              <span className="text-sm text-red-600" role="alert">
                {error}
              </span>
            ) : null}
          </div>
        </div>
      </form>

      <aside
        data-tour="tour-settings-status"
        className="space-y-4 lg:col-span-2"
      >
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900">System status</h2>
          <ul className="mt-3 space-y-2.5 text-sm">
            <StatusRow
              ok={system.resendConfigured}
              label="Resend API key"
              detail={system.resendConfigured ? "Configured" : "Missing RESEND_API_KEY"}
            />
            <StatusRow
              ok={system.emailFromConfigured}
              label="From address"
              detail={system.emailFromConfigured ? "Configured" : "Missing EMAIL_FROM"}
            />
            <StatusRow
              ok={Boolean(system.inquiryEnvFallback || emails.trim())}
              label="Recipients"
              detail={
                emails.trim()
                  ? "Using admin settings"
                  : system.inquiryEnvFallback
                    ? "Using env fallback"
                    : "No recipients"
              }
            />
            <StatusRow
              ok={system.adminDbEnabled}
              label="Admin database"
              detail={system.adminDbEnabled ? "Enabled" : "Disabled (static catalogue)"}
            />
          </ul>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="text-base font-semibold text-gray-900">SEO & feeds</h2>
          <p className="mt-1 text-sm text-gray-500">
            Public product feeds for Google Merchant and partners.
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={system.feedXml}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#3c2412] hover:underline"
              >
                products.xml
              </a>
              <span className="text-gray-400"> · SV · Google Merchant</span>
            </li>
            <li>
              <a
                href={system.feedXml.replace(/\.xml$/, ".en.xml")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#3c2412] hover:underline"
              >
                products.en.xml
              </a>
              <span className="text-gray-400"> · EN</span>
            </li>
            <li>
              <a
                href={system.feedJson}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#3c2412] hover:underline"
              >
                products.json
              </a>
              <span className="text-gray-400"> · SV</span>
            </li>
            <li>
              <a
                href={system.feedJson.replace(/\.json$/, ".en.json")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#3c2412] hover:underline"
              >
                products.en.json
              </a>
              <span className="text-gray-400"> · EN</span>
            </li>
            <li className="pt-1 text-xs break-all text-gray-500">
              Site URL: {system.siteUrl}
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

function StatusRow({
  ok,
  label,
  detail,
}: {
  ok: boolean;
  label: string;
  detail: string;
}) {
  return (
    <li className="flex items-start justify-between gap-3">
      <span className="text-gray-600">{label}</span>
      <span
        className={`text-right text-xs font-medium ${
          ok ? "text-green-700" : "text-amber-700"
        }`}
      >
        {detail}
      </span>
    </li>
  );
}
