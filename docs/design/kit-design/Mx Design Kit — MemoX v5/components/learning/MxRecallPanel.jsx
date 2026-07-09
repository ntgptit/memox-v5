import React from "react";

/**
 * MxRecallPanel — recallMode (mode 4). Prompt shown, answer hidden. A "Reveal"
 * button carries a 20s countdown; timing out counts as "Forgot". After
 * reveal, self-grade Forgot / Remembered. States: hidden (counting), revealed.
 * This component is presentational — pass the live `seconds` + handlers.
 */
export function MxRecallPanel({
  phase = "hidden", // hidden | revealed
  seconds = 20,
  meaning,
  onReveal,
  onForgot,
  onRemembered,
  style,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--mx-space-16)", ...style }}>
      {phase === "hidden" ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 96,
              borderRadius: "var(--mx-radius-lg)",
              border: "1.5px dashed var(--mx-color-border-strong)",
              background: "var(--mx-color-state-loadingSurface)",
              color: "var(--mx-color-text-tertiary)",
              fontSize: "var(--mx-text-body-medium-size)",
            }}
          >
            Answer hidden — recall it
          </div>
          <button
            type="button"
            onClick={onReveal}
            style={{
              position: "relative",
              overflow: "hidden",
              height: "var(--mx-size-button-height)",
              border: "none",
              borderRadius: "var(--mx-radius-md)",
              background: "var(--mx-color-action-primary)",
              color: "var(--mx-color-text-onAction)",
              font: "var(--mx-text-button-weight) var(--mx-text-button-size)/1 var(--mx-font-display)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--mx-space-8)",
            }}
          >
            <i data-lucide="eye" style={{ width: 18, height: 18 }}></i>
            Reveal
            <span className="mx-tabular" style={{ opacity: 0.85, fontSize: 14 }}>{seconds}s</span>
          </button>
        </>
      ) : (
        <>
          <div
            style={{
              minHeight: 96,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--mx-space-16)",
              borderRadius: "var(--mx-radius-lg)",
              background: "var(--mx-color-surface-card)",
              border: "var(--mx-border-default)",
              color: "var(--mx-color-text-primary)",
              fontSize: "var(--mx-text-study-explanation-size)",
              lineHeight: "var(--mx-text-study-explanation-line)",
              textAlign: "center",
              textWrap: "pretty",
            }}
          >
            {meaning}
          </div>
          <div style={{ display: "flex", gap: "var(--mx-space-12)" }}>
            <button type="button" onClick={onForgot} style={selfGrade("wrong")}>
              <i data-lucide="rotate-ccw" style={{ width: 18, height: 18 }}></i> Forgot
            </button>
            <button type="button" onClick={onRemembered} style={selfGrade("correct")}>
              <i data-lucide="check" style={{ width: 18, height: 18 }}></i> Remembered
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function selfGrade(kind) {
  const map = {
    wrong: ["var(--mx-color-feedback-wrongSurface)", "var(--mx-color-feedback-wrong)", "var(--mx-color-feedback-wrongBorder)"],
    correct: ["var(--mx-color-feedback-correctSurface)", "var(--mx-color-feedback-correct)", "var(--mx-color-feedback-correctBorder)"],
  }[kind];
  return {
    flex: 1,
    height: "var(--mx-size-button-height)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--mx-space-8)",
    background: map[0],
    color: map[1],
    border: `1.5px solid ${map[2]}`,
    borderRadius: "var(--mx-radius-md)",
    font: "var(--mx-weight-semibold) var(--mx-text-button-size)/1 var(--mx-font-display)",
    cursor: "pointer",
  };
}
