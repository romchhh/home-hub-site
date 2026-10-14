export type RequestIntent = "model" | "project" | "general";

export type RequestOpenOptions = {
  /** Which lead copy to show in the form */
  intent?: RequestIntent;
  /** Specific door / product the visitor is asking about */
  model?: string;
  /** Where on the site the CTA was opened — stored for admin */
  source?: string;
};

export function normalizeRequestOpen(
  input?: string | RequestOpenOptions,
): Required<Pick<RequestOpenOptions, "intent">> & RequestOpenOptions {
  if (!input) {
    return { intent: "general", source: "Contact form" };
  }
  if (typeof input === "string") {
    const model = input.trim();
    return model
      ? { intent: "model", model, source: `Product · ${model}` }
      : { intent: "general", source: "Contact form" };
  }
  const model = input.model?.trim() || undefined;
  const intent =
    input.intent ?? (model ? "model" : "general");
  return {
    intent,
    model,
    source: input.source?.trim() || (model ? `Product · ${model}` : "Contact form"),
  };
}
