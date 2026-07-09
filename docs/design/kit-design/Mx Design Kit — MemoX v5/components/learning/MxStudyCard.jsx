import React from "react";

/**
 * MxStudyCard — the big prompt/answer surface at the centre of a study screen.
 * Korean prompt uses the large centred study.korean role; Vietnamese meaning
 * uses study.explanation with comfortable wrapping for long content. Variants:
 * prompt (front only), answer (meaning only), both (reviewMode — front+back).
 * Optional audio action (semantic label required).
 */
export function MxStudyCard({
  prompt,
  meaning,
  note = null,
  variant = "both", // prompt | answer | both
  onAudio = null,
  style,
}) {
  const showPrompt = variant === "prompt" || variant === "both";
  const showMeaning = variant === "answer" || variant === "both";

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--mx-space-16)",
        minHeight: "var(--mx-size-study-card-min-height)",
        padding: "var(--mx-space-32) var(--mx-space-24)",
        background: "var(--mx-color-surface-card)",
        border: "var(--mx-border-default)",
        borderRadius: "var(--mx-radius-xl)",
        textAlign: "center",
        overflowWrap: "anywhere",
        ...style,
      }}
    >
      {onAudio && (
        <button
          type="button"
          aria-label="Phát âm"
          onClick={onAudio}
          style={{
            position: "absolute",
            top: "var(--mx-space-12)",
            right: "var(--mx-space-12)",
            width: "var(--mx-size-touch-target)",
            height: "var(--mx-size-touch-target)",
            border: "none",
            borderRadius: "var(--mx-radius-full)",
            background: "var(--mx-color-state-selectedSurface)",
            color: "var(--mx-color-action-primary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i data-lucide="volume-2" style={{ width: 20, height: 20 }}></i>
        </button>
      )}

      {showPrompt && (
        <div
          className="mx-korean"
          style={{
            fontSize: "var(--mx-text-study-korean-size)",
            lineHeight: "var(--mx-text-study-korean-line)",
            fontWeight: "var(--mx-text-study-korean-weight)",
            letterSpacing: "var(--mx-text-study-korean-tracking)",
            color: "var(--mx-color-text-primary)",
            textWrap: "balance",
          }}
        >
          {prompt}
        </div>
      )}

      {showPrompt && showMeaning && (
        <div style={{ width: 40, height: 1, background: "var(--mx-color-divider-default)" }} />
      )}

      {showMeaning && (
        <div
          style={{
            fontSize: "var(--mx-text-study-explanation-size)",
            lineHeight: "var(--mx-text-study-explanation-line)",
            fontWeight: "var(--mx-text-study-explanation-weight)",
            color: variant === "answer" ? "var(--mx-color-text-primary)" : "var(--mx-color-text-secondary)",
            maxWidth: 420,
            textWrap: "pretty",
          }}
        >
          {meaning}
        </div>
      )}

      {note && (
        <div
          style={{
            fontSize: "var(--mx-text-body-small-size)",
            lineHeight: "var(--mx-text-body-small-line)",
            color: "var(--mx-color-text-tertiary)",
            maxWidth: 420,
            textWrap: "pretty",
          }}
        >
          {note}
        </div>
      )}
    </div>
  );
}
