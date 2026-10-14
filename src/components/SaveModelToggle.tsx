"use client";

import { useSavedItems } from "@/context/SavedItemsContext";

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none">
      <path
        d="M7.25 3.75h9.5a1.5 1.5 0 0 1 1.5 1.5v14.1l-5.35-3.35a1.75 1.75 0 0 0-1.8 0L5.75 19.35V5.25a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

export function SaveModelToggle({
  slug,
  colorHex,
  addLabel,
  removeLabel,
  inListLabel,
  className = "",
  compact = false,
}: {
  slug: string;
  colorHex?: string;
  addLabel: string;
  removeLabel: string;
  inListLabel: string;
  className?: string;
  compact?: boolean;
}) {
  const { isSaved, toggleSaved } = useSavedItems();
  const saved = isSaved(slug);
  const label = saved ? removeLabel : addLabel;

  return (
    <button
      type="button"
      className={`save-model-toggle ${saved ? "save-model-toggle--saved" : ""} ${
        compact ? "save-model-toggle--compact" : ""
      } ${className}`.trim()}
      aria-pressed={saved}
      aria-label={label}
      title={saved ? inListLabel : addLabel}
      onClick={(event) => {
        event.stopPropagation();
        toggleSaved(slug, colorHex);
      }}
    >
      <BookmarkIcon filled={saved} />
      {compact ? null : <span>{saved ? removeLabel : addLabel}</span>}
    </button>
  );
}
