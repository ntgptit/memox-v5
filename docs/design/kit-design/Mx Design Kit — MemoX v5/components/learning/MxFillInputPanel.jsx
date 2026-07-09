import React from "react";

/**
 * MxFillInputPanel — fillMode (mode 5, the SRS activation gate). Shows the
 * meaning; the learner types the prompt/front. Hint (never
 * auto-completes) + Check. States: idle, correct, wrong (retry).
 * Presentational — owner controls `value`, `state`, and the handlers.
 */
export function MxFillInputPanel({
  value = "",
  onChange,
  state = "idle", // idle | correct | wrong
  expected = null, // shown on wrong to explain the difference
  onHint,
  onCheck,
  onRetry,
  style,
}) {
  const border = {
    idle: "var(--mx-border-default)",
    correct: "var(--mx-border-correct)",
    wrong: "var(--mx-border-wrong)",
  }[state];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--mx-space-12)", ...style }}>
      <input
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        readOnly={state !== "idle"}
        placeholder="Type your answer…"
        className="mx-korean"
        style={{
          height: "var(--mx-size-input-height)",
          padding: "0 var(--mx-space-16)",
          background: "var(--mx-color-surface-card)",
          border,
          borderRadius: "var(--mx-radius-md)",
          color: "var(--mx-color-text-primary)",
          fontFamily: "var(--mx-font-korean)",
          fontSize: "var(--mx-text-body-large-size)",
          outline: "none",
          transition: "border-color var(--mx-motion-fast) var(--mx-ease-standard)",
        }}
      />

      {state === "wrong" && expected && (
        <div style={{ fontSize: "var(--mx-text-body-small-size)", color: "var(--mx-color-feedback-wrong)" }}>
          Correct answer: <span className="mx-korean" style={{ fontWeight: 600 }}>{expected}</span>
        </div>
      )}
      {state === "correct" && (
        <div style={{ display: "flex", alignItems: "center", gap: "var(--mx-space-6)", fontSize: "var(--mx-text-body-small-size)", color: "var(--mx-color-feedback-correct)" }}>
          <i data-lucide="check" style={{ width: 16, height: 16 }}></i> Correct
        </div>
      )}

      <div style={{ display: "flex", gap: "var(--mx-space-12)" }}>
        {state === "idle" && (
          <>
            <button type="button" onClick={onHint} style={fillBtn("ghost")}>
              <i data-lucide="lightbulb" style={{ width: 16, height: 16 }}></i> Hint
            </button>
            <button type="button" onClick={onCheck} style={fillBtn("primary")}>Check</button>
          </>
        )}
        {state === "wrong" && (
          <button type="button" onClick={onRetry} style={fillBtn("primary")}>
            <i data-lucide="rotate-cw" style={{ width: 16, height: 16 }}></i> Retry
          </button>
        )}
        {state === "correct" && (
          <button type="button" onClick={onCheck} style={fillBtn("primary")}>Continue</button>
        )}
      </div>
    </div>
  );
}

function fillBtn(kind) {
  const base = {
    flex: 1,
    height: "var(--mx-size-button-height)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--mx-space-8)",
    borderRadius: "var(--mx-radius-md)",
    font: "var(--mx-weight-semibold) var(--mx-text-button-size)/1 var(--mx-font-display)",
    cursor: "pointer",
  };
  if (kind === "ghost")
    return { ...base, flex: "0 0 auto", padding: "0 var(--mx-space-16)", background: "transparent", color: "var(--mx-color-text-secondary)", border: "var(--mx-border-default)" };
  return { ...base, background: "var(--mx-color-action-primary)", color: "var(--mx-color-text-onAction)", border: "none" };
}
