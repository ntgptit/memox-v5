import React from "react";

/**
 * MxStudyProgressBar — progress within a study session/mode (New Learning Flow
 * or SRS Repeat). Deliberately labelled as MODE progress, never SRS mastery —
 * SRS box state is shown by MxBadge, not this bar. Optional step counter.
 */
export function MxStudyProgressBar({
  percent = 0,
  stepLabel = null, // e.g. "3 / 12"
  modeLabel = null, // e.g. "Fill"
  style,
}) {
  const p = Math.max(0, Math.min(100, percent));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--mx-space-6)", ...style }}>
      {(modeLabel || stepLabel) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          {modeLabel && (
            <span style={{ fontFamily: "var(--mx-font-display)", fontSize: "var(--mx-text-label-medium-size)", fontWeight: "var(--mx-weight-semibold)", color: "var(--mx-color-text-secondary)", letterSpacing: "0.02em", textTransform: "uppercase" }}>
              {modeLabel}
            </span>
          )}
          {stepLabel && (
            <span className="mx-tabular" style={{ fontSize: "var(--mx-text-caption-size)", color: "var(--mx-color-text-tertiary)" }}>
              {stepLabel}
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={p}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ height: 6, borderRadius: "var(--mx-radius-pill)", background: "var(--mx-color-state-loadingSurface)", overflow: "hidden" }}
      >
        <div
          style={{
            width: `${p}%`,
            height: "100%",
            borderRadius: "var(--mx-radius-pill)",
            background: "var(--mx-color-action-primary)",
            transition: "width var(--mx-motion-normal) var(--mx-ease-standard)",
          }}
        />
      </div>
    </div>
  );
}
