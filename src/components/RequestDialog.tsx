"use client";

import { useEffect, useState } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type { Dictionary } from "@/dictionaries";
import type { RequestOpenOptions } from "@/lib/requestOpen";
import { ContactRequestForm } from "./ContactRequestForm";

type RequestDialogProps = {
  dict: Dictionary;
  open: boolean;
  options: RequestOpenOptions;
  onClose: () => void;
};

export function RequestDialog({ dict, open, options, onClose }: RequestDialogProps) {
  const r = dict.request;
  const [sent, setSent] = useState(false);

  useLockBodyScroll(open);

  useEffect(() => {
    if (open) setSent(false);
  }, [open]);

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
        {!sent ? (
          <h2 id="contact-sheet-title" className="contact-sheet-title">
            {r.dialogTitle}
          </h2>
        ) : null}
        <ContactRequestForm
          key={`${options.intent}-${options.model}-${options.source}-${open}`}
          dict={dict}
          options={options}
          fillSuccess
          onSuccess={() => setSent(true)}
          onDismiss={onClose}
        />
        {sent ? (
          <span id="contact-sheet-success" className="sr-only">
            {r.saved}
          </span>
        ) : null}
      </div>
    </div>
  );
}
