import React from "react";

/**
 * MxCallout — an inline banner for context messages: info, warning,
 * destructive, no-due, unavailable. Icon + colour + text (never colour alone).
 * No-due is styled calm/positive — it is NOT an error.
 */
export function MxCallout({ tone = "info", title = null, children, icon = null, style }) {
  const map = {
    info: ["var(--mx-color-feedback-infoSurface)", "var(--mx-color-feedback-info)", "info"],
    warning: ["var(--mx-color-feedback-warningSurface)", "var(--mx-color-feedback-warning)", "alert-triangle"],
    destructive: ["var(--mx-color-destructive-surface)", "var(--mx-color-destructive-text)", "alert-octagon"],
    noDue: ["var(--mx-color-feedback-correctSurface)", "var(--mx-color-srs-noDue)", "check-circle-2"],
    unavailable: ["var(--mx-color-state-unavailableSurface)", "var(--mx-color-text-tertiary)", "clock"],
  };
  const [bg, fg, defIcon] = map[tone] || map.info;

  return (
    <div
      role="note"
      style={{
        display: "flex",
        gap: "var(--mx-space-12)",
        padding: "var(--mx-space-12) var(--mx-space-16)",
        background: bg,
        border: `1px solid ${fg}`,
        borderRadius: "var(--mx-radius-md)",
        ...style,
      }}
    >
      <span style={{ flex: "0 0 auto", color: fg, display: "flex", marginTop: 1 }}>
        {icon || <i data-lucide={defIcon} style={{ width: 18, height: 18 }}></i>}
      </span>
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        {title && (
          <div style={{ fontFamily: "var(--mx-font-display)", fontSize: "var(--mx-text-label-large-size)", fontWeight: 600, color: "var(--mx-color-text-primary)", marginBottom: 2 }}>
            {title}
          </div>
        )}
        <div style={{ fontSize: "var(--mx-text-body-small-size)", lineHeight: "var(--mx-text-body-small-line)", color: "var(--mx-color-text-secondary)", textWrap: "pretty" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
