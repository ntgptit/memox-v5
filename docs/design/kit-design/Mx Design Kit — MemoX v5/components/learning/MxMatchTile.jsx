import React from "react";

/**
 * MxMatchTile — a tile in matchMode (pair prompt ↔ meaning). A pair is only
 * graded once two tiles are selected: correct = green, wrong = red, then reset
 * or lock as completed. States: default, selected, correct, wrong, completed.
 * `side` picks the Korean font for prompt tiles.
 */
export function MxMatchTile({
  children,
  side = "prompt", // prompt | meaning
  state = "default", // default | selected | correct | wrong | completed
  onClick,
  style,
}) {
  const map = {
    default: { bg: "var(--mx-color-surface-card)", border: "var(--mx-border-default)", color: "var(--mx-color-text-primary)", op: 1 },
    selected: { bg: "var(--mx-color-state-selectedSurface)", border: "var(--mx-border-selected)", color: "var(--mx-color-text-primary)", op: 1 },
    correct: { bg: "var(--mx-color-feedback-correctSurface)", border: "var(--mx-border-correct)", color: "var(--mx-color-feedback-correct)", op: 1 },
    wrong: { bg: "var(--mx-color-feedback-wrongSurface)", border: "var(--mx-border-wrong)", color: "var(--mx-color-feedback-wrong)", op: 1 },
    completed: { bg: "var(--mx-color-state-disabledSurface)", border: "var(--mx-border-subtle)", color: "var(--mx-color-text-disabled)", op: 0.5 },
  };
  const s = map[state];
  const interactive = state === "default" || state === "selected";

  return (
    <button
      type="button"
      disabled={!interactive}
      onClick={interactive ? onClick : undefined}
      className={side === "prompt" ? "mx-korean" : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 64,
        padding: "var(--mx-space-12) var(--mx-space-16)",
        background: s.bg,
        border: s.border,
        borderRadius: "var(--mx-radius-md)",
        color: s.color,
        opacity: s.op,
        fontFamily: side === "prompt" ? "var(--mx-font-korean)" : "var(--mx-font-body)",
        fontSize: side === "prompt" ? "20px" : "var(--mx-text-body-medium-size)",
        fontWeight: side === "prompt" ? 700 : 500,
        lineHeight: 1.3,
        textAlign: "center",
        cursor: interactive ? "pointer" : "default",
        transition: "border-color var(--mx-motion-fast) var(--mx-ease-standard), background var(--mx-motion-fast) var(--mx-ease-standard), opacity var(--mx-motion-normal) var(--mx-ease-standard)",
        overflowWrap: "anywhere",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
