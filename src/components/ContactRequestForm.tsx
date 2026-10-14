"use client";

import { useId, useMemo, useState } from "react";
import type { Dictionary } from "@/dictionaries";
import {
  normalizeRequestOpen,
  type RequestOpenOptions,
} from "@/lib/requestOpen";
import { ArrowIcon } from "./ArrowIcon";
import { ContactMessengers } from "./ContactMessengers";

export function ContactRequestForm({
  dict,
  prefill = "",
  options,
  showMessengers = true,
}: {
  dict: Dictionary;
  /** @deprecated prefer `options.model` */
  prefill?: string;
  options?: string | RequestOpenOptions;
  showMessengers?: boolean;
}) {
  const r = dict.request;
  const resolved = useMemo(
    () =>
      normalizeRequestOpen(
        options ?? (prefill ? { model: prefill, intent: "model" } : undefined),
      ),
    [options, prefill],
  );
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [sending, setSending] = useState(false);
  const formId = useId();

  const lead = useMemo(() => {
    if (resolved.intent === "model" && resolved.model) {
      return r.leadModelNamed.replace("{model}", resolved.model);
    }
    if (resolved.intent === "model") return r.leadModel;
    if (resolved.intent === "project") return r.leadProject;
    return r.lead;
  }, [resolved, r]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const model = (data.get("model") as string) || resolved.model || "";
    const source = (data.get("source") as string) || resolved.source || "";
    setSending(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          model,
          source,
        }),
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-request-form" onSubmit={handleSubmit}>
      <p className="contact-form-lead">{lead}</p>
      {resolved.model ? (
        <p className="contact-form-about">
          <span className="contact-form-about-label">{r.aboutModel}</span>
          <span className="contact-form-about-value">{resolved.model}</span>
        </p>
      ) : null}
      {resolved.model ? <input type="hidden" name="model" value={resolved.model} /> : null}
      {resolved.source ? <input type="hidden" name="source" value={resolved.source} /> : null}
      <label className="sr-only" htmlFor={`${formId}-name`}>
        {r.name}
      </label>
      <input
        id={`${formId}-name`}
        name="name"
        autoComplete="name"
        required
        className="contact-field"
        placeholder={r.namePlaceholder}
        aria-label={r.name}
      />
      <label className="sr-only" htmlFor={`${formId}-phone`}>
        {r.phoneLabel}
      </label>
      <input
        id={`${formId}-phone`}
        name="phone"
        type="tel"
        autoComplete="tel"
        required
        className="contact-field"
        placeholder={r.phonePlaceholder}
        aria-label={r.phoneLabel}
      />
      <label className="sr-only" htmlFor={`${formId}-email`}>
        {r.emailLabel}
      </label>
      <input
        id={`${formId}-email`}
        name="email"
        type="email"
        autoComplete="email"
        required
        className="contact-field"
        placeholder={r.emailPlaceholder}
        aria-label={r.emailLabel}
      />
      <button type="submit" className="contact-form-submit" disabled={sending}>
        <span>{sending ? "…" : r.submit}</span>
        <ArrowIcon className="contact-form-submit-arrow" />
      </button>
      <p className="contact-form-note">{r.note}</p>
      {status === "success" ? (
        <p className="contact-form-status contact-form-status--ok" role="status">
          {r.saved}
        </p>
      ) : null}
      {status === "error" ? (
        <p className="contact-form-status contact-form-status--error" role="alert">
          {r.error}
        </p>
      ) : null}
      {showMessengers ? <ContactMessengers dict={dict} /> : null}
    </form>
  );
}
