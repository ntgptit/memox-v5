import React from "react";

/**
 * MxSectionHeader — the Bazar-style section/screen header. Two patterns in one:
 * a "hero" screen intro (small grey eyebrow + large purple heading) and a
 * standard section header (bold title + a purple "See all" action on the right).
 */
export function MxSectionHeader({
  eyebrow = null,
  title,
  actionLabel = null,
  onAction,
  size = "default", // default | hero
  style,
}) {
  const hero = size === "hero";
  return (
    <div
      style={{
        display: "flex",
        alignItems: hero ? "flex-end" : "baseline",
        justifyContent: "space-between",
        gap: "var(--mx-space-12)",
        padding: "0 var(--mx-space-4)",
        ...style,
      }}
    >
      <div style={{ minWidth: 0 }}>
        {eyebrow && (
          <div style={{ font: "500 var(--mx-text-body-small-size)/1.2 var(--mx-font-body)", color: "var(--mx-color-text-tertiary)", marginBottom: 3 }}>
            {eyebrow}
          </div>
        )}
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--mx-font-display)",
            fontSize: hero ? "var(--mx-text-title-large-size)" : "var(--mx-text-title-medium-size)",
            lineHeight: 1.15,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: hero ? "var(--mx-color-action-primary)" : "var(--mx-color-text-primary)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </h2>
      </div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          style={{ flex: "0 0 auto", border: "none", background: "transparent", padding: 0, cursor: "pointer", font: "600 var(--mx-text-label-large-size) var(--mx-font-display)", color: "var(--mx-color-action-primary)" }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
