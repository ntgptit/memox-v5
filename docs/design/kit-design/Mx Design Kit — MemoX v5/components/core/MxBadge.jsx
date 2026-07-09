import React from "react";

/**
 * MxBadge — small status pill for SRS lifecycle, due workload, and generic
 * states. Uses semantic tokens so Due (amber) never reads as Wrong/Destructive
 * (red), and pre-SRS (slate) never reads as an error. Pairs colour with a text
 * label — colour is never the only signal.
 */
export function MxBadge({ children, tone = "neutral", size = "medium", icon = null, style }) {
  const tones = {
    neutral: ["var(--mx-color-srs-preSrsSurface)", "var(--mx-color-srs-preSrs)"],
    preSrs: ["var(--mx-color-srs-preSrsSurface)", "var(--mx-color-srs-preSrs)"],
    active: ["var(--mx-color-state-selectedSurface)", "var(--mx-color-srs-active)"],
    due: ["var(--mx-color-feedback-warningSurface)", "var(--mx-color-srs-due)"],
    noDue: ["var(--mx-color-feedback-correctSurface)", "var(--mx-color-srs-noDue)"],
    mastered: ["rgba(168,143,255,0.16)", "var(--mx-color-srs-mastered)"],
    lapse: ["var(--mx-color-feedback-wrongSurface)", "var(--mx-color-srs-lapse)"],
    correct: ["var(--mx-color-feedback-correctSurface)", "var(--mx-color-feedback-correct)"],
    wrong: ["var(--mx-color-feedback-wrongSurface)", "var(--mx-color-feedback-wrong)"],
    info: ["var(--mx-color-feedback-infoSurface)", "var(--mx-color-feedback-info)"],
  };
  const [bg, fg] = tones[tone] || tones.neutral;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--mx-space-4)",
        background: bg,
        color: fg,
        fontFamily: "var(--mx-font-display)",
        fontSize: size === "small" ? "11px" : "var(--mx-text-label-medium-size)",
        lineHeight: 1,
        fontWeight: "var(--mx-weight-semibold)",
        padding: size === "small" ? "3px 7px" : "5px 10px",
        borderRadius: "var(--mx-radius-pill)",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  );
}
