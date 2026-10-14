"use client";

import type { Dictionary } from "@/dictionaries";
import { ContactRequestForm } from "./ContactRequestForm";

export function ContactForm({ dict }: { dict: Dictionary }) {
  return (
    <div className="contact-form-panel">
      <ContactRequestForm
        dict={dict}
        showMessengers
        options={{ intent: "general", source: "Contact page · Form" }}
      />
    </div>
  );
}
