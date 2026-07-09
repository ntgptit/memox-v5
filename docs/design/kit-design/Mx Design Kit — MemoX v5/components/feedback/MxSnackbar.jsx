import React from "react";

/**
 * MxSnackbar — transient bottom toast: success, error, warning, info. Sits at
 * the toast layer. Optional single action (e.g. Hoàn tác). Colour is paired
 * with a leading glyph.
 */
export function MxSnackbar({ tone = "info", children, action = null, onAction = null, style }) {
  const map = {
    success: ["var(--mx-color-feedback-correct)", "check-circle-2"],
    error: ["var(--mx-color-feedback-wrong)", "alert-octagon"],
    warning: ["var(--mx-color-feedback-warning)", "alert-triangle"],
    info: ["var(--mx-color-feedback-info)", "info"],
  };
  const [accent, icon] = map[tone] || map.info;

  return (
    <div
      role="status"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--mx-space-12)",
        padding: "var(--mx-space-12) var(--mx-space-16)",
        background: "var(--mx-color-surface-elevated)",
        border: "var(--mx-border-default)",
        borderRadius: "var(--mx-radius-md)",
        boxShadow: "var(--mx-elevation-high)",
        maxWidth: 440,
        ...style,
      }}
    >
      <span style={{ flex: "0 0 auto", color: accent, display: "flex" }}>
        <i data-lucide={icon} style={{ width: 20, height: 20 }}></i>
      </span>
      <span style={{ flex: "1 1 auto", fontSize: "var(--mx-text-body-medium-size)", color: "var(--mx-color-text-primary)", textWrap: "pretty" }}>
        {children}
      </span>
      {action && (
        <button
          type="button"
          onClick={onAction}
          style={{ flex: "0 0 auto", border: "none", background: "transparent", color: "var(--mx-color-action-primary)", font: "600 var(--mx-text-label-large-size)/1 var(--mx-font-display)", cursor: "pointer", padding: "var(--mx-space-4) var(--mx-space-8)" }}
        >
          {action}
        </button>
      )}
    </div>
  );
}
