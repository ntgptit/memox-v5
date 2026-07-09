import React from "react";

/**
 * MxSessionResultSummary — end-of-session summary. Distinguishes New Learning
 * (cards activated into Box 1, per-mode failures) from SRS Repeat (remembered/
 * forgotten, box promotion/demotion). Read-only: it never activates cards or
 * schedules SRS — it reflects already-finalized data. Pass a `stats` list.
 */
export function MxSessionResultSummary({
  type = "newLearning", // newLearning | srsRepeat
  headline,
  subhead = null,
  stats = [], // [{ label, value, tone? }]
  style,
}) {
  const accent =
    type === "srsRepeat" ? "var(--mx-color-srs-active)" : "var(--mx-color-srs-noDue)";
  const badge = type === "srsRepeat" ? "SRS Repeat" : "New Learning";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--mx-space-20)", ...style }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--mx-space-8)", textAlign: "center" }}>
        <span
          style={{
            display: "inline-flex",
            padding: "5px 12px",
            borderRadius: "var(--mx-radius-pill)",
            background: type === "srsRepeat" ? "var(--mx-color-state-selectedSurface)" : "var(--mx-color-feedback-correctSurface)",
            color: accent,
            font: "600 var(--mx-text-label-medium-size)/1 var(--mx-font-display)",
            letterSpacing: "0.02em",
          }}
        >
          {badge}
        </span>
        <div style={{ fontFamily: "var(--mx-font-display)", fontSize: "var(--mx-text-title-large-size)", lineHeight: "var(--mx-text-title-large-line)", fontWeight: 700, color: "var(--mx-color-text-primary)", textWrap: "balance" }}>
          {headline}
        </div>
        {subhead && (
          <div style={{ fontSize: "var(--mx-text-body-medium-size)", color: "var(--mx-color-text-secondary)", textWrap: "pretty" }}>{subhead}</div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--mx-space-12)" }}>
        {stats.map((s, i) => {
          const toneColor = {
            correct: "var(--mx-color-feedback-correct)",
            wrong: "var(--mx-color-feedback-wrong)",
            active: "var(--mx-color-srs-active)",
            due: "var(--mx-color-srs-due)",
          }[s.tone] || "var(--mx-color-text-primary)";
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--mx-space-4)",
                padding: "var(--mx-space-16)",
                background: "var(--mx-color-surface-card)",
                border: "var(--mx-border-default)",
                borderRadius: "var(--mx-radius-md)",
              }}
            >
              <span className="mx-tabular" style={{ fontSize: "var(--mx-text-stat-number-size)", lineHeight: "var(--mx-text-stat-number-line)", fontWeight: 700, color: toneColor }}>
                {s.value}
              </span>
              <span style={{ fontSize: "var(--mx-text-body-small-size)", color: "var(--mx-color-text-secondary)" }}>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
