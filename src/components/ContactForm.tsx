"use client";

import type { Dictionary } from "@/dictionaries";
import type { ContactMessengerLink } from "@/lib/contactInfo";
import { ContactRequestForm } from "./ContactRequestForm";

export function ContactForm({
  dict,
  messengers,
}: {
  dict: Dictionary;
  messengers: ContactMessengerLink[];
}) {
  return (
    <div className="contact-form-panel">
      <ContactRequestForm
        dict={dict}
        messengers={messengers}
        showMessengers
        options={{ intent: "general", source: "Contact page · Form" }}
      />
    </div>
  );
}
