"use client";

import { useState, type ReactNode } from "react";
import type { ContactInfoStored } from "@/lib/contactInfo";

type SystemInfo = {
  siteUrl: string;
  emailFromConfigured: boolean;
  resendConfigured: boolean;
  inquiryEnvFallback: string;
  adminDbEnabled: boolean;
  feedXml: string;
  feedJson: string;
};

const fieldClass =
  "w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#3c2412] focus:ring-3 focus:ring-[#3c2412]/12";

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 block text-xs font-medium tracking-wide text-gray-500 uppercase">
      {children}
    </span>
  );
}

export default function SettingsForm({
  initialInquiryToEmails,
  initialContact,
  system,
}: {
  initialInquiryToEmails: string;
  initialContact: ContactInfoStored;
  system: SystemInfo;
}) {
  const [emails, setEmails] = useState(initialInquiryToEmails);
  const [contact, setContact] = useState(initialContact);
  const [savingEmails, setSavingEmails] = useState(false);
  const [savingContact, setSavingContact] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactError, setContactError] = useState("");

  function updateContact<K extends keyof ContactInfoStored>(
    key: K,
    value: ContactInfoStored[K],
  ) {
    setContact((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmitEmails(e: React.FormEvent) {
    e.preventDefault();
    setSavingEmails(true);
    setEmailMessage("");
    setEmailError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiry_to_emails: emails }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setEmailError(data.error || "Failed to save");
        return;
      }
      setEmails(data.inquiry_to_emails || "");
      setEmailMessage("Inquiry emails saved.");
    } catch {
      setEmailError("Failed to save");
    } finally {
      setSavingEmails(false);
    }
  }

  async function onSubmitContact(e: React.FormEvent) {
    e.preventDefault();
    setSavingContact(true);
    setContactMessage("");
    setContactError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setContactError(data.error || "Failed to save");
        return;
      }
      if (data.contact) setContact(data.contact);
      setContactMessage("Showroom & contact saved. The public site uses these values.");
    } catch {
      setContactError("Failed to save");
    } finally {
      setSavingContact(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="space-y-6 lg:col-span-3">
        <form
          onSubmit={onSubmitContact}
          data-tour="tour-settings-contact"
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6"
        >
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Showroom & contact
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Shown in the footer, contact page, maps, and SEO markup. Changes
              apply on the next page load of the public site.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <FieldLabel>Company name</FieldLabel>
              <input
                value={contact.companyName}
                onChange={(e) => updateContact("companyName", e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="block">
              <FieldLabel>Org.nr</FieldLabel>
              <input
                value={contact.orgNr}
                onChange={(e) => updateContact("orgNr", e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="block">
              <FieldLabel>Country</FieldLabel>
              <input
                value={contact.country}
                onChange={(e) => updateContact("country", e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <FieldLabel>Tagline (Swedish)</FieldLabel>
              <input
                value={contact.taglineSv}
                onChange={(e) => updateContact("taglineSv", e.target.value)}
                className={fieldClass}
              />
            </label>
            <label className="block sm:col-span-2">
              <FieldLabel>Tagline (English)</FieldLabel>
              <input
                value={contact.taglineEn}
                onChange={(e) => updateContact("taglineEn", e.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-semibold text-gray-900">Address & map</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <FieldLabel>Street address</FieldLabel>
                <input
                  value={contact.addressLine1}
                  onChange={(e) => updateContact("addressLine1", e.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <FieldLabel>Postal code & city</FieldLabel>
                <input
                  value={contact.addressLine2}
                  onChange={(e) => updateContact("addressLine2", e.target.value)}
                  className={fieldClass}
                />
              </label>
              <label className="block sm:col-span-2">
                <FieldLabel>Map search query</FieldLabel>
                <input
                  value={contact.mapSearchQuery}
                  onChange={(e) => updateContact("mapSearchQuery", e.target.value)}
                  className={fieldClass}
                  placeholder="Fredensvägen 4C, 174 53 Sundbyberg, Sweden"
                />
              </label>
              <label className="block">
                <FieldLabel>Latitude</FieldLabel>
                <input
                  type="number"
                  step="any"
                  value={contact.lat}
                  onChange={(e) => updateContact("lat", Number(e.target.value))}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <FieldLabel>Longitude</FieldLabel>
                <input
                  type="number"
                  step="any"
                  value={contact.lng}
                  onChange={(e) => updateContact("lng", Number(e.target.value))}
                  className={fieldClass}
                />
              </label>
              <label className="block sm:col-span-2">
                <FieldLabel>Hero showroom title (Swedish)</FieldLabel>
                <input
                  value={contact.heroShowroomTitleSv}
                  onChange={(e) =>
                    updateContact("heroShowroomTitleSv", e.target.value)
                  }
                  className={fieldClass}
                />
              </label>
              <label className="block sm:col-span-2">
                <FieldLabel>Hero showroom title (English)</FieldLabel>
                <input
                  value={contact.heroShowroomTitleEn}
                  onChange={(e) =>
                    updateContact("heroShowroomTitleEn", e.target.value)
                  }
                  className={fieldClass}
                />
              </label>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-semibold text-gray-900">Phone & email</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <FieldLabel>Phone</FieldLabel>
                <input
                  value={contact.phone}
                  onChange={(e) => updateContact("phone", e.target.value)}
                  className={fieldClass}
                  placeholder="+46812345678"
                />
              </label>
              <label className="block">
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => updateContact("email", e.target.value)}
                  className={fieldClass}
                />
              </label>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-semibold text-gray-900">Opening hours</h3>
            <p className="mt-1 text-sm text-gray-500">
              One line per row. Shown on the contact page and in the footer.
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <FieldLabel>Hours (Swedish)</FieldLabel>
                <textarea
                  value={contact.hoursSv}
                  onChange={(e) => updateContact("hoursSv", e.target.value)}
                  rows={4}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <FieldLabel>Hours (English)</FieldLabel>
                <textarea
                  value={contact.hoursEn}
                  onChange={(e) => updateContact("hoursEn", e.target.value)}
                  rows={4}
                  className={fieldClass}
                />
              </label>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <h3 className="text-sm font-semibold text-gray-900">Social & WhatsApp</h3>
            <div className="mt-3 grid gap-4">
              <label className="block">
                <FieldLabel>Instagram URL</FieldLabel>
                <input
                  value={contact.instagramUrl}
                  onChange={(e) => updateContact("instagramUrl", e.target.value)}
                  className={fieldClass}
                  placeholder="https://www.instagram.com/…"
                />
              </label>
              <label className="block">
                <FieldLabel>Facebook URL</FieldLabel>
                <input
                  value={contact.facebookUrl}
                  onChange={(e) => updateContact("facebookUrl", e.target.value)}
                  className={fieldClass}
                  placeholder="https://www.facebook.com/…"
                />
              </label>
              <label className="block">
                <FieldLabel>WhatsApp URL</FieldLabel>
                <input
                  value={contact.whatsappUrl}
                  onChange={(e) => updateContact("whatsappUrl", e.target.value)}
                  className={fieldClass}
                  placeholder="https://wa.me/46…"
                />
                <span className="mt-1 block text-xs text-gray-500">
                  Leave empty to build a link from the phone number above.
                </span>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={savingContact || !system.adminDbEnabled}
              className="admin-btn admin-btn-primary"
            >
              {savingContact ? "Saving…" : "Save showroom & contact"}
            </button>
            {!system.adminDbEnabled ? (
              <span className="text-sm text-amber-700">
                Admin database is off — contact edits cannot be saved.
              </span>
            ) : null}
            {contactMessage ? (
              <span className="text-sm text-green-700" role="status">
                {contactMessage}
              </span>
            ) : null}
            {contactError ? (
              <span className="text-sm text-red-600" role="alert">
                {contactError}
              </span>
            ) : null}
          </div>
        </form>

        <form
          onSubmit={onSubmitEmails}
          data-tour="tour-settings-emails"
          className="rounded-2xl border border-gray-200 bg-white p-6"
        >
          <h2 className="text-base font-semibold text-gray-900">Inquiry emails</h2>
          <p className="mt-1 text-sm text-gray-500">
            Who should be notified when someone submits the contact form.
            Separate addresses with commas or new lines. Leave empty to use the
            server default recipients from environment config.
          </p>
          <label className="mt-4 block">
            <FieldLabel>Recipients</FieldLabel>
            <textarea
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              rows={4}
              placeholder="hello@homehub.se, sales@homehub.se"
              className={fieldClass}
            />
          </label>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={savingEmails}
              className="admin-btn admin-btn-primary"
            >
              {savingEmails ? "Saving…" : "Save inquiry emails"}
            </button>
            {emailMessage ? (
              <span className="text-sm text-green-700" role="status">
                {emailMessage}
              </span>
            ) : null}
            {emailError ? (
              <span className="text-sm text-red-600" role="alert">
                {emailError}
              </span>
            ) : null}
          </div>
        </form>
      </div>

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
              label="Mail sender"
              detail={system.emailFromConfigured ? "Configured" : "Missing EMAIL_FROM"}
            />
            <StatusRow
              ok={Boolean(system.inquiryEnvFallback || emails.trim())}
              label="Recipients"
              detail={
                emails.trim()
                  ? "Using list above"
                  : system.inquiryEnvFallback
                    ? "Using server default"
                    : "None set"
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
