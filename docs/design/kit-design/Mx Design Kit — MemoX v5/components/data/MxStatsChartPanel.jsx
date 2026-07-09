import React from "react";

/**
 * MxStatsChartPanel — the long-term Statistics chart container (per-day trend).
 * Renders a lightweight multi-series line chart from real, finalized data. When
 * there is NO data it shows a friendly empty state — never fake numbers or a
 * placeholder line. Read-only: opening it never mutates learning data.
 *
 * `series`: [{ name, tone, points:[y…] }]  · `xLabels`: string[] (days)
 * tone maps to chart tokens (word/time/correct/wrong/neutral).
 */
export function MxStatsChartPanel({
  title = null,
  legend = true,
  series = [],
  xLabels = [],
  height = 180,
  empty = false,
  style,
}) {
  const toneColor = (t) =>
    ({
      word: "var(--mx-color-chart-wordMetric)",
      time: "var(--mx-color-chart-timeMetric)",
      correct: "var(--mx-color-chart-qualityCorrect)",
      wrong: "var(--mx-color-chart-qualityWrong)",
      neutral: "var(--mx-color-chart-neutralTotal)",
    }[t] || "var(--mx-color-chart-neutralTotal)");

  const allPoints = series.flatMap((s) => s.points);
  const max = Math.max(1, ...allPoints);
  const W = 320;
  const H = height;
  const pad = 8;
  const toX = (i, n) => pad + (i * (W - pad * 2)) / Math.max(1, n - 1);
  const toY = (v) => H - pad - (v / max) * (H - pad * 2);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--mx-space-12)",
        padding: "var(--mx-space-16)",
        background: "var(--mx-color-surface-card)",
        border: "var(--mx-border-default)",
        borderRadius: "var(--mx-radius-lg)",
        ...style,
      }}
    >
      {title && (
        <div style={{ fontFamily: "var(--mx-font-display)", fontSize: "var(--mx-text-label-large-size)", fontWeight: 600, color: "var(--mx-color-text-primary)" }}>{title}</div>
      )}

      {empty || series.length === 0 ? (
        <div style={{ height: H, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "var(--mx-space-8)", color: "var(--mx-color-text-tertiary)", textAlign: "center" }}>
          <i data-lucide="bar-chart-3" style={{ width: 26, height: 26 }}></i>
          <span style={{ fontSize: "var(--mx-text-body-small-size)" }}>No statistics data yet</span>
        </div>
      ) : (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} role="img" aria-label="Biểu đồ thống kê theo ngày" preserveAspectRatio="none">
            {[0.25, 0.5, 0.75, 1].map((g) => (
              <line key={g} x1={pad} x2={W - pad} y1={toY(max * g)} y2={toY(max * g)} stroke="var(--mx-color-chart-grid)" strokeWidth="1" />
            ))}
            {series.map((s, si) => {
              const d = s.points.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i, s.points.length)} ${toY(v)}`).join(" ");
              return (
                <g key={si}>
                  <path d={d} fill="none" stroke={toneColor(s.tone)} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {s.points.map((v, i) => (
                    <circle key={i} cx={toX(i, s.points.length)} cy={toY(v)} r="2.5" fill={toneColor(s.tone)} />
                  ))}
                </g>
              );
            })}
          </svg>

          {xLabels.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--mx-text-caption-size)", color: "var(--mx-color-chart-axis)" }}>
              {xLabels.map((l, i) => <span key={i}>{l}</span>)}
            </div>
          )}

          {legend && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--mx-space-16)", paddingTop: "var(--mx-space-4)" }}>
              {series.map((s, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "var(--mx-space-6)", fontSize: "var(--mx-text-body-small-size)", color: "var(--mx-color-text-secondary)" }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: toneColor(s.tone) }} />
                  {s.name}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
