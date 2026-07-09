import React from "react";

/**
 * MxMetricCard — a labelled stat tile (Statistics, Activity summary, Session
 * Result). Value uses the tabular stat.number role; optional delta shows a
 * signed change with correct/wrong tone. Numbers here are always real,
 * finalized data — never fabricated placeholders.
 */
export function MxMetricCard({ label, value, unit = null, delta = null, tone = "neutral", style }) {
  const accent = {
    neutral: "var(--mx-color-text-primary)",
    word: "var(--mx-color-chart-wordMetric)",
    time: "var(--mx-color-chart-timeMetric)",
    correct: "var(--mx-color-chart-qualityCorrect)",
    wrong: "var(--mx-color-chart-qualityWrong)",
  }[tone];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--mx-space-4)",
        padding: "var(--mx-space-16)",
        background: "var(--mx-color-surface-card)",
        border: "var(--mx-border-default)",
        borderRadius: "var(--mx-radius-md)",
        ...style,
      }}
    >
      <span style={{ fontSize: "var(--mx-text-body-small-size)", color: "var(--mx-color-text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <span style={{ display: "flex", alignItems: "baseline", gap: "var(--mx-space-4)" }}>
        <span className="mx-tabular" style={{ fontSize: "var(--mx-text-stat-number-size)", lineHeight: "var(--mx-text-stat-number-line)", fontWeight: 700, color: accent, letterSpacing: "var(--mx-text-stat-number-tracking)" }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: "var(--mx-text-body-small-size)", color: "var(--mx-color-text-tertiary)" }}>{unit}</span>}
      </span>
      {delta != null && (
        <span style={{ fontSize: "var(--mx-text-caption-size)", fontWeight: 600, color: delta >= 0 ? "var(--mx-color-feedback-correct)" : "var(--mx-color-feedback-wrong)" }}>
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}
        </span>
      )}
    </div>
  );
}
