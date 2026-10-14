"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InquiryDetailActions({
  id,
  status,
  email,
  phone,
  model,
  source,
  customerName,
}: {
  id: number;
  status: string;
  email: string;
  phone: string;
  model?: string;
  source?: string;
  customerName?: string;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(status);
  const [error, setError] = useState("");

  async function updateStatus(next: string) {
    setError("");
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (!res.ok) {
      setError("Failed to update status");
      return;
    }
    setCurrent(next);
    router.refresh();
  }

  const mailtoSubject = encodeURIComponent(
    `Home Hub · ${model?.trim() || "your enquiry"}`,
  );
  const mailtoBody = encodeURIComponent(
    `Hi ${customerName || ""},\n\nThank you for your enquiry${
      model ? ` about ${model}` : ""
    }.\n\n`,
  );
  const digits = phone.replace(/\D/g, "");
  const waText = encodeURIComponent(
    `Hi ${customerName || ""} — following up on your Home Hub enquiry${
      model ? ` (${model})` : ""
    }.`,
  );

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="mb-4 text-base font-semibold text-gray-900">
          Quick actions
        </h3>
        {error ? (
          <p className="mb-3 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <label className="mb-4 block text-sm text-gray-600">
          Status
          <select
            className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 capitalize"
            value={current}
            onChange={(e) => updateStatus(e.target.value)}
          >
            <option value="new">new</option>
            <option value="in_progress">in progress</option>
            <option value="done">done</option>
            <option value="archived">archived</option>
          </select>
        </label>
        <div className="space-y-2">
          {email ? (
            <a
              href={`mailto:${email}?subject=${mailtoSubject}&body=${mailtoBody}`}
              className="block rounded-xl bg-[#3c2412] px-4 py-2.5 text-center text-sm font-medium text-[#f5ebe0] hover:bg-[#2a180c]"
            >
              Email customer
            </a>
          ) : null}
          {phone ? (
            <a
              href={`tel:${phone}`}
              className="block rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Call {phone}
            </a>
          ) : null}
          {digits ? (
            <a
              href={`https://wa.me/${digits}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-gray-200 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              WhatsApp
            </a>
          ) : null}
        </div>
      </div>

      {(model || source) && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Context</h3>
          <dl className="space-y-2 text-sm">
            {model ? (
              <div>
                <dt className="text-xs tracking-wide text-gray-500 uppercase">
                  Interest
                </dt>
                <dd className="mt-0.5 text-gray-800">{model}</dd>
              </div>
            ) : null}
            {source ? (
              <div>
                <dt className="text-xs tracking-wide text-gray-500 uppercase">
                  Source
                </dt>
                <dd className="mt-0.5 text-gray-800">{source}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      )}
    </div>
  );
}
