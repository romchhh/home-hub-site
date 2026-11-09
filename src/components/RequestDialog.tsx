"use client";

import { useEffect, useState } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type { Dictionary } from "@/dictionaries";
import type { ContactMessengerLink } from "@/lib/contactInfo";
import type { RequestOpenOptions } from "@/lib/requestOpen";
import { ContactRequestForm } from "./ContactRequestForm";

type RequestDialogProps = {
  dict: Dictionary;
  messengers: ContactMessengerLink[];
  open: boolean;
  options: RequestOpenOptions;
  onClose: () => void;
};

export function RequestDialog({
  dict,
  messengers,
  open,
  options,
  onClose,
}: RequestDialogProps) {
  const r = dict.request;
  const [sent, setSent] = useState(false);

  useLockBodyScroll(open);

  useEffect(() => {
    if (open) setSent(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="contact-sheet-root" role="presentation">
      <button
        type="button"
        className="contact-sheet-backdrop"
        aria-label={dict.nav.close}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={sent ? "contact-sheet-success" : "contact-sheet-title"}
        className={`contact-sheet${sent ? " contact-sheet--success" : ""}`}
      >
        <div className="contact-sheet-handle" aria-hidden />
        <div className="contact-sheet-header">
          {!sent ? (
            <h2 id="contact-sheet-title" className="contact-sheet-title">
              {r.dialogTitle}
            </h2>
          ) : (
            <span className="contact-sheet-title-spacer" aria-hidden />
          )}
          <button
            type="button"
            className="contact-sheet-close"
            aria-label={dict.nav.close}
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3.5 3.5l9 9M12.5 3.5l-9 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="contact-sheet-body">
          <ContactRequestForm
            key={`${options.intent}-${options.model}-${options.source}-${open}`}
            dict={dict}
            messengers={messengers}
            options={options}
            fillSuccess
            onSuccess={() => setSent(true)}
            onDismiss={onClose}
          />
        </div>
        {sent ? (
          <span id="contact-sheet-success" className="sr-only">
            {r.saved}
          </span>
        ) : null}
      </div>
    </div>
  );
}
