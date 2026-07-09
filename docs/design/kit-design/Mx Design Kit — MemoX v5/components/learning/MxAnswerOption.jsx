import React from "react";

/**
 * MxAnswerOption — a single choice in guessMode (multiple choice). States:
 * default, selected, correct, wrong, disabled. Correct/wrong pair colour with
 * a leading status glyph so the signal is never colour-only. Feedback here is
 * pre-SRS learning in New Learning, SRS grading in Repeat — same visual.
 */
export function MxAnswerOption({
  children,
  state = "default", // default | selected | correct | wrong | disabled
  onClick,
  style,
}) {
  const map = {
    default: { bg: "var(--mx-color-surface-card)", border: "var(--mx-border-default)", color: "var(--mx-color-text-primary)", glyph: null },
    selected: { bg: "var(--mx-color-state-selectedSurface)", border: "var(--mx-border-selected)", color: "var(--mx-color-text-primary)", glyph: null },
    correct: { bg: "var(--mx-color-feedback-correctSurface)", border: "var(--mx-border-correct)", color: "var(--mx-color-feedback-correct)", glyph: "check" },
    wrong: { bg: "var(--mx-color-feedback-wrongSurface)", border: "var(--mx-border-wrong)", color: "var(--mx-color-feedback-wrong)", glyph: "x" },
    disabled: { bg: "var(--mx-color-state-disabledSurface)", border: "var(--mx-border-subtle)", color: "var(--mx-color-text-disabled)", glyph: null },
  };
  const s = map[state];
  const interactive = state === "default" || state === "selected";

  return (
    <button
      type="button"
      disabled={!interactive}
      onClick={interactive ? onClick : undefined}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--mx-space-12)",
        width: "100%",
        minHeight: "var(--mx-size-touch-target)",
        padding: "var(--mx-space-12) var(--mx-space-16)",
        background: s.bg,
        border: s.border,
        borderRadius: "var(--mx-radius-md)",
        color: s.color,
        font: "var(--mx-weight-medium) var(--mx-text-body-large-size)/var(--mx-text-body-large-line) var(--mx-font-body)",
        textAlign: "left",
        cursor: interactive ? "pointer" : "default",
        transition: "border-color var(--mx-motion-fast) var(--mx-ease-standard), background var(--mx-motion-fast) var(--mx-ease-standard)",
        ...style,
      }}
    >
      <span style={{ flex: "1 1 auto", overflowWrap: "anywhere" }}>{children}</span>
      {s.glyph && (
        <span style={{ flex: "0 0 auto", display: "flex" }}>
          <i data-lucide={s.glyph} style={{ width: 20, height: 20 }}></i>
        </span>
      )}
    </button>
  );
}
